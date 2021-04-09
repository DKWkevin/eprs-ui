<template>
<div>
  <div class="toolbar">
    <div class="querybtndiv">
      <el-form>
        <el-form-item style="clear:both;width: 100%;text-align:left;">
          <kt-button :icon="btnOptions.icon" :perms="btnOptions.perms" :label="$t(btnOptions.label)" type="primary" @click="queryFunction()"></kt-button>
        </el-form-item>
      </el-form>
    </div>
    <div :class="[collapse===true?'collapseDiv':'discollapseDiv']">
      <el-form :model="formData" label-width="90px" :inline="true" label-position="left">
        <el-form-item label="货品ID" style="float:left;">
          <el-input v-model.number="formData.goodsid" style="width:80%;"></el-input>
          <el-button icon="el-icon-search" circle @click="queryHov('goodsid')"></el-button>
        </el-form-item>
        <el-form-item label="货品操作码" style="float:left;">
          <el-input v-model="formData.opcode"></el-input>
        </el-form-item>
        <el-form-item style="float:left;">
          <el-select v-model="formData.select1" clearable>
            <el-option value="c.realprice" label="调拨价"></el-option>
            <el-option value="d.realprice" label="透明底价"></el-option>
            <el-option value="e.price_ll" label="批发限价"></el-option>
            <el-option value="f.realprice" label="连锁透底"></el-option>
            <el-option value="g.price_ul" label="企业牌价"></el-option>
            <el-option value="h.price_ul" label="政府牌价"></el-option>
            <el-option value="i.realpric" label="最新进价"></el-option>
            <el-option value="j.price" label="标准零售价"></el-option>
          </el-select>
          <el-select v-model="formData.select2" style="width:60px;margin-right:5px;" clearable>
            <el-option value="=" label="=">=</el-option>
            <el-option value="<" label="<"></el-option>
            <el-option value=">" label=">"></el-option>
          </el-select>
          <el-select v-model="formData.select3" clearable>
            <el-option value="c.realprice" label="调拨价"></el-option>
            <el-option value="d.realprice" label="透明底价"></el-option>
            <el-option value="e.price_ll" label="批发限价"></el-option>
            <el-option value="f.realprice" label="连锁透底"></el-option>
            <el-option value="g.price_ul" label="企业牌价"></el-option>
            <el-option value="h.price_ul" label="政府牌价"></el-option>
            <el-option value="i.realpric" label="最新进价"></el-option>
            <el-option value="j.price" label="标准零售价"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作伙伴" style="float:left;">
          <el-input v-model.number="formData.partener" style="width:80%;"></el-input>
          <el-button icon="el-icon-search" circle @click="queryHov('partener')"></el-button>
        </el-form-item>
        <el-form-item label="供应商ID" style="float:left;">
          <el-input v-model.number="formData.supplyid" style="width:80%;"></el-input>
          <el-button icon="el-icon-search" circle @click="queryHov('supplyid')"></el-button>
        </el-form-item>
      </el-form>
      <div class="collapseBtn">
       <a href="javascript:void(0)" :class="[collapse===true?'el-icon-arrow-up':'el-icon-arrow-down']" @click="collapseBtn"></a>
      </div>
    </div>
  </div>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
    @handle="handle"
  ></e-table>
  <div v-if="dtlVisible">
    <el-dialog :visible="dtlVisibles" :title="dtlTitle" :top="dialogTop" :width="dialogWidth"
               :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog">
      <e-table :table-data="dtlData" :table-columns="dtlTableColumns" :table-height="dtlHeight" :loading="dtlloading" :table-width-status="false" :page-status="false"></e-table>
    </el-dialog>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHovData"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="partenerVisible" :hov-data="partenerHov"></hov-tools>
  <hov-tools v-if="partenerVisible" :hov-data="partenerHov"></hov-tools>
</div>
</template>

<script>
//价格查询
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import {paramsFormat, selectDdlOption} from "@/utils/functions";
import {selectbuyid, selectCgfz} from "@/utils/drops";
import ETable from "@/views/Core/ETable";
import KtButton from "@/views/Core/KtButton";
export default {
  name: 'Jgcx',
  components:{KtButton, ETable, HovTools, EQuery},
  data(){
    return{
      collapse:false,
      formData:{
        supplyid:null,goodsid:null,partener:null,opcode:null,select1:null,select2:null,select3:null
      },
      btnOptions:{id:'query',icon:"fa fa-search", label:"action.search",perms:"business:jgcx:select"},
      tableColumns:[
        {type:0,prop:'goodsid',label:'货品ID',tableStatus:0},
        {type:0,prop:'goodsname',label:'品名',tableStatus:0},
        {type:0,prop:'goodstype',label:'规格',tableStatus:0},
        {type:0,prop:'prodarea',label:'产地',tableStatus:0},
        {type:0,prop:'goodsunit',label:'单位',tableStatus:0},
        {type:0,prop:'lskc',label:'连锁库存',tableStatus:0},
        {type:0,prop:'pfkc',label:'批发库存',tableStatus:0},
        {type:0,prop:'aqkc',label:'安全库存',tableStatus:0},
        {type:0,prop:'dbj',label:'调拨价',tableStatus:0},
        {type:0,prop:'tmdj',label:'透明底价',tableStatus:0},
        {type:0,prop:'yytd',label:'医院透底',tableStatus:0},
        {type:0,prop:'pfxj',label:'批发限价',tableStatus:0},
        {type:0,prop:'lstd',label:'连锁透底',tableStatus:0},
        {type:0,prop:'qypj',label:'企业牌价',tableStatus:0},
        {type:0,prop:'zfpj',label:'政府牌价',tableStatus:0},
        {type:0,prop:'yyzbj',label:'医院中标价',tableStatus:0},
        {type:0,prop:'zxjj',label:'最新进价',tableStatus:0},
        {type:0,prop:'bzlsj',label:'标准零售价',tableStatus:0},
        {type:0,prop:'lsdjxj',label:'零售定价限价',tableStatus:0},
        {type:0,prop:'lscjxj',label:'零售成交限价',tableStatus:0},
        {type:0,prop:'suprice',label:'渠道价格',tableStatus:0},
        {type:0,prop:'zydbj',label:'直营调拨价',tableStatus:0},
        {type:0,prop:'supplyname',label:'供应商名称',tableStatus:0},
        {type:1,prop:'caozuo',label:'操作',fixed:'right',width:160,widthStatus:true,tableStatus:0,options:[
            {id:'edit',icon:"fa fa-edit", label:"action.gdqlsjg",perms:"business:jgcx:select"}
          ]
        }
      ],
      tableData:[],
      tableHeight:0,
      loading:false,
      dtlVisible:false,
      dtlVisibles:true,
      dtlTitle:'各地区零售价格',
      dialogTop:'12vh',
      dialogWidth:'1000px',
      dtlloading:false,
      dtlTableColumns:[
        {type:0,prop:'goodsid',label:'货品ID',tableStatus:0},
        {type:0,prop:'goodsname',label:'品名',tableStatus:0},
        {type:0,prop:'goodstype',label:'规格',tableStatus:0},
        {type:0,prop:'prodarea',label:'产地',tableStatus:0},
        {type:0,tableStatus:0,prop:'realprice',label:'零售价'},
        {type:0,tableStatus:0,prop:'areaid',label:'地区ID'},
        {type:0,tableStatus:0,prop:'areaname',label:'地区名称'}
      ],
      dtlData:[],
      dtlHeight:300,
      supplyVisible:false,
      supplyHovData:{
        hovTitle:'供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "companyname", name: "供应商名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "供应商操作码",queryStatus:true,dataStatus:1}
          ]
      },
      goodsVisible:false,
      goodsHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'goodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
          ]
      },
      partenerVisible:false,
      partenerHov:{
        hovTitle:'合作伙伴查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'partenerVisible',
        hovColumns:
          [
            {id: "companyid", name: "合作伙伴ID",queryStatus:true,dataStatus:2,fillid:"partener"},
            {id: "companyname", name: "合作伙伴名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "合作伙伴操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
  },
  methods:{
    queryFunction(){
      let pageSize=this.$refs.doctable.pageSize;
      this.selectDoc(1,pageSize);
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      this.collapse=false;
      let formData=this.formData;
      let params={};
      if(formData.supplyid!==null&&formData.supplyid!==""){
        params.supplyid=formData.supplyid;
      }
      if(formData.goodsid!==null&&formData.goodsid!==""){
        params.goodsid=formData.goodsid;
      }
      if(formData.partener!==null&&formData.partener!==""){
        params.partener=formData.partener;
      }
      if(formData.opcode!==null&&formData.opcode!==""){
        params.opcode=formData.opcode.trim();
      }
      if((formData.select1!==null&&formData.select1!=="")&&
        (formData.select2!==null&&formData.select2!=="")&&
        (formData.select3!==null&&formData.select3!=="")){
        params.compare=formData.select1+" "+formData.select2+" "+formData.select3;
      }
      if(this.returnValue(formData.supplyid)===false
        &&this.returnValue(formData.goodsid)===false
        &&this.returnValue(formData.partener)===false
        &&this.returnValue(formData.opcode)===false){
        alert("请输入查询条件");
        return false;
      }
      this.tableData=[];
      this.loading=true;
      this.$api.bussiness.selectJgcxDoc({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code===200){
          this.tableData=Object.freeze(res.data.content);
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error=>{
        this.loading=false;
        this.$refs.doctable.pageNum=1;
        this.$refs.doctable.total=0;
        return false;
      })
    },
    handle(data){
      this.dtlVisible=true;
      this.dtlloading=true;
      this.$api.bussiness.selectJgcxDtl({goodsid:data.row.goodsid}).then(res => {
        if(res.code===200){
          this.dtlData=res.data;
          this.dtlloading=false;
        }
      }).catch(error=>{
        this.dtlloading=false;
        return false;
      })
    },
    queryHov(id){
      if(id==="supplyid"){
        this.supplyVisible=true;
      }else if(id==="goodsid"){
        this.goodsVisible=true;
      }else if(id==="partener"){
        this.partenerVisible=true;
      }
    },
    closeDialog(){
      this.dtlData=[];
      this.dtlVisible=false;
    },
    collapseBtn(){
      this.collapse = this.collapse === false;
    },
    returnValue(data){
      return data !== null && data !== "";
    }
  }
}
</script>

<style scoped>
  a{text-decoration: none;}
  .toolbar{float:left;position:relative;width:100%;height:75px;}
  .toolbar .querybtndiv{width:96%;position: absolute;top:0;left:0;padding-left:15px;}
  .toolbar .discollapseDiv{width:100%;max-height:30px;position:absolute;top:32px;left:0;overflow: hidden;background:white;}
  .toolbar .collapseDiv{width:100%;height:auto;position:absolute;overflow:visible;top:32px;left:0;z-index: 10;background:white;}
  .toolbar >>> .collapseBtn{width:40px;position:absolute;top:0;right:0;}
</style>
