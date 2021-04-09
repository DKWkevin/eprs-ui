<!--    运输记录查询 ysjlcx  -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="ysjlcx_formList"
      :form-data="ysjlcx_formData"
      :btn-options="ysjlcx_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :page-status="false"
      :table-columns="ysjlcx_tableColumns"
      :table-data="ysjlcx_tableData"
      :table-height="ysjlcx_tableHeight"
      :table-width-status="false"
      :loading="ysjlcx_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="ysjlcx_goodsVisible"
      :hov-data="ysjlcx_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="ysjlcx_companyVisible"
      :hov-data="ysjlcx_companyHov"
    ></hov-tools>

  </div>
</template>
<script lang="js" src="../../../js/jzt/ysjlcx.js"></script>
