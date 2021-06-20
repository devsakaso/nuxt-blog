// Expressのときにinstallしたparser
const bodyParser = require('body-parser')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'first-nuxt-app',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;500;700&display=swap' }
    ]
  },

  // ローディング
  loading: {
    color: '#FF4E50',
    height: '5px',
    duration: 5000
  },
  // ローディングインディケータ
  loadingIndicator: {
    name: 'circle',
    color: '#FF4E50',
    background: 'white'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/axios'
  ],
  // axios: {
  //   baseURL: process.env.BASE_URL || 'https://nuxt-first-app-3628f-default-rtdb.asia-southeast1.firebasedatabase.app'
  // }

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // env
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-first-app-3628f-default-rtdb.asia-southeast1.firebasedatabase.app',
    fbAPIKey: process.env.FB_API_KEY || 'AIzaSyDpVqTcXalLVA1oQvzFqz9rA6PkH6hjxe4'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  // Expressの文
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ]

}
