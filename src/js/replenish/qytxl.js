import {paramsFormat} from "@/utils/functions";

export default {
  name: 'Qytxl',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'companyid', label: '供应商ID'}
      ],
      formData: {
        companyid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:qytxl:select"},
        {id: 'add', icon: "fa fa-plus", label: "action.add", perms: "replenishment:qytxl:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:qytxl:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'contactinfoid', label: '联系方式ID', type: 0, tableStatus: 0, width: 90, widthStatus: true},
        {prop: 'companyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'contactman', label: '联系人', type: 0, tableStatus: 0, width: 70, widthStatus: true},
        {prop: 'phone', label: '固定电话', type: 0, tableStatus: 0, width: 120, widthStatus: true},
        {prop: 'mobilephone', label: '移动电话', type: 0, tableStatus: 0, width: 120, widthStatus: true},
        {prop: 'email', label: '邮件', type: 0, tableStatus: 0},
        {prop: 'ddlname', label: '业务类型', type: 0, tableStatus: 0},
        {prop: 'department', label: '部门', type: 0, tableStatus: 0},
        {prop: 'position', label: '职务', type: 0, tableStatus: 0},
        {prop: 'fax', label: '传真', type: 0, tableStatus: 0},
        {prop: 'address', label: '通讯地址', type: 0, tableStatus: 0},
        {prop: 'postcode', label: '邮编', type: 0, tableStatus: 0},
        {prop: 'memo', label: '备注', type: 0, tableStatus: 0},
        {prop: 'idcard', label: '身份证号', type: 0, tableStatus: 0, width: 150, widthStatus: true},
        {
          prop: 'caozuo',
          label: '操作',
          type: 1,
          fixed: 'right',
          width: 180,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "replenishment:qytxl:select"},
            {id: 'delete', icon: "fa fa-delete", label: "action.delete", perms: "replenishment:qytxl:select"}
          ]
        }
      ],
      //15626
      tableData: [],
      dtlVisible: false,
      dtlstatus: false,
      dtlFormList: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogWidth: '700px',
      inline: true,
      dialogLabelWidth: '100px',
      base: {
        contactinfoid: null,
        companyid: null,
        companyname: null,
        contactman: null,
        phone: null,
        mobilephone: null,
        email: null,
        ddlname: null,
        department: null,
        position: null,
        fax: null,
        address: null,
        postcode: null,
        memo: null,
        idcard: null
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
            {id: "customid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
            {id: "customname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      dtlSupplyVisible: false,
      dtlSupplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'dtlSupplyVisible',
        hovColumns:
          [
            {id: "customid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
            {id: "customname", name: "供应商名称", queryStatus: true, dataStatus: 1, fillid: "companyname"},
            {id: "customopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      }
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
        this.dialogTitle = '新增联系人';
        this.dtlstatus = false;
        Object.keys(this.base).forEach(e => {
          this.base[e] = null;
        });
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
      this.$api.replenish.selectQytxl({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
        this.dialogTitle = "修改联系人";
        this.dtlstatus = true;
        Object.keys(this.base).forEach(e => {
          this.base[e] = data.row[e];
        })
        this.dialogVisible = true;
      } else if (data.id === "delete") {
        this.$api.replenish.deleteQytxl(data.row.contactinfoid).then(res => {
          if (res.code === 200) {
            alert("删除成功");
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
        this.$api.replenish.insertQytxl(params).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.closeDialog();
          }
        }).catch(error => {
          return false;
        })
      } else if (this.dtlstatus === true) {
        this.$api.replenish.updateQytxl(params).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            this.closeDialog();
          }
        }).catch(error => {
          return false;
        })
      }
    },
    openHov(id) {
      if (id === "companyid") {
        this.supplyVisible = true;
      } else if (id === "dtlsupplyid") {
        this.dtlSupplyVisible = true;
      }
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  }
}
