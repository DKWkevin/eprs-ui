<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="sgscfpxxQueryForm" :inline="true">
        <el-form-item label="结算日期" style="float: left">
          <el-date-picker type="datetime" v-model="sgscfpxxQueryForm.startdate" default-time="00:00:00" style="width:180px;"></el-date-picker>
          <el-date-picker type="datetime" v-model="sgscfpxxQueryForm.endofdate" default-time="23:59:59" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="customid" label="客户ID" v-model="sgscfpxxQueryForm.customid" :disabled="true" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="customname" label="客户名称" v-model="sgscfpxxQueryForm.customname" :disabled="true"></el-form-item-input>
        <el-form-item-select prop="invoice_type" label="发票类型" v-model="sgscfpxxQueryForm.invoice_type"
        :options="[{value:1,label:'普通'},{value:2,label:'增值税发票'}]"></el-form-item-select>
        <el-form-item-select prop="print_type" label="发票打印明细" v-model="sgscfpxxQueryForm.print_type"
        :options="[{value:1,label:'明细'},{value:2,label:'另附明细'}]"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:sgscfpxx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" label="保存" perms="marketing:sgscfpxx:select" @click="saveAll"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="sgscfpxxTableData"
    :table-width-status="false"
    :table-height="sgscfpxxTableHeight"
    :loading="sgscfpxxLoading"
    :page-status="false"
    @selection-change="selectionChange"
  >
    <el-table-column type="selection"></el-table-column>
    <e-tables-columns prop="credate" label="销售日期"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
    <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
    <e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
    <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
    <e-tables-columns prop="total_line" label="金额"></e-tables-columns>
    <e-tables-columns prop="sasetdtlid" label="结算细单ID"></e-tables-columns>
    <e-tables-columns prop="sasetdocid" label="结算单ID"></e-tables-columns>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
  </e-tables>
  <el-form :inline="true" style="margin-top:10px;">
    <el-form-item label="勾兑合计金额">
      <el-input v-model="sgscfpxxGdhj"></el-input>
    </el-form-item>
  </el-form>
  <hov-tools v-if="sgscfpxxHovVisible" :hov-data="sgscfpxxHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/pfsales/sgscfpxx.js"></script>
