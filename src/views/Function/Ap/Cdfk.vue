<template>
<div>
  <e-query :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="docTableColumns"
    :table-data="docTableData"
    :table-height="docTableHeight"
    :table-width-status="false"
    :loading="loading"
    @handle="handleFunction"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <el-dialog v-if="dtlVisible" :visible="dtlVisible" :width="dialogWidth" @close="dialogClose">
    <e-table :table-columns="dtlTableColumns" :table-data="dtlTableData" :table-height="dtlTableHeight" :page-status="false" :table-width-status="false"></e-table>
  </el-dialog>
  <cdfk-add v-if="addVisible" :bankOptions="bankOptions"></cdfk-add>
  <hov-tools v-if="cvidVisible" :hov-data="cvidHov"></hov-tools>
  <hov-tools v-if="inputmanVisible" :hov-data="inputmanHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/ap/cdfk.js"></script>
