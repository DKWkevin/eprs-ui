import XLSX from "xlsx";

export function uploadExecl(e, exportColumns) {
  new Promise(
    function (resolve, reject) {
      let uploadData = [];
      // 通过DOM取文件数据
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
            exportColumns.forEach(res => {
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
    }
  ).then(
    (res) => {
      new Promise(function(resolve){
        resolve(res);
      })
    },
    (error) => {
      console.log(error)
    },
  )
}
