import axios from '../axios'

// 出入库明细查询
export const selectCrkmxcx = (data) => {
  return axios({
    url: 'crkmxcx/select',
    method: 'post',
    data
  })
};
// 库存查询
export const selectKccx = (data) => {
  return axios({
    url: 'kccx/select',
    method: 'post',
    data
  })
};
// 安全库存更新
export const updateAqkc = (data) => {
  return axios({
    url: 'kccx/selectwldw',
    method: 'post',
    data
  })
};
