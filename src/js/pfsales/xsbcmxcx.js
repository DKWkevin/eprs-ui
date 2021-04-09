export default {
  name: "Xsbcmxcx",
  data() {
    return {
      xsbcmxcxQueryForm: {
        customid: null,
        goodsid: null,
        startdate: null,
        endofdate: null
      },
      xsbcmxcxTableData: [],
      xsbcmxcxPageNum: 1,
      xsbcmxcxPageSize: 50,
      xsbcmxcxTotal: 0,
      xsbcmxcxLoading: false,
      xsbcmxcxTableHeight: 300,
      xsbcmxcxDialog: '',
      xsbcmxcxStatus: false,
      xsbcmxcxDtlTableData: [],
      xsbcmxcxDtlLoading: false,
      xsbcmxcxHovVisible: false,
      xsbcmxcxHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible: 'xsbcmxcxHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.xsbcmxcxTableHeight = (window.innerHeight - 240);
    this.xsbcmxcxQueryForm.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.xsbcmxcxQueryForm.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.xsbcmxcxPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    //查询总单
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.xsbcmxcxQueryForm;
      if (formData.startdate !== null && formData.startdate !== "") {
        params.startdate = new Date(formData.startdate);
      }
      if (formData.endofdate !== null && formData.endofdate !== "") {
        params.endofdate = new Date(formData.endofdate);
      }
      if (formData.customid !== null && formData.customid !== "") {
        params.customid = formData.customid;
      }
      if (formData.goodsid !== null && formData.goodsid !== "") {
        params.goodsid = formData.goodsid;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.xsbcmxcxLoading = true;
      this.xsbcmxcxTableData = [];
      this.$api.pfsales.selectXsbcmxcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.xsbcmxcxTableData = res.data.content;
        this.xsbcmxcxPageNum = res.data.pageNum;
        this.xsbcmxcxPageSize = res.data.pageSize;
        this.xsbcmxcxTotal = res.data.totalSize;
        this.xsbcmxcxLoading = false;
      }).catch(() => {
        this.xsbcmxcxPageNum = 1;
        this.xsbcmxcxTotal = 0;
        this.xsbcmxcxLoading = false;
        return false;
      })
    },
    //查询细单
    searchdtl(row) {
      let params = {sourceid: row.sourceid};
      this.xsbcmxcxStatus = true;
      this.xsbcmxcxDtlLoading = true;
      this.xsbcmxcxDtlTableData = [];
      this.$api.pfsales.selectXsbcmxcxDtl({params: params}).then(res => {
        this.xsbcmxcxDtlTableData = res.data;
        this.xsbcmxcxLoading = false;
      }).catch(() => {
        this.xsbcmxcxDtlLoading = false;
        return false;
      })
    },
    //hov
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
      } else if (data === "goodsid") {
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
      this.xsbcmxcxHov.hovTitle = hovTitle;
      this.xsbcmxcxHov.hovUrl = hovUrl;
      this.xsbcmxcxHov.hovColumns = hovColumns;
      this.xsbcmxcxHov.fillDataName = "xsbcmxcxQueryForm";
      this.xsbcmxcxHovVisible = true;
    },
    download() {
      let tableColumns = [
        {prop: "saadjdtlid", label: "细单ID"},
        {prop: "credate", label: "日期"},
        {prop: "customid", label: "客户ID"},
        {prop: "companyname", label: "客户名称"},
        {prop: "goodsid", label: "货品ID"},
        {prop: "goodsname", label: "货品名称"},
        {prop: "goodstype", label: "规格"},
        {prop: "prodarea", label: "产地"},
        {prop: "goodsunit", label: "单位"},
        {prop: "taxrate", label: "税率"},
        {prop: "goodsqty", label: "数量"},
        {prop: "unitprice", label: "单价"},
        {prop: "total_line", label: "金额"},
        {prop: "notaxmoney", label: "不含税额"},
        {prop: "taxmoney", label: "税额"},
        {prop: "inbatchid", label: "内部批次ID"},
        {prop: "outbatchid", label: "外部批次ID"},
        {prop: "sourceid", label: "源单ID"},
        {prop: "saadjdocid", label: "总单ID"},
        {prop: "saler", label: "销售员"}
      ];
      this.exportExcelDOM(tableColumns, this.xsbcmxcxTableData, '销售补差明细查询');
    },
    dialogClose() {
      this.xsbcmxcxDtlTableData = [];
      this.xsbcmxcxStatus = false;
    }
  }
}
