import {
  paramsFormat,
  formDataReset,
  dateFormat
} from "@/utils/functions";

export default {
  components: {EQuery, ETable, HovTools, KtButton},
  data() {
    return {
      cgrkysjl_formList: [
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
      cgrkysjl_formData: {
        goodsid: "",
        start_date: "",
        end_date: "",
        businessbill_no: ""
      },
      cgrkysjl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "kccx:select",
          perms: "cgrkysjl:select"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: "cgrkysjl:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "kccx:select"
          perms: "cgrkysjl:select"
        }
      ],

      cgrkysjl_tableColumns: [
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
      cgrkysjl_tableData: [],
      cgrkysjl_tableHeight: 350,
      cgrkysjl_loading: false,

      cgrkysjl_goodsVisible: false,
      cgrkysjl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "cgrkysjl_formData",
        parentVisible: "cgrkysjl_goodsVisible",
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

      cgrkysjl_companyVisible: false,
      cgrkysjl_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "cgrkysjl_formData",
        parentVisible: "cgrkysjl_companyVisible",
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
      cgrkysjl_dialogVisible: false,
      cgrkysjl_dialogTitle: "",
      cgrkysjl_dtlstatus: false, // 新增 false 修改 true

      cgrkysjl_dialogWidth: "700px",
      cgrkysjl_inline: true,
      cgrkysjl_dialogLabelWidth: "120px",

      cgrkysjl_base: {}
    };
  },

  methods: {
    // data  cgrkysjl_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.cgrkysjl_formData);
      } else if (data === "download") {
        this.exportExcelDOM(
          this.cgrkysjl_tableColumns,
          this.cgrkysjl_tableData,
          "采购入库验收记录" + this.getNewDate()
        );
      }
    },

    handleFunction(data) {
    },

    openHov(data) {
      this.cgrkysjl_goodsHov.fillDataName = "cgrkysjl_formData";
      this.cgrkysjl_companyHov.fillDataName = "cgrkysjl_formData";
      if (data == "companyid") {
        this.cgrkysjl_companyVisible = true;
      } else if (data == "goodsid") {
        this.cgrkysjl_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.cgrkysjl_goodsHov.fillDataName = "cgrkysjl_base";
      this.cgrkysjl_companyHov.fillDataName = "cgrkysjl_base";
      if (data == "companyid") {
        this.cgrkysjl_companyVisible = true;
      } else if (data == "goodsid") {
        this.cgrkysjl_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let cgrkysjl_formData = this.cgrkysjl_formData;
      let params = paramsFormat(cgrkysjl_formData);

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

      this.cgrkysjl_loading = true;
      this.cgrkysjl_tableData = [];
      this.$api.jzt
        .selectCgrkysjl(params)
        .then(res => {
          if (res.code === 200) {
            this.cgrkysjl_tableData = Object.freeze(res.data);
            // this.$refs.doctable.pageSize = res.data.pageSize;
            // this.$refs.doctable.currentPage = res.data.pageNum;
            // this.$refs.doctable.total = res.data.totalSize;
            this.cgrkysjl_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.cgrkysjl_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.cgrkysjl_dialogVisible = false;
    },
    openDialog() {
      this.cgrkysjl_dialogVisible = true;
    },

    setTableHeight() {
      // 设置表格高度
      this.cgrkysjl_tableHeight = window.innerHeight - 240;
      //console.log(" 表格高度 ", this.cgrkysjl_tableHeight);
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
      this.cgrkysjl_formData.start_date = new Date(dateStr);
      this.cgrkysjl_formData.end_date = now;
    }
  },

  created() {
    this.setTableHeight();
    this.initDate();
  }
}
