<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="action"
    :on-change="implUserExcel"
    :show-file-list="false"
    :auto-upload="false"
    style="float:left;margin:0 5px;"
  >
    <el-button slot="trigger" :disabled="!hasPerms(perms)" size="mini" type="primary">{{label}}</el-button>
  </el-upload>
</template>

<script>
  import { hasPermission } from '../../permission'
  import XLSX from "xlsx";
  export default {
    name: "EUpload",
    props:{
      perms:{type:String,default:''},
      label:{type:String,default:''},
      columns:{type:Array}
    },
    data(){
      return{
        action:'',
        disabled:false
      }
    },
    methods:{
      implUserExcel(e){
        let columns = this.columns;
        new Promise((resolve, reject) => {
          let uploadData = [];
          let reader = new FileReader();
          FileReader.prototype.readAsBinaryString = function(f) {
            let binary = "";
            let reader = new FileReader();
            reader.onload = function(e) {
              let bytes = new Uint8Array(reader.result);
              let length = bytes.byteLength;
              for(let i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              let wb = XLSX.read(binary, {type: 'binary'});
              const ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
              ws.forEach(e => {
                let sheetData = {};
                columns.forEach(res => {
                  Object.keys(e).forEach(es => {
                    if (es === res.label) {
                      sheetData[res.prop] = e[es];
                    }
                  })
                });
                uploadData.push(sheetData)
              });
              resolve(uploadData);
            };
            reader.readAsArrayBuffer(f);
          };
          reader.readAsBinaryString(e.raw);
        }).then(res => {
          this.$emit('execl', res);
        }).catch(error => {
          console.log(error);
        })
      },
      hasPerms: function (perms) {
        // 根据权限标识和外部指示状态进行权限判断
        return hasPermission(perms) & !this.disabled
      }
    }
  }
</script>

<style scoped>

</style>
