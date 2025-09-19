import process from 'node:process'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { buildEnd } from './buildEnd.config'

const ogTitle = 'e18e'
const ogDescription = 'Ecosystem Performance'
const ogImage = 'https://e18e.dev/e18e-og-image.png'
const ogUrl = 'https://e18e.dev'

// netlify envs
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

export default defineConfig({
  title: 'e18e',
  description: 'Ecosystem Performance',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    [
      'link',
      { rel: 'alternate', type: 'application/rss+xml', href: '/blog.rss' },
    ],
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@e18e' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@e18e_dev' }],
    ['meta', { name: 'theme-color', content: '#cc7d24' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/e18e/e18e/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'bluesky', link: 'https://bsky.app/profile/e18e.dev' },
      { icon: 'mastodon', link: 'https://elk.zone/m.webtoo.ls/@e18e' },
      { icon: 'discord', link: 'https://chat.e18e.dev' },
      { icon: 'github', link: 'https://github.com/e18e' },
    ],

    /* TODO: Algolia search
    algolia: {
      appId: '',
      apiKey: '',
      indexName: 'e18e',
      searchParameters: {
        facetFilters: ['tags:en'],
      },
    },
    */

    footer: {
      message: `Released under the MIT License. (${commitRef})`,
      copyright: 'Copyright © 2024-present e18e Contributors',
    },

    nav: [
      { text: 'Learn', link: '/learn' },
      { text: 'Docs', link: '/docs/' },
      { text: 'Blog', link: '/blog' },
    ],

    sidebar: {
      '/learn/': [
        {
          text: 'Learn',
          items: [
            {
              text: 'Why e18e',
              link: '/learn/',
            },
            {
              text: 'Resources',
              link: '/learn/resources',
            },
            {
              text: 'Advocacy',
              link: '/learn/advocacy',
            },
          ],
        },
        {
          text: 'Performance',
          items: [
            {
              text: 'cleanup',
              link: '/learn/cleanup',
            },
            {
              text: 'speedup',
              link: '/learn/speedup',
            },
            {
              text: 'levelup',
              link: '/learn/levelup',
            },
          ],
        },
      ],
      '/docs/': [
        {
          text: 'Documentation',
          items: [
            {
              text: 'Index',
              link: '/docs/',
            },
          ],
        },
        {
          text: 'Module Replacements',
          items: [
            {
              text: 'List of replacements',
              link: '/docs/replacements',
            },
          ],
        },
      ],
    },

    outline: {
      level: [2, 3],
    },
  },
  transformPageData(pageData) {
    const canonicalUrl = `${ogUrl}/${pageData.relativePath}`
      .replace(/\/index\.md$/, '/')
      .replace(/\.md$/, '/')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.unshift([
      'link',
      { rel: 'canonical', href: canonicalUrl },
    ])
    if (pageData.frontmatter.description) {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'og:description', content: pageData.frontmatter.description },
      ])
    }
    return pageData
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
  },
  buildEnd,
})
