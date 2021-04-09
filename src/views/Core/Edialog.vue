<template>
<div class="edialog">
<el-dialog :visible.sync="dialogVisible" :title="title" :width="dialogWidth" :top="dialogTop" :destroy-on-close="true" @close="closeEdialog" :close-on-click-modal="false" @open="openDialog">
  <el-form :model="formData" :label-width="labelWidth" :inline="inline" label-position="right" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <!--表单渲染-->
    <el-form-item v-for="list in formList" :key="list.id" :label="list.label" :prop="list.id" style="width:320px;">
      <!--输入框Sting-->
        <el-input v-if="list.type==='input'"
          v-model.trim="formData[list.id]"
          :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
          :clearable="list.clearable"
          style="width:200px;float:left;"
          @input="force"
        ></el-input>
      <!--输入框Number-->
        <el-input v-else-if="list.type === 'inputNumber'"
          v-model.number="formData[list.id]"
          :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
          :clearable="list.clearable"
          @input="force"
          style="width:200px;float:left;"
        ></el-input>
      <!--输入框hov-->
      <template v-else-if="list.type === 'inputHov'" style="width:200px;float:left;">
        <el-input
          v-model.trim="formData[list.id]"
          disabled="disabled"
          :clearable="list.clearable"
          style="width:180px;"
          @input="force"
        ></el-input>
        <el-button
          icon="el-icon-search"
          circle
          :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
          @click="openHov(list.id)"
        ></el-button>
      </template>
      <!--下拉框正常-->
        <el-select v-model.trim="formData[list.id]" v-else-if="list.type === 'select'"
                   :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
                :clearable="list.clearable" @change="selectChangeVal(list.id,formData[list.id])"
        >
          <el-option v-for="item in list.options" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
        </el-select>
      <!--下拉框带名称框-->
      <template v-else-if="list.type === 'selectName'" style="width:200px;float:left;">
        <el-select v-model.trim="formData[list.id]"
                   :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
                :clearable="list.clearable"
                @change="selectChange($event)"
        >
          <el-option v-for="item in list.options" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
        </el-select>
        <input v-model.trim="formData[list.dataName]" disabled="disabled"></input>
      </template>
      <!--下拉框特殊情况-->
      <template v-else-if="list.type === 'selectHov'" style="width:200px;float:left;">
        <el-select v-model.trim="formData[list.id]"
                   :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
                   :clearable="list.clearable"
                   @change="selectChange($event,list)"
                   style="width:180px;"
        >
          <el-option v-for="item in list.options" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
        </el-select>
        <el-button
          v-if="list.btnstatus"
          icon="el-icon-search"
          circle
          :disabled="list.btnDisabled==null?!hasPerms(list.perms):list.btnDisabled"
          @click="openHov(list.id)"
        ></el-button>
      </template>
      <!--日期框正常-->
        <el-date-picker v-else-if="list.type === 'datetime'"
          v-model.trim="formData[list.id]"
          :clearable="list.clearable"
          :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
          type="datetime"
          :default-time="list.defaultTime"
          style="width:200px;float:left;"
        ></el-date-picker>
      <!--日期框带开始结束日期-->
      <div v-else-if="list.type === 'datetimerange'" style="width:200px;float:left;">
        <el-date-picker
          v-model.trim="formData[list.id]"
          :clearable="list.clearable"
          :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
          type="datetimerange"
          range-separator="至"
          :default-time="['00:00:00','23:59:59']"
          style="width:200px;float:left;"
        ></el-date-picker>
      </div>
      <!--日期框只有日期-->
      <div v-else-if="list.type === 'date'" style="width:200px;float:left;">
        <el-date-picker
          v-model.trim="formData[list.id]"
          :disabled="list.disabled==null?!hasPerms(list.perms):list.disabled"
          :clearable="list.clearable"
          value-format="yyyy-MM-dd"
          type="date"
          style="width:200px;float:left;"
        ></el-date-picker>
      </div>
      <!--占位框-->
      <div v-else-if="list.type === '无'"></div>
    </el-form-item>
  </el-form>
  <!--功能按钮-->
  <div  slot="footer">
    <div v-if="btnArray.type===1">
      <kt-button v-for="item in btnArray.options" :key="item.id" :icon="item.icon" :label="$t(item.label)" :perms="item.perms" type="primary" @click="handle"></kt-button>
    </div>
    <div v-if="btnArray.type===2" style="text-align: center">
      <el-button @click.native="closeEdialog">{{$t('action.cancel')}}</el-button>
      <el-button type="primary" @click.native="submitForm(btnArray.id)" :disabled="btnArray.disabled" :loading="editLoading">{{$t('action.submit')}}</el-button>
    </div>
  </div>
</el-dialog>
</div>
</template>

<script>
import { hasPermission } from '@/permission/index.js'
export default {
  name: 'Edialog',
  props: {
    title: {type: String},
    dialogWidth: {type:String,default:'800px'},
    dialogTop:{type:String,default:'12vh'},
    formList: {type:Array},
    formData: {type:Object},
    labelWidth: {type:String,default: '80px'},
    inline:{type:Boolean,default:false},
    btnArray:{type:Object},
    ruleArray:{type:Object,default:null}
  },
  data () {
    return {
      dialogVisible: false,
      hovData:{},
      editLoading:false,
      rules:{},
      rulesSatus:false
    }
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
    selectChange(e,row){
      this.$emit('selectChange',{id:e,row:row})
    },
    selectChangeVal(id,value){
      this.$emit('selectChangeVal',{id:id,value:value})
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
    submitForm(btnid){
      if(this.rulesSatus===false){
        this.$emit('submitForm',{btnid:btnid,data:this.formData});
      }else{
        this.$refs.ruleForm.validate((vaild) => {
          if(vaild){
            this.$emit('submitForm',{btnid:btnid,data:this.formData});
          }else{
            return false;
          }
        })
      }
    },
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms) & !this.disabled
    },
    disForm(list,id,termid,term,status){
      list.forEach(e => {
        if(e[id]===termid){
          e[term]=status;
        }
      })
    },
    openDialog(){
      var rules={};
      this.rulesSatus=false;
      this.formList.forEach(e=>{
        if(e.required){
          rules[e.id]={}
          rules[e.id].required=e.required;
          if(e.ruleType){
            rules[e.id].type=e.ruleType;
          }
          rules[e.id].message=e.label+'必填';
          if(e.type=='1-1'||e.type=='1-2'||e.type=='1-3'){
            rules[e.id].trigger='blur';
          }else if(e.type=='2-1'||e.type=='2-2'||e.type=='2-3'||e.type=='3-1'||e.type=='3-2'||e.type=='3-3'){
            rules[e.id].trigger='change';
          }
        }
      })
      if(this.ruleArray!=null){
        Object.keys(this.ruleArray).forEach(e => {
          rules[e]={};
          rules[e].validator=this.ruleArray[e].validator;
          rules[e].trigger=this.ruleArray[e].trigger;
        })
      }
      this.rules=rules;
      if(Object.keys(rules).length>0){
        this.rulesSatus=true;
      }else{
        this.rulesSatus=false;
      }
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
