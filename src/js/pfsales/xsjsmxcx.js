export default {
  name: "Xsjsmxcx",
  data() {
    return {
      xsjsmxcxQueryForm: {
        sasetdtlid: null,
        sasetdocid: null,
        startdate: null,
        endofdate: null,
        customid: null,
        goodsid: null
      },
      xsjsmxcxTableData: [],
      xsjsmxcxPageNum: 1,
      xsjsmxcxPageSize: 50,
      xsjsmxcxTotal: 0,
      xsjsmxcxLoading: false,
      xsjsmxcxTableHeight: 300,
      xsjsmxcxHovVisible: false,
      xsjsmxcxHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "xsjsmxcxQueryForm",
        parentVisible: 'xsjsmxcxHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.xsjsmxcxTableHeight = (window.innerHeight - 240);
    this.xsjsmxcxQueryForm.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.xsjsmxcxQueryForm.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.xsjsmxcxPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.xsjsmxcxQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      params.companyid = Number(sessionStorage['companyid']);
      this.xsjsmxcxLoading = true;
      this.xsjsmxcxTableData = [];
      this.$api.pfsales.selectXsjsmxcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.xsjsmxcxTableData = res.data.content;
        this.xsjsmxcxPageNum = res.data.pageNum;
        this.xsjsmxcxPageSize = res.data.pageSize;
        this.xsjsmxcxTotal = res.data.totalSize;
        this.xsjsmxcxLoading = false;
      }).catch(() => {
        this.xsjsmxcxPageNum = 1;
        this.xsjsmxcxTotal = 0;
        this.xsjsmxcxLoading = false;
        return false;
      })
    },
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = "";
      let hovColumns = [];
      if (data === 'customid') {
        hovTitle = '客户查询';
        hovUrl = "customidhov/select";
        hovColumns =
          [
            {id: "customid", name: "客户ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "客户名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "客户操作码", queryStatus: true, dataStatus: 1}
          ]
      } else {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns =
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
          ]
      }
      this.xsjsmxcxHov.hovTitle = hovTitle;
      this.xsjsmxcxHov.hovUrl = hovUrl;
      this.xsjsmxcxHov.hovColumns = hovColumns;
      this.xsjsmxcxHovVisible = true;
    },
    download() {
      let tableColumns = [
        {prop: "sasetdocid", label: "结算单ID"},
        {prop: "credate", label: "日期"},
        {prop: "customid", label: "客户ID"},
        {prop: "companyname", label: "客户名称"},
        {prop: "goodsid", label: "货品ID"},
        {prop: "goodsname", label: "品名"},
        {prop: "goodstype", label: "规格"},
        {prop: "goodsunit", label: "单位"},
        {prop: "prodarea", label: "产地"},
        {prop: "goodsqty", label: "数量"},
        {prop: "unitprice", label: "单价"},
        {prop: "total_line", label: "金额"},
        {prop: "usestatus", label: "状态"},
        {prop: "recflag", label: "收款完成标志"},
        {prop: "lotno", label: "批号"},
        {prop: "salesid", label: "销售单ID"},
        {prop: "sadtlid", label: "销售细单ID"}
      ];
      this.exportExcelDOM(tableColumns, this.xsjsmxcxTableData, '销售结算明细查询');
    }
  }
}
