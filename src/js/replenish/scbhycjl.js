import JxbhxxcxDtl from "@/views/Function/Replenish/JxbhxxcxDtl";

export default {
  name: 'Scbhycjl',
  components: {JxbhxxcxDtl},
  data() {
    return {
      labelWidth: '110px',
      collapseStatus: true,
      formList: [
        {type: 'inputHov', id: 'batchid', label: '批次ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {
          type: 'select',
          id: 'salesmode',
          label: '经销方式',
          options: [{value: '代销', label: '代销'}, {value: '经销', label: '经销'}]
        },
        {type: 'select', id: 'buyerid', label: '采购支持', options: []},
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'}
      ],
      formData: {
        batchid: null,
        supplyid: null,
        goodsid: null,
        salesmode: null,
        startdate: null,
        endofdate: null,
        buyerid: null,
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:scbhycjl:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:scbhycjl:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'errid', label: '异常ID', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '货品名称', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '货品规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'errtypename', label: '异常类型', type: 0, tableStatus: 0},
        {prop: 'errtext', label: '异常说明', type: 0, tableStatus: 0, width: 500, widthStatus: true},
        {prop: 'credate', label: '日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'batchid', label: '批次ID', type: 0, tableStatus: 0},
        {prop: 'companyid', label: '公司ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '公司名称', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经销方式', type: 0, tableStatus: 0},
        {prop: 'buyername', label: '采购支持', type: 0, tableStatus: 0}
      ],
      tableData: [],
      paymodeOptions: [],
      dtlVisible: false,
      dtlType: 0,
      dtlData: {},
      batchVisible: false,
      batchHov: {
        hovTitle: '批次查询',
        hovUrl: "batchidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'batchVisible',
        hovColumns:
          [
            {id: "batchid", name: "批次ID", queryStatus: true, dataStatus: 2, fillid: "batchid"},
            {id: "companyid", name: "", value: Number(sessionStorage['companyid']), queryStatus: false, dataStatus: 2}
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
      supplyVisible: false,
      supplyHov: {
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
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
    this.$api.hov.selectBuyid({pageNum: 1, pageSize: 999, params: null}).then(res => {
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
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '生成补货异常记录' + this.getNewDate());
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      if (this.returnValue(formData.batchid) === true) {
        params.batchid = formData.batchid;
      }
      if (this.returnValue(formData.supplyid) === true) {
        params.supplyid = formData.supplyid;
      }
      if (this.returnValue(formData.goodsid) === true) {
        params.goodsid = formData.goodsid;
      }
      if (this.returnValue(formData.salesmode) === true) {
        params.salesmode = formData.salesmode;
      }
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (this.returnValue(formData.buyerid) === true) {
        params.buyerid = formData.buyerid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.tableData = [];
      this.loading = true;
      this.$api.replenish.selectScbhycjlYc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    openHov(id) {
      if (id === "batchid") {
        this.batchVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "batchid") {
        this.batchVisible = true;
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
