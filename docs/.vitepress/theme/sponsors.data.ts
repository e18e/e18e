import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

interface RawSponsor {
  name: string
  login: string
  avatar: string
  amount: number
  link: string | null
  org: boolean
}

export interface SponsorItem {
  name: string
  img: string
  url: string
}

export interface SponsorTier {
  tier: string
  size: 'big' | 'medium' | 'small' | 'mini'
  items: SponsorItem[]
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const SPONSORS_JSON = resolve(__dirname, '../../public/sponsors.json')
const OC_MEMBERS_URL = 'https://opencollective.com/e18e/members.json'

interface OcMember {
  name: string
  profile: string
  website: string | null
  github: string | null
}

function classifyTier(amount: number): { title: string, size: SponsorTier['size'] } | null {
  if (amount >= 500)
    return { title: 'Platinum Sponsors', size: 'big' }
  if (amount >= 100)
    return { title: 'Gold Sponsors', size: 'big' }
  if (amount >= 50)
    return { title: 'Silver Sponsors', size: 'medium' }
  if (amount >= 10)
    return { title: 'Sponsors', size: 'small' }
  if (amount >= 0)
    return { title: 'Backers', size: 'mini' }
  return null
}

const TIER_ORDER = ['Platinum Sponsors', 'Gold Sponsors', 'Silver Sponsors', 'Sponsors', 'Backers']

export default {
  async load(): Promise<SponsorTier[]> {
    if (!fs.existsSync(SPONSORS_JSON))
      return []

    let raw: RawSponsor[]
    try {
      raw = JSON.parse(fs.readFileSync(SPONSORS_JSON, 'utf-8'))
    }
    catch {
      return []
    }

    // Fetch OpenCollective members for website/github fallback URLs
    let ocMembers: OcMember[] = []
    try {
      ocMembers = await fetch(OC_MEMBERS_URL).then(r => r.json())
    }
    catch {}

    const ocByName = new Map(ocMembers.map(m => [m.name, m]))

    const tierMap = new Map<string, SponsorTier>()

    for (const sponsor of raw) {
      if (sponsor.amount < 0)
        continue

      const tier = classifyTier(sponsor.amount)
      if (!tier)
        continue

      // Resolve best URL: sponsorkit link -> OC website -> OC github -> OC profile
      let url = sponsor.link
      if (!url || url.includes('opencollective.com/')) {
        const oc = ocByName.get(sponsor.name)
        if (oc) {
          url = oc.website || oc.github || oc.profile
        }
      }
      if (!url)
        continue

      if (!tierMap.has(tier.title)) {
        tierMap.set(tier.title, { tier: tier.title, size: tier.size, items: [] })
      }

      tierMap.get(tier.title)!.items.push({
        name: sponsor.name || sponsor.login,
        img: sponsor.avatar,
        url,
      })
    }

    return TIER_ORDER
      .map(name => tierMap.get(name))
      .filter((t): t is SponsorTier => !!t && t.items.length > 0)
  },
}

declare const data: SponsorTier[]
export { data }
