<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :inline="true">
        <el-form-item style="float: left" label="日期">
          <el-date-picker type="datetimerange" v-model="formData.querydate"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="mdid" label="门店ID" v-model="formData.mdid" hov-form-width="200px" hov-width="100px" @openHov="openHov('mdid')"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="formData.goodsid" hov-form-width="200px" hov-width="100px" @openHov="openHov('goodsid')"></el-form-item-hov>
        <el-form-item-hov prop="employeeid" label="录入人ID" v-model="formData.employeeid" hov-form-width="200px" hov-width="100px" @openHov="openHov('employeeid')"></el-form-item-hov>
        <el-form-item-hov prop="cityid" label="地区ID" v-model="formData.cityid" hov-form-width="200px" hov-width="100px" @openHov="openHov('cityid')"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <kt-button  type="primary" icon="fa fa-search" :label="$t('action.search')" perms="ordermanagement:fh:select" style="float: left" @click="queryFunction('query')"></kt-button>
      <kt-button  type="primary" icon="fa fa-download" :label="$t('action.download')" perms="ordermanagement:fh:select" style="float: left" @click="queryFunction('download')"></kt-button>
      <kt-button  type="primary" icon="fa fa-delete" :label="$t('action.deletebatch')" perms="ordermanagement:fh:invoid" style="float: left" @click="queryFunction('delAll')"></kt-button>
      <e-upload :columns="fhExeclColumns" label="导入" perms="ordermanagement:fh:insert" @execl="execlSave"></e-upload>
      <kt-button  type="primary" icon="fa fa-download" label="导入模板下载" perms="ordermanagement:fh:select" style="float: left" @click="queryFunction('downloadMb')"></kt-button>
      <kt-button  type="primary" icon="fa fa-upload" label="订单库存分配" perms="ordermanagement:fh:ddzkc" style="float: left" @click="queryFunction('ddkcfp')"></kt-button>
    </template>
  </e-query-collapse>
  <e-tables
    ref="doctable"
    :table-data="docTableData"
    :table-height="docTableHeight"
    :loading="loading"
    :pageNum="fhPageNum"
    :pageSize="fhPageSize"
    :total="fhTotal"
    @currentChange="handleChange"
    @sizeChange="handleChange"
    @selectionChange="selectionChange"
  >
    <el-table-column type="selection" :selectable="checkbox"></el-table-column>
    <e-tables-columns-date-time prop='credate' label='发生日期' width="150"></e-tables-columns-date-time>
    <e-tables-columns prop='mdid' label='门店ID'></e-tables-columns>
    <e-tables-columns prop='companyname' label='门店名称'></e-tables-columns>
    <e-tables-columns prop='goodsid' label='货品ID'></e-tables-columns>
    <e-tables-columns prop='goodsname' label='产品名称'></e-tables-columns>
    <e-tables-columns prop='goodstype' label='规格'></e-tables-columns>
    <e-tables-columns prop='goodsunit' label='单位'></e-tables-columns>
    <e-tables-columns prop='prodarea' label='产地'></e-tables-columns>
    <e-tables-columns prop='goodsqty' label='数量'></e-tables-columns>
    <e-tables-columns prop='unitprice' label='单价'></e-tables-columns>
    <el-table-column prop='fpzt' label='分配状态'>
      <template slot-scope="scope">
        <div v-if="scope.row.fpzt === 0">未分配</div>
        <div v-if="scope.row.fpzt === 1">已分配</div>
        <div v-if="scope.row.fpzt === 2">已作废</div>
      </template>
    </el-table-column>
    <e-tables-columns prop='fpsl' label='分配数量'></e-tables-columns>
    <e-tables-columns-date-time prop='fprq' label='分配日期' width="150"></e-tables-columns-date-time>
    <e-tables-columns prop='reqdocid' label='销售单号'></e-tables-columns>
    <e-tables-columns-date-time prop='ecredate' label='销售日期' width="150"></e-tables-columns-date-time>
    <e-tables-columns prop='employeename' label='录入人'></e-tables-columns>
    <e-tables-columns prop='sourcetablename' label='订单类型'></e-tables-columns>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <kt-button v-if="(scope.row.fpzt === 2 || scope.row.salesid !== 0)" type="primary" icon="fa fa-nullify" :label="$t('action.nullify')" perms="ordermanagement:fh:invoid" disabled="disable" @click="handleFunction(scope.row)"></kt-button>
        <kt-button v-else type="primary" icon="fa fa-nullify" :label="$t('action.nullify')" perms="ordermanagement:fh:invoid" @click="handleFunction(scope.row)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <hov-tools v-if="hovVisible" :hov-data="hovData"></hov-tools>
</div>
</template>
<!--分货-->
<script lang="js" src="../../../js/ordermarnagement/fh.js"></script>
