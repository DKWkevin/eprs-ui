import {paramsFormat} from "@/utils/functions";

export default {
  name: 'Ywydywxh',
  data() {
    return {
      labelWidth: '110px',
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'inputHov', id: 'ywyid', label: '业务员ID'},
        {type: 'input', id: 'wxno', label: '企业微信账号'}
      ],
      formData: {
        supplyid: null,
        ywyid: null,
        wxno: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:ywydywxh:select"},
        {id: 'add', icon: "fa fa-plus", label: "action.add", perms: "replenishment:ywydywxh:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:ywydywxh:select"}
      ],
      tableHeight: 300,
      loading: false,
      widthStatus: false,
      tableColumns: [
        {prop: 'id', label: 'ID', type: 0, tableStatus: 0, width: 70},
        {prop: 'credate', label: '日期', type: 2, tableStatus: 0, width: 140, widthStatus: true},
        {prop: 'relid', label: '用户ID', type: 0, tableStatus: 0, width: 70},
        {prop: 'membername', label: '用户名', type: 0, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0, width: 70},
        {prop: 'supplyname', label: '供应商', type: 0, tableStatus: 0, width: 200},
        {prop: 'ywyid', label: '业务员ID', type: 0, tableStatus: 0, width: 70},
        {prop: 'contactman', label: '业务员', type: 0, tableStatus: 0, width: 70},
        {prop: 'wxno', label: '企业微信帐号', type: 0, tableStatus: 0},
        {prop: 'inputmanid', label: '录入人ID', type: 0, tableStatus: 0, width: 70},
        {prop: 'inputmanname', label: '录入人', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          type: 1,
          fixed: 'right',
          width: 170,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "replenishment:ywydywxh:select"},
            {id: 'delete', icon: "fa fa-delete", label: "action.delete", perms: "replenishment:ywydywxh:select"}
          ]
        }
      ],
      tableData: [],
      dtlstatus: false,
      dtlFormList: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogWidth: '700px',
      inline: true,
      dialogLabelWidth: '100px',
      base: {
        id: null,
        relid: null,
        membername: null,
        ywyid: null,
        ecdfyusername: null,
        supplyid: null,
        companyname: null,
        wxno: null,
        inputmanid: null,
        inputmanname: null
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
      },
      ywyVisible: false,
      ywyHov: {
        hovTitle: '业务员查询',
        hovUrl: "contactinfoidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'ywyVisible',
        hovColumns:
          [
            {id: "contactinfoid", name: "业务员ID", queryStatus: true, dataStatus: 2, fillid: "ywyid"},
            {id: "contactman", name: "业务员名称", queryStatus: true, dataStatus: 1},
          ]
      },
      dtlMemberVisible: false,
      dtlMemberHov: {
        hovTitle: '用户查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'dtlMemberVisible',
        hovColumns:
          [
            {id: "employeeid", name: "用户ID", queryStatus: true, dataStatus: 2, fillid: "relid"},
            {id: "employeename", name: "用户名称", queryStatus: true, dataStatus: 1, fillid: "membername"},
            {id: "employeeopcode", name: "用户操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      dtlYwyVisible: false,
      dtlYwyHov: {
        hovTitle: '业务员查询',
        hovUrl: "contactinfoidhov/select",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'dtlYwyVisible',
        hovColumns:
          [
            {id: "contactinfoid", name: "业务员ID", queryStatus: true, dataStatus: 2, fillid: "ywyid"},
            {id: "contactman", name: "业务员名称", queryStatus: true, dataStatus: 1, fillid: "ecdfyusername"},
            {id: "companyid", name: "供应商ID", queryStatus: false, dataStatus: 1, fillid: "supplyid"},
            {id: "companyname", name: "供应商", queryStatus: false, dataStatus: 1, fillid: "companyname"}
          ]
      },
      dtlSupplyVisible: false,
      dtlSupplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'dtlSupplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1, fillid: "companyname"},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "add") {
        this.dialogTitle = '新增';
        this.dtlstatus = false;
        Object.keys(this.base).forEach(e => {
          this.base[e] = null;
        });
        this.base.inputmanid = Number(sessionStorage['userid']);
        this.base.inputmanname = sessionStorage['username'];
        this.dialogVisible = true;
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '企业通讯录' + this.getNewDate());
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
      this.$api.replenish.selectYwydywxh({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    handleFunction(data) {
      if (data.id === "edit") {
        this.dialogTitle = '修改';
        this.dtlstatus = true;
        Object.keys(this.base).forEach(e => {
          this.base[e] = data.row[e];
        });
        this.base.ecdfyusername = data.row.contactman;
        this.base.companyname = data.row.supplyname;
        this.dialogVisible = true;
      } else if (data.id === "delete") {
        this.$api.replenish.deleteYwydywxh(data.row.id).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.queryFunction('query');
          }
        }).catch(error => {
          return false;
        })
      }
    },
    insertCdfk() {
      let params = {};
      Object.keys(this.base).forEach(e => {
        params[e] = this.base[e];
      });
      if (this.dtlstatus === false) {
        this.$api.replenish.insertYwydywxh(params).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.closeDialog();
            this.queryFunction('query');
          }
        }).catch(error => {
          return false;
        })
      } else if (this.dtlstatus === true) {
        this.$api.replenish.updateYwydywxh(params).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            this.closeDialog();
            this.queryFunction('query');
          }
        }).catch(error => {
          return false;
        })
      }
    },
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "ywyid") {
        this.ywyVisible = true;
      } else if (id === "membername") {
        this.dtlMemberVisible = true;
      } else if (id === "dtlywyid") {
        this.dtlYwyVisible = true;
      } else if (id === "dtlsupplyid") {
        this.dtlSupplyVisible = true;
      }
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  }
}
