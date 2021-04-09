<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="dqndthsqQueryForm" :inline="true">
        <el-form-item prop="bcaldate" label="开始日期">
          <el-date-picker type="datetime" v-model="dqndthsqQueryForm.bcaldate"></el-date-picker>
        </el-form-item>
        <el-form-item prop="ealdate" label="结束日期">
          <el-date-picker type="datetime" v-model="dqndthsqQueryForm.ealdate"></el-date-picker>
        </el-form-item>
        <el-form-item-select prop="doflag" label="单据状态" v-model="dqndthsqQueryForm.doflag" :options="dqndthsqStatusOptions"></el-form-item-select>
        <el-form-item-input prop="id" label="申请单ID(逗号间隔)" v-model="dqndthsqQueryForm.id"></el-form-item-input>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="dqndthsqQueryForm.goodsid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" label="查询" perms="marketing:dqndthsq:select" @click="queryFunction"></kt-button>
        <e-upload perms="marketing:dqndthsq:select" label="Execl导入" :columns="dqndthsqExeclColumns" @execl="execlSave"></e-upload>
        <kt-button type="primary" icon="fa fa-plus" label="批量确认" perms="marketing:dqndthsq:select" @click="updateAll"></kt-button>
        <kt-button type="primary" icon="fa fa-download" label="Exec表格" perms="marketing:dqndthsq:select" @click="download"></kt-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="dqndthsqTableData"
    :table-height="dqndthsqTableHeight"
    :pageNum="dqndthsqPageNum"
    :pageSize="dqndthsqPageSize"
    :total="dqndthsqTotal"
    :loading="dqndthsqLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
    @selectChange="selectChange"
  >
    <el-table-column type="selection"></el-table-column>
    <e-tables-columns prop="id" label="申请ID"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="申请日期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="trcompanyid" label="货品退入公司ID"></e-tables-columns>
    <e-tables-columns prop="stcompanyid" label="门店ID"></e-tables-columns>
    <e-tables-columns prop="stcompanyname" label="门店名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
    <e-tables-columns prop="invaliddate" label="效期"></e-tables-columns>
    <e-tables-columns prop="remqty" label="数量"></e-tables-columns>
    <e-tables-columns prop="doflag" label="处理状态"></e-tables-columns>
    <e-tables-columns prop="stcompanyid" label="退回公司ID"></e-tables-columns>
    <e-tables-columns prop="subackid" label="退货通知ID"></e-tables-columns>
    <e-tables-columns prop="errmsg" label="异常说明"></e-tables-columns>
    <e-tables-columns prop="proreason" label="申请原因"></e-tables-columns>
    <e-tables-columns prop="appopinion" label="审批意见"></e-tables-columns>
    <e-tables-columns prop="appopinions" label="审批时间"></e-tables-columns>
    <e-tables-columns prop="auditlevel" label="申请类型"></e-tables-columns>
  </e-tables>
  <hov-tools v-if="dqndthsqHovVisible" :hov-data="dqndthsqHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/area/dqmdthsq.js"></script>
