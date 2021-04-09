<template>
<div>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           @openHov="openHov"
           @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="docTableColumns"
    :table-data="docTableData"
    :table-height="docTableHeight"
    :loading="loading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <hov-tools v-if="inputmanVisible" :hov-data="inputmanHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--采购订单明细查询-->
<script lang="js" src="../../../js/ordermarnagement/cgddmxcx.js"></script>
