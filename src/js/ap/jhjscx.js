import {selectDoctypesIn, selectEmployees, selectFkfs, selectHsy} from "@/utils/drops";
import {selectOption} from "@/utils/functions";

export default {
  name: 'Jhjscx',
  data() {
    return {
      VLoading: false,
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ap:jhjscx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ap:jhjscx:select"}
      ],
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'input', id: 'susetdocid', label: '结算单ID'},
        {type: 'inputHov', id: 'companyid', label: '公司ID'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'select', id: 'paymode', label: '付款方式', options: [], clearable: true},
        {
          type: 'select',
          id: 'usestatus',
          label: '单据状态',
          options: [{value: 0, label: '临时'}, {value: 1, label: '确认'}, {value: 2, label: '合并'}, {value: 3, label: '作废'}],
          clearable: true
        },
        {type: 'select', id: 'checker', label: '核算员', options: [], clearable: true},
        {type: 'select', id: 'inputman', label: '录入人', options: [], clearable: true},
        {
          type: 'select',
          id: 'payflag',
          label: '付款完成标志',
          options: [{value: 1, label: '已付款'}, {value: 0, label: '未付款'}],
          clearable: true
        },
        {type: 'select', id: 'doctypeid', label: '单据类型', options: [], clearable: true},

      ],
      formData: {
        companyid: Number(sessionStorage['companyid']),
        susetdocid: null,
        startdate: null,
        endofdate: null,
        supplyid: null,
        goodsid: null,
        usestatus: null,
        checker: null,
        payflag: null,
        inputman: null,
        paymode: null,
        doctypeid: null
      },
      loading: false,
      docTableHeight: 0,
      tableColumns: [
        {indexType: 'selection'},
        {type: 0, prop: 'susetdocid', label: '总单ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'total', label: '金额', tableStatus: 0},
        {type: 0, prop: 'notaxmoney', label: '不含税额', tableStatus: 0},
        {type: 0, prop: 'taxmoney', label: '税额', tableStatus: 0},
        {type: 0, prop: 'paytotal', label: '付款金额', tableStatus: 0},
        {type: 0, prop: 'settlemodename', label: '结算方式', tableStatus: 0},
        {type: 0, prop: 'paymodename', label: '付款方式', tableStatus: 0},
        {type: 0, prop: 'salesmode', label: '经销方式', tableStatus: 0},
        {type: 0, prop: 'payterm', label: '账期', tableStatus: 0},
        {type: 0, prop: 'doctypename', label: '单据类型', tableStatus: 0},
        {type: 2, prop: 'checkcredate', label: '复核日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'useyear', label: '年', tableStatus: 0},
        {type: 0, prop: 'usemonth', label: '月', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '结算状态', tableStatus: 0},
        {type: 0, prop: 'corrflag', label: '被冲调标志', tableStatus: 0},
        {type: 0, prop: 'corrsourceid', label: '冲调单据ID', tableStatus: 0},
        {type: 0, prop: 'voucherflag', label: '总账记账标志', tableStatus: 0},
        {type: 0, prop: 'voucherid', label: '凭证ID', tableStatus: 0},
        {type: 2, prop: 'sucredate', label: '进货日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 2, prop: 'duepaycredate', label: '应付款日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 2, prop: 'paycredate', label: '付款日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'payflag', label: '付款完成标志', tableStatus: 0},
        {type: 0, prop: 'inputmanid', label: '录入人ID', tableStatus: 0},
        {type: 0, prop: 'inputman', label: '录入人', tableStatus: 0},
        {type: 0, prop: 'checkmanid', label: '复核人ID', tableStatus: 0},
        {type: 0, prop: 'checkman', label: '复核人', tableStatus: 0},
        {type: 0, prop: 'companyid', label: '公司ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '公司名称', tableStatus: 0},
        {type: 0, prop: 'checker', label: '核算员', tableStatus: 0},
        {type: 0, prop: 'invoiceno', label: '发票号码', tableStatus: 0},
        {
          type: 1,
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          width: 300,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {id: 'selectDtl', icon: "fa fa-edit", label: "action.selectDtl", perms: "ap:zgzcx:select"},
            {id: 'chongDiao', icon: "fa fa-edit", label: "action.chongDiao", perms: "ap:zgzcx:select"},
            {id: 'comfirmThis', icon: "fa fa-edit", label: "action.comfirmThis", perms: "ap:zgzcx:select"},
            {id: 'nullify', icon: "fa fa-edit", label: "action.nullify", perms: "ap:zgzcx:select"},
            {id: 'taxAdjustment', icon: "fa fa-edit", label: "action.taxAdjustment", perms: "ap:zgzcx:select"}
          ]
        }
      ],
      tableData: [],
      hjje: 0,
      gdje: 0,
      dtlTableColumns: [
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'lotno', label: '批号', tableStatus: 0},
        {type: 0, prop: 'goodsqty', label: '数量', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '含税单价', tableStatus: 0},
        {type: 0, prop: 'notaxprice', label: '无税单价', tableStatus: 0},
        {type: 0, prop: 'taxrate', label: '税率', tableStatus: 0},
        {type: 0, prop: 'total_line', label: '金额', tableStatus: 0},
        {type: 0, prop: 'notaxmoney', label: '不含税额', tableStatus: 0},
        {type: 0, prop: 'taxmoney', label: '税额', tableStatus: 0},
        {type: 0, prop: 'susetdocid', label: '总单ID', tableStatus: 0},
        {type: 0, prop: 'susetdtlid', label: '细单ID', tableStatus: 0},
        {type: 0, prop: 'estimateid', label: '暂估ID', tableStatus: 0},
        {type: 0, prop: 'sourcetypename', label: '源单类型', tableStatus: 0},
        {type: 0, prop: 'sourceid', label: '源单ID', tableStatus: 0},
        {type: 0, prop: 'inbatchid', label: '内部批次ID', tableStatus: 0},
        {type: 0, prop: 'outbatchid', label: '外部批次ID', tableStatus: 0}
      ],
      dtlTableData: [],
      dtlTableHeight: 400,
      dtlWidthStatus: false,
      dtlDivVisible: false,
      dtlVisible: true,
      dtlWidth: "60%",
      dtlLoading: false,
      updateDivVisible: false,
      updateVisible: true,
      updateWidth: "60%",
      updateFormData: {
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null,
        taxrate: null,
        type: null,
        taxmoney: null,
        notaxmoney: null,
        inbatchid: null,
        outbatchid: null
      },
      upateLoading: false,
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      companyVisible: false,
      companyHov: {
        hovTitle: '公司查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'companyVisible',
        hovColumns:
          [
            {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
            {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 280);
    selectOption(this.formList, 'checker', selectHsy());
    selectOption(this.formList, 'paymode', selectFkfs(true));
    selectOption(this.formList, 'inputman', selectEmployees());
    selectOption(this.formList, 'doctypeid', selectDoctypesIn(false, [4, 5, 6]));
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        let columns = [];
        this.tableColumns.map((e, index) => {
          if (index !== 0) {
            columns.push(e);
          }
        });
        this.exportExcelDOM(columns, this.tableData, '进货结算查询' + this.getNewDate())
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
        if (e !== "startdate" || e !== "endofdate") {
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
      if (Object.keys(params).length === 0) {
        alert("请输入查询条件");
        return false;
      }
      this.tableData = [];
      this.loading = true;
      this.$api.ap.selectJhjscx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content;
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.total = res.data.totalSize;
          this.$api.ap.selectJhjscxJe(params).then(res => {
            if (res.code === 200) {
              this.hjje = res.data.total;
              this.loading = false;
            }
          }).catch(error => {
            this.loading = false;
            return false;
          })
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(data) {
      if (data.id === "selectDtl") {
        this.dtlDivVisible = true;
        this.dtlLoading = true;
        this.dtlTableData = [];
        this.$api.ap.selectJhjscxDtl({susetdocid: data.row.susetdocid}).then(res => {
          if (res.code === 200) {
            this.dtlTableData = res.data;
            this.dtlLoading = false;
          }
        }).catch(error => {
          this.dtlLoading = false;
          return false;
        })
      } else if (data.id === "chongDiao") {
        let inputmanid = Number(sessionStorage['userid']);
        if (confirm("你真的确定要进行冲调吗?") === true) {
          this.VLoading = true;
          this.$api.ap.updateChongDiao({susetdocid: data.row.susetdocid, inputmanid: inputmanid}).then(res => {
            if (res.code === 200) {
              if (res.data === "1") {
                alert("冲调成功");
                this.VLoading = false;
              } else {
                this.VLoading = false;
                return false;
              }
            }
          }).catch(error => {
            this.VLoading = false;
            return false;
          })
        } else {
          return false;
        }
      } else if (data.id === "comfirmThis") {
        let inputmanid = Number(sessionStorage['userid']);
        if (confirm("你真的确定要进行确认吗?") === true) {
          this.VLoading = true;
          this.$api.ap.updateConfirm({susetdocid: data.row.susetdocid, inputmanid: inputmanid}).then(res => {
            if (res.code === 200) {
              if (res.data === "1") {
                alert("确认成功");
                this.VLoading = false;
              } else {
                this.VLoading = false;
                return false;
              }
            }
          }).catch(error => {
            this.VLoading = false;
            return false;
          })
        } else {
          return false;
        }
      } else if (data.id === "nullify") {
        let inputmanid = Number(sessionStorage['userid']);
        if (confirm("你真的确定要进行作废吗?") === true) {
          this.VLoading = true;
          this.$api.ap.updateConfirm({susetdocid: data.row.susetdocid, inputmanid: inputmanid}).then(res => {
            if (res.code === 200) {
              if (res.data === "1") {
                alert("作废成功");
                this.VLoading = false;
              } else {
                this.VLoading = false;
                return false;
              }
            }
          }).catch(error => {
            this.VLoading = false;
            return false;
          })
        } else {
          return false;
        }
      } else if (data.id === "taxAdjustment") {
        this.updateDivVisible = true;
        /* Object.keys(this.updateFormData).forEach(item => {
           this.updateFormData[item] = data.row[item];
         });*/
      }
    },
    insertSltzDialog() {
      let params = {};
      Object.keys(this.updateFormData).forEach(item => {
        params[item] = this.updateFormData[item];
      });
      this.$refs.updateJhjscx.validate((valid) => {
        if (valid) {
          this.upateLoading = true;
          this.$api.ap.updateSltz(params).then(res => {
            if (res.code === 200) {
              if (res.data === "1") {
                alert("税额调整成功");
                this.upateLoading = false;
              } else {
                this.upateLoading = false;
                return false;
              }
            }
          }).catch(error => {
            this.upateLoading = false;
            return false;
          })
        } else {
          return false;
        }
      })
    },
    selectionChange(val) {
      this.gdje = 0;
      val.forEach(e => {
        this.gdje = this.gdje + e.total;
      });
      this.gdje = this.gdje.toFixed(2);
    },
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "companyid") {
        this.companyVisible = true;
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    },
    dtlCloseDialog() {
      this.dtlTableData = [];
      this.dtlDivVisible = false;
    },
    updateCloseDialog() {
      Object.keys(this.updateFormData).forEach(item => {
        this.updateFormData[item] = null;
      });
      this.updateDivVisible = false;
    }
  }
}
