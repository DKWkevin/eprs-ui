<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    :label-width="labelWidth"
    @openHov="queryHov"
    @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    id="doctable"
  :table-columns="tableColumns"
  :table-data="tableData"
  :table-height="tableHeight"
    :loading="loading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
    @handle="handleQuery"
  ></e-table>
  <khgl-dtl v-if="khglDtlVisible" :dtl-data="dtlData" :customOptions="customOptions" :dltStatus="dltStatus" :docTitle="docTitle"></khgl-dtl>
  <hov-tools v-if="queryCustomVisible" :hov-data="customHov"></hov-tools>
  <hov-tools v-if="queryPriceVisible" :hov-data="priceHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/quality/khgl.js"></script>
