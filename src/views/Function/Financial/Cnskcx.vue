<template>
<div>
  <!--查询条件-->
  <e-query
    ref="query"
    :formList="formList"
    :formData="formData"
    :labelWidth="formlabelWidth"
    :btnOptions="btnOptions"
    :collapseStatus="collapseStatus"
    @openHov="queryHov"
    @query="queryFunction"
  ></e-query>
  <!--主表格-->
  <e-table
    ref="doctable"
    :tableHeight="docTableHeight"
    :tableColumns="docTableColumns"
    :tableData="docTableData"
    :loading="docLoading"
    @handle="handleDoc"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <!--细单-->
  <div class="edTable" v-if="dtlifsVisiable">
    <el-dialog
      :visible.sync="dtlVisiable"
      :title="dtlTitle"
      :width="dtlDialogWidth"
      :top="dtlDialogTop"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="dtlClose"
    >
      <cnskcxdtl :tableData="dtlTableData" :options="dtlOptions" @handle="handleDtl" :loading="dtlLoading"></cnskcxdtl>
      <div slot="footer" style="text-align:center;">
        <el-button type="info" @click="dtlClose">{{$t('action.cancel')}}</el-button>
        <kt-button icon="fa fa-check" :label="$t('action.comfirm')" :disabled="dtlDisabled" :perms="dtlPerms" type="primary" @click="updatedtl"></kt-button>
      </div>
    </el-dialog>
  </div>
  <!--cbs-->
  <div class="edTable" v-if="cbsifsVisiable">
    <el-dialog
      :visible.sync="cbsVisiable"
      :title="cbsTitle"
      :width="cbsDialogWidth"
      :top="cbsDialogTop"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="cbsClose"
    >
      <e-query
        :formList="cbsformList"
        :formData="cbsformData"
        :labelWidth="cbsformlabelWidth"
        :btnOptions="cbsbtnOptions"
        @query="cbsQueryFunction"
        @openHov="cbsHov"
      ></e-query>
      <e-table
        ref="cbsTable"
        :pageStatus="cbspageStatus"
        :tableHeight="cbsTableHeight"
        :tableColumns="cbsTableColumns"
        :tableData="cbsTableData"
        :loading="cbsLoading"
        :checkboxT="checkboxT"
        @selectionChange="SelectionChange"
        @elInput="elInput"
      ></e-table>
      <div slot="footer" style="text-align:center;">
        <span style="float:left;margin-right:10px;margin:5px;font-size:14px;">合计收款金额</span>
        <el-input disabled=disabled v-model="cbsSumTotal" style="float:left;width:200px"></el-input>
        <el-button type="info" @click="cbsClose">{{$t('action.cancel')}}</el-button>
        <kt-button icon="fa fa-check" :label="$t('action.comfirm')" :perms="cbsPerms" type="primary" @click="updateCbsBank"></kt-button>
      </div>
    </el-dialog>
  </div>
  <!--查询条件客户hov-->
  <hov-tools ref="queryCustom" v-if="queryCustomVisible" :hovData="customHov"></hov-tools>
  <!--查询条件确认人hov-->
  <hov-tools ref="queryConfirm" v-if="queryConfirmVisible" :hovData="confirmHov"></hov-tools>
  <!--查询条件确认人hov-->
  <hov-tools ref="queryRecman" v-if="queryRecmanVisible" :hovData="recmanHov"></hov-tools>
  <!--cbs客户hov-->
  <hov-tools ref="cbsCustom" v-if="cbsCustomVisible" :hovData="cbsCustomHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/financial/cnskcx.js"></script>

<style>
/*  .main-content .edTable .toolbar{height:80px;}
  .main-content .edTable .toolbar .discollapseDiv{height:50px;}
  .main-content .edTable .toolbar querybtndiv{}*/
  .edTable .el-dialog__wrapper .el-dialog{height:600px;}
  .edTable .el-dialog__wrapper .el-dialog .el-dialog__body{height:480px;overflow-y: auto;overflow-x: hidden;padding:0 10px;}
  .edTable .el-dialog__wrapper .el-dialog .el-dialog__body .el-input__inner{color:black}
  .edTable .el-dialog__wrapper .el-dialog .el-dialog__footer .el-input__inner{color:black}
  .docTable .el-input .el-input__inner{color:black !important;}
</style>
