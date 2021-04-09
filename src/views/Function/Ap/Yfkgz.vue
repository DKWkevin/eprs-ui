<template>
<div>
  <e-query :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="queryHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :table-width-status="false"
    @sizeChange="handleChange"
    @currentChange="handleChange"
    @handle="handle"
  ></e-table>
  <div v-if="dtlVisible">
    <el-dialog :visible="dtlVisibles" :title="dtlTitle" :top="dialogTop" :width="dialogWidth"
               :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog">
      <e-table :table-data="dtlData" :table-columns="dtlTableColumns" :table-height="dtlHeight" :loading="dtlloading" :table-width-status="false" :page-status="false"></e-table>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHovData"></hov-tools>
</div>
</template>
<!--预付款跟踪-->
<script lang="js" src="../../../js/ap/yfkgz.js"></script>

<style scoped>
  a{text-decoration: none;}
  .toolbar{float:left;position:relative;width:100%;height:75px;}
  .toolbar .querybtndiv{width:96%;position: absolute;top:0;left:0;padding-left:15px;}
  .toolbar .discollapseDiv{width:100%;max-height:30px;position:absolute;top:32px;left:0;overflow: hidden;background:white;}
  .toolbar .collapseDiv{width:100%;height:auto;position:absolute;overflow:visible;top:32px;left:0;z-index: 10;background:white;}
  .toolbar >>> .collapseBtn{width:40px;position:absolute;top:0;right:0;}
</style>
