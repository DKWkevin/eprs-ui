export default {
  name: "Spjsgl",
  data() {
    return {
      spjsglQueryForm: {
        goodsroleid: null,
        companyid: null,
        goosid: null,
        roleid: null
      },
      spjsglTableData: [],
      spjsglPageNum: 1,
      spjsglPageSize: 50,
      spjsglTotal: 0,
      spjsglLoading: false,
      spjsglTableHeight: 300,
      spjsglDialog: '',
      spjsglDtlStatus: false,
      spjsglStatus: false,
      spjsglIndex: 0,
      spjsglDtlForm: {
        goodsroleid: null,
        companyid: null,
        companyname: null,
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null,
        roleid: null,
        rolename: null,
        modifydate: null,
        roletype: null
      },
      roleTypeOptions: [],
      spjsglHovVisible: false,
      spjsglHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "spjsglDtlForm",
        parentVisible: 'spjsglHovVisible',
        hovColumns:
          [
            {id: "counterid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "公司名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.spjsglTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.spjsglPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.spjsglQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      if (Object.keys(formData).length === 0) {
        params = null;
      }
      this.spjsglLoading = true;
      this.spjsglTableData = [];
      this.$api.quality.selectSpjsgl({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.spjsglTableData = res.data.content;
        this.spjsglPageNum = res.data.pageNum;
        this.spjsglPageSize = res.data.pageSize;
        this.spjsglTotal = res.data.totalSize;
        this.spjsglLoading = false;
      }).catch(() => {
        this.spjsglPageNum = 1;
        this.spjsglTotal = 0;
        this.spjsglLoading = false;
        return false;
      })
    },
    insertOrUpdate() {
      if (this.spjsglDtlStatus === false) {
        this.addForm();
      } else {
        this.updateForm();
      }
    },
    //新增加载总单表单
    addOpen() {
      this.formIsNull(this.spjsglDtlForm);
      this.spjsglDialog = '新增总单表单';
      this.spjsglDtlStatus = false;
      this.spjsglStatus = true;
    },
    //新增提交总单表单
    addForm() {
      if (confirm("是否确认保存") === true) {
        this.$api.quality.insertSpjsgl(this.spjsglDtlForm).then(res => {
          if (res.code === 200) {
            alert("保存成功");
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
    //修改加载总单表单
    updateOpen(row, index) {
      Object.keys(this.spjsglDtlForm).forEach(item => {
        this.spjsglDtlForm[item] = row[item];
      })
      this.spjsglIndex = index;
      this.spjsglDialog = '修改总单表单';
      this.spjsglDtlStatus = true;
      this.spjsglStatus = true;
    },
    //修改提交总单表单
    updateForm() {
      if (confirm("是否确认修改") === true) {
        this.$api.quality.updateSpjsgl(this.spjsglDtlForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.spjsglDtlForm).forEach(item => {
              this.spjsglTableData[index][item] = this.spjsglDtlForm[item];
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
    //删除总单
    delForm(row, index) {
      if (confirm("是否确认删除") === true) {
        this.$api.quality.deleteSpjsgl({goodsroleid: row.goodsroleid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.spjsglTableData.splice(index, 1);
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
    openHov() {
      this.spjsglHovVisible = true;
    },
    dialogClose() {
      this.formIsNull(this.spjsglDtlForm);
      this.spjsglDialog = '';
      this.spjsglDtlStatus = false;
      this.spjsglIndex = 0;
      this.spjsglStatus = false;
    }
  }
}
