<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="sythsqcxQueryForm" :inline="true">
        <el-form-item style="float: left">
          <el-date-picker type="datetime" v-model="sythsqcxQueryForm.startdate"></el-date-picker>
          <el-date-picker type="datetime" v-model="sythsqcxQueryForm.endofdate"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="goodsid" label="货品ID" id="goodsid" v-model="sythsqcxQueryForm.goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="counterid" label="门店ID" id="counterid" v-model="sythsqcxQueryForm.counterid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:sythsqcx:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:sythsqcx:select" @click="download"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="sythsqcxTableData"
    :table-height="sythsqcxTableHeight"
    :pageNum="sythsqcxPageNum"
    :pageSize="sythsqcxPageSize"
    :total="sythsqcxTotal"
    :loading="sythsqcxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="id" label="申请单ID"></e-tables-columns>
    <e-tables-columns prop="backwhyid" label="退货原因ID"></e-tables-columns>
    <e-tables-columns prop="ddlname" label="退货原因"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="日期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="doflag" label="执行标志"></e-tables-columns>
    <e-tables-columns prop="errmsg" label="异常信息"></e-tables-columns>
    <e-tables-columns prop="subackdocid" label="退货通知单ID"></e-tables-columns>
    <e-tables-columns prop="zdoutbatchid" label="执行外部批次"></e-tables-columns>
    <e-tables-columns prop="stcompanyid" label="保管单位ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="保管单位"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
    <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
    <e-tables-columns prop="outbatchid" label="外部批次"></e-tables-columns>
    <e-tables-columns prop="inbatchid" label="内部批次"></e-tables-columns>
    <e-tables-columns prop="goodsstatusid" label="货品状态"></e-tables-columns>
    <e-tables-columns prop="remqty" label="结余数量"></e-tables-columns>
    <e-tables-columns prop="employeename" label="申请人"></e-tables-columns>
    <e-tables-columns prop="auditlevel" label="审核级别"></e-tables-columns>
  </e-tables>
  <hov-tools v-if="sythsqcxHovVisible" :hov-data="sythsqcxHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/area/sythsqcx.js"></script>
