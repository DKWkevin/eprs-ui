<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="xsjsmxcxQueryForm" :inline="true">
        <el-form-item-input prop="sasetdocid" label="销售单ID" v-model="xsjsmxcxQueryForm.sasetdocid"></el-form-item-input>
        <el-form-item label="日期" style="float:left;">
          <el-date-picker type="datetime" v-model="xsjsmxcxQueryForm.startdate" default-time="00:00:00"></el-date-picker>
          <el-date-picker type="datetime" v-model="xsjsmxcxQueryForm.endofdate" default-time="23:59:59"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="customid" label="客户ID" v-model="xsjsmxcxQueryForm.customid" id="customid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="xsjsmxcxQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="sasetdtlid" label="结算细单ID" v-model="xsjsmxcxQueryForm.sasetdtlid"></el-form-item-input>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:xsjsmxcx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:xsjsmxcx:select" @click="download"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="xsjsmxcxTableData"
    :table-width-status="false"
    :table-height="xsjsmxcxTableHeight"
    :pageNum="xsjsmxcxPageNum"
    :pageSize="xsjsmxcxPageSize"
    :total="xsjsmxcxTotal"
    :loading="xsjsmxcxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="sasetdocid" label="结算单ID"></e-tables-columns>
    <e-tables-columns prop="credate" label="日期"></e-tables-columns>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
    <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
    <e-tables-columns prop="total_line" label="金额"></e-tables-columns>
    <e-tables-columns prop="usestatus" label="状态"></e-tables-columns>
    <e-tables-columns prop="recflag" label="收款完成标志"></e-tables-columns>
    <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
    <e-tables-columns prop="salesid" label="销售单ID"></e-tables-columns>
    <e-tables-columns prop="sadtlid" label="销售细单ID"></e-tables-columns>
  </e-tables>
  <hov-tools v-if="xsjsmxcxHovVisible" :hov-data="xsjsmxcxHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/pfsales/xsjsmxcx.js"></script>
