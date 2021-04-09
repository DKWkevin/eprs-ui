<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" :label-width="labelWidth" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :table-width-status="widthStatus"
    @handle="handleFunction"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <whspbhsxpf-dtl v-if="dtlVisible" :dtlData="dtlData"></whspbhsxpf-dtl>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/replenish/whspbhsxpf.js"></script>
