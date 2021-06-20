<template>
  <div class="home-page">
    <section class="intro">
      <h1>トップメッセージ</h1>
    </section>
    <!-- 投稿リスト -->
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>

export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
  // data() {
  //   return {
  //     loadedPosts: [
  //       // idはPostPreviewでStringに指定しているので文字列型に変換
  //       // {
  //       //   id: '1',
  //       //   title: '最初の投稿',
  //       //   previewText: 'プレビュー',
  //       //   thumbnail: 'https://source.unsplash.com/random'
  //       // },
  //       // {
  //       //   id: '2',
  //       //   title: '2の投稿',
  //       //   previewText: 'プレビュー',
  //       //   thumbnail: 'https://source.unsplash.com/random'
  //       // },
  //     ]
  //   }
  // },
  // asyncData() {
  //     setTimeout(() => {
  //       return { 
    //      loadedPosts: [
  //         // idはPostPreviewでStringに指定しているので文字列型に変換
  //           {
  //             id: '1',
  //             title: '最初の投稿',
  //             previewText: 'プレビュー',
  //             thumbnail: 'https://source.unsplash.com/random'
  //           },
  //           {
  //             id: '2',
  //             title: '2の投稿',
  //             previewText: 'プレビュー',
  //             thumbnail: 'https://source.unsplash.com/random'
  //           },
  //         ]
  //       }
  //     }, 1500)
  // },
  // asyncData(context, callback) {
  //   setTimeout(() => {
  //     callback(null, {
  //       loadedPosts: [
  //         {
  //           id: "1",
  //           title: "First Post",
  //           previewText: "This is our first post!",
  //           thumbnail:
  //             "https://source.unsplash.com/random"
  //         },
  //         {
  //           id: "2",
  //           title: "Second Post",
  //           previewText: "This is our second post!",
  //           thumbnail:
  //             "https://source.unsplash.com/random"
  //         }
  //       ]
  //     });
  //   }, 1500);
  // },
  // created() {
    // setTimeout(() => {
    //   this.loadedPosts = [
    //     // idはPostPreviewでStringに指定しているので文字列型に変換
    //     {
    //       id: '1',
    //       title: '最初の投稿',
    //       previewText: 'プレビュー',
    //       thumbnail: 'https://source.unsplash.com/random'
    //     },
    //     {
    //       id: '2',
    //       title: '2の投稿',
    //       previewText: 'プレビュー',
    //       thumbnail: 'https://source.unsplash.com/random'
    //     },
    //   ]
    // }, 1500)
  // }
}
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-image: url('~assets/images/1.jpg');
  background-position: center;
}

.intro h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  font-size: 1.5rem;
  color: #f7797d;
  background: #ccc;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #ccc;
  box-sizing: border-box;
}

@media (min-width: 768px) {

  .intro h1 {
    font-size: 2rem;
  }
}


.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}


</style>