<template>
<div>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           @openHov="openHov"
           @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="docTableColumns"
    :table-data="docTableData"
    :table-height="docTableHeight"
    :loading="loading"
    @handle="handleFunction"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <el-dialog
    id="dtldialog"
    v-if="dtlVisible"
    :visible="dtlVisible"
    :width="dialogWidth"
    :top="dialogTop"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="dialogClose"
    v-dialog-drag
  >
    <el-table :data="dtlTableData" :height="dtlHieght" border>
      <el-table-column prop="finishflagname" label="完成标志"></el-table-column>
      <el-table-column prop="earlydate" label="最早生产日期" width="110">
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.earlydate"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column prop="goodsid" label="货品ID"></el-table-column>
      <el-table-column prop="goodsname" label="货品名称"></el-table-column>
      <el-table-column prop="goodstype" label="规格"></el-table-column>
      <el-table-column prop="prodarea" label="产地"></el-table-column>
      <el-table-column prop="goodsunit" label="单位" width="40"></el-table-column>
      <el-table-column prop="planqty" label="应订数量" width="60"></el-table-column>
      <el-table-column prop="realqty" label="实订数量"></el-table-column>
      <el-table-column prop="unitprice" label="单价"></el-table-column>
      <el-table-column prop="total_lines" label="金额"></el-table-column>
      <el-table-column prop="sumarriveqty" label="累计到货数量" width="100"></el-table-column>
      <el-table-column prop="arrivaldate" label="到货日期">
        <template slot-scope="scope">
          {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.arrivaldate)}}
        </template>
      </el-table-column>
      <el-table-column prop="orderdtlid" label="细单ID"></el-table-column>
      <el-table-column prop="specialreq" label="特殊质量要求" width="100"></el-table-column>
      <el-table-column prop="baseunitqty" label="包装大小"></el-table-column>
      <el-table-column prop="paymode" label="付款方式"></el-table-column>
      <el-table-column prop="paymodename" label="付款方式"></el-table-column>
      <el-table-column prop="payterm" label="账期"></el-table-column>
      <el-table-column prop="salesmode" label="经销方式"></el-table-column>
      <el-table-column prop="invalidman" label="作废人"></el-table-column>
      <el-table-column prop="invalidday" label="作废日期">
        <template slot-scope="scope">
          {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.arrivaldate)}}
        </template>s
      </el-table-column>
      <el-table-column prop="orderid" label="订单ID"></el-table-column>
      <el-table-column prop="channelid" label="渠道ID"></el-table-column>
      <el-table-column prop="taxrate" label="税率"></el-table-column>
      <el-table-column prop="opcode" label="操作码"></el-table-column>
      <el-table-column prop="memo" label="备注" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.memo"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="caozuo" label="操作" fixed="right" width="160">
        <template slot-scope="scope">
          <el-button type="primary" @click="zuofeiDtl(scope.row.orderdtlid)">作废</el-button>
          <el-button type="primary" @click="zhongzhiDtl(scope.row.orderdtlid)">终止</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-form label-position="right" label-width="80px">
        <el-form-item style="float:left;">
          <el-button type="info" @click="dialogClose">取消</el-button>
          <el-button type="primary" @click="insertDtl" v-show="cgddcxzfSaveStatus">保存</el-button>
        </el-form-item>
        <el-form-item style="float:right;" label="金额合计">
          <el-input v-model="total" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
  <hov-tools v-if="inputmanVisible" :hov-data="inputmanHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--采购订单查询/作废-->
<script lang="js" src="../../../js/ordermarnagement/cgddcxzf.js"></script>

<style scoped>
 #dtldialog >>> .el-dialog__body{height:450px;overflow-y: auto;overflow-x: hidden;padding:0 20px;}
 #dtldialog >>> .el-dialog__footer{height:50px}
</style>
