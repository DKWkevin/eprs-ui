export default {
  name: 'Jxbhpcxx',
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'}
      ],
      formData: {
        startdate: null,
        endofdate: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:jxbhpccx:select"}
      ],
      tableHeight: 300,
      loading: false,
      widthStatus: false,
      tableColumns: [
        {prop: 'batchid', label: '批次ID', type: 0, tableStatus: 0},
        {prop: 'companyid', label: '公司ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '公司名称', type: 0, tableStatus: 0, width: 300},
        {prop: 'calmanid', label: '计算人ID', type: 0, tableStatus: 0, width: 80},
        {prop: 'calmanname', label: '计算人', type: 0, tableStatus: 0},
        {prop: 'caldate', label: '计算日期', type: 2, tableStatus: 0},
        {prop: 'salesuseday', label: '销售最后逻辑日', type: 2, tableStatus: 0},
        {prop: 'usestatusname', label: '状态', type: 0, tableStatus: 0, width: 120}
      ],
      tableData: []
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      let pageSize = this.$refs.doctable.pageSize;
      this.selectDoc(1, pageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.loading = true;
      this.$api.replenish.selectJxbhpcxxpc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
