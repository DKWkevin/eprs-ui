<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="GgshpzlxxglQueryForm" :inline="true">
        <el-form-item-hov prop="goodsid" id="goodsid" label="货品ID" v-model="GgshpzlxxglQueryForm.goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="supplyid" id="supplyid" label="供应商ID" v-model="GgshpzlxxglQueryForm.supplyid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="usestatus" label="状态" v-model="GgshpzlxxglQueryForm.usestatus" :options="GgshpzlxxglUsestatusOptions"></el-form-item-select>
        <el-form-item-select prop="informationclass" label="资料类别" v-model="GgshpzlxxglQueryForm.informationclass" :options="GgshpzlxxglInformationclassOptions"></el-form-item-select>
        <el-form-item-input prop="approveno" label="生产批文号" v-model="GgshpzlxxglQueryForm.approveno"></el-form-item-input>
        <el-form-item-select prop="orderby" label="排序方式" v-model="GgshpzlxxglQueryForm.orderby" :options="GgshpzlxxglOrderbyOptions"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="quality:ggszlxxgl:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="quality:ggszlxxgl:insert" @click="addOpen"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="quality:ggszlxxgl:select" @click="download"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="GgshpzlxxglTableData"
    :table-width-status="false"
    :table-height="GgshpzlxxglTableHeight"
    :pageNum="GgshpzlxxglPageNum"
    :pageSize="GgshpzlxxglPageSize"
    :total="GgshpzlxxglTotal"
    :loading="GgshpzlxxglLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="goodsid" label="货品标识号"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="factid" label="生产企业ID"></e-tables-columns>
    <e-tables-columns prop="factname" label="生产企业"></e-tables-columns>
    <e-tables-columns prop="goodsno" label="编码"></e-tables-columns>
    <e-tables-columns prop="approvedocno" label="档案定位"></e-tables-columns>
    <e-tables-columns prop="packstandardname" label="包装是否合格"></e-tables-columns>
    <e-tables-columns prop="productapprovno" label="产品说明书批件"></e-tables-columns>
    <e-tables-columns prop="approveno" label="生产批文号" width="150"></e-tables-columns>
    <e-tables-columns-date-time prop="approveperiod" label="生产批文效期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="qualitystandardno" label="质量标准编号" width="140"></e-tables-columns>
    <e-tables-columns prop="qualitystandardperiod" label="质量标准效期" width="100"></e-tables-columns>
    <e-tables-columns prop="inspectionno" label="检验报告单编号" width="120"></e-tables-columns>
    <e-tables-columns prop="inspectionperiod" label="检验报告单效期" width="120"></e-tables-columns>
    <e-tables-columns prop="trademark" label="商标"></e-tables-columns>
    <e-tables-columns prop="sampleflagname" label="样品"></e-tables-columns>
    <e-tables-columns prop="commissproduceno" label="药品委托生产批件编号" width="150"></e-tables-columns>
    <e-tables-columns prop="commissproduceperiod" label="药品委托生产批件效期" width="150"></e-tables-columns>
    <!--<e-tables-columns prop="supplyid" label="供应商ID"></e-tables-columns>
    <e-tables-columns prop="supplyname" label="供应商名称" width="150"></e-tables-columns>-->
    <e-tables-columns prop="usestatusname" label="状态"></e-tables-columns>
    <e-tables-columns prop="informationclassname" label="资料类别"></e-tables-columns>
    <e-tables-columns prop="companyid" label="公司标识号"></e-tables-columns>
    <e-tables-columns prop="companyname" label="公司名称" width="150"></e-tables-columns>
    <e-tables-columns prop="forcetypeno" label="国家强制产品认证" width="120"></e-tables-columns>
    <e-tables-columns prop="apparatusno" label="计算器具许可证号" width="120"></e-tables-columns>
    <e-tables-columns prop="apparatusperiod" label="计算器具许可证效期" width="120"></e-tables-columns>
    <e-tables-columns prop="otherperiod" label="其他关键质量信息中效期" width="120"></e-tables-columns>
    <e-tables-columns prop="trademarkno" label="商标注册证号" width="120"></e-tables-columns>
    <e-tables-columns prop="trademarkperiod" label="商标注册证效期" width="120"></e-tables-columns>
    <e-tables-columns prop="barcodeno" label="商品条码证" width="120"></e-tables-columns>
    <e-tables-columns prop="barcodeperiod" label="商品条码效期" width="120"></e-tables-columns>
    <e-tables-columns prop="bailername" label="委托书姓名"></e-tables-columns>
    <e-tables-columns prop="baileridcard" label="委托书身份证"></e-tables-columns>
    <e-tables-columns prop="bailerperiod" label="委托书效期"></e-tables-columns>
    <e-tables-columns prop="specialgoodsno" label="特殊商品卫生许可证号"></e-tables-columns>
    <e-tables-columns prop="specialgoodsperiod" label="特殊商品卫生许可证效期"></e-tables-columns>
    <e-tables-columns prop="patentno" label="专利证书号" width="120"></e-tables-columns>
    <e-tables-columns-date-time prop="patentperiod" label="专利证书效期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="patentpackno" label="专利证书(包装专利)号" width="150"></e-tables-columns>
    <e-tables-columns-date-time prop="patentpackperiod" label="专利证书(包装专利)效期" width="150"></e-tables-columns-date-time>
    <el-table-column prop="caozuo" fixed="right" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="quality:ggszlxxgl:update" @click="updateOpen(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="quality:ggszlxxgl:delete" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="GgshpzlxxglDialog" :status="GgshpzlxxglStatus" :dialog-width="1000" :dialog-height="600" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="GgshpzlxxglDtlForm" label-width="170px" style="margin-top:10px;">
      <el-form-col-item-hov v-if="GgshpzlxxglDtlStatus === false" :span="8" label="货品ID" prop="goodsid" id="goodsid" hov-width="110px" v-model="GgshpzlxxglDtlForm.goodsid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input v-else :span="8" label="货品ID" prop="goodsid" v-model="GgshpzlxxglDtlForm.goodsid" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="品名" prop="goodsid"  v-model="GgshpzlxxglDtlForm.goodsname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="规格" prop="goodsid"  v-model="GgshpzlxxglDtlForm.goodstype" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="单位" prop="goodsunit" v-model="GgshpzlxxglDtlForm.goodsunit" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="编码" prop="goodsno" v-model="GgshpzlxxglDtlForm.goodsno" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="生产企业ID" prop="factid" v-model="GgshpzlxxglDtlForm.factid" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="生产企业" prop="factname" v-model="GgshpzlxxglDtlForm.factname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="8" v-if="GgshpzlxxglDtlStatus === false" label="公司ID" prop="companyid" id="companyid"  hov-width="110px" v-model="GgshpzlxxglDtlForm.companyid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="8" v-else  label="公司ID" prop="companyid" id="companyid" v-model="GgshpzlxxglDtlForm.companyid" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" label="公司名称" prop="companyname" v-model="GgshpzlxxglDtlForm.companyname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" v-if="GgshpzlxxglDtlStatus === true" label="上市公司持有人" prop="zxcolumn4" v-model="GgshpzlxxglDtlForm.zxcolumn4" :disabled="true"></el-form-col-item-input>
      <el-col v-if="GgshpzlxxglDtlStatus === true" :span="16"></el-col>
      <el-form-col-item-input :span="24" label="档案定位" prop="approvedocno" v-model="GgshpzlxxglDtlForm.approvedocno" colWidth="90%"></el-form-col-item-input>
      <el-form-col-item-input :span="24" label="产品说明书批件" prop="productapprovno" v-model="GgshpzlxxglDtlForm.productapprovno" colWidth="90%"></el-form-col-item-input>
      <el-form-col-item-input :span="12" label="生产批文号" prop="approveno" v-model="GgshpzlxxglDtlForm.approveno" :disabled="GgshpzlxxglDtlStatus === true"></el-form-col-item-input>
      <el-col span="12">
        <el-form-item label="生产批文效期" prop="approveperiod" style="float: left">
          <el-date-picker type="datetime" v-model="GgshpzlxxglDtlForm.approveperiod" default-time="23:59:59" style="width:185px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-form-col-item-input :span="12" label="质量标准编号" prop="qualitystandardno" v-model="GgshpzlxxglDtlForm.qualitystandardno"></el-form-col-item-input>
      <el-col span="12">
        <el-form-item label="质量标准效期" prop="qualitystandardperiod" style="float: left">
          <el-date-picker type="datetime" v-model="GgshpzlxxglDtlForm.qualitystandardperiod" default-time="23:59:59" style="width:185px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-form-col-item-input :span="12" label="检验报告单编号" prop="inspectionno" v-model="GgshpzlxxglDtlForm.inspectionno"></el-form-col-item-input>
      <el-col span="12" >
        <el-form-item label="检验报告单效期" prop="inspectionperiod" style="float: left">
          <el-date-picker type="datetime" v-model="GgshpzlxxglDtlForm.inspectionperiod" default-time="23:59:59" style="width:185px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-form-col-item-input :span="12" label="药品委托生产批件编号" prop="commissproduceno" v-model="GgshpzlxxglDtlForm.commissproduceno"></el-form-col-item-input>
      <el-col span="12" >
        <el-form-item label="药品委托生产批件效期" prop="commissproduceperiod" style="float: left">
          <el-date-picker type="datetime" v-model="GgshpzlxxglDtlForm.commissproduceperiod" default-time="23:59:59" style="width:185px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-form-col-item-input :span="12" label="专利证书号" prop="patentno" v-model="GgshpzlxxglDtlForm.patentno"></el-form-col-item-input>
      <el-col span="12" >
        <el-form-item label="专利证书效期" prop="patentperiod" style="float: left">
          <el-date-picker type="datetime" v-model="GgshpzlxxglDtlForm.patentperiod" default-time="23:59:59" style="width:185px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-form-col-item-input :span="12" label="专利证书(包装专利)号" prop="patentpackno" v-model="GgshpzlxxglDtlForm.patentpackno"></el-form-col-item-input>
      <el-col span="12" >
        <el-form-item label="专利证书(包装专利)效期" prop="patentpackperiod" style="float: left">
          <el-date-picker type="datetime" v-model="GgshpzlxxglDtlForm.patentpackperiod" default-time="23:59:59" style="width:185px;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-form-col-item-input :span="8" label="商标" prop="trademark" v-model="GgshpzlxxglDtlForm.trademark"></el-form-col-item-input>
      <el-form-col-item-select :span="8" prop="sampleflag" label="样品" v-model="GgshpzlxxglDtlForm.sampleflag" :options="GgshpzlxxglSampleflagOptions"></el-form-col-item-select>
      <el-form-col-item-select :span="8" prop="packstandard" label="包装是否合格" v-model="GgshpzlxxglDtlForm.packstandard" :options="GgshpzlxxglPackstandardOptions"></el-form-col-item-select>
    </el-form-row>
    <div>
      <el-button type="primary" @click="insertOrUpdate">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="GgshpzlxxglHovVisible" :hov-data="GgshpzlxxglHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/quality/ggshpzlxxgl.js"></script>
