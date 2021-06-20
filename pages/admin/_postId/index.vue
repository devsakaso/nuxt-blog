<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm,
  },
  // データを取得
  asyncData(context) {
    // console.log(context.params);
    // context.paramsでIDを表すのが何かは確認したほうがいい。idからpostIdに変わったので。
    return axios.get(`${process.env.baseUrl}/posts/${context.params.postId}.json`)
    .then(res => {
      // console.log('admin', res.data);
      // データベースにアクセスするときにidが必要なので下のように追記
      return {loadedPost: {...res.data, id: context.params.postId}}
    })
    .catch(e => context.error(e))
  },
  methods: {
    // editedPostはAdminPostFormからくる
    onSubmitted(editedPost) {
      this.$store.dispatch('editPost', editedPost)
      .then(() => {
        this.$router.push('/admin')
      })
      // 下の文はstore/index.jsのeditPostに移動させた。
      // idへのアクセス方法が変わるのでメモとして下を残している
        // データの更新をしたいのでPUTリクエストを使用
        // サーバーからデータを取得するのではなく、Vueコンポーネントから取得できるので、this.$routeを使う。
        // axios.put(`${process.env.baseUrl}/posts/${this.$route.params.postId}.json`, editedPost)
        // .then(res => {
        // this.$router.push('/admin')
        // })
        // .catch(e => console.log(e))
    }
  }
}
</script>

<style>

</style>