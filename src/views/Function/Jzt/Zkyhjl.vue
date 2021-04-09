<!--    在库养护记录 zkyhjl  -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="zkyhjl_formList"
      :form-data="zkyhjl_formData"
      :btn-options="zkyhjl_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="zkyhjl_tableColumns"
      :table-data="zkyhjl_tableData"
      :table-height="zkyhjl_tableHeight"
      :table-width-status="false"
      :loading="zkyhjl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="zkyhjl_goodsVisible"
      :hov-data="zkyhjl_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="zkyhjl_companyVisible"
      :hov-data="zkyhjl_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/zkyhjl.js"></script>
