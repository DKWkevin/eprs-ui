<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="mdwdfwQueryForm" :inline="true">
        <el-form-item-hov prop="counterid" label="门店ID" v-model="mdwdfwQueryForm.counterid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:mdwdfw:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="marketing:mdwdfw:select" @click="addOpen"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:mdwdfw:select" @click="download"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="mdwdfwTableData"
    :table-width-status="false"
    :table-height="mdwdfwTableHeight"
    :pageNum="mdwdfwPageNum"
    :pageSize="mdwdfwPageSize"
    :total="mdwdfwTotal"
    :loading="mdwdfwLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="counterid" label="门店ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="门店名称"></e-tables-columns>
    <e-tables-columns prop="area" label="面积分类"></e-tables-columns>
    <e-tables-columns prop="fc" label="功能"></e-tables-columns>
    <e-tables-columns prop="district" label="商圈"></e-tables-columns>
    <e-tables-columns prop="yinpian" label="饮片范围"></e-tables-columns>
    <e-tables-columns prop="apparatus" label="器械范围"></e-tables-columns>
    <e-tables-columns prop="sale" label="销售分类"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="marketing:mdwdfw:select" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="marketing:mdwdfw:select" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="mdwdfwDialog" :status="mdwdfwStatus" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="mdwdfwDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-hov :span="24" label="门店ID" prop="counterid" id="counterid" v-model="mdwdfwDtlForm.counterid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-select type="string" :span="12" prop="area" label="面积分类" :value="mdwdfwDtlForm.area" :options="mdwdfwAreaOptions"></el-form-col-item-select>
      <el-form-col-item-select :span="12" prop="fc" label="功能" :value="mdwdfwDtlForm.fc" :options="mdwdfwFcOptions"></el-form-col-item-select>
      <el-form-col-item-select :span="12" prop="district" label="商圈" :value="mdwdfwDtlForm.district" :options="mdwdfwDistrictOptions"></el-form-col-item-select>
      <el-form-col-item-select :span="12" prop="yinpian" label="饮片范围" :value="mdwdfwDtlForm.yinpian" :options="mdwdfwYinpianOptions"></el-form-col-item-select>
      <el-form-col-item-select :span="12" prop="apparatus" label="器械范围" :value="mdwdfwDtlForm.apparatus" :options="mdwdfwApparatusOptions"></el-form-col-item-select>
      <el-form-col-item-select :span="12" prop="sale" label="销售分类" :value="mdwdfwDtlForm.sale" :options="mdwdfwSaleOptions"></el-form-col-item-select>
    </el-form-row>
    <div>
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="mdwdfwHovVisible" :hov-data="mdwdfwHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/marketing/mdwdfw.js"></script>
