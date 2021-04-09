import {
  dateFormat,
  tableLoading
} from "@/utils/functions";

export default {
  name: 'Cgddcxzf',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ordermanagement:cgddcxzf:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ordermanagement:cgddcxzf:select"}
      ],
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商', formWidth: 180, labelWidth: 50},
        {type: 'input', id: 'supplyname', label: '供应商名称', formWidth: 240, labelWidth: 80},
        {type: 'inputNumber', id: 'orderid', label: '采购订单ID', formWidth: 240, labelWidth: 80},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 180, labelWidth: 50},
        {type: 'input', id: 'inputman', label: '采购负责人', formWidth: 200, labelWidth: 80},
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {
          type: 'select', id: 'finishflag', label: '完成标志', options: [
            {value: 0, label: '未完成'}, {value: 1, label: '完成'}, {value: 2, label: '执行'}, {
              value: 3,
              label: '作废'
            }, {value: 4, label: '终止'}
          ], clearable: true
        },
        {type: 'daterange', id: 'sfdate', id2: 'afdate', label: '完成日期'}
      ],
      formData: {
        supplyid: null,
        supplyname: null,
        orderid: null,
        goodsid: null,
        inputman: null,
        startdate: null,
        endofdate: null,
        finishflag: null,
        sfdate: null,
        afdate: null
      },
      loading: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'orderid', label: '订单ID', type: 0, tableStatus: 0},
        {prop: 'credate', label: '日 期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'total', label: '总金额', type: 0, tableStatus: 0},
        {prop: 'sfdate', label: '应完成日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'afdate', label: '实际完成日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'inputmanname', label: '采购负责人', type: 0, tableStatus: 0},
        {prop: 'invaliddate', label: '作废日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'invalidmanname', label: '作废人', type: 0, tableStatus: 0},
        {prop: 'memo', label: '备注', type: 0, tableStatus: 0},
        {prop: 'pcdeptid', label: '采购部门ID', type: 0, tableStatus: 0},
        {prop: 'pcdeptname', label: '采购部门', type: 0, tableStatus: 0},
        {prop: 'buyerid', label: '采购员ID', type: 0, tableStatus: 0},
        {prop: 'buyer', label: '采购员', type: 0, tableStatus: 0},
        {prop: 'sudeptid', label: '进货部门ID', type: 0, tableStatus: 0},
        {prop: 'sudeptname', label: '进货部门', type: 0, tableStatus: 0},
        {prop: 'companyid', label: '公司ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '公司名称', type: 0, tableStatus: 0},
        {prop: 'lmcompanyid', label: '物流单位ID', type: 0, tableStatus: 0},
        {prop: 'lmcompanyname', label: '物流单位名称', type: 0, tableStatus: 0},
        {prop: 'paymode', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'paymodename', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'payterm', label: '账期', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经销方式', type: 0, tableStatus: 0},
        {prop: 'usestatus', label: '状态', type: 0, tableStatus: 0},
        {prop: 'usestatusname', label: '状态', type: 0, tableStatus: 0},
        {prop: 'inputmanid', label: '录入人ID', type: 0, tableStatus: 0},
        {prop: 'confirmmanid', label: '确认人ID', type: 0, tableStatus: 0},
        {prop: 'confirmmanname', label: '确认人', type: 0, tableStatus: 0},
        {prop: 'confirmdate', label: '确认日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'invalidmanid', label: '作废人ID', type: 0, tableStatus: 0},
        {prop: 'breakmanid', label: '终止人ID', type: 0, tableStatus: 0},
        {prop: 'breakmanname', label: '终止人', type: 0, tableStatus: 0},
        {prop: 'breakdate', label: '终止日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'insaorderid', label: '内部销售订单ID', type: 0, tableStatus: 0},
        {prop: 'tranmethod', label: '运输方式', type: 0, tableStatus: 0},
        {prop: 'tranmethodname', label: '运输方式', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          type: 1,
          width: 300,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: 'edit',
              icon: "fa fa-edit",
              label: "action.selectDtl",
              perms: "ordermanagement:cgddcxzf:select",
              loading: false
            },
            {
              id: 'zuofei',
              icon: "fa fa-edit",
              label: "action.nullify",
              perms: "ordermanagement:cgddcxzf:invalid",
              loading: false
            },
            {
              id: 'zhongzhi',
              icon: "fa fa-edit",
              label: "action.termination",
              perms: "ordermanagement:cgddcxzf:termination",
              loading: false
            }
          ]
        }
      ],
      docTableData: [],
      pageStatus: false,
      dtlVisible: false,
      dialogWidth: '1000px',
      dialogTop: '10vh',
      dialogTitle: '查询细单',
      dtlTableData: [],
      dtlHieght: 440,
      total: 0,
      orderid: null,
      totalDoc: null,
      cgddcxzfSaveStatus:false,
      inputmanid: null,
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
            {id: "employeename", name: "录入人名称", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.docTableColumns, this.docTableData, '采购订单查询/作废' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = {};
      let formData = this.formData;
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== 'endofdate' && e !== "sfdate" && e !== 'afdate') {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
          }
        }
      });
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (this.returnValue(formData.sfdate) === true) {
        params.sfdate = formData.sfdate;
      }
      if (this.returnValue(formData.afdate) === true) {
        params.afdate = formData.afdate;
      }
      params.companyid = Number(sessionStorage['companyid']);
      if (Object.keys(params).length === 0) {
        alert("请输入查询条件");
        return false;
      }
      this.docTableData = [];
      this.loading = true;
      this.$api.ordermanagement.selectCgddcxzfDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
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
      if (data.id === 'edit') {
        this.selectDtl(data.row.orderid, data.row.total, data.row.inputmanid);
        this.dtlVisible = true;
      } else if (data.id === 'zuofei') {
        if (confirm("是否作废?")) {
          tableLoading(this.docTableColumns, 'zuofei', true);
          let inputmanid = Number(sessionStorage['userid']);
          this.$api.ordermanagement.selectCgddcxzfZfDoc({
            orderid: data.row.orderid,
            inputmanid: inputmanid
          }).then(res => {
            if (res.code === 200) {
              if (res.msg === "1") {
                alert('作废成功');
                tableLoading(this.docTableColumns, 'zuofei', false);
                this.queryFunction('query');
              } else {
                alert(res.msg);
                tableLoading(this.docTableColumns, 'zuofei', false);
                return false;
              }
            }
          }).catch(error => {
            tableLoading(this.docTableColumns, 'zuofei', false);
            return false;
          });
        } else {
          return false;
        }
      } else if (data.id === 'zhongzhi') {
        if (confirm("是否终止?")) {
          tableLoading(this.docTableColumns, 'zhongzhi', true);
          let inputmanid = Number(sessionStorage['userid']);
          this.$api.ordermanagement.selectCgddcxzfZzDoc({
            orderid: data.row.orderid,
            inputmanid: inputmanid
          }).then(res => {
            if (res.code === 200) {
              if (res.msg === "1") {
                alert('终止成功');
                tableLoading(this.docTableColumns, 'zhongzhi', false);
                this.queryFunction('query');
              } else {
                alert(res.msg);
                tableLoading(this.docTableColumns, 'zhongzhi', false);
                return false;
              }
            }
          }).catch(error => {
            tableLoading(this.docTableColumns, 'zhongzhi', false);
            return false;
          });
        } else {
          return false;
        }
      }
    },
    selectDtl(orderid, total, inputmanid) {
      this.$api.ordermanagement.selectCgddcxzfDtl({orderid: orderid, total: total}).then(res => {
        if (res.code === 200) {
          this.dtlTableData = res.data;
          this.orderid = orderid;
          this.totalDoc = total;
          this.inputmanid = inputmanid;
          if(inputmanid === Number(sessionStorage['userid'])){
            this.cgddcxzfSaveStatus = true;
          }else {
            this.cgddcxzfSaveStatus = false;
          }
        }
      }).catch(error => {
        return false;
      });
    },
    insertDtl() {
      let data = this.dtlTableData;
      if (data.length === 0) {
        alert("没有细单需要保存");
        return false;
      }
      let params = [];
      data.forEach(e => {
        let tel = {};
        tel.orderdtlid = e.orderdtlid;
        tel.earlydate = e.earlydate;
        tel.memo = e.memo;
        params.push(tel);
      });
      this.$api.ordermanagement.insertCgddcxzfDtl({data: params}).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("保存成功");
            this.dialogClose();
          } else {
            alert(res.msg);
            return false;
          }
        }
      }).catch(error => {
        return false;
      });
    },
    zuofeiDtl(orderdtlid) {
      if (confirm("是否作废?")) {
        let inputmanid = Number(sessionStorage['userid']);
        this.$api.ordermanagement.selectCgddcxzfZfDtl({orderdtlid: orderdtlid, inputmanid: inputmanid}).then(res => {
          if (res.code === 200) {
            if (res.msg === "1") {
              alert('作废成功');
              this.selectDtl(this.orderid, this.totalDoc, this.inputmanid);
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        });
      } else {
        return false;
      }
    },
    zhongzhiDtl(orderdtlid) {
      if (confirm("是否终止?")) {
        let inputmanid = Number(sessionStorage['userid']);
        this.$api.ordermanagement.selectCgddcxzfZzDtl({orderdtlid: orderdtlid, inputmanid: inputmanid}).then(res => {
          if (res.code === 200) {
            if (res.msg === "1") {
              alert('终止成功');
              this.selectDtl(this.orderid, this.totalDoc, this.inputmanid);
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          return false;
        });
      } else {
        return false;
      }
    },
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "inputmanid") {
        this.inputmanVisible = true;
      }
    },
    dialogClose() {
      this.dtlTableData = [];
      this.orderid = null;
      this.totalDoc = null;
      this.dtlVisible = false;
    },
    returnValue(data) {
      return data !== null && data !== "";
    },
    dateFormat(format, date) {
      dateFormat(format, date);
    }
  }
}
