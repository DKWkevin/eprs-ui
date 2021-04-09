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
      :table-columns="dtlTableColumns"
      :table-data="dtlTableData"
      :table-height="dtlTableHeight"
      :page-status="pageStatus"
    ></e-table>
  </el-dialog>
  <e-print ref="print" iframe-url="Yfdddydy" :dtl-data="dtlData"></e-print>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>
<!--预付订单打印-->
<script lang="js" src="../../../js/ordermarnagement/yfdddy.js"></script>
