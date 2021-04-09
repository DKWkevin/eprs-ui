import axios from '../axios'

// 保存
export const selecthsy = (data) => {
  return axios({
    url:'gysgl/selecthsy',
    method: 'post',
    data
  })
};
// 保存
export const selectCity = (data) => {
  return axios({
    url:'counteridhov/select',
    method: 'post',
    data
  })
};
// 保存
export const selectMan = (data) => {
  return axios({
    url:'buyeridhov/select',
    method: 'post',
    data
  })
};
// 保存
export const selectCate = (data) => {
  return axios({
    url:'categoryidhov/select',
    method: 'post',
    data
  })
};
// 保存
export const selectDeptid = (data) => {
  return axios({
    url:'companyidhov/selectcompanyid',
    method: 'post',
    data
  })
};
// 保存
export const selectWldwCx = (data) => {
  return axios({
    url:'kccx/selectwldw',
    method: 'post',
    data
  })
};
// 保存
export const selectEmployee = (data) => {
  return axios({
    url:'jhjscx/selectemployeeid',
    method: 'post',
    data
  })
};
// 保存
export const selectDoctype = (data) => {
  return axios({
    url:'jhjscx/selectdoctypeid',
    method: 'post',
    data
  })
};
// 保存
export const selectCompanyAll = (data) => {
  return axios({
    url:'companyidhov/selectcompanyid',
    method: 'post',
    data
  })
};
