<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    @openHov="openHov"
    @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
    @openA="handleFunction"
  ></e-table>
  <div style="text-align: center;margin-top:10px;">
    <el-form :inline="true">
      <el-form-item label="合计金额">
        <el-input :disabled="true" v-model="hjje"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <el-dialog v-if="dtlVisible" :visible="dtlVisible" title="查看细单" :destroy-on-close="true" @close="docClose" :close-on-click-modal="false">
    <e-table
      :table-columns="dtlColumns"
      :table-data="dtlData"
      :table-height="dtlHeight"
      :loading="dtlLoading"
      :page-status="false"
    ></e-table>
  </el-dialog>
  <hov-tools v-if="customVisible" :hov-data="customHov"></hov-tools>
  <hov-tools v-if="salerVisible" :hov-data="salerHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="inputmanVisible" :hov-data="inputmanHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/wholesale/xsmxcx.js"></script>
