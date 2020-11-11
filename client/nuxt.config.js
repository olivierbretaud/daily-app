import colors from 'vuetify/lib/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    
  ],
  /*
  ** Nuxt.js dev-modules
  */

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    /* module options */
    customVariables: ['~/assets/styles/variables.scss'],
    theme: {
      dark: false ,
      themes: {
        light: {
          primary: colors.purple,
          greyDarken1: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.purple,
          greyDarken1: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
      },
    }
  },
  /*
  ** Nuxt.js modules
  */

  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios'],

  css: [
    '~/assets/styles/main.scss'
  ],

  styleResources: {
    scss: [
      '~/assets/styles/variables.scss'
    ]
  },
  
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  /*
  ** Build configuration
  
  */
  build: {
    /** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
