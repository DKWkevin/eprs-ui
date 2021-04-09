import YwskcDtl from "@/views/Function/Replenish/YwskcDtl";
import XLSX from 'xlsx'

export default {
  name: 'Ywskc',
  components: {YwskcDtl},
  data() {
    return {
      labelWidth: '110px',
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 220, labelWidth: 50},
        {type: 'inputHov', id: 'inputmanid', label: '操作人ID', formWidth: 220, labelWidth: 60},
        {type: 'select', id: 'cgzc', label: '采购支持', options: []}
      ],
      formData: {
        startdate: null,
        endofdate: null,
        inputmanid: null,
        goodsid: null,
        cgzc: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:ywskc:select"},
        {id: "upload", icon: "fa fa-upload", label: "action.upload", perms: 'replenishment:ywskc:add'},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:ywskc:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {
          prop: 'locknolotqty',
          label: '无批号锁库存',
          type: 5,
          tableStatus: 0,
          width: 100,
          widthStatus: true,
          options: [{value: 'locknolotqty'}]
        },
        {prop: 'memo', label: '备注', type: 0, tableStatus: 0, width: 100, widthStatus: true},
        {prop: 'cgzc', label: '采购支持', type: 0, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0, minWidth: 100},
        {prop: 'cgjl', label: '采购经理', type: 0, tableStatus: 0},
        {prop: 'zxjj', label: '最新进价', type: 0, tableStatus: 0},
        {prop: 'lskc', label: '连锁库存', type: 0, tableStatus: 0},
        {prop: 'pfkc', label: '批发库存', type: 0, tableStatus: 0},
        {
          prop: 'caozuo', label: '操作', type: 1, fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'delete', icon: "fa fa-delete", label: "action.delete", perms: "replenishment:ywskc:delete"}
          ]
        }
      ],
      tableData: [],
      dtlVisible: false,
      dtlData: {},
      goodsVisible: false,
      goodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyHov',
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
      employeeVisible: false,
      employeeHov: {
        hovTitle: '操作人查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyHov',
        hovColumns:
          [
            {id: "employeeid", name: "操作人ID", queryStatus: true, dataStatus: 2, fillid: "inputmanid"},
            {id: "employeename", name: "操作人名称", queryStatus: true, dataStatus: 1},
            {id: "employeeopcode", name: "操作人操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
    this.$api.hov.selectBuyid({params: null}).then(res => {
      if (res.code === 200) {
        let params = [];
        res.data.forEach(e => {
          let tel = {};
          tel.value = e.buyerid;
          tel.label = e.buyername;
          params.push(tel);
        });
        this.formList[3].options = params;
      }
    }).catch(error => {
      return false;
    });
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "upload") {
        this.tableData = [];
        this.implUserExcel();
        this.$api.replenish.exportYwskcInset(this.tableData).then(res => {
          if (res.code === 200) {
            alert("导入成功");
            this.queryFunction('query');
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '业务锁库存' + this.getNewDate());
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" || e !== "endofdate") {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
          }
        }
      });
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.tableData = [];
      this.loading = true;
      this.$api.replenish.selectYwskcDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.currentPage = res.data.pageNum;
          this.$refs.doctable.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(data) {
      if (data.row.locknolotqty === 0) {
        alert("选中单据无批号锁库存为0");
        return false;
      }
      this.$api.replenish.deleteYwskcDoc({goodsid: data.row.goodsid}).then(res => {
        if (res.code === 200) {
          alert("删除成功");
          this.queryFunction('query');
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    openHov(id) {
      if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "inputmanid") {
        this.employeeVisible = true;
      }
    },
    openA(data) {
      this.dtlData = data.row;
      this.dtlVisible = true;
    },
    returnValue(data) {
      return data !== null && data !== "";
    },
    implUserExcel(e) {
      let fileName = e.target.files[0];
      let _this = this;
      let reader = new FileReader();
      reader.readAsBinaryString(fileName);
      let uploadData = [];
      reader.onload = function (e) {
        const workbook = XLSX.read(e.target.result, {type: "binary"});
        let sheetList = workbook.SheetNames;
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[sheetList]);
        ws.forEach(e => {
          var sheetData = {};
          _this.tableColumns.forEach(res => {
            Object.keys(e).forEach(es => {
              if (es === res.label) {
                sheetData[res.prop] = e[es];
              }
            })
          });
          /* sheetData.inputmanid=Number(sessionStorage.getItem("userid"));
           sheetData.inputmanname=sessionStorage.getItem("username");*/
          //sheetData.credate=null;
          uploadData.push(sheetData)
        })
      };
      this.tableData = uploadData;
    }
  }
}
