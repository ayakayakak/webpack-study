const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: ['./src/app.js', './src/main.js'],
  /* dist配下の出力ファイルを二つに分けたい時 */
  // entry: {
  //   app: './src/app.js',
  //   main: './src/main.js'
  // },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
    /* entryをオブジェクトで指定した場合、[name]にプロパティ名が入る*/
    // filename: '[name].bundle.js'
  }
}