<template>
<div
  v-loading="VLoading"
  element-loading-text="正在处理,请稍后。。。"
>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           @openHov="openHov"
           @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="docTableHeight"
    :loading="loading"
    @handle="handleFunction"
    @currentChange="handleChange"
    @sizeChange="handleChange"
    @selectionChange="selectionChange"
  ></e-table>
  <div style="margin-top:10px;">
    <el-form :inline="true">
      <el-form-item label="金额合计">
        <el-input v-model="hjje" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="勾兑金额">
        <el-input v-model="gdje" disabled="disabled"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div v-if="dtlDivVisible">
    <el-dialog :visible="dtlVisible" :width="dtlWidth" title="查看细单" @close="dtlCloseDialog">
      <e-table
        :table-columns="dtlTableColumns"
        :table-data="dtlTableData"
        :table-height="dtlTableHeight"
        :table-width-status="dtlWidthStatus"
        :loading="dtlLoading"
      ></e-table>
    </el-dialog>
  </div>
  <div id="updateJhjscxDialog" v-if="updateDivVisible">
    <el-dialog
      :visible="updateVisible"
      :width="updateWidth"
      title="税额调整"
      v-loading="upateLoading"
      element-loading-text="正在处理,请稍后。。。"
      @close="updateCloseDialog">
      <el-form
        ref="updateJhjscx"
        :model="updateFormData"
        :inline="true"
        style="width:620px;margin:0 auto;">
        <el-form-item label="货品ID">
          <el-input v-model="updateFormData.goodsid" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="品名">
          <el-input v-model="updateFormData.goodsname" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="updateFormData.goodstype" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="updateFormData.goodsunit"></el-input>
        </el-form-item>
        <el-form-item label="产地">
          <el-input v-model="updateFormData.prodarea"></el-input>
        </el-form-item>
        <el-form-item label="税率">
          <el-input v-model="updateFormData.taxrate"></el-input>
        </el-form-item>
        <el-form-item label="单据类型">
          <el-input v-model="updateFormData.type"></el-input>
        </el-form-item>
        <el-form-item label="税额" prop = "taxmoney" :rules = "{required: true, message: '税额不能为空'}">
          <el-input v-model="updateFormData.taxmoney"></el-input>
        </el-form-item>
        <el-form-item label="无税金额">
          <el-input v-model="updateFormData.notaxmoney"></el-input>
        </el-form-item>
        <el-form-item label="内部批次">
          <el-input v-model="updateFormData.inbatchid"></el-input>
        </el-form-item>
        <el-form-item label="外部批次">
          <el-input v-model="updateFormData.outbatchid"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" @click="updateCloseDialog">取消</el-button>
        <el-button type="primary" @click="insertSltzDialog">保存</el-button>
      </div>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
</div>
</template>
<!--进货结算查询-->
<script lang="js" src="../../../js/ap/jhjscx.js"></script>

<style>
#updateJhjscxDialog .el-dialog__body{
  width:100%;
  height:300px;
}
#updateJhjscxDialog  .el-form-item{
  width:300px;
  float: left;
}
#updateJhjscxDialog  .el-form-item__label{
  width:80px;
  float: left;
  text-align: right;
}
#updateJhjscxDialog  .el-form-item__content{
  float: left;
}
</style>
