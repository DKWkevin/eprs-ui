import axios from '../axios'

export const selectDqfzCounter = (data) => {
  return axios({
    url: 'dqtjfz/selectcityid',
    method: 'post',
    data
  })
};
//地区调剂分组新增总单
export const insertDqfzDoc = (data) => {
  return axios({
    url: 'dqtjfz/insertdoc',
    method: 'post',
    data
  })
};
//地区调剂分组新增细单
export const insertDqfzDtl = (data) => {
  return axios({
    url: 'dqtjfz/insertdtl',
    method: 'post',
    data
  })
};
//地区调剂分组删除总单
export const deleteDqfzDoc = (data) => {
  return axios({
    url: 'dqtjfz/deletedoc',
    method: 'post',
    data
  })
};
//地区调剂分组删除细单
export const delDqfzDtl = (data) => {
  return axios({
    url: 'dqtjfz/deletedtl',
    method: 'post',
    data
  })
};
//地区调剂分组查询细单
export const selectDqfzDtl = (data) => {
  return axios({
    url: 'dqtjfz/selectdtl',
    method: 'post',
    data
  })
};
//商品经营角色维护查询
export const selectSpjyjswh = (data) => {
  return axios({
    url: 'spjyjswh/select',
    method: 'post',
    data
  })
};
//商品经营角色维护删除
export const delSpjyjswh = (data) => {
  return axios({
    url: 'spjyjswh/delete',
    method: 'post',
    data
  })
};
//商品经营角色维护新增
export const insertSpjyjswh = (data) => {
  return axios({
    url: 'spjyjswh/insert',
    method: 'post',
    data
  })
};
//商品经营角色维护修改
export const updateSpjyjswh = (data) => {
  return axios({
    url: 'spjyjswh/update',
    method: 'post',
    data
  })
};
//商品经营角色维护导入
export const uploadSpjyjswh = (data) => {
  return axios({
    url: 'spjyjswh/importexcel',
    method: 'post',
    data
  })
};
//河北药监货品对照查询
export const selectHbyjhpdz = (data) => {
  return axios({
    url: 'hbyjhpdz/select',
    method: 'post',
    data
  })
};
//河北药监货品对照删除
export const delHbyjhpdz = (data) => {
  return axios({
    url: 'hbyjhpdz/delete',
    method: 'post',
    data
  })
};
//河北药监货品对照新增
export const insertHbyjhpdz = (data) => {
  return axios({
    url: 'hbyjhpdz/insert',
    method: 'post',
    data
  })
};
//单位区域编码对照查询
export const selectDwqybmdz = (data) => {
  return axios({
    url: 'dwqybmdz/select',
    method: 'post',
    data
  })
};
//单位区域编码对照新增
export const insertDwqybmdz = (data) => {
  return axios({
    url: 'dwqybmdz/insert',
    method: 'post',
    data
  })
};
//单位区域编码对照删除
export const delDwqybmdz = (data) => {
  return axios({
    url: 'dwqybmdz/delete',
    method: 'post',
    data
  })
};
//库存调剂地区审核总查询
export const selectDqtjqshDoc = (data) => {
  return axios({
    url: 'kctjdqsh/select',
    method: 'post',
    data
  })
};
//库存调剂地区审核总查询
export const selectDqtjqshBtpzxyccx = (data) => {
  return axios({
    url: 'kctjdqsh/psdqkctjzxycselect',
    method: 'post',
    data
  })
};
//
export const dqtjdqshMdzxbtp = (data) => {
  return axios({
    url: 'kctjdqsh/counterImplement',
    method: 'post',
    data
  })
};
//
export const judgeremqty = (data) => {
  return axios({
    url: 'kctjdqsh/judgeremqty',
    method: 'post',
    data
  })
};
// 新增
export const saveDqtjqshDoc = (data) => {
  return axios({
    url: 'kctjdqsh/insert',
    method: 'post',
    data
  })
};
//库存调剂地区审核查询库存
export const selectDqtjqshDocs = (data) => {
  return axios({
    url: 'spjyjswh/select',
    method: 'post',
    data
  })
};
// 批量修改配送状态
export const updatemultiple = (data) => {
  return axios({
    url: 'kctjdqsh/updatemultiple',
    method: 'post',
    data
  })
};
// 修改调剂标志数量
export const updateTjbzsl = (data) => {
  return axios({
    url: 'kctjdqsh/update',
    method: 'post',
    data
  })
};
// 单条保存数据
export const insertSingle = (data) => {
  return axios({
    url: 'kctjdqsh/insertpsdqkctjgoodsseparate',
    method: 'post',
    data
  })
};
// 删除调剂标志数量
export const delDqtjdqshExecl = (data) => {
  return axios({
    url: 'kctjdqsh/deletepsdqkctjgoodsseparate',
    method: 'post',
    data
  })
};
// 查询
export const selectDqtjqshExecl = (data) => {
  return axios({
    url: 'kctjdqsh/psdqkctjselect',
    method: 'post',
    data
  })
};
// 导入
export const saveDqtjqshExecl = (data) => {
  return axios({
    url: 'kctjdqsh/psdqkctjinsert',
    method: 'post',
    data
  })
};
//库存调剂地区审核查询城市
export const cityid = (data) => {
  return axios({
    url: 'cityididhov/select',
    method: 'post',
    data
  })
};
//库存调剂地区审核查询区域(暂时没用上)
export const groupid = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//沈阳保管账查询
export const selectSybgzcx = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//沈阳调剂退货通知查询
export const selectSytjthtz = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//沈阳调剂退货通知查询细单
export const selectSytjthtzDtl = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//沈阳调剂退货通知查询细单
export const uploadSytjthtz = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//沈阳调剂退货通知查询细单
export const deleteSytjthtz = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//门店追加请货历史记录查询
export const selectMdzjqhlsjl = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区门店退货申请查询
export const selectDqndthsq = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区门店退货申请批量确认
export const confirmDqndthsq = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区门店退货申请导入
export const uploadDqndthsq = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划查询
export const selectDqshmdzjjh = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划批量审批
export const updateDqshmdzjjhPlsq = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划批量确认
export const updateDqshmdzjjhAll = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划新增
export const updateDqshmdzjjh = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划修改追加数量
export const updateDqshmdzjjhXgzjsl = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划审批
export const updateDqshmdzjjhSp = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划审批
export const deleteDqshmdzjjh = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划配送单元
export const selectDqshmdzjjhDistunid = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
//地区审核门店追加计划配送单元
export const selectO2okcsx = (data) => {
  return axios({
    url: 'dqtjfz/selectdoc',
    method: 'post',
    data
  })
};
