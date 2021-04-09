import axios from '../axios'


// 保存
export const query = (url,data) => {
  return axios({
    url,
    method: 'post',
    data
  })
};

// ddl
export const sysddl = (data) => {
  return axios({
    url:'sys-ddl/select',
    method: 'post',
    data
  })
};
// 公司
export const selectCompanyid = (data) => {
  return axios({
    url:'companyidhov/selectcompanyid',
    method: 'post',
    data
  })
};
//查询区域
export const groupid = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//查询城市
export const cityid = (data) => {
  return axios({
    url: 'cityididhov/select',
    method: 'post',
    data
  })
};
//查询门店（dqfz）
export const selectCounter = (data) => {
  return axios({
    url: 'dqtjfz/selectcounterid',
    method: 'post',
    data
  })
};
//查询城市（dqfz）
export const selectCity = (data) => {
  return axios({
    url: 'dqtjfz/selectcityid',
    method: 'post',
    data
  })
};
//查询采购分组(hpjcsjwh)
export const selectCgfz = (data) => {
  return axios({
    url: 'hpjbxx/selectcgfz',
    method: 'post',
    data
  })
};
// 查询采购支持
export const selectBuyid = (data) => {
  return axios({
    url: 'hpjbxx/selectcgzc',
    method: 'post',
    data
  })
};
// 查询采购支持(hp)
export const selectCgzc = (data) => {
  return axios({
    url: 'hpjbxx/selectcgzcdef',
    method: 'post',
    data
  })
};
// counteridhov/select  门店
// customidhov/select  单位
// employeeididhov/select  人员
// outbankidhov/select  银行
// companyidhov/selectcompanyid  公司
// goodsidhov/select  货品
// contactinfoidhov/select  联系方式
//我在位面捡垃圾  我有一座垃圾厂  系统要逼我逆天 史上无赖大师兄  不凡小仙农  万界红包群  变身本子漫画家  诸天主宰 开局一枚铜钱 异界星辰至尊 诸天主宰 微信全能系统 逍遥农场
