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
      <el-form ref="rulesForm" :model="base" :inline="inline" :label-width="dialogLabelWidth">
        <el-form-item label="供应商ID" prop="supplyid" style="width:300px;" :rules="[{required:true,message:'供应商ID不能为空'}]">
          <el-input v-model.number="base.supplyid" :disabled="true" style="width:160px;"></el-input>
          <el-button icon="el-icon-search" circle @click="openHov('dtlsupplyid')"></el-button>
        </el-form-item>
        <el-form-item label="供应商" style="width:300px;">
          <el-input v-model.number="base.supplyname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="发货模式" prop="sendmode" :rules="[{required:true,message:'发货模式ID不能为空'}]" style="width:300px;">
          <el-select v-model="base.sendmode" clearable style="width:170px;">
            <el-option v-for="item in sendmodeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货地址" prop="recaddress" :rules="[{required:true,message:'收货地址不能为空'}]" style="width:300px;">
          <el-input v-model="base.recaddress"></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="recman" :rules="[{required:true,message:'收货人不能为空'}]" style="width:300px;">
          <el-input v-model="base.recman"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="rectel" :rules="[{required:true,message:'收货人电话不能为空'}]" style="width:300px;">
          <el-input v-model="base.rectel"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="recicno" :rules="[{required:true,message:'收货人身份证号不能为空'}]" style="width:300px;">
          <el-input v-model="base.recicno"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" style="width:300px;">
          <el-date-picker type="datetime" v-model="base.caldate" :disabled="true" style="width:170px;"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
      <el-button type="primary" round @click="insertCdfk">保存</el-button>
      <el-button type="info" round @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="dtlsupplyVisible" :hov-data="dtlsupplyHov"></hov-tools>
</div>
</template>
<!--供应商退货信息维护-->
<script lang="js" src="../../../js/replenish/gysthxxwh.js"></script>
