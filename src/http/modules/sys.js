import axios from '../axios'

// 分页查询
export const findPageEmployee = (data) => {
  return axios({
    url: '/eprs-sys-user-role/selectuserid',
    method: 'post',
    data
  })
}
// 新增
export const save = (data) => {
  return axios({
    url: '/user/insert',
    method: 'post',
    data
  })
}
// 新增
export const update = (data) => {
  return axios({
    url: '/user/update',
    method: 'post',
    data
  })
}
// 人员授权查询
export const fingEmp = (data) => {
  return axios({
    url: '/eprs-sys-user-role/select',
    method: 'post',
    data
  })
}
// 授权全部查询
export const fingEmpAll = () => {
  return axios({
    url: '/eprs-sys-user-role/selectroleid',
    method: 'post'
  })
}
// 授权保存
export const saveEmp = (data) => {
  return axios({
    url: '/eprs-sys-user-role/adduserrole',
    method: 'post',
    data
  })
}
// 授权删除
export const deleteEmp = (data) => {
  return axios({
    url: '/eprs-sys-user-role/deluserrole',
    method: 'post',
    data
  })
}
