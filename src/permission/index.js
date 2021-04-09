import store from '@/store'
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param perms
 */
export function hasPermission (perms) {
    let hasPermission = false
    let permissions = store.state.user.perms
    for(let i=0, len=permissions.length; i<len; i++) {
      if(typeof perms==="object"){
        for(let j=0, len=perms.length; j<len; j++){
          if(permissions[i].indexOf(perms[j])>-1) {
            hasPermission = true;
            break
          }
        }
        if(hasPermission){
          break
        }
      }else{
        if(permissions[i].indexOf(perms)>-1) {
          hasPermission = true;
          break
        }
      }
    }
    return hasPermission;
}
