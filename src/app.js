import './sub'
import './app.scss'
// async awaitを使う場合に使用する
import 'regenerator-runtime'
import 'core-js'

const init = async () => {
  console.log("app")
  await asyncFn()
  jQuery()
  utils.log('hello from app.js')
}

async function asyncFn() {
  // incluedsはES6の記法で、IE等ではcore-jsがないと動かない
  console.log([1,2,3].includes(0))

}

init()