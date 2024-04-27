// import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Lotus Thé',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
    src: '~/mixins/global.js',
    mode: 'client'
  },
  { src: '~/plugins/axios.js' },
  { src: '~/plugins/localStorage.js' },
  { src: '~/plugins/event-bus.js' },
  { src: '~/plugins/toast-sweet.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    // '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/auth-next'
  ],

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: '/auth/login',
  //           method: 'post',
  //           propertyName: 'data.jwt_token'
  //         },
  //         tokenRequired: false,
  //         logout: false,
  //         // user: false,
  //       }
  //     },
  //   },
  //   redirect: {
  //     login: '/login',
  //     logout: '/',
  //     callback: '/login',
  //     home: '/'
  //   },
  // },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          global: true,
          // property: 'access_token',
          required: true,
          type: "Bearer",
          maxAge: 60 * 60 * 24 * 7,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.jwt_token'
          },
          tokenRequired: false,
          logout: false,
        }
      },
    },
    redirect: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://127.0.0.1:8000/api',
  },

  router: {
    base: "/"
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   customVariables: ['~/variables.scss'],
  //   theme: {
  //     dark: false,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       }
  //     }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
