export default {
  name: 'Ywwlcx',
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'companyid', label: '公司ID'},
        {type: 'inputHov', id: 'cvid', label: '客商ID'},
      ],
      formData: {
        startdate: null,
        endofdate: null,
        companyid: 19940,
        cvid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "business:ywwlzcx:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'companyid', label: '公司ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '公司名称', tableStatus: 0},
        {type: 0, prop: 'cvid', label: '客商ID', tableStatus: 0},
        {type: 0, prop: 'cvname', label: '客商名称', tableStatus: 0},
        {type: 0, prop: 'remmoney', label: '余额', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0},
        {
          type: 1, prop: 'caozuo', label: '操作', tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "business:ywwlzcx:select"}
          ]
        }
      ],
      tableData: [],
      tableHeight: 0,
      loading: false,
      dtlVisible: false,
      dtlVisibles: true,
      dtlTitle: '',
      dialogTop: '12vh',
      dialogWidth: '1000px',
      dtlloading: false,
      dtlTableColumns: [
        {type: 0, prop: 'dtlid', label: 'ID', tableStatus: 0},
        {type: 0, prop: 'companyid', label: '公司ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '公司名称', tableStatus: 0},
        {type: 0, prop: 'useyear', label: '年', tableStatus: 0},
        {type: 0, prop: 'usemonth', label: '月', tableStatus: 0},
        {type: 0, prop: 'cvid', label: '客商ID', tableStatus: 0},
        {type: 0, prop: 'cvname', label: '客商名称', tableStatus: 0},
        {type: 2, prop: 'credate', label: '发生日期', tableStatus: 0},
        {type: 0, prop: 'addmoney', label: '增加金额', tableStatus: 0},
        {type: 0, prop: 'decmoney', label: '减少金额', tableStatus: 0},
        {type: 0, prop: 'remmoney', label: '余额', tableStatus: 0},
        {type: 0, prop: 'doctypename', label: '源单类型', tableStatus: 0},
        {type: 0, prop: 'sourceid', label: '原单ID', tableStatus: 0},
        {type: 0, prop: 'keepmanid', label: '记账人ID', tableStatus: 0},
        {type: 0, prop: 'keepman', label: '记账人', tableStatus: 0},
        {type: 0, prop: 'summary', label: '摘要', tableStatus: 0},
      ],
      dtlData: [],
      dtlHeight: 440,
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
      },
      customVisible: false,
      customHov: {
        hovTitle: '客商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'factidVisible',
        hovColumns:
          [
            {id: "companyid", name: "客商ID", queryStatus: true, dataStatus: 2, fillid: "cvid"},
            {id: "companyname", name: "客商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "客商操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction() {
      let pageSize = this.$refs.doctable.pageSize;
      this.selectDoc(1, pageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let formData = this.formData;
      let params = {};
      if (formData.startdate !== null && formData.startdate !== "") {
        params.startdate = formData.startdate;
      }
      if (formData.endofdate !== null && formData.endofdate !== "") {
        params.endofdate = formData.endofdate;
      }
      if (this.dateValue(formData.companyid) === true) {
        params.companyid = formData.companyid;
      }
      if (this.dateValue(formData.cvid) === true) {
        params.cvid = formData.cvid;
      }
      this.loading = true;
      this.$api.bussiness.selectYwwlcxDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    handle(data) {
      this.dtlVisible = true;
      this.dtlloading = true;
      this.$api.bussiness.selectYwwlcxDtl({companyid: data.row.companyid, cvid: data.row.cvid}).then(res => {
        if (res.code === 200) {
          this.dtlData = Object.freeze(res.data);
          this.dtlloading = false;
        }
      }).catch(error => {
        this.dtlloading = false;
        return false;
      })
    },
    queryHov(id) {
      if (id === "companyid") {
        this.companyVisible = true;
      } else if (id === "cvid") {
        this.customVisible = true;
      }
    },
    closeDialog() {
      this.dtlData = [];
      this.dtlVisible = false;
    },
    dateValue(data) {
      return data !== null && data !== "";
    }
  }
}
