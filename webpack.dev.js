const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')
const commonConf = require('./webpack.common')
const outputFile = '[name]'
const assetFile = '[name]'

module.exports = () => merge(commonConf({outputFile, assetFile}), {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      watch: {
        // 変更があっても無視する
        ignored: /node_modules/ 
      }
    },
    // devサーバーのURLを自動でブラウザで開いてくれる
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ]
})