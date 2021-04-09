import axios from '../axios'
// 采购渠道查询
export const selectCgqdcx = (data) => {
  return axios({
    url: 'cgqdcx/select',
    method: 'post',
    data
  })
};
// 供应商信息查询
export const selectGysxxcx = (data) => {
  return axios({
    url: 'gysxxcx/select',
    method: 'post',
    data
  })
};
// 采购渠道调整查询
export const selectCgqdtzcx = (data) => {
  return axios({
    url: 'cgqdtzcx/select',
    method: 'post',
    data
  })
};
// 采购渠道调整查询
export const selectSpxscx = (data) => {
  return axios({
    url: 'spxscx/select',
    method: 'post',
    data
  })
};
// 查询
export const selectJgcxDoc = (data) => {
  return axios({
    url: 'jgcx/select',
    method: 'post',
    data
  })
};
// 查询上月调拨量
export const selectJgcxDtl = (data) => {
  return axios({
    url: 'jgcx/selectgdqlsjg',
    method: 'post',
    data
  })
};
// 查询
export const selectMdpssxtzDoc = (data) => {
  return axios({
    url: 'mdpssxtz/select',
    method: 'post',
    data
  })
};
// 修改天数
export const updateMdpssxtzDays = (data) => {
  return axios({
    url: 'mdpssxtz/update',
    method: 'post',
    data
  })
};
// 查询
export const selectSpjxxxDoc = (data) => {
  return axios({
    url: 'ddyc/select',
    method: 'post',
    data
  })
};
// 保存
export const insertSpjxxx = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 保存?
export const derviceSpjxxx = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};
// 查询
export const selectYwwlcxDoc = (data) => {
  return axios({
    url: 'ywwlzcx/select',
    method: 'post',
    data
  })
};
// 修改天数
export const selectYwwlcxDtl = (data) => {
  return axios({
    url: 'ywwlzcx/selectdtl',
    method: 'post',
    data
  })
};
// 查询
export const selectYwzcxDoc = (data) => {
  return axios({
    url: 'ywzcx/select',
    method: 'post',
    data
  })
};
// 查询上月调拨量
export const selectYwzcxSydbl = (data) => {
  return axios({
    url: 'ywzcx/selectsydb',
    method: 'post',
    data
  })
};
//查询上月实销
export const selectYwzcxSysx = (data) => {
  return axios({
    url: 'ywzcx/selectsysx',
    method: 'post',
    data
  })
};
//查询前期实销
export const selectYwzcxQqsx = (data) => {
  return axios({
    url: 'ywzcx/selectqqsx',
    method: 'post',
    data
  })
};
//查询地区库存
export const selectYwzcxDqkc = (data) => {
  return axios({
    url: 'ywzcx/selectdqkc',
    method: 'post',
    data
  })
};
//查询联系人
export const selectYwzcxLxr = (data) => {
  return axios({
    url: 'ywzcx/selectlxr',
    method: 'post',
    data
  })
};
//查询委托人
export const selectYwzcxSqwtr = (data) => {
  return axios({
    url: 'ywzcx/selectsqwtr',
    method: 'post',
    data
  })
};
//查询进货明细
export const selectYwzcxJhmx = (data) => {
  return axios({
    url: 'ywzcx/selectjhmx',
    method: 'post',
    data
  })
};
//查询不可销数
export const selectYwzcxBkxs = (data) => {
  return axios({
    url: 'ywzcx/selectbkxs',
    method: 'post',
    data
  })
};
//查询账面数量
export const selectYwzcxZmsl = (data) => {
  return axios({
    url: 'ywzcx/selectzmsl',
    method: 'post',
    data
  })
};
//查询出库未提
export const selectYwzcxCkwt = (data) => {
  return axios({
    url: 'ywzcx/selectckwt',
    method: 'post',
    data
  })
};
// 赠品配送维护 查询总单
export const selectZppswh = (data) => {
  return axios({
    url: 'distrgivegoods/select',
    method: 'post',
    data
  })
};
// 赠品配送维护 修改状态
export const updateZppswh = (data) => {
  return axios({
    url: 'distrgivegoods/update',
    method: 'post',
    data
  })
};
// 赠品配送维护 查询细单
export const selectZppswhDtl = (data) => {
  return axios({
    url: 'distrgivegoods/selectdislog',
    method: 'post',
    data
  })
};
// 赠品配送维护 保存
export const insertZppswh = (data) => {
  return axios({
    url: 'distrgivegoods/insert',
    method: 'post',
    data
  })
};
