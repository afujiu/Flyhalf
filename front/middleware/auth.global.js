export default defineNuxtRouteMiddleware(async (to, from) => {
  /*
  // スラッシュが3でログイン
  alert(to.fullPath)
  alert(to.fullPath.split('/').length)
  if(to.fullPath.split('/').length==4){
    return
  }
  console.log()
  const path = to.fullPath+'/'+to.params.type+'/'+to.params.domain
  console.log(path)
  return {path:path}
  /**/
})