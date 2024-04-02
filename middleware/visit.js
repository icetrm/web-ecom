export default ({ store, route, isDev }) => {
  const { name } = route
  if (isDev) {
    console.log('[Visit] Route name: ', name)
  }
  store.dispatch('auth/ApplyAuthState')
  store.dispatch('menu/UpdateBreadcrumb', name)
  store.dispatch('menu/UpdatePageTitle', name)
}
