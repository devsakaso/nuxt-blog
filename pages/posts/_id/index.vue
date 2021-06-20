<template>
  <div class="sigle-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <!-- pluginsのdate-filter.jsのdate -->
        <div class="post-detail">投稿日：{{ loadedPost.updatedDate | date }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p>記事のコンテンツ</p>
    </section>
    <section class="post-feedback">
      <p class="post-content">{{ loadedPost.content }}
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // サーバーから一度に全部とって表示しない場合があるので、asyncDataを使う。
  // nuxtServerInitは最初の一回だけなので。
  asyncData(context) {
    return axios.get(`${process.env.baseUrl}/posts/${context.params.id}.json`)
    .then(res => {
      return {
        loadedPost: res.data
      }
    })
    .catch(e => context.error(e))
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}
.post-content {
  max-width: 350px;
  margin: 0 auto;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>