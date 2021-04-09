import {
  paramsFormat,
  formDataReset,
  dateFormat
} from "@/utils/functions";

export default {
  data() {
    return {
      xsthysjl_formList: [
        {
          type: "daterange",
          id1: "start_date",
          id2: "end_date",
          label: "日期"
        },
        {
          type: "inputHov",
          label: "货品ID",
          id: "goodsid",
          dataType: "number"
        },
        {
          type: "input",
          label: "业务单号",
          id: "businessbill_no"
        }
      ],
      xsthysjl_formData: {
        goodsid: "",
        start_date: "",
        end_date: "",
        businessbill_no: ""
      },
      xsthysjl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "kccx:select",
          perms: "xsthysjl:select"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: "xsthysjl:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "kccx:select"
          perms: "xsthysjl:select"
        }
      ],

      xsthysjl_tableColumns: [
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
        {prop: "Dosage_Form", label: "剂型", type: 0, tableStatus: 0},
        {prop: "Lot_No", label: "批号", type: 0, tableStatus: 0},

        {prop: "Actual_Qty", label: "到货数量", type: 0, tableStatus: 0},
        {
          prop: "Qualified_Qty",
          label: "验收合格数量",
          type: 0,
          tableStatus: 0
        },

        {
          prop: "Arrival_Time",
          label: "到货日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Instore_Time",
          label: "入库日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Quality_Time",
          label: "质检日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        {prop: "Quality_Inspector", label: "质检员", type: 0, tableStatus: 0},
        {prop: "Ssa_Name", label: "供货单位", type: 0, tableStatus: 0},

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
          prop: "Approval_No",
          label: "批准文号",
          type: 0,
          width: 150,
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
          prop: "Producing_Area",
          label: "产地",
          type: 0,
          tableStatus: 0
        }

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
      xsthysjl_tableData: [],
      xsthysjl_tableHeight: 350,
      xsthysjl_loading: false,

      xsthysjl_goodsVisible: false,
      xsthysjl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "xsthysjl_formData",
        parentVisible: "xsthysjl_goodsVisible",
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

      xsthysjl_companyVisible: false,
      xsthysjl_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "xsthysjl_formData",
        parentVisible: "xsthysjl_companyVisible",
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
      xsthysjl_dialogVisible: false,
      xsthysjl_dialogTitle: "",
      xsthysjl_dtlstatus: false, // 新增 false 修改 true

      xsthysjl_dialogWidth: "700px",
      xsthysjl_inline: true,
      xsthysjl_dialogLabelWidth: "120px",

      xsthysjl_base: {}
    };
  },

  methods: {
    // data  xsthysjl_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.xsthysjl_formData);
      } else if (data === "download") {
        this.exportExcelDOM(
          this.xsthysjl_tableColumns,
          this.xsthysjl_tableData,
          "销售退回验收记录" + this.getNewDate()
        );
      }
    },

    handleFunction(data) {
    },

    openHov(data) {
      this.xsthysjl_goodsHov.fillDataName = "xsthysjl_formData";
      this.xsthysjl_companyHov.fillDataName = "xsthysjl_formData";
      if (data === "companyid") {
        this.xsthysjl_companyVisible = true;
      } else if (data === "goodsid") {
        this.xsthysjl_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.xsthysjl_goodsHov.fillDataName = "xsthysjl_base";
      this.xsthysjl_companyHov.fillDataName = "xsthysjl_base";
      if (data == "companyid") {
        this.xsthysjl_companyVisible = true;
      } else if (data == "goodsid") {
        this.xsthysjl_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let xsthysjl_formData = this.xsthysjl_formData;
      let params = paramsFormat(xsthysjl_formData);

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

      this.xsthysjl_loading = true;
      this.xsthysjl_tableData = [];
      this.$api.jzt
        .selectXsthysjl(params)
        .then(res => {
          if (res.code === 200) {
            this.xsthysjl_tableData = Object.freeze(res.data);
            // this.$refs.doctable.pageSize = res.data.pageSize;
            // this.$refs.doctable.currentPage = res.data.pageNum;
            // this.$refs.doctable.total = res.data.totalSize;
            this.xsthysjl_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.xsthysjl_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.xsthysjl_dialogVisible = false;
    },
    openDialog() {
      this.xsthysjl_dialogVisible = true;
    },

    setTableHeight() {
      // 设置表格高度
      this.xsthysjl_tableHeight = window.innerHeight - 240;
      console.log(' 表格高度 ', this.xsthysjl_tableHeight)
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
      this.xsthysjl_formData.start_date = new Date(dateStr);
      this.xsthysjl_formData.end_date = now;
    }
  },
  created() {
    this.setTableHeight();
    this.initDate();
  }
}
