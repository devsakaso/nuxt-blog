<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <!-- 管理用画面、入力フォーム -->
      <AdminPostForm @submit="onSubmitted" />
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
    AdminPostForm
  },
  methods: {
    // postData === AdminPostFormから送られるeditedPost
    onSubmitted(postData) {      
      //   axios.post('${process.env.baseUrl}/posts.json', {
      //     ...postData, 
      //     updatedDate: new Date()
      //     })
      //   .then(result => {
      //     this.$route.push('/admin')
      //   })
      //   .catch(e => console.log(e))
      // }

      this.$store.dispatch('addPost', postData)
      // addPostのaxiosをreturnしてpromiseにしているのでthen()でつなげられる
      .then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>