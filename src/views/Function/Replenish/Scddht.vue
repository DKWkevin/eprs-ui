<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :page-status="pageStatus"
  ></e-table>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--生成订单合同-->
<script lang="js" src="../../../js/replenish/scddht.js"></script>

