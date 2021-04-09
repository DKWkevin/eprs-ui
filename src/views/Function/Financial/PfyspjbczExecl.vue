<template>
<div id="execl">
  <div class="execlDiv">
    <div class="execl-header">
      <label class="label">导入</label>
      <a class="closeBtn" href="javascript:void(0)" @click="closeExecl()">X</a>
    </div>
    <div class="tableDiv">
      <div style="width:100%;height:25px;">
        <upload-button @upload="implUserExcel"></upload-button>
        <el-button type="primary" @click="saveAll" style="float:left;" :disabled="saveStatus">保存</el-button>
      </div>
      <div>
        <e-table
          :table-data="tableData"
          :table-columns="tableColumns"
          :table-height="tableHeight"
          :page-status="false"
        ></e-table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import UploadButton from "@/views/Core/uploadButton";
import ETable from "@/views/Core/ETable";
import {dateFormat} from "@/utils/functions"
import XLSX from 'xlsx'
export default {
  name: 'PfyspjbczExecl',
  components:{ETable, UploadButton},
  data(){
    return {
      saveStatus:true,
      tableHeight:430,
      tableColumns:[
        {prop:'id',label:'序号',type:0,tableStatus:0},
        {prop:'credate',label:'交票日',type:0,tableStatus:0},
        {prop:'outdate',label:'出票日',type:0,tableStatus:0},
        {prop:'enddate',label:'到期日',type:0,tableStatus:0},
        {prop:'bano',label:'票据号',type:0,tableStatus:0},
        {prop:'outbankname',label:'出票行',type:0,tableStatus:0},
        {prop:'total',label:'票据金额',type:0,tableStatus:0},
        {prop:'tocompanyid',label:'背书单位ID',type:0,tableStatus:0},
        {prop:'tocompanyname',label:'背书单位',type:0,tableStatus:0},
        {prop:'todate',label:'背书日期',type:0,tableStatus:0}
      ],
      tableData:[]
    }
  },
  methods:{
    saveAll(){
      let params={};
      params.data=[];
      this.tableData.forEach(e => {
        let tel={};
        tel.credate=new Date(dateFormat('YYYY-mm-dd HH:MM:SS',e.credate+' 00:00:00'));//交票日
        tel.outdate=new Date(dateFormat('YYYY-mm-dd HH:MM:SS',e.outdate+' 00:00:00'));//出票日
        tel.enddate=new Date(dateFormat('YYYY-mm-dd HH:MM:SS',e.enddate+' 23:59:59'));//到期日
        tel.bano=e.bano;//票据号
        tel.outbankid=e.outbankid;//出票行
        tel.total=e.total;//票据金额
        tel.tocompanyid=e.tocompanyid;//背书单位ID
        tel.todate=new Date(dateFormat('YYYY-mm-dd HH:MM:SS',e.todate+' 00:00:00'));//背书日期
        tel.companyid=Number(sessionStorage.getItem("companyid"));//公司
        tel.doctypeid=1;//票据类型
        tel.recbankname='兴业银行';//回款银行
        tel.outcompany='辽宁成大方圆医药连锁有限公司';//出票单位
        tel.customid=19940;//回款单位
        tel.handmanid=0;//交票人
        tel.inputmanid=0;//录入人
        if(tel.tocompanyid===""||tel.todate===""){
          tel.usestatus=4;//状态
        }else{
          tel.usestatus=5;//状态
        }
        tel.sourcetype=2;//票据来源
        tel.timers=1;//背书次数
        params.data.push(tel);
      });
      this.$api.financial.addPfyspjbczexcelCashier(params).then(res => {
        if(res.code === 200){
          if(res.data===1){
            alert("确认成功");
            this.closeExecl();
          }else {
            console.log(res.msg);
            alert(res.data);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    implUserExcel(e){
      let fileName=e.target.files[0];
      let _this=this;
      let reader=new FileReader();
      reader.readAsBinaryString(fileName);
      let uploadData=[];
      reader.onload =function (e) {
        uploadData=[];
        const workbook = XLSX.read(e.target.result, {type:"binary"});
        let sheetList = workbook.SheetNames[0];
        Object.keys(workbook.Sheets[sheetList]).forEach(e=>{
          if(workbook.Sheets[sheetList][e]['w']&&(workbook.Sheets[sheetList][e]['w'].indexOf('/')>=0||workbook.Sheets[sheetList][e]['w'].indexOf('-')>=0)){
              workbook.Sheets[sheetList][e]['v']=workbook.Sheets[sheetList][e]['w'];
          }
        });
        const ws=XLSX.utils.sheet_to_json(workbook.Sheets[sheetList]);
        ws.forEach(e=>{
          var sheetData={};
          _this.tableColumns.forEach(res => {
            Object.keys(e).forEach(es=>{
              if(es===res.label){
                if(res.prop==="outbankname"){
                  sheetData.outbankid=Number(e[es].split("-")[0]);
                  sheetData.outbankname=e[es].split("-")[1];
                }else{
                  sheetData[res.prop]=e[es];
                }
              }
            })
          });
          uploadData.push(sheetData)
        });
        _this.saveStatus = uploadData.length <= 0;
        console.log(uploadData);
        _this.tableData=uploadData;
      };
    },
    closeExecl(){
      this.$parent.execlStatus=false;
    },
    dateForm(format,numb){
      let formatDate = (numb, format = "-") => {
        let time = new Date(( numb - 1 ) * 24 * 3600000 + 1)
        time.setYear(time.getFullYear() - 70)
        let year = time.getFullYear() + ''
        let month = time.getMonth() + 1 + ''
        let date = time.getDate() + ''
        if (format && format.length === 1) {
          return year + format + month + format + date
        }
        return year + ( month < 10 ? '0' + month : month ) + ( date < 10 ? '0' + date : date )
      }
    }
  }
}
</script>

<style scoped>
#execl{width:100%;height:100%;position: fixed;top:0;left: 0;background: rgba(0,0,0,0.6);z-index: 99999}
  .execlDiv{width:800px;height:500px;background:white;margin:10% auto;border-radius: 5px;}
  a{text-decoration: none;}
  .execl-header{width:100%;height:40px;background:#eee;border-top-left-radius: 5px;border-top-right-radius: 5px;}
  .execl-header .label{line-height:40px;font-size:20px;font-family: 宋体,serif}
  .closeBtn{float:right;margin:10px 10px 0 0;font-size:20px;}
  .tableDiv{width:100%;height:460px;}
</style>
