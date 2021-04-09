import {
  paramsFormat,
  dateFormat,
} from "@/utils/functions";

export default {
  data() {
    return {
      cgjl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: ""
          //perms: "counter:cgjl:select"
        },

        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: ""
          //perms: "counter:cgjl:select"
        },

        {
          id: "print",
          icon: "fa fa-edit",
          label: "action.print",
          perms: ""
          //perms: "counter:cgjl:select"
        }
      ],
      cgjl_formList: [
        {
          type: "daterange",
          id1: "startdate",
          id2: "endofdate",
          label: "日期"
        },
        {
          type: "inputHov",
          id: "goodsid",
          label: "货品ID",
          dataType: "number"
        },
        {type: "input", id: "salesid", label: "销售单ID"}
      ],
      cgjl_formData: {
        startdate: null,
        endofdate: null,
        goodsid: null,
        salesid: null,

        employeeid: sessionStorage.getItem('userid'),
      },

      cgjl_goodsVisible: false,
      cgjl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "cgjl_formData",
        parentVisible: "cgjl_goodsVisible",
        hovColumns: [
          {
            id: "opcode",
            name: "货品操作码",
            queryStatus: true,
            dataStatus: 1
          },
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
            dataStatus: 1
          },
          {
            id: "goodsunit",
            name: "单位",
            queryStatus: false,
            dataStatus: 1
          },
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ]
      },
      cgjl_tableHeight: 300,
      cgjl_tableColumns: [
        {label: "销售日期", prop: "credate"},
        {label: "出柜日期", prop: "outtime"},
        {label: "货品ID", prop: "goodsid"},
        {label: "销售单ID", prop: "salesid"},
        {label: "品名", prop: "goodsname"},
        {label: "剂型", prop: "jx"},
        {label: "规格", prop: "goodstype"},
        {label: "单位", prop: "goodsunit"},

        {label: "生产企业", prop: "factname"},
        {label: "批准文号", prop: "prono"},

        {label: "批号", prop: "lotno"},
        {label: "货柜号", prop: "posno"},

        {label: "生产日期", prop: "proddate"},
        {label: "有效期至", prop: "invaliddate"},

        {label: "出柜数量", prop: "goodsqty"},

        {label: "单价", prop: "saprice"},
        {label: "金额", prop: "total"},

        {label: "出柜人", prop: "outman"},

        {label: "复核人", prop: "cgfhman"},

        {label: "配送完成标志", prop: "finishflagname"}
      ],
      cgjl_tableData: [],
      cgjl_pageNum: 1,
      cgjl_pageSize: 50,
      cgjl_total: 0,
      cgjl_loading: false,

      cgjl_base: {
        allid: null
      },

      cgjl_printList: [],
      cgjl_printVisible: false
    };
  },
  created() {
    this.cgjl_tableHeight = (window.innerHeight - 240);
    this.cgjl_formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.cgjl_formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        this.selectDoc(this.cgjl_pageNum, this.cgjl_pageSize);
      } else if (data === "print") {
        this.openPrint();
      } else if (data === "download") {
        this.exportExcelDOM(
          this.cgjl_tableColumns,
          this.cgjl_tableData,
          "出柜记录" + this.getNewDate()
        );
      }
    },
    openHov(data) {
      if (data === "goodsid") {
        this.cgjl_goodsVisible = true;
      }
    },

    selectDoc(pageNum, pageSize) {
      let params = paramsFormat(this.cgjl_formData);
      this.cgjl_loading = true;
      this.cgjl_tableData = [];
      this.$api.counter
        .selectCgjl({
          pageNum: pageNum,
          pageSize: pageSize,
          params: params
        })
        .then(res => {
          this.cgjl_tableData = res.data.content;
          this.cgjl_pageNum = res.data.pageNum;
          this.cgjl_pageSize = res.data.pageSize;
          this.cgjl_total = res.data.totalSize;
          this.cgjl_loading = false;
        })
        .catch(() => {
          this.cgjl_pageNum = 1;
          this.cgjl_total = 0;
          this.cgjl_loading = false;
          return false;
        });
    },

    // 分页 size 变化
    handleSizeChange(pageSize) {
      this.cgjl_pageSize = pageSize;
      this.selectDoc(this.cgjl_pageNum, pageSize);
    },
    // 分页 pageNum 变化
    handleCurrentChange(pageNum) {
      this.cgjl_pageNum = pageNum;
      this.selectDoc(pageNum, this.cgjl_pageSize);
    },
    // 表格 复选 变化
    tableSelectChange(rows) {
      this.cgjl_base.allid = null;
      this.cgjl_printList = [];
      let strs = "";
      rows.forEach((row, i) => {
        strs += "," + row.id;
      });
      if (strs !== "") {
        this.cgjl_base.allid = strs.substring(1);
      }
      this.cgjl_printList = JSON.parse(JSON.stringify(rows));
    },

    headerStyle({row, rowIndex}) {
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    },

    // 将 表格 表头 渲染成两行
    renderHeader(h, {column}) {
      let header = column.label.split(",");
      return [h("div", [h("p", {}, header[0]), h("p", {}, header[1])])];
    },
    // 处理日期
    dateFormat(pattern, data) {
      return dateFormat(pattern, data);
    },
    openPrint() {
      if (this.cgjl_base.allid !== null && this.cgjl_base.allid !== "") {
      } else {
        alert("没有数据,不能打印")
        return false;
      }
      this.$refs.print.status = true;
    }
  }
};
