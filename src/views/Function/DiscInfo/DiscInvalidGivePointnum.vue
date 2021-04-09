<template>
<el-form
  ref="invalidGivePointnum"
  :model="invalidGivePointnum"
  :rules="rules"
  label-width="0"
  style="width:500px;margin: 0 auto;" >
  <el-form-item>
    <el-button type="primary" size="small" @click="addClick">添加</el-button>
  </el-form-item>
  <el-table :data="invalidGivePointnum.data" height="300">
    <el-table-column label="近效期月数" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.invalidmonth'" :rules="rules.invalidmonth">
          <el-input v-model.number="scope.row.invalidmonth" style="padding-top:15px;"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="数量" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.qty'" :rules="rules.qty">
          <el-input v-model.number="scope.row.qty" style="padding-top:15px;"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="积分" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.pointnum'" :rules="rules.pointnum">
          <el-input v-model.number="scope.row.pointnum" style="padding-top:15px;"></el-input>
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
      <el-button type="primary" size="small">上传效期送积分货品</el-button>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="goodsBack">上一步</el-button>
    <el-button type="primary" @click="ruleForm">创建促销方案</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'DiscInvalidGivePointmult',
  data(){
    return{
      invalidGivePointnum:{
          data:[]
      },
      actions:'',
      templateColumns:[
        {id:'goodsid',name:'货品ID'},
        {id:'invalidmonth',name:'近效期月数'},
        {id:'pointnum',name:'积分'},
        {id:'qty',name:'数量'}
      ],
      rules:{
        invalidmonth:{required:true, type:'number', message:'近效期月数不能为空', trigger:'blur'},
        qty:{required:true, type:'number', message:'数量不能为空', trigger:'blur'},
        pointnum:{required:true, type:'number', message:'积分不能为空', trigger:'blur'}
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
    goodsBack(){
      this.$parent.cardBack('invalidGivePointmult');
    },
    addClick(){
      let params = {
          invalidmonth:null,
          qty:null,
          pointnum:null,
        };
      this.invalidGivePointnum.data.push(params);
    },
    handDelete(index){
      this.invalidGivePointnum.data.splice(index, 1);
    },
    ruleForm(){
      this.$refs.invalidGivePointnum.validate((valid) => {
        if(valid)
        {
          let params = this.getParams();
          this.$parent.loading = true;
          this.$api.discInfo.inserDiscInfo(params).then(res => {
            if(res.code === 200){
              if(res.data>0){
                alert("生成促销方案成功");
                this.uploadData = {};
                this.discount.data = [];
                this.$parent.loading = false;
                this.$parent.$parent.tabsRefreshCurrentHandle();
              }else{
                 alert(res.msg);
                 this.$parent.loading = false;
                 return false;
               }
            }
          }).catch(error =>{
            this.$parent.loading = false;
            return false;
          })
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
      paramsJson.discinvalidgoodsgivepointnumlst = this.invalidGivePointnum.data;
      paramsJson.discinvalidgoodspointnumlimitlst = this.uploadData;
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
