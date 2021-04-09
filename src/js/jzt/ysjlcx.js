import {
  paramsFormat,
  formDataReset,
  dateFormat
} from "@/utils/functions";

export default {
  data() {
    return {
      ysjlcx_formList: [
        {
          type: "daterange",
          id1: "start_date",
          id2: "end_date",
          label: "日期"
        },
        // {
        //   type: "inputHov",
        //   label: "货品ID",
        //   id: "goodsid",
        //   dataType: "number"
        // },
        {
          type: "input",
          label: "业务单号",
          id: "businessbill_no"
        }
      ],
      ysjlcx_formData: {
        goodsid: "",
        start_date: "",
        end_date: "",
        businessbill_no: ""
      },
      ysjlcx_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "kccx:select",
          perms: "ysjlcx:select"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: "ysjlcx:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "kccx:select"
          perms: "ysjlcx:select"
        }
      ],

      ysjlcx_tableColumns: [
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
        {
          prop: "Manufacturer",
          label: "生产厂家",
          type: 0,
          width: 150,
          tableStatus: 0
        },

        {prop: "Vehicle_No", label: "车牌号", type: 0, tableStatus: 0},
        {prop: "DeliveryLoading_No", label: "装车单号", type: 0, tableStatus: 0},

        {
          prop: "Invoice_Time",
          label: "开票日期",
          type: 2,
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
          prop: "Amount",
          label: "单价",
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
          prop: "Transport_Level",
          label: "配送方式",
          type: 0,
          tableStatus: 0
        },


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
      ysjlcx_tableData: [],
      ysjlcx_tableHeight: 350,
      ysjlcx_loading: false,

      ysjlcx_goodsVisible: false,
      ysjlcx_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "ysjlcx_formData",
        parentVisible: "ysjlcx_goodsVisible",
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

      ysjlcx_companyVisible: false,
      ysjlcx_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "ysjlcx_formData",
        parentVisible: "ysjlcx_companyVisible",
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
      ysjlcx_dialogVisible: false,
      ysjlcx_dialogTitle: "",
      ysjlcx_dtlstatus: false, // 新增 false 修改 true

      ysjlcx_dialogWidth: "700px",
      ysjlcx_inline: true,
      ysjlcx_dialogLabelWidth: "120px",

      ysjlcx_base: {}
    };
  },

  methods: {
    // data  ysjlcx_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.ysjlcx_formData);
      } else if (data === "download") {
        this.exportExcelDOM(
          this.ysjlcx_tableColumns,
          this.ysjlcx_tableData,
          "运输记录查询" + this.getNewDate()
        );
      }
    },

    handleFunction(data) {
    },

    openHov(data) {
      this.ysjlcx_goodsHov.fillDataName = "ysjlcx_formData";
      this.ysjlcx_companyHov.fillDataName = "ysjlcx_formData";
      if (data == "companyid") {
        this.ysjlcx_companyVisible = true;
      } else if (data == "goodsid") {
        this.ysjlcx_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.ysjlcx_goodsHov.fillDataName = "ysjlcx_base";
      this.ysjlcx_companyHov.fillDataName = "ysjlcx_base";
      if (data == "companyid") {
        this.ysjlcx_companyVisible = true;
      } else if (data == "goodsid") {
        this.ysjlcx_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let ysjlcx_formData = this.ysjlcx_formData;
      let params = paramsFormat(ysjlcx_formData);

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

      this.ysjlcx_loading = true;
      this.ysjlcx_tableData = [];
      this.$api.jzt
        .selectYsjlcx(params)
        .then(res => {
          if (res.code === 200) {
            this.ysjlcx_tableData = Object.freeze(res.data);
            // this.$refs.doctable.pageSize = res.data.pageSize;
            // this.$refs.doctable.currentPage = res.data.pageNum;
            // this.$refs.doctable.total = res.data.totalSize;
            this.ysjlcx_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.ysjlcx_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.ysjlcx_dialogVisible = false;
    },
    openDialog() {
      this.ysjlcx_dialogVisible = true;
    },

    setTableHeight() {
      // 设置表格高度
      this.ysjlcx_tableHeight = window.innerHeight - 240;
      console.log(" 表格高度 ", this.ysjlcx_tableHeight);
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
      this.ysjlcx_formData.start_date = new Date(dateStr);
      this.ysjlcx_formData.end_date = now;
    }
  },
  created() {
    this.setTableHeight();
    this.initDate();
  }
}
