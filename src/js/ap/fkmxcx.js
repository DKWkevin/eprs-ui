export default {
  name: 'Fkmxcx',
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '创建日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 180, labelWidth: 65},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 180, labelWidth: 65},
        {
          type: 'select',
          id: 'paytype',
          label: '类型',
          options: [{value: "冲应付", label: '冲应付'}, {value: "预付", label: '预付'}],
          clearable: true
        },
        {type: 'inputHov', id: 'companyidhz', label: '合作伙伴ID', formWidth: 220, labelWidth: 75},
        {type: 'inputHov', id: 'employeenamehz', label: '合作伙伴采购经理', formWidth: 260, labelWidth: 125},
      ],
      formData: {
        startdate: null,
        endofdate: null,
        supplyid: null,
        goodsid: null,
        paytype: null,
        companyidhz: null,
        employeenamehz: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ap:fkmxcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ap:fkmxcx:select"}
      ],
      docTableHeight: 300,
      loading: false,
      tableColumns: [
        {type: 0, prop: 'susetdocid', label: '总单ID', tableStatus: 0},
        {type: 2, prop: 'confirmdate', label: '付款确认日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'paytype', label: '类型', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'goodsqty', label: '数量', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
        {type: 0, prop: 'total_line', label: '金额', tableStatus: 0},
        {type: 0, prop: 'payid', label: '付款单ID', tableStatus: 0},
        {type: 0, prop: 'companyidhz', label: '合作伙伴ID', tableStatus: 0},
        {type: 0, prop: 'companynamehz', label: '合作伙伴', tableStatus: 0},
        {type: 0, prop: 'employeenamehz', label: '合作伙伴采购经理', tableStatus: 0},
      ],
      tableData: [],
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
      companyidhzVisible: false,
      companyidhzHov: {
        hovTitle: '合作伙伴查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'companyidhzVisible',
        hovColumns:
          [
            {id: "companyid", name: "合作伙伴ID", queryStatus: true, dataStatus: 2, fillid: "companyidhz"},
            {id: "companyname", name: "合作伙伴名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "合作伙伴操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      employeenamehzVisible: false,
      employeenamehzHov: {
        hovTitle: '采购经理查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'employeenamehzVisible',
        hovColumns:
          [
            {id: "employeeid", name: "采购经理ID", queryStatus: true, dataStatus: 2},
            {id: "employeename", name: "采购经理名称", queryStatus: true, dataStatus: 1, fillid: "employeenamehz"},
            {id: "employeeopcode", name: "采购经理操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 260);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    dialogClose() {
      this.dtlVisible = false;
      this.dtlTableData = [];
    },
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === 'download') {
        this.exportExcelDOM(this.tableColumns, this.tableData, '付款明细查询' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pagesize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" || e !== "endofdate") {
          if (formData[e] !== null && formData[e] !== "") {
            params[e] = formData[e];
          }
        }
      });
      if (formData.startdate !== null && formData.startdate !== "") {
        params.startdate = formData.startdate;
      }
      if (formData.endofdate !== null && formData.endofdate !== "") {
        params.endofdate = formData.endofdate;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.tableData = [];
      this.loading = true;
      this.$api.ap.selectFkmxcx({pageNum: pageNum, pageSize: pagesize, params: params}).then(res => {
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
    openHov(data) {
      if (data === 'supplyid') {
        this.supplyVisible = true;
      } else if (data === 'goodsid') {
        this.goodsVisible = true;
      } else if (data === 'companyidhz') {
        this.companyidhzVisible = true;
      } else if (data === 'employeenamehz') {
        this.employeenamehzVisible = true;
      }
    }
  }
}
