  import {sysddl} from '@/http/modules/hov'
//日期格式化
export function dateFormat(fmt, data) {
  if(data==null||data===''){
    fmt=''
  }else{
    let ret;
    var date=new Date(data);
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      }
    }
  }
  return fmt;
}
//获取当前时间
export function getNewDateTime() {
    let ret;
    let date=new Date();
    let year=date.getFullYear().toString();       // 年
    let month=(date.getMonth() + 1).toString();    // 月
    let day=date.getDate().toString();          // 日
    let hours=date.getHours().toString();           // 时
    let minute=date.getMinutes().toString();         // 分
    let seconds=date.getSeconds().toString();        // 秒
    if(month>=0&&month<=9){
      month='0'+month;
    }
    if(day>0&&day<10){
      day='0'+day;
    }
    ret=year+'-'+month+'-'+day+' '+hours+':'+minute+':'+seconds;
    return ret;
}
//获取当前时间
function getNewDate() {
  let ret;
  let date=new Date();
  let year=date.getFullYear().toString();       // 年
  let month=(date.getMonth() + 1).toString();    // 月
  let day=date.getDate().toString();          // 日
  /*let hours=date.getHours().toString();           // 时
  let minute=date.getMinutes().toString();         // 分
  let seconds=date.getSeconds().toString();        // 秒*/
  if(month>=0&&month<=9){
    month='0'+month;
  }
  if(day>0&&day<10){
    day='0'+day;
  }
  ret=year+'-'+month+'-'+day;
  return ret;
}
//字段修改
export function disForm(list,id,termid,term,status){
  list.forEach(e => {
    if(e[id]===termid){
      e[term]=status;
    }
  })
}
//字段修改
export function tableLoading(list,id,status){
  let len=list.length-1;
  list[len].options.forEach(e => {
    if(e.id===id){
      e.loading=status;
    }
  })
}
//导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export function exportExcelTable(id,filename) {
 var wb=XLSX.utils.table_to_book(document.querySelector('#'+id));
 var wbout=XLSX.write(wb,{bookType: 'xlsx',bookSST: true, type: 'array'});
  try {
    FileSaver.saveAs(new Blob([wbout],{type: 'application/octet-stream'}),filename+'.xlsx');
  }catch (e) {
    if(typeof console == 'undefined'){
      console.log(e, wbout);
    }
  }
  return wbout;
}
export function exportExcelTableMb(header,filename) {
  var wb=XLSX.utils.table_to_book(header);
  var wbout=XLSX.write(wb,{bookType: 'xlsx',bookSST: true, type: 'array'});
  try {
    FileSaver.saveAs(new Blob([wbout],{type: 'application/octet-stream'}),filename+'.xlsx');
  }catch (e) {
    if(typeof console == 'undefined'){
      console.log(e, wbout);
    }
  }
  return wbout;
}
export function exportExcel(tHeader,filterVal,list,filename) {
  list.forEach(e => {
    Object.keys(e).forEach(es => {
      if(isNaN(e[es])&&!isNaN(Date.parse(e[es]))){
        e[es]=dateFormat('YYYY-mm-dd HH:MM:SS',e[es]);
      }
    })
  });
  require.ensure([],()=>{
    const { export_json_to_excel } = require('@/execl/Export2Excel');
    const data = formatJson(filterVal,list);
    export_json_to_excel(tHeader,data,filename);
  })
}
function exportExcelDOM(columns,list,filename) {
  let tHeader=[];
  let filterVal=[];
  columns.forEach(res => {
    if(res.prop!=="caozuo"){
      tHeader.push(res.label);
      filterVal.push(res.prop);
    }
  });
  list.forEach(e => {
    Object.keys(e).forEach(es => {
      if(isNaN(e[es])&&!isNaN(Date.parse(e[es]))){
        e[es]=dateFormat('YYYY-mm-dd HH:MM:SS',e[es]);
      }
    })
  });
  require.ensure([],()=>{
    let { export_json_to_excel } = require('@/execl/Export2Excel');
    let data = formatJson(filterVal,list);
    export_json_to_excel(tHeader,data,filename);
  })
}
export function formatJson(filterVal,jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
//导入
export function insertExecl(e,tableColumns){
  let fileName=e.target.files[0];
  let _this=this;
  let reader=new FileReader();
  reader.readAsBinaryString(fileName);
  let uploadData=[];
  reader.onload =function (e) {
    const workbook = XLSX.read(e.target.result, {type:"binary"});
    let sheetList = workbook.SheetNames;
    const ws=XLSX.utils.sheet_to_json(workbook.Sheets[sheetList]);
    ws.forEach(e=>{
      var sheetData={};
      tableColumns.forEach(res => {
        Object.keys(e).forEach(es=>{
          if(es===res.label){
            sheetData[res.prop]=e[es];
          }
        })
      });
      uploadData.push(sheetData)
    })
  };
  return uploadData;
}
//导入带默认值
export function insertExeclIn(e,tableColumns,params){
  let fileName=e.target.files[0];
  let _this=this;
  let reader=new FileReader();
  reader.readAsBinaryString(fileName);
  let uploadData=[];
  reader.onload =function (e) {
    const workbook = XLSX.read(e.target.result, {type:"binary"});
    let sheetList = workbook.SheetNames;
    const ws=XLSX.utils.sheet_to_json(workbook.Sheets[sheetList]);
    ws.forEach(e=>{
      var sheetData={};
      tableColumns.forEach(res => {
        Object.keys(e).forEach(es=>{
          if(es===res.label){
            sheetData[res.prop]=e[es];
          }
        })
      });
      Object.keys(params).forEach(e =>{
        sheetData[e]=params[e];
      });
      uploadData.push(sheetData)
    })
  };
  return uploadData;
}
//重置
export function formDataReset(dataList) {
  Object.keys(dataList).forEach(e => {
    dataList[e]=null;
  });
  return dataList;
}
export function formListFormat(dataList) {
  var params=[];
  dataList.forEach(e => {
    if(e.listStatus===0){
      let list={};
      list.type=e.listType;
      list.id=e.prop;
      list.label=e.label;
      list.updateStatus=e.updateStatus;
      list.disabled=e.listDisabled;
      list.perms=e.listPerms;
      list.options=e.options;
      list.required=e.required;
      list.defaultTime=e.defaultTime;
      list.hovData=e.hovData;
      list.ruleType=e.ruleType;
      list.btnDisabled=e.btnDisabled;
      list.validator=e.validator;
      params.push(list);
    }
  });
  return params;
}
export function formDataFormat(dataList) {
  var params={};
  dataList.forEach(e => {
    if(e.listStatus===0||e.listStatus===1){
      params[e.prop]=null;
    }
  });
  return params;
}
export function formDataFormatIn(dataList,ins) {
  var params={};
  dataList.forEach(e => {
    if(e.listStatus===0||e.listStatus===1){
      params[e.prop]=null;
    }
  });
  Object.keys(ins).forEach(e => {
    params[e]=ins[e];
  });
  return params;
}
//数据格式化
export function paramsFormat(data) {
  let keys=Object.keys(data);
  let formatdata={};
  keys.forEach(e => {
    if(data[e]!==null&&data[e]!==""){
      formatdata[e]=data[e];
    }
  });
  if(Object.keys(formatdata).length<=0){
    formatdata=null;
  }
  return formatdata;
}
//数据格式化
export function paramsFormatDate(data,dateArray) {
  let keys=Object.keys(data);
  let formatdata={};
  keys.forEach(e => {
    Object.keys(dateArray).forEach(item => {
      if(e === item){
        if(data[e]!==null&&data[e]!==""){
          formatdata[e] = new Date(data[e]);
        }
      }else{
        if(data[e]!==null&&data[e]!==""){
          formatdata[e] = data[e];
        }
      }
    })
  });
  return formatdata;
}

//下拉框赋值
export function selectOption(list,id,options){
  list.forEach(e => {
    if(e.id===id){
      e.options=options;
    }
  })
}
//数组字典Option
export function selectDdlOption(keyword){
      var params=[];
      sysddl(keyword).then(res => {
        if(res.code === 200){
          res.data.forEach(option => {
            params.push({value:option.ddlid,label:option.ddlname});
          })
        }
      });
      return params;
}
//数据字典Option带IN
export function selectDdlOptionNotIn(keyword,ins){
      var params=[];
      sysddl(keyword).then(res => {
        if(res.code === 200){
          res.data.forEach(option => {
            ins.forEach(str =>{
              if(str!==option.ddlid){
                params.push({value:option.ddlid,label:option.ddlname});
              }
            })
          })
        }
      });
  return params;
}
//数据字典Option带IN
export function selectDdlOptionIn(keyword,ins){
  var params=[];
  sysddl(keyword).then(res => {
    if(res.code === 200){
      res.data.forEach(option => {
        ins.forEach(str =>{
          if(str===option.ddlid){
            params.push({value:option.ddlid,label:option.ddlname});
          }
        })
      })
    }
  });
  return params;
}
//数组字典
export function selectDdl(list,termid,id,keyword){
  list.forEach(e => {
    if(e[termid]===id){
      var params=[];
      sysddl(keyword).then(res => {
        if(res.code === 200){
          res.data.forEach(option => {
            params.push({value:option.ddlid,label:option.ddlname});
          })
        }
      });
      e.options=params;
    }
  })
}
//数据字典带IN
export function selectDdlIn(list,termid,id,keyword,ins){
  list.forEach(e => {
    if(e[termid]===id){
      var params=[];
      sysddl(keyword).then(res => {
        if(res.code === 200){
          res.data.forEach(option => {
            ins.forEach(str =>{
              if(str===option.ddlid){
                params.push({value:option.ddlid,label:option.ddlname});
              }
            })
          });
          e.options=params;
        }
      })
    }
  })
}
//数据字典带IN
export function selectDdlNotIn(list,termid,id,keyword,ins){
  list.forEach(e => {
    if(e[termid]===id){
      var params=[];
      sysddl(keyword).then(res => {
        if(res.code === 200){
          res.data.forEach(option => {
            ins.forEach(str =>{
              if(str!==option.ddlid){
                params.push({value:option.ddlid,label:option.ddlname});
              }
            })
          });
          e.options=params;
        }
      })
    }
  })
}
//设置参数
export function selectFunction(list,termid,id,addid,funs){
  list.forEach(e => {
    if(e[termid]===id){
      e.addid=funs;
    }
  })
}
export function delCookie (name) {
  setCookie(name, '', -1)
}
// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cname, cvalue, expiredays) {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + (expiredays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + exdate.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires
}
//验证字段是否为空
export function returnValue(data){
  return data !== null && data !== "";
}
//表单制空
function formIsNull(data){
  Object.keys(data).forEach(item => {
    data[item] = null;
  });
}
export default {
  getNewDate,
  formIsNull,
  exportExcelDOM
}
