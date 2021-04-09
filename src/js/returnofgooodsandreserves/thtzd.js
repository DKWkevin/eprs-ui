import {selectOption} from "@/utils/functions";
import {selectbuyid} from "@/utils/drops";
import ExeclInsert from "@/views/Core/ExeclInsert";
import '@/assets/css/dialog.css';

export default {
  name: 'Thtzd',
  components: {ExeclInsert},
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '创建日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', labelWidth: 65, formWidth: 180},
        {type: 'inputHov', id: 'inputmanid', label: '录入人ID', labelWidth: 65, formWidth: 180},
        {
          type: 'select',
          label: '状态',
          id: 'usestatus',
          options: [{value: '0', label: '临时'}, {value: '1', label: '确认'}, {value: '2', label: '退货完成'},
            {value: '3', label: '收货完成'}, {value: '4', label: '审批'}, {value: '5', label: '作废'}, {
              value: '6',
              label: '已发送给物流'
            }
          ],
          clearable: true
        },
        {type: 'select', label: '采购支持', id: 'buyer', options: [], clearable: true}
      ],
      formData: {startdate: null, endofdate: null, supplyid: null, inputmanid: null, usestatus: null},
      btnOptions: [
        {id: 'query', label: 'action.search', icon: 'fa fa-search', perms: 'returnofgoodsandreserves:thtzd:select'},
        {id: 'uploads', label: 'action.upload', icon: 'fa fa-upload', perms: 'returnofgoodsandreserves:thtzd:select'},
        {id: 'auditing', label: 'action.auditing', icon: '', perms: 'returnofgoodsandreserves:thtzd:select'},
        {
          id: 'delete',
          label: 'action.deletebatch',
          icon: 'fa fa-delete',
          perms: 'returnofgoodsandreserves:thtzd:select'
        },
        {
          id: 'download',
          label: 'action.download',
          icon: 'fa fa-download',
          perms: 'returnofgoodsandreserves:thtzd:select'
        },
      ],
      tableHeight: 0,
      loading: false,
      tableColumns: [
        {indexType: 'selection'},
        {type: 0, prop: 'subackdocid', label: '总单ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日 期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'cgzc', label: '采购支持', tableStatus: 0},
        {type: 0, prop: 'reccompanyid', label: '收货公司ID', tableStatus: 0},
        {type: 0, prop: 'reccompanyname', label: '收货公司名称', tableStatus: 0},
        {type: 0, prop: 'salesmode', label: '经销方式', tableStatus: 0},
        {type: 0, prop: 'backwhyname', label: '退货原因', tableStatus: 0},
        {type: 0, prop: 'inputmanname', label: '录入人', tableStatus: 0},
        {type: 0, prop: 'total_line', label: '总金额', tableStatus: 0},
        {type: 0, prop: 'dtllines', label: '细目笔数', tableStatus: 0},
        {type: 0, prop: 'usestatus', label: '状态', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '状态', tableStatus: 0},
        {type: 0, prop: 'memo', label: '备注', tableStatus: 0},
        {type: 0, prop: 'subackid', label: '退货单位进货退货单ID', tableStatus: 0},
        {type: 2, prop: 'backfindate', label: '退货完成日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'salesbackid', label: '收货单位销售退货单ID', tableStatus: 0},
        {type: 2, prop: 'recfindate', label: '收货完成日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'backdate', label: '退货期限', tableStatus: 0},
        {type: 0, prop: 'recdate', label: '收货期限', tableStatus: 0},
        {type: 0, prop: 'backwhyid', label: '退货原因ID', tableStatus: 0},
        {type: 0, prop: 'stcompanyid', label: '配送部门ID', tableStatus: 0},
        {type: 0, prop: 'stcompanyname', label: '配送部门名称', tableStatus: 0},
        {type: 0, prop: 'paymode', label: '付款方式', tableStatus: 0},
        {type: 0, prop: 'payterm', label: '账期', tableStatus: 0},
        {type: 0, prop: 'paymodename', label: '付款方式', tableStatus: 0},
        {type: 0, prop: 'companyid', label: '退货公司ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '退货公司名称', tableStatus: 0},
        {type: 0, prop: 'deptid', label: '退货部门ID', tableStatus: 0},
        {type: 0, prop: 'deptname', label: '退货部门名称', tableStatus: 0},
        {type: 0, prop: 'recdeptid', label: '通知部门ID', tableStatus: 0},
        {type: 0, prop: 'recdeptname', label: '通知部门名称', tableStatus: 0},
        {type: 0, prop: 'inputmanid', label: '录入人ID', tableStatus: 0},
        {
          type: 0,
          prop: 'caozuo',
          label: '操作',
          tableStatus: 0,
          fixed: 'right',
          width: 280,
          widthStatus: true,
          options: [
            {
              id: 'delete',
              label: 'action.delete',
              icon: 'fa fa-delete',
              perms: 'returnofgoodsandreserves:thtzd:select'
            },
            {
              id: 'selectDtl',
              label: 'action.search',
              icon: 'fa fa-search',
              perms: 'returnofgoodsandreserves:thtzd:select'
            }
          ]
        }
      ],
      tableData: [],
      selections: [],
      dialogVisible: false,
      doctype: 0,
      docTitle: "细单查询",
      dialogWidth: '700px',
      dialogHeight: 500,
      dialogTop: '12vh',
      dtlTableData: [],
      dtlTableHeight: 300,
      hjsl: 0,
      subackdocid: null,
      usestatus: null,
      dtlLoading: false,
      btnLoading: false,
      execlParentid: 'execlVisible',
      execlVisible: false,
      execlColumns: [
        {type: 0, prop: 'counterid', label: '配送中心ID', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'lotno', label: '批号', tableStatus: 0},
        {type: 0, prop: 'backwhyid', label: '退货原因', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '数量', tableStatus: 0},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'memo', label: '备注', tableStatus: 0},
        {type: 0, prop: 'storeid', label: '仓储区域', tableStatus: 0}
      ],
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
      inputmanVisible: false,
      inputmanHov: {
        hovTitle: '录入人查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'inputmanVisible',
        hovColumns:
          [
            {id: "employeeid", name: "录入人ID", queryStatus: true, dataStatus: 2, fillid: "inputmanid"},
            {id: "employeename", name: "录入人名称", queryStatus: true, dataStatus: 1},
            {id: "employeeopcode", name: "录入人操作码", queryStatus: true, dataStatus: 1}
          ]
      }

    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    selectOption(this.formList, 'buyer', selectbuyid());
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    functionQuery(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "auditing") {
        if (this.selections.length === 0) {
          return false;
        }
        this.$api.returnofgoodsandreserves.thtzdSp(this.selections).then(res => {
          if (res.code === 200) {
            if (res.data > 0) {
              alert("审批成功");
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      } else if (data === "delete") {
        if (this.selections.length === 0) {
          alert("没有选择数据,不能删除");
          return false;
        }
        let params = [];
        this.selections.forEach(e => {
          if (e.usestatus === 5) {
            alert("已经作废");
            return false;
          } else if (e.usestatus === 1 || e.usestatus === 4) {
          } else {
            alert("有单据状态不为1，4不能作废!");
            return false;
          }
          params.push(e.susetdocid);
        });
        this.$api.returnofgoodsandreserves.thtzdDeleteAll(params.toString()).then(res => {
          if (res.code === 200) {
            if (res.data > 0) {
              alert("作废成功");
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      } else if (data === "download") {
        let columns = [];
        this.tableColumns.map((e, index) => {
          if (index !== 0) {
            columns.push(e);
          }
        });
        this.exportExcelDOM(columns, this.tableData, "储备品种维护" + this.getNewDate());
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== "endofdate") {
          if (formData[e] !== null && formData[e] !== "") {
            params[e] = formData[e];
          }
        }
      });
      if (formData.stid !== null && formData.stid !== "") {
        params.stid = formData.stid;
      }
      if (formData.startdate !== null && formData.startdate !== "") {
        params.startdate = formData.startdate;
      }
      if (formData.endofdate !== null && formData.endofdate !== "") {
        params.endofdate = formData.endofdate;
      }
      params.companyid = Number(sessionStorage['compayid']);
      this.loading = true;
      this.tableData = [];
      this.$api.returnofgoodsandreserves.selectThtzd({
        pageNum: pageNum,
        pageSize: pageSize,
        params: params
      }).then(res => {
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
      if (data.id === "delete") {
        if (data.row.usestatus === 5) {
          alert("已经作废!");
          return false;
        }
        if (data.row.usestatus === 1 || data.row.usestatus === 4) {
          this.$api.returnofgoodsandreserves.thtzdDelete({subackdocid: data.row.subackdocid}).then(res => {
            if (res.code === 200) {
              if (res.data === 1) {
                alert("删除总单成功");
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
          alert("不能作废");
          return false;
        }
      } else if (data.id === "selectDtl") {
        this.dialogVisible = true;
        this.dtlLoading = true;
        this.$api.returnofgoodsandreserves.selectThtzdDtl({
          subackdocid: data.row.subackdocid,
          usestatus: data.row.usestatus
        }).then(res => {
          if (res.code === 200) {
            this.dtlTableData = res.data;
            this.dtlLoading = false;
          }
        }).catch(error => {
          this.dtlLoading = false;
          return false;
        })
      }
    },
    insertForm() {
      this.$api.returnofgoodsandreserves.thtzdInsert(this.dtlTableData).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("删除总单成功");
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
    execlInsert(data) {
      let params = {};
      params.data = [];
      data.forEach(e => {
        params.data.push(e);
      });
      this.$api.returnofgoodsandreserves.addThtzdExcelCashier(params).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("导入成功");
            this.refs.execlInsert.closeExecl();
          } else {
            console.log(res.msg);
            alert(res.data);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    closegoodsqty(row) {
      let qty = Number(row.goodsqty);
      let price = Number(row.unitprice);
      row.total = Number(qty * price).toFixed(2);
    },
    selectionChange(val) {
      this.selections = val;
    },
    openHov(data) {
      if (data === 'supplyid') {
        this.supplyVisible = true;
      } else if (data === 'inputmanid') {
        this.inputmanVisible = true;
      }
    },
    dialogColse() {
      this.hjsl = 0;
      this.subackdocid = null;
      this.usestatus = null;
      this.dialogVisible = false;
    },
    headerStyle({row, rowIndex}) {
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    }
  }
}
