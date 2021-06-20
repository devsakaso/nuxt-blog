<template>
<section class="post-list">
  <!-- is-adminはpropsがキャメルケースの場合ハイフンケースでつなげる -->
  <PostPreview
    v-for="post in posts"
    :key="post.id"
    :id="post.id"
    :is-admin="isAdmin"
    :thumbnail="post.thumbnail"
    :title="post.title"
    :previewText="post.previewText"
  />

</section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview.vue'

export default {
  components: {
    PostPreview,
  },
  // AdminならAdminPostFormに移動してほしいのでisAdminを追加
  // ただし、ここではadminの場合とそうじゃない場合があるのでfalseにしておく
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>