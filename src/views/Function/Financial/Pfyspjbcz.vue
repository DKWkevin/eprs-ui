<template>
<div>
  <e-query
    ref="query"
    :formList="queryList"
    :formData="formData"
    :labelWidth="labelWidth"
    :btnOptions="btnOptions"
    @query="handleQuery"
    @openHov="queryHov"
  ></e-query>
  <e-table
    ref="doctable"
    :tableColumns="tableColumns"
    :tableHeight="tableHeight"
    :border="tableBorder"
    :tableData="tableData"
    @handle="handleTable"
    @currentChange="handlePageChange"
    @sizeChange="handlePageChange"
  ></e-table>
  <e-dialog
    ref="dialog"
    v-if="dialogVisible"
    :formList="dialogList"
    :formData="dialogData"
    :title="dialogTitle"
    :dialogWidth="dialogWidth"
    :inline="dialogInline"
    :labelWidth="dialogLabelWidth"
    :btnArray="btnArray"
    @submitForm="submitForm"
    @closeDialog="closeDialog"
    @openHov="dialogHov"
  ></e-dialog>
  <pfyspjbcz-execl v-if="execlStatus"></pfyspjbcz-execl>
  <!--查询条件客户hov-->
  <hov-tools ref="queryCustom" v-if="queryCustomVisible" :hovData="customHov"></hov-tools>
  <!--新增客户hov-->
  <hov-tools ref="dialogBank" v-if="bankVisible" :hovData="bankHov"></hov-tools>
  <!--新增客户hov-->
  <hov-tools ref="dialogHk" v-if="hkVisible" :hovData="hkHov"></hov-tools>
  <!--新增客户hov-->
  <hov-tools ref="dialogEmployee" v-if="employeeVisible" :hovData="employeeHov"></hov-tools>
  <!--新增客户hov-->
  <hov-tools ref="dialogBs" v-if="bsVisible" :hovData="bsHov" @updatehov="bsUpdateHov"></hov-tools>

  <hov-tools-db ref="dialogCph" v-if="queryCphVisible" :hovData="queryCphHov" :page-status="queryCphStatus"></hov-tools-db>
  <hov-tools ref="queryBs" v-if="queryBsVisible" :hovData="queryBsHov" @updatehov="bsUpdateHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/financial/pfyspjbcz.js"></script>
