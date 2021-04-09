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
    :table-width-status="false"
    :loading="loading"
    @handle="handle"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <div v-if="dtlVisible" class="ywwlcxdtl">
    <el-dialog :visible="dtlVisibles" :title="dtlTitle" :top="dialogTop" :width="dialogWidth"
               :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog">
      <e-table :table-data="dtlData" :table-columns="dtlTableColumns" :table-height="dtlHeight" :loading="dtlloading" :page-status="false"></e-table>
    </el-dialog>
  </div>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
  <hov-tools v-if="customVisible" :hov-data="customHov"></hov-tools>
</div>
</template>
<!--业务往来查询-->
<script lang="js" src="../../../js/bussiness/ywwlcx.js"></script>

<style scoped>
.ywwlcxdtl >>> .el-dialog__body{height:440px;padding:10px;}
</style>
