<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="docTableHeight"
    :table-width-status="false"
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="companyidhzVisible" :hov-data="companyidhzHov"></hov-tools>
  <hov-tools v-if="employeenamehzVisible" :hov-data="employeenamehzHov"></hov-tools>
</div>
</template>
<!--付款明细查询-->
<script lang="js" src="../../../js/ap/fkmxcx.js"></script>
