import {
  paramsFormat
} from "@/utils/functions";

export default {
  data() {
    return {
      cgqd_form_rules: {
        not_empty: {
          required: true,
          message: "不能为空"
        },
        prioritiesno: {
          required: true,
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error("不能为空"));
            } else if (value === "0") {
              callback(new Error("不能为0"));
            } else {
              callback();
            }
          }
        }
      },

      cgqd_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "quality:cgqd:select"
        },
        {
          id: "add",
          icon: "fa fa-edit",
          label: "action.add",
          perms: "quality:cgqd:insert"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: "quality:cgqd:select"
        }
      ],
      cgqd_formList: [
        {
          type: "inputHov",
          label: "供应商ID",
          id: "supplyid",
          dataType: "number"
        },
        {
          type: "inputHov",
          label: "货品ID",
          id: "goodsid",
          dataType: "number"
        },
        {
          type: "select",
          label: "单据状态",
          id: "usestatus",
          options: [
            {label: "", value: null},
            {label: "停用", value: 0},
            {label: "正式", value: 1},
            {label: "临时", value: 2},
            {label: "终止", value: 3}
          ]
        },
        {
          type: "inputHov",
          label: "采购部门ID",
          id: "pcdtpeid",
          dataType: "number"
        },
        {
          type: "input",
          label: "批准文号",
          id: "gbcode"
        },
        {
          type: "select",
          label: "排序",
          id: "orderby",
          options: [
            {label: "", value: null},
            {label: "采购部门ID", value: "pcdtpeid"}
          ]
        }
      ],
      cgqd_formData: {
        goodsid: null,
        supplyid: null,
        usestatus: null,
        pcdtpeid: null,
        orderby: null
      },

      cgqd_tableColumns: [
        {label: "渠道ID", prop: "channelid", type: 0, tableStatus: 0},
        {label: "创建日期", prop: "credate", type: 2, tableStatus: 0},

        {label: "部门ID", prop: "pcdtpeid", type: 0, tableStatus: 0},
        {label: "采购部门", prop: "pcdtpename", type: 0, tableStatus: 0},

        {
          label: "物流收货单位",
          prop: "lmcompanyname",
          type: 0,
          tableStatus: 0
        },
        {label: "状态", prop: "usestatusname", type: 0, tableStatus: 0},

        {label: "供应商ID", prop: "supplyid", type: 0, tableStatus: 0},
        {label: "供应商名称", prop: "supplyname", type: 0, tableStatus: 0},

        {label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0},
        {label: "品名", prop: "goodsname", type: 0, tableStatus: 0},

        {label: "规格", prop: "goodstype", type: 0, tableStatus: 0},
        {label: "产地", prop: "prodarea", type: 0, tableStatus: 0},

        {label: "单位", prop: "goodsunit", type: 0, tableStatus: 0},
        {label: "付款方式", prop: "paymodename", type: 0, tableStatus: 0},

        {label: "进价", prop: "suprice", type: 0, tableStatus: 0},
        {label: "进货优先级", prop: "prioritiesno", type: 0, tableStatus: 0},

        {label: "公司ID", prop: "companyid", type: 0, tableStatus: 0},
        {label: "公司名称", prop: "companyname", type: 0, tableStatus: 0},

        {label: "采购员ID", prop: "buyerid", type: 0, tableStatus: 0},
        {label: "采购员", prop: "buyer", type: 0, tableStatus: 0},

        {label: "录入人", prop: "inputmanname", type: 0, tableStatus: 0},
        {label: "经销方式", prop: "salesmode", type: 0, tableStatus: 0},

        {label: "账期", prop: "payterm", type: 0, tableStatus: 0},
        {label: "折现价格", prop: "discprice", type: 0, tableStatus: 0},

        {
          label: "最大出厂天数",
          prop: "largfactdays",
          type: 0,
          tableStatus: 0
        },
        {label: "采购周期", prop: "pccycle", type: 0, tableStatus: 0},

        {label: "到货周期", prop: "sucycle", type: 0, tableStatus: 0},
        {label: "财务退货方式", prop: "backmode", type: 0, tableStatus: 0},

        {
          prop: "caozuo",
          label: "操作",
          type: 1,
          fixed: "right",
          width: 90,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: "edit",
              icon: "fa fa-edit",
              label: "action.edit",
              perms: "quality:cgqd:update"
            }
          ]
        }
      ],
      cgqd_tableData: [],
      cgqd_loading: false,

      //   el-dialog 数据
      cgqd_dialogVisible: false,
      cgqd_dialogTitle: "",
      cgqd_dtlstatus: false, // false 新增  true 修改

      cgqd_dialogWidth: "700px",
      cgqd_inline: true,
      cgqd_dialogLabelWidth: "120px",

      cgqd_base: {
        channelid: null, // 渠道ID

        companyid: null,
        companyname: null,
        supplyid: null,
        supplyname: null,

        lmcompanyid: null, // 物流收货单位ID

        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null,

        buyerid: null, // 采购员ID
        buyer: null, // 采购员

        pcdtpeid: null, // 采购部门ID
        pcdtpename: null, // 采购部门

        backmode: null, // 财务退货方式
        salesmode: null, // 经销方式

        paymode: null, // 付款方式
        payterm: null, // 帐期

        suprice: null, // 采购价格
        discprice: null, // 折现价格

        largfactdays: null, // 最大出厂天数
        pccycle: null, // 采购周期

        sucycle: null, // 到货周期
        prioritiesno: null, // 进货优先级

        usestatus: null //状态
      },

      cgqd_selectData: {paymode: [], lmcompanyid: []},

      // hov
      cgqd_companyVisible: false,
      cgqd_companyHov: {
        hovTitle: "供应商查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "cgqd_formData",
        parentVisible: "cgqd_companyVisible",
        hovColumns: [
          {
            id: "companyid",
            name: "供应商ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "supplyid"
          },
          {
            id: "companyname",
            name: "供应商名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "supplyname"
          },
          {
            id: "companyopcode",
            name: "供应商操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },

      cgqd_goodsVisible: false,
      cgqd_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "cgqd_formData",
        parentVisible: "cgqd_goodsVisible",
        hovColumns: [
          {
            id: "goodsid",
            name: "货品ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "goodsid"
          },
          {
            id: "goodsname",
            name: "货品名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "goodsname"
          },
          {
            id: "goodstype",
            name: "规格",
            queryStatus: false,
            dataStatus: 1,
            fillid: "goodstype"
          },
          {
            id: "goodsunit",
            name: "单位",
            queryStatus: false,
            dataStatus: 1,
            fillid: "goodsunit"
          },
          {
            id: "prodarea",
            name: "产地",
            queryStatus: false,
            dataStatus: 1,
            fillid: "prodarea"
          },
          {
            id: "usestatusname",
            name: "状态",
            queryStatus: false,
            dataStatus: 1,
            fillid: "usestatusname"
          }
          // { id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1 }
        ]
      },

      // 采购员Hov
      cgqd_e_buyeridVisible: false,
      cgqd_e_buyeridHov: {
        hovTitle: "采购员查询",
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "cgqd_formData",
        parentVisible: "cgqd_e_buyeridVisible",
        hovColumns: [
          {
            id: "employeeid",
            name: "采购员ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "buyerid"
          },
          {
            id: "employeename",
            name: "采购员名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "buyer"
          },
          {
            id: "employeeopcode",
            name: "采购员操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },

      // 部门Hov
      cgqd_e_deptidVisible: false,
      cgqd_e_deptidHov: {
        hovTitle: "采购部门查询",
        hovUrl: "cgqd/selectCgbm",
        afterStatus: false,
        fillDataName: "cgqd_formData",
        parentVisible: "cgqd_e_deptidVisible",
        hovColumns: [
          {
            id: "companyopcode",
            name: "操作码",
            queryStatus: true,
            dataStatus: 1
          },
          {
            id: "companyid",
            name: "采购部门ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "pcdtpeid"
          },
          {
            id: "companyname",
            name: "采购部门",
            queryStatus: true,
            dataStatus: 1,
            fillid: "pcdtpename"
          }
        ]
      },
      // 部门Hov  新增时使用
      cgqd_e_deptidVisible_2: false,
      cgqd_e_deptidHov_2: {
        hovTitle: "采购部门查询",
        hovUrl: "cgqd/selectInsertCgbm",
        afterStatus: false,
        fillDataName: "cgqd_base",
        parentVisible: "cgqd_e_deptidVisible_2",
        hovColumns: [
          {
            id: "companyopcode",
            name: "操作码",
            queryStatus: true,
            dataStatus: 1
          },
          {
            id: "companyid",
            name: "采购部门ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "pcdtpeid"
          },
          {
            id: "companyname",
            name: "采购部门",
            queryStatus: true,
            dataStatus: 1,
            fillid: "pcdtpename"
          }
        ]
      }
    };
  },
  created() {
    this.selectPaymode();
    this.selectStCompanyid();
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "add") {
        this.beforeInsert();
      } else if (data === "download") {
        this.exportExcelDOM(
          this.cgqd_tableColumns,
          this.cgqd_tableData,
          "外省采购渠道维护" + this.getNewDate()
        );
      }
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = paramsFormat(this.cgqd_formData);
      if (params == null) params = {};
      params.inputmanid = sessionStorage.getItem("userid");
      params.companyid = sessionStorage.getItem("companyid");
      console.log("查询 p", params);
      this.cgqd_loading = true;
      this.$api.quality
        .selectCgqd({pageNum, pageSize, params})
        .then(res => {
          if (res.code === 200) {
            this.cgqd_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.cgqd_loading = false;
          }
        })
        .catch(error => {
          this.cgqd_loading = false;
          return false;
        });
    },

    // 查询 付款方式 下拉菜单
    selectPaymode() {
      this.$api.quality.selectCgqdPaymode().then(res => {
        console.log(" select paymode ", res.data);
        let list = [];
        res.data.forEach(item => {
          list.push({label: item.ddlname, value: item.ddlid});
        });
        this.cgqd_selectData.paymode = list;
      }).catch(() => {
        return false;
      });
    },

    // 查询物流收货单位
    selectStCompanyid() {
      this.$api.quality
        .selectCgqdStCompanyid({
          companyid: sessionStorage.getItem("companyid")
        }).then(res => {
        let list = [];
        console.log(" select stcompanyid ", res.data);
        res.data.forEach(item => {
          list.push({label: item.companyname, value: item.stcompanyid});
        });
        this.cgqd_selectData.lmcompanyid = list;
      }).catch(e => {
        return false;
      });
      //console.log("所有 付款方式", this.cgqd_selectData.paymode);
    },

    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    handleFunction(data) {
      if (data.id === "edit") {
        this.beforeUpdate(data);
      } else if (data.id === "updateStatus") {
        //console.log("updateStatus");
        this.updateUsestatus(data.row);
      }
    },
    openHov(data) {
      // console.log("hov id ", data);

      this.cgqd_goodsHov.fillDataName = "cgqd_formData";
      this.cgqd_companyHov.fillDataName = "cgqd_formData";
      this.cgqd_e_buyeridHov.fillDataName = "cgqd_formData";
      this.cgqd_e_deptidHov.fillDataName = "cgqd_formData";
      if (data === "goodsid") {
        this.cgqd_goodsVisible = true;
      } else if (data === "supplyid") {
        this.cgqd_companyVisible = true;
      } else if (data === "buyerid") {
        this.cgqd_e_buyeridVisible = true;
      } else if (data === "pcdtpeid") {
        this.cgqd_e_deptidVisible = true;
      }
    },

    openDailogHov(data) {
      this.cgqd_goodsHov.fillDataName = "cgqd_base";
      this.cgqd_companyHov.fillDataName = "cgqd_base";
      this.cgqd_e_buyeridHov.fillDataName = "cgqd_base";
      this.cgqd_e_deptidHov.fillDataName = "cgqd_base";
      if (data === "goodsid") {
        this.cgqd_goodsVisible = true;
      } else if (data === "supplyid") {
        this.cgqd_companyVisible = true;
      } else if (data === "buyerid") {
        this.cgqd_e_buyeridVisible = true;
      } else if (data === "pcdtpeid_2") {
        this.cgqd_e_deptidVisible_2 = true;
      }
    },

    closeDialog() {
      this.cgqd_dialogVisible = false;
    },
    openDialog() {
      this.cgqd_dialogVisible = true;
    },
    beforeInsert() {
      this.cgqd_dialogTitle = "新增";
      this.cgqd_dtlstatus = false;
      Object.keys(this.cgqd_base).forEach(e => {
        this.cgqd_base[e] = null;
      });

      this.cgqd_base.companyid = sessionStorage.getItem("companyid");
      this.cgqd_base.companyname = sessionStorage.getItem("companyname");

      this.cgqd_base.paymode = 1;
      this.setSalesmode();

      this.openDialog();
    },

    beforeUpdate(data) {
      this.cgqd_dialogTitle = "修改";
      this.cgqd_dtlstatus = true;
      Object.keys(this.cgqd_base).forEach(e => {
        this.cgqd_base[e] = data.row[e];
      });

      this.setSalesmode();

      this.cgqd_base.usestatus = this.cgqd_base.usestatus + "";

      this.openDialog();
    },

    save() {
      this.$refs.saveForm.validate(valid => {
        if (valid) {
          if (this.cgqd_dtlstatus === false) {
            this.insert();
          } else {
            this.update();
          }
        }
      });
    },
    // 新增
    insert() {
      let params = {
        inputmanid: sessionStorage.getItem("userid"),

        companyid: this.cgqd_base.companyid,
        supplyid: this.cgqd_base.supplyid, // 供应商ID
        goodsid: this.cgqd_base.goodsid,

        lmcompanyid: this.cgqd_base.lmcompanyid, // 物流收货单位ID
        pcdtpeid: this.cgqd_base.pcdtpeid, // 采购部门ID
        buyerid: this.cgqd_base.buyerid, // 采购员ID
        buyer: this.cgqd_base.buyer, // 采购员

        salesmode: this.cgqd_base.salesmode,
        paymode: this.cgqd_base.paymode,
        backmode: this.cgqd_base.backmode,
        payterm: this.cgqd_base.payterm,
        suprice: this.cgqd_base.suprice,
        discprice: this.cgqd_base.discprice,

        largfactdays: this.cgqd_base.largfactdays,
        pccycle: this.cgqd_base.pccycle,
        sucycle: this.cgqd_base.sucycle,
        prioritiesno: this.cgqd_base.prioritiesno
      };

      console.log("采购渠道 insert p ", params);
      this.$api.quality.insertCgqd(params).then(res => {
        console.log("新增响应", res);
        if (res.code === 200) {
          alert("保存成功");
          this.afterSave();
        }
      }).catch(() => {
        return false;
      });
    },

    // 修改
    update() {
      let params = {
        prioritiesno: this.cgqd_base.prioritiesno,
        usestatus: this.cgqd_base.usestatus,

        pcdtpeid: this.cgqd_base.pcdtpeid,
        buyerid: this.cgqd_base.buyerid,
        buyer: this.cgqd_base.buyer,

        salesmode: this.cgqd_base.salesmode,
        paymode: this.cgqd_base.paymode,
        payterm: this.cgqd_base.payterm,

        suprice: this.cgqd_base.suprice,
        discprice: this.cgqd_base.discprice,

        pccycle: this.cgqd_base.pccycle,
        sucycle: this.cgqd_base.sucycle,

        channelid: this.cgqd_base.channelid
      };
      this.$api.quality
        .updateCgqd(params)
        .then(res => {
          if (res.code === 200) {
            alert("修改成功");
            this.afterSave();
          }
        })
        .catch(() => {
          return false;
        });
    },

    toDate(dateStr) {
      if (dateStr != null) {
        return new Date(dateStr);
      }
      return null;
    },

    setSalesmode() {
      let paymode = this.cgqd_base.paymode;
      if (paymode === 4 || paymode === 11) {
        this.cgqd_base.salesmode = "代销";
      } else {
        this.cgqd_base.salesmode = "经销";
      }
    },

    setTableHeight() {
      // 设置表格高度
      let height = window.innerHeight - 240;
      return height;
    },

    afterSave() {
      // 新增 修改 成功  关闭弹窗 再查询
      this.closeDialog();
      let pageSize = this.$refs.doctable.pageSize;
      this.selectDoc(1, pageSize);
    }
  }
};
