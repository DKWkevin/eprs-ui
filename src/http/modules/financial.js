import axios from '../axios'
// cbs查询
export const selectCnskcxcbs = (data) => {
  return axios({
    url: 'cnskcx/selectbankdtl',
    method: 'post',
    data
  })
};
// 细单查询
export const selectCnskcxdtl = (data) => {
  return axios({
    url: 'cnskcx/selectdtl',
    method: 'post',
    data
  })
};
// 总单确认
export const comfirmCnskcxDoc = (data) => {
  return axios({
    url: 'cnskcx/confirm',
    method: 'post',
    data
  })
};
// 总单作废
export const deleteCnskcxDoc = (data) => {
  return axios({
    url: 'cnskcx/invalid',
    method: 'post',
    data
  })
};
// 总单查询
export const selectCnskcx = (data) => {
  return axios({
    url: 'cnskcx/selectdoc',
    method: 'post',
    data
  })
};
// 细单提交
export const updateCnskcxDtl = (data) => {
  return axios({
    url: 'cnskcx/updatearrprecdtl',
    method: 'post',
    data
  })
};
// cbs提交
export const updateCnskcxcbs = (data) => {
  return axios({
    url: 'cnskcx/updateusestatus',
    method: 'post',
    data
  })
};
// 查询
export const selectPfyspjbcz = (data) => {
  return axios({
    url: 'pfyspjbcz/select',
    method: 'post',
    data
  })
};
// 保存
export const insertPfyspjbcz = (data) => {
  return axios({
    url: 'pfyspjbcz/addCashier',
    method: 'post',
    data
  })
};
// 编辑
export const updatePfyspjbcz = (data) => {
  return axios({
    url: 'pfyspjbcz/updateCashier',
    method: 'post',
    data
  })
};

// 确认
export const comfirmPfyspjbcz = (data) => {
  return axios({
    url: 'pfyspjbcz/updateCashier',
    method: 'post',
    data
  })
};
// 删除
export const deletePfyspjbczDtl = (data) => {
  return axios({
    url: 'pfyspjbcz/updateCashier',
    method: 'post',
    data
  })
};
// 导入
export const addPfyspjbczexcelCashier = (data) => {
  return axios({
    url: 'pfyspjbcz/addexcelCashier',
    method: 'post',
    data
  })
};
// 查询
export const selectXssk = (data) => {
  return axios({
    url: 'xssk/selectArSaSettleDoc',
    method: 'post',
    data
  })
}
// 确认
export const insertXssk = (data) => {
  return axios({
    url: 'xssk/insert',
    method: 'post',
    data
  })
}
// 查询
export const selectXsskDtl = (data) => {
  return axios({
    url: 'xssk/selectArSaSettleDtl',
    method: 'post',
    data
  })
}
// 查询
export const selectYsk = (data) => {
  return axios({
    url: 'ysk/select',
    method: 'post',
    data
  })
}
// 保存
export const saveYsk = (data) => {
  return axios({
    url: 'ysk/insert',
    method: 'post',
    data
  })
}
