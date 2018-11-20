const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config
const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new ExtractPlugin('styles.[contentHash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  })
]
if (isDev) {
  plugins.push(new VueServerPlugin())
}

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // 输出文件打包成模块，通过module.exports打包
    filename: 'server-entry.js', // 不需要hash，因为不需要在浏览器运行，不用缓存
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies), // 不打包这些文件

  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins
})

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config
