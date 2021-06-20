export default function(context) {
  console.log('middleware check auth')
  // localStorageはブラウザのものなので、サーバーで実行されないように、clientのときのみに実行させる
  // if(process.client) {
  //   // adminのauth(サインインページ以外)で登録
  //   context.store.dispatch('initAuth', context.req)
  // }
    context.store.dispatch('initAuth', context.req)
}