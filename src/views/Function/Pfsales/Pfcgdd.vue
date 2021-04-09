<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="pfcgddQueryForm" :inline="true">
        <el-form-item-hov prop="supplyid" label="供应商ID" v-model="pfcgddQueryForm.supplyid" id="supplyid" hov-form-width="200px" hov-width="100px" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="supplyname" label="供应商名称" v-model="pfcgddQueryForm.supplyname" inputWidth="150px"></el-form-item-input>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="pfcgddQueryForm.goodsid" id="goodsid" hov-form-width="200px" hov-width="100px" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-input prop="goodsname" label="货品名称" v-model="pfcgddQueryForm.goodsname" inputWidth="150px"></el-form-item-input>
        <el-form-item-select prop="pcdtpeid" label="采购部门" v-model="pfcgddQueryForm.pcdtpeid" :options="pfcgddPcdtpeidOptions"></el-form-item-select>
        <el-form-item-select prop="lmcompanyid" label="保管单位" v-model="pfcgddQueryForm.lmcompanyid" :options="pfcgddLmcompanyidOptions"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <!--<kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:pfcgdd:select" @click="queryFunction"></kt-button>-->
        <el-button type="primary" icon="fa fa-search" label="查询" perms="marketing:pfcgdd:select" @click="queryFunction">查询</el-button>
        <el-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:pfcgdd:select" @click="sss"></el-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="pfcgddTableData"
    :table-width-status="false"
    :table-height="pfcgddTableHeight"
    :pageNum="pfcgddPageNum"
    :pageSize="pfcgddPageSize"
    :total="pfcgddTotal"
    :loading="pfcgddLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="prioritiesno" label="优先级"></e-tables-columns>
    <e-tables-columns prop="companyopcode" label="供应商操作码"></e-tables-columns>
    <e-tables-columns prop="supplyid" label="供应商ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="供应商名称"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" label="操作">
      <template slot-scope="scope">
       <!-- <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="marketing:pfcgdd:select" @click="updateOpen(scope.row, scope.$index)"></kt-button>-->
        <el-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="marketing:pfcgdd:select" @click="updateOpen(scope.row, scope.$index)"></el-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :dialogTitle="pfcgddDialog" :status="pfcgddStatus" :dialog-width="1000" @dialogClose="dialogClose">
    <el-form v-if="pfcgddDtlStatus === 2" :model="pfcgddDtlForm">
      <el-form-item label="付款方式">
        <el-select v-model="pfcgddDtlForm.paymode">
          <el-option v-for="(item,index) in pfcgddPaymode" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-button type="primary" @click="saveFkfs">提交</el-button>
      </el-form-item>
    </el-form>
    <div v-if="pfcgddDtlStatus === 1">
      <e-tables :table-data="pfcgddDtlData" :page-status="false" :table-height="pfcgddDtlHeight">
        <el-table-column type="selection"></el-table-column>
        <e-tables-columns prop="prioritiesno" label="优先级"></e-tables-columns>
        <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
        <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
        <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
        <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
        <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
        <e-tables-columns prop="baseUnitqty" label="大包"></e-tables-columns>
        <e-tables-columns prop="zydb" label="直营上月调拨"></e-tables-columns>
        <e-tables-columns prop="txdb" label="特许上月调拨"></e-tables-columns>
        <e-tables-columns prop="qqdb" label="前期调拨"></e-tables-columns>
        <e-tables-columns prop="syxl" label="上月销"></e-tables-columns>
        <e-tables-columns prop="qqxl" label="前期销"></e-tables-columns>
        <e-tables-columns prop="dkkc" label="大库库存"></e-tables-columns>
        <e-tables-columns prop="price" label="单价"></e-tables-columns>
        <el-table-column prop="number" label="数量" width="150px">
          <template slot-scope="scope">
            <el-input :ref="'number'+scope.$index" v-model="scope.row.number" @keyup.native="keyDownCom($event,'number', scope.$index)" @blur="closethis('number',scope.$index)"></el-input>
          </template>
        </el-table-column>
        <e-tables-columns prop="htsl" label="有效合同"></e-tables-columns>
        <el-table-column prop="bz" label="备注" width="150px">
          <template slot-scope="scope">
            <el-input :ref="'bz'+scope.$index" v-model="scope.row.bz"  @keyup.native="keyDownCom($event,'bz', scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zxcolumn1" label="说明" width="150px">
          <template slot-scope="scope">
            <el-input :ref="'zxcolumn1'+scope.$index" v-model="scope.row.zxcolumn1" @keyup.native="keyDownCom($event,'zxcolumn1', scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zxcolumn2" label="安全库存" width="150px">
          <template slot-scope="scope">
            <el-input :ref="'zxcolumn2'+scope.$index" v-model="scope.row.zxcolumn2" @keyup.native="keyDownCom($event,'zxcolumn2', scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="lxr" label="联系人" width="150px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.lxr">
              <el-option :value="scope.row.lxr" :label="scope.row.lxrdh"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <e-tables-columns prop="lxrdh" label="电话"></e-tables-columns>
        <e-tables-columns prop="daysales" label="日均销"></e-tables-columns>
        <e-tables-columns prop="useup" label="上限"></e-tables-columns>
        <e-tables-columns prop="usedown" label="下限"></e-tables-columns>
        <e-tables-columns prop="channelid" label="采购渠道ID"></e-tables-columns>
        <e-tables-columns prop="payterm" label="帐期"></e-tables-columns>
        <e-tables-columns prop="lxrhidden" label="联系人隐藏列"></e-tables-columns>
        <e-tables-columns prop="nesstype" label="省级必备"></e-tables-columns>
        <el-table-column prop="specialreq" label="质量特殊要求" width="150px">
          <template slot-scope="scope">
            <el-input :ref="'specialreq'+scope.$index" v-model="scope.row.specialreq"  @keyup.native="keyDownCom($event,'specialreq', scope.$index)"></el-input>
          </template>
        </el-table-column>
      </e-tables>
      <div>
        <el-form :inline="true">
          <el-form-item label="合计金额">
            <el-input disabled="disabled" v-model="dtlTotal"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="info" @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="saveAll">保存</el-button>
      </div>
    </div>
  </e-dialogs>
  <hov-tools v-if="pfcgddHovVisible" :hov-data="pfcgddHov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/pfsales/pfcgdd.js"></script>
