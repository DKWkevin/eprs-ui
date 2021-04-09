export default {
  name: 'Cgqdcx',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'companyid', label: '公司ID'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {type: 'inputHov', id: 'hbid', label: '合作伙伴ID'},
        {
          type: 'select',
          id: 'usestatus',
          label: '单据状态',
          options: [{value: 0, label: '停用'}, {value: 1, label: '正式'}, {value: 2, label: '暂停'}, {value: 3, label: '终止'}],
          clearable: true
        },
        {
          type: 'select',
          id: 'pcdeptid',
          label: '部门',
          options: [{value: 6, label: '批发'}, {value: 83672, label: '连锁'}],
          clearable: true
        },
        {type: 'check', id: 'check1', label: ''},
      ],
      formData: {
        companyid: 19940, supplyid: null, goodsid: null, hbid: null, pcdeptid: null, usestatus: null, check1: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "business:cgqdcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "business:cgqdcx:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'channelid', label: '渠道ID', tableStatus: 0},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'paymodename', label: '付款方式', tableStatus: 0},
        {type: 0, prop: 'suprice', label: '进价', tableStatus: 0},
        {type: 0, prop: 'prioritiesno', label: '进货优先级', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '状态', tableStatus: 0},
        {type: 0, prop: 'companyid', label: '公司ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '公司名称', tableStatus: 0},
        {type: 0, prop: 'pcdtpename', label: '采购部门', tableStatus: 0},
        {type: 0, prop: 'buyer', label: '采购员', tableStatus: 0},
        {type: 0, prop: 'cgzc', label: '采购支持', tableStatus: 0},
        {type: 0, prop: 'lmcompanyname', label: '物流收货单位', tableStatus: 0},
        {type: 2, prop: 'credate', label: '创建日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'inputmanname', label: '录入人', tableStatus: 0},
        {type: 0, prop: 'salesmode', label: '经销方式', tableStatus: 0},
        {type: 0, prop: 'payterm', label: '账期', tableStatus: 0},
        {type: 0, prop: 'discprice', label: '折现价格', tableStatus: 0},
        {type: 0, prop: 'largfactdays', label: '最大出厂天数', tableStatus: 0},
        {type: 0, prop: 'pccycle', label: '采购周期', tableStatus: 0},
        {type: 0, prop: 'sucycle', label: '到货周期', tableStatus: 0},
        {type: 0, prop: 'backmode', label: '财务退货方式', tableStatus: 0},
        {type: 0, prop: 'hbid', label: '合作伙伴ID', tableStatus: 0},
        {type: 0, prop: 'hbname', label: '合作伙伴名称', tableStatus: 0},
        {type: 0, prop: 'hbcgjl', label: '合作伙伴采购经理', tableStatus: 0},
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
      partenerVisible: false,
      partenerHov: {
        hovTitle: '合作伙伴查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'partenerVisible',
        hovColumns:
          [
            {id: "companyid", name: "合作伙伴ID", queryStatus: true, dataStatus: 2, fillid: "hbid"},
            {id: "companyname", name: "合作伙伴名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "合作伙伴操作码", queryStatus: true, dataStatus: 1}
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
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else {
        this.exportExcelDOM(this.tableColumns, this.tableData, '采购渠道查询' + this.getNewDate())
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
        if (e !== "check1") {
          if (formData[e] !== null && formData[e] !== "") {
            params[e] = formData[e];
          }
        }
      });
      if (formData.check1 !== null && formData.check1 !== "") {
        if (formData.check1 === true) {
          params.ifcheck = 1;
        } else {
          params.ifcheck = 0;
        }
      } else {
        params.ifcheck = 0;
      }
      if (Object.keys(params).length <= 0) {
        params = null;
      }
      this.tableData = [];
      this.loading = true;
      this.$api.bussiness.selectCgqdcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
      } else if (id === "hbid") {
        this.partenerVisible = true;
      } else if (id === "companyid") {
        this.companyVisible = true;
      }
    }
  }
}
