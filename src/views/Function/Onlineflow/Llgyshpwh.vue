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
    @currentChange="handleChange"
    @sizeChage="handleChange"
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
            <el-input v-model="dtlFormData.supplyname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="货品ID">
            <el-input v-model="dtlFormData.goodsid" style="width:80%" :disabled="true"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('dtlgoodsid')"></el-button>
          </el-form-item>
          <el-form-item label="品名">
            <el-input v-model="dtlFormData.goodsname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="规格">
            <el-input v-model="dtlFormData.goodstype"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="dtlFormData.goodsunit" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产地">
            <el-input v-model="dtlFormData.prodarea" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="dtlFormData.usestatus" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="服务效期至">
            <el-input v-model="dtlFormData.validdate" :disabled="true"></el-input>
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
      <el-form-item label="缴费类型">
        <el-select v-model="xufei.standardname">
          <el-option v-for="item in standardnameOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="xufei.total" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货品ID">
        <el-input v-model="xufei.goodsid" style="width:80%" :disabled="true"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov('dtlsupplyid')"></el-button>
      </el-form-item>
      <el-form-item label="品名">
        <el-input v-model="xufei.goodsname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="xufei.goodstype"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="xufei.grade" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input v-model="xufei.prodarea" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="效期">
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
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="dtlgoodsVisible" :hov-data="dtlgoodsHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/onlineflow/llgyshpwh.js"></script>
