import '@/assets/css/dialog.css';
import {paramsFormat} from "@/utils/functions";

export default {
  name: 'Llgyshpwh',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'inputHov', id: 'goodsid', label: '供应商ID'},
      ],
      formData: {supplyid: null, goodsid: null},
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "onlineflow:llgyskhxf:select"},
        {id: 'add', icon: "fa fa-plus", label: "action.add", perms: "onlineflow:llgyskhxf:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "onlineflow:llgyskhxf:select"}
      ],
      tableHeight: 0,
      loading: false,
      tableColumns: [
        {type: 0, prop: 'relationid', label: '序列号', tableStatus: 0},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'usestatus', label: '状态', tableStatus: 0},
        {type: 2, prop: 'validdate', label: '服务效期至', tableStatus: 0, width: 150, widthStatus: true},
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
            {id: 'xufei', label: 'action.delete', icon: 'fa fa-edit', perms: 'onlineflow:llgyskhxf:select'}
          ]
        }
      ],
      tableData: [],
      dialogVisible: false,
      docTitle: "",
      dialogWidth: '700px',
      dialogHeight: 500,
      dialogTop: '12vh',
      dtlTableHeight: 300,
      btnLoading: false,
      dtlFormData: {
        supplyid: null,
        supplyname: null,
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        proderea: null,
        usestatus: null,
        validdate: null,
      },
      xufeiVisible: false,
      xufei: {
        standardname: null,
        total: null,
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        proderea: null,
        validdate: null
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
      dtlgoodsVisible: false,
      dtlgoodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "dtlFormData",
        parentVisible: 'dtlgoodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1, fillid: "goodsname"},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: "goodstype"},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: "goodsunit"},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: "prodarea"}
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
        this.dtlFormData.usestatus = '正常';
        this.dialogVisible = true;
      } else if (data === "download") {
        let columns = [];
        this.tableColumns.map((e, index) => {
          if (index !== 0) {
            columns.push(e);
          }
        });
        this.exportExcelDOM(columns, this.tableData, "辽连供应商货品维护" + this.getNewDate())
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
      this.$api.onlineflow.selectLlgyhpwh({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
      if (data.id === "stop") {
        if (confirm("是否停用") === true) {
          this.$api.onlineflow.stopLlgyshpwh({relationid: data.row.relationid}).then(res => {
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
          this.$api.onlineflow.recoveryLlgyshpwh({relationid: data.row.relationid}).then(res => {
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
        if (data.row.usestatus === "停用") {
          alert("已停用请先恢复再续费！");
          return false;
        }
        this.$api.onlineflow.selectLlgyhpwhfXufei({
          relationid: data.row.relationid,
          supplyid: data.row.supplyid,
          goodsid: data.row.goodsid
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
      }
    },
    //新增
    insertForm() {
      this.$api.onlineflow.insertLlgyshpwh(this.dtlFormData).then(res => {
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
    },
    //续费保存
    insertXufei() {
      let params = {};
      Object.keys(this.xufei).keys(e => {
        params[e] = this.xufei[e];
      });
      params.emlployeeid = Number(sessionStorage['userid']);
      this.$api.onlineflow.llgyshpwhxufei(params).then(res => {
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
    openHov(data) {
      if (data === "supplyid") {
        this.supplyVisible = true;
      } else if (data === "dtlsupplyid") {
        this.dtlsupplyVisible = true;
      } else if (data === "goodsid") {
        this.goodsVisible = true;
      } else if (data === "dtlgoodsid") {
        this.dtlgoodsVisible = true;
      }
    }
  }
}
