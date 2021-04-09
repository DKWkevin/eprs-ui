<!--    不合格品台账 bhgptz  -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="bhgptz_formList"
      :form-data="bhgptz_formData"
      :btn-options="bhgptz_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="bhgptz_tableColumns"
      :table-data="bhgptz_tableData"
      :table-height="bhgptz_tableHeight"
      :table-width-status="false"
      :loading="bhgptz_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="bhgptz_goodsVisible"
      :hov-data="bhgptz_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="bhgptz_companyVisible"
      :hov-data="bhgptz_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/bhgptz.js"></script>
