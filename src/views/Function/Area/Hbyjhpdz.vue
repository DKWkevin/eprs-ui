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
      <el-form-item label="货品ID">
        <el-input v-model="base.goodsid" :disabled="true" style="width:80%;"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov('dtlgoodsid')"></el-button>
      </el-form-item>
      <el-form-item label="货品">
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
      <el-form-item label="中心品种编码">
        <el-input v-model="base.hbgoodsno"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="insertForm" :loading="btnloading">保存</el-button>
      <el-button type="info" @click="dialogColse">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="goodsDtlVisible" :hov-data="goodsDtlHov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import {selectDdlOption, selectOption} from "@/utils/functions";
import ETable from "@/views/Core/ETable";
export default {
  name: 'Spjyjswh',
  components:{ ETable, HovTools, EQuery},
  data(){
    return {
      formList:[
        {type:'inputHov',id:'goodsid',label:'货品ID',labelWidth:65,formWidth:180},
        {type:'input',id:'hbgoodsno',label:'中心品种编码'},
      ],
      formData:{goodsid:null,hbgoodsno:null},
      btnOptions:[
        {id:'query',icon:"fa fa-search", label:"action.search",perms:"region:hbyjhpdz:select"},
        {id:'add',icon:"fa fa-plus", label:"action.add",perms:"region:hbyjhpdz:add"},
        {id:'add1',icon:"fa fa-plus", label:"action.add",perms:"region:hbyjhpdz:add"}
      ],
      tableColumns:[
        {type:0,prop:'goodsid',label:'货品ID',tableStatus:0},
        {type:0,prop:'goodsname',label:'货品',tableStatus:0},
        {type:0,prop:'goodstype',label:'规格',tableStatus:0},
        {type:0,prop:'goodsunit',label:'单位',tableStatus:0},
        {type:0,prop:'prodarea',label:'产地',tableStatus:0},
        {type:0,prop:'hbgoodsno',label:'中心品种编码',tableStatus:0},
        {type:1,prop:'caozuo',label:'操作',tableStatus:0,fixed:'right',width:80,widthStatus:true,options:[
            {id:'delete',label:'action.delete',icon:'fa fa-delete',perms:'region:hbyjhpdz:delete'}
          ]}
      ],
      tableData:[],
      tableHeight:0,
      loading:false,
      addVisible:false,
      title:'新增表单',
      base:{
        goodsid:null,
        goodsname:null,
        goodstype:null,
        goodsunit:null,
        prodarea:null,
        hbgoodsno:null
      },
      dialogVisible:false,
      dialogWidth:'700px',
      dialogTop:'12vh',
      labelPosition:'right',
      btnloading:false,
      goodsDtlVisible:false,
      goodsDtlHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "base",
        parentVisible:'goodsDtlVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1,fillid:"goodsname"},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1,fillid:"goodstype"},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1,fillid:"goodsunit"},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1,fillid:"prodarea"}
          ]
      },
      goodsVisible:false,
      goodsHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'goodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
          ]
      },
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
      }else if(data==="add1"){}
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
      if(Object.keys(params).length===0){
        params=null;
      }
      this.loading=true;
      this.tableData=[];
      this.$api.area.selectHbyjhpdz({pageNum:pageNum,pageSize:pageSize,params:params}).then(res=>{
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
        this.$api.area.delHbyjhpdz({goodsid:data.row.goodsid}).then(res=>{
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
      if(data==="goodsid"){
        this.goodsVisible=true;
      }else if(data==="dtlgoodsid"){
        this.goodsDtlVisible=true;
      }
    },
    dialogColse(){
      Object.keys(this.base).forEach(e=>{
        this.base[e]=null;
      });
      this.dialogVisible=false;
    },
    insertForm(){
      let params={};
      if(this.base.goodsid===''||this.base.goodsid===null){
        alert("货品不能为空!");
        return false;
      }
      Object.keys(this.base).forEach(e=>{
        params[e]=this.base[e];
      });
      this.btnloading=true;
      this.$api.area.insertHbyjhpdz(params).then(res=>{
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
</script>

<style scoped>

</style>
