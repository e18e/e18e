import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/vars.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
  },
} satisfies Theme
