<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    @query="handleFunction"
    @openHov="queryHov"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @handle="handle"
    @currentChange="handleQuery"
    @sizeChange="handleQuery"
  ></e-table>
  <gysgl-dtl v-if="gysglDtlVisible" :dltStatus="dltStatus" :dtlData="dtlData" :docTitle="docTitle"></gysgl-dtl>
  <hov-tools v-if="queryCustomVisible" :hov-data="customHov"></hov-tools>
  <hov-tools v-if="queryEmployeeVisible" :hov-data="employeeHov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import ETable from '@/views/Core/ETable'
import GysglDtl from "@/views/Function/Quality/GysglDtl";
import {formDataReset,paramsFormat,selectDdl} from "@/utils/functions"
import HovTools from "@/views/Core/HovTools";
export default {
  name: 'Gysgl',
  components:{HovTools, GysglDtl,EQuery,ETable},
  data (){
    return{
      formList:[
        {type:'inputHov',label:'单位ID',id:'supplyid',dataType:'number'},
        {type:'input',label:'操作码',id:'companyopcode'},
        {type:'select',label:'单位类型',id:'companytype',options:[],clearable:true},
        {type:'inputHov',label:'人员ID',id:'buyerid'},
        {type:'select',label:'状态',id:'usestatus',options:[],clearable:true}
      ],
      formData:{supplyid:null,companyopcode:null,companytype:null,buyerid:null,usestatus:null},
      btnOptions:[
        {id:"query",icon:"fa fa-search",label:"action.search",perms:'quality:gysgl:select'},
        {id:"add",icon:"fa fa-plus",label:"action.add",perms:'quality:gysgl:add'},
        {id:"reset",icon:"fa fa-cog",label:"action.reset",perms:'quality:gysgl:select'}
      ],
      queryCustomVisible:false,
      customHov:{
        hovTitle:'单位查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'queryCustomVisible',
        hovColumns:
          [
            {id: "customid", name: "单位ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "customname", name: "单位名称",queryStatus:true,dataStatus:1},
            {id: "customopcode", name: "单位操作码",queryStatus:true,dataStatus:1}
          ]
      },
      queryEmployeeVisible:false,
      employeeHov:{
        hovTitle:'人员查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'queryEmployeeVisible',
        hovColumns:
          [
            {id: "employeeid", name: "人员ID",queryStatus:true,dataStatus:2,fillid:"buyerid"},
            {id: "employeename", name: "人员名称",queryStatus:true,dataStatus:1},
            {id: "employeeopcode", name: "人员操作码",queryStatus:true,dataStatus:1}
          ]
      },
      tableColumns:[
        {prop:'supplyid',label:'单位ID',type:0,tableStatus:0},
        {prop:'supplycompanyname',label:'单位名称',type:0,tableStatus:0},
        {prop:'supplycredate',label:'录入日期',type:2,tableStatus:0,width:140,widthStatus:true},
        {prop:'inputmanid',label:'录入人',type:0,tableStatus:0},
        {prop:'inputmanname',label:'录入人姓名',type:0,tableStatus:0,width:100},
        {prop:'supplygrade',label:'等级',type:0,tableStatus:0},
        {prop:'ifformainv',label:'是否启用形式发票',type:0,tableStatus:0,width:120},
        {prop:'companyno',label:'编码',type:0,tableStatus:0},
        {prop:'companyopcode',label:'操作码',type:0,tableStatus:0},
        {prop:'companyname',label:'名称',type:0,tableStatus:0},
        {prop:'companyshortname',label:'简称',type:0,tableStatus:0},
        {prop:'companytypename',label:'单位类型',type:0,tableStatus:0},
        {prop:'parentcompanyid',label:'上级单位',type:0,tableStatus:0},
        {prop:'parentname',label:'上级单位名称',type:0,tableStatus:0,width:120},
        {prop:'area',label:'地区',type:0,tableStatus:0},
        {prop:'selfflag',label:'内外标识',type:0,tableStatus:0},
        {prop:'companycredate',label:'录入日期',type:2,tableStatus:0,width:140,widthStatus:true},
        {prop:'modifydate',label:'修改日期',type:2,tableStatus:0,width:140,widthStatus:true},
        {prop:'companyinputmanid',label:'录入人员ID',type:0,tableStatus:0},
        {prop:'companyinputmanname',label:'录入人员名称',type:0,tableStatus:0,width:120},
        {prop:'legalflag',label:'法人单位标志',type:0,tableStatus:0,width:120},
        {prop:'usestatus',label:'状态',type:0,tableStatus:0},
        {prop:'enterprisetype',label:'企业性质',type:0,tableStatus:0},
        {prop:'archiveno',label:'档案标识号',type:0,tableStatus:0,width:120},
        {prop:'ifindustryname',label:'工业/商业',type:0,tableStatus:0},
        {prop:'factoryid',label:'工业户ID',type:0,tableStatus:0},
        {prop:'factoryname',label:'工业户',type:0,tableStatus:0},
        {prop:'buyerid',label:'人员ID',type:0,tableStatus:0},
        {prop:'buyername',label:'人员名称',type:0,tableStatus:0},
        {prop:'planner',label:'采购经理ID',type:0,tableStatus:0},
        {prop:'plannername',label:'采购经理',type:0,tableStatus:0},
        {prop:'checker',label:'财务人员',type:0,tableStatus:0},
        {prop:'caozuo',label:'操作',fixed:'right',type:1,width:100,widthStatus:true,tableStatus:0,options:[
            {id:'edit',icon:"fa fa-edit",label:"action.edit",perms:"quality:gysgl:update"}
          ]}
      ],
      tableData:[],
      loading:false,
      tableHeight:0,
      gysglDtlVisible:false,
      dltStatus:false,
      dtlData:{},
      docTitle:''
    }
  },
  created() {
    this.tableHeight=(window.innerHeight-240);
    selectDdl(this.formList,'id','companytype','COMPANY_TYPE');
    selectDdl(this.formList,'id','usestatus','COMPANY_USESTATUS');
  },
  methods:{
    handle(data){
      this.docTitle='修改供应商信息';
      this.gysglDtlVisible=true;
      this.dltStatus=true;
      this.dtlData=data.row;
    },
    handleQuery(data){
      this.$refs.query.collapse=false;
      let formData=this.formData;
      let params=paramsFormat(formData);
      this.tableData=[];
      this.loading=true;
      this.$api.quality.selectGysgl({pageNum:data.pageNum,pageSize:data.pageSize,params:params}).then(res => {
        if(res.code===200){
          this.tableData=res.data.content;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.currentPage=res.data.pageNum;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    handleFunction(data){
      if(data==="query"){//表格查询
        this.$refs.query.collapse=false;
        let formData=this.formData;
        let params=paramsFormat(formData);
        let pageSize=this.$refs.doctable.pageSize;
        this.tableData=[];
        this.loading=true;
        this.$api.quality.selectGysgl({pageNum:1,pageSize:pageSize,params:params}).then(res => {
          if(res.code===200){
            this.tableData=res.data.content;
            this.$refs.doctable.pageSize=res.data.pageSize;
            this.$refs.doctable.currentPage=res.data.pageNum;
            this.$refs.doctable.total=res.data.totalSize;
            this.loading=false;
          }
        }).catch(error => {
          this.loading=false;
          return false;
        })
      }else if(data==="add"){//新增打开
        this.docTitle='新增供应商信息';
        this.gysglDtlVisible=true;

        this.dltStatus=false;
      }else if(data === "reset"){//重置
        let formData=this.formData;
        formDataReset(formData);
      }
    },
    queryHov(data){
      if(data==="supplyid"){
        this.queryCustomVisible=true;
      }else if(data==="buyerid"){
        this.queryEmployeeVisible=true;
      }
    }
  }
}
</script>
