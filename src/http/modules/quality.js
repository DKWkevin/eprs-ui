import axios from '../axios'

// 查询质量范围管理总单
export const selectZlfwglDoc = (data) => {
  return axios({
    url: 'zlfwgl/select',
    method: 'post',
    data
  })
};
// 新增质量范围管理总单
export const insertZlfwglDoc = (data) => {
  return axios({
    url: 'zlfwgl/insert',
    method: 'post',
    data
  })
};
// 修改质量范围管理总单
export const updateZlfwglDoc = (data) => {
  return axios({
    url: 'zlfwgl/update',
    method: 'post',
    data
  })
};
// 删除质量范围管理总单
export const deleteZlfwglDoc = (data) => {
  return axios({
    url: 'zlfwgl/delete',
    method: 'post',
    data
  })
};
// 查询质量范围管理细单
export const selectZlfwglDtl = (data) => {
  return axios({
    url: 'zlfwgl/selectDtl',
    method: 'post',
    data
  })
};
// 新增质量范围管理细单
export const insertZlfwglDtl = (data) => {
  return axios({
    url: 'zlfwgl/insertDtl',
    method: 'post',
    data
  })
};
// 修改质量范围管理细单
export const updateZlfwglDtl = (data) => {
  return axios({
    url: 'zlfwgl/updateDtl',
    method: 'post',
    data
  })
};
// 删除质量范围管理细单
export const deleteZlfwglDtl = (data) => {
  return axios({
    url: 'zlfwgl/deleteDtl',
    method: 'post',
    data
  })
};
// 删除质量范围管理总单下所有细单
export const deleteZlfwglAll = (data) => {
  return axios({
    url: 'zlfwgl/deleteAllDtl',
    method: 'post',
    data
  })
};
// 查询各公司货品质量信息管理
export const selectGgshpzlxxgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/select',
    method: 'post',
    data
  })
};
// 新增各公司货品质量信息管理
export const insertGgshpzlxxgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/insert',
    method: 'post',
    data
  })
};
// 修改各公司货品质量信息管理
export const updateGgshpzlxxgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/update',
    method: 'post',
    data
  })
};
// 删除各公司货品质量信息管理
export const deleteGgshpzlxxgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 查询药店分级管理经营范围
export const selectYdfjgljyfw = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 新增药店分级管理经营范围
export const insertYdfjgljyfw = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 修改药店分级管理经营范围
export const updateYdfjgljyfw = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 删除药店分级管理经营范围
export const deleteYdfjgljyfw = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 查询商品角色管理
export const selectSpjsgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 新增商品角色管理
export const insertSpjsgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 修改商品角色管理
export const updateSpjsgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 删除商品角色管理
export const deleteSpjsgl = (data) => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
    data
  })
};
// 证书刷新
export const selectSxzs = () => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
  })
};
//各公司单位证书管理查询
export const selectGgsdwzsgl = () => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
  })
};
//各公司单位证书管理查询细单
export const selectGgsdwzsglDtl = () => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
  })
};
//各公司单位证书管理新增
export const insertGgsdwzsgl = () => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
  })
};
//各公司单位证书管理修改
export const updateGgsdwzsgl = () => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
  })
};
//各公司单位证书管理删除
export const deleteGgsdwzsgl = () => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
  })
};
//各公司单位证书管理删除细单
export const deleteGgsdwzsglDtl = () => {
  return axios({
    url: 'ggshpzlxxgl/delete',
    method: 'post',
  })
};
// 查询
export const selectDwjbxxglDoc = (data) => {
  return axios({
    url: 'dwjbxxgl/selectcompanyv',
    method: 'post',
    data
  })
};
// 查询明细
export const selectDwjbxxglDtl = (data) => {
  return axios({
    url: 'dwjbxxgl/selectgsprzfw',
    method: 'post',
    data
  })
};
// 删除范围
export const selectDwjbxxglDtlDel = (data) => {
  return axios({
    url: 'dwjbxxgl/deletegsprzfw',
    method: 'post',
    data
  })
};
// 保存联系人信息
export const saveDwjbxxgllxr = (data) => {
  return axios({
    url: 'dwjbxxgl/insertpubcompanycontactinfo',
    method: 'post',
    data
  })
};
// 修改联系人信息
export const updateDwjbxxgllxr = (data) => {
  return axios({
    url: 'dwjbxxgl/updatepubcompanycontactinfo',
    method: 'post',
    data
  })
};
// 删除联系人信息
export const deleteDwjbxxgllxr = (data) => {
  return axios({
    url: 'dwjbxxgl/deletepubcompanycontactinfo',
    method: 'post',
    data
  })
};
// 删除固定业务
export const deleteDwjbxxglgdyw = (data) => {
  return axios({
    url: 'dwjbxxgl/deletepubcompanyfixcontactinfo',
    method: 'post',
    data
  })
};
// 新增固定业务
export const saveDwjbxxglcw = (data) => {
  return axios({
    url: 'dwjbxxgl/insertpubcompanyfinanceinfo',
    method: 'post',
    data
  })
};
// 修改固定业务
export const updateDwjbxxglcw = (data) => {
  return axios({
    url: 'dwjbxxgl/updatepubcompanyfinanceinfo',
    method: 'post',
    data
  })
};
// 修改基本信息
export const selectDwjbxxgllxr = (data) => {
  return axios({
    url: 'dwjbxxgl/selectpubcompanycontactinfo',
    method: 'post',
    data
  })
};
// 查询固定业务
export const selectDwjbxxglgdyw = (data) => {
  return axios({
    url: 'dwjbxxgl/selectpubcompanyfixcontactinfo',
    method: 'post',
    data
  })
};
// 查询固定业务
export const selectDwjbxxglcw = (data) => {
  return axios({
    url: 'dwjbxxgl/selectpubcompanyfinanceinfo',
    method: 'post',
    data
  })
};
// 保存基本信息
export const saveDwjbxxglBase = (data) => {
  return axios({
    url: 'dwjbxxgl/pubcompanyinsert',
    method: 'post',
    data
  })
};
// 修改基本信息
export const updateDwjbxxglBase = (data) => {
  return axios({
    url: 'dwjbxxgl/pubcompanyupdate',
    method: 'post',
    data
  })
};
// 保存固定业务
export const saveDwjbxxglgdyw = (data) => {
  return axios({
    url: 'dwjbxxgl/insertpubcompanyfixcontactinfo',
    method: 'post',
    data
  })
};
// 查询供应商管理
export const selectGysgl = (data) => {
  return axios({
    url: 'gysgl/select',
    method: 'post',
    data
  })
};
// 新增供应商管理
export const saveGysgl = (data) => {
  return axios({
    url: 'gysgl/add',
    method: 'post',
    data
  })
};
// 修改供应商管理
export const updateGysgl = (data) => {
  return axios({
    url: 'gysgl/update',
    method: 'post',
    data
  })
};
// 查询
export const selectHpjcsjwhDoc = (data) => {
  return axios({
    url: 'hpjbxx/select',
    method: 'post',
    data
  })
};
//新增基本信息
export const insertHpjcsjwhBase = (data) => {
  return axios({
    url: 'hpjbxx/insertjbxx',
    method: 'post',
    data
  })
};
//修改基本信息
export const updateHpjcsjwhBase = (data) => {
  return axios({
    url: 'hpjbxx/updatejbxx',
    method: 'post',
    data
  })
};
//新增包装信息
export const insertHpjcsjwhBzxx = (data) => {
  return axios({
    url: 'hpjbxx/insertbzxx',
    method: 'post',
    data
  })
};
//修改包装信息
export const updateHpjcsjwhBzxx = (data) => {
  return axios({
    url: 'hpjbxx/updatebzxx',
    method: 'post',
    data
  })
};
//查询包装信息
export const selectHpjcsjwhBzxx = (data) => {
  return axios({
    url: 'hpjbxx/selectbzxx',
    method: 'post',
    data
  })
};
//删除包装信息
export const delHpjcsjwhBzxx = (data) => {
  return axios({
    url: 'hpjbxx/deletebzxx',
    method: 'post',
    data
  })
};
// 保存质量信息
export const insertHpjcsjwhZlxx = (data) => {
  return axios({
    url: 'hpjbxx/insertorupdatezlxx',
    method: 'post',
    data
  })
};
// 查询质量信息
export const selectHpjcsjwhZlxx = (data) => {
  return axios({
    url: 'hpjbxx/selectzlxx',
    method: 'post',
    data
  })
};
// 保存采购经理
export const insertHpjcsjwhCgjl = (data) => {
  return axios({
    url: 'hpjbxx/insertorupdatecgjl',
    method: 'post',
    data
  })
};
// 查询采购经理
export const selectHpjcsjwhCgjl = (data) => {
  return axios({
    url: 'hpjbxx/selectcgjl',
    method: 'post',
    data
  })
};
// 保存组合品细单
export const insertHpjcsjwhZhp = (data) => {
  return axios({
    url: 'hpjbxx/insertzhp',
    method: 'post',
    data
  })
};
// 修改组合品细单
export const updateHpjcsjwhZhp = (data) => {
  return axios({
    url: 'hpjbxx/updatezhp',
    method: 'post',
    data
  })
};

//  查询组合品细单
export const selectHpjcsjwhZhp = (data) => {
  return axios({
    url: 'hpjbxx/selectzhp',
    method: 'post',
    data
  })
};
//  查询品类6
export const selectHpjcsjwhPL6 = (data) => {
  return axios({
    url: 'hpjbxx/selectcategoryid',
    method: 'post',
    data
  })
};
//  新增品类6
export const insertHpjcsjwhPL6 = (data) => {
  return axios({
    url: 'hpjbxx/insertgoodscategoryid',
    method: 'post',
    data
  })
};
//查询税收分类编码
export const selectHpjcsjwhssflbm = (data) => {
  return axios({
    url: 'hpjbxx/selectssflbm',
    method: 'post',
    data
  })
};
//采购分组分类2
export const selectHpjcsjwhCgfzfl = (data) => {
  return axios({
    url: 'hpjbxx/selectcgfzfl2def',
    method: 'post',
    data
  })
};
//查询客户管理
export const selectKhglDoc = (data) =>{
  return axios({
    url:'khgl/select',
    method:'Post',
    data
  })
};
//新增客户管理
export const saveKhgl = (data) =>{
  return axios({
    url:'khgl/add',
    method:'Post',
    data
  })
};
//修改客户管理
export const updateKhgl = (data) =>{
  return axios({
    url:'khgl/update',
    method:'Post',
    data
  })
};

//质量特殊控制信息  Zltskzxx  liuqiao
// 质量特殊控制信息 查询
export const selectZltskzxx = (data) => {
  return axios({
    url: '/zltskzxx/select',
    method: 'post',
    data
  })
}
//质量特殊控制信息 新增
export const insertZltskzxx = (data) => {
  return axios({
    url: '/zltskzxx/insert',
    method: 'post',
    data
  })
}
// 质量特殊控制信息 修改
export const updateZltskzxx = (data) => {
  return axios({
    url: '/zltskzxx/update',
    method: 'post',
    data
  })
}
// 质量特殊控制信息 删除
export const deleteZltskzxx = (data) => {
  return axios({
    url: '/zltskzxx/delete',
    method: 'post',
    data
  })
}


// 预警查询 Yjcx
// 预警查询 查询
export const selectYjcx = (data) => {
  return axios({
    url: '/yjcx/select',
    method: 'post',
    data
  })
}


// 赠品对照  Zpdz
// 赠品对照 查询
export const selectZpdz = (data) => {
  return axios({
    url: '/zpdz/select',
    method: 'post',
    data
  })
}
// 赠品对照 新增
export const insertZpdz = (data) => {
  return axios({
    url: '/zpdz/insert',
    method: 'post',
    data
  })
}


//合作伙伴调整  Hzhbtz
//合作伙伴调整  查询 采购分组 下拉菜单
export const selectHzhbtzClass1 =(data)=>{
  return axios({
    url: '/hzhbtz/select',
    method: 'post',
    data
  })
}
//合作伙伴调整 采购经理 下拉菜单
export const selectHzhbtzManagerid =(data)=>{
  return axios({
    url: '/hzhbtz/selectcgfzdef',
    method: 'post',
    data
  })
}

// 根据 公司id  采购分组id 查询 一个 采购经理
export const selectHzhbtzCgjl = (data)=>{
  return axios({
    url: '/hzhbtz/selectmanagerid',
    method: 'post',
    data
  })
}


//合作伙伴调整 最大数值分类 下拉菜单
export const selectHzhbtzClass2 =(data)=>{
  return axios({
    url: '/hzhbtz/selectcategory',
    method: 'post',
    data
  })
}

// 根据 公司id  采购分组id 查询 一个 最大数值分类
export const selectHzhbtzZdszfl =(data)=>{
  return axios({
    url: '/hzhbtz/selectclass2',
    method: 'post',
    data
  })
}

//合作伙伴调整 修改
export const updateHzhbtz =(data)=>{
  return axios({
    url: '/hzhbtz/update',
    method: 'post',
    data
  })
}
// 货品怠速查询
export const selectHpds =(data)=>{
  return axios({
    url: '/hpds/selecthpds',
    method: 'post',
    data
  })
}
// 货品怠速新增
export const insertHpds =(data)=>{
  return axios({
    url: '/hpds/inserthpds',
    method: 'post',
    data
  })
}
// 货品怠速修改
export const updateHpds =(data)=>{
  return axios({
    url: '/hpds/updatehpds',
    method: 'post',
    data
  })
}
// 货品怠速删除
export const deleteHpds =(data)=>{
  return axios({
    url: '/hpds/deletehpds',
    method: 'post',
    data
  })
}

// 采购渠道  Cgqd  cgqd  查询
export const selectCgqd = (data) => {
  return axios({
    url: 'cgqd/select',
    method: 'post',
    data
  })
}
// 采购渠道  Cgqd  cgqd  新增
export const insertCgqd = (data) => {
  return axios({
    url: 'cgqd/insert',
    method: 'post',
    data
  })
}
// 采购渠道  Cgqd  cgqd  修改
export const updateCgqd = (data) => {
  return axios({
    url: 'cgqd/update',
    method: 'post',
    data
  })
}
// 采购渠道  Cgqd  cgqd  查询 付款方式
export const selectCgqdPaymode = (data) => {
  return axios({
    url: 'cgqd/selectpaymode',
    method: 'post',
    data
  })
}
// 采购渠道  Cgqd  cgqd  查询  stcompany
export const selectCgqdStCompanyid = (data) => {
  return axios({
    url: 'cgqd/selectstcompany',
    method: 'post',
    data
  })
}

// 货品配送属性  Hppssx  hppssx  查询
export const selectHppssx = (data) => {
  return axios({
    url: '/hppssx/select',
    method: 'post',
    data
  })
}

// 货品配送属性  Hppssx  hppssx  新增
export const insertHppssx = (data) => {
  return axios({
    url: '/hppssx/insert',
    method: 'post',
    data
  })
}

// 货品配送属性  Hppssx  hppssx  修改
export const updateHppssx = (data) => {
  return axios({
    url: '/hppssx/update',
    method: 'post',
    data
  })
}

// 货品配送属性  Hppssx  hppssx  删除
export const deleteHppssx = (data) => {
  return axios({
    url: '/hppssx/delete',
    method: 'post',
    data
  })
}

// 货品配送属性  Hppssx  hppssx  导入
export const uploadHppssx = (data) => {
  return axios({
    url: '/hppssx/insertImport',
    method: 'post',
    data
  })
}


// 品类分类定义 Plfldy  plfldy  查询
export const selectPlfldy = (data) => {
  return axios({
    url: '/plfldy/select',
    method: 'post',
    data
  })
}

// 品类分类定义 Plfldy  plfldy  新增
export const insertPlfldy = (data) => {
  return axios({
    url: '/plfldy/insert',
    method: 'post',
    data
  })
}

// 品类分类定义 Plfldy  plfldy  修改
export const updatePlfldy = (data) => {
  return axios({
    url: '/plfldy/update',
    method: 'post',
    data
  })
}

// 品类分类定义 Plfldy  plfldy  删除
export const deletePlfldy = (data) => {
  return axios({
    url: '/plfldy/delete',
    method: 'post',
    data
  })
}

// 商品淘汰队列  Spttdl  spttdl  查询
export const selectSpttdl = (data) => {
  return axios({
    url: '/spttdl/select',
    method: 'post',
    data
  })
}
// 商品淘汰队列  Spttdl  spttdl  新增
export const insertSpttdl = (data) => {
  return axios({
    url: '/spttdl/insert',
    method: 'post',
    data
  })
}
// 商品淘汰队列  Spttdl  spttdl  修改
export const updateSpttdl = (data) => {
  return axios({
    url: '/spttdl/update',
    method: 'post',
    data
  })
}
// 商品淘汰队列  Spttdl  spttdl  修改状态 完成
export const updateSpttdlUsestatus = (data) => {
  return axios({
    url: '/spttdl/updateusestatus',
    method: 'post',
    data
  })
}
// 商品淘汰队列  Spttdl  spttdl  删除
export const deleteSpttdl = (data) => {
  return axios({
    url: '/spttdl/delete',
    method: 'post',
    data
  })
}

//批号管理  Phgl phgl   查询
export const selectPhgl = (data) => {
  return axios({
    url: '/phgl/select',
    method: 'post',
    data
  })
}
//批号管理  Phgl phgl   修改
export const updatePhgl = (data) => {
  return axios({
    url: '/phgl/update',
    method: 'post',
    data
  })
}

// 标准价格  Bzjg  bzjg  查询
export const selectBzjg = (data) => {
  return axios({
    url: '/bzjg/select',
    method: 'post',
    data
  })
}
// 标准价格  Bzjg  bzjg  新增
export const insertBzjg = (data) => {
  return axios({
    url: '/bzjg/insert',
    method: 'post',
    data
  })
}
// 标准价格  Bzjg  bzjg  修改
export const updateBzjg = (data) => {
  return axios({
    url: '/bzjg/update',
    method: 'post',
    data
  })
}
// 标准价格  Bzjg  bzjg  删除
export const deleteBzjg = (data) => {
  return axios({
    url: '/bzjg/delete',
    method: 'post',
    data
  })
}
//商品引进  Spyj  liuqiao
// 商品引进 查询
export const selectSpyj = (data) => {
  return axios({
    url: '/spyj/select',
    method: 'post',
    data
  })
}
// 商品引进 新增
export const insertSpyj = (data) => {
  return axios({
    url: '/spyj/insert',
    method: 'post',
    data
  })
}
// 商品引进 修改
export const updateSpyj = (data) => {
  return axios({
    url: '/spyj/update',
    method: 'post',
    data
  })
}
// 商品引进 删除
export const deleteSpyj = (data) => {
  return axios({
    url: '/spyj/delete',
    method: 'post',
    data
  })
}
