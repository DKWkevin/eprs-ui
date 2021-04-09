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
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="docTableHeight"
    :loading="loading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
    @selectionChange="selectionChange"
  ></e-table>
  <div style="margin-top:10px;">
    <el-form :inline="true">
      <el-form-item label="金额合计">
        <el-input v-model="jehj" disabled="disabled"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--进货结算明细查询-->
<script lang="js" src="../../../js/ap/jhjsmxcx.js"></script>
