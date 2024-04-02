import Cookie from 'cookie'
import JSCookie from 'js-cookie'
import Vue from 'vue'

// Called only on client-side
export const getCookies = str => Cookie.parse(str || '')

/*
** Executed by ~/.nuxt/index.js with context given
** This method can be asynchronous
*/
export default ({ req }, inject) => {
  // forward cookies for server-side
  // if (process.server) {
  //   console.log("axios: ", axios)
  //   console.log("req: ", req.headers.cookie)
  //   axios.defaults.headers.common["cookie"] = req.headers.cookie
  // }

  // Inject `cookies` key
  // -> app.$cookies
  // -> this.$cookies in vue components
  // -> this.$cookies in store actions/mutations
  inject(
    'cookies',
    new Vue({
      data: () => ({
        cookies: getCookies(
          process.server ? req.headers.cookie : document.cookie
        )
      }),
      methods: {
        set(key, val, expires = 30) {
          if (!process.server && document) {
            JSCookie.set(key, val, { expires })
            this.cookies = getCookies(document.cookie)
          }
        },
        remove(...args) {
          if (!process.server && document) {
            JSCookie.remove(...args)
            this.cookies = getCookies(document.cookie)
          }
        }
      }
    })
  )
}
