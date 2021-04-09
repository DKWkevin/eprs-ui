<template>
<div class="whspbhsxlsdtl">
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :width="dialogWidth"  :destroy-on-close="true" @close="colseDialog" :close-on-click-modal="false">
    <el-form :model="base" :inline="inline" v-if="dtlType===1">
      <el-form-item label="公司ID">
        <el-input v-model.number="base.orderqty"></el-input>
      </el-form-item>
      <el-form-item label="公司ID">
        <el-input v-model.number="base.addqty" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="errorData" border v-if="dtlType===2">
      <el-table-column prop="addid" label="ID"></el-table-column>
      <el-table-column prop="supplyid" label="供应商ID"></el-table-column>
      <el-table-column prop="companyname" label="供应商名称"></el-table-column>
      <el-table-column prop="goodsid" label="货品ID"></el-table-column>
      <el-table-column prop="goodsname" label="货品名称"></el-table-column>
      <el-table-column prop="goodstype" label="规格"></el-table-column>
      <el-table-column prop="goodsunit" label="单位"></el-table-column>
      <el-table-column prop="prodarea" label="产地"></el-table-column>
      <el-table-column prop="batchid" label="批次ID"></el-table-column>
      <el-table-column prop="memo" label="错误信息"></el-table-column>
    </el-table>
    <div slot="footer" style="text-align:center"  v-if="dtlType===1">
      <el-button type="primary" @click="insertDtl">保存</el-button>
      <el-button type="info" @click="colseDialog">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'JxbhxxcxDtl',
  props:{
    dtlType:{type:Number},
    dtlData:{type:Object},
  },
  data(){
    return {
      dialogVisible:false,
      dialogTitle:'修改细单',
      dialogWidth:'1000px',
      inline:true,
      labelWidth:'124px',
      errorData:[],
      base:{
        orderqty:null,
        addqty:null,
        batchid:null,
        addid:null
      }
    }
  },
  created(){
    if(this.dtlType===1){
      Object.keys(this.dtlData).forEach(e => {
        this.base[e]=this.dtlData[e];
      });
    }else if(this.dtlType===2){
      this.$api.replenish.selectJxbhxxcxError(this.dtlData).then(res => {
        if(res.code===200){
         this.errorData=res.data;
        }
      }).catch(error => {
        return false;
      })
    }
  },
  mounted(){
    this.dialogVisible=true;
  },
  methods:{
    insertDtl(){
      let params={};
      Object.keys(this.base).forEach(e => {
        params[e]=this.base[e];
      });
      this.$api.replenish.insertJxbhxxcxDtl(params).then(res => {
        if(res.code===200){
          alert('修改成功');
          this.$parent.queryFunction('query');
          this.colseDialog();
        }
      }).catch(error => {
        return false;
      })
    },
    colseDialog(){
      this.dialogVisible=false;
      this.$refs.dtlVisible=false;
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
