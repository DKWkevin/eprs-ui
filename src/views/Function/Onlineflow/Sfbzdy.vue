<template>
<div>
  <e-query ref="query"
  :form-list="formList"
  :form-data="formData"
  :btn-options="btnOptions"
   @query="functionQuery"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :table-width-status="false"
    @currentChange="handleChange"
    @sizeChage="handleChange"
    @selectionChange="selectionChange"
    @hanlde="handleFunction"
  ></e-table>
  <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
        <el-form :model="dtlFormData" label-position="right" label-width="80px">
          <el-form-item label="标准ID" v-if="doctype===1">
            <el-input v-model="dtlFormData.standardid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="标准名称">
            <el-input v-model="dtlFormData.standardname"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="dtlFormData.total"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="dtlFormData.usestatus">
              <el-option :value="1" label="正常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费类型">
            <el-select v-model="dtlFormData.standardtype">
              <el-option :value="1" label="供应商"></el-option>
              <el-option :value="2" label="品种"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="insertForm" :loading="btnLoading">保存</el-button>
        <el-button type="info" @click="dialogColse">取消</el-button>
      </div>
  </el-dialog>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import '@/assets/css/dialog.css';
import {paramsFormat} from "@/utils/functions";
export default {
  name: 'Sfbzdy',
  components:{ETable, EQuery},
  data(){
    return{
      formList:[
        {type:'input',id:'standardid',label:'收费标准ID'},
        {type:'input',id:'standardname',label:'收费标准名称'}
      ],
      formData:{standardid:null,standardname:null},
      btnOptions:[
        {id:'query',icon:"fa fa-search", label:"action.search",perms:"onlineflow:sfdzdy:select"},
        {id:'add',icon:"fa fa-plus", label:"action.add",perms:"onlineflow:sfdzdy:select"}
      ],
      tableHeight:0,
      loading:false,
      tableColumns:[
        {type:0,prop:'standardid',label:'收费标准ID',tableStatus:0},
        {type:0,prop:'standardname',label:'收费标准名称',tableStatus:0},
        {type:0,prop:'total',label:'金额',tableStatus:0},
        {type:0,prop:'usestatusname',label:'状态',tableStatus:0},
        {type:0,prop:'standardtypename',label:'收费类型',tableStatus:0},
        {type:1,prop:'caozuo',label:'操作',tableStatus:0,fixed:'right',width:280,widthStatus:true,options:[
            {id:'delete',label:'action.delete',icon:'fa fa-delete',perms:'onlineflow:sfdzdy:select'},
            {id:'update',label:'action.search',icon:'fa fa-search',perms:'onlineflow:sfdzdy:select'},
            {id:'stop',label:'action.delete',icon:'fa fa-delete',perms:'onlineflow:sfdzdy:select'},
            {id:'recovery',label:'action.search',icon:'fa fa-search',perms:'onlineflow:sfdzdy:select'}
          ]}
      ],
      tableData:[],
      dialogVisible:false,
      doctype:0,
      docTitle:"细单查询",
      dialogWidth:700,
      dialogHeight:500,
      dialogTop:'12vh',
      dtlTableHeight:300,
      btnLoading:false,
      dtlFormData:{
        standardid:null,
        standardname:null,
        total:null,
        usestatus:null,
        standardtype:null
      }
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
  },
  methods:{
    functionQuery(data){
      if(data==="query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data==="add"){
        this.doctype=0;
        this.addVisible=true;
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      this.$refs.query.collapse=false;
      let formData=this.formData;
      let params=paramsFormat(formData);
      this.loading=true;
      this.tableData=[];
      this.$api.onlineflow.selectSfbzdy({pageNum:pageNum,pageSize:pageSize,params:params}).then(res=>{
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
        this.$api.onlineflow.delSfbzdy({standardid:data.row.standardid}).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("删除总单成功");
              this.functionQuery('query');
            }else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error=>{
          return false;
        })
      }else if(data.id==="update"){
        this.doctype=1;
        Object.keys(this.dtlFormData).forEach(e=>{
          this.dtlFormData[e]=data.row[e];
        });
        this.addVisible=true;
      }else if(data.id==="stop"){
        if(data.row.usestatus===2){
          alert("此收费标准已停用，请勿重复点击");
          return false;
        }
        if(confirm("是否停用")===true){
          this.$api.onlineflow.stopSfbzdy({standardid:data.row.standardid}).then(res=>{
            if(res.code===200){
              if(res.data===1){
                alert("停用成功");
                this.functionQuery('query');
              }else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error=>{
            return false;
          })
        }else {
          alert("已经取消操作");
          return false;
        }
      }else if(data.id==="recovery"){
        if(data.row.usestatus===1){
          alert("此收费标准状态为正式，请勿重复点击");
          return false;
        }
        if(confirm("是否恢复")===true){
          this.$api.onlineflow.recoverySfbzdy({standardid:data.row.standardid}).then(res=>{
            if(res.code===200){
              if(res.data===1){
                alert("恢复成功");
                this.functionQuery('query');
              }else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error=>{
            return false;
          })
        }else {
          alert("已经取消操作");
          return false;
        }
      }
    },
    insertForm(){
      if(this.doctype===0){
        this.$api.onlineflow.insertSfbzdy(this.dtlFormData).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("新增成功");
              this.functionQuery('query');
            }else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error=>{
          return false;
        })
      }else if(this.doctype===1){
        this.$api.onlineflow.updateSfbzdy(this.dtlFormData).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("修改成功");
              this.functionQuery('query');
            }else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error=>{
          return false;
        })
      }
    },
    dialogColse(){
      Object.keys(this.dtlFormData).forEach(e=>{
        this.dtlFormData[e]=null;
      });
      this.dialogVisible=false;
    }
  }
}
</script>

<style scoped>

</style>
