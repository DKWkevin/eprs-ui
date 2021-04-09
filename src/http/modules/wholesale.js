import axios from '../axios'

// 查询
export const selectPlkcht = (data) => {
  return axios({
    url: 'ddyc/select',
    method: 'post',
    data
  })
};
// 修改
export const plkchtupdateinvalid = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 确认
export const plkchtConfirm = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 远程
export const selectsaler = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 新增查询
export const selectQuery = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 新增
export const selectAddlst = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 销售明细查询查询
export const selectXsmxcx = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 销售明细查询金额
export const selectXsmxcxJe = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 销售明细查询细单
export const selectXsmxcxDtl = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
