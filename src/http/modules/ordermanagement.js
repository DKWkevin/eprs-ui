import axios from '../axios'
// 查询
export const selectCgddcxzfDoc = (data) => {
  return axios({
    url: 'cgddcxzf/select',
    method: 'post',
    data
  })
};
// 查询细单
export const selectCgddcxzfDtl = (data) => {
  return axios({
    url: 'cgddcxzf/selectdtl',
    method: 'post',
    data
  })
};
// 保存细单
export const insertCgddcxzfDtl = (data) => {
  return axios({
    url: 'cgddcxzf/updatedtl',
    method: 'post',
    data
  })
};
// 作废总单
export const selectCgddcxzfZfDoc = (data) => {
  return axios({
    url: 'cgddcxzf/invalid',
    method: 'post',
    data
  })
};
// 终止总单
export const selectCgddcxzfZzDoc = (data) => {
  return axios({
    url: 'cgddcxzf/termination',
    method: 'post',
    data
  })
};
// 作废细单
export const selectCgddcxzfZfDtl = (data) => {
  return axios({
    url: 'cgddcxzf/invaliddtl',
    method: 'post',
    data
  })
};
// 终止细单
export const selectCgddcxzfZzDtl = (data) => {
  return axios({
    url: 'cgddcxzf/terminationdtl',
    method: 'post',
    data
  })
};
// 查询
export const selectCgddglDoc = (data) => {
  return axios({
    url: 'cgddgl/select',
    method: 'post',
    data
  })
};
// 查询订单
export const selectCgddglGoods = (data) => {
  return axios({
    url: 'cgddgl/selectgoods',
    method: 'post',
    data
  })
};
// 生成采购订单
export const insertCgddglGoods = (data) => {
  return axios({
    url: 'cgddgl/insert',
    method: 'post',
    data
  })
};
// 通讯录查询
export const selectCgddgllxr = (data) => {
  return axios({
    url: 'cgddgl/selectlxr',
    method: 'post',
    data
  })
};
// 查询安全库存
export const selectCgddglUpdateKc = (data) => {
  return axios({
    url: 'cgddgl/selectgoods',
    method: 'post',
    data
  })
};
// 修改安全库存
export const updateCgddglkc = (data) => {
  return axios({
    url: 'cgddgl/updateaqkc',
    method: 'post',
    data
  })
};

// 查询
export const selectZbshmdzjjh = (data) => {
  return axios({
    url: 'zbshmdzjjh/select',
    method: 'post',
    data
  })
};

// 作废
export const deleteZbshmdzjjhDtl = (data) => {
  return axios({
    url: 'zbshmdzjjh/invoid',
    method: 'post',
    data
  })
};
// 查询采购订单明细查询
export const selectCgddmxcxDoc = (data) => {
  return axios({
    url: 'cgddmxcx/select',
    method: 'post',
    data
  })
};
// 批量作废
export const deleteFhAll = (data) => {
  return axios({
    url: 'fh/invoid',
    method: 'post',
    data
  })
};
// 批量作废
export const selectFhDdkcfp = (data) => {
  return axios({
    url: 'fh/ddzkc',
    method: 'post',
    data
  })
};
// 查询
export const selectFhDoc = (data) => {
  return axios({
    url: 'fh/select',
    method: 'post',
    data
  })
};
// 作废
export const deleteFhdoc = (data) => {
  return axios({
    url: 'fh/invoid',
    method: 'post',
    data
  })
};
// 作废
export const addfhExcelCashier = (data) => {
  return axios({
    url: 'fh/insert',
    method: 'post',
    data
  })
};
// 查询
export const selectYfdddyDoc = (data) => {
  return axios({
    url: 'yfdddy/select',
    method: 'post',
    data
  })
};
// 查询细单
export const selectYfdddyDtl = (data) => {
  return axios({
    url: 'yfdddy/selectdtl',
    method: 'post',
    data
  })
};
// 查询细单
export const selectYfdddyPrint = (data) => {
  return axios({
    url: 'yfdddy/print',
    method: 'post',
    data
  })
};
// 查询细单
export const printYfdddyTotal = (data) => {
  return axios({
    url: 'yfdddy/printtotal',
    method: 'post',
    data
  })
};
