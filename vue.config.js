/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
==========================================================================================*/


const path = require('path')

module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4060',
        changeOrigin: true,
        secure: false
      }
    }
  },
  outputDir: path.resolve(__dirname, '../server/src/public'),
}

