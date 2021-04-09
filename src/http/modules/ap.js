import axios from '../axios'

// 应付账查询查询
export const selectYfzcx = (data) => {
  return axios({
    url: 'yfzcx/select',
    method: 'post',
    data
  })
};
// 应付账查询金额
export const selectYfzcxJe = (data) => {
  return axios({
    url: 'yfzcx/selectremmoney',
    method: 'post',
    data
  })
};
// 进货付款
export const selectJhfk = (data) => {
  return axios({
    url: 'jhfk/select',
    method: 'post',
    data
  })
};
// 进货付款金额
export const selectJhfkJe = (data) => {
  return axios({
    url: 'jhfk/selecttotal',
    method: 'post',
    data
  })
};
// 承兑付款总单查询
export const selectCdfk = (data) => {
  return axios({
    url: 'cdfk/selectapbapaybind',
    method: 'post',
    data
  })
};
// 承兑付款细单查询
export const selectCdfkDtl = (data) => {
  return axios({
    url: 'cdfk/selectapbabind',
    method: 'post',
    data
  })
};
// 承兑付款付款单查询
export const selectCdfkLeft = (data) => {
  return axios({
    url: 'cdfk/selectapsupayment',
    method: 'post',
    data
  })
};
// 承兑付款票据查询
export const selectCdfkRight = (data) => {
  return axios({
    url: 'cdfk/selectapbabinddetail',
    method: 'post',
    data
  })
};
// 承兑付款银行查询
export const selectBank = (data) => {
  return axios({
    url: 'bankidhov/select',
    method: 'post',
    data
  })
};
// 承兑付款细单保存
export const insertCdfk = (data) => {
  return axios({
    url: 'cdfk/saveall',
    method: 'post',
    data
  })
};
//暂估帐查询总单查询
export const selectZgzcx = (data) => {
  return axios({
    url: 'zgzcx/select',
    method: 'post',
    data
  })
};
//暂估帐查询总单查询金额
export const selectZgzcxJe = (data) => {
  return axios({
    url: 'zgzcx/selecttotal',
    method: 'post',
    data
  })
};
//暂估帐查询细单查询
export const selectZgzcxDtl = (data) => {
  return axios({
    url: 'zgzcx/selectdtl',
    method: 'post',
    data
  })
};
//暂估帐查询细单查询导出
export const selectZgzcxQueryDtl = (data) => {
  return axios({
    url: 'zgzcx/selectdtl',
    method: 'post',
    data
  })
};
//付款明细查询总单查询
export const selectFkmxcx = (data) => {
  return axios({
    url: 'fkmxcx/select',
    method: 'post',
    data
  })
};

//预付款跟踪总单查询
export const selectYfkgz = (data) => {
  return axios({
    url: 'yfkgz/select',
    method: 'post',
    data
  })
};
//预付款跟踪细单查询
export const selectYfkgzDtl = (data) => {
  return axios({
    url: 'yfkgz/selectdtl',
    method: 'post',
    data
  })
};
//进货结算明细查询
export const selectJhjsmxcx = (data) => {
  return axios({
    url: 'jhjsmxcx/select',
    method: 'post',
    data
  })
};
//进货结算查询
export const selectJhjscx = (data) => {
  return axios({
    url: 'jhjscx/select',
    method: 'post',
    data
  })
};
//进货结算查询金额
export const selectJhjscxJe = (data) => {
  return axios({
    url: 'jhjscx/selecttotal',
    method: 'post',
    data
  })
};
//进货结算查询细单
export const selectJhjscxDtl = (data) => {
  return axios({
    url: '',
    method: 'post',
    data
  })
};
//进货结算查询冲调
export const updateChongDiao = (data) => {
  return axios({
    url: '',
    method: 'post',
    data
  })
};
//进货结算查询确认
export const updateConfirm = (data) => {
  return axios({
    url: '',
    method: 'post',
    data
  })
};
//进货结算查询税额调整
export const updateSltz = (data) => {
  return axios({
    url: '',
    method: 'post',
    data
  })
};
//进货付款源单细单
export const selectYdxd = (data) => {
  return axios({
    url: 'jhfk/selectap_su_settle_dtl',
    method: 'post',
    data
  })
};
//进货付款源单细单
export const selectYdxdOrder = (data) => {
  return axios({
    url: 'jhfk/selectcm_order_dtl',
    method: 'post',
    data
  })
};
//导出付款明细
export const downloadmx = (data) => {
  return axios({
    url: 'jhfk/selectfkmx',
    method: 'post',
    data
  })
};
//导出付款明细
export const selectYjwfmxcx = (data) => {
  return axios({
    url: 'yjwfmxcx/select',
    method: 'post',
    data
  })
};
