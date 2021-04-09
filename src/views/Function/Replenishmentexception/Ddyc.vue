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
    :table-width-status="widthStatus"
    :table-height="docTableHeight"
    :loading="loading"
    @handle="handleFunction"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <el-dialog
    v-if="dtlVisible"
    :visible="dtlVisible"
    :width="dialogWidth"
    :top="dialogTop"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="dialogClose"
  >
    <e-table
      :loading="dtlLoading"
      :table-columns="dtlTableColumns"
      :table-data="dtlTableData"
      :table-width-status="widthStatus"
      :table-height="dtlTableHeight"
      :page-status="pageStatus"
    ></e-table>
  </el-dialog>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>
<!--订单异常-->
<script lang="js" src="../../../js/replenishmentexception/ddyc.js"></script>

