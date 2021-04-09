<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="ZlfwglQueryForm" :inline="true">
        <el-form-item-hov prop="qualitytypeid" label="分类ID" v-model="ZlfwglQueryForm.qualitytypeid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="quality:zlfwgl:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="quality:zlfwgl:insert" @click="addOpen"></kt-button>
      </template>
    </template>
  </e-querys>

  <!--总单表格开始-->
  <e-tables
    :table-data="ZlfwglTableData"
    :table-width-status="false"
    :table-height="ZlfwglTableHeight"
    :pageNum="ZlfwglPageNum"
    :pageSize="ZlfwglPageSize"
    :total="ZlfwglTotal"
    :loading="ZlfwglLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="qualitytypeid" width="100" label="分类ID"></e-tables-columns>
    <e-tables-columns prop="qualitytypename" label="分类名称"></e-tables-columns>
    <el-table-column prop="caozuo" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-search" label="查看" perms="quality:zlfwgl:selectDtl" @click="selectDtl(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-edit" label="修改" perms="quality:zlfwgl:update" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" label="新增" perms="quality:zlfwgl:insertDtl" @click="addDtlFormOpen(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" label="删除" perms="quality:zlfwgl:delete" @click="delForm(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" label="删除细单" perms="quality:zlfwgl:deleteAllDtl" @click="delFormAll(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <!--总单表格结束-->

  <!--总单新增修改开始-->
  <e-dialogs :dialogTitle="ZlfwglDialog" :status="ZlfwglStatus" @dialogClose="dialogClose">
    <el-form ref-name="dtlForm" :model="ZlfwglDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-item-input label="分类ID" prop="qualitytypeid" v-model="ZlfwglDtlForm.qualitytypeid" :disabled="ZlfwglDtlStatus === true"></el-form-item-input>
      <el-form-item-input label="分类名称" prop="qualitytypename" v-model="ZlfwglDtlForm.qualitytypename"></el-form-item-input>
    </el-form>
    <div style="clear: both">
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <!--总单新增修改结束-->

  <!--细单表格开始-->
  <e-dialogs :dialogTitle="ZlfwglDialogXdTable" :dialog-width="900" :status="ZlfwglStatusXdTable" @dialogClose="dialogTableClose">
    <e-tables
      :table-data="ZlfwglTableDtlData"
      :table-width-status="false"
      :page-status="false"
      :table-height="ZlfwglTableDtlHeight"
      :loading="ZlfwglDtlLoading"
    >
      <e-tables-columns prop="qualityscopeid" width="80" label="范围ID"></e-tables-columns>
      <e-tables-columns prop="qualitytypeid"  width="80" label="分类ID"></e-tables-columns>
      <e-tables-columns prop="scopeno"  width="80" label="范围序号"></e-tables-columns>
      <e-tables-columns prop="scopename"  width="300" label="范围名称"></e-tables-columns>
      <el-table-column prop="caozuo" label="操作">
        <template slot-scope="scope">
          <kt-button type="primary" icon="fa fa-edit" label="修改" perms="quality:zlfwgl:updateDtl" @click="updateDtlOpen(scope.row, scope.$index)"></kt-button>
          <kt-button type="primary" icon="fa fa-delete" label="删除" perms="quality:zlfwgl:deleteDtl" @click="delDtlForm(scope.row, scope.$index)"></kt-button>
        </template>
      </el-table-column>
    </e-tables>
  </e-dialogs>
  <!--细单表格结束-->

  <!--细单新增修改开始-->
  <e-dialogs :dialogTitle="ZlfwglDialogXd" :status="ZlfwglStatusXd" @dialogClose="dialogDtlClose">
    <el-form ref-name="dtlForm" :model="ZlfwglXdForm" label-width="100px" style="margin-top:10px;">
      <el-form-item-input label="范围ID" prop="qualityscopeid" v-if="ZlfwglStatusXdDtl === true" :disabled="true" v-model="ZlfwglXdForm.qualityscopeid"></el-form-item-input>
      <el-form-item-input label="分类ID" prop="qualitytypeid" v-model="ZlfwglXdForm.qualitytypeid" :disabled="true"></el-form-item-input>
      <el-form-item-input label="范围序号" prop="scopeno" v-model="ZlfwglXdForm.scopeno"></el-form-item-input>
      <el-form-item-input label="范围名称" prop="scopename" v-model="ZlfwglXdForm.scopename"></el-form-item-input>
    </el-form>
    <div style="clear: both">
      <el-button type="primary" @click="insertOrUpdateDtl">提交</el-button>
      <el-button type="info" @click="dialogDtlClose">取消</el-button>
    </div>
  </e-dialogs>
  <!--细单新增修改结束-->
  <hov-tools v-if="ZlfwglHovVisible" :hov-data="ZlfwglHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/quality/zlfwgl.js"></script>
