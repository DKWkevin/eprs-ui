<template>
<div>
  <e-query
    ref="query"
    :formList="formList"
    :formData="formData"
    :btnOptions="btnOptions"
    :labelWidth="formlabelWidth"
    :collapseStatus="collapseStatus"
    @openHov="queryHov"
    @query="queryFunction"
    ></e-query>
  <e-table
    ref="doctable"
    :tableColumns="docTableColumns"
    :tableData="docTableData"
    :tableHeight="tableHeight"
    :loading="docLoading"
    @handle="handleDoc"
    @openA="handleA"
    @currentChange="handleQuery"
    @sizeChange="handleQuery"
  ></e-table>
    <dwjvxxgldtl
      ref="dwjvxxgldtl"
      v-if="dwjvxxgldtlVisible"
      :dltStatus="dltStatus"
      :selfOptions="selfOptions"
      :usestatusOptions="usestatusOptions"
      :enterprisetypeOptions="enterprisetypeOptions"
      :operationTypeOptions="operationTypeOptions"
      :dtlData="dtlData"
    ></dwjvxxgldtl>
  <div v-if="dtlVisible">
    <el-dialog :visible="dialogdtlVisible" title="明细" :width="dtlWidth" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
      <e-table
        ref="doctable"
        :tableColumns="dtlTableColumns"
        :tableData="dtlTableData"
        :tableHeight="dtlTableHeight"
        :loading="dtlLoading"
        :table-width-status="false"
        :page-status="false"
        @handle="handleDtl"
      ></e-table>
    </el-dialog>
  </div>
  <hov-tools ref="queryCompany" v-if="queryCompanyVisible" :hov-data="queryCompanyHov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import ETable from "@/views/Core/ETable";
import dwjvxxgldtl from "./DwjvxxglDtl"
import {formDataReset,selectDdl,selectDdlOption} from '@/utils/functions'
export default {
  name: 'Dwjbxxgl',
  components:{ETable, HovTools, EQuery,dwjvxxgldtl},
  data(){
    return{
      collapseStatus: true,
      formList:[
        {type:'inputHov',label:'单位标识号',id:'companyid',formWidth:220,labelWidth:80},
        {type:'input',label:'编码',id:'companyno',formWidth:180,labelWidth:35},
        {type:'input',label:'单位名称',id:'companyname',formWidth:180,labelWidth:65},
        {type:'input',label:'供应商编码',id:'supplyno',formWidth:220,labelWidth:80},
        {type:'select',label:'状态',id:'usestatus',options:[],clearable:true},
        {type:'select',label:'内外标识',id:'selfFlag',options:[],clearable:true},
        {type:'checkGroup',label:'',id:'flag',options:[{value:'1',label:'供应商标志'},{value:'2',label:'客户标志'}],labelStatus:false},
        {type:'select',label:'排序方式',id:'orderby',options:[{value:'companyno',label:'编码'},{value:'supplyno',label:'供应商编码'}],clearable:true},
        {type:'select',label:'销售部门',id:'deptid',options:[{value:6,label:'批发销售部'},{value:94965,label:'批发采购'},{value:117791,label:'医院一部'},{value:202435,label:'医院二部'}],clearable:true}
      ],
      formData:{companyid:null,companyno:null,companyname:null,supplyno:null,usestatus:null,selfFlag:null,orderby:null,deptid:null,flag:[]},
      btnOptions:[
        {id:"query",icon:"fa fa-search",label:"action.search",perms:'quality:dwjbxxgl:select'},
        {id:"add",icon:"fa fa-plus",label:"action.add",perms:'quality:dwjbxxgl:add'},
        {id:"reset",icon:"fa fa-cog",label:"action.reset",perms:'quality:dwjbxxgl:select'},
        {id:'download',icon:"fa fa-download", label:"action.download",perms:"quality:dwjbxxgl:select"}
      ],
      formlabelWidth:'100px',
      queryCompanyVisible:false,
      queryCompanyHov:{
        hovTitle:'单位标识号查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'queryCompanyVisible',
        hovColumns:
          [
            {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
            {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1},
            {id: "customopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
          ]
      },
      docLoading:false,
      docTableColumns:[
        {prop:'companyid',label:'单位标识号',tableStatus:0,type:0,width:90,widthStatus:true},
        {prop:'companyno',label:'编码',tableStatus:0,type:0},
        {prop:'supplyno',label:'供应商编码',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'companyopcode',label:'操作码',tableStatus:0,type:0,width:110,widthStatus:true},
        {prop:'companyname',label:'单位名称',tableStatus:0,type:0,width:140,widthStatus:true},
        {prop:'companytypesname',label:'公司类型',tableStatus:0,type:0},
        {prop:'companyshortname',label:'简称',tableStatus:0,type:0},
        {prop:'companytypename',label:'单位类型',tableStatus:0,type:0},
        {prop:'parentcompanyid',label:'上级单位ID',tableStatus:0,type:0},
        {prop:'parentcompanyname',label:'上级单位名称',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'area',label:'地区',tableStatus:0,type:0},
        {prop:'selfflagname',label:'内外标识',tableStatus:0,type:0},
        {prop:'companycredate',label:'录入日期',tableStatus:0,type:2,width:100,widthStatus:true},
        {prop:'modifydate',label:'修改日期',tableStatus:0,type:2,width:100,widthStatus:true},
        {prop:'inputmanid',label:'录入人员',tableStatus:0,type:0},
        {prop:'inputmanname',label:'录入人员名称',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'legalflag',label:'法人单位标志',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'usestatusname',label:'状态',tableStatus:0,type:0},
        {prop:'enterprisetypename',label:'企业性质',tableStatus:0,type:0},
        {prop:'archiveno',label:'档案标识号',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'estdate',label:'成立日期',tableStatus:0,type:2},
        {prop:'regcapital',label:'注册资本',tableStatus:0,type:0},
        {prop:'legalman',label:'法定代表人',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'companyleader',label:'企业负责人',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'qcman',label:'质量负责人',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'precode',label:'企业预编码',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'finance_companyid',label:'单位ID',tableStatus:0,type:0},
        {prop:'invcompanyname',label:'发票名称',tableStatus:0,type:0,width:140,widthStatus:true},
        {prop:'taxno',label:'税号',tableStatus:0,type:0},
        {prop:'bankname',label:'开户行',tableStatus:0,type:0},
        {prop:'accno',label:'帐号',tableStatus:0,type:0},
        {prop:'state',label:'所在省',tableStatus:0,type:0},
        {prop:'city',label:'所在市',tableStatus:0,type:0},
        {prop:'invaddress',label:'发票地址',tableStatus:0,type:0,width:140,widthStatus:true},
        {prop:'invphone',label:'发票电话',tableStatus:0,type:0},
        {prop:'realinvtype',label:'实际发票类型',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'quality_companyid',label:'单位ID',tableStatus:0,type:0},
        {prop:'supplyflag',label:'供应商标志',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'factoryflag',label:'生产企业标志',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'customflag',label:'客户标志',tableStatus:0,type:0},
        {prop:'busilicenseend',label:'营业执照效期至',tableStatus:0,type:2,width:140,widthStatus:true},
        {prop:'gspeend',label:'GSP效期',tableStatus:0,type:2,width:140,widthStatus:true},
        {prop:'gspscopename',label:'GSP认证范围',tableStatus:0,type:5,width:120,widthStatus:true},
        {prop:'medicaleend',label:'药品经营许可证效期',tableStatus:0,type:2,width:140,widthStatus:true},
        {prop:'saniteend',label:'食品经营许可证效期',tableStatus:0,type:2,width:140,widthStatus:true},
        {prop:'hfsaniteend',label:'保健食品卫生许可证效期',tableStatus:0,type:2,width:160,widthStatus:true},
        {prop:'equipmenteend',label:'医疗器械经营许可证效期',tableStatus:0,type:2,width:160,widthStatus:true},
        {prop:'medinstieend',label:'医疗机构许可证效期',tableStatus:0,type:2,width:140,widthStatus:true},
        {prop:'wtsxq',label:'委托书效期',tableStatus:0,type:0,width:100,widthStatus:true},
        {prop:'delylqxjybapx',label:'第二类医疗器械经营备案凭证',tableStatus:0,type:0,width:180,widthStatus:true},
        {prop:'salername',label:'业务员',tableStatus:0,type:0},
        {prop:'customtypename',label:'客户性质',tableStatus:0,type:0},
        {prop:"btn",fixed:"right",label:"操作",type:1,tableStatus:0,width:100,widthStatus:true,options:
            [
              {
                id:"edit", icon:"fa fa-edit",label:"action.edit",perms:'quality:dwjbxxgl:update'
              }
            ]
        }
      ],
      docTableData:[],
      dwjvxxgldtlVisible:false,
      dltStatus:false,
      selfOptions:[],
      usestatusOptions:[],
      enterprisetypeOptions:[],
      operationTypeOptions:[],
      dtlData:{},
      dtlVisible:false,
      dialogdtlVisible:false,
      dtlLoading:false,
      dtlTableColumns:[
        {prop:'qualityscopeid',label:'范围ID',tableStatus:0,type:0},
        {prop:'scopeno',label:'范围序号',tableStatus:0,type:0},
        {prop:'scopename',label:'范围名称',tableStatus:0,type:0},
        {prop:"btn",fixed:"right",label:"操作",type:1,tableStatus:0,options:
            [
              {
                id:"delete", icon:"fa fa-delete",label:"action.delete",perms:'quality:dwjbxxgl:update'
              }
            ]
        }
      ],
      dtlTableData:[],
      dtlTableHeight:400,
      dtlWidth:'810px'
    }
  },
  created() {
    this.tableHeight = (window.innerHeight-240);
    selectDdl(this.formList,'id','usestatus','COMPANY_USESTATUS');
    selectDdl(this.formList,'id','selfFlag','COMPANY_SELFFLAG');
    this.selfOptions=selectDdlOption('COMPANY_SELFFLAG');
    this.usestatusOptions=selectDdlOption('COMPANY_USESTATUS');
    this.enterprisetypeOptions=selectDdlOption('COMPANY_EPTYPE');
    this.operationTypeOptions=selectDdlOption('COMPANY_OPERATIONTYPE');
  },
  methods:{
    handleDoc(data){
      if(data.id==="edit"){
        this.dwjvxxgldtlVisible=true;
        this.dltStatus=true;
        this.dtlData=data.row;
      }
    },
    handleQuery(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    queryHov(){
      this.queryCompanyVisible=true;
    },
    queryFunction(data){
      if(data==="query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data==="add"){
        this.dwjvxxgldtlVisible=true;
        this.dltStatus=false;
      }else if(data==="reset"){
        let formData=this.$refs.query.formData;
        Object.keys(formData).forEach(e => {
          if(e!=="flag"){
            formData[e]=null;
          }
        });
        formData.flag=[];
      }else if(data==="download"){
        exportExcelDOM(this.tableColumns,this.tableData,'基本单位管理');
      }
    },
    selectDoc(pageNum,pageSize){
      this.$refs.query.collapse=false;
      this.docLoading=true;
      let formData=this.formData;
      let params={};
      Object.keys(formData).forEach(e => {
        if(e!=="flag"&&(formData[e]!==null&&formData[e]!=="")){
          params[e]=formData[e];
        }
      });
      if(formData.flag.length>0){
        if(formData.flag.indexOf("1")>=0){
          params.supplyflag=1;
        }
        if(formData.flag.indexOf("2")>=0){
          params.customflag=1;
        }
      }
     /* if(Object.keys(params).length<=0){
        params=null;
      }*/
      params.usercompanyid=Number(sessionStorage['companyid']);
      this.docTableData=[];
      this.$api.quality.selectDwjbxxglDoc({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code===200){
          let content=[];
          res.data.content.forEach(e => {
            e.gspscopename='查看明细';
            content.push(e)
          });
          this.docTableData=content;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.currentPage=res.data.pageNum;
          this.$refs.doctable.total=res.data.totalSize;
          this.docLoading=false;
        }
      }).catch(error => {
        this.docLoading=false;
        return false;
      })
    },
    handleA(data){
      if(data.row.gspscope===null){
        return false;
      }
      this.dtlVisible=true;
      this.dialogdtlVisible=true;
      this.dtlLoading=true;
      this.dtlTableData=[];
      this.$api.quality.selectDwjbxxglDtl({cfid:data.row.gspscope}).then(res => {
        if(res.code===200){
          this.dtlTableData=res.data;
          this.dtlLoading=false;
        }
      }).catch(error => {
        this.dtlLoading=false;
        return false;
      })
    },
    selectDtl(gspscope){
      this.dtlLoading=true;
      this.dtlTableData=[];
      this.$api.quality.selectDwjbxxglDtl({cfid:gspscope}).then(res => {
        if(res.code===200){
          this.dtlTableData=res.data;
          this.dtlLoading=false;
        }
      }).catch(error => {
        this.dtlLoading=false;
        return false;
      })
    },
    handleDtl(data){
      this.$api.quality.selectDwjbxxglDtlDel({cfid:data.row.cfid,qualityscopeid:data.row.qualityscopeid}).then(res => {
        if(res.code===200){
          if(res.data===1){
            alert("删除成功");
            this.selectDtl(data.row.cfid);
          }else{
            alert(res.msg);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    dialogColse(){
      this.dtlTableData=[];
      this.dtlVisible=false;
      this.dialogdtlVisible=false;
    }
  }
}
</script>
