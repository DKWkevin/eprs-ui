<template>
<div class="SpjxxxDialog">
  <el-dialog :visible="dtlVisible" :width="dialogWidth" @close="closeDialog">
    <el-form :model="formData" label-width="150px" :label-position="labelPosition" style="width:500px;margin:0 auto">
      <el-form-item  v-if="type==='1'" label="是否所有客户" key="type" style="float:left;">
        <el-radio-group v-model="ifsykh" @change="handleCheckType">
         	<el-radio-button :label="1">是</el-radio-button>
         	<el-radio-button :label="0">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="type==='1'&&ifsykh==='0'" label="客户ID" key="companyid" >
        <el-input disabled="disabled" v-model="formData.card_companyid" style="float:left;width:150px;margin-right:5px;"></el-input>
        <el-input disabled="disabled" v-model="formData.card_companyname" style="float:left;width:150px;"></el-input>
        <el-button circle class="el-icon-search" @click="myCompany()"></el-button>
      </el-form-item>
      <el-form-item v-if="type==='2'" label="限定类型" key="type">
        <el-radio-group v-model="formData.type" @change="handleCheckType">
         	<el-radio-button :label="2">按地区</el-radio-button>
         	<el-radio-button :label="1">按门店</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="type==='2'&&formData.type!==1" label="门店类型" key="companytype" style="margin-bottom:5px;">
       <el-radio-group size="mini" v-model="formData.companytype"  @change="handleCompanyType">'
             <el-radio-button v-if="formData.type===2" :label="3">全部</el-radio-button>
            <el-radio-button :label="1">直营</el-radio-button>
            <el-radio-button :label="2">加盟</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item  v-if="formData.type===2&&(formData.companytype===3||formData.companytype===1||formData.companytype===2)">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkform" class="checkboxGroup" @change="handleCheckedCity">
          <el-checkbox style="display:block" v-for="city in options" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="formData.type===1" style="margin-bottom:5px;">
        <el-input type="text" disabled="disabled" v-model="formData.checkformid" style="float:left;width:150px;margin-right:5px;"></el-input>
        <el-input type="text" disabled="disabled" v-model="formData.checkformname" style="float:left;width:150px;"></el-input>
        <input type="hidden" v-model="formData.mdtype">
        <el-button circle class="el-icon-search" @click="mycheck()"></el-button>
      </el-form-item>
      <el-form-item v-if="type==='2'||type==='1'" label="禁销限销" key="jxorxx" style="margin-bottom:5px;">
      <el-radio-group v-model="formData.jxorxx">
         	<el-radio-button :label="1">禁销</el-radio-button>
         	<el-radio-button :label="2">限销</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="(type==='2'||type==='1')&&formData.type!=='2'" label="最大请货数量" key="goodsqty" style="margin-bottom:5px;">
      <el-input v-model.string="formData.goodsqty" :clearable="true" :disabled="(type===1&&formData.jxorxx===1)||(formData.type===1&&formData.jxorxx===1)" style="width:80%;" placeholder="如果想限制数量,请填写"></el-input>
      </el-form-item>
      <el-form-item v-if="type==='2'||type==='1'" label="备注" key="memo">
      <el-input v-model.string="formData.memo" :clearable="true" style="width:80%;"></el-input>
      </el-form-item>
      <el-form-item v-if="type==='2'" label="是否禁止批发请货" key="ifs">
      <el-checkbox v-model="formData.ifs"></el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button  type="primary" @click="addDoc">保存</el-button>
      <el-button  type="primary" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="counterVisible" :hov-data="counterHov"></hov-tools>
  <hov-tools v-if="customVisible" :hov-data="customHov"></hov-tools>
</div>
</template>

<script>
import HovTools from "@/views/Core/HovTools";
import {selectCityid} from "@/utils/drops";
export default {
  name: 'SpjxxxDialog',
  components:{HovTools},
  props:{
    dialogTitle:{type:String},
    type:{type:String},
    goodsid:{type:Number}
    },
  data () {
    return {
      dtlVisible:false,
      dialogWidth:'700px',
      labelPosition:'right',
      formData:{
        companyid:'',
        companytype: 0,
        jxorxx:0,
        goodsqty:"",
        type:0,
        memo:'',
        ifs:false,
        checkformid:"",
        checkformname:"",
        mdtype:"",
        card_companyid:"",
        card_companyname:''
      },
      ifsykh:0,
      checkform:[],
      checkAll:false,
      isIndeterminate:false,
      options:[],
      btnStatus:false,
      counterVisible:false,
      counterHov:{
        hovTitle:'门店查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'counterVisible',
        hovColumns:
          [
            {id: "companyid", name: "门店ID",queryStatus:true,dataStatus:2,fillid:"checkformid"},
            {id: "companyname", name: "门店名称",queryStatus:true,dataStatus:1,fillid:"checkformname"},
            {id: "companyopcode", name: "门店操作码",queryStatus:true,dataStatus:1},
            {id: 'mdtype', name: '门店类型',queryStatus:false,dataStatus:1,fillid:'mdtype'},
          ]
      },
      customVisible:false,
      customHov:{
        hovTitle:'客户查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'customVisible',
        hovColumns:
          [
            {id: "companyid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"card_companyid"},
            {id: "companyname", name: "客户名称",queryStatus:true,dataStatus:1,fillid:'card_companyname'},
            {id: "companyopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  created(){
    this.options=selectCityid();
  },
  mounted(){
    this.dtlVisible=true;
  },
  methods:{
    addDoc(){
      var data={};
      data.goodsid=this.goodsid;
      if(this.formData.jxorxx===0){
        alert("请选择禁销限销");
        return;
      }
      if(this.quKong(this.formData.goodsqty)===""||this.formData.jxorxx==="1"){
        data.goodsqty=0;
      }else{
        data.goodsqty=Number(this.formData.goodsqty);
      }
      if(this.type==="2"){//连锁
        if(this.formData.type===0){
          alert("请选择按门店或按地区");
          return;
        }else{
          data.type=this.formData.type;
        }
        if(this.formData.type==="2"){//按地区
          if(this.checkform.length===0){
            alert("请选择地区");
            return;
          }
          if(this.checkAll===true){//全选
            data.companyid=0;
            data.jxorxx=2;
          }else{//非全选
            data.companyid=this.checkform.toString();
            data.jxorxx=Number(this.formData.jxorxx);
          }
          if(this.formData.companytype===0){
            alert("请选择门店类型");
            return;
          }else{
            data.companytype=Number(this.formData.companytype);
          }
        }else if(this.formData.type==="1"){//按门店
          var com=this.formData.checkformid;
          if(com===""){
            alert("请选择门店");
            return;
          }
          data.companyid=com;
          data.companytype=this.formData.mdtype;
          data.jxorxx=Number(this.formData.jxorxx);
        }
        if(this.formData.ifs===true){
          data.ifs=1;
        }else{
          data.ifs=0;
        }
      }else if(this.type==="1"){//批发
        data.companytype=0;
        var companyid=this.formData.card_companyid;
        if(this.ifsykh===1){
          data.companyid=0;
        }else{
          if(companyid!==""){
            data.companyid=companyid;
          }else{
            alert("请填写客户ID");
            return;
          }
        }
        data.jxorxx=Number(this.formData.jxorxx);
        data.type=1;
      }
      data.memo=this.formData.memo;//备注
      this.$api.spjxxx.insert(data).then(function(res){
        if(res.code===200){
          if(res.data===1){
            alert("保存成功");
            this.closeDialog();
          }else{
            alert(res.msg);
            return false;
          }
        }
      });
    },
    handleCheckType(){
      this.formData.companytype=0;
      this.checkAll=false;
      this.isIndeterminate=false;
      this.checkform.splice(0,this.checkform.length);
    },
    mycheck(){
      this.counterVisible=true;
    },
    myCompany(){
      this.customVisible=true;
    },
    handleCheckAllChange(val){
      if(val===true){
        for(var i=0;i<this.options.length;i++){
          this.checkform.push(this.options[i].value);
        }
        this.checkAll=true;
      }else{
        this.checkform.splice(0,this.checkform.length);
        this.checkAll=false;
      }
      this.isIndeterminate=false;
    },
    handleCheckedCity(value){
      var checkedCount=value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
    },
    handleCompanyType(){
      if(this.formData.type===1){
        this.formData.checkformid="";
        this.formData.checkformname="";
      }
    },
    closeDialog(){
      this.dtlVisible=false;
      this.$parent.dtlVisible=false;
    },
    quKong(str){
      return str.replace(/\s+/g,"");
    }
  }
}
</script>

<style scoped>
  .SpjxxxDialog >>> .el-dialog__body{padding:0 2px 0 2px;height:400px;width:97%;margin:0 auto;}
</style>
