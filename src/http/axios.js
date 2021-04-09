import axios from 'axios';
import config from './config';
import router from '@/router'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
    });
    // request 请求拦截器
    instance.interceptors.request.use(
      config => {
        if(options.url!=='login'||options.url!=='eprslogin'){
          //let token = Cookies.get('token');
          let token=sessionStorage.getItem('token');
          // 发送请求时携带token
          if (token) {
            config.headers.token = token
          } else {
            // 重定向到登录页面
            router.push('/login');
          }
        }
        if(options.responseType==="blob"){
          config.responseType="blob";
        }
        return config
      },
      error => {
        // 请求发生错误时
        console.log('request:' + error);
        // 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
        }
        // 需要重定向到错误页面
        const errorInfo = error.response;
        if (errorInfo) {
          error = errorInfo.data;  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 响应拦截器
    instance.interceptors.response.use(
      response => {
        return response.data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = `${err.response.message}`;
              break;
            case 401:
              err.message = '未授权，请登录';
              break;
            case 403:
              //err.message = `${err.response.data.message}`
              break;
            case 404:
              err.message = `请求地址出错`;
              break;
            case 408:
              err.message = '请求超时';
              break;
            case 500:
              //err.message = '服务器内部错误'
              err.message=`${err.response.data.message}`;
              break;
            case 501:
              err.message = '服务未实现';
              break;
            case 502:
              err.message = '网关错误';
              break;
            case 503:
              err.message = '服务不可用';
              break;
            case 504:
              err.message = '网关超时';
              break;
            case 505:
              err.message = 'HTTP版本不受支持';
              break;
            default:
          }
        }
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    );
    // 请求处理
    instance(options).then(res => {
      resolve(res);
      return false
    }).catch(error => {
      console.log(error);
      if(error.response.status===403){
        if(error.response.data.message==='Access Denied'){
          router.push('/403')
        }else{
          alert(error.response.data.message);
          reject(error);
        }
      }else{
        alert(error);
        reject(error);
      }/*
      if(error.message === 'Network Error'){
        alert(error);
        reject(error);
      }else{

      }*/
    })
  })
}
