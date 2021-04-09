import axios from '../axios'
//查询门店维度范围
export const selectMdwdfw = data => {
  return axios({
    url: 'mdwdfw/select',
    method: 'post',
    data
  })
}
export const insertMdwdfw = data => {
  return axios({
    url: 'mdwdfw/insert',
    method: 'post',
    data
  })
}
export const updateMdwdfw = data => {
  return axios({
    url: 'mdwdfw/update',
    method: 'post',
    data
  })
}
export const deleteMdwdfw = data => {
  return axios({
    url: 'mdwdfw/delete',
    method: 'post',
    data
  })
}
//下拉菜单
export const selectMdwdfwDef = data => {
  return axios({
    url: 'mdwdfw/selectDef',
    method: 'post',
    data
  })
}
