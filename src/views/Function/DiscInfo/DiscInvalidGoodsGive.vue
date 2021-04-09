<template>
<el-form :model="invalidGoodsGive" ref="invalidGoodsGive" :rules="rules"  style="width:400px;margin: 0 auto;" label-width="0">
  <el-form-item>
    <el-button type="primary" size="small" @click="addClick">添加</el-button>
  </el-form-item>
  <el-table :data="invalidGoodsGive.data">
    <el-table-column label="近效期月数">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.invalidmonth'" :rules="rules.invalidmonth">
          <el-input v-model.number="scope.row.invalidmonth"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="互斥标志">
      <template slot-scope="scope">
        <el-form-item :prop="'data.'+scope.$index+'.mutexflag'" :rules="rules.mutexflag">
          <el-select style="width:100%">
            <el-option v-model="scope.row.mutexflag" label="空"></el-option>
            <el-option value="1" label="互斥(任选一)"></el-option>
            <el-option value="2" label="不互斥(全送)"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>
  </el-table>
  <el-form-item>
    <el-upload
      :action="actions"
      :auto-upload="false"
      :on-change="changeUpload"
    >
      <el-button type="primary" size="small">上传效期送品赠品</el-button>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button @click="invalidGoodsGiveBack">上一步</el-button>
    <el-button @click="ruleForm">创建促销方案</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  name: 'DiscInvalidGoodsGive',
  data(){
    return{
      invalidGoodsGive:{
        data:[]
      },
      rules:{
        invalidmonth:{type:'number',message:'近效期月数为数字',trigger:'blur'},
        mutexflag:{required:true,message:'互斥不能为空',target:'change'}
      },
      actions:'',
      uploadData:null,
      templateColumns:[
        {id:'goodsid',name:'商品ID'},
        {id:'qty',name:'数量'},
        {id:'price',name:'单价'},
        {id:'supplydisc',name:'供应商折扣'},
        {id:'saledisc',name:'零售商折扣'},
        {id:'goodstype',name:'赠品类型'},
        {id:'costingprice',name:'成本'},
        {id:'discsupplyid',name:'承担供应商ID'}
      ]
    }
  },
  methods:
  {
    addClick(){
      let params = {
        invalidmonth:null,
        mutexflag:null
      };
      this.invalidGoodsGive.data.push(params);
    },
    invalidGoodsGiveBack(){
      this.$parent.cardBack('invalidGoodsGive');
    },
    invalidGoodsGiveNext(){
      let params = this.$parent.docData;
      params.discinfodeflst.cardtypeid = params.discinfodeflst.cardtypeid.toString();
      params.discinvalidgoodsgivelst = this.invalidGoodsGive;
      params.discinvalidgoodsgivegoodslst=this.uploadData;
      this.$parent.loading = true;
      this.$api.discInfo.inserDiscInfo(params).then(res => {
        if(res.code === 200){
          if(res.data > 0){
            alert("保存成功");
            this.uploadData = {};
            this.discount.data = [];
            this.$parent.reSizeDoc();
            this.$parent.loading = false;
          }
        }
      }).catch(error => {
        this.$parent.loading = false;
        return false;
      });
    },
    ruleForm(){
      this.$refs.invalidGoodsGive.validate((valid) =>
      {
        if(valid)
        {
          this.invalidGoodsGiveNext();
        }
        else
        {
          return false;
        }
      })
    },
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
  }
}
</script>

<style scoped>

</style>
