<!-- 预警查询 -->

<template>
  <div>
    <e-query
      ref="query"
      :form-list="yjcxFormList"
      :form-data="yjcxFormData"
      :btn-options="yjcxBtnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="yjcxTableColumns"
      :table-data="yjcxTableData"
      :table-height="350"
      :loading="yjcxLoading"
      :table-width-status="false"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="yjcxCompanyVisible"
      :hov-data="yjcxCompanyHov"
    ></hov-tools>

    <hov-tools
      v-if="yjcxCFVisible"
      :hov-data="yjcxCFHov"
    ></hov-tools>

  </div>
</template>

<script lang="js" src="../../../js/quality/yjcx.js"></script>
