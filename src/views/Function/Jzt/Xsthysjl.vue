<!--    销售退回验收记录 xsthysjl  -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="xsthysjl_formList"
      :form-data="xsthysjl_formData"
      :btn-options="xsthysjl_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="xsthysjl_tableColumns"
      :table-data="xsthysjl_tableData"
      :table-height="xsthysjl_tableHeight"
      :table-width-status="false"
      :loading="xsthysjl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="xsthysjl_goodsVisible"
      :hov-data="xsthysjl_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="xsthysjl_companyVisible"
      :hov-data="xsthysjl_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/xsthysjl.js"></script>
