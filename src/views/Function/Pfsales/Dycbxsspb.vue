<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="dycbxsspbQueryForm" :inline="true">
        <el-form-item-hov prop="customid" label="客户ID" v-model="dycbxsspbQueryForm.customid" id="customid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="dycbxsspbQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="salerid" label="业务员ID" v-model="dycbxsspbQueryForm.salerid" id="salerid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:dycbxsspb:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="marketing:dycbxsspb:select" @click="addOpen"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="dycbxsspbTableData"
    :table-width-status="false"
    :table-height="dycbxsspbTableHeight"
    :pageNum="dycbxsspbPageNum"
    :pageSize="dycbxsspbPageSize"
    :total="dycbxsspbTotal"
    :loading="dycbxsspbLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="id" label="总单ID"></e-tables-columns>
    <e-tables-columns prop="companyid" label="公司ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="公司名称"></e-tables-columns>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="customname" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="salerid" label="业务员ID"></e-tables-columns>
    <e-tables-columns prop="saler" label="业务员名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="货品规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
    <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
    <e-tables-columns prop="totals" label="金额"></e-tables-columns>
    <e-tables-columns prop="flag" label="状态"></e-tables-columns>
    <e-tables-columns prop="credate" label="录入时间"></e-tables-columns>
    <e-tables-columns prop="inputmanid" label="录入人ID"></e-tables-columns>
    <e-tables-columns prop="inputman" label="录入人"></e-tables-columns>
    <e-tables-columns prop="confrimdate" label="确认时间"></e-tables-columns>
    <e-tables-columns prop="confrimmanid" label="确认人ID"></e-tables-columns>
    <e-tables-columns prop="confrimman" label="确认人"></e-tables-columns>
    <e-tables-columns prop="zfdate" label="作废时间"></e-tables-columns>
    <e-tables-columns prop="zfmanid" label="作废人ID"></e-tables-columns>
    <e-tables-columns prop="zfman" label="作废人"></e-tables-columns>
    <e-tables-columns prop="finishdate" label="完成时间"></e-tables-columns>
    <e-tables-columns prop="sourceid" label="销售细单ID"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" fixed="right" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" label="确认" perms="marketing:dycbxsspb:select" @click="confirmDycbxsspb(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" label="作废" perms="marketing:dycbxsspb:select" @click="delForm(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs dialogTitle="新增" :status="dycbxsspbStatus" :dialog-width="900" @dialogClose="dialogClose">
    <el-form-row ref="dtl" ref-name="dtlForm" :model="dycbxsspbDtlForm" label-width="100px" :rules="rules" style="margin-top:10px;">
      <el-form-col-item-hov :span="8" label="公司ID" prop="companyid" id="companyid" v-model="dycbxsspbDtlForm.companyid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="8" prop="companyname" label="公司名称" v-model="dycbxsspbDtlForm.companyname" :disabled="true"></el-form-col-item-input>
      <el-col :span="8">
        <el-form-item></el-form-item>
      </el-col>
      <el-form-col-item-hov :span="8" label="客户ID" prop="customid" id="customid" v-model="dycbxsspbDtlForm.customid" @openHov="openHov" :disabled="true" style="clear:both;"></el-form-col-item-hov>
      <el-form-col-item-input :span="8" prop="customname" label="客户名称" v-model="dycbxsspbDtlForm.customname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="8" label="货品ID" prop="goodsid" id="goodsid" v-model="dycbxsspbDtlForm.goodsid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="8" prop="goodsname" label="货品名称" v-model="dycbxsspbDtlForm.goodsname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="goodstype" label="货品规格" v-model="dycbxsspbDtlForm.goodstype" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="goodsunit" label="单位" v-model="dycbxsspbDtlForm.goodsunit" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="prodarea" label="产地" v-model="dycbxsspbDtlForm.prodarea" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-hov :span="8" label="业务员ID" prop="salerid" id="salerid" v-model="dycbxsspbDtlForm.salerid" :disabled="true" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="8" prop="salername" label="业务员名称" v-model="dycbxsspbDtlForm.salername" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="unitprice" label="单价" v-model="dycbxsspbDtlForm.unitprice" @keyup.native="saleSumPrice"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="goodsqty" label="数量" v-model="dycbxsspbDtlForm.goodsqty" @keyup.native="saleSumGoodsqty"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="totals" label="金额" v-model="dycbxsspbDtlForm.totals" :disabled="true"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="addForm">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="dycbxsspbHovVisible" :hov-data="dycbxsspbHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/pfsales/dycbxsspb.js"></script>
