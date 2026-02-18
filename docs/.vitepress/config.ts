import process from 'node:process'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
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
      pattern: ({ filePath }) => {
        if (filePath.startsWith('docs/replacements/')) {
          return `https://github.com/es-tooling/module-replacements/edit/main/${filePath.replace('docs/replacements/', 'modules/')}`;
        }
        return `https://github.com/e18e/e18e/edit/main/docs/${filePath}`;
      },
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'bluesky', link: 'https://bsky.app/profile/e18e.dev' },
      { icon: 'mastodon', link: 'https://elk.zone/m.webtoo.ls/@e18e' },
      { icon: 'discord', link: 'https://chat.e18e.dev' },
      { icon: 'github', link: 'https://github.com/e18e' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: `Released under the MIT License. (${commitRef})`,
      copyright: 'Copyright © 2024-present e18e Contributors',
    },

    nav: [
      { text: 'Learn', link: '/learn/' },
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
            {
              text: 'Ongoing Projects',
              link: '/learn/projects',
            },
          ],
        },
        {
          text: 'Performance',
          items: [
            {
              text: 'Cleanup',
              link: '/learn/cleanup',
            },
            {
              text: 'Speedup',
              link: '/learn/speedup',
            },
            {
              text: 'Levelup',
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
            {
              text: 'Publishing Packages',
              link: '/docs/publishing.html',
            },
          ],
        },
        {
          text: 'Module Replacements',
          items: [
            {
              text: 'List of replacements',
              link: '/docs/replacements/',
            },
          ],
        },
        {
          text: 'CLI',
          link: '/docs/cli/',
          items: [
            {
              text: 'analyze',
              link: '/docs/cli/analyze',
            },
            {
              text: 'migrate',
              link: '/docs/cli/migrate',
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
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin(),
    ],
  },
  buildEnd,
})
