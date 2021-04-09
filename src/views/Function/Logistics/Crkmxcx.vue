<template>
<div>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           :labelWidth="labelWidth"
           @openHov="openHov"
           @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @currentChange="changeFunction"
    @sizeChange="changeFunction"
  ></e-table>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="partenerVisible" :hov-data="partenerHov"></hov-tools>
</div>
</template>
<!--出入库明细查询-->
<script lang="js" src="../../../js/logistics/crkmxcx.js"></script>
