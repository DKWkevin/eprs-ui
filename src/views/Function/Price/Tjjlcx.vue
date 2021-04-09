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
    :loading="loading"
    @currentChange="handlePageChange"
    @sizeChange="handlePageChange"
  ></e-table>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="employeeVisible" :hov-data="employeeHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/price/tjjlcx.js"></script>
