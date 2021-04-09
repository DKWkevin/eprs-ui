<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="dqshmdzjjhQueryForm" :inline="true">
        <el-form-item-hov prop="counterid" label="门店ID" v-model="dqshmdzjjhQueryForm.counterid" id="counterid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="dqshmdzjjhQueryForm.goodsid" id="goodsid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="dqflag" label="审核状态" v-model="dqshmdzjjhQueryForm.dqflag"
        :options="[{value:0,label: '未审核'},{value:1,label:'未通过'},{value:2,label:'已通过'}]"></el-form-item-select>
        <el-form-item-select prop="distunitid" label="配送单元" v-model="dqshmdzjjhQueryForm.distunitid" :options="dqshmdzjjhDistunitidOptions"></el-form-item-select>
        <el-form-item style="float: left;" prop="mdreason" label="门店申请原因">
          <el-select v-model="dqshmdzjjhQueryForm.mdreason">
            <el-option value="顾客订货" label="顾客订货"></el-option>
            <el-option value="促销品" label="促销品"></el-option>
            <el-option value="应季品" label="应季品"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item-select prop="ifzdfkp" label="是否重点付款品" v-model="dqshmdzjjhQueryForm.ifzdfkp"
        :options="[{value:1,label:'是'},{value:2,label:'否'}]"></el-form-item-select>
        <el-form-item-input prop="pret" label="异常信息" v-model="dqshmdzjjhQueryForm.pret"></el-form-item-input>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:dqshmdzjjh:select" @click="queryFunction"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" label="批量审批" perms="marketing:dqshmdzjjh:select" @click="updateallshenpi"></kt-button>
        <kt-button type="primary" icon="fa fa-plus" label="批量确认" perms="marketing:dqshmdzjjh:select" @click="plqr"></kt-button>
        <!--<kt-button type="primary" icon="fa fa-plus" label="新增追加请货" perms="marketing:dqshmdzjjh:select" @click="addadded"></kt-button>-->
        <el-button type="primary" icon="fa fa-plus" label="新增追加请货" perms="marketing:dqshmdzjjh:select" @click="addadded"></el-button>
        <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:dqshmdzjjh:select" @click="download"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <el-table
    v-loading="dqshmdzjjhLoading"
    :data="dqshmdzjjhTableData"
    :height="dqshmdzjjhTableHeight"
    :header-cell-style="headerStyle"
    :row-style="rowStyle"
    @selection-change="selectionChange"
    border
  >
    <el-table-column type="selection"></el-table-column>

    <e-tables-columns prop="companyname" label="门店名称"></e-tables-columns>
    <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
    <e-tables-columns prop="goodsname" label="品名"></e-tables-columns>
    <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
    <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>

    <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
    <e-tables-columns prop="mdkc" label="门店库存"></e-tables-columns>
    <e-tables-columns prop="distrqty" label="请货数量"></e-tables-columns>
    <e-tables-columns prop="addqty" label="追加数量"></e-tables-columns>
    <e-tables-columns prop="fpsl" label="分配数量"></e-tables-columns>

    <e-tables-columns prop="fkfs" label="付款方式"></e-tables-columns>
    <e-tables-columns prop="price" label="最新进价"></e-tables-columns>
    <e-tables-columns prop="mdsyxl" label="门店上月销量"></e-tables-columns>
    <e-tables-columns prop="mdqqxl" label="门店前期销量"></e-tables-columns>
    <e-tables-columns prop="mdyxts" label="门店预销天数"></e-tables-columns>

    <e-tables-columns prop="pret" label="异常原因"></e-tables-columns>
    <e-tables-columns prop="mdsqly" label="门店申请原因"></e-tables-columns>
    <e-tables-columns prop="dqyxts" label="地区预销天数"></e-tables-columns>
    <e-tables-columns prop="dqflag" label="地区审核状态"></e-tables-columns>
    <e-tables-columns prop="dqreason" label="地区审核意见"></e-tables-columns>

    <e-tables-columns prop="dqcheckdate" label="地区审核时间"></e-tables-columns>
    <e-tables-columns prop="id" label="追加计划ID"></e-tables-columns>
    <e-tables-columns prop="counterid" label="门店ID"></e-tables-columns>
    <e-tables-columns prop="zbflag" label="总部审核状态"></e-tables-columns>
    <e-tables-columns prop="zbreason" label="总部审核意见"></e-tables-columns>

    <e-tables-columns prop="zbcheckdate" label="总部审核时间"></e-tables-columns>
    <e-tables-columns prop="confirmdate" label="计划确认时间"></e-tables-columns>
    <e-tables-columns prop="zdfkp" label="是否重点付款品"></e-tables-columns>
    <el-table-column prop="caozuo" width="180" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" label="修改追加数量" perms="marketing:dqshmdzjjh:select" @click="onclickdbclick(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-edit" label="审批" perms="marketing:dqshmdzjjh:select" @click="updatezhuangtaishenpi(scope.row, scope.$index)"></kt-button>
        <kt-button type="primary" icon="fa fa-delete" label="作废" perms="marketing:dqshmdzjjh:select" @click="savezuofeiOpen(scope.row, scope.$index)"></kt-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    small
    background
    :current-page="dqshmdzjjhPageNum"
    :page-size="dqshmdzjjhPageSize"
    :page-sizes='[50,100,300,500,1000]'
    :total="dqshmdzjjhTotal"
    layout="prev,pager,next,sizes,total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    @prev-click="handleCurrentChange"
    @next-click="handleCurrentChange"
  ></el-pagination>
  <e-dialogs :dialogTitle="dqshmdzjjhDialog" :status="dqshmdzjjhStatus" :dialog-width="900" @dialogClose="dialogClose">
    <div v-if="dqshmdzjjhDtlStatus === 0">
      <el-form-row ref="updateDtl" ref-name="dtlForm" :model="dqshmdzjjhDtlForm" label-width="100px" :rules="dqshmdzjjhDtlRules" style="margin-top:10px;">
        <el-form-col-item-hov :span="8" label="门店ID" prop="counterid" id="counterid" v-model="dqshmdzjjhDtlForm.counterid" @openHov="openHov" :disabled="true"></el-form-col-item-hov>
        <el-form-col-item-hov :span="8" label="货品ID" prop="goodsid" id="goodsid" v-model="dqshmdzjjhDtlForm.goodsid" @openHov="openHov" :disabled="true"></el-form-col-item-hov>
        <el-form-col-item-input :span="8" label="品名" prop="goodsname" v-model="dqshmdzjjhDtlForm.goodsname" :disabled="true"></el-form-col-item-input>
        <el-form-col-item-input :span="8" label="规格" prop="goodstype" v-model="dqshmdzjjhDtlForm.goodstype" :disabled="true"></el-form-col-item-input>
        <el-form-col-item-input :span="8" label="单位" prop="goodsunit" v-model="dqshmdzjjhDtlForm.goodsunit" :disabled="true"></el-form-col-item-input>
        <el-form-col-item-input :span="8" label="产地" prop="prodarea" v-model="dqshmdzjjhDtlForm.prodarea" :disabled="true"></el-form-col-item-input>
        <el-form-col-item-input :span="8" label="请货数量" prop="qhsl" v-model="dqshmdzjjhDtlForm.qhsl" :disabled="true"></el-form-col-item-input>
        <el-form-col-item-input :span="8" label="最小请货数量" prop="zxqhl" v-model="dqshmdzjjhDtlForm.zxqhl" :disabled="true"></el-form-col-item-input>
        <el-col :span="8">
          <el-form-item></el-form-item>
        </el-col>
        <el-form-col-item-input :span="8" label="追加数量" prop="addqty" v-model="dqshmdzjjhDtlForm.addqty" style="clear: both;"></el-form-col-item-input>
        <el-col :span="8">
          <el-form-item label="追加理由" prop="mdreason">
            <el-select v-model="dqshmdzjjhDtlForm.mdreason">
              <el-option value="顾客订货" label="顾客订货"></el-option>
              <el-option value="促销品" label="促销品"></el-option>
              <el-option value="应季品" label="应季品"></el-option>
              <el-option value="0" label="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-col-item-input :span="8" label="其他理由" prop="qtmdreason" v-model="dqshmdzjjhDtlForm.qtmdreason" :disabled="true"></el-form-col-item-input>
      </el-form-row>
      <div>
        <el-button type="primary" @click="addForm">提交</el-button>
        <el-button type="info" @click="dialogClose">取消</el-button>
      </div>
    </div>
    <div v-else-if="dqshmdzjjhDtlStatus === 1">
      <el-form :model="dqshmdzjjhXgzjsl" label-width="100px">
        <el-form-item-input label="货品ID">
          <el-input v-model="dqshmdzjjhXgzjsl.goodsid"></el-input>
        </el-form-item-input>
        <el-form-item-input label="追加数量">
          <el-input v-model="dqshmdzjjhXgzjsl.addedaddqty"></el-input>
        </el-form-item-input>
        <el-form-item>
          <el-button type="primary" @click="saveupdateaddedaddqty">提交</el-button>
          <el-button type="info" @click="dialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="dqshmdzjjhDtlStatus === 2">
      <el-form :model="dqshmdzjjhZf" label-width="100px">
        <el-form-item-input label="追加计划ID">
          <el-input v-model="dqshmdzjjhZf.reqdtlid"></el-input>
        </el-form-item-input>
        <el-form-item-input label="审批意见">
          <el-input v-model="dqshmdzjjhZf.dqreason"></el-input>
        </el-form-item-input>
        <el-form-item>
          <el-button type="primary" @click="savezuofei">提交</el-button>
          <el-button type="info" @click="dialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </e-dialogs>
  <hov-tools v-if="dqshmdzjjhHovVisible" :hov-data="dqshmdzjjhHov"></hov-tools>
  <hov-tools v-if="dqshmdzjjhGoodsVisible" :hov-data="dqshmdzjjhGoods" @updatehov="updatehov"></hov-tools>
</div>
</template>

<script lang="js" src="../../../js/area/dqshmdzjjh.js"></script>
