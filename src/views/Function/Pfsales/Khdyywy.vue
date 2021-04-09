<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="khdyywyQueryForm" :inline="true">
        <el-form-item-hov prop="companyid" label="公司ID" v-model="khdyywyQueryForm.companyid" id="companyid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="customid" label="客户ID" v-model="khdyywyQueryForm.customid" id="customid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="salerid" label="业务员ID" v-model="khdyywyQueryForm.salerid" id="salerid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:khdyywy:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="marketing:khdyywy:select" @click="addOpen"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:khdyywy:select" @click="download"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="khdyywyTableData"
    :table-width-status="false"
    :table-height="khdyywyTableHeight"
    :pageNum="khdyywyPageNum"
    :pageSize="khdyywyPageSize"
    :total="khdyywyTotal"
    :loading="khdyywyLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="companyid" label="公司ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="公司名称"></e-tables-columns>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="customname" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="salerid" label="业务员ID"></e-tables-columns>
    <e-tables-columns prop="employeename" label="业务员名称"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="marketing:khdyywy:select" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs dialogTitle="新增" :status="khdyywyStatus" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="khdyywyDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-hov :span="12" label="公司ID" prop="companyid" id="companyid" v-model="khdyywyDtlForm.companyid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="companyname" label="公司名称" :value="khdyywyDtlForm.companyname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="客户ID" prop="customid" id="customid" v-model="khdyywyDtlForm.customid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="customname" label="客户名称" :value="khdyywyDtlForm.customname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="业务员ID" prop="salerid" id="salerid" v-model="khdyywyDtlForm.salerid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="employeename" label="业务员名称" :value="khdyywyDtlForm.employeename" :disabled="true"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="addForm">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="khdyywyHovVisible" :hov-data="khdyywyHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/pfsales/khdywy.js"></script>
