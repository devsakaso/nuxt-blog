<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">投稿者</AppControlInput>
    
    <AppControlInput v-model="editedPost.title">タイトル</AppControlInput>
            
    <AppControlInput v-model="editedPost.thumbnail">サムネイル</AppControlInput>
            
    <AppControlInput
              control-type="textarea"
              v-model="editedPost.content">コンテンツ</AppControlInput>
            
    <AppControlInput
              control-type="textarea"
              v-model="editedPost.previewText">プレビューテキスト</AppControlInput>
            
    <AppButton type="submit">保存</AppButton>
            
    <AppButton
              type="button"
              style="margin-left: 10px"
              btn-style="cancel"
              @click="onCancel">キャンセル</AppButton>
  </form>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppControlInput,
    AppButton,
  },
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      // editedPost: {
      //   author: '',
      //   title: '',
      //   thumbnail: '',
      //   content: '',
      // }

      // propsのpostがあればそれ、なければデフォルト
      editedPost: this.post
       ? { ...this.post }
       : {
        author: '',
        title: '',
        thumbnail: '',
        content: '',
        previewText: '',
      }
    }
  },
  methods: {
    onSave() {
      // 記事を保存
      // console.log(this.editedPost);
      // saveででーたを送る
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      // ナブにバック
      this.$router.push('/admin')
    }
  }
}
</script>

<style>

</style>