import {exportExcel} from "@/utils/functions"
import XLSX from 'xlsx'
import {selectGroup} from "@/utils/drops";

export default {
  name: 'DqtjdqshExecl',
  props: {
    cityid: {type: Array}
  },
  data() {
    return {
      dialogVisible: true,
      docTitle: '必调品商品目录',
      dialogWidth: '1000px',
      dialogTop: '12vh',
      base: {
        counterid: null,
        goodsid: null
      },
      tableColumns: [
        /* {prop:'cityid',label:'城市ID',type:0,tableStatus:0},
         {prop:'cityname',label:'城市名称',type:0,tableStatus:0,width:160},
         {prop:'areaid',label:'区域ID',type:0,tableStatus:0},
         {prop:'areaname',label:'区域名称',type:0,tableStatus:0,width:160},*/
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '货品名称', type: 0, tableStatus: 0, width: 160},
        {prop: 'goodstype', label: '货品规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '货品单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '货品产地', type: 0, tableStatus: 0, width: 160},
        {prop: 'counterid', label: '门店ID', type: 0, tableStatus: 0, width: 160},
        {prop: 'countername', label: '门店名称', type: 0, tableStatus: 0, width: 160},
        {prop: 'inbatchid', label: '内部批次', type: 0, tableStatus: 0, width: 160},
        {prop: 'goodsqty', label: '数量', type: 0, tableStatus: 0, width: 160},
        {prop: 'isregional', label: '是否跨区域', type: 0, tableStatus: 1, width: 160},
        {prop: 'isregionalname', label: '是否跨区域', type: 0, tableStatus: 0, width: 160},
        {prop: 'inputmanid', label: '录入人ID', type: 0, tableStatus: 0},
        {prop: 'inputmanname', label: '录入人名称', type: 0, tableStatus: 0, width: 100},
        {prop: 'credate', label: '创建日期', type: 2, tableStatus: 0, width: 160, widthStatus: true},
        {prop: 'ifmove', label: '必调或控制调剂', type: 0, tableStatus: 1, width: 100},
        {
          prop: 'caozuo', label: '操作', fixed: 'right', type: 1, width: 80, widthStatus: true, tableStatus: 0, options: [
            {id: "delete", icon: "fa fa-delete", label: "action.delete", perms: 'region:kctjdqsh:update'}
          ]
        }
      ],
      loading: false,
      tableData: [],
      tableHeight: 350,
      files: null,
      cityOptions: [],
      areaOptions: [],
      labelPosition: 'right',
      labelWidth: '100px',
      dtlVisible: false,
      dtlTitle: '新增',
      saveStatus: true,
      dtlFormData: {
        /* cityid:null,
         areaid:null,*/
        goodsid: null,
        counterid: null,
        inbatchid: null,
        goodsqty: null,
        isregional: null
      },
      pageSize: 1000,
      currentPage: 1,
      total: 0,
      baseRules: {
        /* cityid:{ required: true, message: '城市ID不能为空', trigger: 'change' },
         areaid:{ required: true, message: '区域ID不能为空', trigger: 'change'},*/
        goodsid: {required: true, message: '货品ID不能为空', trigger: 'blur'},
        counterid: {required: true, message: '门店ID不能为空', trigger: 'blur'},
        inbatchid: {required: true, message: '内部批次不能为空', trigger: 'blur'},
        goodsqty: {required: true, message: '数量不能为空', trigger: 'blur'},
        isregional: {required: true, message: '是否跨区域不能为空', trigger: 'change'}
      },
      inportStatus: false,
      uploading: false,
      queryGoodsVisible: false,
      queryGoodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'queryGoodsVisible',
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
      queryCounterVisible: false,
      queryCounterHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'queryCounterVisible',
        hovColumns:
          [
            {id: "companyid", name: "门店ID", queryStatus: true, display: 1, dataStatus: 2, value: null},
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "counteropcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      goodsVisible: false,
      goodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "dtlFormData",
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
      counterVisible: false,
      counterHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "dtlFormData",
        parentVisible: 'counterVisible',
        hovColumns:
          [
            {id: "companyid", name: "门店ID", queryStatus: true, display: 1, dataStatus: 2, value: null},
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "counteropcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      exportColumns: [
        {prop: 'goodsid', label: '货品ID'},
        {prop: 'counterid', label: '门店ID'},
        {prop: 'inbatchid', label: '内部批次'},
        {prop: 'goodsqty', label: '数量'},
        {prop: 'isregional', label: '是否跨区域,1-是,0-否'},
        {prop: 'ifmove', label: '必调或控制调剂,1-必调,2-为控制调剂'},
      ]
    }
  },
  methods: {
    dialogColse() {
      this.$parent.dqtjdqshExeclVisible = false;
    },
    dtlClose() {
      //this.dtlFormData.cityid=null;
      //this.dtlFormData.areaid=null;
      this.dtlFormData.goodsid = null;
      this.dtlVisible = false;
    },
    cityChange() {
      let cityid = this.dtlFormData.cityid;
      if (cityid !== null && cityid !== "") {
        this.areaOptions = selectGroup(cityid);
      } else {
        alert("请先选择城市ID");
        return false;
      }
    },
    insertSingle() {
      let params = {};
      //params.cityid=this.dtlFormData.cityid;
      //params.areaid=this.dtlFormData.areaid;
      params.goodsid = this.dtlFormData.goodsid;
      params.counterid = this.dtlFormData.counterid;
      params.inbatchid = this.dtlFormData.inbatchid;
      params.goodsqty = this.dtlFormData.goodsqty;
      params.isregional = this.dtlFormData.isregional;
      params.usestatus = 1;
      params.inputmanid = Number(sessionStorage['userid']);
      this.$refs.baseForm.validate((vaild) => {
        if (vaild) {
          this.$api.area.insertSingle(params).then(res => {
            if (res.code === 200) {
              if (res.data === 1) {
                alert("保存成功");
                this.dtlClose();
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        } else {
          return false;
        }
      })
    },
    handleFunction(data) {
      let params = {};
      params.inbatchid = data.row.inbatchid;
      params.counterid = data.row.counterid;
      params.goodsid = data.row.goodsid;
      if (confirm("是否删除") === true) {
        params.usestatus = 1;
        this.$api.area.delDqtjdqshExecl(params).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("删除成功");
              this.queryExecl();
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      } else {
        return false;
      }
    },
    download() {
      this.exportExcelDOM(this.tableColumns, this.tableData, '必调商品目录');
    },
    downloadMb() {
      let tHeader = ['货品ID', '门店ID', '内部批次', '数量', '是否跨区域,1-是,0-否', '必调或控制调剂,1-必调,2-为控制调剂'];
      let filterVal = ['goodsid', 'counterid', 'inbatchid', 'goodsqty', 'isregional', 'ifmove'];
      let list = [];
      let filename = "必调商品目录模板";
      exportExcel(tHeader, filterVal, list, filename);
    },
    queryExecl() {
      let pageSize = this.pageSize;
      this.selectDoc(1, pageSize);
    },
    handleQuery(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      Object.keys(this.base).forEach(e => {
        if (this.base[e] !== null && this.base[e] !== '') {
          params[e] = this.base[e];
        }
      });
      params.inputmanid = Number(sessionStorage['userid']);
      this.loading = true;
      this.tableData = [];
      this.$api.area.selectDqtjqshExecl({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.docExeclTable.pageSize = res.data.pageSize;
          this.$refs.docExeclTable.currentPage = res.data.pageNum;
          this.$refs.docExeclTable.total = res.data.totalSize;
          this.inportStatus = true;
          this.saveStatus = true;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    //必调不为空	1 必调 2控制调剂
    saveExecl(uploadData) {
      let params = {};
      params.inputmanid = Number(sessionStorage['userid']);
      params.data = [];
      let status = true;
      uploadData.forEach(e => {
        let tel = {};
        //tel.cityid=e.cityid;
        // tel.areaid=e.areaid;
        tel.goodsid = e.goodsid;
        tel.inputmanid = e.inputmanid;
        tel.counterid = e.counterid;
        tel.inbatchid = e.inbatchid;
        tel.goodsqty = e.goodsqty;
        tel.ifmove = e.ifmove;
        if (e.ifmove === 1 && e.isregional === undefined) {
          status = false;
        }
        if (e.isregional === "是") {
          tel.isregional = 1;
        } else if (e.isregional === "否") {
          tel.isregional = 0;
        } else {
          tel.isregional = e.isregional;
        }
        tel.usestatus = 1;
        params.data.push(tel);
      });
      if (status === false) {
        alert("必调或控制调剂为必调时,是否跨区域不能为空");
        return false;
      }
      this.uploading = true;
      this.$api.area.saveDqtjqshExecl(params).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("导入成功");
            this.uploading = false;
          } else {
            alert(res.msg);
            this.uploading = false;
            return false;
          }
        }
      }).catch(error => {
        this.uploading = false;
        return false;
      })
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
          _this.exportColumns.forEach(res => {
            Object.keys(e).forEach(es => {
              if (es === res.label) {
                sheetData[res.prop] = e[es];
              }
            })
          });
          sheetData.inputmanid = Number(sessionStorage.getItem("userid"));
          sheetData.inputmanname = sessionStorage.getItem("username");
          uploadData.push(sheetData)
        });
        if (uploadData.length > 0) {
          _this.inportStatus = false;
          _this.saveStatus = false;
          _this.saveExecl(uploadData);
        } else {
          _this.saveStatus = true;
        }
      };
    },
    openHov(id) {
      if (id === 'goodsid') {
        this.goodsVisible = true;
      } else if (id === 'counterid') {
        this.counterHov.hovColumns[0].value = Number(sessionStorage['companyid']);
        this.counterVisible = true;
      } else if (id === 'queryGoods') {
        this.queryGoodsVisible = true;
      } else if (id === 'queryCounter') {
        this.queryCounterHov.hovColumns[0].value = Number(sessionStorage['companyid']);
        this.queryCounterVisible = true;
      }
    }
  }
}
