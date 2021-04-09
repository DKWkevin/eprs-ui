/**
 *
 * 九州通接口
 * by liuqiao
 */
import axios from '../axios'

// 单位管理   查询
export const selectDwgl = (data) => {
    return axios({
        url: 'dwgl/select',
        method: 'post',
        data
    })
};
// 单位管理   新增
export const insertDwgl = (data) => {
    return axios({
        url: 'dwgl/insert',
        method: 'post',
        data
    })
};
// 单位管理   同步
export const uploadDwgl = (data) => {
    return axios({
        url: 'dwgl/syc',
        method: 'post',
        data
    })
};


// 货品管理   查询
export const selectHpgl = (data) => {
    return axios({
        url: 'hpgl/select',
        method: 'post',
        data
    })
};
// 货品管理   新增
export const insertHpgl = (data) => {
    return axios({
        url: 'hpgl/insert',
        method: 'post',
        data
    })
};
// 货品管理   同步
export const uploadHpgl = (data) => {
    return axios({
        url: 'hpgl/syc',
        method: 'post',
        data
    })
};


// 采购入库   查询
export const selectCgrk = (data) => {
    return axios({
        url: 'cgrk/select',
        method: 'post',
        data
    })
};
// 采购入库   新增
export const insertCgrk = (data) => {
    return axios({
        url: 'cgrk/insert',
        method: 'post',
        data
    })
};
// 采购入库   同步
export const uploadCgrk = (data) => {
    return axios({
        url: 'cgrk/syc',
        method: 'post',
        data
    })
};
// 采购入库   明细查询
export const selectCgrkDtl = (data) => {
    return axios({
        url: 'rkhc/select',
        method: 'post',
        data
    })
};
// 采购入库   记账
export const accCgrk = (data) => {
    return axios({
        url: 'cgrkjz/select',
        method: 'post',
        data
    })
};


// 销售退回   查询
export const selectXsth = (data) => {
    return axios({
        url: 'xsth/select',
        method: 'post',
        data
    })
};
// 销售退回   新增
export const insertXsth = (data) => {
    return axios({
        url: 'xsth/insert',
        method: 'post',
        data
    })
};
// 销售退回   同步
export const uploadXsth = (data) => {
    return axios({
        url: 'xsth/syc',
        method: 'post',
        data
    })
};
// 销售退回   明细查询
export const selectXsthDtl = (data) => {
    return axios({
        url: 'xsthhc/select',
        method: 'post',
        data
    })
};
// 销售退回   记账
export const accXsth = (data) => {
    return axios({
        url: 'xsthjz/select',
        method: 'post',
        data
    })
};



// 销售出库   查询
export const selectXsck = (data) => {
    return axios({
        url: 'xsck/select',
        method: 'post',
        data
    })
};
// 销售出库   新增
export const insertXscks = (data) => {
    return axios({
        url: 'xsck/insert',
        method: 'post',
        data
    })
};
// 销售出库   同步
export const uploadXsck = (data) => {
    return axios({
        url: 'xsck/syc',
        method: 'post',
        data
    })
};
// 销售出库   明细查询
export const selectXsckDtl = (data) => {
    return axios({
        url: 'xsckhc/select',
        method: 'post',
        data
    })
};
// 销售出库   记账
export const accXsck = (data) => {
    return axios({
        url: '/xsckjz/select',
        method: 'post',
        data
    })
};



// 购进退出    查询
export const selectGjtc = (data) => {
    return axios({
        url: 'gjtc/select',
        method: 'post',
        data
    })
};
// 购进退出    新增
export const insertGjtc = (data) => {
    return axios({
        url: 'gjtc/insert',
        method: 'post',
        data
    })
};
// 购进退出    同步
export const uploadGjtc = (data) => {
    return axios({
        url: 'gjtc/syc',
        method: 'post',
        data
    })
};
// 购进退出   明细查询
export const selectGjtcDtl = (data) => {
    return axios({
        url: 'gjtchc/select',
        method: 'post',
        data
    })
};
// 购进退出   记账
export const accGjtc = (data) => {
    return axios({
        url: 'gjtcjz/select',
        method: 'post',
        data
    })
};


// 库存查询  查询
export const selectKccx = (data) => {
    return axios({
        url: 'jztkc/select',
        method: 'post',
        data
    })
};

// 采购入库验收记录  查询
export const selectCgrkysjl = (data) => {
    return axios({
        url: 'cgrkysjl/select',
        method: 'post',
        data
    })
};

//销售退回验收记录 查询
export const selectXsthysjl = (data) => {
    return axios({
        url: 'xsthysjl/select',
        method: 'post',
        data
    })
};


//  销售出库复核记录  xsckfhjl
export const selectXsckfhjl= (data) => {
    return axios({
        url: 'xsckfhjl/select',
        method: 'post',
        data
    })
};


// 采购退出复核记录  cgtcfhjl
export const selectCgtcfhjl= (data) => {
    return axios({
        url: 'cgtcfhjl/select',
        method: 'post',
        data
    })
};


//  在库养护记录  zkyhjl
export const selectZkyhjl= (data) => {
    return axios({
        url: 'zkwgjl/select',
        method: 'post',
        data
    })
};


//  不合格品台账 bhgptz
export const selectBhgptz= (data) => {
    return axios({
        url: 'bhgtz/select',
        method: 'post',
        data
    })
};


//  运输记录查询  ysjlcx
export const selectYsjlcx= (data) => {
    return axios({
        url: 'ysjlcx/select',
        method: 'post',
        data
    })
};

// 客户配送信息维护  khpsxxwh 查询
export const selectKhpsxxwh= (data) => {
  return axios({
    url: 'yszd/select',
    method: 'post',
    data
  })
};
// 客户配送信息维护  khpsxxwh 新增
export const insertKhpsxxwh= (data) => {
  return axios({
    url: 'yszd/insert',
    method: 'post',
    data
  })
};
// 客户配送信息维护  khpsxxwh 修改
export const updateKhpsxxwh= (data) => {
  return axios({
    url: 'yszd/update',
    method: 'post',
    data
  })
};
// 客户配送信息维护  Khpsxxwh 删除
export const deleteKhpsxxwh= (data) => {
  return axios({
    url: 'yszd/delete',
    method: 'post',
    data
  })
};
