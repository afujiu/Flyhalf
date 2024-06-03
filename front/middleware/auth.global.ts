export default defineNuxtRouteMiddleware(async (to, from) => {
  if(to.name=='/'){
    return { path: '/' }
  }
})