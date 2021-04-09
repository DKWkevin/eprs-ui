<template>
<div>
<el-form :model="counter" ref="counter" style="width:300px;margin: 20px auto;clear: both">
  <el-form-item>
    <el-radio v-model="counterStatus" label="0">选择</el-radio>
    <el-radio v-model="counterStatus" label="1">导入</el-radio>
  </el-form-item>
  <el-form-item v-if="counterStatus === '0'" prop="counterflagTransfer">
    <div style="text-align:left;">
      <input ref="checkAll" type="checkbox" :checked="checkAll" @click="checkBoxAll" />
      <span>全部</span>
    </div>
      <div class="treeDiv">
        <tree-menu :treeData="areaOption" :defautData="areaOption" :level="level"></tree-menu>
    </div>
  </el-form-item>
  <el-form-item v-else style="text-align: center">
    <e-upload label="选择门店" :columns="columns" style="margin: 0 40%;" @execl="execl"></e-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="counterback">上一步</el-button>
    <el-button type="primary" @click="ruleFrom">下一步</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import treeMenu from './treeMenu'
export default {
  name: 'DiscInfoCounter',
  props:{
    areaOption:{type:Array},
    cidtyid:{type:Number}
  },
  components:{treeMenu},
  data () {
    return {
      counter:{
        counterflagTransfer:[],
      },
      type:null,
      areaid:null,
      transferData:[],
      transferType:'double',
      rules:{},
      cityInfo:{},
      checkAll:false,
      level:0,
      counterStatus: '0',
      columns:[{prop:'counterid',label:'门店ID'}, {prop:'cityid',label: '城市ID'}],
      execlParams:[]
    }
  },
  created(){
    this.$selectLoad.loads(this);
  },
  methods:{
    checkBoxAll(){
      if(this.checkAll === false){
        this.checkAll = true;
        this.$selectLoad.checkChild(this.areaOption, this.checkAll);
      }else{
        this.checkAll = false;
        this.$selectLoad.checkChild(this.areaOption, this.checkAll);
      }
    },
    paramsLoad(data,array){
      data.forEach(item => {
        if(item.check === true&&item.indeterminate === false){
            let obj = {};
            obj[item.valueName] = item.value;
            obj.status = 0;
            if(item.childName!==""){
            obj[item.childName] = [];
            }
            array.push(obj);
        }else if(item.check === false && item.indeterminate === true){
            let obj = {};
            obj[item.valueName] = item.value;
            obj.status = 1;
            obj[item.childName] = [];
            this.paramsLoad(item.children,obj[item.childName]);
            array.push(obj);
        }
      });
    },
    istrueAll(data){
      let params = true;
      data.forEach(item =>{
        if(item.check === false && item.indeterminate===false){
          params = false
        }
      });
      return params;
    },
    execl(data){
      this.execlParams = data;
    },
    counterNext(){
      let parent = this.$parent;
      if(this.counterStatus === '0') {
        let params = [];
        let counter = false;
        if (this.checkAll === true && this.istrueAll(this.areaOption) === true) {
          if (Number(sessionStorage['companyid']) === 19940) {
            /*      let companyParams={};
          companyParams.companyid = Number(sessionStorage['companyid']);
          companyParams.status = 1;
          companyParams.cityid = 19940;
          companyParams.cityidbeanlst=[];*/
            this.areaOption.forEach(item => {
              let companyParams = {};
              companyParams.companyid = Number(sessionStorage['companyid']);
              companyParams.status = 0;
              companyParams.cityid = item.value;
              companyParams.cityidbeanlst = [];
              params.push(companyParams)
            });
            //params.push(companyParams)
          } else if (Number(sessionStorage['companyid']) === 3 || Number(sessionStorage['companyid']) === 93740) {
            this.areaOption.forEach(item => {
              let companyParams = {};
              companyParams.companyid = Number(sessionStorage['companyid']);
              companyParams.status = 0;
              companyParams.cityid = item.value;
              companyParams.cityidbeanlst = [];
              params.push(companyParams)
            });
          } else {
            let companyParams = {};
            companyParams.companyid = Number(sessionStorage['companyid']);
            companyParams.status = 0;
            companyParams.cityid = this.areaOption[0].value;
            companyParams.cityidbeanlst = [];
            params.push(companyParams)
          }
          counter = true;
        } else {
          this.areaOption.forEach(item => {
            if(item.check === true&&item.indeterminate === false) {
              let companyParams = {};
              companyParams.companyid = Number(sessionStorage['companyid']);
              companyParams.status = 0;
              companyParams.cityid = item.value;
              companyParams.cityidbeanlst = [];
              params.push(companyParams);
            }else if(item.check === false && item.indeterminate === true){
              let companyParams = {};
              companyParams.companyid = Number(sessionStorage['companyid']);
              companyParams.status = 1;
              companyParams.cityid = item.value;
              companyParams.cityidbeanlst = [];
              this.paramsLoad(item.children, companyParams.cityidbeanlst);
              params.push(companyParams)
            }
          });
          if (params.length > 0) {
            counter = true;
          }
          //params.push(companyParams)
          /*let companyParams = {};
          companyParams.companyid = Number(sessionStorage['companyid']);
          companyParams.status = 1;
          companyParams.cityidbeanlst = [];
          this.paramsLoad(this.areaOption, companyParams.cityidbeanlst);
          if (companyParams.cityidbeanlst.length > 0) {
            counter = true;
          }
          params.push(companyParams)*/
        }
        if (counter === false) {
          alert("请选择门店或地区");
          return false;
        }
        parent.docData.savedisccounterlimitbeanlst = params;
        parent.docData.counterStatus = 0;
        console.log(params)
      }else if(this.counterStatus === '1') {
        parent.docData.counterLst = this.execlParams;
        parent.docData.counterStatus = 1;
      }
      let cardName = parent.selectCardName('next', 'counter');
      parent.stepActive = parent.stepActive + 1;
      parent.nextCard = cardName;
    },
    counterback(){
      this.$parent.cardBack('counter');
    },
    ruleFrom(){
      this.$refs.counter.validate((valid) =>
      {
        if(valid)
        {
          this.counterNext();
        }
        else
        {
          return false;
        }
      })
    },
    counterLoad(){
      this.areaOption.forEach(item => {
        item.check = false;
        item.indeterminate = false;
        if(item.children.length!==0) {
          this.counterChildLoad(item.children);
        }
      })
    },
    counterChildLoad(data){
      data.forEach(item => {
        item.check = false;
        item.indeterminate = false;
        if(item.children.length!==0){
          counterChildLoad(item.children);
        }
      });
    }
  }
}
</script>

<style scoped>
.typeDiv{width:400px;height:30px;margin:0 auto;}
.typeLabel{font-size:14px;float: left;line-height: 28px;padding:0 5px;}
.treeDiv{
  width:400px;
  height:300px;
  border:1px solid #ccc;
  border-radius: 6px;
  margin:0 auto;
}


</style>
