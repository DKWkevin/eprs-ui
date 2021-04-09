import {paramsFormat, selectDdlOption} from "@/utils/functions";

export default {
  name: 'Gysthxxwh',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'select', id: 'buyerid', label: '采购支持', options: []},
      ],
      formData: {
        supplyid: null,
        buyerid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:gysthxxwh:select"},
        {id: 'add', icon: "fa fa-plus", label: "action.add", perms: "replenishment:gysthxxwh:add"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:gysthxxwh:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '公司名称', type: 0, tableStatus: 0},
        {prop: 'caldate', label: '创建日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'sendmode', label: '发货模式ID', type: 0, tableStatus: 0},
        {prop: 'sendmodename', label: '发货模式', type: 0, tableStatus: 0},
        {prop: 'recaddress', label: '收货地址', type: 0, tableStatus: 0},
        {prop: 'recman', label: '收货人', type: 0, tableStatus: 0},
        {prop: 'rectel', label: '收货人电话', type: 0, tableStatus: 0},
        {prop: 'recicno', label: '收货人身份证号', type: 0, tableStatus: 0},
        {prop: 'buyername', label: '采购支持', type: 0, tableStatus: 0},
        {prop: 'modidate', label: '更改日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'modiman', label: '录入人', type: 0, tableStatus: 0},
        {
          prop: 'caozuo', label: '操作', type: 1, fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "replenishment:gysthxxwh:add"}
          ]
        }
      ],
      tableData: [],
      sendmodeOptions: [],
      dtlVisible: false,
      dtlstatus: false,
      dtlFormList: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogWidth: '700px',
      inline: true,
      dialogLabelWidth: '100px',
      base: {
        supplyid: null,
        supplyname: null,
        sendmode: null,
        recaddress: null,
        recman: null,
        rectel: null,
        recicno: null,
        caldate: null
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
      dtlsupplyVisible: false,
      dtlsupplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'dtlsupplyVisible',
        hovColumns:
          [
            {id: "customid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "customname", name: "供应商名称", queryStatus: true, dataStatus: 1, fillid: "supplyname"},
            {id: "customopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.sendmodeOptions = selectDdlOption('BMS_SUPPLY_ZGYE_SENDMODE');
    this.$api.replenish.selectGysthxxwhBuyid({pageNum: 1, pageSize: 999, params: null}).then(res => {
      if (res.code === 200) {
        let params = [];
        res.data.forEach(e => {
          let tel = {};
          tel.value = e.buyerid;
          tel.label = e.buyername;
          params.push(tel);
        });
        this.formList[1].options = params;
      }
    }).catch(error => {
      return false;
    });
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
        let date = new Date();
        let year = date.getFullYear().toString();       // 年
        let month = date.getMonth().toString();    // 月
        let day = date.getDate().toString();          // 日
        let hours = date.getHours().toString();           // 时
        let minute = date.getMinutes().toString();         // 分
        let seconds = date.getSeconds().toString();        // 秒
        this.base.caldate = new Date(year, month, day, hours, minute, seconds);
        this.dialogVisible = true;
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '供应商退货信息维护' + this.getNewDate());
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
      this.$api.replenish.selectGysthxwh({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
        this.dialogVisible = true;
      }
    },
    insertCdfk() {
      let params = {};
      Object.keys(this.base).forEach(e => {
        params[e] = this.base[e];
      });
      this.$refs.rulesForm.validate((vaild) => {
        if (vaild) {
          if (this.dtlstatus === false) {
            params.modiman = sessionStorage['username'];
            this.$api.replenish.insertGysthxwh(params).then(res => {
              if (res.code === 200) {
                alert("保存成功");
                this.closeDialog();
                this.queryFunction('query');
              }
            }).catch(error => {
              return false;
            })
          } else if (this.dtlstatus === true) {
            this.$api.replenish.updateGysthxwh(params).then(res => {
              if (res.code === 200) {
                alert("修改成功");
                this.closeDialog();
                this.queryFunction('query');
              }
            }).catch(error => {
              return false;
            })
          }
        } else {
          return false;
        }
      })
    },
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "dtlsupplyid") {
        this.dtlsupplyVisible = true;
      }
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  }
}
