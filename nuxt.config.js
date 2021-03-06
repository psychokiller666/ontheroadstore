module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '公路商店',
    titleTemplate: '%s - 公路商店',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { name: 'author', content: 'fucked@psychokiller.me' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { name: 'baidu-site-verification', content: 'ce6YhEPM8z' },
      { name: '360-site-verification', content: 'e2272b6d3a36cea33d4d09d62765a3be' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  cache: {
    max: 20,
    maxAge: 600000
  },
  performance: {
    gzip: true
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  css: [
    { src: '~/assets/css/main.scss', lang: 'scss' },
    { src: 'element-ui/lib/theme-chalk/index.css' },
    { src: 'element-ui/lib/theme-chalk/display.css' },
    { src: 'animate.css/animate.min.css' },
    { src: 'hover.css/scss/hover.scss', lang: 'scss' },
    { src: 'smooth-scrollbar/dist/smooth-scrollbar.css' }
  ],
  plugins: [
    { src: '~/plugins/element-ui.js', ssr: true },
    { src: '~/plugins/lazyload.js', ssr: false },
    { src: '~/plugins/smooth-scroll.js', ssr: false },
    { src: '~/plugins/sticky.js', ssr: false },
    { src: '~/plugins/ga.js', ssr: false },
    { src: '~/plugins/baidu-seo-push.js', ssr: false },
    { src: '~/plugins/highlighter.js', ssr: false },
    { src: '~/plugins/baidu-map.js', ssr: true },
    { src: '~/plugins/preview.js', ssr: true },
    { src: '~/plugins/vue-carousel.js', ssr: true }
  ],
  dev: process.env.NODE_ENV !== 'production',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    'https://api.ontheroadstore.com/www/'
  ],
  axios: {
    baseURL: '/www/',
    browserBaseURL: '/www/',
    responseInterceptor: (res, ctx) => {
      if (res.data.status === 0) {
        return res.data
      } else {
        ctx.error({
          statusCode: 404,
          message: res.data.info
        })
      }
    },
    credentials: false,
    proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
