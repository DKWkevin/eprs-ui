import axios from '../axios'
import qs from 'qs'

/* 
 * 系统登录模块
 */

// 登录
export const login = data => {
    return axios({
        url: 'login',
        method: 'post',
        data
    })
}
// 登录
export const eprslogin = data => {
  return axios({
    url: 'eprslogin',
    method: 'post',
    data
  })
}

// 登出
export const logout = () => {
    return axios({
        url: 'logout',
        method: 'get'
    })
}
