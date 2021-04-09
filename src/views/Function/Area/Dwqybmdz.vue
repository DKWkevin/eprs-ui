<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    @openHov="openHov"
    @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :table-width-status="false"
    @handle="handleFunction"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="title" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
    <el-form :model="base" :label-position="labelPosition" label-width="100px" style="width:300px;margin:0 auto">
      <el-form-item label="单位ID">
        <el-input v-model="base.supplyid" :disabled="true" style="width:80%;"></el-input>
        <el-button icon="el-icon-search" circle @click="dtlOpenHov()"></el-button>
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="base.supplyname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单位编码">
        <el-input v-model="base.hbsupplyno"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="insertForm" :loading="btnloading">保存</el-button>
      <el-button type="info" @click="dialogColse">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="supplyDtlVisible" :hov-data="supplyDtlHov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import {selectDdlOption, selectOption} from "@/utils/functions";
import ETable from "@/views/Core/ETable";
export default {
  name: 'Dwqybmdz',
  components:{ ETable, HovTools, EQuery},
  data(){
    return {
      formList:[
        {type:'inputHov',id:'supplyid',label:'单位ID',labelWidth:65,formWidth:180},
        {type:'input',id:'hbsupplyno',label:'单位编码'}
      ],
      formData:{supplyid:null,hbsupplyno:null},
      btnOptions:[
        {id:'query',icon:"fa fa-search", label:"action.search",perms:"region:dwqybmdz:select"},
        {id:'add',icon:"fa fa-plus", label:"action.add",perms:"region:dwqybmdz:add"}
      ],
      tableColumns:[
        {type:0,prop:'supplyid',label:'单位ID',tableStatus:0},
        {type:0,prop:'supplyname',label:'单位名称',tableStatus:0},
        {type:0,prop:'hbsupplyno',label:'单位编码',tableStatus:0},
        {type:1,prop:'caozuo',label:'操作',tableStatus:0,fixed:'right',width:90,widthStatus:true,options:[
            {id:'delete',label:'action.delete',icon:'fa fa-delete',perms:'region:dwqybmdz:delete'}
          ]}
      ],
      tableData:[],
      tableHeight:0,
      loading:false,
      addVisible:false,
      doctype:0,
      title:'新增表单',
      dtlData:{},
      base:{
        supplyid:null,
        supplyname:null,
        hbsupplyno:null
      },
      dialogVisible:false,
      dialogWidth:'700px',
      dialogTop:'12vh',
      labelPosition:'right',
      btnloading:false,
      supplyVisible:false,
      supplyHov:{
        hovTitle:'单位查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "单位ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "companyname", name: "单位名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "单位操作码",queryStatus:true,dataStatus:1}
          ]
      },
      supplyDtlVisible:false,
      supplyDtlHov:{
        hovTitle:'单位查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "base",
        parentVisible:'supplyDtlVisible',
        hovColumns:
          [
            {id: "companyid", name: "单位ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "companyname", name: "单位名称",queryStatus:true,dataStatus:1,fillid:"supplyname"},
            {id: "companyopcode", name: "单位操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
  },
  methods:{
    queryFunction(data){
      if(data==="query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data==="add"){
        this.dialogVisible=true;
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      this.$refs.query.collapse=false;
      let formData=this.formData;
      let params={};
      Object.keys(formData).forEach(e=>{
        if(formData[e]!==null&&formData[e]!==""){
          params[e]=formData[e];
        }
      });
      params.companyid=Number(sessionStorage['companyid']);
      this.loading=true;
      this.tableData=[];
      this.$api.area.selectDwqybmdz({pageNum:pageNum,pageSize:pageSize,params:params}).then(res=>{
        if(res.code===200){
          this.tableData=Object.freeze(res.data.content);
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error=>{
        this.loading=false;
        return false;
      })
    },
    handleFunction(data){
      if(data.id==="delete"){
        this.$api.area.delDwqybmdz({supplyid:data.row.supplyid}).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("删除成功");
              this.queryFunction('query');
            }else{
              alert(res.msg);
              return false;
            }
          }
        }).catch(error=>{
          return false;
        })
      }
    },
    openHov(data){
      this.supplyVisible=true;
    },
    dtlOpenHov(){
      this.supplyDtlVisible=true;
    },
    dialogColse(){
      Object.keys(this.base).forEach(e=>{
        this.base[e]=null;
      });
      this.dialogVisible=false;
    },
    insertForm(){
      let params={};
      if(this.base.supplyid===''||this.base.supplyid===null){
        alert("单位不能为空!");
        return false;
      }
      if(this.base.hbsupplyno===''||this.base.hbsupplyno===null){
        alert("单位不能为空!");
        return false;
      }
      Object.keys(this.base).forEach(e=>{
        params[e]=this.base[e];
      });
      params.companyid=this.compayid;
      if(this.doctype===0){
        this.btnloading=true;
        this.$api.area.insertDwqybmdz(params).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("保存成功");
              this.btnloading=false;
              this.dialogColse();
              this.queryFunction('query');
            }else{
              alert(res.msg);
              this.btnloading=false;
              return false;
            }
          }
        }).catch(error=>{
          this.btnloading=false;
          return false;
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
