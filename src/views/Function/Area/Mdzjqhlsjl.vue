<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="mdzjqhlsjlQueryForm" :inline="true">
        <el-form-item label="录入开始日期" style="float: left;width:280px;">
          <el-date-picker type="datetime" v-model="mdzjqhlsjlQueryForm.startdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="录入结束日期" style="float: left;width:280px;">
          <el-date-picker type="datetime" v-model="mdzjqhlsjlQueryForm.endofdate" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="counterid" label="门店ID" v-model="mdzjqhlsjlQueryForm.counterid" hovFormWidth="220px" hovWidth="120px" id="counterid" :disabled="true" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="mdzjqhlsjlQueryForm.goodsid" hovFormWidth="220px" hovWidth="120px" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <!--<kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:mdzjqhlsjl:select" @click="queryFunction"></kt-button>-->
        <el-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:mdzjqhlsjl:select" @click="queryFunction"></el-button>
      </template>
    </template>
  </e-querys>
  <e-tables
    :table-data="mdzjqhlsjlTableData"
    :table-width-status="false"
    :table-height="mdzjqhlsjlTableHeight"
    :pageNum="mdzjqhlsjlPageNum"
    :pageSize="mdzjqhlsjlPageSize"
    :total="mdzjqhlsjlTotal"
    :loading="mdzjqhlsjlLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="id" label="追加ID"></e-tables-columns>
    <e-tables-columns prop="replenishid" label="补货策略ID"></e-tables-columns>
    <e-tables-columns prop="counterid" label="门店ID"></e-tables-columns>
    <e-tables-columns prop="countername" label="门店名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="addqty" label="追加数量"></e-tables-columns>
    <e-tables-columns prop="fpsl" label="分配数量"></e-tables-columns>
    <e-tables-columns prop="inputmanid" label="录入人ID"></e-tables-columns>
    <e-tables-columns prop="inputman" label="录入人名称"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="发生日期"></e-tables-columns-date-time>
    <e-tables-columns-date-time prop="validdate" label="生效日期"></e-tables-columns-date-time>
    <e-tables-columns prop="useatatusname" label="状态"></e-tables-columns>
    <e-tables-columns prop="pret" label="异常信息"></e-tables-columns>
    <e-tables-columns prop="mdreason" label="门店申请理由"></e-tables-columns>
    <e-tables-columns prop="dqflagname" label="地区审核状态"></e-tables-columns>
    <e-tables-columns-date-time prop="dqcheckdate" label="地区审核时间"></e-tables-columns-date-time>
    <e-tables-columns prop="dqcheckmanid" label="地区确认人id"></e-tables-columns>
    <e-tables-columns prop="dqcheckmanname" label="地区确认人名称"></e-tables-columns>
    <e-tables-columns-date-time prop="confirmdate" label="地区确认计划时间"></e-tables-columns-date-time>
    <e-tables-columns prop="zbflagname" label="总部审核状态"></e-tables-columns>
    <e-tables-columns-date-time prop="zbcheckdate" label="总部审核时间"></e-tables-columns-date-time>
  </e-tables>
  <hov-tools v-if="mdzjqhlsjlHovVisible" :hov-data="mdzjqhlsjlHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/area/mdzjqhlsjl.js"></script>
