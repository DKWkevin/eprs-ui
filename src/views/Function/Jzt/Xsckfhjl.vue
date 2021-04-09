<!--    销售出库复核记录 xsckfhjl  -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="xsckfhjl_formList"
      :form-data="xsckfhjl_formData"
      :btn-options="xsckfhjl_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="xsckfhjl_tableColumns"
      :table-data="xsckfhjl_tableData"
      :table-height="xsckfhjl_tableHeight"
      :table-width-status="false"
      :loading="xsckfhjl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="xsckfhjl_goodsVisible"
      :hov-data="xsckfhjl_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="xsckfhjl_companyVisible"
      :hov-data="xsckfhjl_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/xsckfhjl.js"></script>
