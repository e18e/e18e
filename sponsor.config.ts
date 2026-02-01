import { defineConfig, presets } from 'sponsorkit'

const platinums = ['chrome']

export default defineConfig({
  outputDir: 'docs/public',
  cacheFile: '../../.sponsorkit-cache.json',
  // github: {
  //   login: 'e18e',
  //   type: 'organization',
  // },
  opencollective: {
    slug: 'e18e',
  },
  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: presets.xs,
    },
    {
      title: 'Backers',
      preset: presets.base,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: presets.medium,
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: presets.large,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: presets.xl,
    },
    {
      title: 'Platinum Sponsors',
      monthlyDollars: Infinity,
      preset: presets.xl,
    },
  ],
  onSponsorsAllFetched(sponsors) {
    for (const sponsor of sponsors) {
      if (platinums.includes(sponsor.sponsor.login)) {
        sponsor.monthlyDollars = Infinity
      }
    }
    return sponsors
  },
  renders: [
    {
      name: 'sponsors',
      width: 800,
      formats: ['svg'],
    },
    // {
    //   renderer: 'circles',
    //   name: 'sponsors-circles',
    //   width: 1000,
    //   includePastSponsors: true,
    // },
  ],
})
