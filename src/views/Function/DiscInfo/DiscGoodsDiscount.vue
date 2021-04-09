<template>
<el-form :model="discount" ref="discount" label-width="0" label-position="right" size="mini" style="width:800px;margin: 20px auto" :rules="rules">
  <el-form-item>
    <el-button type="primary" size="small" @click="addClick">添加</el-button>
  </el-form-item>
  <el-table :data="discount.data" height="300">
    <el-table-column label="近效期月数" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.invalidmonth'" :rules="rules.invalidmonth">
          <el-input v-model.number="scope.row.invalidmonth" style="padding-top:15px;"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="折扣" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.discrate'" :rules="rules.discrate">
          <el-input v-model="scope.row.discrate" style="padding-top:15px;">
          </el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="供应商折扣" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.supplydisc'" :rules="rules.supplydisc">
          <el-input v-model.number="scope.row.supplydisc" maxlength="3" style="padding-top:15px;">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="零售商折扣" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.saledisc'" :rules="rules.saledisc">
          <el-input v-model.number="scope.row.saledisc" maxlength="3" style="padding-top:15px;">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-form-item>
    <el-upload
     :action="actions"
    :auto-upload="false"
    :on-change="changeUpload"
    >
      <el-button type="primary" size="small">上传效期折扣货品</el-button>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="discountBack">上一步</el-button>
    <el-button type="primary" @click="saveAll">创建促销方案</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'DiscGoodsDiscount',
  data () {
    var isNullNumber = (rule,value,callback) =>
    {
      let reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
      if(value === "")
      {
        callback(new Error('不能为空'));
      }
      else if(reg.test(value) === false)
      {
        callback(new Error('请填写整数或者两位小数'));
      }
      else
      {
        callback();
      }
    };
    var isNullNumberZs = (rule,value,callback) =>
    {
      if(value === '')
      {
        callback(new Error('不能为空'))
      }
      else if((value>=0&&value<=100) === false)
      {
        callback(new Error('必须为数字并且是0 - 100'))
      }
      else
      {
        callback();
      }
    };
    return {
      discount:{
        data:[]
      },
      actions:'',
      uploadData:null,
      templateColumns:[
        {id:'goodsid',name:'货品ID'},
        {id:'invalidmonth',name:'近效期月数'},
        {id:'discrate',name:'折扣'},
        {id:'supplydisc',name:'供应商折扣'},
        {id:'saledisc',name:'零售商折扣'},
      ],
      rules:{
        invalidmonth:{ type: 'number',message:'请输入正整数',trigger:'blur'},
        discrate:{ validator: isNullNumber, trigger:'blur'},
        supplydisc:{ validator: isNullNumberZs, trigger:'blur'},
        saledisc:{ validator: isNullNumberZs, trigger:'blur'}
      }
    }
  },
  methods:{
    changeUpload(file){
      const isExecl = (file.name.split(".")[1] === 'xlsx'||file.name.split(".")[1] === 'xls');
      const isLt = file.size / 1024 / 1024 < 3;
      if(!isExecl)
      {
         alert("上传文件应为EXECL格式文件");
         return false;
      }
      if(!isLt)
      {
        alert("上传文件大小不能超过3M");
        return false;
      }
      let self = this;
      let reader = new FileReader();
      reader.readAsBinaryString(file.raw);
      reader.onload = function (e) {
        const workbook = XLSX.read(e.target.result, {type:"binary"});
        const wsname = workbook.SheetNames[0];
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        let params=[];
        ws.forEach(sheet => {
          var sheetData = {};
          self.templateColumns.forEach(res => {
            Object.keys(sheet).forEach(key => {
              if(key === res.name)
              {
                sheetData[res.id] = sheet[key];
              }
            })
          });
          params.push(sheetData);
        });
        self.uploadData = params;
      };
    },
    addClick(){
      let params = {invalidmonth:null,discrate:null,supplydisc:null,saledisc:null};
      this.discount.data.push(params);
    },
    handDelete(index){
      this.discount.data.splice(index, 1);
    },
    discountBack(){
      this.$parent.cardBack('discount');
    },
    saveAll(){
      this.$refs.discount.validate((valid) => {
        if(valid)
        {
          let params = this.getParams();
          if (params.hasOwnProperty('flag') === true) {
            if(params.flag === 0){
              alert("供应商折扣加上零售商折扣必须等于100");
              return false;
            }
          }
          this.$parent.loading = true;
          this.$api.discInfo.inserDiscInfo(params).then(res => {
            if(res.code === 200){
              if(res.data>0){
                alert("生成促销方案成功");
                this.$parent.$parent.tabsRefreshCurrentHandle();
              }else{
                 alert(res.msg);
                 this.$parent.loading = false;
                 return false;
               }
            }
          }).catch(error => {
            this.$parent.loading = false;
            return false;
          });
        }
        else
        {
          return false;
        }
      })
    },
    getParams(){
      let paramsJson = {};
      let parent = this.$parent.docData;
      let cardtypeidLength = parent.discinfodeflst.cardtypeid.length;
      this.discount.data.forEach(item => {
        let supplydisc = item.supplydisc;
        let saledisc = item.saledisc;
        if((supplydisc !== null && supplydisc !== '')&&(saledisc !== null && saledisc !== '')){
          if(Number(supplydisc)+Number(saledisc) !== 100) {
            paramsJson = {};
            paramsJson.flag = 0;
            return paramsJson;
          }
        }else if((supplydisc !== null && supplydisc !== '')&&(saledisc === null || saledisc === '')){
          if(Number(saledisc) !== 100) {
            paramsJson = {};
            paramsJson.flag = 0;
            return paramsJson;
          }
        }else if((supplydisc === null || supplydisc === '')&&(saledisc !== null && saledisc !== '')){
          if(Number(supplydisc) !== 100) {
            paramsJson = {};
            paramsJson.flag = 0;
            return paramsJson;
          }
        }
      })
      paramsJson.discinvalidgoodsdiscountlst = this.discount.data;
      paramsJson.discgoodsinvalidlimitlst = this.uploadData;
      paramsJson.discinfodeflst = {};
      paramsJson.discinfodeflst.discname= parent.discinfodeflst.discname;
      paramsJson.discinfodeflst.begindate = parent.discinfodeflst.begindate;
      paramsJson.discinfodeflst.enddate = parent.discinfodeflst.enddate;
      paramsJson.discinfodeflst.discclassid = parent.discinfodeflst.discclassid;
      paramsJson.discinfodeflst.cardtypeid = parent.discinfodeflst.cardtypeid.toString();
      paramsJson.discinfodeflst.inputmanid = parent.discinfodeflst.inputmanid;
      paramsJson.discinfodeflst.companyid = parent.discinfodeflst.companyid;
      paramsJson.discinfodeflst.usestatus = parent.discinfodeflst.usestatus;
      paramsJson.discinfodeflst.classOuterMutex = parent.discinfodeflst.classOuterMutex;
      paramsJson.discinfodeflst.cityFlag = parent.discinfodeflst.cityFlag;
      if(parent.discinfodeflst.counterflag === -1){
        paramsJson.savedisccounterlimitbeanlst = [];
        if(Number(sessionStorage['companyid'])===19940){
          this.$parent.areaOption.forEach(item =>{
            let companyParams={};
            companyParams.companyid = Number(sessionStorage['companyid']);
            companyParams.status = 0;
            companyParams.cityid = item.value;
            companyParams.cityidbeanlst=[];
            paramsJson.savedisccounterlimitbeanlst.push(companyParams)
          });
        }else if(Number(sessionStorage['companyid']) === 3||Number(sessionStorage['companyid']) === 93740){
          this.$parent.areaOption.forEach(item =>{
            let companyParams={};
            companyParams.companyid = Number(sessionStorage['companyid']);
            companyParams.status = 0;
            companyParams.cityid = item.value;
            companyParams.cityidbeanlst=[];
            paramsJson.savedisccounterlimitbeanlst.push(companyParams)
          });
        }else {
          let companyParams={};
          companyParams.companyid = Number(sessionStorage['companyid']);
          companyParams.status = 0;
          companyParams.cityid = this.$parent.areaOption[0].value;
          companyParams.cityidbeanlst=[];
          paramsJson.savedisccounterlimitbeanlst.push(companyParams)
        }
        parent.discinfodeflst.counterflag = null;
      }else{
        if(parent.counterStatus === 0) {
          paramsJson.savedisccounterlimitbeanlst = parent.savedisccounterlimitbeanlst;
        }else {
          paramsJson.counterLst = parent.counterLst;
        }
      }
      return paramsJson;
    },
  }
}
</script>

<style scoped>

</style>
