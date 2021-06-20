export default function (context) {
  // 認証されていないユーザーの場合、リダイレクト
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/admin/auth')
  }
}