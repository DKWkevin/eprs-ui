import api from '@/http/api'
import {sysddl} from "@/http/modules/hov";

//查询采购支持
export function selectbuyid(){
  let params=[];
  api.hov.selectBuyid({pageNum:1,pageSize:999,params:null}).then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        let tel={};
        tel.value=e.buyerid;
        tel.label = e.buyername;
        params.push(tel);
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//查询城市
export function selectCityid(){
  let params=[];
  let companyid=Number(sessionStorage.getItem("companyid"));
  api.hov.cityid({pageNum:1,pageSize:999,params:{companyid:companyid}}).then(res => {
    if(res.code===200){
      res.data.content.forEach(e=>{
        let tel={};
        tel.value=e.cityid;
        tel.label = e.cityname;
        params.push(tel);
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//查询区域
export function selectGroup(cityid){
  let params=[];
  let companyid=Number(sessionStorage.getItem("companyid"));
  api.hov.groupid({pageNum:1,pageSize:999,params:{cityid:cityid,companyid:companyid}}).then(res => {
    if(res.code===200){
      res.data.content.forEach(e=>{
        let tel={};
        tel.value=e.groupid;
        tel.label = e.groupname;
        params.push(tel);
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//查询采购分组
export function selectCgfz(){
  let params=[];
  api.hov.selectCgfz({}).then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        let tel={};
        tel.value=e.groupid;
        tel.label = e.groupname;
        params.push(tel);
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//查询核算员
export function selectHsy(){
  let params=[];
  api.drops.selecthsy().then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.checker;
          tel.label = e.checker;
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//查询门店counteridhov
export function selectCity(){
  let params=[];
  let companyid=3;
  api.drops.selectCity({pageNum:1,pageSize:999,params:{companyid:companyid}}).then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.cityid;
          tel.label = e.cityname;
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//采购经理
export function selectManager(){
  let params=[];
  api.drops.selectMan({pageNum:1,pageSize:999,params:null}).then(res => {
    if(res.code===200){
      res.data.content.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.buyerid;
          tel.label = e.buyername;
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//品类查询
export function selectCategory(data) {
  let params=[];
  api.drops.selectCate({pageNum:1,pageSize:999,params:{categoryopcode:data}}).then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.cityid;
          tel.label = e.cityname;
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//部门
export function selectDept(data) {
  let params=[];
  let url='';
  if(data!==null&&data!==""){
    url={pageNum:1,pageSize:999,params:{companyidarr:data}};
  }else{
    url={pageNum:1,pageSize:999,params:null};
  }
  api.drops.selectDeptid(url).then(res => {
    if(res.code===200){
      res.data.content.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.companyid;
          tel.label = e.companyid + '-' + e.companyname;
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//价格类型
export function selectPrice() {
  let params=[];
  api.drops.selectPriceid({pageNum:1,pageSize:999,params:null}).then(res => {
    if(res.code===200){
      res.data.content.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.priceid;
          tel.label = e.pricename;
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//物流单位
export function selectWldw() {
  let params=[];
  api.drops.selectWldwCx({companyid:Number(sessionStorage['companyid'])}).then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.stcompanyid;
          tel.label = e.stcompanyname;
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//结算方式
export function selectJsfs(flag) {
  let params=[];
  sysddl('AP_SETTLEMODE').then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.ddlid;
          if(flag===true){
            tel.label = e.ddlid+" - "+e.ddlname;
          }else{
            tel.label = e.ddlname;
          }
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//付款方式
export function selectFkfs(flag) {
  let params=[];
  sysddl('AP_PAYMODE').then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.ddlid;
          if(flag===true){
            tel.label = e.ddlid+" - "+e.ddlname;
          }else{
            tel.label = e.ddlname;
          }
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//付款类型
export function selectFklx(flag) {
  let params=[];
  sysddl('PAY_TYPE').then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.ddlid;
          if(flag===true){
            tel.label = e.ddlid+" - "+e.ddlname;
          }else{
            tel.label = e.ddlname;
          }
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//录入人
export function selectEmployees(flag) {
  let params=[];
  api.drops.selectEmployee().then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.employeeid;
          if(flag===true){
            tel.label = e.employeeid+" - "+e.employeename;
          }else{
            tel.label = e.employeename;
          }
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//单据类型
export function selectDoctypes(flag) {
  let params=[];
  api.drops.selectDoctype().then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        if(e!==null){
          let tel={};
          tel.value=e.doctypeid;
          if(flag===true){
            tel.label = e.doctypeid+" - "+e.doctypename;
          }else{
            tel.label = e.doctypename;
          }
          params.push(tel);
        }
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//单据类型
export function selectDoctypesIn(flag,data) {
  let params=[];
  api.drops.selectDoctype().then(res => {
    if(res.code===200){
      res.data.forEach(e=>{
        data.forEach(es=>{
          if(e!==null&&es===e.doctypeid){
            let tel={};
            tel.value=e.doctypeid;
            if(flag===true){
              tel.label = e.doctypeid+" - "+e.doctypename;
            }else{
              tel.label = e.doctypename;
            }
            params.push(tel);
          }
        })
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
//公司及部门查询
export function selectCompanyOrDept(data) {
  let params=[];
  api.drops.selectCompanyAll({pageNum:1,pageSize:9999,params:data}).then(res => {
    if(res.code===200){
      res.data.content.forEach(e=>{
        let tel={};
        tel.value=e.companyid;
        tel.label = e.companyname;
        params.push(tel);
      });
    }
  }).catch(error => {
    return false;
  });
  return params;
}
