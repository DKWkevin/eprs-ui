<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="xsbcmxcxQueryForm" :inline="true">
        <el-form-item label="日期" style="float: left">
          <el-date-picker type="datetime" v-model="xsbcmxcxQueryForm.startdate" default-time="00:00:00" style="width: 180px;"></el-date-picker>
          <el-date-picker type="datetime" v-model="xsbcmxcxQueryForm.endofdate" default-time="23:59:59" style="width: 180px;"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="customid" label="客户ID" v-model="xsbcmxcxQueryForm.customid" id="customid" hov-width="110px" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="xsbcmxcxQueryForm.goodsid" id="goodsid" hov-width="110px" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:xsbcmxcx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:xsbcmxcx:select" @click="download"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="xsbcmxcxTableData"
    :table-width-status="false"
    :table-height="xsbcmxcxTableHeight"
    :pageNum="xsbcmxcxPageNum"
    :pageSize="xsbcmxcxPageSize"
    :total="xsbcmxcxTotal"
    :loading="xsbcmxcxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="saadjdtlid" label="细单ID"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="日期"></e-tables-columns-date-time>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="客户名称"></e-tables-columns>
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
    <el-table-column prop="sourceid" label="源单ID">
      <template slot-scope="scope">
        <el-link type="primary" @click="searchdtl(scope.row)">{{scope.row.sourceid}}</el-link>
      </template>
    </el-table-column>
    <e-tables-columns prop="saadjdocid" label="总单ID"></e-tables-columns>
    <e-tables-columns prop="saler" label="销售员"></e-tables-columns>
  </e-tables>
  <e-dialogs dialogTitle="查询细单" :status="xsbcmxcxStatus" :dialog-width="900" @dialogClose="dialogClose">
    <e-tables
      :table-data="xsbcmxcxDtlTableData"
      :table-width-status="false"
      :table-height="350"
      :loading="xsbcmxcxDtlLoading"
      :page-status="true"
    >
      <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
      <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
      <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
      <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
      <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
      <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
      <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
      <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
      <e-tables-columns prop="total_lines" label="金额"></e-tables-columns>
      <e-tables-columns prop="notaxmoney" label="无税金额"></e-tables-columns>
      <e-tables-columns prop="taxmoney" label="税额"></e-tables-columns>
      <e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
      <e-tables-columns prop="refpriceid" label="参考单价ID"></e-tables-columns>
      <e-tables-columns prop="refprince" label="参考单价"></e-tables-columns>
      <e-tables-columns prop="backqty" label="已退货数量"></e-tables-columns>
      <e-tables-columns prop="stcompanyid" label="保管单位ID"></e-tables-columns>
      <e-tables-columns prop="stcompanyname" label="保管单位"></e-tables-columns>
      <e-tables-columns prop="salesid" label="销售单ID"></e-tables-columns>
      <e-tables-columns prop="sadtlid" label="销售细单ID"></e-tables-columns>
      <e-tables-columns prop="outbatchid" label="外部批次"></e-tables-columns>
      <e-tables-columns prop="inbatchid" label="内部批次"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="xsbcmxcxHovVisible" :hov-data="xsbcmxcxHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/pfsales/xsbcmxcx.js"></script>
