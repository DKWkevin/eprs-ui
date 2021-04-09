<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    :label-width="labelWidth"
    @query="queryFunction"
    @openHov="openHov"
    @implUserExcel="implUserExcel"
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
    @openA="openA"
  ></e-table>
  <ywskc-dtl v-if="dtlVisible" :dtlData="dtlData"></ywskc-dtl>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="employeeVisible" :hov-data="employeeHov"></hov-tools>
</div>
</template>
<!--业务所库存-->
<script lang="js" src="../../../js/replenish/ywskc.js"></script>
