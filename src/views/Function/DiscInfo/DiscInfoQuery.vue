<template>
<div v-loading="discInfoLoading" element-loading-text="请等待..." element-loading-background="rgba(0, 0, 0, 0.8)">
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="formData" label-width="100px">
        <el-form-item-input prop="discid" label="促销方案ID" v-model="formData.discid" inputWidth="100px"></el-form-item-input>
        <el-form-item-input prop="discname" label="促销方案名称" v-model="formData.discname" inputWidth="120px"></el-form-item-input>
        <el-form-item label="起始日期" style="float: left">
          <el-date-picker type="datetime" v-model="formData.begindate" default-time="00:00:00" style="width: 180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" style="float: left">
          <el-date-picker type="datetime" v-model="formData.enddate" default-time="23:59:59" style="width: 180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="促销类别" style="float: left">
          <el-cascader ref="cascader" clearable v-model="formData.discclassname" :options="discClassOption" :props="{expandTrigger:'hover',value:'discclassid',label:'discclassname',children:'discclasslst'}"></el-cascader>
        </el-form-item>
        <el-form-item label="会员卡类别" style="float: left">
          <el-checkbox-group v-model="formData.cardtypeid" style="width:100%;">
            <el-checkbox-button
              v-for="(item,index) in cardTypeOption"
              :key="index"
              :label="item.value"
            >{{item.label}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" style="float: left">
          <el-select v-model="formData.usestatus" clearable style="width:100%;">
            <el-option :value="0" label="作废"></el-option>
            <el-option :value="1" label="临时"></el-option>
            <el-option :value="2" label="确认"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否兼得" style="float: left">
          <el-select v-model="formData.classoutermutex" clearable style="width:100%;">
            <el-option :value="0" label="兼得"></el-option>
            <el-option :value="1" label="不兼得"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:button>
      <kt-button type="primary" label="查询" icon="fa fa-search" perms='region:cxfacx:select' @click="queryFunction"></kt-button>
    </template>
  </e-query-collapse>
  <e-tables
    ref="doctable"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    :page-num="docPageNum"
    :page-size="docPageSize"
    :total="docTotal"
    :table-width-status="widthStatus"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="discid" label="促销方案ID"></e-tables-columns>
    <e-tables-columns prop="discname" label="方案名称" width="200px"></e-tables-columns>
    <e-tables-columns prop="discclassname" label="促销类别"></e-tables-columns>
    <e-tables-columns-date-time prop="begindate" label="起始日期"></e-tables-columns-date-time>
    <e-tables-columns-date-time prop="enddate" label="终止日期"></e-tables-columns-date-time>
    <e-tables-columns prop="checkManName" label="确认人ID"></e-tables-columns>
    <e-tables-columns prop="usestatusname" label="状态"></e-tables-columns>
    <e-tables-columns prop="cardtypeName" label="会员卡类型ID" width="200px"></e-tables-columns>
    <el-table-column label="兼得标识">
      <template slot-scope="scope">
        <div v-if="scope.row.classoutermutex === 0">兼得</div>
        <div v-else>不兼得</div>
      </template>
    </el-table-column>
    <el-table-column label="城市标识">
      <template slot-scope="scope">
        <div v-if="scope.row.cityflag === 0">城市</div>
        <div v-else>总部</div>
      </template>
    </el-table-column>
    <el-table-column label="供应商标识" width="120">
      <template slot-scope="scope">
        <div v-if="scope.row.cityflag === 1">供应商</div>
        <div v-else>不是供应商</div>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="280px">
      <template slot-scope="scope">
        <kt-button type="primary" :label="$t('action.dtl')" icon="fa fa-edit" perms='region:cxfacx:select' @click="handleDtl(scope.row)"></kt-button>
        <kt-button type="primary" :label="$t('action.comfirmThis')" icon="fa fa-edit" perms='region:cxfacx:update' @click="handleComfirm(scope.row)"></kt-button>
        <kt-button type="primary" :label="$t('action.nullify')" icon="fa fa-edit" perms='region:cxfacx:update' @click="handleDelete(scope.row)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <div v-if="dtlStatus" id="dtlDialogDiv">
    <el-dialog :visible="dtlDialog" width="70%" title="明细查询" @close="dtlDialogClose">
      <el-tabs v-model="dtlIndex" v-loading="dtlLoading" @tab-click="handleClick">
        <el-tab-pane label="效期折扣方案" v-if="dtlName === 'discount'" name="discCount">
          <e-tables
            :table-data="disccountData"
            :table-height="dtltableHeight"
            :table-width-status="widthStatus"
            :page-status="dtlpageStatus"
          >
            <e-tables-columns prop="dtlid" label="明细ID"></e-tables-columns>
            <e-tables-columns prop="invalidmonth" label="近效期月数"></e-tables-columns>
            <e-tables-columns prop="discrate" label="折扣"></e-tables-columns>
            <e-tables-columns prop="supplydisc" label="供应商折扣"></e-tables-columns>
            <e-tables-columns prop="saledisc" label="零售商折扣"></e-tables-columns>
          </e-tables>
        </el-tab-pane>
        <el-tab-pane label="效期折扣货品限定" v-if="dtlName === 'discount'" name="discCountLimit">
          <e-tables
            :table-data="invalidLimitData"
            :table-height="dtltableHeight"
            :table-width-status="widthStatus"
            :page-num="invalidLimitPageNum"
            :page-size="invalidLimitPageSize"
            :total="invalidLimitTotal"
            @currentChange="handleInvalidLimitChange"
            @sizeChange="handleInvalidLimitChange"
          >
            <e-tables-columns prop="limitdtlid" label="明细ID"></e-tables-columns>
            <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
            <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
            <e-tables-columns prop="goodstype" label="货品规格"></e-tables-columns>
            <e-tables-columns prop="goodsunit" label="货品单位"></e-tables-columns>
            <e-tables-columns prop="prodarea" label="货品产地"></e-tables-columns>
            <e-tables-columns prop="invalidmonth" label="近效期月数"></e-tables-columns>
            <e-tables-columns prop="discrate" label="折扣"></e-tables-columns>
            <e-tables-columns prop="supplydisc" label="供应商折扣"></e-tables-columns>
            <e-tables-columns prop="saledisc" label="零售商折扣"></e-tables-columns>
          </e-tables>
        </el-tab-pane>
        <el-tab-pane label="立减折扣方案" v-if="dtlName === 'rightreduce'" name="rightreduce">
          <el-table :data="rightreduceData" height="200px" @row-dblclick="selectRightReduceLimit">
            <el-table-column prop="dtlname" label="方案名称"></el-table-column>
            <el-table-column prop="disctotal" v-if="righteduceReducetype === 0" label="折扣金额"></el-table-column>
            <el-table-column prop="discnum" v-else label="折扣数量"></el-table-column>
            <el-table-column prop="supplydisc" label="供应商折扣"></el-table-column>
            <el-table-column prop="saledisc" label="零售商折扣"></el-table-column>
            <el-table-column v-for="(item,index) in rightreduceColumns" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
          </el-table>
          <e-tables
            :table-data="rightreduceLimitData"
            :table-height="200"
            :table-width-status="widthStatus"
            :page-status="dtlpageStatus"
          >
            <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
            <e-tables-columns prop="goodsName" label="货品名称"></e-tables-columns>
            <e-tables-columns prop="buynum" label="购买数量"></e-tables-columns>
          </e-tables>
        </el-tab-pane>
        <el-tab-pane label="可用门店" name="counter">
          <e-tables
            :table-data="counterData"
            :table-height="dtltableHeight"
            :table-width-status="widthStatus"
            :page-status="dtlpageStatus"
          >
            <e-tables-columns prop="counterid" label="门店ID"></e-tables-columns>
            <e-tables-columns prop="countername" label="门店名称"></e-tables-columns>
            <e-tables-columns prop="cityid" label="地区ID"></e-tables-columns>
            <e-tables-columns prop="cityname" label="地区名称"></e-tables-columns>
          </e-tables>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</div>
</template>

<script>
import EQuery from "../../Core/EQuery";
import ETable from "../../Core/ETable";
import KtButton from "../../Core/KtButton";
import discInfoQuery from "../../../js/discinfo/discInfoQuery";
export default {
  name: 'DiscInfoQuery',
  components:{KtButton, ETable, EQuery},
  data(){
    return {
      discClassOption:[],
      cardTypeOption:[],
      formData:{
        discid:null,
				discname:null,
        begindate:null,
        enddate:null,
        discclassname:null,
        cardtypeid:[],
        usestatus:null,
        classoutermutex:null
      },
      discInfoLoading:false,
      docPageNum:0,
      docPageSize:50,
      docTotal:0,
      tableData:[],
			loading:false,
      widthStatus:false,
      tableHeight:0,
      dtlStatus:false,
      dtlDialog:true,
      counterData:[],
      disccountData:[],
      invalidLimitData:[],
      invalidLimitPageNum:0,
      invalidLimitPageSize:50,
      invalidLimitTotal:0,
      rightreduceColumns:[],
      rightreduceData:[],
      rightreduceLimitData:[],
      dtltableHeight:400,
      dtlpageStatus:false,
      dtlLoading:false,
      dtlIndex:'',
      discid:null,
      dtlName:'dtlName',
      righteduceReducetype:0
    }
  },
  created(){
    this.tableHeight = (window.innerHeight - 240);
    discInfoQuery.sendThis(this);
    this.selectDiscClassOption();
    this.cardTypeLoad();
  },
	methods:{
    //类型查询
    selectDiscClassOption:discInfoQuery.selectDiscClassOption,
    //卡类型查询
    cardTypeLoad: discInfoQuery.cardTypeLoad,
    //总单查询
		queryFunction:discInfoQuery.queryFunction,
    //分页查询
		handleChange:discInfoQuery.handleChange,
    //表单确认
    handleComfirm: discInfoQuery.handleComfirm,
    //表单细单
    handleDtl:discInfoQuery.handleDtl,
    //表单作废
    handleDelete: discInfoQuery.handleDelete,
    //tab页点击事件
    handleClick:discInfoQuery.handleClick,
    //关闭窗口
    dtlDialogClose: discInfoQuery.dtlDialogClose,
    handleInvalidLimitChange: discInfoQuery.handleInvalidLimitChange,
    selectRightReduceLimit: discInfoQuery.selectRightReduceLimit
	}
}
</script>

<style>
#dtlDialogDiv  .el-dialog__header{
  border-bottom: 1px solid #ccc !important;
  background:#f5f5f5;
}
</style>
