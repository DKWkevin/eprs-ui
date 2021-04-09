<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="xsbccxQueryForm" :inline="true">
        <el-form-item label="开始日期" style="float:left;width:250px;">
          <el-date-picker type="datetime" v-model="xsbccxQueryForm.startdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" style="float:left;width:250px;">
          <el-date-picker type="datetime" v-model="xsbccxQueryForm.endofdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="customid" label="客户ID" v-model="xsbccxQueryForm.customid" id="customid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="salerid" label="销售员ID" v-model="xsbccxQueryForm.salerid" id="salerid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="doctypeid" label="销售单类型" v-model="xsbccxQueryForm.doctypeid" :options="xsbccxDoctypeidOptions"></el-form-item-select>
        <el-form-item-select prop="usestatus" label="状态" v-model="xsbccxQueryForm.usestatus" :options="xsbccxUsestateOptions"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:xsbccx:select" @click="queryFunction"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="xsbccxTableData"
    :table-width-status="false"
    :table-height="xsbccxTableHeight"
    :pageNum="xsbccxPageNum"
    :pageSize="xsbccxPageSize"
    :total="xsbccxTotal"
    :loading="xsbccxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="goodsid" label="销售补差单ID"></e-tables-columns>
    <e-tables-columns-date-time prop="goodsname" label="日期"></e-tables-columns-date-time>
    <e-tables-columns prop="goodstype" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="类型"></e-tables-columns>
    <e-tables-columns prop="credate" label="金额"></e-tables-columns>
    <e-tables-columns prop="credate" label="细目笔数"></e-tables-columns>
    <e-tables-columns prop="pf_lf" label="销售部门"></e-tables-columns>
    <e-tables-columns prop="pf_jf" label="销售员"></e-tables-columns>
    <e-tables-columns prop="ls_lf" label="公司ID"></e-tables-columns>
    <e-tables-columns prop="ls_jf" label="公司名称"></e-tables-columns>
    <e-tables-columns prop="flag" label="录入人ID"></e-tables-columns>
    <e-tables-columns prop="flag" label="录入人"></e-tables-columns>
    <e-tables-columns prop="inputmanid" label="经销方式"></e-tables-columns>
    <e-tables-columns prop="employeename" label="收款方式"></e-tables-columns>
    <e-tables-columns prop="pf_lf" label="账期"></e-tables-columns>
    <e-tables-columns prop="pf_jf" label="备注"></e-tables-columns>
    <e-tables-columns prop="pf_jf" label="状态"></e-tables-columns>
    <el-table-column prop="caozuo" fixed="right" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.dtl')" perms="marketing:xsbccx:select" @click="selectDtl(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-print" :label="$t('action.print')" perms="marketing:xsbccx:select" @click="printDtl(scope.row, scope.$index)"></kt-button>
        <!-- inputmanid 252 31290 35844 476 0-->
        <kt-button type="primary" icon="fa fa-confirm" :label="$t('action.comfirmThis')" perms="marketing:xsbccx:select" @click="confirmDtl(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-nullify" :label="$t('action.nullify')" perms="marketing:xsbccx:select" @click="nullifyDtl(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <div>
    <el-form :inline="true" style="margin-top:15px;">
      <el-form-item label="金额合计">
        <el-input :disabled="true" v-model="xsbccxSumTotal"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <e-dialogs dialogTitle="查询细单" :status="xsbccxStatus" @dialogClose="dialogClose">
    <e-tables :table-data="xsbccxDtlForm" :table-height="300" :loading="xsbccxDtlLoading">
      <e-tables-columns prop="saadjdtlid" label="细单ID"></e-tables-columns>
      <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
      <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
      <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
      <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
      <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
      <e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
      <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
      <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
      <e-tables-columns prop="total_line" label="金额"></e-tables-columns>
      <e-tables-columns prop="notaxmoney" label="不含税额"></e-tables-columns>
      <e-tables-columns prop="taxmoney" label="税额"></e-tables-columns>
      <e-tables-columns prop="inbatchid" label="内部批次ID"></e-tables-columns>
      <e-tables-columns prop="outbatchid" label="外部批次ID"></e-tables-columns>
      <e-tables-columns prop="saadjdocid" label="总单ID"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="xsbccxHovVisible" :hov-data="xsbccxHov"></hov-tools>
</div>
</template>

<script>
  import KtButton from "../../Core/KtButton";
  import {exportExcelDOM, formIsNull, paramsFormatDate, selectDdlOption} from "../../../utils/functions";
  import HovTools from "../../Core/HovTools";
  export default {
    name: "Xsbxcx",
    components: {HovTools, KtButton},
    data(){
      return {
        xsbccxQueryForm:{
          startdate:null,
          endofdate:null,
          customid:null,
          salesid:null,
          usestatus:null,
          doctypeid:null
        },
        xsbccxTableData:[],
        xsbccxSumTotal:0,
        xsbccxPageNum:1,
        xsbccxPageSize:50,
        xsbccxTotal:0,
        xsbccxLoading:false,
        xsbccxTableHeight:300,
        xsbccxStatus:false,
        xsbccxDtlColumns:[],
        xsbccxDtlForm:[],
        xsbccxDtlLoading:false,
        xsbccxUsestateOptions: [{value:0,label:'作废'},{value:1,label:'临时'},{value:2,label:'确认'}],
        xsbccxDoctypeidOptions: [],
        xsbccxPrintStatus:false,
        xsbccxDtlData: {},
        xsbccxHovVisible:false,
        xsbccxHov:{
          hovTitle:'',
          hovUrl: "",
          afterStatus: false,
          fillDataName: "xsbccxQueryForm",
          parentVisible:'xsbccxHovVisible',
          hovColumns: []
        },
      }
    },
    created() {
      this.xsbccxTableHeight = (window.innerHeight - 280);
      this.xsbccxDoctypeidOptions = selectDdlOption('SAADJUST_TYPE');
    },
    methods:{
      queryFunction(){
        this.selectDoc(1, this.xsbccxPageSize);
      },
      handleChange(data){
        this.selectDoc(data.pageNum, data.pageSize);
      },
      selectDoc(pageNum,pageSize){
        let params = {};
        let formData = this.xsbccxQueryForm;
        params = paramsFormatDate(formData, ['startdate','endofdate']);
        params.companyid = Number(sessionStorage['companyid']);
        this.xsbccxLoading = true;
        this.xsbccxTableData = [];
        this.$api.pfsales.selectXsbccxDoc({pageNum:pageNum,pageSize:pageSize,params: params}).then(res => {
          let tableData = res.data.content;
          let num = res.data.pageNum;
          let size = res.data.pageSize;
          let totalsize = res.data.totalSize;
          this.$api.pfsales.selectXsbccxSum({pageNum:pageNum,pageSize:pageSize,params: params}).then(sum => {
            this.xsbccxSumTotal = sum.data.content;
            this.xsbccxTableData = tableData;
            this.xsbccxPageNum = num;
            this.xsbccxPageSize = size;
            this.xsbccxTotal = totalsize;
            this.xsbccxLoading = false;
          }).catch(() => {
            this.xsbccxPageNum = 1;
            this.xsbccxTotal = 0;
            this.xsbccxSumTotal = 0;
            this.xsbccxLoading = false;
            return false;
          })
        }).catch(() => {
          this.xsbccxPageNum = 1;
          this.xsbccxTotal = 0;
          this.xsbccxSumTotal = 0;
          this.xsbccxLoading = false;
          return false;
        })
      },
      //查看细单
      selectDtl(row){
        this.xsbccxStatus = true;
        this.xsbccxDtlLoading =true;
        this.$api.pfsales.selectXsbccxDtl({saadjdocid:row.saadjdocid}).then(res => {
          this.xsbccxDtlForm = res.data;
          this.xsbccxDtlLoading =false;
        }).catch(() => {
          this.xsbccxDtlLoading =false;
          return false;
        })
      },
      printDtl(){
        this.xsbccxDtlData.salesid = 1;
        this.xsbccxDtlData.inputmanname = Number(sessionStorage['username']);
        this.xsbccxDtlData.stcompanyid = 19940;
        this.xsbccxPrintStatus = true;
      },
      //确认
      confirmDtl(row,index){
        if(row.usestatusname === '临时'){
          if(confirm("是否确认") === true) {
            this.$api.pfsales.confirmXsbccx({saadjdocid:row.saadjdocid,inputmanid:Number(sessionStorage['inputmanid'])}).then(res => {
              if (res.code === 200) {
                alert("确认成功");
              } else {
                alert(res.msg);
                return false;
              }
            }).catch(() => {
              return false;
            })
          } else {
            return false;
          }
        }else{
          alert("状态不为临时，不能确认！");
          return false;
        }
      },
      //作废
      nullifyDtl(row,index){
        if(row.usestatusname === '临时'){
          if(confirm("是否确认") === true) {
            this.$api.pfsales.nullifyXsbccx({saadjdocid:row.saadjdocid}).then(res => {
              if (res.code === 200) {
                alert("作废成功");
              } else {
                alert(res.msg);
                return false;
              }
            }).catch(() => {
              return false;
            })
          } else {
            return false;
          }
        }else{
          alert("状态不为临时，不能确认！");
          return false;
        }
      },
      openQueryHov(data){
        let hovTitle= '';
        let hovUrl = '';
        let hovColumns = [];
        if (data === 'customid') {
          hovTitle='客户查询';
          hovUrl = "customidhov/select";
          hovColumns = [
            {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"customid"},
            {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1}
          ]
        } else if (data === 'salerid') {
          hovTitle='销售员查询';
          hovUrl = "employeeididhov/select";
          hovColumns = [
            {id: "employeeid", name: "销售员ID",queryStatus:true,dataStatus:2,fillid:"salerid"},
            {id: "employeename", name: "销售员名称",queryStatus:true,dataStatus:1},
            {id: "employeeopcode", name: "销售员操作码",queryStatus:true,dataStatus:1},
            {id: "companyid", name: "销售员操作码",value:Number(sessionStorage['companyid']),queryStatus:true,dataStatus:1}
          ]
        }
        this.xsbccxHov.hovTitle = hovTitle;
        this.xsbccxHov.hovUrl = hovUrl;
        this.xsbccxHov.hovColumns = hovColumns;
        this.xsbccxHovVisible = true;
      },
      dialogClose(){
        this.xsbccxStatus = false;
      }
    }
  }
</script>

<style scoped>

</style>
