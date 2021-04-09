<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="xsskmxcxdyQueryForm" :inline="true">
        <el-form-item label="日期" style="float: left">
          <el-date-picker type="datetime" v-model="xsskmxcxdyQueryForm.startdate" default-time="00:00:00" style="width:180px;"></el-date-picker>
          <el-date-picker type="datetime" v-model="xsskmxcxdyQueryForm.endofdate" default-time="23:59:59" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="customid" label="客户ID" v-model="xsskmxcxdyQueryForm.customid" id="customid" hov-width="120px" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="xsskmxcxdyQueryForm.goodsid" id="goodsid" hov-width="120px" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="settlemode" label="结算方式" hov-width="120px" v-model="xsskmxcxdyQueryForm.settlemode"
        :options="xsskmxcxdySettlemode"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:xsskmxcxdy:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" label="打印" perms="marketing:xsskmxcxdy:select" @click="print"></kt-button>
        <el-button type="primary" icon="fa fa-plus" label="打印" perms="marketing:xsskmxcxdy:select" @click="print"></el-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="xsskmxcxdyTableData"
    :table-width-status="false"
    :table-height="xsskmxcxdyTableHeight"
    :loading="xsskmxcxdyLoading"
    :page-status="false"
    @selection-change="selectionChange"
  >
    <el-table-column type="selection"></el-table-column>
    <e-tables-columns prop="sarecid" label="总单ID"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="日期"></e-tables-columns-date-time>
    <e-tables-columns prop="total" label="收款金额"></e-tables-columns>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
    <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
    <e-tables-columns prop="total_line" label="金额"></e-tables-columns>
    <e-tables-columns prop="recmoney" label="已收金额"></e-tables-columns>
    <e-tables-columns prop="ddlname" label="结算方式"></e-tables-columns>
    <e-tables-columns prop="sasetdtlid" label="细单ID"></e-tables-columns>
  </e-tables>
  <el-form :inline="true" style="margin-top:10px;">
    <el-form-item label="合计金额">
      <el-input v-model="xsskmxcxdyGdhj"></el-input>
    </el-form-item>
  </el-form>
  <e-print ref="print" iframe-url="Xsskmxcxdy" :dtl-data="printData"></e-print>
  <hov-tools v-if="xsskmxcxdyHovVisible" :hov-data="xsskmxcxdyHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/pfsales/xsskmxcxdy.js"></script>
