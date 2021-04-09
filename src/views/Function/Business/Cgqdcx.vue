<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    @openHov="queryHov"
    @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHovData"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="partenerVisible" :hov-data="partenerHov"></hov-tools>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
</div>
</template>
<!--采购渠道查询-->
<script lang="js" src="../../../js/bussiness/cgqdcx.js"></script>
