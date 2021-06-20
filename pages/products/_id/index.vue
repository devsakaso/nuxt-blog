<template>
<div>
  <h1>products/:idのindex.vue</h1>
  <div>id: {{$route.params.id}}</div>
</div>
</template>

<script>
export default {
  validate (data) {
    console.log(data);
    // return data.params.id == 100 //100しかだめ
    // return data.params.id === 100 //これは型が違うようになるので、イコールは2つにする
    // return /^\d+$/.test(data.params.id) //数値のみ
    // return /^[1-9][0-9]*$/.test(data.params.id) //0以外の数値のみ
    return /^[0-9][0-9]{0,9}$/.test(data.params.id) //最大10桁を許容した数値のみ
  },
  layout: 'products'
}
</script>

<style>

</style>