import {
  paramsFormat,
  formDataReset,
  dateFormat
} from "@/utils/functions";

export default {
  data() {
    return {
      bhgptz_formList: [
        {
          type: "daterange",
          id1: "start_date",
          id2: "end_date",
          label: "日期"
        }
        // {
        //   type: "inputHov",
        //   label: "货品ID",
        //   id: "goodsid",
        //   dataType: "number"
        // },
        // {
        //   type: "input",
        //   label: "业务单号",
        //   id: "businessbill_no"
        // }
      ],
      bhgptz_formData: {
        goodsid: "",
        start_date: "",
        end_date: "",
        businessbill_no: ""
      },
      bhgptz_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "kccx:select",
          perms: "bhgtz:select"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: "bhgtz:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "kccx:select"
          perms: "bhgtz:select"
        }
      ],

      bhgptz_tableColumns: [
        {
          prop: "Goods_No",
          label: "商品ID",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "Goods_Name",
          label: "品名",
          type: 0,
          width: 150,
          tableStatus: 0
        },

        {prop: "Drug_Spec", label: "规格", type: 0, tableStatus: 0},
        {prop: "Package_Unit", label: "包装", type: 0, tableStatus: 0},
        {prop: "Package_Qty", label: "包装数量", type: 0, tableStatus: 0},

        {prop: "Lot_No", label: "批号", type: 0, tableStatus: 0},

        {
          prop: "Invoice_Time",
          label: "开票日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Price",
          label: "单价",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "Amount",
          label: "金额",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "Quality_Time",
          label: "质检日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },

        {
          prop: "Quality_Inspector",
          label: "质检员",
          type: 0,
          width: 150,
          tableStatus: 0
        },

        {
          prop: "Receiving_Clerk",
          label: "收货员",
          type: 0,
          width: 150,
          tableStatus: 0
        },

        {
          prop: "Ssa_Name",
          label: "单位名称",
          type: 0,
          width: 150,
          tableStatus: 0
        },

        {
          prop: "Production_Date",
          label: "生产日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Valid_Until",
          label: "有效期",
          width: 150,
          type: 2,
          tableStatus: 0
        },

        {
          prop: "Manufacturer",
          label: "生产厂家",
          type: 0,
          width: 150,
          tableStatus: 0
        },

        {
          prop: "Rp_Reasons",
          label: "退货原因",
          type: 0,
          tableStatus: 0
        },

        {
          prop: "Handling_Suggestion",
          label: "处理意见",
          type: 0,
          tableStatus: 0
        },

        {
          prop: "Actual_Qty",
          label: "数量",
          type: 0,
          tableStatus: 0
        },

        {
          prop: "Actual_Pcs",
          label: "件数",
          type: 0,
          tableStatus: 0
        },

        {
          prop: "Actual_Sps",
          label: "零散数",
          type: 0,
          tableStatus: 0
        }
        // {
        //   prop: "Producing_Area",
        //   label: "产地",
        //   type: 0,
        //   tableStatus: 0
        // }

        // {
        //   prop: "caozuo",
        //   label: "操作",
        //   type: 1,
        //   fixed: "right",
        //   width: 90,
        //   widthStatus: true,
        //   tableStatus: 0,
        //   options: [
        //     {
        //       id: "upload",
        //       icon: "fa fa-edit",
        //       label: "同步",
        //       perms: ""
        //       //perms:"kccx:syc",
        //     }
        //   ]
        // }
      ],
      bhgptz_tableData: [],
      bhgptz_tableHeight: 350,
      bhgptz_loading: false,

      bhgptz_goodsVisible: false,
      bhgptz_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "bhgptz_formData",
        parentVisible: "bhgptz_goodsVisible",
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
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1}
        ]
      },

      bhgptz_companyVisible: false,
      bhgptz_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "bhgptz_formData",
        parentVisible: "bhgptz_companyVisible",
        hovColumns: [
          {
            id: "companyid",
            name: "单位ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "companyid"
          },
          {
            id: "companyname",
            name: "单位名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "companyname"
          },
          {
            id: "companyopcode",
            name: "单位操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },

      //   el-dialog 数据
      bhgptz_dialogVisible: false,
      bhgptz_dialogTitle: "",
      bhgptz_dtlstatus: false, // 新增 false 修改 true

      bhgptz_dialogWidth: "700px",
      bhgptz_inline: true,
      bhgptz_dialogLabelWidth: "120px",

      bhgptz_base: {}
    };
  },

  methods: {
    // data  bhgptz_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.bhgptz_formData);
      } else if (data === "download") {
        this.exportExcelDOM(
          this.bhgptz_tableColumns,
          this.bhgptz_tableData,
          "不合格品台账" + this.getNewDate()
        );
      }
    },

    handleFunction(data) {
    },

    openHov(data) {
      this.bhgptz_goodsHov.fillDataName = "bhgptz_formData";
      this.bhgptz_companyHov.fillDataName = "bhgptz_formData";
      if (data == "companyid") {
        this.bhgptz_companyVisible = true;
      } else if (data == "goodsid") {
        this.bhgptz_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.bhgptz_goodsHov.fillDataName = "bhgptz_base";
      this.bhgptz_companyHov.fillDataName = "bhgptz_base";
      if (data == "companyid") {
        this.bhgptz_companyVisible = true;
      } else if (data == "goodsid") {
        this.bhgptz_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let bhgptz_formData = this.bhgptz_formData;
      let params = paramsFormat(bhgptz_formData);

      if (!params) params = {};

      if (!params.goodsid) {
        params.goodsid = "";
      }
      if (!params.businessbill_no) {
        params.businessbill_no = "";
      }

      if (!params.start_date) {
        params.start_date = "";
      } else {
        params.start_date = this.handleDate(params.start_date);
      }
      if (!params.end_date) {
        params.end_date = "";
      } else {
        params.end_date = this.handleDate(params.end_date);
      }

      this.bhgptz_loading = true;
      this.bhgptz_tableData = [];
      this.$api.jzt
        .selectBhgptz(params)
        .then(res => {
          if (res.code === 200) {
            this.bhgptz_tableData = Object.freeze(res.data);
            // this.$refs.doctable.pageSize = res.data.pageSize;
            // this.$refs.doctable.currentPage = res.data.pageNum;
            // this.$refs.doctable.total = res.data.totalSize;
            this.bhgptz_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.bhgptz_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.bhgptz_dialogVisible = false;
    },
    openDialog() {
      this.bhgptz_dialogVisible = true;
    },

    setTableHeight() {
      // 设置表格高度
      this.bhgptz_tableHeight = window.innerHeight - 240;
      console.log(" 表格高度 ", this.bhgptz_tableHeight);
    },

    handleDate(date) {
      if (date) {
        return dateFormat("YYYY-mm-dd", date);
      }
    },
    initDate() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let dateStr = year + "-" + month + "-" + "01";
      this.bhgptz_formData.start_date = new Date(dateStr);
      this.bhgptz_formData.end_date = now;
    }
  },
  created() {
    this.setTableHeight();
    this.initDate();
  }
}
