<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :table-width-status="widthStatus"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>
<!--保管账查询-->
<script lang="js" src="../../../js/replenish/bgzcx.js"></script>
