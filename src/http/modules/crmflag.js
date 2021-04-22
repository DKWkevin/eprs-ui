/**
 * 
 * Crm 会员标签管理
 * by liuqiao
 */
 import axios from '../axios'

 // 标签管理   查询
 export const selectBqgl = (data) => { 
     return axios({
         url: 'label/select',
         method: 'post',
         data
     })
 };
 // 标签管理   新增
 export const insertBqgl = (data) => {
     return axios({
         url: 'label/insertDef',
         method: 'post',
         data
     })
 };



 // 标签管理   修改状态
 export const updateBqgl = (data) => {
     return axios({
         url: 'label/updateStatus',
         method: 'post',
         data
     })
 };
 
 // 标签管理   数据定义             
 export const updateBqglSjdy = (data) => {
    return axios({
        url: 'label/insertData',
        method: 'post',
        data
    })
};
 

 // 标签查询   窗口查询 
 export const selectBqcx = (data) => {
     return axios({
         url: 'label/selectOperate',
         method: 'post',
         data
     })
 };
 // 标签查询   下载Excel
 export const selectBqcxExcel = (data) => {
     return axios({
         url: 'label/download',
         method: 'post',
         data
     })
 };