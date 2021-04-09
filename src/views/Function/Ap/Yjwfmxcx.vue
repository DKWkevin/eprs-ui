<template>
<div>
  <e-query :form-list="formList" :form-data="formData" :btn-options="btnOptions" @query="queryFunction" @openHov="openHov"></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="docTableHeight"
    :table-width-status="false"
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/ap/yjwfmxcx.js"></script>,
