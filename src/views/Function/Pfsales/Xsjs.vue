<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="xsjsQueryData" label-width="auto">
        <el-form-item style="float: left;width:210px;">
          <label style="float: left;margin-right:5px">公司ID</label>
          <el-input disabled="disabled" v-model="xsjsQueryData.companyid" style="float: left;width:120px;margin-right:5px"></el-input>
          <el-button icon="el-icon-search" circle @click="queryHov('companyid')" style="float: left"></el-button>
        </el-form-item>
        <el-form-item style="float: left;width:230px;">
          <label style="float: left;margin-right:5px">公司名称</label>
          <el-input disabled="disabled" v-model="xsjsQueryData.companyname" style="float: left;width:150px;margin-right:5px"></el-input>
        </el-form-item>
        <el-form-item style="float: left;width:230px;">
          <label style="float: left;margin-right:5px">结算方式</label>
          <el-select v-model="xsjsQueryData.settlemode" style="float: left;width:150px;margin-right:5px">
            <el-option v-for="(item,index) in xsjsSettlemodeOptions" :key="index" :label="item.value +'-'+item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: left;width:210px;">
          <label style="float: left;margin-right:5px">客户ID</label>
          <el-input disabled="disabled" v-model="xsjsQueryData.customid" style="float: left;width:120px;margin-right:5px"></el-input>
          <el-button icon="el-icon-search" circle @click="queryHov('customid')" style="float: left"></el-button>
        </el-form-item>
        <el-form-item style="float: left;width:230px;">
          <label style="float: left;margin-right:5px">公司名称</label>
          <el-input disabled="disabled" v-model="xsjsQueryData.customname" style="float: left;width:150px;margin-right:5px"></el-input>
        </el-form-item>
        <el-form-item style="float: left;width:230px;">
          <label style="float: left;margin-right:5px">发票类型</label>
          <el-select v-model="xsjsQueryData.invoice_type" @change="invoiceTypechange" style="float: left;width:150px;margin-right:5px">
            <el-option label="普通" :value="1"></el-option>
            <el-option label="增值税发票" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: left;width:280px;">
          <label style="float: left;margin-right:5px">发票明细打印方式</label>
          <el-select v-model="xsjsQueryData.print_type" style="float: left;width:150px;margin-right:5px">
            <el-option label="明细" :value="1"></el-option>
            <el-option label="另附明细" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: left;width:230px;">
          <label style="float: left;margin-right:5px">账期</label>
          <el-input disabled="disabled" v-model="xsjsQueryData.payterm" style="float: left;width:150px;margin-right:5px"></el-input>
        </el-form-item>
        <el-form-item style="float: left;width:230px;">
          <label style="float: left;margin-right:5px">收款方式</label>
          <el-input disabled="disabled" v-model="xsjsQueryData.recmodename" style="float: left;width:150px;margin-right:5px"></el-input>
        </el-form-item>
        <el-form-item style="float: left;width:230px;">
          <label style="float: left;margin-right:5px">经销方式</label>
          <el-input disabled="disabled" v-model="xsjsQueryData.salesmode" style="float: left;width:150px;margin-right:5px"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:button>
      <!--<kt-button type="primary" icon="fa fa-search" label="勾对" perms="1" @click="goudui"></kt-button>-->
      <el-button type="primary" icon="fa fa-search" label="勾对" perms="1" @click="goudui"></el-button>
      <kt-button type="primary" icon="fa fa-search" label="保存" perms="1" @click="saveAll('')"></kt-button>
      <kt-button type="primary" icon="fa fa-search" label="删除选定的行" perms="1" @click="deleteAll"></kt-button>
      <kt-button type="primary" icon="fa fa-search" label="生成发票" perms="1"></kt-button>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="xsjsTableData"
    :table-width-status="false"
    :table-height="xsjsTableHeight"
    :loading="xsjsLoading"
    :page-status="false"
  >
    <e-tables-columns prop="sasetdtlid" label="细单ID"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
    <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
    <e-tables-columns prop="unitprice" label="含税单价"></e-tables-columns>
    <e-tables-columns prop="total_line" label="金额"></e-tables-columns>
    <e-tables-columns prop="notaxmoney" label="无税金额"></e-tables-columns>
    <e-tables-columns prop="taxmoney" label="税额"></e-tables-columns>
    <e-tables-columns prop="notaxprice" label="无税单价"></e-tables-columns>
    <e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
    <e-tables-columns prop="costingprice" label="成本单价"></e-tables-columns>
    <e-tables-columns prop="costingmoney" label="成本金额"></e-tables-columns>
    <e-tables-columns prop="refpriceid" label="参考价类型ID"></e-tables-columns>
    <e-tables-columns prop="refprice" label="参考价"></e-tables-columns>
    <e-tables-columns prop="estimateid" label="暂估ID"></e-tables-columns>
    <e-tables-columns prop="orderid" label="订单ID"></e-tables-columns>
    <e-tables-columns prop="salesid" label="销售单ID"></e-tables-columns>
    <e-tables-columns prop="sadtlid" label="销售细单ID"></e-tables-columns>
    <e-tables-columns prop="salesdeptid" label="销售部门ID"></e-tables-columns>
    <e-tables-columns prop="salerid" label="销售员ID"></e-tables-columns>
    <e-tables-columns prop="sudeptid" label="进货部门ID"></e-tables-columns>
    <e-tables-columns prop="inbatchid" label="内部批次ID"></e-tables-columns>
    <e-tables-columns prop="outbatchid" label="外部批次ID"></e-tables-columns>
    <e-tables-columns prop="lotid" label="批号ID"></e-tables-columns>
    <e-tables-columns-date-time prop="sacredate" label="销售日期"></e-tables-columns-date-time>
    <e-tables-columns prop="employeename" label="销售员"></e-tables-columns>
    <el-table-column prop="caozuo" fixed="right" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.dtl')" perms="marketing:xsjs:select" @click="selectDtl(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="marketing:xsjs:select" @click="printDtl(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-confirm" :label="$t('action.comfirmThis')" perms="marketing:xsjs:select" @click="confirmDtl(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <div>
    <el-form :model="xsjsTableSumData" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="金额合计">
            <el-input v-model="xsjsTableSumData.totalRemmoney" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="不含税合计">
            <el-input v-model="xsjsTableSumData.totalRemnotaxmoney" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="税额合计">
            <el-input v-model="xsjsTableSumData.totalRemtaxmoney" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预收帐余额">
            <el-input v-model="xsjsTableSumData.yszye" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <e-dialogs :dialogTitle="xsjsDialogTitle" :status="xsjsStatus" @dialogClose="dialogClose">
    <!--勾兑选择条件-->
    <el-form :model="xsjsDtlForm" v-if="xsjsDtlStatus === 0" label-width="100px" style="margin-top:10px;">
      <el-form-item>
        <el-checkbox v-model="xsjsDtlForm.status" label="1"></el-checkbox>
        <label>销售单ID</label>
        <el-input v-model="xsjsDtlForm.salesid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="xsjsDtlForm.status" label="2"></el-checkbox>
        <label>开始日期</label>
        <el-date-picker type="datetime" v-model="xsjsDtlForm.start_validdate"></el-date-picker>
        <label>结束日期</label>
        <el-date-picker type="datetime" v-model="xsjsDtlForm.end_validdate"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="xsjsDtlForm.status" label="3"></el-checkbox>
        <label>货品ID</label>
        <el-input v-model="xsjsDtlForm.goodsid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="okClick">提交</el-button>
        <el-button type="info" @click="dialogClose">取消</el-button>
      </el-form-item>
    </el-form>
    <div v-if="xsjsDtlStatus === 1">
      <e-tables
        :table-data="xsjsDtlTableData"
        :table-width-status="false"
        :table-height="300"
        :loading="xsjsDtlLoading"
        :page-status="false"

      >
        <el-form-item type="selection"></el-form-item>
        <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
        <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
        <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
        <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
        <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
        <e-tables-columns prop="wjsl" label="未接数量"></e-tables-columns>
        <e-tables-columns prop="jssl" label="结算数量"></e-tables-columns>
        <e-tables-columns prop="jsje" label="结算金额"></e-tables-columns>
        <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
        <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
        <e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
        <e-tables-columns prop="salesmode" label="经销方式"></e-tables-columns>
        <e-tables-columns-date-time prop="sacredate" label="销售日期"></e-tables-columns-date-time>
        <e-tables-columns prop="recmodename" label="收款方式"></e-tables-columns>
        <e-tables-columns prop="payterm" label="账期"></e-tables-columns>
        <e-tables-columns prop="salesid" label="销售单ID"></e-tables-columns>
        <e-tables-columns prop="salerid" label="销售员ID"></e-tables-columns>
        <e-tables-columns prop="sudeptid" label="进货部门ID"></e-tables-columns>
        <e-tables-columns prop="salesdeptid" label="销售部门ID"></e-tables-columns>
        <e-tables-columns prop="estimateid" label="暂估ID"></e-tables-columns>
        <e-tables-columns prop="lotid" label="批号ID"></e-tables-columns>
        <e-tables-columns prop="inbatchid" label="内部批次ID"></e-tables-columns>
        <e-tables-columns prop="outbatchid" label="外部批次ID"></e-tables-columns>
        <e-tables-columns prop="sadtlid" label="销售细单ID"></e-tables-columns>
        <e-tables-columns prop="orderid" label="订单ID"></e-tables-columns>
        <e-tables-columns prop="costingprice" label="成本单价"></e-tables-columns>
        <e-tables-columns prop="employeename" label="销售员"></e-tables-columns>
      </e-tables>
      <div>
        <el-form :model="xsjsDtlTableSumData" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="金额合计">
                <el-input v-model="xsjsDtlTableSumData.totalRemmoney" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="不含税合计">
                <el-input v-model="xsjsDtlTableSumData.totalRemnotaxmoney" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="税额合计">
                <el-input v-model="xsjsDtlTableSumData.totalRemtaxmoney" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预收帐余额">
                <el-input v-model="xsjsDtlTableSumData.yszye"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-button type="primary" @click="huitian">提交</el-button>
              <el-button type="info" @click="dialogClose">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </e-dialogs>
  <hov-tools v-if="xsjsHovVisible" :hov-data="xsjsHovData"></hov-tools>
</div>
</template>

<script>
import ktButton from '../../Core/KtButton'
import {selectDdlOption} from "../../../utils/functions";
import HovTools from "../../Core/HovTools";
export default {
  name: "Xsjx",
  components:{HovTools, ktButton},
  data () {
    return {
      xsjsQueryData:{
        compamyid:null,
        companyname:null,
        settlemode:null,
        customid:null,
        customname:null,
        invoice_type:null,
        print_type:null,
        payterm:null,
        recmodename:null,
        salesmode:null,
        iftax: null,
        salerid:null,
        taxrate:null
      },
      xsjsSettlemodeOptions:[],
      xsjsTableData:[],
      xsjsTableHeight:300,
      xsjsLoading:false,
      xsjsTableSumData:{
        totalRemmoney:0,
        totalRemnotaxmoney:0,
        totalRemtaxmoney:0,
        yszye:0
      },
      xsjsDialogTitle:'',
      xsjsStatus:false,
      xsjsDtlStatus:0,
      xsjsDtlForm: {
        status:null,
        salesid:null,
        start_validdate:null,
        end_validdate:null,
        goodsid:null,
        customid: null,
        compamyid: null
      },
      xsjsDtlTableData:[],
      xsjsDtlLoading: false,
      xsjsDtlTableSumData:{
        totalRemmoney:0,
        totalRemnotaxmoney:0,
        totalRemtaxmoney:0,
        yszye:0
      },
      xsjsDtlCheckData:[],
      /*hov*/
      xsjsHovVisible:false,
      xsjsHovData: {
        hovTitle:'',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'xsjsHovVisible',
        hovColumns:[]
      }
    }
  },
  created() {
    this.xsjsTableHeight = (window.innerHeight - 260);
    this.xsjsSettlemodeOptions = selectDdlOption('AP_SETTLEMODE');
    this.getCompanyid();
    this.xsjsQueryData.invoice_type = 2;
    this.xsjsQueryData.print_type = 1;
    this.xsjsQueryData.settlemode = 2;
    this.xsjsQueryData.iftax = 0;
  },
  methods:{
    /*勾兑打开*/
    goudui(){
      if (this.xsjsQueryData.invoice_type === 2 &&this.xsjsQueryData.iftax === 0) {
        alert("请修改发票类型！");
        return false;
      }
      if (this.xsjsQueryData.settlemode === '' || this.xsjsQueryData.settlemode === null) {
        alert("未选择结算方式，不能勾对！");
        return false;
      }
      if (this.xsjsQueryData.customid === '' || this.xsjsQueryData.customid === null) {
        alert("客户ID为空，不能勾对！");
        return false;
      }
      this.xsjsDtlForm.status = 1;
      this.xsjsDtlForm.compamyid = this.xsjsQueryData.compamyid;
      this.xsjsDtlForm.customid = this.xsjsQueryData.customid;
      this.xsjsDialogTitle = '';
      this.xsjsDtlStatus = 0;
      this.xsjsStatus = true;
    },
    /*勾兑条件选择回填*/
    okClick(){
      let params = {};
      params.companyid = this.xsjsDtlForm.compamyid;
      params.customid = this.xsjsDtlForm.customid;
      if(this.xsjsDtlForm.status === 1) {
        params.salesid = this.xsjsDtlForm.salesid;
      }else if(this.xsjsDtlForm.status === 2) {
        params.start_validdate = new Date(this.xsjsDtlForm.start_validdate);
        params.end_validdate = new Date(this.xsjsDtlForm.end_validdate);
      }else if(this.xsjsDtlForm.status === 3) {
        params.salesid = this.xsjsDtlForm.goodsid;
      }
      this.xsjsDtlStatus = 1;
      this.xsjsDialogTitle = '勾兑窗口';
      this.xsjsDtlLoading = true;
      this.$api.pfsales.selectXsjsGoudui(params).then(res => {
        this.xsjsDtlTableData = res.data;
        Object.keys(this.xsjsDtlForm).forEach(item => {
          this.xsjsDtlForm[item] = null;
        });
        this.xsjsDtlLoading = false;
      }).catch(() => {
        this.xsjsDtlLoading = false;
        this.xsjsDtlStatus = 0;
        this.xsjsDialogTitle = '';
        return false;
      })
    },
    /*勾兑回填*/
    huitian(){
      if (this.xsjsTableData.length >= 8) {
        alert("单张发票的货品种数不能超过8个！");
        return false;
      }
      if (this.xsjsDtlCheckData.length === 0) {
        alert("没有选择数据，不能增加！");
        return false;
      }
      let flag = this.xsjsQueryData.recmodename;
      let name = this.xsjsQueryData.salerid;
      let flagT = this.xsjsQueryData.taxrate;
      this.xsjsDtlCheckData.forEach(item => {
        let flagrecmodename = item.recmodename;
        let flagtaxrate = item.taxrate;
        let flagsalerid = item.salerid;
        if(flag === '' || flag === null) {
          flag = flagrecmodename;
        }else {
          if(flag !== flagrecmodename){
            alert("收款方式不同，不能增加！");
            return false;
          }
        }
        if(name ===''||name === null){
          name = flagsalerid;
        } else {
          if (name !== flagsalerid) {
            alert("销售员不同，不能增加！");
            return false;
          }
        }
        if(flagT ===''||flagT === null){
          flagT = flagtaxrate;
        } else {
          if (flagT !== flagtaxrate) {
            alert("同一张发票内的货品销售税率必须一致！");
            return false;
          }
        }
        if(item.taxrate ===0 && this.xsjsQueryData.invoice_type === 2){
          alert("当前发票类型为增值税发票，不能选择0税率的药品！");
          return false;
        }
      })
      let params = [];
      this.xsjsDtlCheckData.forEach(item => {
        let json = {};
        json.goodsid = item.goodsid;
        json.goodsname = item.goodsname;
        json.goodstype = item.goodstype;
        json.goodsunit = item.goodsunit;
        json.prodarea = item.prodarea;
        json.lotno = item.lotno;
        this.xsjsTableData.forEach(item => {
          let parentsourceid = item.estimateid;
          let parentnumber = item.goodsqty;
          if(parentsourceid===null&&parentnumber === null){
            json.goodsqty = item.jssl;
            json.unitprice = item.unitprice;
            json.total_line = item.jsje;
            json.notaxmoney = (item.jsje/(1+item.taxrate)).toFixed(2);
            json.taxmoney = (json.total_line - json.notaxmoney).toFixed(2);
            json.notaxprice = (item.unitprice/(1+item.taxrate)).toFixed(2);
            json.taxrate = item.taxrate;
            json.costingprice = item.cbdj;
            json.costingmoney = (item.cbdj*item.jssl).toFixed(2);
          }else {
            if (parentsourceid === item.estimateid) {
              json.goodsqty = parseFloat(parentnumber) +parseFloat(item.jssl);
              json.unitprice = item.unitprice;
              json.total_line = (json.goodsqty*item.unitprice).toFixed(2);
              json.notaxmoney = (item.jsje/(1+item.taxrate)).toFixed(2);
              json.taxmoney = (json.total_line - json.notaxmoney).toFixed(2);
              json.notaxprice = (item.unitprice/(1+item.taxrate)).toFixed(2);
              json.taxrate = item.taxrate;
              json.costingprice = item.cbdj;
              json.costingmoney = (item.cbdj*item.jssl).toFixed(2);
            }
          }
          json.refpriceid = 0;
          json.refprice =0;
          json.estimateid = item.estimateid;
          json.orderid = item.orderid;
          json.salesid = item.salesid;
          json.sadtlid = item.sourceid;
          json.salesdeptid = item.salesdeptid;
          json.salerid = item.salerid;
          json.sudeptid = item.sudeptid;
          json.inbatchid = item.inbatchid;
          json.outbatchid = item.outbatchid;
          json.lotid = item.lotid;
          json.sacredate = item.sacredate;
          json.employeename = item.employeename;
        })
        params.push(json);
      })
      this.xsjsTableData = params;
      let flagRemmoney2 = parseFloat(this.xsjsDtlTableSumData.totalRemmoney);
      let flagRemnotaxmoneyFloat2 = parseFloat(this.xsjsDtlTableSumData.totalRemnotaxmoney);
      let flagRemtaxmoneyFloat2 = parseFloat(this.xsjsDtlTableSumData.totalRemtaxmoney);
      let querytotalRemmoneyFloat = parseFloat(this.xsjsTableSumData.totalRemmoney);
      let querytotalRemnotaxmoneyFloat = parseFloat(this.xsjsTableSumData.totalRemnotaxmoney);
      let querytotalRemtaxmoneyFloat = parseFloat(this.xsjsTableSumData.totalRemtaxmoney);
      this.xsjsTableSumData.totalRemmoney = (querytotalRemmoneyFloat + flagRemmoney2);
      this.xsjsTableSumData.totalRemnotaxmoney = (querytotalRemnotaxmoneyFloat + flagRemnotaxmoneyFloat2);
      this.xsjsTableSumData.totalRemtaxmoney = (querytotalRemtaxmoneyFloat + flagRemtaxmoneyFloat2);
      this.xsjsTableSumData.yszye = this.xsjsDtlTableSumData.yszye;
      this.dialogClose();
    },
    /*大保存*/
    saveAll(sarecids){
      let params = {};
      params.data = this.xsjsTableData;
      params.sarecids = sarecids;
      Object.keys(this.xsjsQueryData).forEach(item => {
        params[item] = this.xsjsQueryData[item];
      })
      params.employeeid = Number(sessionStorage['userid']);
      params.employeename = sessionStorage['username'];
      this.$api.pfsales.insertXsjs(params).then(res => {
        if(res.code === 200){
          alert('保存成功');
        }else {
          alert(res.msg);
          return false;
        }
      }).catch(() => {
        return false;
      })
    },
    deleteAll(){

    },
    /*hov回填*/
    queryHov(data){
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'companyid') {
        hovTitle='公司查询';
        hovUrl= "companyidhov/selectcompanyid";
        hovColumns =
        [
          {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
          {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1,fillid:"companyname"},
          {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
        ]
      } else if (data === 'customid') {
        hovTitle='客户查询';
        hovUrl= "companyidhov/selectcompanyid";
        hovColumns =
          [
            {id: "customid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"customid"},
            {id: "customname", name: "公司名称",queryStatus:true,dataStatus:1,fillid:"customname"},
            {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
          ]
      }
      this.xsjsHovData.hovTitle = hovTitle;
      this.xsjsHovData.hovUrl = hovUrl;
      this.xsjsHovData.fillDataName = 'xsjsQueryData';
      this.xsjsHovData.hovColumns = hovColumns;
      this.xsjsHovVisible = true;
    },
    /*初始化公司*/
    getCompanyid(){
      this.$api.hov.selectCompanyid({pageNum:1,pageSize:10,params:{companyid:sessionStorage['companyid']}}).then(res => {
        this.xsjsQueryData.companyid = res.data.content[0].companyid;
        this.xsjsQueryData.companyname = res.data.content[0].companyname;
      }).catch(() => {
        return false;
      })
    },
    /*发票类型限制*/
    invoiceTypechange(value){
      if((this.xsjsQueryData.iftax === 0 || this.xsjsQueryData.iftax === null || this.xsjsQueryData.iftax === "") && value === 2){
        alert("所选客户纳税人标识为0，不能选择增值税发票！");
        this.xsjsQueryData.invoice_type = 1;
      }
    },
    /*关闭弹窗*/
    dialogClose(){}
  }
}
</script>

<style scoped>

</style>
