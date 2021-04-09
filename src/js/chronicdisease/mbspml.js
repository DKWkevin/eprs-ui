import XLSX from "xlsx"

export default {
  name: 'ChronicDiseaseGoodsList',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'goodsid', label: '货品ID'}
      ],
      formData: {goodsid: null},
      btnOptions: [
        {id: 'query', icon: 'fa fa-search', label: 'action.search', perms: 'chronicdisease:mbspml:select'},
        {id: 'download', icon: 'fa fa-download', label: 'action.download', perms: 'chronicdisease:mbspml:select'},
        {id: 'upload', icon: 'fa fa-upload', label: 'action.upload', perms: 'chronicdisease:mbspml:select'},
        {id: 'download1', icon: 'fa fa-download', label: 'action.downloadModel', perms: 'chronicdisease:mbspml:select'}
      ],
      tableLoading: false,
      tableColumns: [
        {type: 0, prop: 'goodsno', label: '国大编号', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '成大货品ID', tableStatus: 0},
        {type: 0, prop: 'cdgoodsname', label: '成大货品名称', tableStatus: 0, width: 160, widthStatus: true},
        {type: 0, prop: 'cdgoodstype', label: '成大货品规格', tableStatus: 0, width: 100, widthStatus: true},
        {type: 0, prop: 'cdgoodsunit', label: '成大货品单位', tableStatus: 0, width: 100, widthStatus: true},
        {type: 0, prop: 'cdprodarea', label: '成大货品产地', tableStatus: 0},
        {type: 0, prop: 'hybz', label: '病种', tableStatus: 0},
        {type: 0, prop: 'memo', label: '功能主治', tableStatus: 0},
        {type: 0, prop: 'hxsp', label: '核心商品', tableStatus: 0},
        {type: 0, prop: 'glsp', label: '关联商品', tableStatus: 0},
        {type: 2, prop: 'credate', label: '创建时间', tableStatus: 0, width: 160, widthStatus: true},
        {type: 0, prop: 'categoryname6', label: '品类6', tableStatus: 0},
        {type: 0, prop: 'nesstype', label: '必备店型', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '货品状态', tableStatus: 0},
        {type: 0, prop: 'bzsj', label: '标零价', tableStatus: 0},
        {type: 0, prop: 'blmll', label: '标零毛利率', tableStatus: 0},
        {type: 0, prop: 'gdgoodsname', label: '国大货品名称', tableStatus: 0, width: 160, widthStatus: true},
        {type: 0, prop: 'gdgoodstype', label: '国大货品规格', tableStatus: 0, width: 100, widthStatus: true},
        {type: 0, prop: 'gdfactname', label: '国大货品产地', tableStatus: 0, width: 100, widthStatus: true}
      ],
      tableData: [],
      tableHeight: 0,
      loading: false,
      exportColumns: [
        {prop: 'goodsno', label: '商品编码'},
        {prop: 'goodsname', label: '商品名称'},
        {prop: 'goodstype', label: '规格'},
        {prop: 'factname', label: '生产厂家'},
        {prop: 'hybz', label: '会员病种'},
        {prop: 'memo', label: '功能主治'},
        {prop: 'hxsp', label: '核心商品,1是，2否'},
        {prop: 'glsp', label: '关联商品,1是，2否'}
      ],
      goodsVisible: false,
      goodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'goodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 260);
  },
  methods: {
    queryFuntion(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '慢病目录');
      } else if (data === "download1") {
        let data = [];
        this.exportExcelDOM(this.exportColumns, data, '慢病目录模板');
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let formData = this.formData;
      let params = {};
      if (formData.goodsid !== null && formData.goodsid !== "") {
        params.goodsid = formData.goodsid;
      }
      if (Object.keys(params).length <= 0) {
        params = null;
      }
      this.tableLoading = true;
      this.$api.chronicdisease.selectGoodsList({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content;
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.total = res.data.totalSize;
          this.tableLoading = false;
        }
      }).catch(error => {
        this.tableLoading = false;
        return false;
      })
    },
    implUserExcel(e) {
      let _this = this;
      // 通过DOM取文件数据
      let reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = "";
        let reader = new FileReader();
        reader.onload = function (e) {
          let uploadData = [];
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          let wb = XLSX.read(binary, {type: 'binary'});
          const ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          ws.forEach(e => {
            let sheetData = {};
            _this.exportColumns.forEach(res => {
              Object.keys(e).forEach(es => {
                if (es === res.label) {
                  sheetData[res.prop] = e[es];
                }
              })
            });
            uploadData.push(sheetData)
          });
          _this.saveExecl(uploadData)
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(e.raw);
    },
    saveExecl(params) {
      let list = [];
      params.forEach(item => {
        let json = {};
        json.goodsno = item.goodsno.toString();
        json.goodsname = item.goodsname;
        json.goodstype = item.goodstype;
        json.factname = item.factname;
        json.hybz = item.hybz.toString();
        json.memo = item.memo.toString();
        let hxsp = '';
        if (item.hxsp === 1) {
          hxsp = '是';
        } else if (item.hxsp === 2) {
          hxsp = '否';
        }
        json.hxsp = hxsp;
        let glsp = '';
        if (item.glsp === 1) {
          glsp = '是';
        } else if (item.glsp === 2) {
          glsp = '否';
        }
        json.glsp = glsp;
        list.push(json)
      })
      this.loading = true;
      this.$api.chronicdisease.saveDoc({data: list}).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("导入成功");
            this.loading = false;
          } else {
            alert(data.msg);
            this.loading = false;
            return false;
          }
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    openHov() {
      this.goodsVisible = true;
    }
  }
}
