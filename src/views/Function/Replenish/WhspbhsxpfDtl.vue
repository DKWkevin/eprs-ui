<template>
<div class="whspbhsxlsdtl">
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :width="dialogWidth"  :destroy-on-close="true" @close="colseDialog" :close-on-click-modal="false">
    <el-form :model="base" :inline="inline">
      <el-form-item label="公司ID">
        <el-input v-model.number="base.companyid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="base.companyname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货品ID">
        <el-input v-model.number="base.goodsid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="品名">
        <el-input v-model="base.goodsname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="base.goodstype" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="base.goodsunit" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input v-model="base.prodarea" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="供应商ID">
        <el-input v-model.number="base.supplyid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="库存上限">
        <el-input v-model.number="base.qty_ul"></el-input>
      </el-form-item>
      <el-form-item label="库存下限">
        <el-input v-model.number="base.qty_ll"></el-input>
      </el-form-item>
      <el-form-item label="修改人ID">
        <el-input v-model.number="base.modimanid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="修改人">
        <el-input v-model="base.modiman" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="insertDtl">保存</el-button>
      <el-button type="info" @click="colseDialog">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'WhspbhsxpfDtl',
  props:{
    dtlData:{type:Object}
  },
  data(){
    return {
      dialogVisible:false,
      dialogTitle:'修改细单',
      dialogWidth:'1000px',
      inline:true,
      labelWidth:'124px',
      contactOptions:[],
      base:{
        companyid:null,
        companyname:null,
        goodsid:null,
        goodsname:null,
        goodstype:null,
        goodsunit:null,
        prodarea:null,
        supplyid:null,
        qty_ul:null,
        qty_ll:null,
        modimanid:null,
        modiman:null
      }
    }
  },
  created(){
    this.contactOptions.push({value:0,label:0});
    this.contactOptions.push({value:this.dtlData.contactman,label:this.dtlData.contactman});
    Object.keys(this.dtlData).forEach(e => {
      this.base[e]=this.dtlData[e];
    });
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
      this.$api.replenish.insertWhspbhsxpf(params).then(res => {
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
