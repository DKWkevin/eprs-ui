<template>
<div>
  <!--查询条件-->
  <e-query
    ref="query"
    :formList="formList"
    :formData="formData"
    :btnOptions="btnOptions"
    @openHov="queryHov"
    @query="handleQuery"
  ></e-query>
  <!--总单table-->
  <e-table
    ref="doctable"
    :tableColumns="tableColumns"
    :tableHeight="tableHeight"
    :border="tableBorder"
    :tableData="tableData"
    @currentChange="handlePageChange"
    @sizeChange="handlePageChange"
  ></e-table>
  <!--新增表单-->
  <ysk-add
    ref="dialog"
    v-if="addVisible"
    :formData="dialogData"
    @submitForm="submitForm"
    @closeDialog="closeDialog"
    @openHov="dialogHov"
  ></ysk-add>
  <hov-tools ref="queryCustom" v-if="queryCustomVisible" :hovData="customHov"></hov-tools>
  <hov-tools ref="dialogCustom" v-if="dialogCustomVisible" :hovData="dialogCustomHov"></hov-tools>
  <hov-tools ref="dialogSettlemode"v-if="dialogSettlemodeVisible" :hovData="dialogSettlemodeHov"></hov-tools>
  <hov-tools ref="dialogBank" v-if="dialogBankVisible" :hovData="dialogBankHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/financial/ysk.js"></script>
