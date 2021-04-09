<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <div style="margin-top:20px;" v-if="totalStatus">
    <el-form :inline="inLine">
      <el-form-item label="金额合计">
        <el-input v-model="total" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
  <hov-tools v-if="employeeVisible" :hov-data="employeeHov"></hov-tools>
  <hov-tools v-if="deptVisible" :hov-data="deptHov"></hov-tools>
</div>
</template>
<!--进货明细查询-->
<script lang="js" src="../../../js/replenish/jhmxcx.js"></script>
