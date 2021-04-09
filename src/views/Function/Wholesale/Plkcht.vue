<template>
<div style="background:#eee;width:100%;height:100%;">
  <div class="navbox">
    <div class="topnav">
      <el-form :inline="true">
        <el-form-item label="转入部门">
          <el-select v-model="formData.todeptid" clearable value-key="value">
            <el-option value="83670" label="采购业务部"></el-option>
            <el-option value="94965" label="批发采购"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转出部门">
          <el-select v-model="formData.fromdeptid" clearable value-key="value">
            <el-option value="83670" label="采购业务部"></el-option>
            <el-option value="94965" label="批发采购"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转出保管单位">
          <el-select v-model="formData.stcompanyid" clearable value-key="value">
            <el-option value="7" label="7号库"></el-option>
            <el-option value="13" label="13号库"></el-option>
            <el-option value="40" label="40号库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据状态">
          <el-select v-model="formData.usestatus" clearable value-key="value">
            <el-option value="0" label="作废"></el-option>
            <el-option value="1" label="转出"></el-option>
            <el-option value="2" label="完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转出时间">
          <el-date-picker type="datetime" v-model="formData.startdate"></el-date-picker>
          <el-date-picker type="datetime" v-model="formData.endofdate"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div style="background:#eee;width:100%;height:3px;"></div>
    <div class="seachbox">
      <el-form :inline="true">
        <el-form-item label="货品ID">
          <el-checkbox style="float:left;" v-model="formData.check"></el-checkbox>
          <el-input  style="float:left;width:200px;margin-left:5px;" v-model="formData.goodsid" placeholder="货品ID"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button type="primary" icon="fa fa-search" label="查询" perms="wholesale:plkcht:select" @click="selectDoc"></kt-button>
          <kt-button type="success" icon="fa fa-plus" label="新增" perms="wholesale:plkcht:add" @click="plkchtAdd"></kt-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="mainbox">
    <div v-for="(item,index) in data" :key="index" class="docdiv">
      <div>
        <div class="boldFont">货品ID:<span style="font-weight: normal;">{{item.goodsid}}</span></div>
        <div class="boldFont" style="width:60%;">货品名称:<span style="font-weight: normal;">{{item.goodsname}}</span></div>
        <div class="normalFont" style="clear: both">ID:<span style="font-size: 14px;color:#525252">{{item.id}}</span></div>
        <div class='normalFont'>录入时间:<span style="font-size: 14px;color:#525252">{{item.credate}}</span></div>
        <div class='normalFont'>转出部门ID:<span style="font-size: 14px;color:#525252">{{item.fromdeptid}}</span></div>
        <div class='normalFont'>转出部门:<span style="font-size: 14px;color:#525252">{{item.fromdeptname}}</span></div>
        <div class='normalFont'>转出部门业务员:<span style="font-size: 14px;color:#525252">{{item.fromsalername}}</span></div>
        <div class='normalFont'>转出操作人:<span style="font-size: 14px;color:#525252">{{item.fromemployeename}}</span></div>
        <div class='normalFont'>转入部门:<span style="font-size: 14px;color:#525252">{{item.todeptname}}</span></div>
        <div class='normalFont'>转入部门业务员:<span style="font-size: 14px;color:#525252">{{item.tosalername}}</span></div>
        <div class='normalFont'>转入确认人:<span style="font-size: 14px;color:#525252">{{item.toemployeename}}</span></div>
        <div class='normalFont'>确认时间:<span style="font-size: 14px;color:#525252">{{item.comfirmdate}}</span></div>
        <div class='normalFont'>作废时间:<span style="font-size: 14px;color:#525252">{{item.invalidate}}</span></div>
        <div class='normalFont'>作废人:<span style="font-size: 14px;color:#525252">{{item.invalidmanname}}</span></div>
        <div class='normalFont'>状态:<span style="font-size: 14px;color:#525252">{{item.usestatusname}}</span></div>
        <div class='normalFont'>税率:<span style="font-size: 14px;color:#525252">{{item.taxrate}}</span></div>
        <div class='normalFont'>转移单价:<span style="font-size: 14px;color:#525252">{{item.salesprice}}</span></div>
        <div class='normalFont'>转移成本单价:<span style="font-size: 14px;color:#525252">{{item.costprice}}</span></div>
        <div class='normalFont'>转移金额:<span style="font-size: 14px;color:#525252">{{item.total}}</span></div>
        <div class='normalFont'>转移收入:<span style="font-size: 14px;color:#525252">{{item.salesin}}</span></div>
        <div class='normalFont'>转移成本:<span style="font-size: 14px;color:#525252">{{item.costingmoney}}</span></div>
        <div class='normalFont'>转移毛利:<span style="font-size: 14px;color:#525252">{{item.gprofit}}</span></div>
        <div class='normalFont'>批号ID:<span style="font-size: 14px;color:#525252">{{item.lotid}}</span></div>
        <div class='normalFont'>转出外部批次ID:<span style="font-size: 14px;color:#525252">{{item.fromoutbatchid}}</span></div>
        <div class='normalFont'>转出内部批次ID:<span style="font-size: 14px;color:#525252">{{item.frominbatchid}}</span></div>
        <div class='normalFont'>转入外部批次ID:<span style="font-size: 14px;color:#525252">{{item.tooutbatchid}}</span></div>
        <div class='normalFont'>转入内部批次ID:<span style="font-size: 14px;color:#525252">{{item.toinbatchid}}</span></div>
        <div class='normalFont'>移出货品状态ID:<span style="font-size: 14px;color:#525252">{{item.fromstatusid}}</span></div>
        <div class='normalFont'>移入货品状态ID:<span style="font-size: 14px;color:#525252">{{item.tostatusid}}</span></div>
        <div class='normalFont'>转出数量:<span style="font-size: 14px;color:#525252">{{item.goodsqty}}</span></div>
        <div class='normalFont'>保管单位:<span style="font-size: 14px;color:#525252">{{item.stcompanyid}}</span></div>
        <div class='normalFont'>实际转入数量:<span style="font-size: 14px;color:#525252">{{item.realqty}}</span></div>
        <div class='normalFont'>效期:<span style="font-size: 14px;color:#525252">{{item.invaliddate}}</span></div>
        <div v-if="item.usestatus===1" class='buttonbox'>
          <div v-if="item.todeptid===83670||item.todeptid===83672">
            <el-button v-if="deptid===83670||deptid===83672" type="danger" round @click="confirmsaler(item.id,item.stcompanyid)">确认</el-button>
            <el-button v-else type="primary" round @click="invalid(item.id)">作废</el-button>
          </div>
          <div v-else>
            <el-button v-if="deptid===item.todeptid" type="danger" round @click="confirmsaler(item.id,item.stcompanyid)">确认</el-button>
            <el-button v-else type="primary" round @click="invalid(item.id)">作废</el-button>
          </div>
        </div>
        <div v-else-if="item.usestatus===2" class='buttonbox'></div>
        <div v-else class='buttonbox'></div>
      </div>
    </div>
  </div>
  <plkcht-add v-if="plkchtAddVisible"></plkcht-add>
  <div v-if="conVisible">
    <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth" :top="dialogTop" :destroy-on-close="true" @close="docClose" :close-on-click-modal="false">
      <div>
        <div>
          转入部门业务员：
          <el-autocomplete v-model="formsaler" :fetch-suggestions="querySuggest" :trigger-on-focus="false"></el-autocomplete>
        </div>
        <div style='clear: both;width: 100%;text-align: center;padding-top: 5px;font-weight:bold'>是否确认</div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="docClose">取消</el-button>
        <el-button type="primary" @click="confirmccgc">确认</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>

import PlkchtAdd from "@/views/Function/Wholesale/PlkchtAdd";
import KtButton from "@/views/Core/KtButton";
export default {
  name: 'Plkcht',
  components:{KtButton, PlkchtAdd},
  data(){
    return {
      formData:{
        todeptid:null,
        fromdeptid:null,
        stcompanyid:null,
        usestatus:null,
        startdate:null,
        endofdate:null,
        check:false,
        goodsid:null
      },
      deptid:Number(sessionStorage['deptid']),
      inputmanid:Number(sessionStorage['userid']),
      data:[
        {
          "goodsid": "444",
          "goodsname": "e复方氨酚烷胺片(感康)",
          "id": "1910",
          "credate": "2019-11-11 15:36:16",
          "fromdeptid": "83672",
          "fromdeptname": "零售采购",
          "fromsalerid": "354",
          "fromsalername": "王宏梅",
          "todeptid": "94965",
          "todeptname": "批发采购",
          "tosalerid": "",
          "tosalername": "",
          "toemployeename": "",
          "comfirmdate": "",
          "invalidate": "2019-11-11 15:36:23",
          "invalidmanname": "王宏梅",
          "usestatusname": "作废",
          "usestatus": "0",
          "taxrate": ".13",
          "salesprice": "10.98",
          "costprice": "9.72",
          "total": "10.98",
          "salesin": "9.72",
          "costingmoney": "9.72",
          "gprofit": "0",
          "lotid": "2000450721",
          "fromoutbatchid": "3267203",
          "frominbatchid": "151829401",
          "tooutbatchid": "",
          "toinbatchid": "",
          "fromstoreid": "",
          "tostoreid": "",
          "fromposid": "",
          "toposid": "",
          "fromstatusid": "可销",
          "tostatusid": "",
          "stcompanyid": "7",
          "goodsqty": "1",
          "fromemployeename": "王宏梅",
          "realqty": "",
          "invaliddate": "2022-07-31 00:00:00"
        }
      ],
      plkchtAddVisible:false,
      conVisible:false,
      dialogVisible:true,
      docTitle:'',
      dialogWidth:'400px',
      dialogTop:'12vh',
      salerOption:[],
      formsaler:null,
      id:null,
      stcompanyid:null
    }
  },
  methods:{
    selectDoc(){
      let formData=this.formData;
      let params={};
      Object.keys(formData).forEach(e=>{
        if(e!=="check"&&e!=="querydate"){
          if(formData[e]!==null&&formData[e]!==""){
            params[e]=formData[e];
          }
        }
      });
      if(formData.querydate!==null&&formData.querydate!==""){
        params.startdate=formData.querydate[0];
        params.endofdate=formData.querydate[1];
      }
      if(formData.check!==null&&formData.check!==""&&formData.check===true){
        params.check=1;
      }else {
        params.check=0;
      }
     this.$api.wholesale.selectPlkcht({params:params}).then(res => {
        if(res.code===200){
          this.data=res.data;
        }
      }).catch(error => {
        return false;
      })
    },
    plkchtAdd(){
      this.plkchtAddVisible=true;
    },
    confirmsaler(id,stcompanyid){
      this.id=id;
      this.stcompanyid=stcompanyid;
      this.conVisible=true;
    },
    confirmccgc(){
      let params={};
      params.id=this.id;
      let tosalerid=null;
      this.salerOption.forEach(e=>{
        if(this.formsaler===e.value){
          tosalerid=e.label;
        }
      });
      params.tosalerid=tosalerid;
      params.tosalerid=this.stcompanyid;
      this.$api.wholesale.plkchtConfirm(params).then(res => {
        if(res.code===200){
          if(res.data===1){
            alert("作废成功");
          }else{
            alert(res.msg);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    invalid(id){
      let params={};
      params.id=id;
      params.inputmanid=this.inputmanid;
      let con = confirm("是否作废");
      if(con===true){
        this.$api.wholesale.plkchtupdateinvalid(params).then(res => {
          if(res.code===200){
            if(res.data===1){
              alert("作废成功");
            }else{
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      }else{
        return false;
      }
    },
    querySuggest(queryString,cb){
      this.$api.wholesale.selectsaler(queryString).then(res => {
        if(res.code===200){
          this.salerOption=res.data;
          cb(res.data);
        }
      }).catch(error => {
        return false;
      })
    },
    docClose(){
      this.formsaler=null;
      this.id=null;
      this.stcompanyid=null;
      this.conVisible=false;
    }
  }
}
</script>

<style scoped>
.navbox{width:100%;height:120px;background:linear-gradient(white, #fdfdfd)}
  .topnav{width:100%;padding-top:5px;margin:0 auto;height:70px;}
  .topnav >>> .el-form-item{margin-bottom: 2px;}
  .seachbox{width:100%;clear:both;margin:0 auto;padding:5px 0;}
  .mainbox{width:98%;margin:10px auto;background: white;border-radius: 3px; overflow: auto;height:calc(100% - 140px);}
  .docdiv{width:96%;float:left;margin:20px 2% 0 2%;height:280px;background:white;border:1px solid #ccc;border-radius:8px;box-shadow: 0 0 3px #888;}
  .mainbox >>> .boldFont{float:left;font-size: 20px;width:200px;font-weight: bold;font-family: '宋体',serif;margin:5px 5px 5px 20px;text-align: left}
  .mainbox >>> .normalFont{float:left;margin:5px 5px 5px 20px;font-family: '宋体',serif;text-align: left;font-size:13px;color:#aaa;width:200px;}
  .mainbox >>>.buttonbox{float:right;clear: both;margin:5px 10px;}
</style>
