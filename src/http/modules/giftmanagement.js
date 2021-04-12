import axios from '../axios'
//目录： 赠品管理

// 商品维护  Spwh   spwh  查
export const selectSpwh = (data) => {
    return axios({
        url: 'freegoods/select',
        method: 'post',
        data
    })
};
// 商品维护  Spwh   spwh  修改
export const updateSpwh = (data) => {
    return axios({
        url: 'freegoods/update',
        method: 'post',
        data
    })
};
// 商品维护  Spwh   spwh  新增
export const insertSpwh = (data) => {
    return axios({
        url: 'freegoods/insert',
        method: 'post',
        data
    })
};


// 商品入库  Sprk   sprk  查
export const selectSprk = (data) => {
    return axios({
        url: 'freegoodsSu/select',
        method: 'post',
        data
    })
};
// 商品入库 Sprk   sprk  修改
export const updateSprk = (data) => {
    return axios({
        url: 'freegoodsSu/update',
        method: 'post',
        data
    })
};
// 商品入库  Sprk   sprk  新增
export const insertSprk = (data) => {
    return axios({
        url: 'freegoodsSu/insert',
        method: 'post',
        data
    })
};



// 商品出库  Sprk   sprk  查
export const selectSpck = (data) => {
    return axios({
        url: 'fgzpck/select',
        method: 'post',
        data
    })
};
// 商品出库  Sprk   sprk  新增
export const insertSpck = (data) => {
    return axios({
        url: 'fgzpck/insert',
        method: 'post',
        data
    })
};

// 商品出库  销售单查询  
export const selectSpckRsInfo = (data) => {
    return axios({
        url: 'fgzpckdochov/select',
        method: 'post',
        data
    })
};


// 进销存查询  查询  
export const selectJxccx = (data) => {
    return axios({
        url: 'fgzpjxc/select',
        method: 'post',
        data
    })
};