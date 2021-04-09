import {selectDdlOption} from "@/utils/functions";

export default {
  name: "Xsskmxcxdy",
  data() {
    return {
      xsskmxcxdyQueryForm: {
        startdate: null,
        endofdate: null,
        customid: null,
        goodsid: null,
        settlemode: null
      },
      xsskmxcxdyTableData: [],
      xsskmxcxdyLoading: false,
      xsskmxcxdyTableHeight: 300,
      xsskmxcxdyGdhj: 0,
      xsskmxcxdySelection: [],
      xsskmxcxdySettlemode: [],
      xsskmxcxdyHovVisible: false,
      xsskmxcxdyHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "xsskmxcxdyQueryForm",
        parentVisible: 'xsskmxcxdyHovVisible',
        hovColumns: []
      },
      printData: {}
    }
  },
  created() {
    this.xsskmxcxdyTableHeight = (window.innerHeight - 250);
    this.xsskmxcxdyQueryForm.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.xsskmxcxdyQueryForm.endofdate = new Date(this.getNewDate() + ' 23:59:59');
    this.xsskmxcxdySettlemode = selectDdlOption('AP_SETTLEMODE');
  },
  methods: {
    queryFunction() {
      let params = {};
      let formData = this.xsskmxcxdyQueryForm;
      Object.keys(params).forEach(item => {
        if (item !== "startdate" && item !== "endofdate") {
          if (formData[item] !== null && formData[item] !== "") {
            params[item] = formData[item];
          }
        }
      })
      if (formData.startdate !== null && formData.startdate !== "") {
        params.startdate = new Date(formData.startdate);
      }
      if (formData.endofdate !== null && formData.endofdate !== "") {
        params.endofdate = new Date(formData.endofdate);
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.xsskmxcxdyLoading = true;
      this.xsskmxcxdyTableData = [];
      this.$api.pfsales.selectXsskmxcxdy({params: params}).then(res => {
        let data = res.data;
        this.$api.pfsales.selectXsskmxcxdySum({params: params}).then(res => {
          this.xsskmxcxdyTableData = data;
          this.xsskmxcxdyGdhj = res.data;
          this.xsskmxcxdyLoading = false;
        }).catch(() => {
          this.xsskmxcxdyLoading = false;
          return false;
        })
      }).catch(() => {
        this.xsskmxcxdyLoading = false;
        return false;
      })
    },
    selectionChange(value) {
      let number = 0;
      value.forEach(item => {
        if (item.goodsqty === 0 && item.unitprice === 0 && item.total_line > 0) {
          alert("生成发票信息失败:折扣明细金额必须为负数");
          return false;
        }
        number = number + Number(item.total_line);
      })
      this.xsskmxcxdySelection = value;
      this.xsskmxcxdyGdhj = number;
    },
    //删除
    print() {
      this.$refs.print.status = true;
    },
    openQueryHov(data) {
      let hovUrl = '';
      let hovTitle = '';
      let hovColumns = '';
      if (data === 'customid') {
        hovTitle = '客户查询';
        hovUrl = "customidhov/select";
        hovColumns = [
          {id: "customid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
          {id: "customname", name: "门店名称", queryStatus: true, dataStatus: 1, fillid: "customname"},
          {id: "customopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
        ]
      } else if (data === "goodsid") {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns = [
          {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ]
      }
      this.xsskmxcxdyHov.hovTitle = hovTitle;
      this.xsskmxcxdyHov.hovUrl = hovUrl;
      this.xsskmxcxdyHov.hovColumns = hovColumns;
      this.xsskmxcxdyHovVisible = true;
    }
  }
}
