<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    :label-width="labelWidth"
    :collapse-status="collapseStatus"
    @query="queryFunction"
    @openHov="openHov"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <hov-tools v-if="batchVisible" :hov-data="batchHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>
<!--生成补货异常记录-->
<script lang="js" src="../../../js/replenish/scbhycjl.js"></script>
