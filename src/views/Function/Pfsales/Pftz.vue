<template>
<div>
  <el-form>
    <el-col :span="4">
      <el-radio v-model="radio" label="1">价格</el-radio>
    </el-col>
    <el-col :span="20">
      <el-form label-width="100px" :inline="true" style="width:600px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="原销售细单ID" style="float: left">
              <el-input v-model="priceData.sadtlid" @keyup.native="numberValue('priceData','sadtlid',priceData.sadtlid)" style="width:150px;"></el-input>
              <el-button icon="el-icon-search" circle @click="openSadtlid(priceData.sadtlid)"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新售价" style="float: left">
              <el-input v-model="priceData.price" @keyup.native="numberValue('priceData','price',priceData.price)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新透底" style="float: left">
              <el-input v-model="priceData.refprince" @keyup.native="numberValue('priceData','refprince',priceData.refprince)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新客户ID" style="float: left">
              <el-input v-model="priceData.customid" @keyup.native="numberValue('priceData','customid',priceData.customid)" style="width:150px;"></el-input>
              <el-button icon="el-icon-search" circle @click="openPriceHov('customid')"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <el-col :span="4">
      <el-radio v-model="radio" label="2">客户</el-radio>
    </el-col>
    <el-col :span="20">
      <el-form label-width="100px" :inline="true" style="width:600px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="原销售单ID" style="float: left">
              <el-input v-model="customData.salesid" @keyup.native="numberValue('customData','salesid',customData.salesid)" style="width:150px;"></el-input>
              <el-button icon="el-icon-search" circle @click="openSalesid(customData.salesid)"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新客户ID" style="float: left">
              <el-input v-model="customData.customid" @keyup.native="numberValue('customData','customid',customData.customid)" style="width:150px;"></el-input>
              <el-button icon="el-icon-search" circle @click="openCustomHov('customid')"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <el-col :span="4">
    <el-radio v-model="radio"  label="3">批号</el-radio>
    </el-col>
    <el-col :span="20">
      <el-form label-width="100px" :inline="true" style="width:600px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="原销售细单ID" style="float: left">
              <el-input v-model="lotnoData.sadtlid" @keyup.native="numberValue('lotnoData','sadtlid',lotnoData.sadtlid)" style="width:150px;"></el-input>
              <el-button icon="el-icon-search" circle @click="openSadtlid(lotnoData.salesid)"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新内部批次ID" style="float: left">
              <el-input v-model="lotnoData.inbatchid" @keyup.native="numberValue('lotnoData','inbatchid',lotnoData.inbatchid)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-form-item>
        <el-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:xsbcmxcx:select" @click="saveAll"></el-button>
        <!--<kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="marketing:xsbcmxcx:select" @click="saveAll"></kt-button>-->
      </el-form-item>
    </el-col>
  </el-form>
  <e-dialogs dialog-title="查询细单" :status="dialogVisible" @dialogClose="dialogColse">
    <e-tables
    v-if="tableStatus === 0"
    :table-data="pftzTableData"
    :loading="pftzLoading"
    :page-status="false"
    :table-height="450"
    >
      <e-tables-columns prop="salesid" label="销售单ID"></e-tables-columns>
      <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
      <e-tables-columns prop="companyname" label="客户名称"></e-tables-columns>
      <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
      <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
      <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
      <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
      <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
      <e-tables-columns prop="goodsqty" label="数量"></e-tables-columns>
      <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
      <e-tables-columns prop="total_lines" label="金额"></e-tables-columns>
    </e-tables>
    <e-tables
      v-if="tableStatus === 1"
      :table-data="pftzTableData"
      :loading="pftzLoading"
      :page-status="false"
      :table-height="450"
    >
      <e-tables-columns prop="salesid" label="销售单ID"></e-tables-columns>
      <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
      <e-tables-columns prop="companyname" label="客户名称"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="pftzHovVisible" :hov-data="pftzHov"></hov-tools>
</div>
</template>

<script>
import HovTools from "../../Core/HovTools";
import KtButton from "../../Core/KtButton";
export default {
  name: "Pftz",
  components: {KtButton, HovTools},
  data () {
    return {
      radio:null,
      priceData:{
        sadtlid:null,
        price:null,
        refprince:null,
        customid:null
      },
      customData: {
        salesid: null,
        customid: null
      },
      lotnoData: {
        sadtlid: null,
        inbatchid: null
      },
      dialogVisible:false,
      pftzLoading:false,
      pftzTableData: [],
      tableStatus:0,
      pftzHovVisible:false,
      pftzHov:{
        hovTitle:'',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'pftzHovVisible',
        hovColumns: []
      }
    }
  },
  methods:{
    numberValue(dataName, valueid, value) {
      this[dataName][valueid] = value.replace(/[^\- \d.]/g, '');
    },
    openSadtlid(value){
      this.tableStatus = 0;
      if (value !== null && value !== "") {
        this.dialogVisible = true;
        this.pftzTableData = [];
        this.pftzLoading = true;
        this.$api.pfsales.selectPftzSadtlid({sadtlid:value}).then(res => {
          if (res.code === 200) {
            this.pftzTableData = res.data;
            this.pftzLoading = false;
          }
        }).catch(() => {
          this.pftzLoading = false;
          return false;
        })
      } else {
        alert("细单ID为空");
        return false;
      }
    },
    openSalesid(value){
      this.tableStatus = 1;
      if (value !== null && value !== "") {
        this.dialogVisible = true;
        this.pftzTableData = [];
        this.pftzLoading = true;
        this.$api.pfsales.selectPftzSadtlid({sadtlid:value}).then(res => {
          if (res.code === 200) {
            this.pftzTableData = res.data;
            this.pftzLoading = false;
          }
        }).catch(() => {
          this.pftzLoading = false;
          return false;
        })
      } else {
        alert("细单ID为空");
        return false;
      }
    },
    saveAll(){
      if (this.radio !== null && this.radio !== "") {
        if (this.radio === '1') {
          this.$api.pfsales.insertPftzPrice(this.priceData).then(res => {
            if (res.code === 200) {
              alert("保存成功");
            } else {
              return false;
            }
          }).catch(() => {
            return false;
          })
        } else if (this.radio === '2') {
          this.$api.pfsales.insertPftzCustom(this.customData).then(res => {
            if (res.code === 200) {
              alert("保存成功");
            } else {
              return false;
            }
          }).catch(() => {
            return false;
          })
        } else if (this.radio === '3') {
          this.$api.pfsales.insertPftzLotno(this.lotnoData).then(res => {
            if (res.code === 200) {
              alert("保存成功");
            } else {
              return false;
            }
          }).catch(() => {
            return false;
          })
        }
      } else {
        alert("没有选中数据");
        return false;
      }
    },
    openPriceHov(){
      this.pftzHov.hovTitle = '客户查询';
      this.pftzHov.hovUrl = "customidhov/select";
      this.pftzHov.hovColumns = [
        {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"customid"},
        {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1},
        {id: "customopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
      ];
      this.pftzHov.fillDataName = "priceData";
      this.pftzHovVisible = true;
    },
    openCustomHov(){
      this.pftzHov.hovTitle = '客户查询';
      this.pftzHov.hovUrl = "customidhov/select";
      this.pftzHov.hovColumns = [
        {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"customid"},
        {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1},
        {id: "customopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
      ];
      this.pftzHov.fillDataName = "customData";
      this.pftzHovVisible = true;
    },
    dialogColse(){
      this.pftzTableData = [];
      this.dialogVisible = false;
    }
  }
}
</script>

<style scoped>

</style>
