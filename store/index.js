import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null, //ユーザー認証
    },
    mutations: {
      // ユーザー認証のmutation、tokenをセット
      setToken(state, token) {
        state.token = token
      },
      // tokenの削除
      clearToken(state) {
        state.token = null
      },
      // データをセット
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      // データを追加
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      // データを更新
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      },
    },
    actions: {
      // 初回ロード時にデータを取得
      nuxtServerInit(vuexContext, context) {
        return axios.get(`${process.env.baseUrl}/posts.json`)
        .then(res => {
          const postsArray = []
          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key })
          }
          vuexContext.commit('setPosts', postsArray)
        })
        .catch(e => console.error(e))
      },
      // データをセット
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      // ユーザー認証のaction
      authenticateUser(vuexContext, authData) {
        // デフォルトのURL(ログインとする）を設定
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`

        // ログインモードでない場合、サインアップのURLをセット
        if(!authData.isLogin) {
            authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
        }
        // ログイン/サインアップの処理
        return axios.post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
        })
        .then(result => {
          // tokenを保持
          vuexContext.commit('setToken', result.data.idToken)

          // ローカルストレージにtokenを保管
          localStorage.setItem('token', result.data.idToken)
          // ローカルストレージにtokenを保持する期間を設定
            // result.data.expiresInというのは数秒なので、現在時刻が必要。よってnew Dateを使う。そしてgetTimeでミリ秒(expiresInと同じ)を取得する
            // result.data.expiresInは+をつけてNumberにするかNumber.parseInt()をつかう
          localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)

          // Cookieを保管
          Cookie.set('jwt', result.data.idToken)
          // Cookieを保持する期間を設定(tokenと同じ期間に設定)
          Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)


          // ここ不要- Expressの文
          // return axios.post('http://localhost:3000/api/track-data', {data: '認証！'})

        })
        .catch(e => console.log(e))
      },
      // 認証の初期化。check-auth.jsにて呼び出す
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;

        if(req) { 
          // reqにクッキーヘッダーがないときreturn
          if(!req.headers.cookie) {
            return
          }
          // trimは空白削除
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
          // jwtCookieがないときreturn
          if(!jwtCookie) {{
            return
          }}
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }

        // new Date () > expirationDateはつまり期限切れ
        // +expirationDateの「+」はNumberにするため
        // もしくはtokenなしの場合、tokenクリアしてリターン
        if (new Date () > +expirationDate || !token) {
          // console.log('No token')
          // ログアウト
          vuexContext.dispatch('logout')
          return
        }

        // 上のケースでないとき、tokenをセットする
        vuexContext.commit('setToken', token)
      },
      // ログアウト
      logout(vuexContext) {
        // clearTokenする
        vuexContext.commit('clearToken')
        // Cookieの削除
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')

        // ローカルストレージはブラウザなのでサーバーでのみ実行
        if(process.client) {
          // ローカルストレージからtoken削除
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      },
      // データの追加
      addPost(vuexContext, post) {
      // axiosはまずnpm install --save axiosでインストール
      // Firebaseのプロジェクトを作成
      // realtime databaseを使う
      // axiosの第一引数には、urlをいれる
        // ${process.env.baseUrl}/までがFirebaseのURL
        // postsはnode、自分でつけられる。今回は投稿まとめたいのでposts
        // 最後に.jsonをつける
      // axiosの第二引数には、渡したいデータをいれる
        // 今回ならpostData
      // axiosはpromiseを返すので、then()メソッドでつなげる
      // updateDateがないのでスプレッド構文で追加する
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return axios.post(`${process.env.baseUrl}/posts.json?auth=${vuexContext.state.token}`, createdPost)
        .then(res => {
          vuexContext.commit('addPost', {...createdPost, id: res.data.name})
          this.$route.push('/admin')
        })
        .catch(e => console.log(e))
      },
      // データの更新
      editPost(vuexContext, editedPost) {
        // console.log(vuexContext.state.token)
        // データの更新をしたいのでPUTリクエストを使用
        // idにはeditedPostのidでアクセスできる
        return axios.put(`${process.env.baseUrl}/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`, editedPost)
        .then(res => {
          // console.log('id',editedPost.id);
          vuexContext.commit('editPost', editedPost)
        })
        .catch(e => console.log(e))
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      // 認証の確認
      isAuthenticated(state) {
        // tokenがnullでないなら認証されているということ
        // console.log('state.token != null',state.token != null);
        return state.token != null
      }
    }
  })
}

export default createStore