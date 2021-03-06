const path = require('path')
const cooking = require('cooking')
const packageConfig = require('../package.json')

let isProd = process.env.NODE_ENV === 'production'

cooking.set({
  entry: {
    app: ['babel-polyfill', './test/index.js']
  },
  dist: './dist',
  template: [
    {
      title: packageConfig.description,
      filename: 'index.html',
      template: './test/index.tpl',
      // favicon:'./src/static/img/favicon.ico',
      // chunks: ['vendor', 'manifest', 'asd']
    }
  ],
  devServer: {
    port: 8011,
    publicPath: '/',
    proxy: {
      '/': {
        target: 'http://192.168.11.60',
      }
    }
  },
  clean: true,
  hash: true,
  sourceMap: !isProd,
  minimize: true,
  chunk: false,
  postcss: [],
  publicPath: '',
  assetsPath: 'static',
  urlLoaderLimit: 204800,
  extractCSS: false,
  externals: {},
  alias: {
    'vue': 'vue/dist/vue.min',
  },
  extends: ['vue2', 'less', 'autoprefixer']
})

module.exports = cooking.resolve()
