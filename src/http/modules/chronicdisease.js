import axios from '../axios'

export const selectGoodsList = (data) => {
  return axios({
    url: 'mbspml/select',
    method: 'post',
    data
  })
};
export const saveDoc = (data) => {
  return axios({
    url: 'mbspml/insert',
    method: 'post',
    data
  })
};
