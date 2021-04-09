<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
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
    @selectionChange="selectionChange"
    @openA="openA"
  ></e-table>
  <div style="margin-top:10px;">
    <el-form :inline="true">
      <el-form-item label="金额合计">
        <el-input v-model="hjje" disabled="disabled"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div v-if="dtlVisible">
    <el-dialog :visible="dtlVisibles" :width="dialogWidth" @close="dialogClose">
      <e-table :table-columns="dtlTableColumns" :table-data="dtlTableData" :table-height="dtlTableHeight" v-loading="dtlLoading" :page-status="false" :table-width-status="false"></e-table>
    </el-dialog>
  </div>
  <cdfk-add v-if="addVisible" :bankOptions="bankOptions"></cdfk-add>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/ap/jhfk.js"></script>,
