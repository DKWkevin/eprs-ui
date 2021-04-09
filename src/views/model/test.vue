<template>
<div>
  <div>
    <el-upload
      class="upload-demo"
      :action="action"
      :on-change="implUserExcel"
      :show-file-list="false"
      :auto-upload="false"
    >
      <el-button slot="trigger" type="primary">选中文件 </el-button>
    </el-upload>
  </div>
  <e-table :table-data="tableData" :table-columns="tableColumns"></e-table>
</div>
</template>

<script>
import XLSX from 'xlsx';
import ETable from "../Core/ETable";
export default {
  name: 'test',
  components:{ETable},
  data(){
    return {
      action:'',
      tableColumns:[],
      tableData:[]
    }
  },
  methods: {
    implUserExcel(e){
      let _this = this;
      // 通过DOM取文件数据
      let reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = "";
        let reader = new FileReader();
        reader.onload = function(e) {
          let uploadData = [];
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for(let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          let wb = XLSX.read(binary, {type: 'binary'});
          const ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          ws.forEach(e => {
            let sheetData = {};
            _this.tableColumns.forEach(res => {
              Object.keys(e).forEach(es => {
                if (es === res.label) {
                  sheetData[res.prop] = e[es];
                }
              })
            });
            uploadData.push(sheetData)
          });
          _this.tableData=uploadData;
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(e.raw);

    }
  }
}
</script>

<style scoped>

</style>
