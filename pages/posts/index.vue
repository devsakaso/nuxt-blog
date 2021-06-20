<template>
  <div class="posts-page">
  <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>

export default {
  // asyncData(context) {
  // fetch(context) {
  //  })
  //   .then(data => {
  //     // return data
  //     context.store.commit('setPosts', data.loadedPosts)
  //   })
  //   .catch(e => {
  //     context.error(e);
  //   });
  // },
  middleware: 'log',
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>