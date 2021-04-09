<!--    库存查询   -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="kccx_formList"
      :form-data="kccx_formData"
      :btn-options="kccx_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="kccx_tableColumns"
      :table-data="kccx_tableData"
      :table-height="kccx_tableHeight"
      :table-width-status="false"
      :loading="kccx_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="kccx_goodsVisible"
      :hov-data="kccx_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="kccx_companyVisible"
      :hov-data="kccx_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/jztkccx.js"></script>
