<template>
<el-form
  ref="invalidGivePointmult"
  :model="invalidGivePointmult"
  :rules="rules"
  label-width="0"
  style="width:800px;margin: 0 auto;" >
  <el-form-item>
    <el-button type="primary" size="small" @click="addClick">添加</el-button>
  </el-form-item>
  <el-table :data="invalidGivePointmult.data" height="300">
    <el-table-column label="近效期月数" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.invalidmonth'" :rules="rules.invalidmonth">
          <el-input v-model.number="scope.row.invalidmonth" style="padding-top:15px;"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="积分倍数" align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.pointmult'" :rules="rules.pointmult">
          <el-input v-model.number="scope.row.pointmult" style="padding-top:15px;"></el-input>
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
      <el-button type="primary" size="small">上传效期积分倍数</el-button>
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
      invalidGivePointmult:{
        data:[]
      },
      actions:'',
      templateColumns:[
        {id:'goodsid',name:'货品ID'},
        {id:'invalidmonth',name:'近效期月数'},
        {id:'pointmult',name:'积分倍数'}
      ],
      rules:{
        invalidmonth:{required:true, type:'number', message:'近效期月数不能为空', trigger:'blur'},
        pointmult:{required:true, type:'number', message:'积分倍数不能为空', trigger:'blur'},
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
      let params = {invalidmonth:null,pointmult:null};
      this.invalidGivePointmult.data.push(params);
    },
    handDelete(index){
      this.invalidGivePointmult.data.splice(index, 1);
    },
    ruleForm(){
      this.$refs.invalidGivePointmult.validate((valid) => {
        if(valid)
        {
          let params = this.$parent.docData;
          params.discinfodeflst.cardtypeid = params.discinfodeflst.cardtypeid.toString();
          params.discinvalidgoodsgivepointmultlst = this.invalidGivePointmult.data;
          console.log(this.uploadData)
          params.discinvalidgoodspointmultlimitlst = this.uploadData;
          this.$parent.loading = true;
          this.$api.discInfo.inserDiscInfo(params).then(res => {
            if(res.code === 200){
              if(res.data>0){
                alert("生成促销方案成功");
                this.$parent.$parent.tabsRefreshCurrentHandle();
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
    }
  }
}
</script>

<style scoped>

</style>
