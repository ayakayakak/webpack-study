/* 
ファイル名は.babelrcでもok
jsファイルにしておくと関数が使えたりして便利なので、複雑な設定の場合はbabel.config.jsを推奨
*/


module.exports = api => {
  // 一度実行された関数はキャッシュされるのでビルド時間が短くなる
  api.cache(true)

  return {
    "presets": [
      ["@babel/preset-env", {
        // 対象ブラウザを指定
        // https://github.com/browserslist/browserslist
        // 下記のように指定することもできるが、新しいバージョンが出るとどんどん置いていかれるので・・・
        // targets: {
          // ie: '11',
          // chrome: '60'
        // }
        targets: [
          "last 1 version",
          "> 1%",
          "maintained node versions",
          "not dead"
        ],
        // jsファイル内でimportすると不要なものも全てimportするのでビルド時のファイルが大きくなってしまう。
        // 下記のようにすればファイルを見て必要なものだけimportしてくれる
        useBuiltIns: "usage",
        corejs: 3
      }]
    ]
  }
}