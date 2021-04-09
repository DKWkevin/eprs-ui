import {
  paramsFormat,
  dateFormat,
} from "@/utils/functions";

export default {
  data() {
    return {
      rkysjl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: ""
          //perms: "counter:rkysjl:select"
        },

        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          perms: ""
          //perms: "counter:rkysjl:select"
        },

        {
          id: "print",
          icon: "fa fa-edit",
          label: "action.print",
          perms: ""
          //perms: "counter:rkysjl:select"
        }
      ],
      rkysjl_formList: [
        {
          type: "daterange",
          id1: "startdate",
          id2: "endofdate",
          label: "日期"
        },
        {type: "inputHov", id: "goodsid", label: "货品ID", dataType: "number"}
      ],
      rkysjl_formData: {
        startdate: null,
        endofdate: null,
        goodsid: null,

        employeeid: sessionStorage.getItem('userid'),
      },

      rkysjl_goodsVisible: false,
      rkysjl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "rkysjl_formData",
        parentVisible: "rkysjl_goodsVisible",
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
      rkysjl_tableHeight: 300,
      rkysjl_tableColumns: [
        {label: "单据日期", prop: "credate"},
        {label: "验收日期", prop: "arrivetime"},
        {label: "货品ID", prop: "goodsid"},
        {label: "进货细单ID", prop: "sudtlid"},
        {label: "品名", prop: "goodsname"},
        {label: "剂型", prop: "jx"},
        {label: "规格", prop: "goodstype"},
        {label: "单位", prop: "goodsunit"},

        {label: "生产企业", prop: "factname"},
        {label: "批准文号", prop: "prono"},

        {label: "供货单位", prop: "supplyname"},

        {label: "批号", prop: "lotno"},
        {label: "货柜号", prop: "posno"},

        {label: "生产日期", prop: "proddate"},
        {label: "有效期至", prop: "invaliddate"},

        {label: "到货数量", prop: "goodsqty"},

        {label: "验收合格数量", prop: "hgqty"},

        {label: "验收结论", prop: "yanshoujielun"},

        {label: "验收员", prop: "shelveman"},

        {label: "收货时间", prop: "arrivetime"},

        {label: "上柜时间", prop: "shelvetime"},

        {label: "总单ID", prop: "id"}
      ],
      rkysjl_tableData: [],
      rkysjl_pageNum: 1,
      rkysjl_pageSize: 50,
      rkysjl_total: 0,
      rkysjl_loading: false,

      rkysjl_base: {
        allid: null
      },

      rkysjl_printVisible: false,
      rkysjl_printList: []
    };
  },
  created() {
    this.rkysjl_formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.rkysjl_formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
    this.rkysjl_tableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        this.selectDoc(this.rkysjl_pageNum, this.rkysjl_pageSize);
      } else if (data === "print") {
        this.openPrint();
      } else if (data === "download") {
        this.exportExcelDOM(
          this.rkysjl_tableColumns,
          this.rkysjl_tableData,
          "入库验收记录" + this.getNewDate()
        );
      }
    },
    openHov(data) {
      if (data === "goodsid") {
        this.rkysjl_goodsVisible = true;
      }
    },

    selectDoc(pageNum, pageSize) {
      let params = paramsFormat(this.rkysjl_formData);
      this.rkysjl_loading = true;
      this.rkysjl_tableData = [];
      this.$api.counter
        .selectRkysjl({
          pageNum: pageNum,
          pageSize: pageSize,
          params: params
        })
        .then(res => {
          this.rkysjl_tableData = res.data.content;
          this.rkysjl_tableData.forEach(item => {
            item.yanshoujielun = "合格";
          });
          this.rkysjl_pageNum = res.data.pageNum;
          this.rkysjl_pageSize = res.data.pageSize;
          this.rkysjl_total = res.data.totalSize;
          this.rkysjl_loading = false;
        })
        .catch(() => {
          this.rkysjl_pageNum = 1;
          this.rkysjl_total = 0;
          this.rkysjl_loading = false;
          return false;
        });
    },

    // 分页 size 变化
    handleSizeChange(pageSize) {
      this.rkysjl_pageSize = pageSize;
      this.selectDoc(this.rkysjl_pageNum, pageSize);
    },
    // 分页 pageNum 变化
    handleCurrentChange(pageNum) {
      this.rkysjl_pageNum = pageNum;
      this.selectDoc(pageNum, this.rkysjl_pageSize);
    },
    // 表格 复选 变化
    tableSelectChange(rows) {
      this.rkysjl_base.allid = null;
      this.rkysjl_printList = [];
      let strs = "";
      console.log("rows", rows);
      rows.forEach((row, i) => {
        strs += "," + row.id;
      });
      if (strs !== "") {
        this.rkysjl_base.allid = strs.substring(1);
      }
      this.rkysjl_printList = JSON.parse(JSON.stringify(rows));
      console.log(this.rkysjl_base.allid)
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
      this.$refs.print.status = true;
    }
  }
};
