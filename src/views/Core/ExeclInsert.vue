<template>
<div id="execl">
  <div class="execlDiv">
    <div class="execl-header">
      <label class="label">导入</label>
      <a class="closeBtn" href="javascript:void(0)" @click="closeExecl()">X</a>
    </div>
    <div class="tableDiv">
      <div style="width:100%;height:30px;margin-top:5px;">
        <upload-button @upload="implUserExcel"></upload-button>
        <el-button type="primary" @click="saveAll" style="float:left;" :disabled="saveStatus">保存</el-button>
      </div>
      <div>
        <e-table
          :table-data="tableData"
          :table-columns="tableColumns"
          :table-height="tableHeight"
          :page-status="false"
        ></e-table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import UploadButton from "@/views/Core/uploadButton";
import ETable from "@/views/Core/ETable";
import XLSX from 'xlsx'
export default {
  name: 'ExeclInsert',
  components:{ETable, UploadButton},
  props:{
    tableColumns:{type:Array},
    parentid:{type:String}
  },
  data(){
    return {
      saveStatus:true,
      tableHeight:412,
      tableData:[]
    }
  },
  methods:{
    saveAll(){
      this.$emit('insert',this.tableData);
    },
    implUserExcel(e){
      let fileName=e.target.files[0];
      let _this=this;
      let reader=new FileReader();
      reader.readAsBinaryString(fileName);
      let uploadData=[];
      reader.onload =function (e) {
        const workbook = XLSX.read(e.target.result, {type:"binary"});
        let sheetList = workbook.SheetNames;
        const ws=XLSX.utils.sheet_to_json(workbook.Sheets[sheetList]);
        ws.forEach(e=>{
          var sheetData={};
          _this.tableColumns.forEach(res => {
            Object.keys(e).forEach(es=>{
              if(es===res.label){
                sheetData[res.prop]=e[es];
              }
            })
          });
          uploadData.push(sheetData)
        });
        _this.saveStatus = uploadData.length <= 0;
        _this.tableData=uploadData;
      };
    },
    closeExecl(){
      this.$parent[this.parentid]=false;
    }
  }
}
</script>

<style scoped>
#execl{width:100%;height:100%;position: fixed;top:0;left: 0;background: rgba(0,0,0,0.6);z-index: 99999}
  .execlDiv{width:800px;height:500px;background:white;margin:10% auto;border-radius: 5px;}
  a{text-decoration: none;}
  .execl-header{width:100%;height:40px;background:#eee;border-top-left-radius: 5px;border-top-right-radius: 5px;}
  .execl-header .label{line-height:40px;font-size:20px;font-family: 宋体,serif}
  .closeBtn{float:right;margin:10px 10px 0 0;font-size:16px;}
  .tableDiv{width:100%;height:460px;}
</style>
