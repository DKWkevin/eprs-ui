<template>
<div v-loading="loading" :element-loading-text="loadingText">
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    :label-width-status="labelStatus"
    :labelWidthPx="labelPx"
    @openHov="queryHov"
    @query="handleFunction"
  ></e-query>
  <e-table
    ref="doctable"
  :table-columns="docTableColumns"
  :table-data="docTableData"
  :loading="docLoading"
  :table-height="docTableHeight"
  @selectionChange="selectionChange"
  @handle="handle"
  @currentChange="handleQuery"
  @sizeChange="handleQuery"
  ></e-table>
  <dqtjdqsh-dtl ref="dqtjdqshdtl" v-if="dqtjdqshDtlVisible" :dtltype="dtltype" :docTitle="docTitle" :dtlData="dtlData" :index="dtlIndex" :page="dtlPage"></dqtjdqsh-dtl>
  <dqtjdqsh-execl  v-if="dqtjdqshExeclVisible" :cityid="cityid"></dqtjdqsh-execl>
  <e-dialogs dialog-title="必调品执行异常查询" :status="dqtjdqshBtpzxyccxVisible" :dialog-width="1000" @dialogClose="dqtjdqshBtpzxyccxClose">
    <div>
      <el-button type="primary" @click="downloadBtpzxyccx">导出</el-button>
    </div>
    <e-tables
    :table-data="dqtjdqshBtpzxyccxData"
    :loading="dqtjdqshBtpzxyccxLoading"
    :page-num="dqtjdqshBtpzxyccxPageNum"
    :page-size="dqtjdqshBtpzxyccxPageSize"
    :total="dqtjdqshBtpzxyccxTotal"
    :table-height="350"
    @currentChange="handleBtpzxyccx"
    @sizeChange="handleBtpzxyccx"
    >
      <e-tables-columns-date-time prop="credate" label="导入必调日期" width="150"></e-tables-columns-date-time>
      <e-tables-columns prop="counterid" label="门店ID"></e-tables-columns>
      <e-tables-columns prop="companyname" label="门店名称" width="150"></e-tables-columns>
      <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
      <e-tables-columns prop="goodsname" label="名称" width="150"></e-tables-columns>
      <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
      <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
      <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
      <e-tables-columns prop="inbatchid" label="内部批次"></e-tables-columns>
      <e-tables-columns prop="goodsqty" label="货品数量"></e-tables-columns>
      <e-tables-columns prop="mdstatus" label="门店执行状态" width="120"></e-tables-columns>
      <e-tables-columns prop="cstatus" label="数据中心执行状态" width="120"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="queryGoodsVisible" :hov-data="queryGoodsHov"></hov-tools>
  <hov-tools v-if="queryCounterVisible" :hov-data="queryCounterHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/area/dqtjdqsh.js"></script>
