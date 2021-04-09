export default {
  name: 'Gysxxcx',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'}
      ],
      formData: {
        supplyid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "business:gysxxcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "business:gysxxcx:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'contactman', label: '联系人', tableStatus: 0},
        {type: 0, prop: 'mobilephone', label: '电话', tableStatus: 0},
        {type: 0, prop: 'invcompanyname', label: '发票名称', tableStatus: 0},
        {type: 0, prop: 'taxno', label: '税号', tableStatus: 0},
        {type: 0, prop: 'bankname', label: '开户行', tableStatus: 0},
        {type: 0, prop: 'accno', label: '账号', tableStatus: 0},
        {type: 0, prop: 'state', label: '所在省', tableStatus: 0},
        {type: 0, prop: 'city', label: '所在市', tableStatus: 0},
        {type: 0, prop: 'invaddress', label: '发票地址', tableStatus: 0},
        {type: 0, prop: 'invphone', label: '发票电话', tableStatus: 0},
        {type: 0, prop: 'checker', label: 'AP核算员', tableStatus: 0}
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
            {id: "companyid", name: "合作伙伴ID", queryStatus: true, dataStatus: 2, fillid: "partener"},
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
        this.exportExcelDOM(this.tableColumns, this.tableData, '供应商信息查询' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let formData = this.formData;
      let params = paramsFormat(formData);
      this.loading = true;
      this.$api.bussiness.selectGysxxcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
      }
    },
    closeDialog() {
      this.dtlData = [];
      this.dtlVisible = false;
    }
  }
}
