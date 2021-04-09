<template>
<div class="SpjxxxDialog">
  <el-dialog :visible="dtlVisible" :width="dialogWidth" :title="title" :top="top" @close="closeDialog">
    <el-form label-width="100px" label-position="right">
      <el-form-item v-if="formType==='1'" label="客户ID" key="companyid" >
        <input type="text" disabled="disabled" class="inputText" id="card_companyid" style="width:30%">
        <input type="text" disabled="disabled" class="inputText" id="card_companyname" style="width:30%">
        <a href="javascript:void(0)" class="hovBtn" @click="myCompany()"><i class="el-icon-search" style="display:block;margin-top:9px;"></i></a>
      </el-form-item>
      <el-form-item v-if="formType==='2'" label="限定类型" key="type">
        <el-radio-group v-model="formData.type">
          <el-radio-button :label="-1">全部</el-radio-button>
         	<el-radio-button :label="2">按地区</el-radio-button>
         	<el-radio-button :label="1">按门店</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formType==='2'" label="门店类型" key="companytype">
       <el-radio-group size="mini" v-model="formData.companytype">
         <el-radio-button :label="-1">全部</el-radio-button>
         <el-radio-button :label="1">直营</el-radio-button>
         <el-radio-button :label="2">加盟</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formType==='2'||formType==='1'" label="禁销限销" key="jxorxx">
        <el-radio-group v-model="formData.jxorxx">
          <el-radio-button :label="-1">全部</el-radio-button>
         	<el-radio-button :label="1">禁销</el-radio-button>
         	<el-radio-button :label="2">限销</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button  type="primary" @click="queryDoc">查询</el-button>
      <el-button  type="primary" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="customVisible" :hov-data="customHov"></hov-tools>
</div>
</template>

<script>
  import HovTools from "@/views/Core/HovTools";
  import {selectCityid} from "@/utils/drops";

  export default {
  name: 'SpjxxxQuery',
  components:{HovTools},
  props:{formType:{type:String}},
  data () {
    return {
      dtlVisible:false,
      title:'查询条件',
      top:'18vh',
      dialogWidth:'500px',
      formData:{
        companyid:'',
        companytype:-1,
        jxorxx:-1,
        type:-1
      },
      customVisible:false,
      customHov:{
        hovTitle:'客户查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'customVisible',
        hovColumns:
          [
            {id: "companyid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"card_companyid"},
            {id: "companyname", name: "客户名称",queryStatus:true,dataStatus:1,fillid:'card_companyname'},
            {id: "companyopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  created(){
    selectCityid();
  },
  mounted(){
    this.dtlVisible=true;
  },
  methods:{
    queryDoc(){
      var data={};
      if(this.formType==="2"){
        data.companyid="";
        if(this.formData.companytype===-1){
          data.companytypearr="1,2";
        }else if(this.formData.companytype===1){
          data.companytypearr="1";
        }else if(this.formData.companytype===2){
          data.companytypearr="2";
        }
        if(this.formData.type===-1){
          data.typearr="1,2";
        }else if(this.formData.type===1){
          data.typearr="1";
        }else if(this.formData.type===2){
          data.typearr="2";
        }
      }else if(this.formType==="1"){
        data.companyid=document.getElementById("query_companyid").value;
        data.companytypearr="0";
        data.typearr="1";
      }
      if(this.formData.jxorxx===-1){
        data.jxorxx="0";
      }else{
        data.jxorxx=this.formData.jxorxx;
      }
      this.$emit("query",data);
      this.closeDialog();
    },
    myCompany(){
      this.customVisible=true;
    },
    closeDialog(){
      this.dtlVisible=false;
      this.$parent.query=false;
    },
    quKong(str){
      return str.replace(/\s+/g,"");
    }
  }
}
</script>

<style scoped>
  .SpjxxxDialog >>> .el-dialog__body{padding:0 2px 0 2px;height:200px;width:97%;margin:0 auto;}
</style>
