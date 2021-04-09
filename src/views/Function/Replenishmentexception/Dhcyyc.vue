<template>
<div>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="docTableColumns"
    :table-data="docTableData"
    :table-width-status="widthStatus"
    :table-height="docTableHeight"
    :loading="loading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
</div>
</template>
<!--到货差异异常-->
<script lang="js" src="../../../js/replenishmentexception/dhcyyc.js"></script>
