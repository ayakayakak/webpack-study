const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { ProvidePlugin } = require('webpack')
const path = require('path')

module.exports = ({outputFile, assetFile}) => ({
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
    filename: `${outputFile}.js`,
    assetModuleFilename: `images/${assetFile}[ext]`,
    // splitChunksのファイル名を指定
    chunkFilename: `${outputFile}.js`,
  },
  
  module: {
    rules: [
      // ES6の記法をES5の記法に変えてくれる（アロー関数など）
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // eslintでチェック→babelでトランスパイルの順
          "babel-loader",
          "eslint-loader"
        ]
      },
      /*
      下記でもeslint→babelの順で実行される
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        // .js拡張子ファイルに対しては必ず一番に実行される
        endorce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // --fixが毎回つけて実行される
          fix: true
        }
      },
      */
      {
        // 対象となる拡張子
        test: /\.scss$/,
        // どのloaderを使うのか
        use: [
          // 下から順番に実行される！
          // sassがcssにコンパイルされる→prefixを自動付与→jsファイルにバンドルされる→バンドルされたものがブラウザに配信された後にhtmlにstyleタグとして注入される

          // MiniCssExtractPluginを使う場合はstyle-loaderではなくMiniCssExtractPlugin.loaderを使う
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      /* 
      画像ファイル用。
      ただ、webpack ver5からAsset Modulesがraw-loader, url-loader, file-loaderの代わりに導入されて、自動で実行されるようになっているので、
      下記の設定をしてしまうと画像が二重で出力されてしまう。
      output.assetModuleFilenameに希望するディレクトリ名や名前を設定すればok。
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
              publicPath: 'images'
            }
          }
        ]
      },
      */
      {
        // html-loaderを使うにはHtmlWebpackPluginの設定が必要
        // それか、エントリーポイントに指定しているjsファイル内でhtmlファイルをimportしておけばok
        test: /\html$/,
        use: [
          'html-loader'
        ]
      }
    ]
  },
  plugins: [
    // 普通ならjsファイルにバンドルされるはずのscssファイルをcssファイルとして書き出してくれる。
    // scssファイルに変更がなかった場合ブラウザ側でキャッシュを使ってくれるので、prodでは設定を推奨。
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`
    }),
    new ProvidePlugin({
      // 各ファイルにimportを書かなくても全体で共通して使えるようになる
      // 名前解決したい変数: importするモジュール名
      jQuery: 'jquery',
      $: 'jquery',
      utils: [path.resolve(__dirname, 'src/utils'), 'default']
    })
  ],
  optimization: {
    // バンドル後のファイルを適切に分割することで、修正が入ったファイルだけサーバーに取りにいく、残りはキャッシュを使うことができるので、描画に無駄な時間がかからなくなる
    splitChunks: {
      // ダイナミックインポート（非同期でimportするので、初期描画に必要ないものはこうしておくと表示速度が上がる）も普通のインポートも全部分ける
      chunks: 'all',
      // ダイナミックインポートのみ分ける
      // chunks: 'async',
      // 最低限分割するバイト数
      minSize: 0,
      cacheGroups: {
        vendors: {
          // vendors.jsに共通モジュール（今回だとjQuery）が分割される
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        utils: {
          name: "utils",
          test: /src[\\/]utils/,
        },
        default: false
      },
    }
  }
})