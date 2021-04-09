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
  ></e-table>
  <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
    <el-form :model="base" :label-position="labelPosition" label-width="100px" style="width:300px;margin:0 auto">
      <el-form-item label="货品ID">
        <el-input v-model="base.goodsid" :disabled="true"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov()"></el-button>
      </el-form-item>
      <el-form-item label="货品名称">
        <el-input v-model="base.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="base.goodstype"></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input v-model="base.prodarea"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="base.goodsunit"></el-input>
      </el-form-item>
      <el-form-item label="通知退货数量">
        <el-input v-model="base.goodsqty"></el-input>
      </el-form-item>
      <el-form-item label="最大退货数量">
        <el-input v-model="base.remqty"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="base.unitprice"></el-input>
      </el-form-item>
      <el-form-item label="PRS库存">
        <el-input v-model="base.sumqty"></el-input>
      </el-form-item>
      <el-form-item label="税率">
        <el-input v-model="base.taxrate"></el-input>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="base.total"></el-input>
      </el-form-item>
      <el-form-item label="外部批次ID">
        <el-input v-model="base.outbatchid"></el-input>
      </el-form-item>
      <el-form-item label="内部批次ID">
        <el-input v-model="base.inbatchid"></el-input>
      </el-form-item>
      <el-form-item label="批号">
        <el-input v-model="base.lotno"></el-input>
      </el-form-item>
      <el-form-item label="货品状态ID">
        <el-input v-model="base.goodsstatusid"></el-input>
      </el-form-item>
      <el-form-item label="货品状态">
        <el-input v-model="base.goodsstatus"></el-input>
      </el-form-item>
      <el-form-item label="仓储区域">
        <el-input v-model="base.storerid"></el-input>
      </el-form-item>
      <el-form-item label="货位">
        <el-input v-model="base.posid"></el-input>
      </el-form-item>
      <el-form-item label="物流库存">
        <el-input v-model="base.wlqty"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="insertForm">保存</el-button>
      <el-button type="info" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import HovTools from "@/views/Core/HovTools";
export default {
  name: 'Jhthtz',
  components:{HovTools, ETable, EQuery},
  data(){
    return{
      formList:[
        {type:'inputHov',label:'收货公司ID',id:'reccompanyid',labelWidth:75,formWidth:190,disabled:true},
        {type:'input',label:'收货公司名称',id:'reccompanyname',disabled:true},
        {type:'select',label:'退货原因',id:'backwhyid',options:[],clearable:true},
        {type:'input',label:'备注',id:'memo'},
        {type:'select',label:'保管单位',id:'deptid',options:[],clearable:true},
        {type:'datetime',label:'退货期限',id:'backdate',labelWidth:60},
        {type:'datetime',label:'收货期限',id:'recdate',labelWidth:60},
        {type:'input',label:'总金额',id:'total_line',disabled:true},
        {type:'input',label:'经销方式',id:'salesmode',disabled:true},
        {type:'input',label:'付款方式',id:'paymode',disabled:true},
        {type:'input',label:'账期',id:'payterm',disabled:true},
      ],
      formData:{
        reccompanyid:null,
        reccompanyname:null,
        backwhyid:null,
        memo:null,
        deptid:null,
        backdate:null,
        recdate:null,
        total_line:0,
        salesmode:null,
        paymode:null,
        payterm:null
      },
      btnOptions:[
        {id:'add',label:'action.add',icon:'fa fa-plus',perms:'returnofgoodsandreserves:jhthtz:select'},
        {id:'save',label:'action.save',icon:'fa fa-plus',perms:'returnofgoodsandreserves:jhthtz:select'},
        {id:'delete',label:'action.deleteXdh',icon:'fa fa-delete',perms:'returnofgoodsandreserves:jhthtz:select'},
      ],
      tableHeight:0,
      loading:false,
      tableColumns:[
        {indexType:'selection'},
        {type:0,prop:'goodsid',label:'货品ID',tableStatus:0},
        {type:0,prop:'goodsname',label:'货品名称',tableStatus:0},
        {type:0,prop:'goodstype',label:'规格',tableStatus:0},
        {type:0,prop:'goodsunit',label:'单位',tableStatus:0},
        {type:0,prop:'prodarea',label:'产地',tableStatus:0},
        {type:0,prop:'goodsqty',label:'通知退货数量',tableStatus:0},
        {type:0,prop:'realgoodsqty',label:'实际退货数量',tableStatus:0},
        {type:0,prop:'unitprice',label:'单价',tableStatus:0},
        {type:0,prop:'total',label:'金额',tableStatus:0},
        {type:0,prop:'loton',label:'批号',tableStatus:0},
        {type:0,prop:'storerid',label:'仓储区域',tableStatus:0},
        {type:0,prop:'goodsstatus',label:'货品状态',tableStatus:0},
        {type:0,prop:'outbatchid',label:'外部批次',tableStatus:0},
        {type:0,prop:'inbatchid',label:'内部批次',tableStatus:0},
        {type:0,prop:'maxgoodsqty',label:'最大退货数量',tableStatus:0},
        {type:0,prop:'goodsstatusid',label:'货品状态ID',tableStatus:0},
        {type:0,prop:'posid',label:'货位ID',tableStatus:0}
      ],
      tableData:[
        {goodsid:1},
        {goodsid:2},
        {goodsid:3},
      ],
      addVisible:false,
      selections:[],
      dialogVisible:false,
      dialogWidth:'700px',
      dialogHeight:500,
      dialogTop:'12vh',
      labelPosition:'right',
      docTitle:'新增总单',
      base:{
        goodsid:null,
        goodsname:null,
        goodstype:null,
        prodarea:null,
        goodsunit:null,
        goodsqty:null,
        remqty:null,
        unitprice:null,
        sumqty:null,
        taxrate:null,
        total:null,
        outbatchid:null,
        inbatchid:null,
        lotno:null,
        goodsstatusid:null,
        goodsstatus:null,
        storerid:null,
        posid:null,
        wlqty:null,
        salesmode:null,
        paymode:null,
        payterm:null,
        lotid:null
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
      companyVisible:false,
      companyHov:{
        hovTitle:'公司查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'companyVisible',
        hovColumns:
          [
            {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
            {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
          ]
      }

    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
  },
  methods:{
    functionQuery(data){
      if(data==="add"){
        this.dialogVisible=true;
      }else if(data==="save"){
        let formData=this.formData;
        let tableData=this.tableData;
        let params={};
        params.companyid=Number(sessionStorage['companyid']);
        params.carddeptid=formData.deptid;
        params.reccompanyid=formData.reccompanyid;
        params.deptid=Number(sessionStorage['deptid']);
        params.salesmode=formData.salesmode;
        params.inputmanid=formData.inputmanid;
        params.total_line=formData.total_line;
        params.dtllines=tableData.length;
        params.backwhyid=formData.backwhyid;
        params.memo=formData.memo;
        params.paymode=formData.paymode;
        params.payterm=formData.payterm;
        params.jhthtz_insertdtl=[];
        params.jhthtz_insertplan=[];
        tableData.forEach(e=>{
          let jhthtz_insertdtl={};
          jhthtz_insertdtl.goodsid=e.goodsid;
          jhthtz_insertdtl.outbatchid=e.outbatchid;
          jhthtz_insertdtl.inbatchid=e.inbatchid;
          jhthtz_insertdtl.goodsstatusid=e.goodsstatusid;
          jhthtz_insertdtl.maxgoodsqty=e.maxgoodsqty;
          jhthtz_insertdtl.unitprice=e.unitprice;
          jhthtz_insertdtl.total=e.total;
          jhthtz_insertdtl.goodsqty=e.goodsqty;
          jhthtz_insertdtl.storerid=e.storerid;
          params.jhthtz_insertdtl.push(jhthtz_insertdtl);
          let jhthtz_insertplan={};
          jhthtz_insertplan.carddeptid=formData.deptid;
          jhthtz_insertplan.goodsid=e.goodsid;
          jhthtz_insertplan.lotid=e.lotid;
          jhthtz_insertplan.storerid=e.storerid;
          jhthtz_insertplan.posid=e.posid;
          jhthtz_insertplan.outbatchid=e.outbatchid;
          jhthtz_insertplan.inbatchid=e.inbatchid;
          jhthtz_insertplan.goodsstatusid=e.goodsstatusid;
        });
        this.$api.returnofgoodsandreserves.insertJhthtzAll(params).then(res=>{
          if(res.code===200){
            if(res.data>0){
              alert("保存成功");
              this.tableData=[];
            }else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error=>{
          return false;
        })
      }else if(data==="delete"){
        let tableData=this.tableData;
        let selections=this.selections;
        let params=[];
        tableData.map((e,index)=>{
          selections.forEach(es =>{
            if(es.goodsid===e.goodsid){
              params.push(index);
            }
          })
        });
        params.reverse().forEach(e=>{
          tableData.splice(e,1);
        })
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectionChange(val){
      this.selections=val;
    },
    openHov(data){
      if(data==="companyid"){
        this.companyVisible=true;
      }else if(data==="goodsid"){
        this.goodsVisible=true;
      }
    },
    dialogColse(){
      this.dialogVisible=false;
    },
    insertForm(){
      let tableData=this.tableData;
      let base=this.base;
      tableData.forEach(e=>{
        if(e.goodsid===base.goodsid&&e.outbatchid===base.outbatchid&&
          e.inbatchid===base.inbatchid&&e.loton===base.lotno&&e.goodsstatusid===base.goodsstatusid&&e.posid===base.posid){
          alert("已经添加过该细单，请重新选择！");
          return false;
        }
      });
      if(base.storerid.length===0){
        alert("仓储区域不能为空");
        return false;
      }
      if(base.goodsid.length===0){
        alert("货品ID不能为空");
        return false;
      }
      let query_Goodsqty = base.goodsqty;
      let query_remqty = base.remqty;
      if(parseFloat(query_Goodsqty)>parseFloat(query_remqty)){
        alert("通知退货数量不能大于最大退货数量");
        return;
      }
      let query_sumqty=base.sumqty;
      if(parseFloat(query_Goodsqty)>parseFloat(query_sumqty)){
        alert("通知退货数量不能大于PRS库存");
        return;
      }
      let query_wlqty=base.wlqty;
      if(parseFloat(query_Goodsqty)>parseFloat(query_wlqty)){
        alert("通知退货数量不能大于物流库存");
        return;
      }
      let formData=this.formData;
      formData.salesmode=base.salesmode;
      formData.paymode=base.paymode;
      formData.payterm=base.payterm;
      this.$api.returnofgoodsandreserves.selectJhthtzRemqty({deptid:formData.deptid,goodsid:base.goodsid,lotid:base.lotno}).then(res=>{
        if(res.code===200){
          if(parseFloat(base.goodsqty)>parseFloat(res.data.remqty)){
            alert("现货位库存仅有:"+selectqty.rows[0].REMQTY);
            return false;
          }
        }
      }).catch(error=>{
        return false;
      });
      tableData.push(base);
      let total=formData.total_line;
      total=(parseFloat(total)+parseFloat(e.total)).toFixed(2);
      this.closeDialog();
    }
  }
}
</script>

<style scoped>

</style>
