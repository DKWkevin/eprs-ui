<template>
<div v-loading="xsthtzLoading">
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="xsthtzQueryForm" :inline="true">
        <el-form-item-hov prop="reccompanyid" label="收货公司ID" v-model="xsthtzQueryForm.reccompanyid" id="reccompanyid" :disabled="true" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="reccompanyname" label="收货公司名称" v-model="xsthtzQueryForm.reccompanyname" :disabled="true"></el-form-item-input>
        <el-form-item-hov prop="customid" label="客户ID" v-model="xsthtzQueryForm.customid" id="customid" :disabled="true" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="customname" label="客户名称" v-model="xsthtzQueryForm.customname" :disabled="true"></el-form-item-input>
        <el-form-item-select prop="backwhyid" label="退货原因" v-model="xsthtzQueryForm.backwhyid" :options="xsthtzBackwhyidOptions"></el-form-item-select>
        <el-form-item-input prop="deptid" label="保管单位" v-model="xsthtzQueryForm.deptid" :disabled="true"></el-form-item-input>
        <el-form-item-input prop="memo" label="备注" v-model="xsthtzQueryForm.memo"></el-form-item-input>
        <el-form-item-input prop="recdeptid" label="收货部门ID" v-model="xsthtzQueryForm.recdeptid" :disabled="true"></el-form-item-input>
        <el-form-item-input prop="recdeptname" label="收货部门" v-model="xsthtzQueryForm.recdeptname" :disabled="true"></el-form-item-input>
        <el-form-item-input prop="salesmode" label="经销方式" v-model="xsthtzQueryForm.salesmode" :disabled="true"></el-form-item-input>
        <el-form-item-input prop="paymode" label="收款方式" v-model="xsthtzQueryForm.paymode" :disabled="true"></el-form-item-input>
        <el-form-item-input prop="payterm" label="账期" v-model="xsthtzQueryForm.payterm" :disabled="true"></el-form-item-input>
        <el-form-item-input prop="oldsalesid" label="原销售单号" v-model="xsthtzQueryForm.oldsalesid" :disabled="true"></el-form-item-input>
        <el-form-item-input prop="total_line" label="总金额" v-model="xsthtzQueryForm.total_line" :disabled="true"></el-form-item-input>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <!--<kt-button type="primary" :label="$t('action.add')" perms="marketing:xsthtz:select" @click="addOpen"></kt-button>-->
        <el-button type="primary" :label="$t('action.add')" perms="marketing:xsthtz:select" @click="addOpen"></el-button>
        <kt-button type="primary" label="保存" perms="marketing:xsthtz:select" @click="saveAll"></kt-button>
        <kt-button type="primary" label="删除选定行" perms="marketing:xsthtz:select" @click="delForm"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    ref="doctable"
    :table-data="xsthtzTableData"
    :table-width-status="false"
    :table-height="xsthtzTableHeight"
    :page-status="false"
    @selectionChange="selectionChange"
  >
    <el-table-column type="selection" fixed="left"></el-table-column>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
		<e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
		<e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
		<e-tables-columns prop="goodsqty" label="通知退货数量"></e-tables-columns>
    <e-tables-columns prop="realgoodsqty" label="实际退货数量"></e-tables-columns>
		<e-tables-columns prop="maxgoodsqty" label="最大退货数量"></e-tables-columns>
    <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
		<e-tables-columns prop="taxrate" label="税率"></e-tables-columns>
    <e-tables-columns prop="total" label="金额"></e-tables-columns>
		<e-tables-columns prop="outbatchid" label="外部批次"></e-tables-columns>
    <e-tables-columns prop="inbatchid" label="内部批次"></e-tables-columns>
		<e-tables-columns prop="oldsadtlid" label="原销售细单号"></e-tables-columns>
    <e-tables-columns prop="goodsstatusid" label="货品状态ID"></e-tables-columns>
		<e-tables-columns prop="stcompanyid" label="保管单位ID"></e-tables-columns>
  </e-tables>
  <div>
    <el-form :model="xsthtztableSumData" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="金额合计">
            <el-input v-model="xsthtztableSumData.total_line" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="不含税金额">
            <el-input v-model="xsthtztableSumData.buhanshuijine" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税额">
            <el-input v-model="xsthtztableSumData.shuie" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <e-dialogs dialogTitle="新增细单" :status="xsthtzStatus" :dialog-width="1000" @dialogClose="dialogClose">
    <el-form-row ref-name="dtlForm" :model="xsthtzDtlForm" label-width="100px" style="margin-top:10px;">
      <el-form-col-item-hov :span="8" label="货品ID" prop="goodsid" id="goodsid" v-model="xsthtzDtlForm.goodsid" @openHov="openHov"></el-form-col-item-hov>
      <el-form-col-item-input :span="8" prop="goodsname" label="货品名称" v-model="xsthtzDtlForm.goodsname" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="goodstype" label="规格" v-model="xsthtzDtlForm.goodstype" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="prodarea" label="产地" v-model="xsthtzDtlForm.prodarea" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="goodsunit" label="单位" v-model="xsthtzDtlForm.goodsunit" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="goodsqty" label="通知退货数量" v-model="xsthtzDtlForm.goodsqty" @input="selectQty"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="realgoodsqty" label="实际退货数量" v-model="xsthtzDtlForm.realgoodsqty" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="maxgoodsqty" label="最大退货数量" v-model="xsthtzDtlForm.maxgoodsqty" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="unitprice" label="单价" v-model="xsthtzDtlForm.unitprice" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="taxrate" label="税率" v-model="xsthtzDtlForm.taxrate" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="outbatchid" label="外部批次ID" v-model="xsthtzDtlForm.outbatchid" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="total" label="金额" v-model="xsthtzDtlForm.total" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="inbatchid" label="内部批次ID" v-model="xsthtzDtlForm.inbatchid" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="oldsadtlid" label="原销售细单号" v-model="xsthtzDtlForm.oldsadtlid" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="lotno" label="批号" v-model="xsthtzDtlForm.lotno" :disabled="true"></el-form-col-item-input>
      <el-form-col-item-input :span="8" prop="goodsstatusid" label="货品状态ID" v-model="xsthtzDtlForm.goodsstatusid" :disabled="true"></el-form-col-item-input>
    </el-form-row>
    <div>
      <el-button type="primary" @click="savetogridtable">提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </e-dialogs>
  <hov-tools v-if="xsthtzHovVisible" :hov-data="xsthtzHov"></hov-tools>
  <e-dialogs dialog-title="货品查询" :status="xsthtzHovGoodsVisible" :dialog-width="1000" @dialogClose="goodsDialogClose">
    <el-form :model="xsthtzHovGoodsForm" label-width="90px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="销售单ID">
            <el-input v-model="xsthtzHovGoodsForm.salesid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品操作码">
            <el-input v-model="xsthtzHovGoodsForm.opcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品ID">
            <el-input v-model="xsthtzHovGoodsForm.goodsid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品名称">
            <el-input v-model="xsthtzHovGoodsForm.goodsname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" @click="handleFunction">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="xsthtzHovGoodsData"
      v-loading="xsthtzHovGoodsLoading"
      height="320"
      border
      @row-dblclick="cellDBLClickEvent"
    >
      <el-table-column prop="salesid" label="销售单ID"></el-table-column>
      <e-tables-columns-date-time prop="credate" label="日期"></e-tables-columns-date-time>
      <el-table-column prop="goodsid" label="货品ID"></el-table-column>
      <el-table-column prop="goodsname" label="品名"></el-table-column>
      <el-table-column prop="goodstype" label="规格"></el-table-column>
      <el-table-column prop="goodsunit" label="单位"></el-table-column>
      <el-table-column prop="prodarea" label="产地"></el-table-column>
      <el-table-column prop="maxgoodsqty" label="最大退货数量"></el-table-column>
      <el-table-column prop="unitprice" label="单价"></el-table-column>
      <el-table-column prop="total_lines" label="金额"></el-table-column>
      <el-table-column prop="taxrate" label="税率"></el-table-column>
      <el-table-column prop="inbatchid" label="内部批次"></el-table-column>
      <el-table-column prop="outbatchid" label="外部批次"></el-table-column>
      <el-table-column prop="sadtlid" label="销售细单ID"></el-table-column>
      <el-table-column prop="salesmode" label="经销方式"></el-table-column>
      <el-table-column prop="paymode" label="收款方式ID"></el-table-column>
      <el-table-column prop="paymodename" label="收款方式名称"></el-table-column>
      <el-table-column prop="payterm" label="账期"></el-table-column>
      <el-table-column prop="salesdeptid" label="销售部门ID"></el-table-column>
      <el-table-column prop="salesdept" label="销售部门名称"></el-table-column>
      <el-table-column prop="goodsstatusid" label="货品状态ID"></el-table-column>
      <el-table-column prop="stcompanyid" label="保管单位ID"></el-table-column>
    </el-table>
    <el-pagination
      small
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="total"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>
  </e-dialogs>
</div>
</template>

<script lang="js" src="../../../js/pfsales/xsthtz.js"></script>
