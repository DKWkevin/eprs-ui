import {
  paramsFormat,
  dateFormat,
} from "@/utils/functions";

export default {
  data() {
    return {
      jxqcgzjl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: ""
          //perms: "counter:jxqcgzjl:select"
        },
        {
          id: "print",
          icon: "fa fa-edit",
          label: "action.print",
          perms: ""
          //perms: "counter:jxqcgzjl:selectprint"
        }
      ],
      jxqcgzjl_formList: [
        {
          type: "daterange",
          id1: "startdate",
          id2: "endofdate",
          label: "日期"
        },
        {type: "input", id: "salesid", label: "销售单ID"},
        {type: "inputHov", id: "goodsid", label: "货品ID", dataType: "number"}
      ],
      jxqcgzjl_formData: {
        startdate: null,
        endofdate: null,
        salesid: null,
        goodsid: null,

        employeeid: sessionStorage.getItem('userid'),
      },

      jxqcgzjl_goodsVisible: false,
      jxqcgzjl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "jxqcgzjl_formData",
        parentVisible: "jxqcgzjl_goodsVisible",
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
      jxqcgzjl_tableHeight: 300,
      jxqcgzjl_tableData: [],
      jxqcgzjl_pageNum: 1,
      jxqcgzjl_pageSize: 50,
      jxqcgzjl_total: 0,
      jxqcgzjl_loading: false,

      jxqcgzjl_base: {
        allid: null
      },

      jxqcgzjl_dialogVisible: false,

      jxqcgzjl_tableColumns_2: [
        {prop: "monitorid", label: "设备编号", type: 0, tableStatus: 0},
        {
          prop: "uptime",
          label: "时间",
          type: 2,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        {prop: "tvalue", label: "温度", type: 0, tableStatus: 0}
      ],

      jxqcgzjl_tableData_2: [],

      jxqcgzjl_printVisible: false
    };
  },
  created() {
    this.jxqcgzjl_formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.jxqcgzjl_formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
    this.jxqcgzjl_tableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        this.selectDoc(this.jxqcgzjl_pageNum, this.jxqcgzjl_pageSize);
      } else if (data === "print") {
        this.openPrint();
      }
    },
    openHov(data) {
      if (data === "goodsid") {
        this.jxqcgzjl_goodsVisible = true;
      }
    },

    selectDoc(pageNum, pageSize) {
      let params = paramsFormat(this.jxqcgzjl_formData);
      this.jxqcgzjl_loading = true;
      this.jxqcgzjl_tableData = [];
      this.$api.counter
        .selectJxqcgzjl({
          pageNum: pageNum,
          pageSize: pageSize,
          params: params
        })
        .then(res => {
          this.jxqcgzjl_tableData = res.data.content;
          this.jxqcgzjl_pageNum = res.data.pageNum;
          this.jxqcgzjl_pageSize = res.data.pageSize;
          this.jxqcgzjl_total = res.data.totalSize;
          this.jxqcgzjl_loading = false;
        })
        .catch(() => {
          this.jxqcgzjl_pageNum = 1;
          this.jxqcgzjl_total = 0;
          this.jxqcgzjl_loading = false;
          return false;
        });
    },

    selectDtl(id, recid) {
      let params = {
        id: id,
        recid: recid
      };
      this.openDialog();
      this.jxqcgzjl_tableData_2 = [];
      this.$api.counter
        .selectJxqcgzjlDtl(params)
        .then(res => {
          if (res.code === 200) {
            this.jxqcgzjl_tableData_2 = Object.freeze(res.data.content);
          }
        })
        .catch(e => {
          return false;
        });
    },

    closeDialog() {
      this.jxqcgzjl_dialogVisible = false;
    },
    openDialog() {
      this.jxqcgzjl_dialogVisible = true;
    },

    openPrint() {
      if (this.jxqcgzjl_base.allid !== null && this.jxqcgzjl_base.allid !== "") {
      } else {
        alert("没有数据,不能打印");
        return false;
      }
      this.$refs.print.status = true;
    },

    // 分页 size 变化
    handleSizeChange(pageSize) {
      this.jxqcgzjl_pageSize = pageSize;
      this.selectDoc(this.jxqcgzjl_pageNum, pageSize);
    },
    // 分页 pageNum 变化
    handleCurrentChange(pageNum) {
      this.jxqcgzjl_pageNum = pageNum;
      this.selectDoc(pageNum, this.jxqcgzjl_pageSize);
    },
    // 表格 复选 变化
    tableSelectChange(rows) {
      this.jxqcgzjl_base.allid = null;
      let strs = "";
      console.log("rows", rows);
      rows.forEach((row, i) => {
        strs += "," + row.id;
      });
      if (strs !== "") {
        this.jxqcgzjl_base.allid = strs.substring(1);
      }
      console.log("allid", this.jxqcgzjl_base.allid);
    },

    headerStyle({row, rowIndex}) {
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    },
    cellStyle({row, rowIndex}) {
      return "width:120px";
    },
    // 将 表格 表头 渲染成两行
    renderHeader(h, {column}) {
      let header = column.label.split(",");
      return [h("div", [h("p", {}, header[0]), h("p", {}, header[1])])];
    },
    // 处理日期
    dateFormat(pattern, data) {
      return dateFormat(pattern, data);
    }
  }
};
