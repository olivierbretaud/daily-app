
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
  ],
  /*
  ** Nuxt.js modules
  */

  // modules: ['@nuxtjs/style-resources', '@nuxtjs/axios',],

  modules: ['@nuxtjs/axios'],


  // styleResources: {
  //     scss: [
  //       '~/assets/styles/main.scss',
  //     ]
  // },

  css: [
     '~/assets/styles/main.scss'
  ],
  
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
