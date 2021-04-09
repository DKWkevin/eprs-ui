<template>
<div>
  <e-query ref="query"
  :form-list="formList"
  :form-data="formData"
  :btn-options="btnOptions"
   @openHov="openHov"
   @query="functionQuery"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @currentChange="handleChange"
    @sizeChage="handleChange"
    @selectionChange="selectionChange"
    @hanlde="handleFunction"
  ></e-table>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="inputmanVisible" :hov-data="inputmanHov"></hov-tools>
  <execl-insert v-if="execlVisible" ref="execlInsert" :table-columns="execlColumns" :parentid="execlParentid" @insert="execlInsert"></execl-insert>
  <div>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
       <el-table :data="dtlTableData" :height="dtlTableHeight" border stripe  :header-cell-style="headerStyle" v-loading="dtlLoading">
          <el-table-column prop='goodsid' label='货品ID'></el-table-column>
          <el-table-column prop='goodsname' label='货品名称'></el-table-column>
          <el-table-column prop='goodstype' label='规格'></el-table-column>
          <el-table-column prop='goodsunit' label='单位'></el-table-column>
          <el-table-column prop='prodarea' label='产地'></el-table-column>
          <el-table-column prop='lotno' label='批号'></el-table-column>
          <el-table-column prop='maxgoodsqty' label='最大退货数量'></el-table-column>
          <el-table-column prop='goodsqty' label='通知退货数量'>
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodsqty" @change="closegoodsqty(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop='realgoodsqty' label='实际退货数量'></el-table-column>
          <el-table-column prop='kykc' label='可用库存'></el-table-column>
          <el-table-column prop='unitprice' label='单价'>
            <template slot-scope="scope">
              <el-input v-model="scope.row.unitprice"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop='total' label='金额'></el-table-column>
          <el-table-column prop='salestaxrate' label='税率'></el-table-column>
          <el-table-column prop='goodsstatus' label='货品状态'></el-table-column>
          <el-table-column prop='storename' label='仓储区域'></el-table-column>
          <el-table-column prop='subackdocid' label='总单ID'></el-table-column>
          <el-table-column prop='subackdtlid' label='细单ID'></el-table-column>
          <el-table-column prop='outbatchid' label='外部批次ID'></el-table-column>
          <el-table-column prop='inbatchid' label='内部批次ID'></el-table-column>
          <el-table-column prop='goodsstatusid' label='货品状态ID'></el-table-column>
          <el-table-column prop='storerid' label='仓储区域ID'></el-table-column>
       </el-table>
      <div slot="footer">
        <div style="float:left">
          <el-form>
            <el-table-column label="合计数量">
              <el-input v-model="hjsl" :disabled="true"></el-input>
            </el-table-column>
          </el-form>
        </div>
        <div style="float:right">
          <el-button type="primary" @click="insertForm" v-loading="btnLoading">保存</el-button>
          <el-button type="info" @click="closeDialog">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script lang="js" src="../../../js/returnofgooodsandreserves/thtzd.js"></script>
