<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="o2okcsxQueryForm" :inline="true">
        <el-form-item-hov prop="cityid" label="地区ID" v-model="o2okcsxQueryForm.cityid" id="cityid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="商品ID" v-model="o2okcsxQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:o2okcsx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="marketing:o2okcsx:select" @click="addOpen"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:o2okcsx:select" @click="download"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="o2okcsxTableData"
    :table-width-status="false"
    :table-height="o2okcsxTableHeight"
    :pageNum="o2okcsxPageNum"
    :pageSize="o2okcsxPageSize"
    :total="o2okcsxTotal"
    :loading="o2okcsxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="limitqty" label="上限值"></e-tables-columns>
    <e-tables-columns prop="credate" label="录入日期"></e-tables-columns>
    <e-tables-columns prop="inputmanid" label="录入人ID"></e-tables-columns>
    <e-tables-columns prop="employeename" label="录入人"></e-tables-columns>
    <e-tables-columns prop="cityid" label="地区ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="地区名称"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="marketing:o2okcsx:select" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="marketing:o2okcsx:select" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="o2okcsxDialog" :status="o2okcsxStatus" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="o2okcsxDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-hov :span="8" label="门店ID" prop="cityid" id="cityid" v-model="o2okcsxDtlForm.cityid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="8" prop="area" label="面积分类" v-model="o2okcsxDtlForm.area"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="o2okcsxHovVisible" :hov-data="o2okcsxHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/area/o2okcsx.js"></script>
