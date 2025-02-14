import type { SiteConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'

const siteUrl = 'https://e18e.dev'
const blogUrl = `${siteUrl}/blog`

export async function buildEnd(config: SiteConfig) {
  const feed = new Feed({
    title: 'e18e',
    description: 'Ecosystem Performance',
    id: blogUrl,
    link: blogUrl,
    language: 'en',
    image: 'https://e18e.dev/e18e-og-image.png',
    favicon: 'https://e18e.dev/favicon.svg',
    copyright: 'Copyright © 2024-present e18e Contributors',
  })

  const posts = await createContentLoader('blog/*.md', {
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string)
      - +new Date(a.frontmatter.date as string),
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${siteUrl}${url}`,
      link: `${siteUrl}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: frontmatter.author.name,
        },
      ],
      date: frontmatter.date,
    })
  }

  writeFileSync(path.join(config.outDir, 'blog.rss'), feed.rss2())
}
