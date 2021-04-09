export default {
  name: "Ydfjgljyfw",
  data() {
    return {
      ydfjgljyfwQueryForm: {
        companyid: null,
        cityid: null,
        qualityTypeId: null,
        qualityScopeId: null,
        goodsid: null
      },
      ydfjgljyfwTableData: [],
      ydfjgljyfwPageNum: 1,
      ydfjgljyfwPageSize: 50,
      ydfjgljyfwTotal: 0,
      ydfjgljyfwLoading: false,
      ydfjgljyfwTableHeight: 300,
      ydfjgljyfwDialog: '',
      ydfjgljyfwDtlStatus: false,
      ydfjgljyfwStatus: false,
      ydfjgljyfwIndex: 0,
      ydfjgljyfwDtlForm: {
        companyid: null,
        companyname: null,
        cityid: null,
        cityname: null,
        qualitytypeid: null,
        qualitytypename: null,
        qualityScopeId: null,
        scopeName: null,
        goodsid: null,
        goodsname: null,
        goodsType: null,
        goodsUnit: null,
        prodarea: null,
      },
      ydfjgljyfwHovVisible: false,
      ydfjgljyfwHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible: 'ydfjgljyfwHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.ydfjgljyfwTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.ydfjgljyfwPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.ydfjgljyfwQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      if (Object.keys(formData).length === 0) {
        params = null;
      }
      this.ydfjgljyfwLoading = true;
      this.ydfjgljyfwTableData = [];
      this.$api.quality.selectYdfjgljyfw({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.ydfjgljyfwTableData = res.data.content;
        this.ydfjgljyfwPageNum = res.data.pageNum;
        this.ydfjgljyfwPageSize = res.data.pageSize;
        this.ydfjgljyfwTotal = res.data.totalSize;
        this.ydfjgljyfwLoading = false;
      }).catch(() => {
        this.ydfjgljyfwPageNum = 1;
        this.ydfjgljyfwTotal = 0;
        this.ydfjgljyfwLoading = false;
        return false;
      })
    },
    insertOrUpdate() {
      if (this.ydfjgljyfwDtlStatus === false) {
        this.addForm();
      } else {
        this.updateForm();
      }
    },
    //新增加载表单
    addOpen() {
      this.formIsNull(this.ydfjgljyfwDtlForm);
      this.ydfjgljyfwDialog = '新增表单';
      this.ydfjgljyfwDtlStatus = false;
      this.ydfjgljyfwStatus = true;
    },
    //新增提交表单
    addForm() {
      if (confirm("是否确认保存") === true) {
        this.$api.quality.insertYdfjgljyfw(this.ydfjgljyfwDtlForm).then(res => {
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
      Object.keys(this.ydfjgljyfwDtlForm).forEach(item => {
        this.ydfjgljyfwDtlForm[item] = row[item];
      })
      this.ydfjgljyfwIndex = index;
      this.ydfjgljyfwDialog = '修改表单';
      this.ydfjgljyfwDtlStatus = true;
      this.ydfjgljyfwStatus = true;
    },
    //修改提交表单
    updateForm() {
      if (confirm("是否确认修改") === true) {
        this.$api.quality.updateYdfjgljyfw(this.ydfjgljyfwDtlForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.ydfjgljyfwDtlForm).forEach(item => {
              this.ydfjgljyfwTableData[index][item] = this.ydfjgljyfwDtlForm[item];
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
        this.$api.quality.deleteYdfjgljyfw({counterid: row.counterid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.ydfjgljyfwTableData.splice(index, 1);
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
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'companyid') {
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns = [
          {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
          {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1},
          {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
        ];
      } else if (data === 'cityid') {

      } else if (data === 'qualityTypeId') {
        if (this.ydfjgljyfwQueryForm.cityid === null || this.ydfjgljyfwQueryForm.cityid === '') {
          alert("请先填写城市ID");
          return false;
        }
      } else if (data === 'qualityScopeId') {
        if (this.ydfjgljyfwQueryForm.qualityTypeId === null || this.ydfjgljyfwQueryForm.qualityTypeId === '') {
          alert("请先填写分类ID");
          return false;
        }
      } else if (data === 'goodsid') {
        hovTitle = '货品查询';
        hovUrl = 'goodsidhov/select';
        hovColumns = [
          {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ];
      }
      this.ydfjgljyfwHov.hovTitle = hovTitle;
      this.ydfjgljyfwHov.hovUrl = hovUrl;
      this.ydfjgljyfwHov.fillDataName = "ydfjgljyfwQueryForm";
      this.ydfjgljyfwHov.hovColumns = hovColumns;
      this.ydfjgljyfwHovVisible = true;
    },
    openHov() {
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'companyid') {
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns = [
          {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
          {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1, fillid: "companyname"},
          {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
        ];
      } else if (data === 'cityid') {

      } else if (data === 'qualityTypeId') {
        if (this.ydfjgljyfwDtlForm.cityid === null || this.ydfjgljyfwDtlForm.cityid === '') {
          alert("请先填写城市ID");
          return false;
        }
      } else if (data === 'qualityScopeId') {
        if (this.ydfjgljyfwDtlForm.qualityTypeId === null || this.ydfjgljyfwDtlForm.qualityTypeId === '') {
          alert("请先填写分类ID");
          return false;
        }
      } else if (data === 'goodsid') {
        hovTitle = '货品查询';
        hovUrl = 'goodsidhov/select';
        hovColumns = [
          {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1, fillid: "goodsname"},
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: "goodstype"},
          {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: "goodsunit"},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: "prodarea"}
        ];
      }
      this.ydfjgljyfwHov.hovTitle = hovTitle;
      this.ydfjgljyfwHov.hovUrl = hovUrl;
      this.ydfjgljyfwHov.fillDataName = "ydfjgljyfwDtlForm";
      this.ydfjgljyfwHov.hovColumns = hovColumns;
      this.ydfjgljyfwHovVisible = true;
    },
    dialogClose() {
      this.formIsNull(this.ydfjgljyfwDtlForm);
      this.ydfjgljyfwDialog = '';
      this.ydfjgljyfwDtlStatus = false;
      this.ydfjgljyfwIndex = 0;
      this.ydfjgljyfwStatus = false;
    },
    getDef(keyword) {
      let list = [];
      this.$api.marketing.selectydfjgljyfwDef({keyword: keyword}).then(res => {
        res.data.forEach(item => {
          let json = {
            value: item.classname,
            label: item.description
          }
          list.push(json);
        })
      }).catch(() => {
        return false;
      })
      return list;
    }
  }
}
