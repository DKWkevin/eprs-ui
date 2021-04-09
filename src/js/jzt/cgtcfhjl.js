import {
  paramsFormat,
  formDataReset,
  dateFormat
} from "@/utils/functions";

export default {
  data() {
    return {
      cgtcfhjl_formList: [
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
      cgtcfhjl_formData: {
        goodsid: "",
        start_date: "",
        end_date: "",
        businessbill_no: ""
      },
      cgtcfhjl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "kccx:select",
          perms: "cgtcfhjl:select"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: "cgtcfhjl:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "kccx:select"
          perms: "cgtcfhjl:select"
        }
      ],

      cgtcfhjl_tableColumns: [
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

        {
          prop: "Outstore_Time",
          label: "出库时间",
          type: 2,
          width: 150,
          tableStatus: 0
        },

        {prop: "Recheck_Staff", label: "复核人", type: 0, tableStatus: 0},
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
        }
        // {
        //   prop: "Producing_Area",
        //   label: "产地",
        //   type: 0,
        //   tableStatus: 0
        // },
        // {
        //   prop: "Address",
        //   label: "发货地址",
        //   type: 0,
        //   tableStatus: 0
        // },
        // {
        //   prop: "Contact_Name",
        //   label: "联系人",
        //   type: 0,
        //   tableStatus: 0
        // },
        // {
        //   prop: "Contact_Phone",
        //   label: "联系电话",
        //   type: 0,
        //   tableStatus: 0
        // },

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
      cgtcfhjl_tableData: [],
      cgtcfhjl_tableHeight: 350,
      cgtcfhjl_loading: false,

      cgtcfhjl_goodsVisible: false,
      cgtcfhjl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "cgtcfhjl_formData",
        parentVisible: "cgtcfhjl_goodsVisible",
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

      cgtcfhjl_companyVisible: false,
      cgtcfhjl_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "cgtcfhjl_formData",
        parentVisible: "cgtcfhjl_companyVisible",
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
      cgtcfhjl_dialogVisible: false,
      cgtcfhjl_dialogTitle: "",
      cgtcfhjl_dtlstatus: false, // 新增 false 修改 true

      cgtcfhjl_dialogWidth: "700px",
      cgtcfhjl_inline: true,
      cgtcfhjl_dialogLabelWidth: "120px",

      cgtcfhjl_base: {}
    };
  },

  methods: {
    // data  cgtcfhjl_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.cgtcfhjl_formData);
      } else if (data === "download") {
        this.exportExcelDOM(
          this.cgtcfhjl_tableColumns,
          this.cgtcfhjl_tableData,
          "销售退出复核记录" + this.getNewDate()
        );
      }
    },

    handleFunction(data) {
    },

    openHov(data) {
      this.cgtcfhjl_goodsHov.fillDataName = "cgtcfhjl_formData";
      this.cgtcfhjl_companyHov.fillDataName = "cgtcfhjl_formData";
      if (data == "companyid") {
        this.cgtcfhjl_companyVisible = true;
      } else if (data == "goodsid") {
        this.cgtcfhjl_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.cgtcfhjl_goodsHov.fillDataName = "cgtcfhjl_base";
      this.cgtcfhjl_companyHov.fillDataName = "cgtcfhjl_base";
      if (data == "companyid") {
        this.cgtcfhjl_companyVisible = true;
      } else if (data == "goodsid") {
        this.cgtcfhjl_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let cgtcfhjl_formData = this.cgtcfhjl_formData;
      let params = paramsFormat(cgtcfhjl_formData);

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

      this.cgtcfhjl_loading = true;
      this.cgtcfhjl_tableData = [];
      this.$api.jzt
        .selectCgtcfhjl(params)
        .then(res => {
          if (res.code === 200) {
            this.cgtcfhjl_tableData = Object.freeze(res.data);
            // this.$refs.doctable.pageSize = res.data.pageSize;
            // this.$refs.doctable.currentPage = res.data.pageNum;
            // this.$refs.doctable.total = res.data.totalSize;
            this.cgtcfhjl_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.cgtcfhjl_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.cgtcfhjl_dialogVisible = false;
    },
    openDialog() {
      this.cgtcfhjl_dialogVisible = true;
    },

    setTableHeight() {
      // 设置表格高度
      this.cgtcfhjl_tableHeight = window.innerHeight - 240;
      console.log(" 表格高度 ", this.cgtcfhjl_tableHeight);
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
      this.cgtcfhjl_formData.start_date = new Date(dateStr);
      this.cgtcfhjl_formData.end_date = now;
    }
  },
  created() {
    this.setTableHeight();
    this.initDate();
  }
}
