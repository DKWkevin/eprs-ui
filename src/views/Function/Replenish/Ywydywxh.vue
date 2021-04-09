<template>
<div>
  <e-query ref="query" :form-list="formList" :form-data="formData" :btn-options="btnOptions" :label-width="labelWidth" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :table-width-status="widthStatus"
    @handle="handleFunction"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <div>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="dialogTitle" :width="dialogWidth"  :destroy-on-close="true" @close="closeDialog" :close-on-click-modal="false">
      <el-form :model="base" :inline="inline" :label-width="dialogLabelWidth">
        <el-form-item label="ID">
          <el-input v-model.number="base.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model.number="base.relid" :disabled="true" style="width:80%"></el-input>
          <el-button circle icon="el-icon-search" @click="openHov('membername')"></el-button>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="base.membername"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="业务员ID">
          <el-input v-model="base.ywyid" :disabled="true" style="width:80%"></el-input>
          <el-button circle icon="el-icon-search" @click="openHov('dtlywyid')" v-if="dtlstatus===false"></el-button>
        </el-form-item>
        <el-form-item label="业务员">
          <el-input v-model="base.ecdfyusername" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商ID">
          <el-input v-model="base.supplyid" :disabled="true" style="width:80%"></el-input>
          <el-button circle icon="el-icon-search" @click="openHov('dtlsupplyid')" v-if="dtlstatus===true"></el-button>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="base.companyname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="企业微信帐号">
          <el-input v-model="base.wxno"></el-input>
        </el-form-item>
        <el-form-item label="录入人ID" v-if="dtlstatus===false">
          <el-input v-model="base.inputmanid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="录入人" v-if="dtlstatus===false">
          <el-input v-model="base.inputmanname" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
      <el-button type="primary" round @click="insertCdfk">保存</el-button>
      <el-button type="info" round @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="ywyVisible" :hov-data="ywyHov"></hov-tools>
  <hov-tools v-if="dtlMemberVisible" :hov-data="dtlMemberHov"></hov-tools>
  <hov-tools v-if="dtlYwyVisible" :hov-data="dtlYwyHov"></hov-tools>
  <hov-tools v-if="dtlSupplyVisible" :hov-data="dtlSupplyHov"></hov-tools>
</div>
</template>
<!--企业通讯录-->
<script lang="js" src="../../../js/replenish/ywydywxh.js"></script>
