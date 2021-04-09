<!--    采购退出复核记录 cgtcfhjl  -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="cgtcfhjl_formList"
      :form-data="cgtcfhjl_formData"
      :btn-options="cgtcfhjl_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="cgtcfhjl_tableColumns"
      :table-data="cgtcfhjl_tableData"
      :table-height="cgtcfhjl_tableHeight"
      :table-width-status="false"
      :loading="cgtcfhjl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="cgtcfhjl_goodsVisible"
      :hov-data="cgtcfhjl_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="cgtcfhjl_companyVisible"
      :hov-data="cgtcfhjl_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/cgtcfhjl.js"></script>
