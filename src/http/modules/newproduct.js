import axios from '../axios'
//查询退货规则维护
export const selectThgzwh = data => {
  return axios({
    url: 'thgzwh/select',
    method: 'post',
    data
  })
}
//修改退货规则维护
export const updateThgzwh = data => {
  return axios({
    url: 'thgzwh/update',
    method: 'post',
    data
  })
}
//批量修改退货规则维护
export const updateThgzwhPl = data => {
  return axios({
    url: 'thgzwh/updateAll',
    method: 'post',
    data
  })
}
//删除修改退货规则维护
export const deleteThgzwh = data => {
  return axios({
    url: 'thgzwh/delete',
    method: 'post',
    data
  })
}
