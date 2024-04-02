import { constant } from '../scripts/constants'

/* eslint-disable */
export default ({ $axios, store, isDev }) => {
  let isRefreshing = false
  let subscribers = []
  const onTokenFetched = (token, error) => {
    subscribers.map(callback => callback(token, error))
    subscribers = []
  }
  const addSubscriber = (callback) => {
    subscribers.push(callback)
  }

  $axios.onRequest(config => {
    const { method, url, headers } = config
    const { Authorization } = headers.common
    const isAuthorization = !!Authorization
    isDev && console.log(`[Axios] ${method.toUpperCase()} -> ${url} [${isAuthorization}]`)
  })

  $axios.onResponse(response => {
    const { config } = response
    const { url, baseURL } = config
    const urlTarget = url.replace(baseURL, "")
    isDev && console.log(`[Axios] RESPONSE <- ${urlTarget}`)
  })

  $axios.onError(async error => {
    const { status, config, data, message } = error.response
    const { url } = config

    if(url.endsWith('/auth/jwt/login') || url.endsWith('/auth/jwt/refresh')) {
      return Promise.reject(new Error("Token Invalid"))
    }

    if (status) {
      switch (status) {
        case 400:
          return Promise.reject(new Error(data.message))
        case 403:
        case 401: {
          if (!isRefreshing) {
            console.error("[Axios] Error::Token expired")
            isRefreshing = true
            console.log("[Axios] Auto refresh token")
            store.dispatch("auth/RefreshToken").then((data) => {
              isRefreshing = false
              onTokenFetched(data.token)
            }, error => {
              isRefreshing = false
              onTokenFetched(undefined, error)
            })
          }

          const originalRequest = error.config
          const retryOriginalRequest = new Promise((resolve, reject) => {
            addSubscriber((token, error) => {
              if (!error) {
                originalRequest.headers[constant.authorization] = `Bearer ${token}`
                resolve($axios(originalRequest))
              } else {
                reject(error)
              }
            })
          })
          return retryOriginalRequest
        }
        default:
          console.error("[Axios] Error::Unknown Error Code")
          return Promise.reject(new Error("UNKNOWN_ERROR_CODE"))
      }
    } else {
      console.error("[Axios] Error::Invalid Error Format, Can't handle error")
      return Promise.reject(new Error("SERVER_ERROR"))
    }
  })
}
