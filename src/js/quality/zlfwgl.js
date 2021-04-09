export default {
  name: "Zlfwgl",
  data() {
    return {
      ZlfwglQueryForm: {
        qualitytypeid: null
      },
      ZlfwglTableData: [],
      ZlfwglPageNum: 1,
      ZlfwglPageSize: 50,
      ZlfwglTotal: 0,
      ZlfwglLoading: false,
      ZlfwglTableHeight: 300,
      ZlfwglDialog: '',
      ZlfwglDtlStatus: false,
      ZlfwglStatus: false,
      ZlfwglIndex: 0,
      ZlfwglDtlForm: {
        qualitytypeid: null,
        qualitytypename: null
      },
      ZlfwglDialogXdTable: '细单',
      ZlfwglStatusXdTable: false,
      ZlfwglDtlLoading: false,
      ZlfwglTableDtlHeight: 420,
      ZlfwglTableDtlData: [],
      ZlfwglDialogXd: '',
      ZlfwglStatusXd: false,
      ZlfwglStatusXdDtl: false,
      ZlfwglStatusXdIndex: 0,
      ZlfwglXdForm: {
        qualityscopeid: null,
        qualitytypeid: null,
        scopeno: null,
        scopename: null
      },
      ZlfwglHovVisible: false,
      ZlfwglHov: {
        hovTitle: '分类查询',
        hovUrl: "qualitydefhov/select",
        afterStatus: false,
        fillDataName: "ZlfwglQueryForm",
        parentVisible: 'ZlfwglHovVisible',
        hovColumns:
          [
            {id: "qualitytypeid", name: "分类ID", queryStatus: true, dataStatus: 2, fillid: "qualitytypeid"},
            {id: "qualitytypename", name: "分类名称", queryStatus: true, dataStatus: 1},
          ]
      },
    }
  },
  created() {
    this.ZlfwglTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.ZlfwglPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.ZlfwglQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      if (Object.keys(formData).length === 0) {
        params = null;
      }
      this.ZlfwglLoading = true;
      this.ZlfwglTableData = [];
      this.$api.quality.selectZlfwglDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.ZlfwglTableData = res.data.content;
        this.ZlfwglPageNum = res.data.pageNum;
        this.ZlfwglPageSize = res.data.pageSize;
        this.ZlfwglTotal = res.data.totalSize;
        this.ZlfwglLoading = false;
      }).catch(() => {
        this.ZlfwglPageNum = 1;
        this.ZlfwglTotal = 0;
        this.ZlfwglLoading = false;
        return false;
      })
    },
    insertOrUpdate() {
      if (this.ZlfwglDtlStatus === false) {
        this.addForm();
      } else {
        this.updateForm();
      }
    },
    //新增加载总单表单
    addOpen() {
      this.formIsNull(this.ZlfwglDtlForm);
      this.ZlfwglDialog = '新增总单表单';
      this.ZlfwglDtlStatus = false;
      this.ZlfwglStatus = true;
    },
    //新增提交总单表单
    addForm() {
      if (confirm("是否确认保存") === true) {
        this.$api.quality.insertZlfwglDoc(this.ZlfwglDtlForm).then(res => {
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
      Object.keys(this.ZlfwglDtlForm).forEach(item => {
        this.ZlfwglDtlForm[item] = row[item];
      })
      this.ZlfwglIndex = index;
      this.ZlfwglDialog = '修改总单表单';
      this.ZlfwglDtlStatus = true;
      this.ZlfwglStatus = true;
    },
    //修改提交总单表单
    updateForm() {
      if (confirm("是否确认修改") === true) {
        this.$api.quality.updateZlfwglDoc(this.ZlfwglDtlForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.ZlfwglDtlForm).forEach(item => {
              this.ZlfwglTableData[index][item] = this.ZlfwglDtlForm[item];
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
        this.$api.quality.deleteZlfwglDoc({qualitytypeid: row.qualitytypeid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.ZlfwglTableData.splice(index, 1);
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
    //查询细单
    selectDtl(row) {
      this.zlfwglStatusXdtable = true;
      this.ZlfwglDtlLoading = true;
      this.ZlfwglTableDtlData = [];
      this.$api.quality.selectZlfwglDtl({qualitytypeid: row.qualitytypeid}).then(res => {
        this.ZlfwglTableDtlData = res.data;
        this.ZlfwglDtlLoading = false;
        this.ZlfwglStatusXdTable = true;
      }).catch(() => {
        this.ZlfwglDtlLoading = false;
        return false;
      })
    },
    insertOrUpdateDtl() {
      if (this.ZlfwglStatusXdDtl === false) {
        this.addDtlForm();
      } else {
        this.updateDtlForm();
      }
    },
    //新增加载细单表单
    addDtlFormOpen(row) {
      this.formIsNull(this.ZlfwglXdForm);
      this.ZlfwglXdForm.qualitytypeid = row.qualitytypeid;
      this.ZlfwglDialogXd = '新增细单表单';
      this.ZlfwglStatusXdDtl = false;
      this.ZlfwglStatusXd = true;
    },
    //新增提交细单表单
    addDtlForm() {
      if (confirm("是否确认保存") === true) {
        this.$api.quality.insertZlfwglDtl(this.ZlfwglXdForm).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.dialogDtlClose();
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
    //修改加载细单表单
    updateDtlOpen(row, index) {
      Object.keys(this.ZlfwglXdForm).forEach(item => {
        this.ZlfwglXdForm[item] = row[item];
      })
      this.ZlfwglStatusXdIndex = index;
      this.ZlfwglDialogXd = '修改细单表单';
      this.ZlfwglStatusXdDtl = true;
      this.ZlfwglStatusXd = true;
    },
    //修改提交总单表单
    updateDtlForm() {
      if (confirm("是否确认修改") === true) {
        this.$api.quality.updateZlfwglDtl(this.ZlfwglXdForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.ZlfwglXdForm).forEach(item => {
              this.ZlfwglTableDtlData[index][item] = this.ZlfwglXdForm[item];
            })
            this.dialogDtlClose();
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
    //删除细单
    delDtlForm(row, index) {
      if (confirm("是否确认删除") === true) {
        this.$api.quality.deleteZlfwglDtl({
          qualitytypeid: row.qualitytypeid,
          qualityscopeid: row.qualityscopeid
        }).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.ZlfwglTableDtlData.splice(index, 1);
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
    //删除总单下所有细单
    delFormAll(row) {
      if (confirm("是否确认删除") === true) {
        this.$api.quality.deleteZlfwglAll({qualitytypeid: row.qualitytypeid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
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
    openQueryHov() {
      this.ZlfwglHovVisible = true;
    },
    dialogClose() {
      this.formIsNull(this.ZlfwglDtlForm);
      this.ZlfwglDialog = '';
      this.ZlfwglDtlStatus = false;
      this.ZlfwglIndex = 0;
      this.ZlfwglStatus = false;
    },
    dialogTableClose() {
      this.ZlfwglTableDtlData = [];
      this.ZlfwglStatusXdTable = false;
    },
    dialogDtlClose() {
      this.formIsNull(this.ZlfwglXdForm);
      this.ZlfwglDialogXd = '';
      this.ZlfwglStatusXdDtl = false;
      this.ZlfwglStatusXdIndex = 0;
      this.ZlfwglStatusXd = false;
    }
  }
}
