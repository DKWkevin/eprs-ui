<template>
<div>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           @openHov="openHov"
           @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="docTableColumns"
    :table-data="docTableData"
    :table-height="docTableHeight"
    :loading="loading"
    @handle="handleFunction"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <e-dialogs dialogTitle="作废原因" :status="zbshmdzjjhStatus" @dialogClose="dialogClose">
    <el-form :model="zdshmdzjjhDtlForm" label-width="100px">
      <el-form-item label="追加计划ID">
        <el-input v-model="zdshmdzjjhDtlForm.id" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="审批意见">
        <el-input type="textarea" v-model="zdshmdzjjhDtlForm.zbreason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="deleteDtl">提交</el-button>
        <el-button type="info" @click="dialogClose">取消</el-button>
      </el-form-item>
    </el-form>
  </e-dialogs>
  <hov-tools v-if="counterVisible" :hov-data="counterHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>

<script>
//总部审核门店追加计划
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import ETable from "@/views/Core/ETable";
import {exportExcelDOM, getNewDate, paramsFormat} from "@/utils/functions";
export default {
  name: 'Zbshmdzjjh',
  components:{ETable, HovTools, EQuery},
  data(){
    return{
      btnOptions:[
        {id:'query', icon:"fa fa-search", label:"action.search", perms:"ordermanagement:zbshmdzjjh:select"}
      ],
      formList:[
        {type:'inputHov',id:'counterid',label:'门店ID'},
        {type:'inputHov',id:'goodsid',label:'货品ID'},
        {type:'select',id:'mdreason',label:'门店申请原因',options:[{value:'顾客订货',label:'顾客订货'},{value:'促销品',label:'促销品'},{value:'应季品',label:'应季品'}],clearable:true}
      ],
      formData:{
        counterid:null,
        goodsid:null,
        mdreason:null
      },
      docTableHeight:0,
      loading:false,
      docTableColumns:[
        {prop:'companyname',label:'门店名称',type:0,tableStatus:0},
        {prop:'goodsid',label:'货品ID',type:0,tableStatus:0},
        {prop:'goodsname',label:'品名',type:0,tableStatus:0},
        {prop:'goodstype',label:'规格',type:0,tableStatus:0},
        {prop:'goodsunit',label:'单位',type:0,tableStatus:0},
        {prop:'prodarea',label:'产地',type:0,tableStatus:0},
        {prop:'mdkc',label:'门店库存',type:0,tableStatus:0},
        {prop:'distrqty',label:'请货数量',type:0,tableStatus:0},
        {prop:'addqty',label:'追加数量',type:0,tableStatus:0},
        {prop:'fpsl',label:'分配数量',type:0,tableStatus:0},
        {prop:'sydbl',label:'上月调拨量',type:0,tableStatus:0},
        {prop:'qqdb',label:'前期调拨',type:0,tableStatus:0},
        {prop:'sysx',label:'上月实销',type:0,tableStatus:0},
        {prop:'ywkc',label:'业务库存',type:0,tableStatus:0},
        {prop:'fkfs',label:'付款方式',type:0,tableStatus:0},
        {prop:'price',label:'最新进价',type:0,tableStatus:0},
        {prop:'mdsyxl',label:'门店上月销量',type:0,tableStatus:0},
        {prop:'mdyxts',label:'门店预销天数',type:0,tableStatus:0},
        {prop:'pret',label:'异常原因',type:0,tableStatus:0},
        {prop:'mdsqly',label:'门店申请原因',type:0,tableStatus:0},
        {prop:'dqyxts',label:'地区预销天数',type:0,tableStatus:0},
        {prop:'dqflag',label:'地区审核状态',type:0,tableStatus:0},
        {prop:'dqreason',label:'地区审核意见',type:0,tableStatus:0},
        {prop:'zbflag',label:'总部审核状态',type:0,tableStatus:0},
        {prop:'zbreason',label:'总部审核意见',type:0,tableStatus:0},
        {prop:'id',label:'追加计划ID',type:0,tableStatus:0},
        {prop:'counterid',label:'门店ID',type:0,tableStatus:0},
        {prop:'caozuo',label:'操作',fixed:'right',type:1,width:100,widthStatus:true,tableStatus:0,options:[
            {id:'delete',icon:"fa fa-delete",label:"action.nullify",perms:"ordermanagement:zbshmdzjjh:invoid"}
          ]
        }
      ],
      docTableData:[],
      zbshmdzjjhStatus:false,
      zdshmdzjjhDtlForm:{
        id:null,
        zbreason:null,
        inputmanid:null
      },
      zdshmdzjjhDtlIndex:0,
      counterVisible:false,
      counterHov:{
        hovTitle:'门店查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'counterVisible',
        hovColumns:
          [
            {id: "customid", name: "门店ID",queryStatus:true,dataStatus:2,fillid:"counterid"},
            {id: "customname", name: "门店名称",queryStatus:true,dataStatus:1},
            {id: "customopcode", name: "门店操作码",queryStatus:true,dataStatus:1}
          ]
      },
      goodsVisible:false,
      goodsHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'supplyHov',
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
    this.docTableHeight=(window.innerHeight-240);
  },
  methods:{
    queryFunction(data){
      if(data === "query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      let formData=this.formData;
      let params={};
      Object.keys(formData).forEach(e => {
        if(formData[e]!==null&&formData[e]!==""){
          params[e]=formData[e];
        }
      });
      params.inputmanid=354;
      // Number(sessionStorage['userid']);
      //params.companyid=Number(sessionStorage['companyid']);
      this.loading=true;
      this.$api.ordermanagement.selectZbshmdzjjh({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code === 200){
          this.docTableData = res.data.content;
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    handleFunction(data){
      this.zdshmdzjjhDtlForm.id = data.row.id;
      this.zdshmdzjjhDtlForm.inputmanid = Number(sessionStorage['userid']);
      this.zdshmdzjjhDtlIndex = data.index;
      this.zbshmdzjjhStatus = true;
    },
    deleteDtl(){
      if(confirm("是否作废")===true){
        this.$api.ordermanagement.deleteZbshmdzjjhDtl(this.zdshmdzjjhDtlForm).then(res => {
          if(res.code === 200){
            alert("作废成功");
            this.docTableData.splice(this.zdshmdzjjhDtlIndex,1);
            this.dialogClose();
          }else{
            alert(res.msg);
            return false;
          }
        }).catch(error => {
          return false;
        });
      }else{
        return false;
      }
    },
    openHov(id){
      if(id==="counterid"){
        this.counterVisible=true;
      }else if(id==="goodsid"){
        this.goodsVisible=true;
      }
    },
    dialogClose(){
      Object.keys(this.zdshmdzjjhDtlForm).forEach(item => {
        this.zdshmdzjjhDtlForm[item] = null;
      });
      this.zbshmdzjjhStatus = false;
    }
  }
}
</script>

<style scoped>

</style>
