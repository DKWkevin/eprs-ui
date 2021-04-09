<template>
<div class="whspbhsxlsdtl">
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :width="dialogWidth"  :destroy-on-close="true" @close="colseDialog" :close-on-click-modal="false">
    <el-table :data="tableData" border :height="height">
      <el-table-column prop="sourceid" label="源单ID"></el-table-column>
      <el-table-column prop="sourcetypeid" label="源单类型"></el-table-column>
      <el-table-column prop="credate" label="日期" min-width="140">
        <template slot-scope="scope">
          {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row['credate'])}}
        </template>
      </el-table-column>
      <el-table-column prop="companyid" label="公司ID"></el-table-column>
      <el-table-column prop="goodsid" label="货品ID"></el-table-column>
      <el-table-column prop="goodsname" label="品名" min-width="120"></el-table-column>
      <el-table-column prop="goodsqty" label="数量"></el-table-column>
      <el-table-column prop="stcompanyid" label="保管单位ID"></el-table-column>
      <el-table-column prop="inputmanid" label="操作人ID"></el-table-column>
      <el-table-column prop="inputmanname" label="操作人"></el-table-column>
      <el-table-column prop="memo" label="备注"></el-table-column>
      <el-table-column prop="caozuo" label="操作" fixed="right" width="160">
        <template slot-scope="scope">
          <el-button type="primary" @click="deldtl(tableData)">删除</el-button>
          <el-button type="primary" @click="openDtl(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog :visible.sync="dtlVisible" :title="dtlTitle" :width="dialogWidth"  :destroy-on-close="true" @close="colsedtlDialog" :close-on-click-modal="false">
    <el-form :model="formData" :inline="inline">
      <el-form-item label="ID">
        <el-input v-model.number="formData.sourceid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货品ID">
        <el-input v-model="formData.goodsid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model.number="formData.goodsqty" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.memo" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="insertDtl">保存</el-button>
      <el-button type="info" @click="colsedtlDialog">取消</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import {dateFormat} from '@/utils/functions'
export default {
  name: 'YwskcDtl',
  props:{
    dtlData:{type:Object},
  },
  data(){
    return {
      dialogVisible:false,
      dialogTitle:'修改细单',
      dialogWidth:'1000px',
      inline:true,
      height:480,
      labelWidth:'124px',
      contactOptions:[],
      tableData:[],
      dtlVisible:false,
      dtlTitle:'修改信息',
      formData:{
        sourceid:null,
        goodsid:null,
        goodsqty:null,
        memo:null
      },
    }
  },
  created(){
    this.selectDtl();
  },
  mounted(){
    this.dialogVisible=true;
  },
  methods:{
    selectDtl(){
      let dataForm=this.dtlData;
      this.$api.replenish.seletYwskcDtl({goodsid:dataForm.goodsid}).then(res => {
        if(res.code===200){
          this.tableData=res.data;
        }
      }).catch(error => {
        return false;
      })
    },
    openDtl(row){
      Object.keys(this.formData).forEach(e => {
        this.formData[e]=row[e];
      });
      this.dtlVisible=true;
    },
    insertDtl(){
      let params={};
      Object.keys(this.formData).forEach(e => {
        params[e]=this.formData[e];
      });
      params.inputmanid=Number(sessionStorage['userid']);
      this.$api.replenish.insertYwskcDtl(params).then(res => {
        if(res.code===200){
          alert('修改成功');
          this.selectDtl();
          this.colsedtlDialog();
        }
      }).catch(error => {
        return false;
      })
    },
    deldtl(row){
      this.$api.replenish.delYwskcDtl({goodsid:row.goodsid,goodsqty:row.goodsqty,inputmanid:Number(sessionStorage['userid'])}).then(res => {
        if(res.code===200){
          alert('删除成功');
          this.selectDtl();
          this.colsedtlDialog();
        }
      }).catch(error => {
        return false;
      })
    },
    colseDialog(){
      this.dialogVisible=false;
      this.$parent.dtlVisible=false;
    },
    colsedtlDialog(){
      this.dtlVisible=false;
    },
    dateFormat(format,date){
      return dateFormat(format,date);
    }
  }
}
</script>

<style>
.whspbhsxlsdtl .el-dialog{max-height:580px;height:580px;}
.whspbhsxlsdtl .el-dialog__body{padding:0 2px 0 2px;overflow:auto;height:480px;}
.whspbhsxlsdtl .el-form-item{width:300px;}
.whspbhsxlsdtl .el-form-item__label{min-width:100px;max-width:130px;}
.whspbhsxlsdtl .el-input__inner{width:150px;}
.whspbhsxlsdtl .el-form-item__content{width:150px;}
</style>
