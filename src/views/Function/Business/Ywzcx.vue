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
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
    @openA="openA"
  ></e-table>
  <div class="dialogDiv" v-if="dtlVisible">
    <el-dialog :visible="dtlVisibles" :title="dtlTitle" :top="dialogTop" :width="dialogWidth"
               :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog">
      <e-table :table-data="dtlData" :table-columns="dtlTableColumns" :table-height="dtlHeight" :loading="dtlloading" :table-width-status="false" :page-status="false"></e-table>
      <div slot="footer" v-if="wtrStatus" style="float:left;height:40px;">
        <el-form label-position="right" :inline="true">
          <el-form-item label="授权委托人">
            <el-input :disabled="true" v-model="wtr"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHovData"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="partenerVisible" :hov-data="partenerHov"></hov-tools>
  <hov-tools v-if="factidVisible" :hov-data="factidHov"></hov-tools>
  <hov-tools v-if="category1Visible" :hov-data="category1Hov"></hov-tools>
  <hov-tools v-if="category2Visible" :hov-data="category2Hov"></hov-tools>
  <hov-tools v-if="category3Visible" :hov-data="category3Hov"></hov-tools>
  <hov-tools v-if="category6Visible" :hov-data="category6Hov"></hov-tools>
</div>
</template>
<!--业务帐查询-->
<script lang="js" src="../../../js/bussiness/ywzcx.js"></script>

<style scoped>
  .dialogDiv >>> .el-dialog__body {padding:5px;}
  .dialogDiv >>> .el-dialog__footer {padding-top:30px;padding-bottom:30px;}
</style>
