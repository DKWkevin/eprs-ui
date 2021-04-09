<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="spjsglQueryForm" :inline="true">
        <el-form-item-input prop="goodsroleid" label="商品角色ID" v-model="spjsglQueryForm.goodsroleid"></el-form-item-input>
        <el-form-item-input prop="companyid" label="单位ID" v-model="spjsglQueryForm.companyid"></el-form-item-input>
        <el-form-item-input prop="goosid" label="货品ID" v-model="spjsglQueryForm.goosid"></el-form-item-input>
        <el-form-item-input prop="roleid" label="角色ID" v-model="spjsglQueryForm.roleid"></el-form-item-input>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="spjsgl:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="spjsgl:insert" @click="addOpen"></kt-button>
      </template>
    </template>
  </e-querys>

  <!--总单表格开始-->
  <e-tables
    :table-data="spjsglTableData"
    :table-width-status="false"
    :table-height="spjsglTableHeight"
    :pageNum="spjsglPageNum"
    :pageSize="spjsglPageSize"
    :total="spjsglTotal"
    :loading="spjsglLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="goodsroleid" label="商品角色ID"></e-tables-columns>
    <e-tables-columns prop="companyid" label="单位ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="单位名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="roleid" label="角色ID"></e-tables-columns>
    <e-tables-columns prop="rolename" label="角色名称"></e-tables-columns>
    <e-tables-columns prop="modifydate" label="修改日期"></e-tables-columns>
    <e-tables-columns prop="roletype" label="角色类型"></e-tables-columns>
    <e-tables-columns prop="roletypename" label="角色类型"></e-tables-columns>
    <el-table-column prop="caozuo" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.updateDoc')" perms="spjsgl:update" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.deleteDoc')" perms="spjsgl:delete" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <!--总单表格结束-->

  <!--总单新增修改开始-->
  <e-dialogs :dialogTitle="spjsglDialog" :status="spjsglStatus" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="spjsglDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-input :span="12" label="商品角色ID" v-if="spjsglDtlStatus === false" prop="goodsroleid" v-model="spjsglDtlForm.goodsroleid" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="分类名称" prop="companyid" v-model="spjsglDtlForm.companyid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" label="单位名称" prop="companyname" v-model="spjsglDtlForm.companyname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="货品" prop="goodsid" v-model="spjsglDtlForm.goodsid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" label="品名" prop="goodsname" v-model="spjsglDtlForm.goodsname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" label="规格" prop="companyid" v-model="spjsglDtlForm.goodstype" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" label="单位" prop="goodsunit" v-model="spjsglDtlForm.goodsunit" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" label="产地" prop="prodarea" v-model="spjsglDtlForm.prodarea" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" label="角色" prop="roleid" v-model="spjsglDtlForm.roleid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" label="角色名称" prop="rolename" v-model="spjsglDtlForm.rolename" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" v-if="spjsglDtlStatus === false" label="修改日期" prop="modifydate" v-model="spjsglDtlForm.modifydate" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-select :span="12" label="角色类型" prop="roletype" v-model="spjsglDtlForm.roletype" :options="roleTypeOptions"></el-form-col-item-select>
    </el-form-row>
    <div>
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <!--总单新增修改结束-->
  <hov-tools v-if="spjsglHovVisible" :hov-data="spjsglHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/quality/spjsgl.js"></script>
