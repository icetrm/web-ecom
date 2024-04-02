export const constant = {
  authorization: 'Authorization',
  contentType: 'Content-Type'
}

export const storageKey = {
  token: 'auth.token',
  refresh: 'auth.refresh',
  info: 'auth.info'
}

/* eslint-disable */
export const regexValidator = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[\s\S\w\W]{5,}/,
  mobile: /^(0[689]{1})+([0-9]{8})+$/
}
/* eslint-enable */
