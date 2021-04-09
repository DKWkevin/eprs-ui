import axios from '../axios'

/* 
 * 菜单管理模块
 */

 // 保存
export const save = (data) => {
    return axios({
        url: '/menu/save',
        method: 'post',
        data
    })
}
// 修改
export const update = (data) => {
  return axios({
    url: '/menu/update',
    method: 'post',
    data
  })
}
// 删除
export const deleteDoc = (data) => {
  return axios({
    url: '/menu/deletemenu',
    method: 'post',
    data
  })
}
// 保存
export const query = (data) => {
  return axios({
    url: '/menu/select',
    method: 'post',
    data
  })
}
// 查找导航菜单树授权
export const findNavTree = (params) => {
    return axios({
        url: '/menu/findNavTree',
        method: 'get',
        params
    })
}
// 查找导航菜单树
export const findMenuTree = () => {
    return axios({
        url: '/menu/findMenuTree',
        method: 'get'
    })
}

