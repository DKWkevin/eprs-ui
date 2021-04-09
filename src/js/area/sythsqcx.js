export default {
  name: "Sythsqcx",
  data() {
    return {
      sythsqcxQueryForm: {
        startdate: null,
        endofdate: null,
        goodsid: null,
        counterid: null
      },
      sythsqcxTableData: [],
      sythsqcxPageNum: 1,
      sythsqcxPageSize: 50,
      sythsqcxTotal: 0,
      sythsqcxLoading: false,
      sythsqcxTableHeight: 300,
      sythsqcxHovVisible: false,
      sythsqcxHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "sythsqcxQueryForm",
        parentVisible: 'sythsqcxHovVisible',
        hovColumns:
          [
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.sythsqcxTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.sythsqcxPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.sythsqcxQueryForm;
      if (formData.counterid !== null && formData.counterid !== "") {
        params.counterid = formData.counterid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.sythsqcxLoading = true;
      this.sythsqcxTableData = [];
      this.$api.marketing.selectsythsqcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.sythsqcxTableData = res.data.content;
        this.sythsqcxPageNum = res.data.pageNum;
        this.sythsqcxPageSize = res.data.pageSize;
        this.sythsqcxTotal = res.data.totalSize;
        this.sythsqcxLoading = false;
      }).catch(() => {
        this.sythsqcxPageNum = 1;
        this.sythsqcxTotal = 0;
        this.sythsqcxLoading = false;
        return false;
      })
    },
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = "";
      let hovColumns = []
      if (data === 'goodsid') {
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
      } else if (data === 'counterid') {
        hovTitle = '门店查询';
        hovUrl = "counteridhov/select";
        hovColumns =
          [
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      }
      this.sythsqcxHov.hovTitle = hovTitle;
      this.sythsqcxHov.hovUrl = hovUrl;
      this.sythsqcxHov.hovColumns = hovColumns;
      this.sythsqcxHovVisible = true;
    },
    download() {
      let tableColumns = [
        {prop: "id", label: "申请单ID"},
        {prop: "backwhyid", label: "退货原因ID"},
        {prop: "ddlname", label: "退货原因"},
        {prop: "credate", label: "日期"},
        {prop: "doflag", label: "执行标志"},
        {prop: "errmsg", label: "异常信息"},
        {prop: "subackdocid", label: "退货通知单ID"},
        {prop: "zdoutbatchid", label: "执行外部批次"},
        {prop: "stcompanyid", label: "保管单位ID"},
        {prop: "companyname", label: "保管单位"},
        {prop: "goodsid", label: "货品ID"},
        {prop: "goodsname", label: "品名"},
        {prop: "goodstype", label: "规格"},
        {prop: "goodsunit", label: "单位"},
        {prop: "prodarea", label: "产地"},
        {prop: "taxrate", label: "税率"},
        {prop: "lotno", label: "批号"},
        {prop: "outbatchid", label: "外部批次"},
        {prop: "inbatchid", label: "内部批次"},
        {prop: "goodsstatusid", label: "货品状态"},
        {prop: "remqty", label: "结余数量"},
        {prop: "employeename", label: "申请人"},
        {prop: "auditlevel", label: "审核级别"}
      ];
      this.exportExcelDOM(tableColumns, this.sythsqcxTableData, ' 沈阳退货申请查询');
    }
  }
}
