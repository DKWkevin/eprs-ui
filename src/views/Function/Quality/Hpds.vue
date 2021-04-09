<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="hpdsQueryForm" :inline="true">
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="hpdsQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="ldlegears" label="怠速档位" v-model="hpdsQueryForm.ldlegears"></el-form-item-input>
        <el-form-item prop="credate" label="录入日期" style="float: left">
          <el-date-picker type="datetime"  v-model="hpdsQueryForm.beginDate" default-time="00:00:00"></el-date-picker>
          <el-date-picker type="datetime"  v-model="hpdsQueryForm.endDate" default-time="23:59:59"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="counterid" label="省公司ID" v-model="hpdsQueryForm.companyid2" id="companyid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="quality:hpds:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="quality:hpds:insert" @click="addOpen"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="hpdsTableData"
    :table-width-status="false"
    :table-height="hpdsTableHeight"
    :pageNum="hpdsPageNum"
    :pageSize="hpdsPageSize"
    :total="hpdsTotal"
    :loading="hpdsLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="货品规格"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="货品产地"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="货品单位"></e-tables-columns>
    <e-tables-columns prop="ldlegears" label="怠速档位"></e-tables-columns>
    <e-tables-columns prop="autoldledown" label="怠速下限"></e-tables-columns>
    <e-tables-columns prop="autoldleup" label="怠速上限"></e-tables-columns>
    <e-tables-columns prop="inputmanid" label="录入人ID"></e-tables-columns>
    <e-tables-columns prop="employeename" label="录入人名称"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="录入日期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="companyid" label="省公司ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="省公司名称" width="150"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" fixed="right" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="quality:hpds:update" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="quality:hpds:delete" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="hpdsDialog" :status="hpdsStatus" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="hpdsDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-hov :span="12" v-if="hpdsDtlStatus === false" label="省公司ID" prop="companyid" id="companyid" :disabled="true" v-model="hpdsDtlForm.companyid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" v-else label="省公司ID" prop="companyid" :disabled="true" v-model="hpdsDtlForm.companyid"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="companyname" label="省公司名称" v-model="hpdsDtlForm.companyname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" v-if="hpdsDtlStatus === false" label="货品ID" prop="goodsid" id="goodsid" :disabled="true" v-model="hpdsDtlForm.goodsid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" v-else label="货品ID" prop="goodsid" :disabled="true" v-model="hpdsDtlForm.goodsid"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="goodsname" label="货品名称" :disabled="true" v-model="hpdsDtlForm.goodsname"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="goodstype" label="货品规格" :disabled="true" v-model="hpdsDtlForm.goodstype"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="prodarea" label="货品产地" :disabled="true" v-model="hpdsDtlForm.prodarea"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="goodsunit" label="货品单位" :disabled="true" v-model="hpdsDtlForm.goodsunit"></el-form-col-item-input>
      <el-form-col-item-input :span="12" v-if="hpdsDtlStatus === true" prop="ldlegears" label="怠速档位" v-model="hpdsDtlForm.ldlegears"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="autoldledown" label="怠速下限" v-model="hpdsDtlForm.autoldledown"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="autoldleup" label="怠速上限" v-model="hpdsDtlForm.autoldleup"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="hpdsHovVisible" :hov-data="hpdsHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/quality/hpds.js"></script>
