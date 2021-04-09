import axios from "../axios";

// 销售单查询总单查询
export const selectXsdcxDoc = (data) => {
  return axios({
    url: '/xsdcx/select',
    method: 'post',
    data
  })
}
// 销售单查询总单查询
export const selectXsdcxSum = (data) => {
  return axios({
    url: '/xsdcx/selecttotal',
    method: 'post',
    data
  })
}
// 销售单查询细单查询
export const selectXsdcxDtl = (data) => {
  return axios({
    url: '/xsdcx/selectdtl',
    method: 'post',
    data
  })
}
// 销售单查询物流查询
export const selectXsdcxWl = (data) => {
  return axios({
    url: '/dict/save',
    method: 'post',
    data
  })
}
// 销售单查询物流确认
export const confirmXsdcx = (data) => {
  return axios({
    url: '/xsdcx/confirm',
    method: 'post',
    data
  })
}
// 销售单查询物流确认
export const printXsdcx = (data) => {
  return axios({
    url: '/xsdcx/printdtl',
    method: 'post',
    data
  })
}
// 批发采购订单查询
export const selectPfcgdd = (data) => {
  return axios({
    url: '/pfcgdd/selectall',
    method: 'post',
    data
  })
}
// 批发采购订单查询
export const selectPfcgddDtl = (data) => {
  return axios({
    url: '/pfcgdd/createorder',
    method: 'post',
    data
  })
}
// 批发采购订单生成合同
export const updatePfcgdd = (data) => {
  return axios({
    url: '/pfcgdd/saveall',
    method: 'post',
    data
  })
}
// 批发采购订单付款提交
export const insertFkfs = (data) => {
  return axios({
    url: '/pfcgdd/createorder',
    method: 'post',
    data
  })
}

// 销售补差查询查询
export const selectXsbccxbgdw = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售补差查询查询
export const selectXsbccxDoc = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售补差查询金额查询
export const selectXsbccxSum = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售补差查询细单查询
export const selectXsbccxDtl = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售补差查询确认
export const confirmXsbccx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售补差查询确认
export const nullifyXsbccx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售退货通知查询总单查询
export const selectXsthtzcxDoc = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售退货通知查询细单查询
export const selectXsthtzcxDtl = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售退货通知查询细单查询
export const confirmXsthtzcx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
// 销售退货通知查询细单查询
export const nullifyXsthtzcx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询勾兑信息
export const selectXsjsGoudui = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//保存勾兑信息
export const insertXsjs = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//保存销售退货通知
export const insertXsthtz = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询销售结算细单查询
export const selectXsjsmxcx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询公司客户信用查询
export const selectGskhxycx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询 客户对应业务员
export const selectkhdyywy = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//新增 客户对应业务员
export const insertKhdyywy = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//删除 客户对应业务员
export const deletekhdyywy = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询 手工生成发票信息
export const selectSgscfpxx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//确认 手工生成发票信息
export const insertSgscfpxx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//确认 销售收款明细查询打印
export const selectXsskmxcxdy = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//确认 销售收款明细查询打印金额
export const selectXsskmxcxdySum = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询 低于成本销售审批表
export const selectDycbxsspb = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//新增 低于成本销售审批表
export const insertDycbxsspb = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//确认  低于成本销售审批表
export const confirmDycbxsspb = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//删除 低于成本销售审批表
export const deleteDycbxsspb = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询 销售补差明细查询
export const selectXsbcmxcx = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询细单 销售补差明细查询
export const selectXsbcmxcxDtl = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//查询细单 批发调账
export const selectPftzSadtlid = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//新增 按价格 批发调账
export const insertPftzPrice = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//新增 按客户 批发调账
export const insertPftzCustom = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
//新增 按批号 批发调账
export const insertPftzLotno = (data) => {
  return axios({
    url: '/pfcgdd/selectbgdw',
    method: 'post',
    data
  })
}
