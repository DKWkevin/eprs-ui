<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @handle="handleFunction"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <div>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="dialogTitle" :width="dialogWidth"  :destroy-on-close="true" @close="closeDialog" :close-on-click-modal="false">
      <e-table
        ref="doctable"
        :table-columns="dtlTableColumns"
        :table-data="dtlTableData"
        :table-height="dtlTableHeight"
        :page-status="pageStatus"
        :table-width-status="widthStatus"
      ></e-table>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>
<!--进货单查询-->
<script lang="js" src="../../../js/replenish/jhdcx.js"></script>
