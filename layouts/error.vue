<template>
  <div class="error-page">
    <h1>エラーが発生しました</h1>
    <!-- エラーのときはnuxt-linkが動かない場合があるので、必ず常にリロードが必要なaタグを使う -->
    <p><a href="/">トップへ戻る</a></p>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
