<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="sybgzcxQueryForm" :inline="true">
        <el-form-item-hov prop="goodsid" label="商品ID" v-model="sybgzcxQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="storename" label="仓储区域" v-model="sybgzcxQueryForm.storename" :options="sybgzcxStoreOptions"></el-form-item-select>
        <el-form-item-hov prop="supplyid" label="供应商ID" v-model="sybgzcxQueryForm.supplyid" id="supplyid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:sybgzcx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:sybgzcx:select" @click="download"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="sybgzcxTableData"
    :table-width-status="false"
    :table-height="sybgzcxTableHeight"
    :pageNum="sybgzcxPageNum"
    :pageSize="sybgzcxPageSize"
    :total="sybgzcxTotal"
    :loading="sybgzcxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="storename" label="仓储区域"></e-tables-columns>
    <e-tables-columns prop="remqty" label="库存"></e-tables-columns>
    <e-tables-columns prop="lotid" label="批号ID"></e-tables-columns>
    <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
    <e-tables-columns prop="posid" label="货位ID"></e-tables-columns>
    <e-tables-columns prop="posno" label="货位编码"></e-tables-columns>
    <e-tables-columns prop="invaliddate" label="效期"></e-tables-columns>
  </e-tables>
  <hov-tools v-if="sybgzcxHovVisible" :hov-data="sybgzcxHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/area/sybgzcx.js"></script>
