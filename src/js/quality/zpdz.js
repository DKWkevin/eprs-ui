import {
  paramsFormat,
} from "@/utils/functions";

export default {
  data() {
    return {
      zpdzFormList: [
        {
          type: "inputHov",
          label: "赠品ID",
          id: "source_goodsid",
          dataType: "number"
        },
        {
          type: "inputHov",
          label: "原品ID",
          id: "traget_goodsid",
          dataType: "number"
        }
      ],
      zpdzFormData: {
        source_goodsid: null,
        traget_goodsid: null
      },
      zpdzBtnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "quality:zpdz:select",
          perms: "quality:zpdz:select"
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          //perms: "quality:zpdz:insert"
          perms: "quality:zpdz:insert"
        },
        {
          id: "download",
          icon: "fa fa-plus",
          label: "action.download",
          //perms: "quality:zpdz:select"
          perms: "quality:zpdz:select"
        }
      ],

      zpdzTableColumns: [
        {prop: "source_goodsid", label: "赠品ID", type: 0, tableStatus: 0},

        {
          prop: "source_goodsname",
          label: "赠品品名",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "source_goodstype",
          label: "赠品规格",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "source_goodsunit",
          label: "赠品单位",
          type: 0,
          tableStatus: 0
        },
        {prop: "source_prodarea", label: "赠品产地", type: 0, tableStatus: 0},
        {prop: "traget_goodsid", label: "原货品ID", type: 0, tableStatus: 0},
        {
          prop: "traget_goodsname",
          label: "原货品品名",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "traget_goodstype",
          label: "原货品规格",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "traget_goodsunit",
          label: "原货品单位",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "traget_prodarea",
          label: "原货品产地",
          type: 0,
          tableStatus: 0
        }
      ],
      zpdzTableData: [],
      zpdzLoading: false,

      zpdzGoodsVisible: false,
      zpdzGoodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: true,
        fillDataName: "zpdzFormData",
        parentVisible: "zpdzGoodsVisible",
        hovColumns: [
          {
            id: "opcode",
            name: "操作码",
            queryStatus: true,
            dataStatus: 1
          },
          {
            id: "goodsid",
            name: "货品ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "source_goodsid"
          },
          {
            id: "goodsname",
            name: "货品名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "goodsname"
          },
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "包装", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ]
      },

      zpdzGoodsVisible_2: false,
      zpdzGoodsHov_2: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "zpdzFormData",
        parentVisible: "zpdzGoodsVisible_2",
        hovColumns: [
          {
            id: "opcode",
            name: "操作码",
            queryStatus: true,
            dataStatus: 1
          },
          {
            id: "goodsid",
            name: "货品ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "traget_goodsid"
          },
          {
            id: "goodsname",
            name: "货品名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "goodsname"
          },
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "包装", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ]
      },

      //   el-dialog 数据
      zpdzDialogVisible: false,
      zpdzDialogTitle: "",
      zpdzDtlstatus: false, // 新增 false 修改 true

      zpdzDialogWidth: "700px",
      zpdzInline: true,
      zpdzDialogLabelWidth: "120px",

      zpdzBase: {
        traget_goodsid: null,
        source_goodsid: null
      }
    };
  },
  created() {
  },
  methods: {
    queryFunction(data) {
      if (data == "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data == "add") {
        this.beforeInsert();
      } else if (data == "download") {
        this.exportExcelDOM(
          this.zpdzTableColumns,
          this.zpdzTableData,
          "赠品对照" + this.getNewDate()
        );
      }
    },
    openHov(data) {
      this.zpdzGoodsHov.fillDataName = "zpdzFormData";
      this.zpdzGoodsHov_2.fillDataName = "zpdzFormData";
      if (data == "source_goodsid") {
        // 赠品
        this.zpdzGoodsVisible = true;
      } else if (data == "traget_goodsid") {
        // 原品
        this.zpdzGoodsVisible_2 = true;
      }
    },

    openDailogHov(data) {
      this.zpdzGoodsHov.fillDataName = "zpdzBase";
      this.zpdzGoodsHov_2.fillDataName = "zpdzBase";
      if (data == "source_goodsid") {
        // 赠品
        this.zpdzGoodsVisible = true;
      } else if (data == "traget_goodsid") {
        // 原品
        this.zpdzGoodsVisible_2 = true;
      }
    },
    handleFunction(data) {
    },

    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.zpdzFormData;
      let params = paramsFormat(formData);
      this.zpdzLoading = true;
      this.$api.quality
        .selectZpdz({pageNum, pageSize, params})
        .then(res => {
          if (res.code === 200) {
            this.zpdzTableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.zpdzLoading = false;
          }
        })
        .catch(error => {
          this.zpdzLoading = false;
          return false;
        });
    },

    closeDialog() {
      this.zpdzDialogVisible = false;
    },
    openDialog() {
      this.zpdzDialogVisible = true;
    },

    beforeInsert() {
      this.zpdzDialogTitle = "新增";
      this.zpdzDtlstatus = false;
      Object.keys(this.zpdzBase).forEach(e => {
        this.zpdzBase[e] = null;
      });

      this.zpdzBase.companyid = sessionStorage.getItem("companyid");
      this.zpdzBase.companyname = sessionStorage.getItem("companyname");
      this.zpdzBase.inputmanid = sessionStorage.getItem("userid");
      this.zpdzBase.inputmanname = sessionStorage.getItem("username");
      this.openDialog();
    },
    save() {
      if (this.zpdzDtlstatus == false) {
        this.insert();
      }
    },

    // 新增
    insert() {
      let params = {
        source_goodsid: this.zpdzBase.source_goodsid,
        traget_goodsid: this.zpdzBase.traget_goodsid
      };
      console.log("zpdz insert p ", params);
      this.$api.quality
        .insertZpdz(params)
        .then(res => {
          if (res.code == 200) {
            alert("保存成功");
            this.closeDialog();
          }
        })
        .catch(e => {
          return false;
        });
    },
    hideHov() {
      // console.log('source_goodsid',this.zpdzFormData.source_goodsid)
    }
  }
};
