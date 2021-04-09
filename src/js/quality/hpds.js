export default {
  name: "Hpds",
  data() {
    return {
      hpdsQueryForm: {
        ldlegears: null,
        beginDate: null,
        endDate: null,
        goodsid: null,
        companyid2: null
      },
      hpdsTableData: [],
      hpdsPageNum: 1,
      hpdsPageSize: 50,
      hpdsTotal: 0,
      hpdsLoading: false,
      hpdsTableHeight: 300,
      hpdsDialog: '',
      hpdsDtlStatus: false,
      hpdsStatus: false,
      hpdsIndex: 0,
      hpdsDtlForm: {
        companyid: null,
        goodsid: null,
        companyname: null,
        goodsname: null,
        goodstype: null,
        prodarea: null,
        goodsunit: null,
        ldlegears: null,
        autoldledown: null,
        autoldleup: null,
        inputmanid: null
      },
      hpdsHovVisible: false,
      hpdsHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "",
        parentVisible: 'hpdsHovVisible',
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
    this.hpdsTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.hpdsPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.hpdsQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== '') {
          if (item === 'beginDate' || item === 'endDate') {
            params[item] = new Date(formData[item]);
          } else {
            params[item] = formData[item];
          }
        }
      })
      params.inputmanid = Number(sessionStorage['userid']);
      params.companyid = Number(sessionStorage['companyid']);
      this.hpdsLoading = true;
      this.hpdsTableData = [];
      this.$api.quality.selectHpds({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.hpdsTableData = res.data.content;
        this.hpdsPageNum = res.data.pageNum;
        this.hpdsPageSize = res.data.pageSize;
        this.hpdsTotal = res.data.totalSize;
        this.hpdsLoading = false;
      }).catch(() => {
        this.hpdsPageNum = 1;
        this.hpdsTotal = 0;
        this.hpdsLoading = false;
        return false;
      })
    },
    insertOrUpdate() {
      if (this.hpdsDtlStatus === false) {
        this.addForm();
      } else {
        this.updateForm();
      }
    },
    //新增加载表单
    addOpen() {
      this.formIsNull(this.hpdsDtlForm);
      this.hpdsDialog = '新增表单';
      this.hpdsDtlStatus = false;
      this.hpdsStatus = true;
    },
    //新增提交表单
    addForm() {
      this.hpdsDtlForm.inputmanid = Number(sessionStorage['userid']);
      if (confirm("是否确认保存") === true) {
        this.$api.quality.insertHpds(this.hpdsDtlForm).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.dialogClose();
            this.queryFunction();
          } else {
            alert(res.msg);
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    //修改加载表单
    updateOpen(row, index) {
      Object.keys(this.hpdsDtlForm).forEach(item => {
        this.hpdsDtlForm[item] = row[item];
      })
      this.hpdsIndex = index;
      this.hpdsDialog = '修改表单';
      this.hpdsDtlStatus = true;
      this.hpdsStatus = true;
    },
    //修改提交表单
    updateForm() {
      this.hpdsDtlForm.inputmanid = Number(sessionStorage['userid']);
      if (confirm("是否确认修改") === true) {
        this.$api.quality.updateHpds(this.hpdsDtlForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.hpdsDtlForm).forEach(item => {
              this.hpdsTableData[this.hpdsIndex][item] = this.hpdsDtlForm[item];
            })
            this.dialogClose();
          } else {
            alert(res.msg);
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    //删除
    delForm(row, index) {
      if (confirm("是否确认删除") === true) {
        this.$api.quality.deleteHpds({
          goodsid: row.goodsid,
          companyid: row.companyid,
          ldlegears: row.ldlegears
        }).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.hpdsTableData.splice(index, 1);
          } else {
            alert(res.msg);
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    openQueryHov(data) {
      let hovTitle = null;
      let hovUrl = null;
      let hovColumns = [];
      if (data === 'goodsid') {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns = [
          {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ];
      } else if (data === 'companyid') {
        hovTitle = '公司查询';
        hovUrl = "companyidhov/selectcompanyid";
        hovColumns = [
          {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid2"},
          {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1},
          {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
        ];
      }
      this.hpdsHov.hovTitle = hovTitle;
      this.hpdsHov.hovUrl = hovUrl;
      this.hpdsHov.fillDataName = "hpdsQueryForm";
      this.hpdsHov.hovColumns = hovColumns;
      this.hpdsHovVisible = true;
    },
    openHov(data) {
      let hovTitle = null;
      let hovUrl = null;
      let hovColumns = [];
      if (data === 'goodsid') {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns = [
          {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1, fillid: "goodsname"},
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: "goodstype"},
          {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: "goodsunit"},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: "prodarea"}
        ];
      } else if (data === 'companyid') {
        hovTitle = '公司查询';
        hovUrl = "companyidhov/selectcompanyid";
        hovColumns = [
          {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
          {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1, fillid: "companyname"},
          {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
        ];
      }
      this.hpdsHov.hovTitle = hovTitle;
      this.hpdsHov.hovUrl = hovUrl;
      this.hpdsHov.fillDataName = "hpdsDtlForm";
      this.hpdsHov.hovColumns = hovColumns;
      this.hpdsHovVisible = true;
    },
    dialogClose() {
      this.formIsNull(this.hpdsDtlForm);
      this.hpdsDialog = '';
      this.hpdsDtlStatus = false;
      this.hpdsIndex = 0;
      this.hpdsStatus = false;
    }
  }
}
