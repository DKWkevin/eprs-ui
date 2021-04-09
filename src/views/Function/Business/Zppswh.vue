<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="zppswhQueryFrom" :inline="true">
        <el-form-item-hov prop="oragoodsid" label="原品ID" id="oragoodsid" v-model="zppswhQueryFrom.oragoodsid" @openHov="openQuery"></el-form-item-hov>
        <el-form-item-hov prop="givegoodsid" label="赠品ID" id="givegoodsid" v-model="zppswhQueryFrom.givegoodsid" @openHov="openQuery"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
     <kt-button type="primary" icon="fa fa-search" label="查询" perms="ordermanagement:distrgivegoods:select" @click="queryFunction"></kt-button>
      <kt-button type="primary" icon="fa fa-plus" label="新增" perms="ordermanagement:distrgivegoods:insert" @click="openinsert"></kt-button>
      <kt-button type="primary" icon="fa fa-search" label="配送日志" perms="ordermanagement:distrgivegoods:select" @click="openDtlTable"></kt-button>
    </template>
  </e-querys>
  <e-tables
    :table-data="zppswhTableData"
    :table-height="zppswhTableHeight"
    :loading="zppswhLoading"
    :page-size="zppswhPageSize"
    :page-num="zppswhPageNum"
    :total="zppswhTotal"
    @currentChange="handlePageChange"
    @sizeChange="handlePageChange"
  >
    <e-tables-columns prop="giveid" label="序号"></e-tables-columns>
    <e-tables-columns prop="oragoodsid" label="原品ID"></e-tables-columns>
    <e-tables-columns prop="oragoodsname" label="原品名称"></e-tables-columns>
    <e-tables-columns prop="oragoodstype" label="原品规格"></e-tables-columns>
    <e-tables-columns prop="oragoodsqty" label="原品数量"></e-tables-columns>
    <e-tables-columns prop="givegoodsid" label="赠品ID"></e-tables-columns>
    <e-tables-columns prop="givegoodsname" label="赠品名称"></e-tables-columns>
    <e-tables-columns prop="givegoodstype" label="赠品规格"></e-tables-columns>
    <e-tables-columns prop="givegoodsqty" label="赠品数量"></e-tables-columns>
    <e-tables-columns prop="employeename" label="录入人"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="录入时间"></e-tables-columns-date-time>
    <e-tables-columns prop="memo" label="备注"></e-tables-columns>
    <el-table-column prop="usestatus" label="状态">
      <template slot-scope="scope">
        <span v-if="scope.row.usestatus === 1">正常</span>
        <span v-if="scope.row.usestatus === 0">作废</span>
      </template>
    </el-table-column>
    <el-table-column prop="caozuo" label="操作">
      <template slot-scope="scope">
        <kt-button v-if="scope.row.usestatus === 1" type="primary" icon="fa fa-search" label="作废" perms="ordermanagement:distrgivegoods:update" @click="changeStatus(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs dialog-title="新增" :status="zppswhDialogStatus" @dialogClose="dialogClose">
    <el-form-row :model="zppswhDtlForm" label-width="100px">
      <el-form-col-item-hov :span="12" prop="oragoodsid" label="原品ID" v-model="zppswhDtlForm.oragoodsid" hovWidth="185px" id="oragoodsidFrom" :disabled="true" @openHov="openQuery"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="oragoodsname" label="原品名称" v-model="zppswhDtlForm.oragoodsname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="oragoodstype" label="原品规格" v-model="zppswhDtlForm.oragoodstype" :disabled="true" style="clear: both;"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="oragoodsunit" label="原品单位" v-model="zppswhDtlForm.oragoodsunit" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="oraprodarea" label="原品产地" v-model="zppswhDtlForm.oraprodarea" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="oragoodsqty" label="原品数量" v-model="zppswhDtlForm.oragoodsqty"></el-form-col-item-input>
      <el-form-col-item-hov :span="12" prop="givegoodsid" label="赠品ID" v-model="zppswhDtlForm.givegoodsid" hovWidth="185px" id="givegoodsidFrom" :disabled="true" @openHov="openQuery"></el-form-col-item-hov>
      <el-form-col-item-input :span="12" prop="givegoodsname" label="原品名称" v-model="zppswhDtlForm.givegoodsname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="givegoodstype" label="原品规格" v-model="zppswhDtlForm.givegoodstype" :disabled="true" style="clear: both;"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="givegoodsunit" label="原品单位" v-model="zppswhDtlForm.givegoodsunit" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="giveprodarea" label="原品产地" v-model="zppswhDtlForm.giveprodarea" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="givegoodsqty" label="赠品数量" v-model="zppswhDtlForm.givegoodsqty"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="inputmanname" label="录入人" v-model="zppswhDtlForm.inputmanname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="12" prop="memo" label="备注" v-model="zppswhDtlForm.memo"></el-form-col-item-input>
      <el-col :span="24">
        <el-button type="primary" @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="insertFrom">保存</el-button>
      </el-col>
    </el-form-row>
  </e-dialogs>
  <e-dialogs dialog-title="配送日志" :status="zppswhTableStatus" :dialog-width="1000" @dialogClose="dialogTableClose">
    <div>
      <el-form :model="zppswhQueryTableForm" label-width="100px" :inline="true">
        <el-form-item-hov prop="counterid" label="门店ID" id="counterid" v-model="zppswhQueryTableForm.counterid" @openHov="openQuery"></el-form-item-hov>
        <el-form-item-hov prop="givegoodsid" label="赠品ID" id="tableGivegoodsid" v-model="zppswhQueryTableForm.givegoodsid" @openHov="openQuery"></el-form-item-hov>
        <el-form-item style="float: left">
          <el-button type="primary" @click="selectDtl">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <e-tables :table-data="zppswhDtlTableData" :loading="zppswhDtlLoading" :table-height="350" :page-status="false">
      <e-tables-columns-date-time prop="credate" label="日期" width="150"></e-tables-columns-date-time>
      <e-tables-columns prop="counterid" label="门店ID"></e-tables-columns>
      <e-tables-columns prop="companyname" label="门店名称"></e-tables-columns>
      <e-tables-columns prop="reqdtlid" label="细单ID"></e-tables-columns>
      <e-tables-columns prop="sourcetypeid" label="请货类型"></e-tables-columns>
      <e-tables-columns prop="oragoodsid" label="原品ID"></e-tables-columns>
      <e-tables-columns prop="oragoodsname" label="原品名称"></e-tables-columns>
      <e-tables-columns prop="oragoodstype" label="原品规格"></e-tables-columns>
      <e-tables-columns prop="distrqty" label="原品分配数量"></e-tables-columns>
      <e-tables-columns prop="givegoodsid" label="赠品ID"></e-tables-columns>
      <e-tables-columns prop="givegoodsname" label="赠品名称"></e-tables-columns>
      <e-tables-columns prop="givegoodstype" label="赠品规格"></e-tables-columns>
      <e-tables-columns prop="givegoodsqty" label="赠品分配数量"></e-tables-columns>
      <e-tables-columns prop="memo" label="备注"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="zppswhVisible" :hov-data="zppswhHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/bussiness/zppswh.js"></script>
