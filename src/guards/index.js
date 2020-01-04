/* eslint-disable */
export default (to, from, next) => {
  if (localStorage.token !== undefined ) {
    next()
  } else {
    next('/')
  }
}