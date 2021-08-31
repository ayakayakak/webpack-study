const path = require('path')

module.exports = {
  mode: 'development',
  // devtool: 'eval',
  entry: ['./src/app.js', './src/main.js'],
  /* dist配下の出力ファイルを二つに分けたい時 */
  // entry: {
  //   app: './src/app.js',
  //   main: './src/main.js'
  // },
  output: {
    path: path.resolve(__dirname, 'public'),
    // filename: 'bundle.js'
    /* entryをオブジェクトで指定した場合、[name]にプロパティ名が入る*/
    filename: '[name].bundle.js'
  },
  
  // sass, css用設定
  module: {
    rules: [
      // ES6の記法をES5の記法に変えてくれる（アロー関数など）
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // 対象となる拡張子
        test: /\.scss$/,
        // どのloaderを使うのか
        use: [
          // 下から順番に実行される！
          // sassがcssにコンパイルされる→prefixを自動付与→jsファイルにバンドルされる→バンドルされたものがブラウザに配信された後にhtmlにstyleタグとして注入される
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // 画像ファイル用
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[name].[ext]',
              name: '[contenthash].[ext]',
              // public/images配下に画像が格納される
              outputPath: 'images',
              // 画像をCDNに配置している場合などはpublicPathにそのURLを指定する
              publicPath: 'http://127.0.0.1:5500/images'
            }
          }
        ]
      }
    ]
  }
}