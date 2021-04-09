<template>
<div>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           :labelWidth="labelWidth"
           @openHov="openHov"
           @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="docTableColumns"
    :table-data="docTableData"
    :table-height="docTableHeight"
    :loading="loading"
    :table-width-status="false"
    @handle="handleFunction"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <cgdd-goods v-if="dtlVisible" :dtlData="goodsData"></cgdd-goods>
  <cgdd-update-kc v-if="updatekcVisible" :dtlData="updatekcData"></cgdd-update-kc>
  <hov-tools v-if="inputmanVisible" :hov-data="inputmanHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--采购订单管理-->
<script lang="js" src="../../../js/ordermarnagement/cgddgl.js"></script>

<style scoped>
 #dtldialog >>> .el-dialog__body{height:450px;overflow-y: auto;overflow-x: hidden;padding:0 20px;}
 #dtldialog >>> .el-dialog__footer{height:50px}
</style>
