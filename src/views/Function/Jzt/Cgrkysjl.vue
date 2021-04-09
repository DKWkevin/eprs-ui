<!--    采购入库验收记录 cgrkysjl  -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="cgrkysjl_formList"
      :form-data="cgrkysjl_formData"
      :btn-options="cgrkysjl_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="cgrkysjl_tableColumns"
      :table-data="cgrkysjl_tableData"
      :table-height="cgrkysjl_tableHeight"
      :table-width-status="false"
      :loading="cgrkysjl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="cgrkysjl_goodsVisible"
      :hov-data="cgrkysjl_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="cgrkysjl_companyVisible"
      :hov-data="cgrkysjl_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/cgrkysjl.js"></script>
