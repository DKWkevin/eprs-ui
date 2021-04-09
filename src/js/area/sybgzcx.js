export default {
  name: "Sybgzcx",
  data() {
    return {
      sybgzcxQueryForm: {
        goodsid: null,
        storename: null,
        supplyid: null
      },
      sybgzcxTableData: [],
      sybgzcxPageNum: 1,
      sybgzcxPageSize: 50,
      sybgzcxTotal: 0,
      sybgzcxLoading: false,
      sybgzcxTableHeight: 300,
      sybgzcxStoreOptions: [],
      sybgzcxHovVisible: false,
      sybgzcxHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "sybgzcxDtlForm",
        parentVisible: 'sybgzcxHovVisible',
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
    this.sybgzcxTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.sybgzcxPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.sybgzcxQueryForm;
      if (formData.counterid !== null && formData.counterid !== "") {
        params.counterid = formData.counterid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.sybgzcxLoading = true;
      this.sybgzcxTableData = [];
      this.$api.area.selectSybgzcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.sybgzcxTableData = res.data.content;
        this.sybgzcxPageNum = res.data.pageNum;
        this.sybgzcxPageSize = res.data.pageSize;
        this.sybgzcxTotal = res.data.totalSize;
        this.sybgzcxLoading = false;
      }).catch(() => {
        this.sybgzcxPageNum = 1;
        this.sybgzcxTotal = 0;
        this.sybgzcxLoading = false;
        return false;
      })
    },
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'supplyid') {
        hovTitle = '供应商查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns = [
          {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
          {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
          {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
        ];
      } else if (data === 'goodsid') {
        hovTitle = '商品查询';
        hovUrl = 'goodsidhov/select';
        hovColumns = [
          {id: "goodsid", name: "商品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "商品名称", queryStatus: true, dataStatus: 1},
          {id: "opcode", name: "商品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "商品规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "商品单位", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "商品产地", queryStatus: false, dataStatus: 1}
        ];
      }
      this.ggsdwzsgHov.hovTitle = hovTitle;
      this.ggsdwzsgHov.hovUrl = hovUrl;
      this.ggsdwzsgHov.fillDataName = "sybgzcxQueryForm";
      this.ggsdwzsgHov.hovColumns = hovColumns;
      this.sybgzcxHovVisible = true;
    },
    download() {
      let tableColumns = [
        {prop: "goodsid", label: "货品ID"},
        {prop: "goodsname", label: "品名"},
        {prop: "goodstype", label: "规格"},
        {prop: "goodsunit", label: "单位"},
        {prop: "prodarea", label: "产地"},
        {prop: "storename", label: "仓储区域"},
        {prop: "remqty", label: "库存"},
        {prop: "lotid", label: "批号ID"},
        {prop: "lotno", label: "批号"},
        {prop: "posid", label: "货位ID"},
        {prop: "posno", label: "货位编码"},
        {prop: "invaliddate", label: "效期"}
      ];
      this.exportExcelDOM(tableColumns, this.sybgzcxTableData, '门店维度范围');
    }
  }
}
