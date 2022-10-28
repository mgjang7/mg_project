export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'baekje-cultural-complex',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css', '~/static/common.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    // '@/plugins/initClient',
    { src : '~/plugins/apexchart.js', ssr : false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',

    // "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/auth-next',
  ],

  router: {
    // middleware: 'authenticated'
    middleware: ['auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],
    vendor : [
      'vue-apexchart'
   ]
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
        },
        user: {
          // property: false,
          // autoFetch: false,
          // property: 'user',
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: { 
            baseURL: 'http://localhost:5000',
            url: '/api/account/login', method: 'post' 
          },
          // logout: { 
          //   baseURL: 'http://localhost:5000',
          //   url: '/api/account/logout', method: 'post'  
          // },
          // logout: { url: '/api/auth/logout', method: 'post' },
          
          // user: false    
          user: { 
            baseURL: 'http://localhost:5000',
            url: '/api/account/reqpermission', method: 'get' 
          }
        },
      },
    },
  },
}
