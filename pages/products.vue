<template>
  <div>

    <h1>pagesのproducts.vue</h1>
    <input type="text" v-model="productId">
    <button @click="onLoadProduct">商品ページへ</button>
    <nuxt-child />
  </div>
</template>

<script>

export default {

  data() {
    return {
      productId: ''
    }
  },
  methods: {
    onLoadProduct() {
      this.$router.push(`/products/${this.productId}`)
    }
  },
  layout: 'products'
}
</script>

<style>

</style>