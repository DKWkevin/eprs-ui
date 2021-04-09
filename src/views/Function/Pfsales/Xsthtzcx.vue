<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="xsthtzcxQueryForm" :inline="true">
        <el-form-item label="开始日期" style="float:left;width:250px;">
          <el-date-picker type="datetime" v-model="xsthtzcxQueryForm.startdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" style="float:left;width:250px;">
          <el-date-picker type="datetime" v-model="xsthtzcxQueryForm.endofdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="customid" label="客户ID" v-model="xsthtzcxQueryForm.customid" id="customid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="inputmanid" label="销售员ID" v-model="xsthtzcxQueryForm.inputmanid" id="inputmanid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="backwhy" label="退货原因" v-model="xsthtzcxQueryForm.backwhy" :options="xsthtzcxBackwhyOptions"></el-form-item-select>
        <el-form-item-select prop="usestatus" label="状态" v-model="xsthtzcxQueryForm.usestatus" :options="xsthtzcxUsestateOptions"></el-form-item-select>
        <el-form-item-input prop="oldsalesid" label="原销售单ID" v-model="xsthtzcxQueryForm.oldsalesid"></el-form-item-input>
        <el-form-item-input prop="sabackdocid" label="退货通知单ID" v-model="xsthtzcxQueryForm.sabackdocid"></el-form-item-input>
        <el-form-item-select prop="deptid" label="保管单位" v-model="xsthtzcxQueryForm.deptid" :options="xsthtzcxDeptidOptions"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:xsthtzcx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-confirm" :label="$t('action.comfirmThis')" perms="marketing:xsthtzcx:select" @click="confirmDtl"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="xsthtzcxTableData"
    :table-width-status="false"
    :table-height="xsthtzcxTableHeight"
    :pageNum="xsthtzcxPageNum"
    :pageSize="xsthtzcxPageSize"
    :total="xsthtzcxTotal"
    :loading="xsthtzcxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <el-table-column type="session" fixed="left"></el-table-column>
    <el-table-column prop="caozuo" fixed="left" width="100" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-print" :label="$t('action.print')" perms="marketing:xsthtzcx:select" @click="printDtl(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
    <e-tables-columns prop="sabackdocid" label="销售退货通知单ID"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="日  期"></e-tables-columns-date-time>
    <e-tables-columns prop="inputmanname" label="录入人"></e-tables-columns>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="customname" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="total_line" label="金额"></e-tables-columns>
    <e-tables-columns prop="dtllines" label="细目笔数"></e-tables-columns>
    <e-tables-columns prop="backwhy" label="退货原因"></e-tables-columns>
    <e-tables-columns prop="stcompanyname" label="配送部门"></e-tables-columns>
    <e-tables-columns prop="usestatusname" label="状态"></e-tables-columns>
    <e-tables-columns prop="reccompanyname" label="收货公司"></e-tables-columns>
    <e-tables-columns prop="recdeptname" label="收货部门"></e-tables-columns>
    <e-tables-columns prop="salesmode" label="经销方式"></e-tables-columns>
    <e-tables-columns prop="paymodename" label="付款方式"></e-tables-columns>
    <e-tables-columns prop="payterm" label="账期"></e-tables-columns>
    <e-tables-columns prop="inputman" label="录入人"></e-tables-columns>
    <e-tables-columns prop="confirmdate" label="确认人"></e-tables-columns>
    <e-tables-columns-date-time prop="confirmman" label="确认日期"></e-tables-columns-date-time>
    <e-tables-columns prop="approveman" label="审批人"></e-tables-columns>
    <e-tables-columns-date-time prop="approvedate" label="审批日期"></e-tables-columns-date-time>
    <e-tables-columns prop="oldsalesid" label="原销售单ID"></e-tables-columns>
    <e-tables-columns prop="salesbackid" label="销售退货单ID"></e-tables-columns>
    <e-tables-columns-date-time prop="recfindate" label="收货完成日期"></e-tables-columns-date-time>
    <e-tables-columns prop="recdate" label="收货期限"></e-tables-columns>
    <e-tables-columns prop="memo" label="备注"></e-tables-columns>
    <el-table-column prop="caozuo" fixed="right" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.dtl')" perms="marketing:xsbccx:select" @click="selectDtl(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-nullify" :label="$t('action.nullify')" perms="marketing:xsbccx:select" @click="nullifyDtl(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs dialogTitle="查询细单" :status="xsthtzcxStatus" @dialogClose="dialogClose">
    <e-tables :table-data="xsthtzcxDtlForm" :table-height="300" :loading="xsthtzcxDtlLoading">
      <e-tables-columns prop="sabackdtlid" label="销售退货通知细单ID"></e-tables-columns>
      <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
      <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
      <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
      <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
      <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
      <e-tables-columns prop="goodsqty" label="通知退货数量"></e-tables-columns>
      <e-tables-columns prop="realgoodsqty" label="实际退货数量"></e-tables-columns>
      <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
      <e-tables-columns prop="total" label="金额"></e-tables-columns>
      <e-tables-columns prop="maxgoodsqty" label="最大退货数量"></e-tables-columns>
      <e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
      <e-tables-columns prop="oldsadtlid" label="原销售细单ID"></e-tables-columns>
      <e-tables-columns prop="outbatchid" label="外部批次"></e-tables-columns>
      <e-tables-columns prop="inbatchid" label="内部批次"></e-tables-columns>
      <e-tables-columns prop="goodsstatusid" label="货品状态ID"></e-tables-columns>
      <e-tables-columns prop="sabackdocid" label="销售退货通知总单ID"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="xsthtzcxHovVisible" :hov-data="xsthtzcxHov"></hov-tools>
</div>
</template>

<script>
  import KtButton from "../../Core/KtButton";
  import {exportExcelDOM, formIsNull, paramsFormatDate, selectDdlOption} from "../../../utils/functions";
  import HovTools from "../../Core/HovTools";
  export default {
    name: "Xsthtzcx",
    components: {HovTools, KtButton},
    data(){
      return {
        xsthtzcxQueryForm:{
          startdate:null,
          endofdate:null,
          customid:null,
          inputmanid:null,
          usestatus:null,
          backwhy:null,
          oldsalesid:null,
          sabackdocid:null,
          deptid:null
        },
        xsthtzcxTableData:[],
        xsthtzcxSumTotal:0,
        xsthtzcxPageNum:1,
        xsthtzcxPageSize:50,
        xsthtzcxTotal:0,
        xsthtzcxLoading:false,
        xsthtzcxTableHeight:300,
        xsthtzcxStatus:false,
        xsthtzcxDtlColumns:[],
        xsthtzcxDtlForm:[],
        xsthtzcxDtlLoading:false,
        xsthtzcxUsestateOptions: [{value:0,label:'临时'},{value:1,label:'确认'},
          {value:2,label:'退货完成'},{value:3,label:'收货完成'},{value:4,label:'审批'},{value:5,label:'作废'},{value:6,label:'订单已发送给物流'}],
        xsthtzcxBackwhyOptions: [],
        xsthtzcxDeptidOptions: [],
        xsthtzcxPrintStatus:false,
        xsthtzcxDtlData: {},
        xsthtzcxHovVisible:false,
        xsthtzcxHov:{
          hovTitle:'',
          hovUrl: "",
          afterStatus: false,
          fillDataName: "xsthtzcxQueryForm",
          parentVisible:'xsthtzcxHovVisible',
          hovColumns: []
        },
      }
    },
    created() {
      this.xsthtzcxTableHeight = (window.innerHeight - 280);
      this.xsthtzcxBackwhyOptions = selectDdlOption('BACK_WHYID');
    },
    methods:{
      queryFunction(){
        this.selectDoc(1, this.xsthtzcxPageSize);
      },
      handleChange(data){
        this.selectDoc(data.pageNum, data.pageSize);
      },
      selectDoc(pageNum,pageSize){
        let params = {};
        let formData = this.xsthtzcxQueryForm;
        params = paramsFormatDate(formData, ['startdate','endofdate']);
        params.companyid = Number(sessionStorage['companyid']);
        this.xsthtzcxLoading = true;
        this.xsthtzcxTableData = [];
        this.$api.pfsales.selectXsthtzcxDoc({pageNum:pageNum,pageSize:pageSize,params: params}).then(res => {
          this.xsthtzcxTableData = res.data.content;
          this.xsthtzcxPageNum = res.data.pageNum;
          this.xsthtzcxPageSize = res.data.pageSize;
          this.xsthtzcxTotal = res.data.totalSize;
          this.xsthtzcxLoading = false;
        }).catch(() => {
          this.xsthtzcxPageNum = 1;
          this.xsthtzcxTotal = 0;
          this.xsthtzcxSumTotal = 0;
          this.xsthtzcxLoading = false;
          return false;
        })
      },
      //查看细单
      selectDtl(row){
        this.xsthtzcxStatus = true;
        this.xsthtzcxDtlLoading =true;
        this.$api.pfsales.selectXsthtzcxDtl({sabackdocid:row.sabackdocid}).then(res => {
          this.xsthtzcxDtlForm = res.data;
          this.xsthtzcxDtlLoading =false;
        }).catch(() => {
          this.xsthtzcxDtlLoading =false;
          return false;
        })
      },
      printDtl(){
        this.xsthtzcxDtlData.salesid = 1;
        this.xsthtzcxDtlData.inputmanname = Number(sessionStorage['username']);
        this.xsthtzcxDtlData.stcompanyid = 19940;
        this.xsthtzcxPrintStatus = true;
      },
      //确认
      confirmDtl(){
        let sabackdocid = [];
        if(confirm("是否审批") === true) {
          this.$api.pfsales.confirmXsthtzcx({sabackdocid:sabackdocid}).then(res => {
            if (res.code === 200) {
              alert("审批成功");
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
      },
      //作废
      nullifyDtl(row,index){
        if(row.usestatusname !== '确认' && row.usestatusname !=="审批"){
          if(confirm("是否确认") === true) {
            this.$api.pfsales.nullifyXsthtzcx({sabackdocid:row.sabackdocid}).then(res => {
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
          alert("只有状态为确认和审批可以作废！");
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
        } else if (data === 'inputmanid') {
          hovTitle='销售员查询';
          hovUrl = "employeeididhov/select";
          hovColumns = [
            {id: "employeeid", name: "销售员ID",queryStatus:true,dataStatus:2,fillid:"inputmanid"},
            {id: "employeename", name: "销售员名称",queryStatus:true,dataStatus:1},
            {id: "employeeopcode", name: "销售员操作码",queryStatus:true,dataStatus:1},
          ]
        }
        this.xsthtzcxHov.hovTitle = hovTitle;
        this.xsthtzcxHov.hovUrl = hovUrl;
        this.xsthtzcxHov.hovColumns = hovColumns;
        this.xsthtzcxHovVisible = true;
      },
      dialogClose(){
        this.xsthtzcxStatus = false;
      }
    }
  }
</script>

<style scoped>

</style>
