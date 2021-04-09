import axios from '../axios'

// 订单异常总单查询
export const selectDdycDoc = (data) => {
  return axios({
    url: 'ddyc/select',
    method: 'post',
    data
  })
};

// 订单异常细单
export const selectDdycDtl = (data) => {
  return axios({
    url: 'ddyc/selectdtl',
    method: 'post',
    data
  })
};

// 查询到货差异异常
export const selectDhcyycDoc = (data) => {
  return axios({
    url: 'dhcyyc/select',
    method: 'post',
    data
  })
};
// 查询破损超期未处理
export const selectCscqwcl = (data) => {
  return axios({
    url: 'pscqwcl/select',
    method: 'post',
    data
  })
};
// 代销补货异常总单查询
export const selectDxbhycDoc = (data) => {
  return axios({
    url: 'dxbhyc/select',
    //url: 'test/select',
    method: 'post',
    data
  })
};
// 代销补货异常细单查询
export const selectDxbhycDtl = (data) => {
  return axios({
    url: 'dxbhyc/selectdtl',
    method: 'post',
    data
  })
};
// 经销补货异常总单查询
export const selectJxbhycDoc = (data) => {
  return axios({
    url: 'jxbhyc/select',
    method: 'post',
    data
  })
};
// 经销补货异常细单查询
export const selectJxbhycDtl = (data) => {
  return axios({
    url: 'jxbhyc/selectdtl',
    method: 'post',
    data
  })
};
