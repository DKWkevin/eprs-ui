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
      <el-form :model="base" :inline="inline" :label-width="dialogLabelWidth">
        <el-form-item label="渠道ID">
          <el-input v-model.number="base.channelid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司ID">
          <el-input v-model.number="base.companyid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="base.companyname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商ID">
          <el-input v-model="base.supplyid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="base.supplyname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="货品ID">
          <el-input v-model="base.goodsid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="货品名称">
          <el-input v-model="base.goodsname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="base.goodstype" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="base.goodsunit" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="产地">
          <el-input v-model="base.prodarea" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="进货优先级">
          <el-input v-model="base.prioritiesno"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
      <el-button type="primary" round @click="insertCdfk">保存</el-button>
      <el-button type="info" round @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--采购渠道维护-->
<script lang="js" src="../../../js/replenish/cgqdwh.js"></script>
