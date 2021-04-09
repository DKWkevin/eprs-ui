<template>
<div class="cgddgoods">
  <el-dialog
    v-if="dtlVisible"
    :visible.sync="dtlVisible"
    :width="dialogWidth"
    :top="dialogTop"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="dialogClose"
  >
  <el-table :data="tableData" border :height="docHeight"  :header-cell-style="headerStyle" v-loading="loading">
    <el-table-column prop="prioritiesno" label="优先级" width="30"></el-table-column>
    <el-table-column prop="goodsid" label="货品ID" sortable></el-table-column>
    <el-table-column prop="goodsname" label="品名" sortable></el-table-column>
    <el-table-column prop="goodstype" label="规格" ></el-table-column>
    <el-table-column prop="prodarea" label="产地" sortable></el-table-column>
    <el-table-column prop="goodsunit" label="单位" width="50"></el-table-column>
    <el-table-column prop="baseunitqty" label="大包" width="50"></el-table-column>
    <el-table-column prop="zydb" label="直营上月调拨" width="50"></el-table-column>
    <el-table-column prop="txdb" label="特许上月调拨" width="50"></el-table-column>
    <el-table-column prop="qqdb" label="前期调拨"></el-table-column>
    <el-table-column prop="syxl" label="上月销" width="60"></el-table-column>
    <el-table-column prop="qqxl" label="前期销" width="60"></el-table-column>
    <el-table-column prop="lskc" label="连锁库存" width="70">
      <template slot-scope="scope">
        <div :class="[scope.row.lskc===0?reds:'']">{{scope.row.lskc}}</div>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="单价"  width="60"></el-table-column>
    <el-table-column prop="number" label="数量" width="80" >
      <template slot-scope="scope">
        <el-input :ref="'number'+scope.$index" v-model.number="scope.row.number" @change="numberChange()" @keyup.native="keyDownCom($event,'number', scope.$index)"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="htsl" label="连锁有效合同" width="50" ></el-table-column>
    <el-table-column prop="pfyxht" label="批发有效合同" width="50" ></el-table-column>
    <el-table-column prop="zxcolumn1" label="说明" width="150" >
      <template slot-scope="scope">
        <el-input :ref="'zxcolumnSm'+scope.$index" v-model="scope.row.zxcolumn1"  @keyup.native="keyDownCom($event,'zxcolumnSm', scope.$index)"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="zxcolumn2" label="安全库存" width="100" >
      <template slot-scope="scope">
        <el-input :ref="'zxcolumnAq'+scope.$index" v-model.number="scope.row.zxcolumn2"  @keyup.native="keyDownCom($event,'zxcolumnAq', scope.$index)"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="pfkc" label="批发库存" width="80" ></el-table-column>
    <el-table-column prop="bz" label="备注">
      <template slot-scope="scope">
        <el-input :ref="'bz'+scope.$index" v-model="scope.row.bz" @keyup.native="keyDownCom($event,'bz', scope.$index)"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="dqkc" label="地区库存" ></el-table-column>
    <el-table-column prop="lxr" label="通讯录" width="150" >
      <template slot-scope="scope">
        <select v-model="scope.row.lxrdh" @click="lxrClick(scope.row)" @change="lxrChange($event,scope.row)" class="selectChange">
          <option v-for="(item,index) in scope.row.option" :key="index" :value="item.value">{{item.label}}</option>
        </select>
        <!--<el-select v-model="scope.row.lxrdh" @change="lxrChange(scope.row)">
          <el-option v-for="(item,index) in lxrOptions" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>-->
      </template>
    </el-table-column>
    <el-table-column prop="lxrdh" label="电话" width="120" ></el-table-column>
    <el-table-column prop="daysales" label="日均销" ></el-table-column>
    <el-table-column prop="useup" label="上限" ></el-table-column>
    <el-table-column prop="usedown" label="下限" ></el-table-column>
    <el-table-column prop="nesstype" label="省级必备" ></el-table-column>
    <el-table-column prop="ddlname" label="付款方式" ></el-table-column>
    <el-table-column prop="sfjjx" label="是否季节性品" width="100" ></el-table-column>
  </el-table>
    <div slot="footer">
      <div style="float:left;">
        <el-form :inline="true">
          <el-form-item label="合计金额">
            {{total}}
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="insert" :loading="saveloading">保存</el-button>
        <el-button type="info" @click="dialogClose">取消</el-button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
//生成采购订单
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import ETable from "@/views/Core/ETable";
import {disForm, exportExcelDOM, getNewDate, selectDdl} from "@/utils/functions"
export default {
  name: 'CgddGoods',
  props:{
    dtlData:{type:Object}
  },
  components:{ETable, HovTools, EQuery},
  data(){
    return{
      tableHeight:0,
      tableData:[],
      dtlVisible:false,
      dialogWidth:'100%',
      dialogTop:'0',
      dialogTitle:'',
      docHeight:'100%',
      total:0,
      lmcompanyid:null,
      supplyid:null,
      loading:false,
      saveloading:false
    }
  },
  created(){
    this.selectDoc();
  },
  mounted(){
    this.dtlVisible=true;
  },
  methods:{
    selectDoc(){
      let params={};
      Object.keys(this.dtlData).forEach(e=>{
        if(this.dtlData[e]!==null&&this.dtlData[e]!==""){
          params[e]=this.dtlData[e];
        }
      });
      this.lmcompanyid=this.dtlData.lmcompanyid;
      this.supplyid=this.dtlData.supplyid;
      this.loading=true;
      this.$api.ordermanagement.selectCgddglGoods(params).then(res => {
        if(res.code === 200){
          let params=[];
          res.data.forEach(e=>{
            e.option=this.selectlxrs(e.goodsid);
            params.push(e);

          });
          this.tableData=params;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    insert(){
      let data=this.tableData;
      let params=[];
      let employeeid=Number(sessionStorage['userid']);
      let employeename=sessionStorage['username'];
      let companyid=Number(sessionStorage['companyid']);
      let lmcompanyid=this.lmcompanyid;
      let supplyid=this.supplyid;
      let flag=true;
      data.forEach(e => {
        if(isNaN(e.zxcolumn2)){
          alert("安全库存必须为数字");
          flag=false;
        }
        let tel={};
        tel.buyerid=employeeid;
        tel.buyer=employeename;
        tel.sudeptid=lmcompanyid;
        tel.companyid=companyid;
        tel.lmcompanyid=lmcompanyid;
        tel.supplyid=supplyid;
        tel.paymode=e.ddlid;
        tel.payterm=e.payterm;
        if (e.ddlid === 4)
        {
          tel.salesmode = "代销";
        } else
        {
          tel.salesmode = "经销";
        }
        tel.inputmanid=employeeid;
        tel.confirmmanid=employeeid;
        tel.memo=e.bz;
        tel.channelid=e.channelid;
        tel.goodsid=e.goodsid;
        let number=0;
        if(e.number!==null&&e.number!==""&&e.number!==undefined){
          number=Number(e.number);
        }else{
          number=0;
        }
        tel.planqty=number;
        tel.realqty=number;
        tel.unitprice=e.price;
        tel.total_lines=e.price*number;
        tel.dtlmemo=e.bz;
        tel.contactman=e.lxr;
        tel.zxcolumn1=e.zxcolumn1;//说明
        tel.zxcolumn2=e.zxcolumn2;//安全库存
        params.push(tel);
      });
      if(flag===false){
        return false;
      }
      this.saveloading=true;
      this.$api.ordermanagement.insertCgddglGoods({data:params}).then(res => {
        if(res.code === 200){
          if(res.msg.split("-")[0]==="1"){
            alert("生成成功,单号是"+res.msg.split("-")[1]);
            this.saveloading=false;
            //this.dialogClose();
          }else{
            alert(res.msg);
            this.saveloading=false;
            return false;
          }
        }
      }).catch(error => {
        this.saveloading=false;
        return false;
      })
    },
    numberChange(){
      this.total=0;
      this.tableData.forEach(e => {
        let number=0;
        if(e.number!==null&&e.number!==""&&e.number!==undefined){
          number=Number(e.number);
        }else{
          number=0;
        }
        this.total=this.total+(Number(e.price)*number);
      })
    },
    dialogClose(){
      this.dtlVisible=false;
      this.$parent.dtlVisible=false;
    },
    returnValue(data){
      return data !== null && data !== "";
    },
    lxrChange(e,data){
      data.option.forEach(e=>{
        if(e.value===data.lxrdh){
          data.lxr=e.label;
        }
      })
    },
    lxrClick(data){
      if(data.option.length===0){
        this.$api.ordermanagement.selectCgddgllxr({goodsid:data.goodsid}).then(res => {
          if(res.code === 200){
            data.option.push({value:'',label:''});
            res.data.forEach(e => {
              let tel={};
              tel.value=e.mobilephone;
              tel.label=e.contactman;
              data.option.push(tel);
            })
          }
        }).catch(error => {
          return false;
        })
      }
    },
    selectlxrs(goodsid){
        let params=[];
        this.$api.ordermanagement.selectCgddgllxr({goodsid:goodsid}).then(res => {
          if(res.code === 200){
            params.push({value:'',label:''});
            res.data.forEach(e => {
              let tel={};
              tel.value=e.mobilephone;
              tel.label=e.contactman;
              params.push(tel);
            });
          }
        }).catch(error => {
          return false;
        });
      return params;
    },
    headerStyle({row,rowIndex}){
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    },
    keyDownCom(e,className,index){
      if(e.keyCode === 38){
        let newClassName =className + (index - 1);
        this.$refs[newClassName].focus();
      }
      if(e.keyCode === 40){
        let newClassName =className + (index + 1);
        this.$refs[newClassName].focus();
      }
    }
  },
}
</script>

<style scoped>
  .cgddgoods >>> .el-dialog{width:100%;height:100%;margin:0}
  .cgddgoods >>> .el-dialog__header{background:#f9f9f9;border-bottom: 1px solid #3a3a3a;}
  .cgddgoods >>> .el-dialog__body{width:100%;height:calc(100% - 120px);padding:0;padding-top:2px;}
.selectChange{width:100%;height:30px;border:1px solid #ccc;border-radius:5px;}
  .cgddgoods >>> .cell {
    /*text-align: center;*/
    white-space: pre-line;/*保留换行符*/
    display: block !important;
  }
  .cgddgoods >>> .el-dialog__headerbtn{font-size:23px;top:0}
  .reds{color:red}
</style>
