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
        <el-form-item label="联系方式ID">
          <el-input v-model.number="base.contactinfoid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商ID">
          <el-input v-model.number="base.companyid" style="width:80%"></el-input>
          <el-button circle icon="el-icon-search" @click="openHov('dtlsupplyid')"></el-button>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="base.companyname"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="base.contactman"></el-input>
        </el-form-item>
        <el-form-item label="固定电话">
          <el-input v-model="base.phone"></el-input>
        </el-form-item>
        <el-form-item label="移动电话">
          <el-input v-model="base.mobilephone"></el-input>
        </el-form-item>
        <el-form-item label="邮件">
          <el-input v-model="base.email"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="base.department"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="base.position"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="base.fax"></el-input>
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input v-model="base.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="base.postcode"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="base.memo"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model.number="base.idcard"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
      <el-button type="primary" round @click="insertCdfk">保存</el-button>
      <el-button type="info" round @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="dtlSupplyVisible" :hov-data="dtlSupplyHov"></hov-tools>
</div>
</template>
<!--企业通讯录-->
<script lang="js" src="../../../js/replenish/qytxl.js"></script>
