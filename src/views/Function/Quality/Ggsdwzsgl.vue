<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="ggsdwzsgQueryForm" :inline="true">
        <el-form-item-hov prop="companyid" label="公司ID" id="companyid" v-model="ggsdwzsgQueryForm.companyid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="businessid" label="门店ID" id="businessid" v-model="ggsdwzsgQueryForm.businessid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="qualitytypeid" label="门店ID" id="qualitytypeid" v-model="ggsdwzsgQueryForm.qualitytypeid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="cfno" label="编号" v-model="ggsdwzsgQueryForm.cfno"></el-form-item-input>
        <el-form-item-input prop="storeaddress" label="仓库地址" v-model="ggsdwzsgQueryForm.storeaddress"></el-form-item-input>
        <el-form-item-select prop="usestatus" label="单据状态" v-model="ggsdwzsgQueryForm.usestatus" :options="ggsdwzsglUsestatusOptions"></el-form-item-select>
        <el-form-item-select prop="selfflag" label="内外标识" v-model="ggsdwzsgQueryForm.selfflag" :options="ggsdwzsglSelfflagOptions"></el-form-item-select>
        <el-form-item>
          <el-checkbox v-model="ggsdwzsgQueryForm.supplyflag">供应商标志</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ggsdwzsgQueryForm.factoryflag">生产企业标志</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ggsdwzsgQueryForm.customflag">客户标志</el-checkbox>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:ggsdwzsg:select" @click="queryFunction"></kt-button>
        <el-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="marketing:ggsdwzsg:select" @click="addOpen"></el-button>
      <!--  <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="marketing:ggsdwzsg:select" @click="addOpen"></kt-button>-->
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:ggsdwzsg:select" @click="download"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="ggsdwzsgTableData"
    :table-width-status="false"
    :table-height="ggsdwzsgTableHeight"
    :pageNum="ggsdwzsgPageNum"
    :pageSize="ggsdwzsgPageSize"
    :total="ggsdwzsgTotal"
    :loading="ggsdwzsgLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="businessid" label="单位ID"></e-tables-columns>
    <e-tables-columns prop="businessname" label="单位名称"></e-tables-columns>
    <e-tables-columns prop="qualitytypeid" label="证书类型"></e-tables-columns>
    <e-tables-columns prop="qualitytypename" label="证书类型名称"></e-tables-columns>
    <e-tables-columns prop="cfname" label="名称"></e-tables-columns>
    <e-tables-columns prop="cfno" label="编号"></e-tables-columns>
    <e-tables-columns-date-time prop="cfdate" label="发证日期"></e-tables-columns-date-time>
    <e-tables-columns-date-time prop="invalidedate" label="失效日期"></e-tables-columns-date-time>
    <e-tables-columns prop="cfcompany" label="发证机关"></e-tables-columns>
    <e-tables-columns prop="regaddress" label="注册地址"></e-tables-columns>
    <e-tables-columns prop="factaddress" label="生产地址"></e-tables-columns>
    <e-tables-columns prop="storeaddress" label="仓库地址"></e-tables-columns>
    <e-tables-columns prop="usestatusname" label="状态"></e-tables-columns>
    <e-tables-columns prop="memo" label="备注"></e-tables-columns>
    <e-tables-columns prop="cfid" label="证书ID"></e-tables-columns>
    <e-tables-columns prop="companyid" label="公司ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="公司名称"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:ggsdwzsg:select" @click="selectDtl(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="marketing:ggsdwzsg:select" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="marketing:ggsdwzsg:select" @click="delForm(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:ggsdwzsg:select" @click="downloadDtl(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="ggsdwzsgDialog" :status="ggsdwzsgStatus" :dialog-width="1000" :dialog-height="600" @dialogClose="dialogClose">
    <el-form ref="ggsdwzsgForm" ref-name="dtlForm" :model="ggsdwzsgDtlForm" label-width="85px" style="margin-top:10px;" :rules="rules">
      <el-row>
        <el-col :span="6">
          <el-form-item label="公司ID" prop="companyid">
            <el-input v-model="ggsdwzsgDtlForm.companyid" style="width:70%" @openHov="openHov"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('companyid')"></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单位ID" prop="businessid">
            <el-input v-model="ggsdwzsgDtlForm.businessid" style="width:70%" @openHov="openHov"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('businessid')"></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单位名称" prop="businessname">
            <el-input v-model="ggsdwzsgDtlForm.businessname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="证书类型ID" prop="qualitytypeid">
            <el-input v-model="ggsdwzsgDtlForm.qualitytypeid" style="width:70%" @openHov="openHov"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('qualitytypeid')"></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="名称" prop="cfname">
            <el-input v-model="ggsdwzsgDtlForm.cfname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编号" prop="cfno">
            <el-input v-model="ggsdwzsgDtlForm.cfno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发证日期" prop="cfdate">
            <el-input v-model="ggsdwzsgDtlForm.cfdate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发证机关" prop="cfcompany">
            <el-input v-model="ggsdwzsgDtlForm.cfcompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="失效日期" prop="invalidedate">
            <el-input v-model="ggsdwzsgDtlForm.invalidedate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="内外标识" prop="inflag">
            <el-radio-group v-model="ggsdwzsgDtlForm.inflag">
              <el-radio label="内部" :disabled="true">内部</el-radio>
              <el-radio label="外部" :disabled="true">外部</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item>
            <el-checkbox v-model="ggsdwzsgDtlForm.supplierflag" :disabled="true">供应商标志</el-checkbox>
            <el-checkbox v-model="ggsdwzsgDtlForm.companyflag" :disabled="true">生产企业标志</el-checkbox>
            <el-checkbox v-model="ggsdwzsgDtlForm.customerflag" :disabled="true">客户标志</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="clear: both">
          <el-form-item prop="regaddress" label="注册地址">
            <el-input v-model="ggsdwzsgDtlForm.regaddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="factaddress" label="生产地址">
            <el-input v-model="ggsdwzsgDtlForm.factaddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="storeaddress" label="仓库地址">
            <el-input v-model="ggsdwzsgDtlForm.storeaddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="memo" label="备注">
            <el-input v-model="ggsdwzsgDtlForm.memo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <e-tables :table-data="ggsdwzsgTableDataDtl" :table-height="260" :page-status="false">
      <el-table-column type="selection"></el-table-column>
      <e-tables-columns prop="qualitytypeid" label="范围ID"></e-tables-columns>
      <e-tables-columns prop="qualitytypename" label="范围序号"></e-tables-columns>
      <e-tables-columns prop="name" label="名称"></e-tables-columns>
    </e-tables>
    <div>
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <e-dialogs :dialogTitle="ggsdwzsgTableDialogTitle" :status="ggsdwzsgTableStatus" @dialogClose="dialogDtlClose">
    <e-tables :table-data="ggsdwzsgTableDialogData" :loading="ggsdwzsgDtlLoading" :table-height="ggsdwzsgDtlHeight">
      <e-tables-columns prop="qualityscopeid" label="范围ID"></e-tables-columns>
      <e-tables-columns prop="scopeno" label="范围序号"></e-tables-columns>
      <e-tables-columns prop="scopename" label="范围名称"></e-tables-columns>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteXd">删除</el-button>
        </template>
      </el-table-column>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="ggsdwzsgHovVisible" :hov-data="ggsdwzsgHov"></hov-tools>
</div>
</template>
<!---->
<script lang="js" src="../../../js/quality/ggsdwzsgl.js"></script>

