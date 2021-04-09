import axios from '../axios'

/* 
 * 角色管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/role/addsysrole',
        method: 'post',
        data
    })
}
// 修改
export const update = (data) => {
  return axios({
    url: '/role/updatesysrole',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/role/delsysrole',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/role/findPage',
        method: 'post',
        data
    })
}
// 查询全部
export const findAll = () => {
    return axios({
        url: '/role/findAll',
        method: 'get'
    })
}
// 保存角色菜单集合
export const saveRoleMenus = (data) => {
    return axios({
        url: '/role/addRoleMenus',
        method: 'post',
        data
    })
}
// 删除角色菜单集合
export const delRoleMenus = (data) => {
  return axios({
    url: '/role/delRoleMenus',
    method: 'post',
    data
  })
}
// 查询角色菜单集合
export const findRoleMenus = (data) => {
  return axios({
    url: '/menu/findMenuTreeByRole',
    method: 'post',
    data
  })
}
// 查找导航菜单树
export const findMenuTree = (params) => {
  return axios({
    url: '/menu/findMenuTree',
    method: 'get',
    params
  })
}
