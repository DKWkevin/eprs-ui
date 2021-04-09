export default {
  name: 'Spxscx',
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'}
      ],
      formData: {
        startdate: null,
        endofdate: null,
        supplyid: null,
        goodsid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "business:spxscx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "business:spxscx:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'salesdtlid', label: '总单ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '货品名称', tableStatus: 0},
        {type: 0, prop: 'goodsqty', label: '货品数量', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'lotno', label: '批号', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
        {type: 0, prop: 'total_lines', label: '金额', tableStatus: 0},
        {type: 0, prop: 'customid', label: '客户ID', tableStatus: 0},
        {type: 0, prop: 'customname', label: '客户名称', tableStatus: 0},
        {type: 0, prop: 'customno', label: '客户编码', tableStatus: 0},
        {type: 0, prop: 'mdtypename', label: '客户类型', tableStatus: 0},
        {type: 0, prop: 'sa_mode', label: '销售模式', tableStatus: 0},
        {type: 0, prop: 'satypeid', label: '销售类型', tableStatus: 0}
      ],
      tableData: [],
      tableHeight: 0,
      loading: false,
      dtlVisible: false,
      dtlvisible: false,
      dtlTitle: '',
      dialogTop: '12vh',
      dialogWidth: '1000px',
      dtlloading: false,
      dtlTableColumns: [],
      dtlData: [],
      dtlHeight: 300,
      supplyVisible: false,
      supplyHovData: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
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
      companyVisible: false,
      companyHov: {
        hovTitle: '公司查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'companyVisible',
        hovColumns:
          [
            {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
            {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else {
        this.exportExcelDOM(this.tableColumns, this.tableData, '商品销售查询' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let formData = this.formData;
      let params = {};
      if ((formData.startdate !== null && formData.startdate !== "") && (formData.endofdate !== null && formData.endofdate !== "")) {
        params.startdate = formData.startdate;
        params.endofdate = formData.endofdate;
      } else {
        alert("请填写日期");
        return false;
      }
      let start = formData.startdate.getMonth() + 1;
      let end = formData.endofdate.getMonth() + 1;
      if ((end - start) > 1) {
        alert("查询时间段不能超过一个月");
        return false;
      }
      if (this.dateValue(formData.supplyid) === true) {
        params.supplyid = formData.supplyid;
      }
      if (this.dateValue(formData.goodsid) === true) {
        params.goodsid = formData.goodsid;
      }
      if (this.dateValue(formData.supplyid) === false && this.dateValue(formData.goodsid) === false) {
        alert("供应商ID与货品ID不能同时为空");
        return false;
      }
      this.tableData = [];
      this.loading = true;
      this.$api.bussiness.selectSpxscx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    queryHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      }
    },
    dateValue(data) {
      return data !== null && data !== "";
    }
  }
}
