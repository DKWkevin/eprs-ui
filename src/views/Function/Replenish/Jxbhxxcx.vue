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
    @handle="handleFunction"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
 <jxbhxxcx-dtl v-if="dtlVisible" :dtlData="dtlData" :dtlType="dtlType"></jxbhxxcx-dtl>
  <hov-tools v-if="batchVisible" :hov-data="batchHov"></hov-tools>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/replenish/jxbhxxcx.js"></script>
