import '@/assets/css/dialog.css';
import {paramsFormat} from "@/utils/functions";

export default {
  name: 'Llgyskhxf',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {
          type: 'select',
          id: 'selfallflag',
          label: '工业商业',
          options: [{value: 0, label: '工业'}, {value: 1, label: '商业'}, {value: 2, label: '空'}],
          clearable: true
        }
      ],
      formData: {supplyid: null, selfallflag: null},
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "onlineflow:llgyskhxf:select"},
        {id: 'add', icon: "fa fa-plus", label: "action.add", perms: "onlineflow:llgyskhxf:select"},
        {id: 'upgongye', icon: "fa fa-plus", label: "action.add", perms: "onlineflow:llgyskhxf:select"},
        {id: 'upshangye', icon: "fa fa-plus", label: "action.add", perms: "onlineflow:llgyskhxf:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "onlineflow:llgyskhxf:select"}
      ],
      tableHeight: 0,
      loading: false,
      tableColumns: [
        {indexType: 'selection'},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '状态', tableStatus: 0},
        {type: 0, prop: 'validdate', label: '开户效期至', tableStatus: 0},
        {type: 0, prop: 'grade', label: '用户等级', tableStatus: 0},
        {type: 0, prop: 'username', label: '用户名', tableStatus: 0},
        {type: 0, prop: 'selfallflag', label: '工业/商业', tableStatus: 0},
        {
          type: 1,
          prop: 'caozuo',
          label: '操作',
          tableStatus: 0,
          fixed: 'right',
          width: 280,
          widthStatus: true,
          options: [
            {id: 'stop', label: 'action.stop', icon: 'fa fa-edit', perms: 'onlineflow:llgyskhxf:select'},
            {id: 'recovery', label: 'action.recovery', icon: 'fa fa-edit', perms: 'onlineflow:llgyskhxf:select'},
            {id: 'xufei', label: 'action.delete', icon: 'fa fa-edit', perms: 'onlineflow:llgyskhxf:select'},
            {id: 'allrenew', label: 'action.search', icon: 'fa fa-edit', perms: 'onlineflow:llgyskhxf:select'},
            {id: 'reset', label: 'action.search', icon: 'fa fa-edit', perms: 'onlineflow:llgyskhxf:select'}
          ]
        }
      ],
      tableData: [],
      selections: [],
      dialogVisible: false,
      doctype: 0,
      docTitle: "",
      dialogWidth: '700px',
      dialogHeight: 500,
      dialogTop: '12vh',
      dtlTableHeight: 300,
      btnLoading: false,
      dtlFormData: {
        supplyid: null,
        supplyname: null,
        username: null,
        usestatus: null,
        validdate: null,
        grade: null,
        selfallflag: null
      },
      xufeiVisible: false,
      xufei: {
        supplyid: null,
        supplyname: null,
        grade: null,
        standardname: null,
        total: null,
        validdate: null,
        standardid: null
      },
      standardnameOptions: [],
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyHov',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      dtlsupplyVisible: false,
      dtlsupplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "dtlFormData",
        parentVisible: 'dtlsupplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1, fillid: "supplyname"},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
  },
  methods: {
    functionQuery(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "add") {
        this.doctype = 0;
        this.docTitle = "新增表单";
        this.dialogVisible = true;
      } else if (data === "upgongye") {
        if (this.selections.length === 0) {
          alert("没有选择数据，不能修改！");
          return false;
        }
        if (confirm("是否修改成工业？") === true) {
          let subackdocid = [];
          this.selections.forEach(e => {
            subackdocid.push(e.supplyid);
          });
          this.$api.onlineflow.llgyskhxfGy({
            subackdocid: subackdocid.toString(),
            supplyids: this.selections.length
          }).then(res => {
            if (res.code === 200) {
              if (res.data > 0) {
                alert("修改成功");
                this.functionQuery('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        } else {
          return false;
        }
      } else if (data === "upshangye") {
        if (this.selections.length === 0) {
          alert("没有选择数据，不能修改！");
          return false;
        }
        if (confirm("是否修改成商业？") === true) {
          let subackdocid = [];
          this.selections.forEach(e => {
            subackdocid.push(e.supplyid);
          });
          this.$api.onlineflow.llgyskhxfSy({
            subackdocid: subackdocid.toString(),
            supplyids: this.selections.length
          }).then(res => {
            if (res.code === 200) {
              if (res.data > 0) {
                alert("修改成功");
                this.functionQuery('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        } else {
          return false;
        }
      } else if (data === "download") {
        let columns = [];
        this.tableColumns.map((e, index) => {
          if (index !== 0) {
            columns.push(e);
          }
        });
        this.exportExcelDOM(columns, this.tableData, "辽连供应商客户续费" + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = paramsFormat(formData);
      this.loading = true;
      this.tableData = [];
      this.$api.onlineflow.selectLlgyskhxf({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    handleFunction(data) {
      if (data.id === "update") {
        this.doctype = 1;
        this.docTitle = "修改表单";
        Object.keys(this.dtlFormData).forEach(e => {
          this.dtlFormData[e] = data.row[e];
        });
        this.addVisible = true;
      } else if (data.id === "stop") {
        if (confirm("是否停用") === true) {
          this.$api.onlineflow.stopLlgyskhxf({supplyid: data.row.supplyid}).then(res => {
            if (res.code === 200) {
              if (res.data === 1) {
                alert("停用成功");
                this.functionQuery('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        } else {
          alert("已经取消操作");
          return false;
        }
      } else if (data.id === "recovery") {
        if (confirm("是否恢复") === true) {
          this.$api.onlineflow.recoveryLlgyskhxf({supplyid: data.row.supplyid}).then(res => {
            if (res.code === 200) {
              if (res.data === 1) {
                alert("恢复成功");
                this.functionQuery('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        } else {
          alert("已经取消操作");
          return false;
        }
      } else if (data.id === "xufei") {
        this.docTitle = '续费';
        this.$api.onlineflow.selectLlgyskhxfXufei({
          supplyid: data.row.supplyid,
          supplyname: data.row.supplyname
        }).then(res => {
          if (res.code === 200) {
            Object.keys(this.xufei).forEach(e => {
              this.xufei[e] = res.data[e];
            });
            this.xufeiVisible = true;
          }
        }).catch(error => {
          return false;
        })
      } else if (data.id === "allrenew") {
        if (confirm("是否全品种续费")) {
          let employeeid = Number(sessionStorage['userid']);
          this.$api.onlineflow.llgyskhxfAllrenew({supplyid: data.row.supplyid, employeeid: employeeid}).then(res => {
            if (res.code === 200) {
              if (res.data > 0) {
                alert("全品种续费成功");
                this.functionQuery('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        }
      } else if (data.id === "reset") {
        this.$api.onlineflow.llgyskhxfReset({supplyid: data.row.supplyid}).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("密码重置成功");
              this.functionQuery('query');
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      }
    },
    //新增修改
    insertForm() {
      if (this.doctype === 0) {
        this.$api.onlineflow.insertLlgyskhxf(this.dtlFormData).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("新增成功");
              this.dialogColse();
              this.functionQuery('query');
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      } else if (this.doctype === 1) {
        this.$api.onlineflow.updateLlgyskhxf(this.dtlFormData).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("修改成功");
              this.dialogColse();
              this.functionQuery('query');
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      }
    },
    //续费保存
    insertXufei() {
      let params = {};
      Object.keys(this.xufei).keys(e => {
        params[e] = this.xufei[e];
      });
      params.emlployeeid = Number(sessionStorage['userid']);
      this.$api.onlineflow.llgyskhxfxufei(params).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("续费成功");
            this.xufeiVisible = false;
            this.functionQuery('query');
          } else {
            alert(res.msg);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    dialogColse() {
      Object.keys(this.dtlFormData).forEach(e => {
        this.dtlFormData[e] = null;
      });
      this.dialogVisible = false;
    },
    xufeidialogColse() {
      Object.keys(this.xufei).forEach(e => {
        this.xufei[e] = null;
      });
      this.xufeiVisible = false;
    },
    selectionChange(val) {
      this.selections = val;
    },
    openHov(data) {
      if (data === "supplyid") {
        this.supplyVisible = true;
      } else if (data === "dtlsupplyid") {
        this.dtlsupplyVisible = true;
      }
    }
  }
}
