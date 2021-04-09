<template>
<div>
  <e-query ref="query"
  :form-list="formList"
  :form-data="formData"
  :btn-options="btnOptions"
   @query="functionQuery"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @currentChange="handleChange"
    @sizeChage="handleChange"
    @hanlde="handleFunction"
  ></e-table>
  <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="title" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
    <el-form :model="base" v-if="doctype===1||doctype===2" :label-position="labelPosition" label-width="100px" style="width:300px;margin:0 auto">
      <el-form-item label="储备品种ID" v-if="doctype===2">
        <el-input v-model="base.stid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="储备品名称">
        <el-input v-model="base.stname"></el-input>
      </el-form-item>
      <el-form-item label="储备品规格">
        <el-input v-model="base.sttype"></el-input>
      </el-form-item>
      <el-form-item label="储备品单位">
        <el-input v-model="base.stunit"></el-input>
      </el-form-item>
      <el-form-item label="储备数量">
        <el-input v-model="base.stqty"></el-input>
      </el-form-item>
      <el-form-item label="储备单价">
        <el-input v-model="base.stprice"></el-input>
      </el-form-item>
      <el-form-item label="剂型">
        <el-input v-model="base.stjx"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="baseDtl" v-if="doctype===3||doctype===5" :label-position="labelPosition" label-width="100px" style="width:300px;margin:0 auto">
      <el-form-item label="储备品种ID">
        <el-input v-model="baseDtl.stid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货品ID">
        <el-input v-model="baseDtl.goodsid"></el-input>
      </el-form-item>
      <el-form-item label="品名">
        <el-input v-model="baseDtl.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="baseDtl.goodstype"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="baseDtl.goodsunit"></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input v-model="baseDtl.prodarea"></el-input>
      </el-form-item>
      <el-form-item label="计算关系">
        <el-input v-model="baseDtl.calrel"></el-input>
      </el-form-item>
      <el-form-item label="总部库存">
        <el-input v-model="baseDtl.dkkc"></el-input>
      </el-form-item>
    </el-form>
    <e-table
      v-if="doctype===4"
      :table-columns="tableDtlColumns"
      :table-data="tableDtlData"
      :showSummary="showSummary"
      :loading="dtlLoading"
      :page-status="pageStatus"
      :handle="handleFunctionDtl"
    ></e-table>
    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="insertForm" :loading="btnloading">保存</el-button>
      <el-button type="info" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script lang="js" src="../../../js/returnofgooodsandreserves/cbpzwh.js"></script>
