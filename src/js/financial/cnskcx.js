import Cnskcxdtl from "../../views/Function/Financial/Cnskcxdtl"

export default {
  name: 'Cnskcx',
  components: {Cnskcxdtl},
  data() {
    return {
      //查询条件
      formlabelWidth: "90px",
      formList: [
        {id1: "startdate", id2: 'endofdate', label: "日期", type: "daterange"},
        {id1: "startconfirmdate", id2: 'endofconfirmdate', label: "确认日期", type: "daterange"},
        {
          id: "finishflag",
          label: "完成标志",
          type: "select",
          options: [{value: 0, label: "未完成"}, {value: 1, label: "完成"}, {value: 2, label: "作废"}]
        },
        {type: "inputHov", id: "customid", label: "客户ID", disabled: true},
        {type: "input", id: "customname", label: "客户名称", disabled: true},
        {
          type: "inputPrice",
          id: "total",
          minid: "Lesstotal",
          minPlaceholder: "金额下限",
          maxid: "greatertotal",
          maxPlaceholder: "金额上限",
          label: "金额",
          width: 200
        },
        {type: "inputHov", id: "confirmmanid", label: "确认人ID", disabled: true},
        {type: "input", id: "confirmman", label: "确认人名称", disabled: true},
        {type: "inputHov", id: "recmanid", label: "收款人ID", disabled: true},
        {type: "input", id: "recmanname", label: "收款人名称", disabled: true}
      ],
      btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "financial:cnskcx:select"
        },
        {id: "reset", icon: "fa fa-cog", label: "action.reset", perms: "financial:cnskcx:select"}
      ],
      formData: {
        startdate: null,
        endofdate: null,
        startconfirmdate: null,
        endofconfirmdate: null,
        finishflag: null,
        customid: null,
        customname: null,
        Lesstotal: null,
        greatertotal: null,
        confirmmanid: null,
        confirmman: null,
        recmanid: null,
        recmanname: null
      },
      collapseStatus: true,
      //查询条件hov
      queryCustomVisible: false,
      customHov: {
        hovTitle: "客户查询",
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryCustomVisible',
        hovColumns:
          [
            {id: "customid", name: "客户ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "客户名称", queryStatus: true, dataStatus: 1, fillid: "customname"},
            {id: "customopcode", name: "客户操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      queryConfirmVisible: false,
      confirmHov: {
        hovTitle: "确认人查询",
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryConfirmVisible',
        hovColumns:
          [
            {id: "employeeid", name: "确认人ID", value: null, queryStatus: true, dataStatus: 2, fillid: "confirmmanid"},
            {id: "employeename", name: "确认人名称", value: null, queryStatus: true, dataStatus: 1, fillid: "confirmman"},
            {id: "employeeopcode", name: "确认人操作码", value: null, queryStatus: true, dataStatus: 1}
          ]
      },
      queryRecmanVisible: false,
      recmanHov: {
        hovTitle: "收款人查询",
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryRecmanVisible',
        hovColumns:
          [
            {id: "employeeid", name: "收款人ID", value: null, queryStatus: true, dataStatus: 2, fillid: "recmanid"},
            {id: "employeename", name: "收款人名称", value: null, queryStatus: true, dataStatus: 1, fillid: "recmanname"},
            {id: "employeeopcode", name: "收款人操作码", value: null, queryStatus: true, dataStatus: 1}
          ]
      },
      //总单数据
      docTableHeight: 280,
      docTableColumns: [
        {prop: "rprecid", label: "出纳收款单ID", type: 0, tableStatus: 0, width: 100},
        {prop: "credate", label: "日期", type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: "customid", label: "公司ID", type: 0, tableStatus: 0},
        {
          prop: "companyname", label: "公司名称", type: 0, tableStatus: 0,
          width: 120
        },
        {prop: "total", label: "金额", type: 0, tableStatus: 0},
        {prop: "rectypename", label: "收款类型", type: 0, tableStatus: 0},
        {prop: "finishflagname", label: "完成标志", type: 0, tableStatus: 0},
        {prop: "recmanid", label: "收款人ID", type: 0, tableStatus: 0},
        {prop: "recmanname", label: "收款人姓名", type: 0, tableStatus: 0, width: 100},
        {prop: "confirmmanid", label: "确认人ID", type: 0, tableStatus: 0},
        {
          prop: "confirmmanname", label: "确认人姓名", type: 0, tableStatus: 0,
          width: 100
        },
        {
          prop: "confirmdate", label: "确认日期", type: 2, tableStatus: 0,
          width: 120, widthStatus: true
        },
        {
          prop: "btn",
          fixed: "right", label: "操作", type: 1, tableStatus: 0, width: 260, widthStatus: true, options:
            [
              {
                id: "dtl",
                icon: "fa fa-edit", label: "action.dtl", perms: "financial:cnskcx:dtl"
              },
              {
                id: "comfirm",
                icon: "fa fa-check", label: "action.comfirm", perms: "financial:cnskcx:confirm"
              },
              {
                id: "delete",
                icon: "fa fa-trash", label: "action.nullify", perms: "financial:cnskcx:invalid"
              }
            ]
        }
      ],
      docTableData: [],
      docLoading: false,
      //细单
      dtlVisiable: false,
      dtlTitle: "查询细单",
      dtlDialogWidth: "1000px",
      dtlDialogTop: "12vh",
      dtlpageStatus: false,
      dtlTableHeight: 310,
      dtlOptions: [],
      dltrprecid: null,
      dtltotal: null,
      dtlPerms: "financial:cnskcx:updatearrprecdtl",
      dtlLoading: false,
      dtlTableData: [],
      dtlifsVisiable: false,
      dtlDisabled: false,
      //cbs
      cbsifsVisiable: false,
      cbsVisiable: false,
      cbsTitle: "查询银行",
      cbsDialogWidth: "1000px",
      cbsDialogTop: "12vh",
      cbspageStatus: false,
      cbsTableHeight: 400,
      cbsTableColumns: [
        {indexType: "selection", "fixed": "left", tableStatus: 0},
        {prop: "transdate", label: "交易日期", type: 2, width: 150, widthStatus: true, tableStatus: 0},
        {prop: "cbsname", label: "cbs客户名称", type: 0, tableStatus: 0, width: 150},
        {prop: "customid", label: "客户ID", type: 0, tableStatus: 0},
        {prop: "customname", label: "客户名称", type: 0, tableStatus: 0, width: 150},
        {prop: "sumtotal", label: "金额", type: 0, tableStatus: 0, width: 150},
        {prop: "total", label: "已收金额", type: 0, tableStatus: 0},
        {prop: "thistotal", label: "本次金额", type: 3, tableStatus: 0, width: 150, widthStatus: true},
        {prop: "accno", label: "帐号", type: 0, tableStatus: 0, width: 150},
        {prop: "bankname", label: "银行", type: 0, tableStatus: 0, width: 150},
        {prop: "usestatusname", label: "状态", type: 0, tableStatus: 0},
        {prop: "banksn", label: "银行流水号", type: 0, tableStatus: 0, width: 100},
        {prop: "credate", label: "下载日期", type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: "transid", label: "交易ID", type: 0, tableStatus: 0}
      ],
      cbsTableData: [],
      cbsformList: [
        {type: "daterange", id1: "startdate", id2: 'endofdate', label: "日期", width: 200},
        {type: "inputHov", id: "customid", label: "客户ID", disabled: true},
        {type: "input", id: "customname", label: "客户名称", disabled: true}
      ],
      cbsformData: {
        startdate: null,
        endofdate: null,
        customid: null,
        customname: null
      },
      cbsformlabelWidth: "80px",
      cbsbtnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "financial:xssk:select"
        }
      ],
      cbsSumTotal: 0,
      cbscustomid: null,
      cbscompanyname: null,
      cbstotalLine: null,
      cbsrecaccno: null,
      cbsrprecid: null,
      bankArray: [],
      cbsPerms: "financial:cnskcx:updateusestatus",
      cbsLoading: false,
      cbsCustomVisible: false,
      cbsCustomHov: {
        hovTitle: "客户查询",
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "cbsformData",
        parentVisible: 'cbsCustomVisible',
        hovColumns:
          [
            {id: "customid", name: "客户ID", value: null, queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "客户名称", value: null, queryStatus: true, dataStatus: 1, fillid: "customname"},
            {id: "customopcode", name: "客户操作码", value: null, queryStatus: true, dataStatus: 1}
          ]
      },
      checkboxT: function (row) {
        return row.thistotal !== 0;
      }
    }
  },
  created() {
    let params = [];
    this.$api.hov.query('bankidhov/select', {pageNum: 1, pageSize: 10000, params: null, zxcolumn2: 1}).then(res => {
      if (res.code === 200) {
        res.data.content.forEach(es => {
          params.push({value: es.bankname, label: es.bankname});
        });
        this.dtlOptions = params;
      }
    });
    this.docTableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
    this.formData.startconfirmdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofconfirmdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    cbsHov() {//cbs客户hov
      this.cbsCustomVisible = true;
    },
    cbsQueryFunction() {//cbs查询
      let params = {};
      if ((this.cbsformData.startdate === "" || this.cbsformData.startdate === null) && (this.cbsformData.endofdate === "" || this.cbsformData.endofdate === null)) {
        alert("请输入查询日期");
        return false;
      }
      params.startdate = this.cbsformData.startdate;
      params.endofdate = this.cbsformData.endofdate;
      params.customid = this.cbsformData.customid;
      this.cbsLoading = true;
      this.$api.financial.selectCnskcxcbs(params).then(res => {
        //this.$api.cnskcx.selectcbs(this.cbsformData.customid).then(res => {
        if (res.code === 200) {
          let data = [];
          res.data.forEach(e => {
            let datadtl = {};
            Object.keys(e).forEach(es => {
              datadtl[es] = e[es];
            });
            if (e.total === '') {
              datadtl.total = 0;
            } else {
              datadtl.total = e.total;
            }
            if (e.total === '') {
              datadtl.thistotal = e.sumtotal;
            } else {
              datadtl.thistotal = e.thistotal;
            }
            data.push(datadtl);
          });
          this.cbsTableData = data;
          this.cbsLoading = false;
        }
      }).catch(error => {
        this.cbsLoading = false;
        return false;
      })
    },
    handleDoc(data) {
      if (data.id === 'dtl') {//查询细单
        this.dtlifsVisiable = true;
        this.dtlLoading = true;
        this.dltrprecid = data.row.rprecid;
        this.dtltotal = data.row.total;
        this.dtlTableData = [];
        this.dtlDisabled = data.row.finishflagname !== "未完成";
        this.$api.financial.selectCnskcxdtl(data.row.rprecid).then(res => {
          if (res.code === 200) {
            this.dtlTableData = res.data;
            this.dtlLoading = false;
            this.dtlVisiable = true;
          }
        }).catch(error => {
          this.dtlLoading = false;
        })
      } else if (data.id === 'comfirm') {//确认方法
        if (data.row.finishflagname !== "未完成") {
          alert("只有未完成状态表单可以确认");
          return false;
        }
        let con = confirm("是否确认");
        if (con === true) {
          this.$api.financial.comfirmCnskcxDoc({
            rprecid: data.row.rprecid,
            confirmmanid: Number(sessionStorage.getItem('userid'))
          }).then(res => {
            if (res.code === 200) {
              if (res.msg === "1") {
                alert("保存成功");
                this.queryFunction('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          })
        } else {
          return false;
        }
      } else if (data.id === 'delete') {//作废方法
        if (data.row.finishflagname !== "未完成") {
          alert("只有未完成状态表单可以作废");
          return false;
        }
        let con = confirm("是否作废");
        if (con === true) {
          this.$api.financial.deleteCnskcxDoc({
            rprecid: data.row.rprecid,
            confirmmanid: Number(sessionStorage.getItem('userid'))
          }).then(res => {
            if (res.code === 200) {
              if (res.msg === "1") {
                alert("作废成功");
                this.queryFunction('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          })
        } else {
          return false;
        }
      }
    },
    handleDtl(data) {
      this.cbsifsVisiable = true;
      this.cbscustomid = data.row.customid;
      this.cbscompanyname = data.row.customname;
      this.cbstotalLine = data.row.total_line;
      this.cbsrecaccno = data.row.recaccno;
      this.cbsrprecid = data.row.rprecid;
      this.cbsformData.startdate = new Date(this.getNewDate() + ' 00:00:00');
      this.cbsformData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
      this.cbsformData.customid = data.row.customid;
      this.cbsformData.customname = data.row.customname;
      this.cbsVisiable = true;
    },
    //doctable分页跳转
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      this.docLoading = true;
      const formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== "startconfirmdate" && e !== "endofdate" && e !== "endofconfirmdate") {
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
      if (formData.startconfirmdate !== null && formData.startconfirmdate !== "") {
        params.startconfirmdate = formData.startconfirmdate;
      }
      if (formData.endofconfirmdate !== null && formData.endofconfirmdate !== "") {
        params.endofconfirmdate = formData.endofconfirmdate;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.docTableData = [];
      this.$api.financial.selectCnskcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.currentPage = res.data.pageNum;
          this.$refs.doctable.total = res.data.totalSize;
          this.docLoading = false;
        }
      }).catch(error => {
        this.docLoading = false;
      })
    },
    queryFunction(data) {
      if (data === "query") {//主表格查询
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        let formData = this.$refs.query.formData;//查询条件
        Object.keys(formData).forEach(e => {
          formData[e] = null;
        })
      }
    },
    queryHov(data) {
      if (data === 'customid') {//条件客户hov
        this.queryCustomVisible = true;
      } else if (data === 'confirmmanid') {//条件
        this.queryConfirmVisible = true;
      } else if (data === 'recmanid') {//条件
        this.queryRecmanVisible = true;
      }
    },
    //cbs勾选
    SelectionChange(data) {
      this.bankArray = [];//cbs勾选合集
      this.cbsSumTotal = 0;//本次勾兑金额合计
      data.forEach(e => {
        this.cbsSumTotal = Number(this.cbsSumTotal) + Number(e.thistotal);
        this.bankArray.push(e);
      })
    },
    elInput() {
      this.cbsSumTotal = 0;//本次勾兑金额合计
      this.bankArray.forEach(e => {
        this.cbsSumTotal = Number(this.cbsSumTotal) + Number(e.thistotal);
      })
    },
    //保存细单
    updatedtl() {
      let flagtotal = 0;
      this.dtlTableData.forEach(e => {
        flagtotal = Number(flagtotal) + Number(e.total_line);
      });
      if (flagtotal === this.dtltotal) {
        var params = {};
        params.rprecid = this.dltrprecid;
        params.arrprecdtllist = [];
        this.dtlTableData.forEach(e => {
          if (e.total_line !== 0 && e.total_line.length !== 0) {
            let arrprecdtllist = {};
            Object.keys(e).forEach(es => {
              arrprecdtllist[es] = e[es];
            });
            params.arrprecdtllist.push(arrprecdtllist);
          }
        });
        this.$api.financial.updateCnskcxDtl(params).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.dtlClose();
          }
        })
      } else {
        alert("细单金额之和不等于总单金额，不能保存!");
        return false;
      }
    },
    //保存银行
    updateCbsBank() {
      if (this.cbstotalLine !== this.cbsSumTotal) {
        alert("明细与细单金额不一致");
        return;
      }
      var params = {};
      params.arbankreclist = [];
      params.arbankrecdtllist = [];
      var message = {};
      this.bankArray.forEach(e => {
        if (e.accno !== this.cbsrecaccno) {
          message.flag = false;
          message.msg = '明细银行与细单银行不一致';
          return;
        }
        let totals = Number(e.sumtotal) - Number(e.total);
        if (e.thistotal > totals) {
          message.flag = false;
          message.msg = '本次金额不能大于金额减去已收金额！！！';
          return;
        }
        if (e.thistotal <= 0) {
          message.flag = false;
          message.msg = '本次金额不能小于等于0！！！';
          return;
        }
        let arbankreclist = {};
        arbankreclist.rprecid = this.cbsrprecid;
        arbankreclist.dtlid = e.dtlid;
        arbankreclist.total = e.thistotal;
        arbankreclist.inputmanid = sessionStorage.getItem("userid");
        arbankreclist.inputmanname = sessionStorage.getItem("username");
        params.arbankreclist.push(arbankreclist);
        let arbankrecdtllist = {};
        arbankrecdtllist.transid = e.transid;
        let thisTotals = Number(e.thisTotal) + Number(e.total);
        if (thisTotals === e.sumtotal) {
          arbankrecdtllist.usestatus = 2;
        } else {
          arbankrecdtllist.usestatus = 1;
        }
        arbankrecdtllist.rprecid = this.cbsrprecid;
        params.arbankrecdtllist.push(arbankrecdtllist);

      });
      if (Object.keys(message).length > 0 && message.flag === false) {
        alert(message.msg);
        return;
      }
      this.$api.financial.updateCnskcxcbs(params).then(res => {
        if (res.code === 200) {
          alert("保存成功");
          this.cbsQueryFunction();
        }
      })
    },
    //关闭cbs
    cbsClose() {
      this.bankArray = [];
      this.cbsTableData = [];
      this.cbsVisiable = false;
      this.cbsifsVisiable = false;
    },
    //关闭细单
    dtlClose() {
      this.dtlTableData = [];
      this.dtlVisiable = false;
      this.dtlifsVisiable = false;
    }
  }
}
