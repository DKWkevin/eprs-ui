<template>
<div class="cdfkadd">
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog" style="width:100%;">
    <div class="supplyLine">
      <el-form :inline="true">
        <el-form-item label="供应商ID">
          <el-input v-model.number="base.supplyid" style="width:80%"></el-input>
          <el-button circle icon="el-icon-search" @click="openHov()"></el-button>
        </el-form-item>
        <el-form-item  label="付款日期">
          <el-date-picker v-model="credate" type="datetimerange"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="leftClick">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width:100%;overflow:auto;height:calc(100% - 50px);border-bottom:1px solid #ccc;">
      <div style="width:100%;margin-top:5px;">
        <div>
          <el-table :data="leftTableData" border :height="tableHeight" @selection-change="leftSelection">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="credate" label="付款日期">
              <template slot-scope="scope">
                {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row['credate'])}}
              </template>
            </el-table-column>
            <el-table-column prop="payid" label="付款单ID"></el-table-column>
            <el-table-column prop="supplyid" label="供应商ID"></el-table-column>
            <el-table-column prop="supplyname" label="供应商名称"></el-table-column>
            <el-table-column prop="sourceid" label="源单ID"></el-table-column>
            <el-table-column prop="total" label="金额"></el-table-column>
            <el-table-column prop="confirmdate" label="确认日期">
              <template slot-scope="scope">
                {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row['confirmdate'])}}
              </template>
            </el-table-column>
            <el-table-column prop="checker" label="核算员"></el-table-column>
          </el-table>
        </div>
        <div class="totalLine">
          <el-form :inline="inline">
            <el-form-item label="勾选金额">
              <el-input v-model="leftGxje" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="未勾选金额">
              <el-input v-model="leftWgxje" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="width:100%;margin-top:5px;">
        <div style="height:35px;">
          <el-form :inline="true">
            <el-form-item label="背书日期">
              <el-date-picker v-model="todate" type="datetimerange"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="rightClick">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table :data="rightTableData" border :height="tableHeight" @selection-change="rightSelection">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="outdate" label="出票日期" width="140">
              <template slot-scope="scope">
                {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row['outdate'])}}
              </template>
            </el-table-column>
            <el-table-column prop="tocompanyid" label="供应商ID" width="70"></el-table-column>
            <el-table-column prop="tocompanyname" label="供应商名称"></el-table-column>
            <el-table-column prop="bano" label="票据号" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="total" label="金额" width="100"></el-table-column>
            <el-table-column prop="outbankname" label="出票行" width="70"></el-table-column>
            <el-table-column prop="todate" label="背书日期" width="140">
              <template slot-scope="scope">
                {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row['todate'])}}
              </template>
            </el-table-column>
            <el-table-column prop="enddate" label="到期日" width="140">
              <template slot-scope="scope">
                {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row['enddate'])}}
              </template>
            </el-table-column>
            <el-table-column prop="sourcetypename" label="票据来源" width="70"></el-table-column>
            <el-table-column prop="outcompany" label="出票单位"></el-table-column>
            <el-table-column prop="employeename" label="人员" width="70"></el-table-column>
          </el-table>
        </div>
        <div class="totalLine">
          <el-form>
            <el-form :inline="inline">
              <el-form-item label="勾选金额">
                <el-input v-model="rightGxje" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="未勾选金额">
                <el-input v-model="rightWgxje" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </el-form>
        </div>
        <div class="totalLine">
          <el-form>
            <el-form :inline="inline">
              <el-form-item label="差额电汇回填金额">
                <el-input v-model="cedhhtje" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="bankno">
                  <el-option v-for="item in bankOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-form>
        </div>
      </div>
    </div>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" round @click="insertCdfk">保存</el-button>
      <el-button type="info" round @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>

<script>
import ETable from "@/views/Core/ETable";
import HovTools from "@/views/Core/HovTools";
import {dateFormat} from "@/utils/functions";
export default {
  name: 'CdfkAdd',
  components:{HovTools, ETable},
  props:{
    bankOptions:{type:Array}
  },
  data(){
    return{
      dialogVisible:false,
      dialogTitle:'新增细单',
      dialogWidth:'1000px',
      dialogTop:'0',
      base:{
        supplyid:null
      },
      credate:null,
      todate:null,
      tableHeight:225,
      leftTableData:[],
      leftGxje:0,
      leftTotal:0,
      leftWgxje:0,
      leftSelections:[],
      rightTableData:[],
      rightGxje:0,
      rightTotal:0,
      rightWgxje:0,
      rightSelections:[],
      inline:true,
      cedhhtje:0,
      bankno:null,
      supplyVisible:false,
      supplyHov:{
        hovTitle:'供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "base",
        parentVisible:'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "companyname", name: "供应商名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "供应商操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  mounted(){
    this.dialogVisible=true;
    let cdfkadd=document.querySelector(".cdfkadd");
    let eldialog=cdfkadd.querySelector(".el-dialog");
    eldialog.style.height=(window.innerHeight)+"px";
    eldialog.style.margin=0;
  },
  created(){
    this.credate=[this.getNewDate(0),this.getNewDate(1)];
    this.todate=[this.getNewDate(0),this.getNewDate(1)];
    this.bankno='422020100100009062';
  },
  methods:{
    leftClick(){
      let params={};
      if(this.base.supplyid!==null&&this.base.supplyid!==''){
        params.supplyid=this.base.supplyid;
        if(this.credate!==null&&this.credate!==''){
          params.startdate=this.credate[0];
          params.endofdate=this.credate[1];
        }
      }else{
        alert("请选择供应商");
        return false;
      }
      this.$api.ap.selectCdfkLeft(params).then(res => {
        if (res.code === 200) {
          this.leftTableData=res.data;
          let total=0;
          res.data.forEach(e => {
            total=total+e.total;
          });
          this.leftWgxje=total.toFixed(2);
          this.leftTotal=total.toFixed(2);
          this.cedhhtje=(this.leftGxje-this.rightGxje).toFixed(2);
        }
      }).catch(error => {
        return false;
      })
    },
    leftSelection(val){
      this.leftSelections=val;
      let total=0;
      val.forEach(e=>{
        total=total+e.total;
      });
      this.leftGxje=total.toFixed(2);
      this.leftWgxje=(this.leftTotal-total).toFixed(2);
      this.cedhhtje=(this.leftGxje-this.rightGxje).toFixed(2);
    },
    rightClick(){
      let params={};
      if(this.base.supplyid!==null&&this.base.supplyid!==''){
        params.tocompanyid=this.base.supplyid;
        if(this.todate!==null&&this.todate!==''){
          params.startdate=this.todate[0];
          params.endofdate=this.todate[1];
        }
      }else{
        alert("请选择供应商");
        return false;
      }
      this.$api.ap.selectCdfkRight(params).then(res => {
        if (res.code === 200) {
          this.rightTableData=res.data;
          let total=0;
          res.data.forEach(e => {
            total=total+e.total;
          });
          this.rightWgxje=total.toFixed(2);
          this.rightTotal=total.toFixed(2);
          this.cedhhtje=(this.leftGxje-this.rightGxje).toFixed(2);
        }
      }).catch(error => {
        return false;
      })
    },
    rightSelection(val){
      this.rightSelections=val;
      let total=0;
      val.forEach(e=>{
        total=total+e.total;
      });
      this.rightGxje=total.toFixed(2);
      if((this.rightTotal-total).toFixed(2)==="-0.00"){
        this.rightWgxje='0.00';
      }else{
        this.rightWgxje=(this.rightTotal-total).toFixed(2);
      }
      this.cedhhtje=(this.leftGxje-this.rightGxje).toFixed(2);
    },
    insertCdfk(){
      if(this.cedhhtje<0){
        alert("差额电汇回填金额不能小于0");
        return false;
      }
      let params={};
      if(this.leftSelections.length===0){
        alert("请选择付款单");
        return false;
      }
      if(this.rightSelections.length===0){
        alert("请选择票据");
        return false;
      }
      params.apbabindlist=[];
      this.rightSelections.forEach(e => {
        let selections={};
        Object.keys(e).forEach(es => {
          selections[es]=e[es];
        });
        selections.doctypeid=1;
        params.apbabindlist.push(selections);
      });
      if(this.cedhhtje>0){
        let single={};
        single.doctypeid=2;
        single.baid=0;
        single.total=this.cedhhtje;
        single.bankno=this.bankno;
        params.apbabindlist.push(single);
      }
      params.apbapaybindlist=[];
      this.leftSelections.forEach(e => {
        let selections={};
        Object.keys(e).forEach(es => {
          selections[es]=e[es];
        });
        selections.inputmanid=Number(sessionStorage['userid']);
        params.apbapaybindlist.push(selections);
      });
      this.$api.ap.insertCdfk(params).then(res => {
        if(res.code === 200){
          if(res.msg==="1"){
            alert('保存成功');
            this.closeDialog();
          }else{
            alert(res.data);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    openHov(){
      this.supplyVisible=true;
    },
    closeDialog(){
      this.dialogVisible=false;
      this.$parent.addVisible=false;
    },
    getNewDate(type) {
      let date=new Date();
      let year=date.getFullYear().toString();       // 年
      let month=date.getMonth().toString();    // 月
      let day=date.getDate().toString();          // 日
      if(type===0){
        return new Date(year, month, day, 0, 0, 0);
      }else if(type===1){
        return new Date(year, month, day, 23, 59, 59);
      }
    },
    //日期初始化方法
    dateFormat(format,date){
      return dateFormat(format,date);
    }
  }
}
</script>
<style>
  .cdfkadd .el-dialog{width:100%;}
  .cdfkadd .el-dialog__body{padding:0 2px 0 2px;height:calc(100% - 115px)}
  .supplyLine{width:100%;border-bottom:1px solid #ccc;border-top:1px solid #ccc;padding:5px 0;height:30px;}
  .totalLine{margin-top:5px;width:100%;height:30px;}
</style>
