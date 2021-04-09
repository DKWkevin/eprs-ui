<template>
<div v-loading="loading">
  <e-query
    :btn-options="btnOptions"
    :form-list="formList"
    :form-data="formData"
    @openHov="openHov"
    @query="queryFuntion"
    @implUserExcel="implUserExcel"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="tableLoading"
    @currentChange="handleChange"
  ></e-table>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--慢病目录-->
<script lang="js" src="../../../js/chronicdisease/mbspml.js"></script>
