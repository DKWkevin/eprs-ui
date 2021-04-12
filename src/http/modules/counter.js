import axios from '../axios'

//门店冷藏商品出柜配送  Mdlcspcgps  liuqiao

// 门店冷藏商品出柜配送 查询
export const selectMdlcspcgps = (data) => {
    return axios({
        url: '/mdlcspcgps/select',
        method: 'post',
        data
    })
}

// 门店冷藏商品出柜配送 根据 id 查询 温度记录
export const selectMdlcspcgpsWdjlById = (data) => {
    return axios({
        url: '/mdlcspcgps/selectTempRecord',
        method: 'post',
        data
    })
}

// 门店冷藏商品出柜配送 根据 设备ID(MonitorID)/起运时间/收货时间  查询 温度记录
export const selectMdlcspcgpsWdjlByOuttime = (data) => {
    return axios({
        url: '/mdlcspcgps/selectwmstemp',
        method: 'post',
        data
    })
}
//  查询 最高 最低 温度
export const selectMdlcspcgpsMaxT = (data) => {
    return axios({
        url: '/mdlcspcgps/selectmaxmin',
        method: 'post',
        data
    })
}

// 门店冷藏商品出柜配送 根据设备编号MonitorNO 查询 设备信息
//   MonitorID  MonitorName  DeviceNO
export const selectMdlcspcgpsMonitorInfo = (data) => {
    return axios({
        url: '/mdlcspcgps/selectmonitor',
        method: 'post',
        data
    })
}

// 门店冷藏商品出柜配送   修改（配送）
export const updateMdlcspcgps = (data) => {
    return axios({
        url: '/mdlcspcgps/update',
        method: 'post',
        data
    })
}

// 门店冷藏商品出柜配送   修改（不配送）
export const updateMdlcspcgpsBps = (data) => {
    return axios({
        url: '/mdlcspcgps/update',
        method: 'post',
        data
    })
}


// 进销全程跟踪记录  jxqcgzjl  Jxqcgzjl
// 进销全程跟踪记录  查询
export const selectJxqcgzjl = (data) => {
    return axios({
        url: '/jxqcgzjl/select',
        method: 'post',
        data
    })
}

// 进销全程跟踪记录  查询细单   暂无接口
export const selectJxqcgzjlDtl = (data) => {
    return axios({
        url: '/jxqcgzjl/select',
        method: 'post',
        data
    })
}

// 入库验收记录  Rkysjl  rkysjl
//入库验收记录 查询
export const selectRkysjl = (data) => {
    return axios({
        url: '/rkysjl/select',
        method: 'post',
        data
    })
}

// 出柜记录  Cgjl  cgjl
//出柜记录 查询
export const selectCgjl = (data) => {
    return axios({
        url: '/cgjl/select',
        method: 'post',
        data
    })
}
//  送货记录  Shjl shjl
//  送货记录 查询
export const selectShjl = (data) => {
    return axios({
        url: '/shjl/select',
        method: 'post',
        data
    })
}


//  温度记录  Wdjl wdjl
//  温度记录 查询
export const selectWdjl = (data) => {
    return axios({
        url: '/wdjl/select',
        method: 'post',
        data
    })
}


//  冷链设备信息维护   Llsbxxwh  llsbxxwh
//  冷链设备信息维护  查询
export const selectLlsbxxwh = (data) => {
    return axios({
        url: '/llsbxxwh/select',
        method: 'post',
        data
    })
}

//  冷链设备信息维护  查询设备类型  下拉菜单  Monitortype
export const selectLlsbxxwhMonitortype = (data) => {
    return axios({
        url: '/llsbxxwh/select',
        method: 'post',
        data
    })
}


//  冷链设备信息维护  新增
export const insertLlsbxxwh = (data) => {
    return axios({
        url: '/llsbxxwh/insert',
        method: 'post',
        data
    })
}

//  冷链设备信息维护  修改
export const updateLlsbxxwh = (data) => {
    return axios({
        url: '/llsbxxwh/update',
        method: 'post',
        data
    })
}

//  冷链设备信息维护  修改状态
export const updateLlsbxxwhUsestatus = (data) => {
    return axios({
        url: '/llsbxxwh/',
        method: 'post',
        data
    })
}


// 门店冷藏商品收货  Mdlcspsh   mdlcspsh  查询
export const selectMdlcspsh = (data) => {
    return axios({
        url: '/mdlcspsh/select',
        method: 'post',
        data
    })
}
// 门店冷藏商品收货  Mdlcspsh   mdlcspsh   温度记录  查询
export const selectMdlcspshWdjlById = (data) => {
    return axios({
        url: '/mdlcspsh/',
        method: 'post',
        data
    })
}
// 门店冷藏商品收货  Mdlcspsh   mdlcspsh   温度记录  查询
export const selectMdlcspshWdjlByOuttime = (data) => {
    return axios({
        url: '/mdlcspsh/',
        method: 'post',
        data
    })
}
// 门店冷藏商品收货  Mdlcspsh   mdlcspsh   min max 温度  查询
export const selectMdlcspshMaxT = (data) => {
    return axios({
        url: '/mdlcspsh/',
        method: 'post',
        data
    })
}
// 门店冷藏商品收货  Mdlcspsh   mdlcspsh   设备信息  查询
export const selectMdlcspshMonitorInfo = (data) => {
    return axios({
        url: '/mdlcspsh/',
        method: 'post',
        data
    })
}
// 门店冷藏商品收货  Mdlcspsh   mdlcspsh   新增(不勾 调剂单)
export const insertMdlcspsh = (data) => {
    return axios({
        url: '/mdlcspsh/insert',
        method: 'post',
        data
    })
}
// 门店冷藏商品收货  Mdlcspsh   mdlcspsh   新增(勾选调剂单)
export const insertMdlcspshTjd = (data) => {
    return axios({
        url: '/mdlcspsh/',
        method: 'post',
        data
    })
}

//  冷藏商品冷柜在库温度  Lcsplgzkwd lcsplgzkwd  查询
export const selectLcsplgzkwd = (data) => {
    return axios({
        url: '/lcsplgzkwd/select',
        method: 'post',
        data
    })
}


//  门店退货申请查询 Mdthsqcx  mdthsqcx  查询
export const selectMdthsqcx = (data) => {
    return axios({
        url: '/lcsplgmdthsqcxzkwd/select',
        method: 'post',
        data
    })
}

// 门店申请退货  Mdsqth mdsqth 查询
export const selectMdsqth = (data) => {
    return axios({
        url: '/mdsqth/select',
        method: 'post',
        data
    })
}
// 门店申请退货  Mdsqth mdsqth 查询要修改的信息
export const selectMdsqthInfo = (data) => {
    return axios({
        url: '/mdsqth/',
        method: 'post',
        data
    })
}
// 门店申请退货  Mdsqth mdsqth   申请退货
export const insertMdsqth = (data) => {
    return axios({
        url: '/mdsqth/xxxx',
        method: 'post',
        data
    })
}

// 价签打印 Jqdy  jqdy  查询 打印数据
export const selectJqdyPrint = (data)=>{
    return axios({
        url: '/jqdy/selectprint',
        method: 'post',
        data
    })
}
//门店订单请货人员部门公司查询
export const selectDdpzphEmpDept = (data)=>{
  return axios({
    url: '/ddpzph/empdept',
    method: 'post',
    data
  })
}
//门店订单请货
export const selectDdpzph = (data)=>{
  return axios({
    url: '/ddpzph/select',
    method: 'post',
    data
  })
}
//门店订单请货作废细单
export const invoidDdpzph = (data)=>{
  return axios({
    url: '/ddpzph/invoid',
    method: 'post',
    data
  })
}
//门店订单请货确认细单
export const confirmDdpzph = (data)=>{
  return axios({
    url: '/ddpzph/confirm',
    method: 'post',
    data
  })
}
//门店订单请货提前生成销售
export const createDdpzph = (data)=>{
  return axios({
    url: '/ddpzph/createsadoc',
    method: 'post',
    data
  })
}
//门店订单请货提前生成销售
export const insertDdpzph = (data)=>{
  return axios({
    url: '/ddpzph/insert',
    method: 'post',
    data
  })
}
//门店订单请货修改配送地址
export const selectDdpzphGoodsBase = (data)=>{
  return axios({
    url: '/ddpzph/selectgoodsbase',
    method: 'post',
    data
  })
}

//门店订单请货修改配送地址
export const selectDdpzphGoodsRemqty = (data)=>{
  return axios({
    url: '/ddpzph/selectgoodsremqty',
    method: 'post',
    data
  })
}

//门店订单请货修改配送地址
export const insertDdpzphAddress = (data)=>{
  return axios({
    url: '/ddpzph/updateaddress',
    method: 'post',
    data
  })
}
