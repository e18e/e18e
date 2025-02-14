import type { Theme } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/vars.css'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
  },
} satisfies Theme
