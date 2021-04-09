<template>
<div>
  <!--查询条件-->
  <e-querys>
    <template v-slot:query>
      <el-form :model="formData" label-width="80px">
        <el-form-item-hov label="客户ID" prop="customid" v-model="formData.customid" @openHov="queryHov" :disabled="true" :btn-disabled="customDisabled"></el-form-item-hov>
        <el-form-item-input label="客户名称" prop="customname" v-model="formData.customname" :disabled="true"></el-form-item-input>
        <el-form-item label="选择银行" prop="bankid" style="float: left">
          <el-select  v-model="formData.bankid">
            <el-option v-for="(item,index) in bankOptions" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:button>
      <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="financial:xssk:select" @click="handleQuery('query')"></kt-button>
      <kt-button type="primary" icon="fa fa-check" :label="$t('action.comfirm')" perms="financial:xssk:add" @click="handleQuery('comfirm')"></kt-button>
      <kt-button type="primary" icon="fa fa-cog" :label="$t('action.reset')" perms="financial:xssk:select" @click="handleQuery('reset')"></kt-button>
    </template>
  </e-querys>
<!--  <e-query
    ref="query"
  :formList="formList"
  :formData="formData"
  :btnOptions="btnOptions"
  @openHov="queryHov"
  @query="handleQuery"
  ></e-query>-->
  <!--总单table-->
  <div  class="docTable">
    <e-table
      ref="doctable"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :tableHeight="tableHeight"
      :showSummary="showSummary"
      :pageStatus="pageStatus"
      :summary="summAry"
      :loading="docLoading"
      :tableWidthStatus="tableWidthStatus"
      @handle="handle"
      @selectionChange="SelectionChange"
    ></e-table>
    <div>
      <span style="float:left;margin:5px 10px 5px 5px;font-size:14px;">未收合计</span>
      <el-input disabled=disabled v-model="weishouTotal" style="float:left;width:200px;color:black"></el-input>
      <span style="float:left;margin:5px 10px 5px 5px;font-size:14px;">本次勾兑合计</span>
      <el-input disabled=disabled v-model="sumTotal" style="float:left;width:200px;color:black"></el-input>
    </div>
  </div>
  <!--细单table-->
  <div class="edTable" v-if="dtlifsVisiable">
    <el-dialog
      :visible.sync="dtlVisiable"
      :title="edTitle"
      :width="edDialogWidth"
      :top="edDialogTop"
      :destroy-on-close="true"
      @close="closeEdialog"
      :close-on-click-modal="false"
  >
      <e-table
        ref="dtltable"
        :tableColumns="edTableColumns"
        :tableData="edTableData"
        :tableHeight="edTableHeight"
        :pageStatus="pageStatus"
        @elInput="sumEdChange"
        @selectionChange="edSelectionChange"
      ></e-table>
      <div slot="footer">
        <span style="float:left;margin:5px 10px 5px 5px;font-size:14px;">合计收款金额</span>
        <el-input disabled=disabled v-model="edSumTotal" style="float:left;width:200px"></el-input>
        <el-button icon="fa fa-check" type="primary" @click="comsum()" >{{$t('action.comfirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
  <!--查询条件客户hov-->
  <hov-tools ref="queryCustom" v-if="queryCustomVisible" :hovData="customHov"></hov-tools>
  <hov-tools ref="cdhpDoc" v-if="cdhpDocVisible" :hov-data="cdhpHov" @updatehov="updatehov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery"
import KtButton from "@/views/Core/KtButton"
import ETable from "@/views/Core/ETable";
import {selectDdl, disForm, selectDdlNotIn} from "@/utils/functions"
import HovTools from "../../Core/HovTools";
export default {
  name: 'Xssk',
  components:{
    ETable,
    KtButton,
    EQuery,
    HovTools
  },
  data (){
    return {
      //查询条件加载
      formData:{
        customid:null,customname:null,bankid:null},
      bankOptions:[],
      customDisabled:false,
      queryCustomVisible:false,
      customHov:{
        hovTitle:"客户查询",
        hovUrl:"customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'queryCustomVisible',
        hovColumns:
          [
            {id: "customid", name: "客户ID",value:null,queryStatus:true,dataStatus:2,fillstatus:1,fillid:"customid"},
            {id: "customname",name:"客户名称",value:null,queryStatus:true,dataStatus:1,fillstatus:2,fillid:"customname"},
            {id: "customopcode", name: "客户操作码",value:null,queryStatus:true,dataStatus:1,fillstatus:2}
          ]
      },
      //table
      tableHeight:240,
      showSummary:true,
      pageStatus:false,
      tableWidthStatus:false,
      tableColumns:[
        {indexType:"selection","fixed":"left",width:50,tableStatus:0},
        {prop:"sasetdocid",label:"总单ID",type:0,tableStatus:0},
        {prop:"credate",label:"结算单日期",type:2,width:150,tableStatus:0},
        {prop:"total",label:"应收款金额",type:0,tableStatus:0},
        {prop:"rectotal",label:"已收金额",type:0,tableStatus:0},
        {prop:"duerectotal",label:"本次金额",type:0,tableStatus:0},
        {prop:"settlemode",label:"结算方式",type:4,
          options:[],tableStatus:0},
        {prop:"customid",label:"客户ID",type:0,tableStatus:0},
        {prop:"companyid",label:"公司ID",type:0,tableStatus:0},
        {prop:"memo",label:"备注",type:0,tableStatus:3},
        {prop:"btn","fixed":"right",label:"操作",type:1,tableStatus:0,width:100,
          options:
            [
              {
                id:"edit",
                icon:"fa fa-edit",label:"action.dtl",
                perms:"financial:xssk:dtl"}
            ]
        }
      ],
      tableData: [],
      docArray: [],
      sumTotal: 0,
      weishouTotal: 0,
      summAry:["total","rectotal","duerectotal"],
      docLoading: false,
      cdhpDocVisible:false,
      cdhpHov: {
        hovTitle:"承兑汇票查询",
        hovUrl:"ysk/selectarbainfo",
        afterStatus: true,
        fillDataName: "updateDocData",
        parentVisible:'cdhpDocVisible',
        hovColumns:
          [
            {
              id: "customid",
              name: "客户ID",
              value: null,
              queryStatus: true,
              dataStatus: 2,
              fillstatus: 2,
              tableStatus: true,
              disabled: true
            },
            {
              id: "credate",
              name: "交票日",
              value: null,
              queryStatus: false,
              dataStatus: 2,
              fillstatus: 1,
              type:'date',
              fillid: "credate"
            },
            {
              id: "pjlx",
              name: "票据类型",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              fillid: "pjlx"
            },
            {
              id: "outdate",
              name: "出票日",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              type:'date',
              fillid: "outdate"
            },
            {
              id: "enddate",
              name: "到期日",
              value: null,
              queryStatus: false,
              dataStatus: 2,
              fillstatus: 1,
              type:'date',
              fillid: "enddate"
            },
            {
              id: "recbankname",
              name: "回款银行",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              fillid: "recbankname"
            },
            {
              id: "bano",
              name: "票号",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              fillid: "bano"
            },
            {
              id: "outbankname",
              name: "出票行",
              value: null,
              queryStatus: false,
              dataStatus: 2,
              fillstatus: 1,
              fillid: "outbankname"
            },
            {
              id: "total",
              name: "票据金额",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              fillid: "totals"
            },
            {
              id: "outcompany",
              name: "出票单位",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              fillid: "outcompany"
            },
            {
              id: "rectotal",
              name: "金额",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              fillid: "rectotal"
            },
            {
              id: "baid",
              name: "金额",
              value: null,
              queryStatus: false,
              dataStatus: 1,
              fillstatus: 1,
              tableStatus: true,
              fillid: "baid"
            },
            {
              id: "companyid",
              name: "公司ID",
              value: null,
              queryStatus: true,
              disabled: true,
              dataStatus: 1,
              fillstatus: 0,
              tableStatus: true
            }
          ]
      },
      updateDocData: {
        credate: null,
        pjlx: null,
        outdate: null,
        enddate: null,
        recbankname: null,
        bano: null,
        outbankname: null,
        totals: null,
        outcompany: null,
        rectotal: null,
        baid: null
      },
      //细单
      dtlVisiable:true,
      edTitle:"细单",
      edTableHeight:480,
      edDialogWidth:"1000px",
      edDialogTop:"10vh",
      edTableColumns:[
        {indexType:"selection",fixed:"left"},
        {prop:"sadate",label:"开票日期",type:2,sortable:true,width:100,widthStatus:true,tableStatus:0},
        {prop:"sasetdtlid",label:"结算细单ID",type:0,sortable:true,width:140,widthStatus:true,tableStatus:0},
        {prop:"sasetdocid",label:"结算单ID",type:0,sortable:true,width:120,widthStatus:true,tableStatus:0},
        {prop:"goodsid",label:"货品ID",type:0,sortable:true,width:100,tableStatus:0},
        {prop:"goodsname",label:"品名",type:0,sortable:true,width:100,tableStatus:0},
        {prop:"goodstype",label:"规格",type:0,sortable:true,width:90,tableStatus:0},
        {prop:"goodsunit",label:"单位",type:0,sortable:true,width:90,tableStatus:0},
        {prop:"prodarea",label:"产地",type:0,sortable:true,width:100,tableStatus:0},
        {prop:"total_line",label:"金额",type:0,sortable:true,width:100,tableStatus:0,widthStatus:true},
        {prop:"recmoney",label:"已收",type:0,sortable:true,width:100,tableStatus:0,widthStatus:true},
        {prop:"wsje",label:"未收",type:3,fixed:'right',sortable:true,width:150,widthStatus:true,tableStatus:0}
      ],
      edTableData:[],
      edSasetdocid:null,
      edSumTotal:0,
      edArray:[],
      parentIndex:null,
      dtlifsVisiable:false
    }
  },
  created (){
    //加载结算方式下拉框
    //selectDdl(this.tableColumns,'prop','settlemode','AP_SETTLEMODE');
    let notIn=[10];
    selectDdlNotIn(this.tableColumns,'prop','settlemode','AP_SETTLEMODE',notIn);
    //加载银行下拉框
    let params=[];
    let companyid = Number(sessionStorage['companyid']);
    this.$api.hov.query('bankidhov/select',{pageNum:1,pageSize:10000,params:null,zxcolumn2:1}).then(res => {
      if(res.code===200){
        res.data.content.forEach(es => {
          if(companyid === 19940){
            if(es.bankid===201368||es.bankid===210013||es.bankid===202244||es.bankid===474||
              es.bankid===79635||es.bankid===72274||es.bankid===83000||es.bankid===210026||es.bankid===210363){
              let value=es.bankid+'-'+es.bankno+'-'+es.bankname;
              params.push({value:value,label:es.bankname});
            }
          }else if(companyid === 71255){
            if(es.bankid===211949){
              let value=es.bankid+'-'+es.bankno+'-'+es.bankname;
              params.push({value:value,label:es.bankname});
            }
          }
        });
        this.bankOptions=params;
        this.formData.bankid=params[0].value;
      }
    })
    this.tableHeight=(window.innerHeight-260);
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.$refs.doctable.$refs.eltable.doLayout();
    })
  },
  methods:{
    handleQuery(data){
      //查询table
      if(data==='query'){
        //客户限制
        if(this.formData.customid==null){
          alert("客户ID不能为空");
          return;
        }
        this.docLoading=true;
        this.tableData=[];
        //查询请求ajax
        this.$api.financial.selectXssk({customid:this.formData.customid,companyid:Number(sessionStorage['companyid'])}).then(res => {
              if(res.code===200){
                this.tableData=res.data;
                //重新加载表格格式（合计列样式）
                this.$nextTick(() => {
                  this.$refs.doctable.$refs.eltable.doLayout();
                  const totalArray=this.$refs.doctable.totalArray;
                  this.weishouTotal=totalArray.total-totalArray.rectotal;
                  this.weishouTotal=this.weishouTotal.toFixed(2);
                });
                this.customDisabled = true;
                this.docLoading=false;
              }
          }).catch(error=>{
          this.docLoading=false;
        })
      }else if(data==='comfirm'){//确认方法
        //提交限制
        if(this.docArray.length===0){
          alert("表单中没有数据不能收款");
          return;
        }
        let con=confirm("是否确认");
        if(con===false){
          return false
        }
        //获取选中列
        let list = this.docArray.filter(items => {
          if (!this.tableData.includes(items.sasetdocid)) return items;
        });
        let settlemodeLine=[];
        list.forEach(res=>{
          settlemodeLine.push(res.settlemode)
        });
        if(settlemodeLine.indexOf(3)>=0){
          disForm(this.cdhpHov.hovColumns,'id','customid','value',this.formData.customid);
          disForm(this.cdhpHov.hovColumns,'id','companyid','value',Number(sessionStorage.getItem("companyid")));
          this.cdhpDocVisible=true;
        }else{
          this.updateDoc();
        }
      }else if(data==="reset"){
        let formData=this.formData;//查询条件
        formData.customid=null;
        formData.customname=null;
        this.tableData = [];
        this.customDisabled = false;
      }
    },
    updatehov(){
      this.updateDoc();
    },
    updateDoc(){
      //获取选中列
      let list = this.docArray.filter(items => {
        if (!this.tableData.includes(items.sasetdocid)) return items;
      });
      let settlemodeLine=[];
      let totalLine=0;
      list.forEach(res=>{
        settlemodeLine.push(res.settlemode);
        if(res.settlemode===3){
          totalLine=Number(totalLine)+Number(res.duerectotal);
        }
        /*if (list.customid !== this.formData.customid) {
          alert("选择客户ID与表中客户ID不一致");
          return false;
        }*/
      });
      //获取合计列信息
      const totalArray=this.$refs.doctable.totalArray;
      //创建提交信息
      let params={};
      params.customid=Number(this.formData.customid);//客户id
      if(this.formData.bankid!==null&&this.formData.bankid!==""){
        params.bankid=Number(this.formData.bankid.split("-")[0]);//银行id
        params.recaccno=this.formData.bankid.split("-")[1];//银行编码
        params.recbankname=this.formData.bankid.split("-")[2];//银行名称
      }else{
        alert("请选择银行信息");
        return false;
      }
      params.yingshoutotal=Number(totalArray.total);//应收金额合计
      params.yishoutotal=Number(totalArray.rectotal);//已收金额合计
      params.bencitotal=Number(totalArray.duerectotal);//本次金额合计
      params.weishouTotal=Number(this.weishouTotal);//未收金额合计
      params.bcgdtotal=this.sumTotal;//本次勾兑金额
      params.companyid = Number(sessionStorage['companyid']); //公司id
      params.inputmanid=Number(sessionStorage.getItem('userid'));//登陆
      if(settlemodeLine.indexOf(3)>=0){
        if(totalLine.toFixed(2)<=(Number(this.updateDocData.totals)-Number(this.updateDocData.rectotal)).toFixed(2)){
          params.baid=this.updateDocData.baid;
          params.batotal=(Number(this.updateDocData.totals)-Number(this.updateDocData.rectotal)).toFixed(2);
        }else{
          alert('金额必须小于等于承兑汇票可用金额');
          return;
        }
      }
      params.arsaSettleDoclst=[];//创建总单
      list.forEach(e => {
        let ar_sa_receive={};
        ar_sa_receive.sasetdocid=e.sasetdocid;//总单id
        ar_sa_receive.settlemode=e.settlemode;//结算方式
        ar_sa_receive.total=e.total;//应收金额
        ar_sa_receive.rectotal=e.rectotal;//已收金额
        ar_sa_receive.bcgdsettledoctotal=e.duerectotal;//本次金额
        ar_sa_receive.inputmanid=Number(sessionStorage.getItem('userid'));//登陆人
        ar_sa_receive.arSasettleDtllst=[];//创建细单
        if(e.hasOwnProperty('options')){
          e.options.forEach(es => {
            let ar_sarec_dtl={};
            Object.keys(es).forEach(esIndex => {
              ar_sarec_dtl[esIndex]=es[esIndex];
            });
            ar_sa_receive.arSasettleDtllst.push(ar_sarec_dtl);
          })
        }
        params.arsaSettleDoclst.push(ar_sa_receive);
      });
      //确认提交ajax
      this.$api.financial.insertXssk(params).then(res => {
        if(res.code===200){
          if(res.msg==="1") {
            alert('确认成功');
            this.tableData = [];
            this.formData.customid =null;
            this.formData.customname = null;
            this.customDisabled = false;
          }else{
            alert(res.msg);
            return false;
          }
        }
      })
    },
    handle(data){
      //打开细单
      if(data.id==='edit'){
        this.dtlifsVisiable=true;//打开细单
        this.edSasetdocid=data.row.sasetdocid;//总单id
        this.parentIndex=data.index;//列号
        this.docArray.forEach(e=>{
          if(e.sasetdocid===data.row.sasetdocid){
            if(this.sumTotal!==0){
              this.sumTotal=Number(this.sumTotal)-data.row.duerectotal;//本次勾兑合计加载
            }
          }
        });
        this.openDialog();
        this.dtlVisiable=true;
      }
    },
    //关闭细单
    closeEdialog(){
      this.sumTotal=0;
      this.docArray.forEach(e => {
        this.sumTotal=Number(this.sumTotal)+e.duerectotal;
      });
      this.sumTotal=this.sumTotal.toFixed(2);
      this.dtlifsVisiable=false;
    },
    queryHov(data){
      this.queryCustomVisible=true;
    },
    //细单页打开加载方法
    openDialog(){
      this.edSumTotal=0;//细单合计收款金额
      this.edArray=[];//细单选中合集
      //查询细单数据ajax
      this.$api.financial.selectXsskDtl(this.edSasetdocid).then(res => {
        if(res.code===200){
          this.edTableData=res.data;
        }
      })
    },
    //总单勾选
    SelectionChange(data){
      this.docArray=[];//总单勾选合集
      this.sumTotal=0;//本次勾兑金额合计
      data.forEach(e => {
        this.sumTotal=Number(this.sumTotal)+Number(e.duerectotal);
        this.docArray.push(e);
      });
      this.sumTotal=this.sumTotal.toFixed(2);
    },
    //细单勾选
    edSelectionChange(data){
      this.edSumTotal=0;//细单勾选金额合计
      this.edArray=[];//细单勾选合集
      data.forEach(e => {
        this.edSumTotal=this.edSumTotal+Number(e.wsje);
        this.edArray.push(e);
      });
      this.edSumTotal=this.edSumTotal.toFixed(2);
    },
    sumEdChange(){
      this.edSumTotal=0;
      this.edArray.forEach(e => {
        this.edSumTotal=this.edSumTotal+Number(e.wsje);
      });
      this.edSumTotal=this.edSumTotal.toFixed(2);
    },
    //细单提交
    comsum(){
      if(this.edArray.length===0){
        this.$refs.doctable.$refs.eltable.toggleRowSelection(this.tableData[this.parentIndex],false);//勾选总单多选框（列，true）true为勾中false为不勾中
        //this.sumTotal=Number(this.sumTotal)+Number(this.tableData[this.parentIndex].duerectotal);
        this.dtlifsVisiable=false;//关闭细单
      }else{
        this.tableData[this.parentIndex].duerectotal=Number(this.edSumTotal);//细单勾选金额合计回填总单本次金额
        this.tableData[this.parentIndex].options=[];//总单创建细单信息填写数组
        let message={};
        this.edArray.forEach(e=>{
          if(e.wsje===null||e.wsje.length===0){//细单未收金额不能为空限制
            message.flag=false;
            message.msg="细单"+e.sasetdtlid+":金额不能为空";
            return false;
          }else if(e.wsje===0){//细单未收金额不能为0限制
            message.flag=false;
            message.msg="细单"+e.sasetdtlid+":金额不能为0";
            return false;
          }else {
            this.tableData[this.parentIndex].options.push({sasetdtlid:e.sasetdtlid,sasetdocid:e.sasetdocid,bcgdsettledtltotal:e.wsje});//添加细单勾中信息
          }
        });
        if(message.flag===false){
          alert(message.msg);
          return;
        }
        this.sumTotal=Number(this.sumTotal)+Number(this.edSumTotal);//重新计算总单本次勾选金额合计
        this.sumTotal=this.sumTotal.toFixed(2);
        this.$refs.doctable.$refs.eltable.toggleRowSelection(this.tableData[this.parentIndex],true);//勾选总单多选框（列，true）true为勾中false为不勾中
        this.dtlifsVisiable=false;//关闭细单
      }
    }
  }
}
</script>

<style>
  .edTable .el-dialog__wrapper .el-dialog{height:600px;}
  .edTable .el-dialog__wrapper .el-dialog .el-dialog__body{height:480px;overflow-y: auto;overflow-x: hidden;padding:0 10px;}
  .edTable .el-dialog__wrapper .el-dialog .el-dialog__body .el-input__inner{color:black}
  .edTable .el-dialog__wrapper .el-dialog .el-dialog__footer .el-input__inner{color:black}
  .docTable .el-input .el-input__inner{color:black !important;}
</style>
