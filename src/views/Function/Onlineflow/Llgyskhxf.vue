<template>
<div>
  <e-query ref="query"
  :form-list="formList"
  :form-data="formData"
  :btn-options="btnOptions"
   @opneHov="openHov"
   @query="functionQuery"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :table-width-status="false"
    @currentChange="handleChange"
    @sizeChage="handleChange"
    @selectionChange="selectionChange"
    @hanlde="handleFunction"
  ></e-table>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="xufeidialogColse">
        <el-form :model="dtlFormData" label-position="right" label-width="100px" style="width:300px;margin:0 auto;">
          <el-form-item label="供应商ID">
            <el-input v-model="dtlFormData.supplyid" :disabled="true" style="width:80%"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('dtlsupplyid')"></el-button>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-input v-model="dtlFormData.supplyname"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="dtlFormData.username"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="dtlFormData.usestatus">
              <el-option :value="1" label="正常"></el-option>
              <el-option :value="2" label="停用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户效期至">
            <el-date-picker type="datetime" v-model="dtlFormData.validdate" style="width: 90%"></el-date-picker>
          </el-form-item>
          <el-form-item label="用户等级">
            <el-select v-model="dtlFormData.grade">
              <el-option :value="0" label="免费用户"></el-option>
              <el-option :value="1" label="普通用户"></el-option>
              <el-option :value="2" label="高级用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工业/商业">
            <el-select v-model="dtlFormData.selfallflag">
              <el-option :value="0" label="工业"></el-option>
              <el-option :value="1" label="商业"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="insertForm" :loading="btnLoading">保存</el-button>
        <el-button type="info" @click="dialogColse">取消</el-button>
      </div>
    </el-dialog>
  <el-dialog v-if="xufeiVisible" :visible.sync="xufeiVisible" :title="docTitle" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
    <el-form :model="xufei" label-position="right" label-width="100px" style="width:300px;margin:0 auto;">
      <el-form-item label="供应商ID">
        <el-input v-model="xufei.supplyid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="供应商名称">
        <el-input v-model="xufei.supplyname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户等级">
        <el-select v-model="xufei.grade">
          <el-option :value="1" label="普通用户"></el-option>
          <el-option :value="2" label="高级用户"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收费标准名称">
        <el-select v-model="xufei.standardname">
          <el-option v-for="item in standardnameOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="xufei.total" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="效期至">
        <el-input v-model="xufei.validdate" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="insertXufei" :loading="btnLoading">续费</el-button>
      <el-button type="info" @click="xufeidialogColse">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="dtlsupplyVisible" :hov-data="dtlsupplyHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/onlineflow/llgyskhxf.js"></script>
