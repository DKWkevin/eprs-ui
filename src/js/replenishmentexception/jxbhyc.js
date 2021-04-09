export default {
  name: 'Jxbhyc',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishmentexception:jxbhyc:select"}
      ],
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商'},
        {type: 'inputHov', id: 'batchid', label: '批次ID'}
      ],
      formData: {startdate: null, endofdate: null, supplyid: null, batchid: null},
      widthStatus: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'batchid', label: '批次ID', type: 0, tableStatus: 0},
        {prop: 'conid', label: '订单ID', type: 0, tableStatus: 0},
        {prop: 'caldate', label: '日期', type: 2, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经销方式', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          type: 1,
          width: 100,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: 'edit',
              icon: "fa fa-edit",
              label: "action.selectDtl",
              perms: "replenishmentexception:jxbhyc:selectdtl"
            }
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
        {prop: 'condtlid', label: '细单ID', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'orderqty', label: '合同数量', type: 0, tableStatus: 0},
        {prop: 'confirmqty', label: '确认数量', type: 0, tableStatus: 0},
        {prop: 'memo', label: '备注', type: 0, tableStatus: 0},
        {prop: 'lxrname', label: '联系人', type: 0, tableStatus: 0},
        {prop: 'lxrtel', label: '联系电话', type: 0, tableStatus: 0},
        {prop: 'dkkc', label: '库存', type: 2, tableStatus: 0},
        {prop: 'syxl', label: '上月销量', type: 0, tableStatus: 0},
        {prop: 'qqxl', label: '前期销量', type: 0, tableStatus: 0}
      ],
      dtlTableData: [],
      dtlTableHeight: 400,
      dtlVisible: false,
      dtlLoading: false,
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
      if (this.returnValue(formData.batchid) === true) {
        params.batchid = formData.batchid;
      }
      if (Object.keys(params).length === 0) {
        alert("请填写查询条件");
        return false;
      }
      this.loading = true;
      this.$api.replenishmentexception.selectJxbhycDoc({
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
      this.$api.replenishmentexception.selectJxbhycDtl({conid: data.row.conid}).then(res => {
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
    openHov(id) {
      if (id === 'supplyid') {
        this.supplyVisible = true;
      } else if (id === 'batchid') {
        this.batchVisible = true;
      }
    },
    dialogClose() {
      this.dtlVisible = false;
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
