<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="thgzwhQueryForm" :inline="true" style="width:100%;">
        <el-form-item-hov prop="companyid" label="公司ID" v-model="thgzwhQueryForm.companyid" id="companyid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="supplyid" label="供应商ID" v-model="thgzwhQueryForm.supplyid" id="supplyid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="thgzwhQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="ifsuback" label="是否供应商可退" v-model="thgzwhQueryForm.ifsuback" :options="thgzwhIfSuback"></el-form-item-select>
        <el-form-item-select prop="ifpsback" label="是否破损可退" v-model="thgzwhQueryForm.ifpsback" :options="thgzwhIfpsback"></el-form-item-select>
        <el-form-item-select prop="ifmeback" label="是否门店可退" v-model="thgzwhQueryForm.ifmeback" :options="thgzwhIfmeback"></el-form-item-select>
        <el-form-item-hov prop="hzhbid" label="合作伙伴ID" v-model="thgzwhQueryForm.hzhbid" id="hzhbid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="channelid" label="渠道ID" v-model="thgzwhQueryForm.channelid"></el-form-item-input>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <!--<kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="quality:hpjbxx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="quality:hpjbxx:select" @click="download"></kt-button>
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="quality:hpjbxx:select" @click="updateOpenAll"></kt-button>-->
        <el-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="quality:hpjbxx:select" @click="queryFunction">查询</el-button>
        <el-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="quality:hpjbxx:select" @click="download">下载</el-button>
        <el-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="quality:hpjbxx:select" @click="updateOpenAll">批量修改</el-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="thgzwhTableData"
    :table-width-status="false"
    :table-height="thgzwhTableHeight"
    :pageNum="thgzwhPageNum"
    :pageSize="thgzwhPageSize"
    :total="thgzwhTotal"
    :loading="thgzwhLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="companyid"  label="公司ID"></e-tables-columns>
    <e-tables-columns prop="managername"  label="合作伙伴采购经理"></e-tables-columns>
    <e-tables-columns prop="supplyid"  label="供应商ID"></e-tables-columns>
    <e-tables-columns prop="companyname"  label="供应商名称"></e-tables-columns>
    <e-tables-columns prop="hzhbid"  label="合作伙伴ID"></e-tables-columns>
    <e-tables-columns prop="hzhbname"  label="合作伙伴名称"></e-tables-columns>
    <e-tables-columns prop="goodsid"  label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname"  label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype"  label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit"  label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea"  label="产地"></e-tables-columns>
    <e-tables-columns prop="ifsubackname"  label="是否供应商可退"></e-tables-columns>
    <e-tables-columns prop="ifpsbackname"  label="是否破损可退"></e-tables-columns>
    <e-tables-columns prop="ifmebackname"  label="是否门店可退"></e-tables-columns>
    <e-tables-columns prop="mixinvalid"  label="最小效期"></e-tables-columns>
    <e-tables-columns prop="maxinvalid"  label="最大效期"></e-tables-columns>
    <e-tables-columns prop="memo"  label="备注"></e-tables-columns>
    <e-tables-columns prop="channelid"  label="渠道ID"></e-tables-columns>
    <el-table-column prop="caozuo" fixed="right" width="160" label="操作">
      <template slot-scope="scope">
      <!--  <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="quality:hpjbxx:select" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="quality:hpjbxx:select" @click="delForm(scope.row, scope.$index)"></kt-button>-->
        <el-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="quality:hpjbxx:select" @click="updateOpen(scope.row, scope.$index)">修改</el-button>
        <el-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="quality:hpjbxx:select" @click="delForm(scope.row, scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="thgzwhDialog" :status="thgzwhStatus" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="thgzwhDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-input :span="8" label="公司ID" prop="companyid" v-model="thgzwhDtlForm.companyid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="供应商ID" prop="supplyid" v-model="thgzwhDtlForm.supplyid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="供应商名称" prop="companyname" v-model="thgzwhDtlForm.companyname"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="货品ID" prop="goodsid" v-model="thgzwhDtlForm.goodsid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="品名" prop="goodsname" v-model="thgzwhDtlForm.goodsname"></el-form-col-item-input>
      <el-col :span="8"></el-col>
      <el-form-col-item-select :span="8" prop="ifsuback" label="是否供应商可退" v-model="thgzwhDtlForm.ifsuback" :options="thgzwhIfSuback"></el-form-col-item-select>
      <el-form-col-item-select :span="8" prop="ifpsback" label="是否破损可退" v-model="thgzwhDtlForm.ifpsback" :options="thgzwhIfpsback"></el-form-col-item-select>
      <el-form-col-item-select :span="8" prop="ifmeback" label="是否门店可退" v-model="thgzwhDtlForm.ifmeback" :options="thgzwhIfmeback"></el-form-col-item-select>
      <el-form-col-item-input :span="8" label="最小效期" prop="mixinvalid" v-model="thgzwhDtlForm.mixinvalid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="最大效期" prop="maxinvalid" v-model="thgzwhDtlForm.maxinvalid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="备注" prop="memo" v-model="thgzwhDtlForm.memo"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="updateForm">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <e-dialogs :dialogTitle="thgzwhDialogAll" :status="thgzwhAllStatus" :dialog-width="1000" @dialogClose="dialogCloseAll">
    <el-form-row ref-name="dtlFormAll" :model="thgzwhAllForm"  label-width="110px" style="margin-top:10px;">
      <el-form-col-item-input :span="8" label="公司ID" prop="companyid" v-model="thgzwhAllForm.companyid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="供应商ID" prop="supplyid" v-model="thgzwhAllForm.supplyid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="供应商名称" prop="companyname" v-model="thgzwhAllForm.companyname"></el-form-col-item-input>
      <el-form-col-item-select :span="8" prop="ifsuback" label="是否供应商可退" v-model="thgzwhDtlForm.ifsuback" :options="thgzwhIfSuback"></el-form-col-item-select>
      <el-form-col-item-select :span="8" prop="ifpsback" label="是否破损可退" v-model="thgzwhDtlForm.ifpsback" :options="thgzwhIfpsback"></el-form-col-item-select>
      <el-form-col-item-select :span="8" prop="ifmeback" label="是否门店可退" v-model="thgzwhDtlForm.ifmeback" :options="thgzwhIfmeback"></el-form-col-item-select>
      <el-form-col-item-input :span="8" label="最小效期" prop="mixinvalid" v-model="thgzwhAllForm.mixinvalid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="最大效期" prop="maxinvalid" v-model="thgzwhAllForm.maxinvalid"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="备注" prop="memo" v-model="thgzwhAllForm.memo"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="updateFormAll">提交</el-button>
      <el-button type="info" @click="dialogCloseAll">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="thgzwhHovVisible" :hov-data="thgzwhHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/newproduct/thgzwh.js"></script>
