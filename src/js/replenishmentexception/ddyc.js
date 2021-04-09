export default {
  name: 'Ddyc',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishmentexception:ddyc:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishmentexception:ddyc:select"}
      ],
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商'}
      ],
      formData: {startdate: null, endofdate: null, supplyid: null},
      widthStatus: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'orderid', label: '订单ID', type: 0, tableStatus: 0},
        {prop: 'credate', label: '日期', type: 2, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商', type: 0, tableStatus: 0},
        {prop: 'total', label: '金额', type: 0, tableStatus: 0},
        {prop: 'usestatusname', label: '状态', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          type: 1,
          width: 120,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.selectDtl", perms: "replenishmentexception:ddyc:selectdtl"}
          ]
        }
      ],
      docTableData: [],
      pageStatus: false,
      dialogWidth: '1000px',
      dialogTop: '10vh',
      dialogTitle: '查询细单',
      loading: false,
      dtlTableColumns: [
        {prop: 'orderdtlid', label: '细单ID', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'planqty', label: '应定数量', type: 0, tableStatus: 0},
        {prop: 'realqty', label: '实定数量', type: 0, tableStatus: 0},
        {prop: 'unitprice', label: '单价', type: 0, tableStatus: 0},
        {prop: 'total_lines', label: '金额', type: 0, tableStatus: 0},
        {prop: 'sumarriveqty', label: '累计到货数量', type: 0, tableStatus: 0},
        {prop: 'arrivaldate', label: '到货日期', type: 2, tableStatus: 0},
        {prop: 'finishflag', label: '完成标志', type: 0, tableStatus: 0}
      ],
      dtlTableData: [],
      dtlVisible: false,
      dtlTableHeight: 400,
      dtlLoading: false,
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "customid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "customname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.docTableColumns, this.docTableData, '订单异常' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.formData;
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (this.returnValue(formData.supplyid) === true) {
        params.supplyid = formData.supplyid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.loading = true;
      this.$api.replenishmentexception.selectDdycDoc({
        pageNum: pageNum,
        pageSize: pageSize,
        params: params
      }).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
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
    handleFunction(data) {
      this.dtlLoading = true;
      this.$api.replenishmentexception.selectDdycDtl({orderid: data.row.orderid}).then(res => {
        if (res.code === 200) {
          this.dtlTableData = res.data;
          this.dtlLoading = false;
        }
      }).catch(error => {
        this.dtlLoading = false;
        return false;
      });
      this.dtlVisible = true;
    },
    openHov() {
      this.supplyVisible = true;
    },
    dialogClose() {
      this.dtlVisible = false;
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
