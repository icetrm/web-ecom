export default ({ store, redirect }) => {
  const { loggedIn = false } = store.state.auth || {}
  if (!loggedIn) {
    redirect('/')
  }
  return true
}
