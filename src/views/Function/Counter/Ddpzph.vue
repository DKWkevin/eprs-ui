<template>
<div>
  <e-querys>
    <template v-slot:query>
      <el-form :model="ddpzphQueryFrom" label-width="70px" label-position="right">
        <el-form-item-hov v-model="ddpzphQueryFrom.mdid" prop="mdid" label="门店ID" id="mdid" :btnDisabled="btnDisabled" :disabled="mdidDisabled" @openHov="queryHov"></el-form-item-hov>
        <el-form-item-hov v-model="ddpzphQueryFrom.goodsid" prop="goodsid" label="货品ID" id="goodsid" @openHov="queryHov"></el-form-item-hov>
        <el-form-item-select v-model="ddpzphQueryFrom.fpzt" prop="fpzt" label="分配状态" :options="ddpzphFpztOptions"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <kt-button type="primary" icon="fa fa-search" label="查询" perms="counter:ddpzqh:select" @click="selectFunction"></kt-button>
      <kt-button type="primary" icon="fa fa-plus" label="新增" perms="counter:ddpzqh:insert" @click="insertOpen"></kt-button>
    </template>
  </e-querys>
  <e-tables
    :table-data="ddpzphTableData"
    :page-num="ddpzphPageNum"
    :page-size="ddpzphPageSize"
    :total="ddpzphTotal"
    :table-height="ddpzphTableHeight"
    :loading="ddpzphLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="reqdocid" label="请货总单"></e-tables-columns>
    <e-tables-columns prop="reqdtlid" label="请货细单"></e-tables-columns>
    <e-tables-columns-date-time prop="credate" label="日期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="mdid" label="门店ID"></e-tables-columns>
    <e-tables-columns prop="Companyname" label="门店名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
    <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
    <e-tables-columns prop="fpsl" label="分配数量"></e-tables-columns>
    <e-tables-columns prop="fpzt" label="分配状态"></e-tables-columns>
    <e-tables-columns prop="employeename" label="录入人"></e-tables-columns>
    <e-tables-columns-date-time prop="fprq" label="分配日期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="salesid" label="销售单号"></e-tables-columns>
    <e-tables-columns prop="usestatus" label="单据状态"></e-tables-columns>
    <e-tables-columns prop="sourcetable" label="单据类型"></e-tables-columns>
    <e-tables-columns prop="invalidmanname" label="作废人"></e-tables-columns>
    <e-tables-columns-date-time prop="invalidday" label="作废日期" width="150"></e-tables-columns-date-time>
    <e-tables-columns prop="orderdtlid" label="采购订ID"></e-tables-columns>
    <el-table-column prop="caozuo" label="操作" fixed="right" width="180">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" label="作废细单" perms="counter:ddpzqh:invoid" @click="ddpzphInvoid(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-edit" label="确认细单" perms="counter:ddpzqh:confirm" @click="ddpzphConfirm(scope.row)"></kt-button>
        <kt-button type="primary" icon="fa fa-edit" label="提前生成销售" perms="counter:ddpzqh:createsadoc" @click="ddpzphCreate(scope.row)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs :status="ddpzphInsertVisible" :dialog-width="ddpzphDialogWidth" :dialog-height="ddpzphDialogHeight" @dialogClose="closeInsert">
    <el-form label-width="0" class="ddpzphForm">
      <el-form-item>
        <el-form :model="ddpzphQueryDocFrom" :inline="true" label-width="80px;" label-position="right">
          <el-form-item-hov v-show="emplevels === 2" prop="mdid" label="门店ID" id="mdid" v-model="ddpzphQueryDocFrom.mdid" hovWidth="120px"  @openHov="queryDocHov"></el-form-item-hov>
          <el-form-item-hov prop="goodsid" label="货品ID" id="goodsid" v-model="ddpzphQueryDocFrom.goodsid" hovWidth="120px"></el-form-item-hov>
          <el-form-item-input prop="goodsopcode" label="货品操作码" v-model="ddpzphQueryDocFrom.goodsopcode" inputWidth="120px"></el-form-item-input>
          <el-form-item-input prop="prodarea" label="货品产地" v-model="ddpzphQueryDocFrom.prodarea"></el-form-item-input>
          <el-form-item>
            <el-button type="primary" icon="fa fa-search" @click="selectInsertDoc">查询</el-button>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="ddpzphTableDocData"
          :stripe="true"
          :header-cell-style="headerStyle"
          :height="200"
          @row-click="cellDocClick"
          border
        >
          <el-table-column prop="goodsid" label="货品ID" width="80px"></el-table-column>
          <el-table-column prop="goodsname" label="品名"></el-table-column>
          <el-table-column prop="goodstype" label="规格"  width="120px"></el-table-column>
          <el-table-column prop="prodarea" label="产地"></el-table-column>
          <el-table-column prop="price" label="配送价" width="80px"></el-table-column>
          <el-table-column prop="remqty" label="库存" width="80px"></el-table-column>
          <el-table-column prop="zb" label="中包" width="80px"></el-table-column>
          <el-table-column prop="db" label="大包" width="80px"></el-table-column>
          <el-table-column prop="memo" label="备注" width="80px"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="ddpzphTableDtlData"
          :stripe="true"
          :header-cell-style="headerStyle"
          :height="200"
          border
        >
          <el-table-column prop="goodsid" label="货品ID"></el-table-column>
          <el-table-column prop="lotno" label="批号"></el-table-column>
          <el-table-column prop="invaliddate" label="失效期"></el-table-column>
          <el-table-column prop="lotnoremqty" label="数量"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <div>
          <el-form :inline="true" style="float: left;margin-bottom: 10px;">
            <el-form-item label="门店库存">
              <el-input v-model="mdremqty" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="门店零售价">
              <el-input v-model="mdrealprice" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="请货数量">
              <el-input v-model="insertDoc.goodsqty" @keyup.native="goodsqtyFormat"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="clear: both"  v-if="psfsStatus">
          <el-form :inline="true" style="float: left;margin-bottom: 10px;">
            <el-form-item label="配送方式">
              <el-select v-model="psfs" @change="selectAddress">
                <el-option :value="1" label="跟随物流配送车"></el-option>
                <el-option :value="2" label="快运"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配送地址" v-if="psfs === 2">
              <el-input v-model="address" disabled="disabled" style="width:150px;"></el-input>
              <el-button type="primary" @click="openPsdz">修改</el-button>
            </el-form-item>
            <el-form-item label="电话" v-if="psfs === 2">
              <el-input v-model="phone" disabled="disabled"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="ddpzphInsert">确定</el-button>
        <el-button type="info" @click="closeInsert">关闭</el-button>
      </el-form-item>
    </el-form>
  </e-dialogs>
  <e-dialogs :status="ddpzphPsdzVisible" @dialogClose="closePsdz">
    <el-form :model="ddpzphPsdzForm" label-width="80px">
      <el-form-item label="门店id">
        <el-input v-model="ddpzphPsdzForm.mdid" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="ddpzphPsdzForm.address"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="ddpzphPsdzForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="insertPsdz">保存</el-button>
        <el-button type="info" @click="closePsdz">关闭</el-button>
      </el-form-item>
    </el-form>
  </e-dialogs>
  <hov-tools v-if="ddpzphHovVisible" :hov-data="ddpzphHovData"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/counter/ddpzph.js"></script>
<style scoped>
  .ddpzphForm .el-form-item{margin-bottom:2px;}
</style>
