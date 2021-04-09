<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="xsdcxQueryForm" :inline="true">
        <el-form-item label="开始日期" style="float:left;width:250px;">
          <el-date-picker type="datetime" v-model="xsdcxQueryForm.startdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" style="float:left;width:250px;">
          <el-date-picker type="datetime" v-model="xsdcxQueryForm.endofdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="customid" label="客户ID" v-model="xsdcxQueryForm.customid" id="customid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="employeeid" label="销售员ID" v-model="xsdcxQueryForm.employeeid" id="employeeid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="salesid" label="销售单ID" v-model="xsdcxQueryForm.salesid"></el-form-item-input>
        <el-form-item-select prop="usestatus" label="状态" v-model="xsdcxQueryForm.usestatus" :options="xsdcxUsestateOptions"></el-form-item-select>
        <el-form-item-select prop="usestatus1sel" label="内外标识" v-model="xsdcxQueryForm.usestatus1sel" :options="xsdcxUsestatus1selOptions"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:xsdcx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:xsdcx:select" @click="download"></kt-button>
        <el-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:xsdcx:select" @click="printDtl"></el-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="xsdcxTableData"
    :table-width-status="false"
    :table-height="xsdcxTableHeight"
    :pageNum="xsdcxPageNum"
    :pageSize="xsdcxPageSize"
    :total="xsdcxTotal"
    :loading="xsdcxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="salesid" label="销售单ID"></e-tables-columns>
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="customname" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="credate" label="日期"></e-tables-columns>
    <e-tables-columns prop="saler" label="销售员"></e-tables-columns>
    <e-tables-columns prop="total" label="金额"></e-tables-columns>
    <e-tables-columns prop="dtllines" label="笔数"></e-tables-columns>
    <e-tables-columns prop="stioflag" label="记账标志"></e-tables-columns>
    <e-tables-columns prop="stiodate" label="记账日期"></e-tables-columns>
    <e-tables-columns prop="usestatusname" label="状态"></e-tables-columns>
    <el-table-column label="物流状态">
      <template slot-scope="scope">
        <el-link type="" @click="selectWl(scope.row)">查看物流状态</el-link>
      </template>
    </el-table-column>
    <e-tables-columns prop="inputman" label="录入人"></e-tables-columns>
    <e-tables-columns prop="salesdept" label="销售部门"></e-tables-columns>
    <e-tables-columns prop="companyid" label="公司ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="公司名称"></e-tables-columns>
    <e-tables-columns prop="sudept" label="进货部门"></e-tables-columns>
    <e-tables-columns prop="paymodename" label="付款方式"></e-tables-columns>
    <e-tables-columns prop="payterm" label="账期"></e-tables-columns>
    <e-tables-columns prop="salesmode" label="经销方式"></e-tables-columns>
    <e-tables-columns prop="selfflagname" label="内销/外销"></e-tables-columns>
    <e-tables-columns prop="memo" label="备注"></e-tables-columns>
    <el-table-column prop="caozuo" fixed="right" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.dtl')" perms="marketing:xsdcx:select" @click="selectDtl(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" :label="$t('action.delete')" perms="marketing:xsdcx:select" @click="printDtl(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-confirm" :label="$t('action.comfirmThis')" perms="marketing:xsdcx:select" @click="confirmDtl(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <div>
    <el-form :inline="true" style="margin-top:15px;">
      <el-form-item label="金额合计">
        <el-input :disabled="true" v-model="xsdcxSumTotal"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <e-dialogs :dialogTitle="xsdcxDialog" :status="xsdcxStatus" @dialogClose="dialogClose">
    <e-tables :table-data="xsdcxDtlForm" :table-height="300" :loading="xsdcxDtlLoading">
      <e-tables-columns v-for="(item,index) in xsdcxDtlColumns" :key="index" :prop="item.prop" :label="item.label"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <xsdcxdy v-if="xsdcxPrintStatus"  :dtl-data="xsdcxDtlData"></xsdcxdy>
  <hov-tools v-if="xsdcxHovVisible" :hov-data="xsdcxHov"></hov-tools>
</div>
</template>
<!--销售单查询-->
<script lang="js" src="../../../js/pfsales/xsdcx.js"></script>
