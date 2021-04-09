import axios from '../axios'

// 保存
export const inserDiscInfo = (data) => {
  return axios({
    url:'cxfagl/saveall',
    method: 'post',
    data
  })
};
// 查询地区
export const cityid = (data) => {
  return axios({
    url:'cityididhov/select',
    method: 'post',
    data
  })
};
// 查询门店
export const selectCounter = (data) => {
  return axios({
    url:'counteridhov/selectcounteridformal',
    method: 'post',
    data
  })
};
// 查询片区
export const selectSubcity = (data) => {
  return axios({
    url:'counteridhov/selectsubcityid',
    method: 'post',
    data
  })
};
// 查询门店
export const selectCounters = (data) => {
  return axios({
    url:'counteridhov/select',
    method: 'post',
    data
  })
};
// 查询卡类型
export const selectCardType = (data) => {
  return axios({
    url:'cardtypeidhov/select',
    method: 'post',
    data
  })
};
// 查询卡类型
export const selectDiscClass = (data) => {
  return axios({
    url:'cxfagl/selectDisc_class',
    method: 'post',
    data
  })
};
// 查询促销方案
export const selectDoc = (data) => {
  return axios({
    url:'cxfacx/select',
    method: 'post',
    data
  })
};
// 促销方案确认
export const discInfoComfirm = (data) => {
  return axios({
    url:'cxfacx/update',
    method: 'post',
    data
  })
};
// 促销方案删除
export const discInfoDelete = (data) => {
  return axios({
    url:'cxfacx/update',
    method: 'post',
    data
  })
};
// 查询促销方案门店
export const discInfoQueryCounter = (data) => {
  return axios({
    url:'cxfacx/selectdisc_counter_limit',
    method: 'post',
    data
  })
};
// 查询促销方案效期折扣方案
export const discInfoQueryDiscCount = (data) => {
  return axios({
    url:'cxfacx/selectdisc_invalidgoods_discount',
    method: 'post',
    data
  })
};
// 查询促销方案效期折扣货品限定
export const discInfoQueryDiscCountLimit = (data) => {
  return axios({
    url:'cxfacx/selectdisc_goods_invalid_limit',
    method: 'post',
    data
  })
};
// 查询促销方案立减
export const discInfoQueryRightReduce = (data) => {
  return axios({
    url:'cxfacx/selectDiscBindFullreduceReghtreduce',
    method: 'post',
    data
  })
};
// 查询促销方案立减货品限定
export const discInfoQueryRightReduceLimit = (data) => {
  return axios({
    url:'cxfacx/selectDiscBindFullreduceReghtreduceLimit',
    method: 'post',
    data
  })
};

// 查询互斥关系
export const selectDiscInfoDef = (data) => {
  return axios({
    url:'cxfacx/selectdiscinfodef',
    method: 'post',
    data
  })
};
