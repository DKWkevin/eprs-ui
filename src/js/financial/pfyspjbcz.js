import {hasPermission} from '@/permission/index.js'
import {
  formListFormat,
  formDataFormatIn,
  selectDdlOption,
  selectOption
} from "@/utils/functions"
import PfyspjbczExecl from "@/views/Function/Financial/PfyspjbczExecl";

export default {
  name: 'Pfyspjbcz',
  components: {
    PfyspjbczExecl
  },
  data() {
    return {
      execlStatus: false,
      //查询条件
      queryList: [
        {type: "daterange", id1: "startdate", id2: 'endofdate', label: "交票日"},
        {type: "inputHov", id: "customid", label: "回款单位ID", formWidth: 220, labelWidth: 80},
        {type: "select", id: "usestatus", label: "票据状态", options: []},
        {type: "inputHov", id: "tocompanyid", label: "背书单位", formWidth: 220, labelWidth: 60},
        {type: "input", id: "bano", label: "票号", formWidth: 180, labelWidth: 40},
        {type: "input", id: "total", label: "金额", formWidth: 180, labelWidth: 40},
        {type: "datetime", id: "outdate", label: "出票日"},
        {type: "datetime", id: "enddate", label: "到期日"},
        {type: "inputHov", id: "outbankidarr", label: "出票行", disabled: true},
      ],
      btnOptions: [
        {id: "query", icon: "fa fa-search", label: "action.search", perms: "financial:pfyspjbcz:select"},
        {id: "add", icon: "fa fa-plus", label: "action.add", perms: "financial:pfyspjbcz:add"},
        {id: "reset", icon: "fa fa-cog", label: "action.reset", perms: "financial:pfyspjbcz:select"},
        {id: "download", icon: "fa fa-download", label: "action.download", perms: "financial:pfyspjbcz:select"},
        {id: "exportExecl", icon: "fa fa-download", label: "action.drzbp", perms: "financial:pfyspjbcz:add"}
      ],
      formData: {
        startdate: null,
        endofdate: null,
        customid: null,
        usestatus: null,
        tocompanyid: null,
        bano: null,
        total: null,
        outdate: null,
        enddate: null,
        outbankidarr: null
      },
      labelWidth: "90px",
      queryCustomVisible: false,
      customHov: {
        hovTitle: "回款单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryCustomVisible',
        hovColumns:
          [
            {
              id: "companyid",
              name: "回款单位ID",
              value: null,
              queryStatus: true,
              dataStatus: 2,
              fillstatus: 1,
              fillid: "customid"
            },
            {id: "companyname", name: "回款单位名称", value: null, queryStatus: true, dataStatus: 1, fillstatus: 2},
            {id: "companyopcode", name: "回款单位操作码", value: null, queryStatus: false, dataStatus: 1, fillstatus: 2}
          ]
      },
      //表单信息
      tableBorder: true,
      tableHeight: 260,
      tableColumns:
        [
          {
            prop: "baid",
            label: "承兑汇票ID",
            type: 0,
            width: 150,
            listStatus: 0,
            tableStatus: 0,
            listType: "input",
            listDisabled: true
          },
          {
            prop: "credate",
            label: "交票日",
            type: 2,
            width: 150,
            sortable: true,
            widthStatus: true,
            listStatus: 0,
            tableStatus: 0,
            listType: "datetime",
            listDisabled: null,
            listPerms: ['financial:pfyspjbcz:add:cashier', 'financial:pfyspjbcz:add:business']
          },
          {
            prop: "doctypeid",
            label: "票据类型",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "select",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            options:
              [
                {value: 1, label: "银行承兑"},
                {value: 2, label: "商业承兑"}
              ],
            required: true
          },
          {
            prop: "doctypename",
            label: "票据类型",
            type: 0,
            tableStatus: 0,
          },
          {
            prop: "outdate",
            label: "出票日",
            type: 2,
            width: 150,
            widthStatus: true,
            listStatus: 0,
            tableStatus: 0,
            listType: "datetime",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            defaultTime: "00:00:00",
            required: true
          },
          {
            prop: "enddate",
            label: "到期日",
            type: 2,
            width: 150,
            widthStatus: true,
            listStatus: 0,
            tableStatus: 0,
            listType: "datetime",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            defaultTime: "23:59:59",
            required: true
          },
          {
            prop: "recbankname",
            label: "回款银行",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "select",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            options:
              [
                {value: "兴业银行", label: "兴业银行"},
                {value: "招商银行", label: "招商银行"},
                {value: "浦发银行", label: "浦发银行"},
                {value: "民生银行", label: "民生银行"},
                {value: "大连银行", label: "大连银行"}
              ],
            required: true
          },
          {
            prop: "outbankid",
            label: "出票行ID",
            type: 0,
            listStatus: 0,
            tableStatus: 1,
            listType: "inputHov",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true
          },
          {
            prop: "outbankname",
            label: "出票行名称",
            type: 0,
            width: 90,
            listStatus: 0,
            tableStatus: 0,
            listType: "input",
            listDisabled: true
          },
          {
            prop: "bano",
            label: "票号",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "input",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true
          },
          {
            prop: "total",
            label: "票据金额",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "input",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true
          },

          {
            prop: "banktype",
            label: "出票行标识",
            width: 100,
            type: 0,
            tableStatus: 0,
          },
          {
            prop: "customid",
            label: "回款单位ID",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "inputHov",
            listDisabled: null,
            btnDisabled: true,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true
          },
          {
            prop: "customname",
            label: "回款单位名称",
            width: 230,
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "inputNumber",
            listDisabled: true
          },
          {
            prop: "outcompany",
            label: "出票单位",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "input",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true
          },
          {
            prop: "timers",
            label: "背书次数",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "inputNumber",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true
          },
          {
            type: 0,
            prop: "handmanid",
            label: "交票人ID",
            listStatus: 0,
            tableStatus: 1,
            listType: "inputHov",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true,
            btnDisabled: true
          },
          {
            prop: "handmanname",
            label: "交票人",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "input",
            listDisabled: true
          },
          {
            prop: "tocompanyid",
            label: "背书单位ID",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "inputHov",
            listDisabled: true,
          },
          {
            prop: "tocompanyname",
            label: "背书单位",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "input",
            listDisabled: true
          },
          {
            prop: "todate",
            label: "背书日期",
            type: 2,
            width: 150,
            widthStatus: true,
            listStatus: 0,
            tableStatus: 0,
            listType: "datetime",
            listDisabled: true
          },
          {
            prop: "inputmanname",
            label: "录入人",
            type: 0,
            tableStatus: 0
          },
          {
            prop: "confirmmanname",
            label: "确认人",
            type: 0,
            tableStatus: 0
          },
          {
            prop: "confirmdate",
            label: "确认日期",
            type: 2,
            width: 150,
            widthStatus: true,
            tableStatus: 0
          },
          {
            prop: "invalidmanname",
            label: "作废人",
            type: 0,
            tableStatus: 0
          },
          {
            prop: "invaliddate",
            label: "作废日期",
            type: 2,
            width: 150,
            widthStatus: true,
            tableStatus: 0
          },
          {
            prop: "usestatusname",
            label: "状态",
            type: 0,
            tableStatus: 0
          },
          {
            prop: "voucherflagname",
            label: "是否已生凭证",
            type: 0,
            width: 100,
            tableStatus: 0
          },
          {
            prop: "rectotal",
            label: "已回款金额",
            type: 0,
            width: 90,
            tableStatus: 0
          },
          {
            prop: "sourcetype",
            label: "票据来源",
            type: 0,
            listStatus: 0,
            tableStatus: 0,
            listType: "select",
            listDisabled: null,
            listPerms: ["financial:pfyspjbcz:add:cashier", "financial:pfyspjbcz:add:business"],
            required: true,
            options: []
          },
          {
            prop: "sourcetypename",
            label: "票据来源",
            type: 0,
            tableStatus: 0
          },
          {
            prop: "caozuo",
            fixed: "right",
            label: "操作",
            type: 1,
            width: 280,
            widthStatus: true,
            tableStatus: 0,
            options:
              [
                {id: "edit", icon: "fa fa-edit", label: "action.edit", perms: "financial:pfyspjbcz:update"},
                {id: "comfirm", icon: "fa fa-check", label: "action.comfirm", perms: "financial:pfyspjbcz:comfirm"},
                {id: "delete", icon: "fa fa-trash", label: "action.nullify", perms: "financial:pfyspjbcz:delete"}
              ]
          }
        ],
      tableData: [],
      //新增修改
      dialogVisible: false,
      dialogStatus: false,
      dialogTitle: "",
      dialogInline: true,
      dialogLabelWidth: "100px",
      dialogWidth: "800px",
      dialogList: [],
      usestatus: null,
      btnArray: {
        type: 2,
        id: "",
        disabled: false
      },
      dialogData: {},
      bankVisible: false,
      bankHov:
        {
          hovTitle: "出票行查询",
          hovUrl: "outbankidhov/select",
          afterStatus: false,
          fillDataName: "dialogData",
          parentVisible: 'bankVisible',
          hovColumns:
            [
              {
                id: "outbankid", name: "出票行ID",
                value: null,
                queryStatus: true,
                dataStatus: 2,
                fillid: "outbankid"
              },
              {
                id: "outbankname", name: "出票行名称",
                value: null,
                queryStatus: true,
                dataStatus: 1,
                fillid: "outbankname"
              },
              {
                id: "banktype", name: "出票行类型",
                value: null,
                queryStatus: true,
                dataStatus: 1
              }
            ]
        },
      hkVisible: false,
      hkHov:
        {
          hovTitle: "回款单位查询",
          hovUrl: "companyidhov/selectcompanyid",
          afterStatus: false,
          fillDataName: "dialogData",
          parentVisible: 'hkVisible',
          hovColumns:
            [
              {
                id: "companyid", name: "回款单位ID",
                value: null,
                queryStatus: true,
                dataStatus: 2,
                fillstatus: 1,
                fillid: "customid"
              },
              {
                id: "companyname", name: "回款单位名称",
                value: null,
                queryStatus: true,
                dataStatus: 1,
                fillstatus: 1,
                fillid: "customname"
              },
              {
                id: "companyopcode", name: "回款单位操作码",
                value: null,
                queryStatus: true,
                dataStatus: 1,
                fillstatus: 2
              }
            ]
        },
      employeeVisible: false,
      employeeHov:
        {
          hovTitle: "交票人查询",
          hovUrl: "employeeididhov/select",
          afterStatus: false,
          fillDataName: "dialogData",
          parentVisible: 'employeeVisible',
          hovColumns:
            [
              {
                id: "employeeid", name: "交票人ID",
                value: null,
                queryStatus: true,
                dataStatus: 2,
                fillstatus: 1,
                fillid: "handmanid"
              },
              {
                id: "employeename", name: "交票人名称",
                value: null,
                queryStatus: true,
                dataStatus: 1,
                fillstatus: 1,
                fillid: "handmanname"
              }
            ]
        },
      bsVisible: false,
      bsHov: {
        hovTitle: "背书单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: true,
        fillDataName: "dialogData",
        parentVisible: 'bsVisible',
        hovColumns: [
          {
            id: "companyid",
            name: "背书单位ID",
            value: null,
            queryStatus: true,
            dataStatus: 2,
            fillstatus: 1,
            fillid: "tocompanyid"
          },
          {
            id: "companyname",
            name: "背书单位名称",
            value: null,
            queryStatus: true,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "tocompanyname"
          }
        ]
      },
      queryBsVisible: false,
      queryBsHov: {
        hovTitle: "背书单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: true,
        fillDataName: "formData",
        parentVisible: 'queryBsVisible',
        hovColumns: [
          {
            id: "companyid",
            name: "背书单位ID",
            value: null,
            queryStatus: true,
            dataStatus: 2,
            fillstatus: 1,
            fillid: "tocompanyid"
          },
          {
            id: "companyname",
            name: "背书单位名称",
            value: null,
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },
      queryCphStatus: false,
      queryCphVisible: false,
      queryCphHov: {
        hovTitle: "出票行查询",
        hovUrl: "outbankidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryCphVisible',
        hovColumns:
          [
            {
              id: "outbankid", name: "出票行ID",
              value: null,
              queryStatus: true,
              dataStatus: 2,
              fillid: "outbankidarr"
            },
            {
              id: "outbankname", name: "出票行名称",
              value: null,
              queryStatus: true,
              dataStatus: 1,
            },
            {
              id: "banktype", name: "出票行类型",
              value: null,
              queryStatus: true,
              dataStatus: 1
            }
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    selectOption(this.queryList, 'usestatus', selectDdlOption('BA_STATUS'));
    this.tableColumns.forEach(e => {
      if (e.prop === "sourcetype") {
        let options = null;
        if (this.hasPerms(['financial:pfyspjbcz:add:cashier']) === true) {
          options = [{value: 1, label: "外部票据(外部客户)"}, {value: 2, label: "内部票据(自办票)"}];
          e.options = options;
        } else {
          options = [{value: 1, label: "外部票据(外部客户)"}];
          e.options = options;
        }
      }
    });
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    handleQuery(data) {
      //查询
      if (data === 'query') {
        let pagesize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pagesize);
      } else if (data === 'add') {//新增表单打开
        this.dialogVisible = true;
        this.dialogTitle = '新增表单';
        this.btnArray.id = 'add';
        this.dialogList = formListFormat(this.tableColumns);
        let params = {baid: 0, credate: new Date(), doctypeid: 1, sourcetype: 1, recbankname: '招商银行'};
        this.dialogData = formDataFormatIn(this.tableColumns, params);
      } else if (data === "reset") {
        let formData = this.$refs.query.formData;//查询条件
        Object.keys(formData).forEach(e => {
          formData[e] = null;
        })
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '批发应收票据备查账' + this.getNewDate())
      } else if (data === "exportExecl") {
        if (this.hasPerms('financial:pfyspjbcz:add:cashier') === false) {
          alert("没有权限");
          return false;
        } else if (this.hasPerms('financial:pfyspjbcz:add:cashier') === true) {
          this.execlStatus = true;
        }
      }
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.$refs.query.formData;
      let params = {};
      /*if(formData.usestatusarr.length>0){
        params.usestatusarr=formData.usestatusarr.toString();
      }*/
      Object.keys(formData).forEach(e => {
        if (e !== 'startdate' && e !== 'endofdate') {
          if (formData[e] !== null && formData[e] !== "") {
            params[e] = formData[e];
          }
        }
      });
      if (formData.startdate !== null && formData.startdate !== "") {
        params.startdate = formData.startdate;
      }
      if (formData.endofdate !== null && formData.endofdate !== "") {
        params.endofdate = formData.endofdate;
      }
      params.companyid = Number(sessionStorage.getItem("companyid"));
      this.tableData = [];
      this.$api.financial.selectPfyspjbcz({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.tableData = Object.freeze(res.data.content);
        this.$refs.doctable.currentPage = res.data.pageNum;
        this.$refs.doctable.pageSize = res.data.pageSize;
        this.$refs.doctable.total = res.data.totalSize
      }).catch(res => {
        console.log(res.message);
        return false;
      })
    },
    handleTable(data) {
      if (data.id === "edit") {//修改表单打开
        this.dialogVisible = true;
        this.dialogStatus = false;
        this.dialogList = data.list;
        this.dialogData = data.listData;
        if (data.row.usestatus === 0) {
          if (this.hasPerms('financial:pfyspjbcz:update:ap') === true) {
            this.btnArray.disabled = true;
          } else {
            this.btnArray.disabled = false;
          }
          if (data.row.voucherflag === 1) {
            this.disForm(this.dialogList, 'id', 'todate', 'disabled', false);
            this.disForm(this.dialogList, 'id', 'tocompanyid', 'disabled', false);
          }
          this.dialogTitle = '修改表单';
          this.btnArray.id = 'update';
          Object.keys(this.dialogData).forEach(e => {
            this.dialogData[e] = data.row[e];
          });
        } else if (data.row.usestatus === 4) {
          this.dialogList.forEach(e => {
            e.disabled = true;
          });
          this.btnArray.disabled = true;
          if (this.hasPerms('financial:pfyspjbcz:update:ap') === false) {
            //this.disForm(this.dialogList,'id','tocompanyid','perms','');
            this.btnArray.disabled = false;
          } else if (this.hasPerms('financial:pfyspjbcz:update:ap') === true) {
            if (data.row.todate == null) {
              this.disForm(this.dialogList, 'id', 'tocompanyid', 'disabled', null);
              this.disForm(this.dialogList, 'id', 'tocompanyid', 'perms', 'financial:pfyspjbcz:update:ap');
            } else {
              //this.disForm(this.dialogList,'id','tocompanyid','perms','');
            }
            this.btnArray.disabled = false;
          }
          if (this.hasPerms('financial:pfyspjbcz:add:cashier') === false) {
            //this.disForm(this.dialogList,'id','todate','perms','');
            this.btnArray.disabled = false;
          } else if (this.hasPerms('financial:pfyspjbcz:add:cashier') === true) {
            if (data.row.tocompanyid != null) {
              this.disForm(this.dialogList, 'id', 'todate', 'disabled', null);
              this.disForm(this.dialogList, 'id', 'todate', 'perms', 'financial:pfyspjbcz:add:cashier');
            } else {
              //this.disForm(this.dialogList,'id','todate','perms','');
              this.btnArray.disabled = false;
            }
          }
          if (data.row.voucherflag === 1) {
            this.disForm(this.dialogList, 'id', 'todate', 'disabled', false);
            this.disForm(this.dialogList, 'id', 'tocompanyid', 'disabled', false);
          }
          this.dialogTitle = '修改表单';
          this.btnArray.id = 'update';
          Object.keys(this.dialogData).forEach(e => {
            this.dialogData[e] = data.row[e];
          });
        } else {
          this.dialogTitle = '修改表单';
          this.btnArray.id = 'update';
          this.dialogList.forEach(e => {
            e.disabled = true;
          });
          Object.keys(this.dialogData).forEach(e => {
            this.dialogData[e] = data.row[e];
          });
          if (data.row.voucherflag === 1) {
            this.disForm(this.dialogList, 'id', 'todate', 'disabled', false);
            this.disForm(this.dialogList, 'id', 'tocompanyid', 'disabled', false);
          }
        }
        this.usestatus = data.row.usestatus;
      } else if (data.id === "comfirm") {//确认
        if (data.row.usestatus !== 0) {
          alert("表单为临时状态才能确认");
          return;
        }
        let com = confirm('是否确认');
        if (com === true) {
          let params = {};
          params.baid = data.row.baid;
          params.confirmmanid = Number(sessionStorage.getItem("userid"));
          if (this.hasPerms('financial:pfyspjbcz:add:cashier') === true && data.row.sourcetype === 2) {
            params.usestatus = 4;
          } else {
            params.usestatus = 1;
          }
          this.$api.financial.comfirmPfyspjbcz(params).then(res => {
            if (res.code === 200) {
              if (res.data === "1") {
                alert("确认成功");
                this.handleQuery('query');
              } else {
                alert(res.data);
                return false;
              }
            }
          }).catch(res => {
            console.log(res.message);
            return false;
          })
        } else {
          return false;
        }
      } else if (data.id === "delete") {//作废
        if (data.row.usestatus !== 0) {
          alert("表单为临时状态才能作废");
          return;
        }
        let com = confirm('是否作废');
        if (com === true) {
          let params = {};
          params.baid = data.row.baid;
          params.invalidmanid = Number(sessionStorage.getItem("userid"));
          params.usestatus = 2;
          this.$api.financial.deletePfyspjbczDtl(params).then(res => {
            if (res.code === 200) {
              if (res.data === "1") {
                alert("作废成功");
                this.handleQuery('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(res => {
            console.log(res.message);
            return false;
          })
        } else {
          return false;
        }
      }
    },
    //分页跳转
    handlePageChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    queryHov(data) {
      if (data === "customid") {
        this.queryCustomVisible = true;
      } else if (data === "tocompanyid") {
        this.queryBsVisible = true;
      } else {
        this.queryCphVisible = true;
      }
    },
    dialogHov(data) {
      if (data === "outbankid") {
        this.bankVisible = true;
      } else if (data === "customid") {
        this.hkVisible = true;
      } else if (data === "handmanid") {
        this.employeeVisible = true;
      } else if (data === "tocompanyid") {
        this.bsVisible = true;
      }
    },
    submitForm(data) {
      if (data.btnid === "add") {//新增提交
        data.data.inputmanid = Number(sessionStorage.getItem("userid"));
        data.data.companyid = Number(sessionStorage.getItem("companyid"));
        data.data.usestatus = 0;
        this.$api.financial.insertPfyspjbcz(data.data).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("保存成功");
              this.closeDialog();
              this.handleQuery('query');
            } else {
              alert(res.data);
              return false;
            }
          }
        }).catch(res => {
          console.log(res.message);
          return false;
        })
      } else if (data.btnid === "update") {//修改提交
        if (this.usestatus === 5 || this.usestatus === 6) {
          alert("不可修改");
          return false;
        }
        var params = {};
        if (this.hasPerms('financial:pfyspjbcz:add:cashier') === true && data.data.todate !== null) {
          data.data.usestatus = 5;
        }
        Object.keys(this.dialogData).forEach(e => {
          params[e] = data.data[e];
        });
        this.$api.financial.updatePfyspjbcz(params).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("修改成功");
              this.closeDialog();
              this.handleQuery('query');
            } else {
              alert(res.data);
              return false;
            }
          }
        }).catch(res => {
          console.log(res.message);
          return false;
        })
      }
    },
    closeDialog() {
      this.resizeData(this.dialogData);
      this.dialogVisible = false;
    },
    resizeData(data) {
      Object.keys(data).forEach(e => {
        data[e] = null;
      })
    },
    hasPerms(perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms)
    },
    disForm(list, id, termid, term, status) {
      list.forEach(e => {
        if (e[id] === termid) {
          e[term] = status;
        }
      })
    },
    bsUpdateHov() {
      this.disForm(this.formList, 'id', 'todate', 'disabled', null);
      this.disForm(this.formList, 'id', 'todate', 'perms', 'financial:pfyspjbcz:add:cashier');
    }
  }
}
