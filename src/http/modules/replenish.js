import axios from '../axios'
// 查询
export const selectCgqdwh = (data) => {
  return axios({
    url: 'cgqdwh/select',
    method: 'post',
    data
  })
};

// 修改
export const updateCgqdwh = (data) => {
  return axios({
    url: 'cgqdwh/update',
    method: 'post',
    data
  })
};
// 更新补货记录
export const updateGbhml = (data) => {
  return axios({
    url: 'singlebutton/gxbhml',
    method: 'post',
    data
  })
};
// 查询仓储区域
export const selectBgzcxCcqy = (data) => {
  return axios({
    url: 'storeididhov/select',
    method: 'post',
    data
  })
};
// 查询保管账
export const selectBgzcx = (data) => {
  return axios({
    url: 'bgzcx/select',
    method: 'post',
    data
  })
};
// 查询采购支持
export const selectGysthxxwhBuyid = (data) => {
  return axios({
    url: 'hpjbxx/selectcgzc',
    method: 'post',
    data
  })
};
// 查询
export const selectGysthxwh = (data) => {
  return axios({
    url: 'gysthxxwh/select',
    method: 'post',
    data
  })
};
// 保存
export const insertGysthxwh = (data) => {
  return axios({
    url: 'gysthxxwh/insert',
    method: 'post',
    data
  })
};
// 修改
export const updateGysthxwh = (data) => {
  return axios({
    url: 'gysthxxwh/update',
    method: 'post',
    data
  })
};
// 查询总单
export const selectJhdcxDoc = (data) => {
  return axios({
    url: 'jhdcx/select',
    method: 'post',
    data
  })
};
// 查询细单
export const selectJhdcxDtl = (data) => {
  return axios({
    url: 'jhdcx/selectdtl',
    method: 'post',
    data
  })
};
// 查询进货明细
export const selectJhdcxjhmx = (data) => {
  return axios({
    url: 'jhmxcx/select',
    method: 'post',
    data
  })
};
//查询批次
export const selectJxbhpcxxpc = (data) => {
  return axios({
    url: 'jxbhpccx/select',
    method: 'post',
    data
  })
};
// 重置数量
export const resetJxbhxxcxNumber = (data) => {
  return axios({
    url: 'jxbhxxcx/update',
    method: 'post',
    data
  })
};
//审核批次
export const commitJxbhxxcxDoc = (data) => {
  return axios({
    url: 'jxbhxxcx/pcsh',
    method: 'post',
    data
  })
};
// 查询
export const selectJxbhxxcxDoc = (data) => {
  return axios({
    url: 'jxbhxxcx/select',
    method: 'post',
    data
  })
};
// 查询报错信息
export const selectJxbhxxcxError = (data) => {
  return axios({
    url: 'jxbhxxcx/selectcwxx',
    method: 'post',
    data
  })
};
// 修改
export const insertJxbhxxcxDtl = (data) => {
  return axios({
    url: 'jxbhxxcx/update',
    method: 'post',
    data
  })
};
//生成补货计划
export const deletePcgl = (data) => {
  return axios({
    url: 'singlebutton/pcglzfht',
    method: 'post',
    data
  })
};
//生成补货计划
export const updatePcgl = (data) => {
  return axios({
    url: 'singlebutton/pcglscht',
    method: 'post',
    data
  })
};
// 查询
export const selectQytxl = (data) => {
  return axios({
    url: 'qytxl/select',
    method: 'post',
    data
  })
};
// 删除
export const deleteQytxl = (data) => {
  return axios({
    url: 'qytxl/delete',
    method: 'post',
    data
  })
};
// 保存
export const insertQytxl = (data) => {
  return axios({
    url: 'qytxl/insert',
    method: 'post',
    data
  })
};
// 修改
export const updateQytxl = (data) => {
  return axios({
    url: 'qytxl/update',
    method: 'post',
    data
  })
};
//生成补货计划
export const updateScbhjh = (data) => {
  return axios({
    url: 'singlebutton/scbhjh',
    method: 'post',
    data
  })
};
//查询异常记录
export const selectScbhycjlYc = (data) => {
  return axios({
    url: 'scbhycjl/select',
    method: 'post',
    data
  })
};
// 查询生成订单合同
export const selectScddht = (data) => {
  return axios({
    url: 'scddht/select',
    method: 'post',
    data
  })
};
// 新增生成订单合同
export const inserScddht = (data) => {
  return axios({
    url: 'scddht/insert',
    method: 'post',
    data
  })
};
// 查询ls
export const selectWhspbhsxls = (data) => {
  return axios({
    url: 'whspbhsxls/select',
    method: 'post',
    data
  })
};
// 修改ls
export const insertWhspbhsxls = (data) => {
  return axios({
    url: 'whspbhsxls/selectcompanyv',
    method: 'post',
    data
  })
};
// 查询pf
export const selectWhspbhsxpf = (data) => {
  return axios({
    url: 'whspbhsxpf/select',
    method: 'post',
    data
  })
};
// 修改pf
export const insertWhspbhsxpf = (data) => {
  return axios({
    url: 'whspbhsxpf/selectcompanyv',
    method: 'post',
    data
  })
};
// 删除总单
export const deleteYwskcDoc = (data) => {
  return axios({
    url: 'ywskc/deleteall',
    method: 'post',
    data
  })
};
// 查询总单
export const selectYwskcDoc = (data) => {
  return axios({
    url: 'ywskc/select',
    method: 'post',
    data
  })
};
// 导入
export const exportYwskcInset = (data) => {
  return axios({
    url: 'ywskc/insert',
    method: 'post',
    data
  })
};
// 查询细单
export const seletYwskcDtl = (data) => {
  return axios({
    url: 'ywskc/selectwphskc',
    method: 'post',
    data
  })
};
// 保存细单
export const insertYwskcDtl = (data) => {
  return axios({
    url: 'ywskc/updatedtl',
    method: 'post',
    data
  })
};
// 删除细单
export const delYwskcDtl = (data) => {
  return axios({
    url: 'ywskc/deletedtl',
    method: 'post',
    data
  })
};
// 查询
export const selectYwydywxh = (data) => {
  return axios({
    url: 'ywydywxh/select',
    method: 'post',
    data
  })
};
// 修改
export const deleteYwydywxh = (data) => {
  return axios({
    url: 'ywydywxh/delete',
    method: 'post',
    data
  })
};
// 保存
export const insertYwydywxh = (data) => {
  return axios({
    url: 'ywydywxh/insert',
    method: 'post',
    data
  })
};
// 修改
export const updateYwydywxh = (data) => {
  return axios({
    url: 'ywydywxh/update',
    method: 'post',
    data
  })
};
// 计算金额
export const selectJhMxcxsum = (data) => {
  return axios({
    url: 'jhmxcx/selectsumtotal',
    method: 'post',
    data
  })
};
