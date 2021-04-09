<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="ydfjgljyfwQueryForm" :inline="true">
        <el-form-item-hov prop="companyid" label="公司ID" v-model="ydfjgljyfwQueryForm.companyid" id="companyid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="cityid" label="城市ID" v-model="ydfjgljyfwQueryForm.cityid" id="cityid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="qualityTypeId" label="分类ID" v-model="ydfjgljyfwQueryForm.qualityTypeId" id="qualityTypeId" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="qualityScopeId" label="范围ID" v-model="ydfjgljyfwQueryForm.qualityScopeId" id="qualityScopeId" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="ydfjgljyfwQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:ydfjgljyfw:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="marketing:ydfjgljyfw:select" @click="addOpen"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="ydfjgljyfwTableData"
    :table-width-status="false"
    :table-height="ydfjgljyfwTableHeight"
    :pageNum="ydfjgljyfwPageNum"
    :pageSize="ydfjgljyfwPageSize"
    :total="ydfjgljyfwTotal"
    :loading="ydfjgljyfwLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="companyid" label="公司ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="公司名称"></e-tables-columns>
    <e-tables-columns prop="cityid" label="城市ID"></e-tables-columns>
    <e-tables-columns prop="cityname" label="城市名称"></e-tables-columns>
    <e-tables-columns prop="qualitytypeid" label="分类ID"></e-tables-columns>
    <e-tables-columns prop="qualitytypename" label="分类名称"></e-tables-columns>
    <e-tables-columns prop="qualityscopeid" label="范围ID"></e-tables-columns>
    <e-tables-columns prop="scopename" label="范围名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品标识号"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="marketing:ydfjgljyfw:select" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="marketing:ydfjgljyfw:select" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="ydfjgljyfwDialog" :status="ydfjgljyfwStatus" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="ydfjgljyfwDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-hov :span="12" label="公司ID" prop="companyid" id="companyid" v-model="ydfjgljyfwDtlForm.companyid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="companyname" label="公司名称" :value="ydfjgljyfwDtlForm.companyname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="城市ID" prop="cityid" id="cityid" v-model="ydfjgljyfwDtlForm.cityid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="cityname" label="城市名称" v-model="ydfjgljyfwDtlForm.cityname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="分类ID" prop="qualitytypeid" id="qualitytypeid" v-model="ydfjgljyfwDtlForm.qualitytypeid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="qualitytypename" label="分类名称" v-model="ydfjgljyfwDtlForm.qualitytypename" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="范围ID" prop="qualityScopeId" id="qualityScopeId" v-model="ydfjgljyfwDtlForm.qualityScopeId" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="scopeName" label="范围名称" v-model="ydfjgljyfwDtlForm.scopeName" :disabled="true"></el-form-col-item-input>

      <el-form-col-item-hov :span="12" label="货品标识号" prop="goodsid" id="goodsid" v-model="ydfjgljyfwDtlForm.goodsid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="goodsname" label="品名" v-model="ydfjgljyfwDtlForm.goodsname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="goodsType" label="规格" v-model="ydfjgljyfwDtlForm.goodsType" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="goodsUnit" label="单位" v-model="ydfjgljyfwDtlForm.goodsUnit" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="prodarea" label="产地" v-model="ydfjgljyfwDtlForm.prodarea" :disabled="true"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="ydfjgljyfwHovVisible" :hov-data="ydfjgljyfwHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/quality/ydfjgljyfw.js"></script>
