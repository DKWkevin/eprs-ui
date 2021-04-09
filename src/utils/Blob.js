import axios from 'axios'
export function exportZip(url, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`${url} 请求数据，参数=>`, JSON.stringify(options));
    axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8';
    axios.defaults.headers['token'] = sessionStorage['token'];
    axios({
      method: 'post',
      url: url, // 请求地址
      data: options, // 参数
      withCredentials: true,
      timeout: 1200000,
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data);
        let blob = new Blob([response.data], {
          type: 'application/x-download'
        });
        console.log(blob);
        let fileName = Date.parse(new Date()) + '.zip';
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName)
        } else {
          // console.log(3)
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href)
        }
      },
      err => {
        reject(err)
      }
    ).catch(error=>{
      alert(error)
      console.log(error)
    })
  })
}
import { baseUrl } from '@/utils/global'
export function downloadFile(url,_this){
  _this.loading=true;
  axios({
    method: "get",
    url: `${baseUrl}${url}`,
    responseType: 'blob',
    headers: {
      token: sessionStorage.getItem("token")
    }
  }).then(response => {
      //文件名 文件保存对话框中的默认显示
      let fileName=response.headers["content-disposition"].toString().split("=")[1];
      let data = response.data;
      if(!data){
        return
      }

      //构造a标签 通过a标签来下载
      let url = window.URL.createObjectURL(new Blob([data]));
      let a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      //此处的download是a标签的内容，固定写法，不是后台api接口
      a.setAttribute('download',fileName);
      document.body.appendChild(a);
      //点击下载
      a.click();
      // 下载完成移除元素
      document.body.removeChild(a);
      // 释放掉blob对象
      window.URL.revokeObjectURL(url);
      _this.loading=false;
    }).catch(response => {
      alert("下载失败");
      _this.loading=false;
    });
}
