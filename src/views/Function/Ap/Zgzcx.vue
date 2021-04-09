<template>
<div>
  <e-query :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="queryHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
    @handle="handle"
  ></e-table>
  <div style="margin-top:10px;">
    <el-form :inline="true">
      <el-form-item label="金额合计">
        <el-input v-model="hjje" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div v-if="dtlVisible">
    <el-dialog :visible="dtlVisibles" :title="dtlTitle" :top="dialogTop" :width="dialogWidth"
               :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog">
      <e-table :table-data="dtlData" :table-columns="dtlTableColumns" :table-height="dtlHeight" :loading="dtlloading" :table-width-status="false" :page-status="false"></e-table>
      <div slot="footer" style="text-align: center">
        <el-form :inline="true">
          <el-form-item label="增加金额">
            <el-input v-model="alladdmoney" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="减少金额">
            <el-input v-model="alldecmoney" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHovData"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--价格查询-->
<script lang="js" src="../../../js/ap/zgzcx.js"></script>

<style scoped>
  a{text-decoration: none;}
  .toolbar{float:left;position:relative;width:100%;height:75px;}
  .toolbar .querybtndiv{width:96%;position: absolute;top:0;left:0;padding-left:15px;}
  .toolbar .discollapseDiv{width:100%;max-height:30px;position:absolute;top:32px;left:0;overflow: hidden;background:white;}
  .toolbar .collapseDiv{width:100%;height:auto;position:absolute;overflow:visible;top:32px;left:0;z-index: 10;background:white;}
  .toolbar >>> .collapseBtn{width:40px;position:absolute;top:0;right:0;}
</style>
