import {paramsFormat, formDataReset} from "@/utils/functions";

export default {
  data() {
    return {
      kccx_formList: [
        {
          type: "inputHov",
          label: "货品ID",
          id: "goodsid",
          dataType: "number"
        },
        {
          type: "input",
          label: "批号",
          id: "lotno"
        },
        {
          type: "select",
          label: "库存状态",
          id: "stockstatus",
          options: [
            {label: "合格", value: "1"},
            {label: "不合格", value: "2"},
            {label: "待验", value: "3"},
            {label: "停售", value: "4"},
            {label: "虚拟", value: "5"},
            {label: "拒收、在库待验", value: "9"}
          ]
        }
      ],
      kccx_formData: {
        goodsid: "",
        lotno: "",
        stockstatus: ""
      },
      kccx_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "kccx:select",
          perms: "jztkc:select"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: "jztkc:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "kccx:select"
          perms: "jztkc:select"
        }
      ],

      kccx_tableColumns: [
        {
          prop: "Goods_No",
          label: "商品编号",
          type: 0,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Goods_Name",
          label: "品名",
          type: 0,
          tableStatus: 0
        },
        {prop: "Drug_Spec", label: "规格", type: 0, tableStatus: 0},
        {prop: "Package_Unit", label: "单位", type: 0, tableStatus: 0},
        {prop: "Manufacturer", label: "生产厂家", type: 0, tableStatus: 0},
        {
          prop: "Package_Qty",
          label: "包装数量",
          type: 0,
          tableStatus: 0
        },
        {prop: "Lot_No", label: "批号", type: 0, tableStatus: 0},
        {
          prop: "Production_Date",
          label: "生产日期",
          type: 0,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Valid_Until",
          label: "有效期",
          width: 150,
          type: 0,
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
          prop: "Stock_Status",
          label: "库存状态",
          type: 0,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Stock_Quantity",
          label: "库存数量",
          type: 0,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Inbound_Quantity",
          label: "入库数量",
          type: 0,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "Outbound_Quantity",
          label: "出库数量",
          type: 0,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "In_Transit_Quantity",
          label: "在途数量",
          type: 0,
          width: 150,
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
      kccx_tableData: [],
      kccx_tableHeight: 350,
      kccx_loading: false,

      kccx_goodsVisible: false,
      kccx_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "kccx_formData",
        parentVisible: "kccx_goodsVisible",
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

      kccx_companyVisible: false,
      kccx_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "kccx_formData",
        parentVisible: "kccx_companyVisible",
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
      kccx_dialogVisible: false,
      kccx_dialogTitle: "",
      kccx_dtlstatus: false, // 新增 false 修改 true

      kccx_dialogWidth: "700px",
      kccx_inline: true,
      kccx_dialogLabelWidth: "120px",

      kccx_base: {}
    };
  },

  methods: {
    // data  kccx_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.kccx_formData);
      } else if (data === "download") {
        this.exportExcelDOM(
          this.kccx_tableColumns,
          this.kccx_tableData,
          "九州通库存查询" + this.getNewDate()
        );
      }
    },

    handleFunction(data) {
    },

    openHov(data) {
      this.kccx_goodsHov.fillDataName = "kccx_formData";
      this.kccx_companyHov.fillDataName = "kccx_formData";
      if (data == "companyid") {
        this.kccx_companyVisible = true;
      } else if (data == "goodsid") {
        this.kccx_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.kccx_goodsHov.fillDataName = "kccx_base";
      this.kccx_companyHov.fillDataName = "kccx_base";
      if (data == "companyid") {
        this.kccx_companyVisible = true;
      } else if (data == "goodsid") {
        this.kccx_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let kccx_formData = this.kccx_formData;
      let params = paramsFormat(kccx_formData);
      if (!params) params = {};
      if (!params.goodsid) params.goodsid = "";
      if (!params.lotno) params.lotno = "";
      if (!params.stockstatus) params.stockstatus = "";

      this.kccx_loading = true;
      this.kccx_tableData = [];
      this.$api.jzt
        .selectKccx(params)
        .then(res => {
          if (res.code === 200) {
            this.kccx_tableData = Object.freeze(res.data);
            // this.$refs.doctable.pageSize = res.data.pageSize;
            // this.$refs.doctable.currentPage = res.data.pageNum;
            // this.$refs.doctable.total = res.data.totalSize;
            this.kccx_loading = false;
          } else {
            alert(res.msg)
          }
        })
        .catch(error => {
          this.kccx_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.kccx_dialogVisible = false;
    },
    openDialog() {
      this.kccx_dialogVisible = true;
    },

    setTableHeight() {
      // 设置表格高度
      this.kccx_tableHeight = window.innerHeight - 240;
    }
  },
  created() {
    this.setTableHeight();
  }
}
