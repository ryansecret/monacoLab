const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const path = require('path')

module.exports = {
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: false,
  },

  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()],
  },
}
