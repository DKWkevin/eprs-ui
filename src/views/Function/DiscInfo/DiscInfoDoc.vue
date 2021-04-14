<template>
<el-form :model="base" ref="base" label-width="100px" label-position="right" size="mini" style="width:630px;margin: 20px auto" :rules="rules">
  <el-form-item label="方案名称" prop="discname">
    <el-input v-model="base.discname"></el-input>
  </el-form-item>
  <el-form-item label="活动日期">
    <el-col :span="11">
      <el-form-item prop="begindate">
       <!-- <el-date-picker type="datetime" v-model="base.begindate" style="width:100%;" default-time="00:00:00"></el-date-picker>-->
        <el-date-picker type="datetime" v-model="base.begindate" style="width:100%;" default-time="00:00:00" @change="flagChange"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="enddate">
        <!--<el-date-picker type="datetime" v-model="base.enddate" style="width:100%;" default-time="23:59:59"></el-date-picker>-->
       <el-date-picker type="datetime" v-model="base.enddate" style="width:100%;" default-time="23:59:59" @change="flagChange"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="促销类别" prop="discclassid" style="position: relative">
    <el-cascader ref="cascader" v-model="discclassname" :options="discClassOption" :props="{expandTrigger:'hover',value:'discclassid',label:'discclassname',children:'discclasslst'}" @change="handChange" style="width:100%"></el-cascader>
  </el-form-item>
  <el-form-item>
    <div>{{flagName}}</div>
  </el-form-item>
  <el-form-item label="是否兼得">
    <el-radio-group v-model="base.classOuterMutex">
      <el-radio-button :label="0">兼得</el-radio-button>
      <el-radio-button :label="1">不兼得</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="会员卡类别" prop="cardtypeid">
    <el-checkbox-button :indeterminate="isDeterminate" v-model="checkAll"  @change="cardTypeChangeAll" style="float:left;">全部</el-checkbox-button>
    <el-checkbox-group v-model="base.cardtypeid" style="width:100%;clear: both;padding-top: 5px;"  @change="cardTypeChange">
      <el-checkbox-button
        v-for="(item,index) in cardTypeOption"
        :key="index"
        :label="item.value"
        style="float: left"
      >{{item.label}}</el-checkbox-button>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="门店状态">
    <el-select v-model="base.counterflag" style="width:50%;float: left">
      <el-option :value="-1" label="全部"></el-option>
      <!--<el-option :value="0" label="不可用"></el-option> -->
      <el-option :value="1" label="可用"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="ruleForm">下一步</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  name: 'DiscInfoDoc',
  props:{
    discClassOption:{type: Array},
    cardTypeOption:{type: Array},
    discClassArray:{type: Array}
  },
  data () {
    var disclass = (rule,value,callback)=> {
        if(value === ''||value === null)
        {
          callback(new Error('促销类别不能为空'))
        }
        else
        {
          callback()
        }
    };
    return {
      base: {
        discname:null,
        begindate:null,
        enddate:null,
        discclassid:null,
        cardtypeid:[],
        inputmanid:null,
        companyid:null,
        usestatus:1,
        classOuterMutex:0,
        cityFlag:1,
        supplyFlag:0,
        counterflag:null
      },
      rules:{
        discname: {required:true,message:'方案名称不能为空',trigger:'blur'},
        begindate: {required:true,type:'date',message:'开始日期不能为空',trigger: 'change'},
        enddate: {required:true,type:'date',message:'结算日期不能为空',trigger: 'change'},
        discclassid: {validator: disclass, trigger:'change'},
        cardtypeid: {required: true,message:'请选择卡类型',trigger:'change'}
      },
      stepName:null,
      cardName:null,
      discclassname:null,
      discClassVisible:false,
      discClassNode:null,
      discClassNodeName:null,
      flagName:'',
      isDeterminate:false,
      checkAll:false
    }
  },
  created() {
    this.base.counterflag = -1;
  },
  methods:{
    docNext(){
      let parent = this.$parent;
      this.base.inputmanid = Number(sessionStorage['userid']);
      this.base.companyid = Number(sessionStorage['companyid']);
      if (Number(sessionStorage['companyid'])===19940) {
        this.base.cityFlag = 1;
      } else {
        this.base.cityFlag = 0;
      }
      parent.docData.discinfodeflst = this.base;
      if(this.cardName.length===0)
      {
        alert("没有此方案模板");
        return false;
      }
      if(this.base.counterflag === 0 || this.base.counterflag === 1)
      {
        if(parent.hasCard("counter") === false){
          if(parent.hasCard(this.cardName) === false){
            parent.stepOption.push({card:"counter",title:'门店信息',description:'这是门店信息表'});
            parent.stepOption.push({card:this.cardName,title:this.stepName,description:'这是'+this.stepName+"方案"});
          }else{
            parent.stepOption.splice(1,0,{card:"counter",title:'门店信息',description:'这是门店信息表'});
          }
        }
        parent.stepActive = parent.stepActive + 1;
        parent.nextCard="counter";
        return;
      }else if(this.base.counterflag === -1){

      }else{
        alert("请选择门店状态");
        return false;
      }
      if(parent.hasCard(this.cardName) === false){
        parent.stepOption.push({card:this.cardName,title:this.stepName,description:'这是'+this.stepName+"方案"});
      }
      parent.stepActive = parent.stepActive + 1;
      parent.nextCard=this.cardName;
    },
    ruleForm(){
      console.log(this.base)
      this.$refs.base.validate((valid) =>
      {
        if(valid)
        {
          this.docNext();
        }
        else
        {
          return false;
        }
      })
    },
    classNameClick(){
      this.$parent.docData = {};
      this.$parent.stepOption=[];
      this.$parent.stepOption.push({card:'doc',title:'促销方案信息',description:'这是一张促销总单'});
      this.$parent.stepActive = 0;
      this.discClassVisible = true;
    },
    flagChange(){
      if (this.base.begindate!==null&&this.base.enddate!==null&&this.base.discclassid!==null) {
        this.$api.discInfo.selectDiscInfoDef({
          begindate:this.base.begindate,
          enddate:this.base.enddate,
          discclassid:this.base.discclassid,
          companyid: Number(sessionStorage['companyid'])
        }).then(res => {
          if(res.data !== null){
            if(res.data.classoutermutex!==null){
              let flagName = "";
              if(res.data.classoutermutex === 0) {
                flagName = "兼得";
                this.flagName = "有单子为"+flagName+",请谨慎使用";
              } else if(res.data.classoutermutex === 1) {
                flagName = "不兼得";
                this.flagName = "有单子为"+flagName+",请谨慎使用";
              }
              this.base.classOuterMutex = res.data.classoutermutex;
            }
          }
        }).catch(() => {
          return false;
        })
      }
    },
    handChange(value){
      let node = this.$refs.cascader.getCheckedNodes();
      this.base.discclassid = node[0].data.discclassid;
      this.stepName = node[0].data.discclassname;
      this.cardName = node[0].data.cardname;
      this.flagChange();
    },
    cardTypeChange(value){
      let len = value.length;
      let params = [];
      this.cardTypeOption.forEach(item => {
        params.push(item.value);
      })
      this.checkAll = len === params.length;
      this.isDeterminate = len > 0 && len < params.length;
    },
    cardTypeChangeAll(value){
      let params = [];
      this.cardTypeOption.forEach(item => {
        params.push(item.value);
      })
      this.base.cardtypeid = value ? params : [];
      this.isDeterminate = false;
    }
  }
}
</script>

<style scoped>
#card{
  width:100%;
  height:100%;
}
#el-cardDiv{
  width:100%;
  height:160px;
}
</style>
