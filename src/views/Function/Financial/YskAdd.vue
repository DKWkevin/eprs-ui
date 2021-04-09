<template>
  <div class="edialog">
   <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" :title="title" :width="dialogWidth" :top="dialogTop" :destroy-on-close="true" @close="closeEdialog" :close-on-click-modal="false">
      <el-form :model="formData" label-width="100px" :inline="true" label-position="right" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="客户ID" style="width:320px" prop="customid">
          <el-input
            v-model.number="formData.customid"
            disabled="disabled"
            style="width:180px;"
          ></el-input>
          <el-button
            icon="el-icon-search"
            circle
            @click="openHov('customid')"
          ></el-button>
        </el-form-item>
        <el-form-item label="客户名称" style="width:320px">
          <el-input v-model.trim="formData.customname" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="结算方式" style="width:320px">
          <el-select v-model.trim="formData.settlemode" style="width:180px;" @change="selectChange">
            <el-option v-for="op in settlemodeOption" :key="op.value" :value="op.value" :label="op.label"></el-option>
          </el-select>
          <el-button
            icon="el-icon-search"
            circle
            :disabled="settlemodeDisabled"
            @click="openHov('settlemode')"
          ></el-button>
        </el-form-item>
        <el-form-item label="收款类型" style="width:320px">
          <el-select v-model.trim="formData.rectypeid" style="width:200px">
            <el-option :value="4" label="预收"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" style="width:320px" prop="total">
          <el-input v-model="formData.total" style="width:200px;" @input="force"></el-input>
        </el-form-item>
        <el-form-item label="备注" style="width:320px">
          <el-input v-model.trim="formData.summary" style="width:200px;"></el-input>
        </el-form-item>
        <el-divider content-position="left">银行</el-divider>
        <el-form-item label="银行" style="width:320px"  prop="bankid">
          <el-input
            v-model.number="formData.bankid"
            disabled="disabled"
            style="width:180px;"
          ></el-input>
          <el-button
            icon="el-icon-search"
            circle
            @click="openHov('bankid')"
          ></el-button>
        </el-form-item>
        <el-form-item label="银行名称" style="width:320px">
          <el-input v-model.trim="formData.bankname" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="银行帐号" style="width:320px">
          <el-input v-model.trim="formData.bankno" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item style="width:320px"><div></div></el-form-item>
        <el-divider content-position="left" style="clear: both">承兑汇票</el-divider>
        <el-form-item label="交票日" style="width:320px">
          <el-date-picker type="datetime" v-model.trim="formData.credate" disabled="disabled" style="width:200px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="票据类型" style="width:320px">
          <el-input v-model.trim="formData.pjlx" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="出票日" style="width:320px">
          <el-date-picker type="datetime" v-model.trim="formData.outdate" disabled="disabled" style="width:200px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="到期日" style="width:320px">
          <el-date-picker type="datetime" v-model.trim="formData.enddate" disabled="disabled" style="width:200px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="回款银行" style="width:320px">
          <el-input v-model.trim="formData.recbankname" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="票号" style="width:320px">
          <el-input v-model.trim="formData.bano" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="出票行" style="width:320px">
          <el-input v-model.trim="formData.outbankname" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="票据金额" style="width:320px">
          <el-input v-model.number="formData.totals" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="出票单位" style="width:320px">
          <el-input v-model.trim="formData.outcompany" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="已回款金额" style="width:320px">
          <el-input v-model.number="formData.rectotal" disabled="disabled" style="width:200px;"></el-input>
        </el-form-item>
      </el-form>
      <div  slot="footer" style="text-align:center">
          <el-button @click.native="closeEdialog">{{$t('action.cancel')}}</el-button>
          <el-button type="primary" @click.native="submitForm()" :loading="editLoading">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {selectDdlOption, selectDdlOptionNotIn} from "@/utils/functions"
  export default {
    name: 'YskAdd',
    props: {
      formData: {type:Object}
    },
    data () {
      //银行限制（结算方式为2，4，5）
      let checkBank = (rule, value, callback)=>{
        if(this.formData.settlemode===2||this.formData.settlemode===4||this.formData.settlemode===5){
          if(value === null){
            callback(new Error('请选择银行'));
          }else{
            callback();
          }
        }else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        hovData:{},
        editLoading:false,
        rules:{
          customid:{required:true,message:'客户id必填',trigger:'blur'},
          total:[{required:true,message:'金额必填',trigger:'blur'}],
          bankid:{validator:checkBank,trigger:'blur'}
        },
        rulesSatus:false,
        dialogWidth:'800px',
        dialogTop:'12vh',
        title:'新增预收款',
        settlemodeDisabled:true,
        bankdisabled:true,
        settlemodeOption:[]
      }
    },
    created(){
      //this.settlemodeOption=selectDdlOption('AP_SETTLEMODE');
      this.settlemodeOption=selectDdlOptionNotIn('AP_SETTLEMODE',[10]);//结算方式初始化
    },
    mounted(){
      this.dialogVisible=true;
    },
    methods:{
      force(){
        this.$forceUpdate()
      },
      openHov(id){
        this.$emit('openHov',id);
      },
      selectChange(val){
        if(val===3){
          this.formData.bankid=null;
          this.formData.bankname=null;
          this.formData.bankno=null;
          this.settlemodeDisabled=false;
          this.bankdisabled=true;
        }else if(val===2||val===4||val===5){
          this.formData.credate=null;
          this.formData.pjlx=null;
          this.formData.outdate=null;
          this.formData.enddate=null;
          this.formData.recbankname=null;
          this.formData.bano=null;
          this.formData.outbankname=null;
          this.formData.totals=null;
          this.formData.outcompany=null;
          this.formData.rectotal=null;
          this.formData.baid=null;
          this.settlemodeDisabled=true;
          this.bankdisabled=false;
        }else{
          this.formData.bankid=null;
          this.formData.bankname=null;
          this.formData.bankno=null;
          this.formData.credate=null;
          this.formData.pjlx=null;
          this.formData.outdate=null;
          this.formData.enddate=null;
          this.formData.recbankname=null;
          this.formData.bano=null;
          this.formData.outbankname=null;
          this.formData.totals=null;
          this.formData.outcompany=null;
          this.formData.rectotal=null;
          this.formData.baid=null;
          this.settlemodeDisabled=true;
          this.bankdisabled=true;
        }
      },
      updateHov(data){
        for(let i=0;i<data.length;i++){
          this.formData[data[i].id]=data[i].value;
        }
        this.backfunction();
      },
      handle(){},
      closeEdialog(){
        this.$emit('closeDialog');
      },
      submitForm(){
        this.$refs.ruleForm.validate((vaild) => {
          if(vaild){
            this.$emit('submitForm',{data:this.formData});
          }else{
            return false;
          }
        })
      }
    }
  }
</script>

<style>
  .edialog .el-dialog__wrapper .el-dialog{height:600px;}
  .edialog .el-dialog__wrapper .el-dialog .el-dialog__body{height:450px;overflow-y: auto;overflow-x: hidden;padding:20px;}
  .edialog .el-dialog__wrapper .el-dialog .el-dialog__body .el-input__inner{color:black}
  /*.edialog .el-dialog__wrapper .el-dialog .el-dialog__footer{padding-top:20px}*/
  /*.edialog .el-form-item__content{float:left;}*/
</style>
