<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email">Eメール</AppControlInput>
        <AppControlInput type="password" v-model="password">パスワード</AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'ログイン' : 'サインアップ' }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">{{ isLogin ? 'サインアップ' : 'ログイン' }}へ切り替える</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminAuthPage',
  layout: 'admin',

  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    }
  },
  methods: {
    // ユーザー認証
    onSubmit() {
      this.$store.dispatch('authenticateUser', {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      })
      // actionsでaxiosをreturnしているのでthen()が使える
      .then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>

