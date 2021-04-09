<template>
<div class="updateKc">
  <el-dialog
    v-if="dtlVisible"
    :visible.sync="dtlVisible"
    :width="dialogWidth"
    :top="dialogTop"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="dialogClose"
  >
  <el-table :data="tableData" border :height="docHeight" :header-cell-style="headerStyle" v-loading="loading">
    <el-table-column prop="prioritiesno" label="优先级" width="30"></el-table-column>
    <el-table-column prop="goodsid" label="货品ID" sortable></el-table-column>
    <el-table-column prop="goodsname" label="品名" sortable></el-table-column>
    <el-table-column prop="goodstype" label="规格"></el-table-column>
    <el-table-column prop="prodarea" label="产地" sortable></el-table-column>
    <el-table-column prop="goodsunit" label="单位" width="50"></el-table-column>
    <el-table-column prop="baseunitqty" label="大包" sortable></el-table-column>
    <el-table-column prop="syxl" label="上月销"></el-table-column>
    <el-table-column prop="qqxl" label="前期销"></el-table-column>
    <el-table-column prop="lskc" label="大库库存" sortable width="100"></el-table-column>
    <el-table-column prop="zxcolumn1" label="说明" width="150">
      <template slot-scope="scope">
        <el-input v-model.number="scope.row.zxcolumn1"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="htsl" label="连锁有效合同" width="100"></el-table-column>
    <el-table-column prop="zxcolumn2" label="安全库存" width="150">
      <template slot-scope="scope">
        <el-input v-model.number="scope.row.zxcolumn2"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="pfyxht" label="批发有效合同" width="100"></el-table-column>
    <el-table-column prop="pfkc" label="批发库存">
    </el-table-column>
  </el-table>
    <div slot="footer">
      <div style="float:left;">
        <el-form :inline="true">
          <el-form-item label="合计金额">
            {{total}}
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="insert" v-loading="saveloading">保存</el-button>
        <el-button type="info" @click="dialogClose">取消</el-button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
//修改安全库存
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import ETable from "@/views/Core/ETable";
import {disForm, exportExcelDOM, getNewDate, selectDdl} from "@/utils/functions"
export default {
  name: 'CgddUpdateKc',
  components:{ETable, HovTools, EQuery},
  props:{
    dtlData:{type:Object}
  },
  data(){
    return{
      tableHeight:0,
      tableData:[],
      dtlVisible:true,
      dialogWidth:'100%',
      dialogTop:'0',
      dialogTitle:'修改安全库存',
      docHeight:'100%',
      total:0,
      loading:false,
      saveloading:false
    }
  },
  created(){
    this.selectDoc();
  },
  methods:{
    selectDoc(pageNum,pageSize){
      let params={};
      Object.keys(this.dtlData).forEach(e=>{
        if(this.dtlData[e]!==null&&this.dtlData[e]!==""){
          params[e]=this.dtlData[e];
        }
      });
      this.lmcompanyid=this.dtlData.lmcompanyid;
      this.supplyid=this.dtlData.supplyid;
      this.loading=true;
      this.tableData =[];
      this.$api.ordermanagement.selectCgddglUpdateKc(params).then(res => {
        if(res.code === 200){
          this.tableData = res.data;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    insert(){
      let data=this.tableData;
      let params=[];
      let flag=true;
      data.forEach(e => {
        if(isNaN(e.zxcolumn2)){
          alert("安全库存必须为数字");
          flag=false;
        }
        let tel={};
        tel.zxcolumn1=e.zxcolumn1;
        tel.zxcolumn2=e.zxcolumn2;
        tel.goodsid=e.goodsid;
        params.push(tel);
      });
      if(flag===false){
        return false;
      }
      this.saveloading=true;
      this.$api.ordermanagement.updateCgddglkc({data:params}).then(res => {
        if(res.code === 200){
          if(res.data===1){
            alert("更新成功");
            this.saveloading=false;
            this.dialogClose();
          }else{
            alert(res.msg);
            this.saveloading=false;
            return false;
          }
        }
      }).catch(error => {
        this.saveloading=false;
        return false;
      })
    },
    dialogClose(){
      this.dtlVisible=false;
      this.$parent.updatekcVisible=false;
    },
    returnValue(data){
      return data !== null && data !== "";
    },
    headerStyle({row,rowIndex}){
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    }
  }
}
</script>

<style scoped>
  .updateKc >>> .el-dialog{width:100%;height:100%;margin:0}
  .updateKc >>> .el-dialog__header{background:#f9f9f9}
  .updateKc >>> .el-dialog__body{width:100%;height:calc(100% - 120px);padding:0}
  .updateKc >>> .cell {
    /*text-align: center;*/
    white-space: pre-line;/*保留换行符*/
    display: block !important;
  }
  .updateKc >>> .el-dialog__headerbtn{font-size:23px;}
</style>
