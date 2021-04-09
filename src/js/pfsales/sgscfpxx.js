export default {
  name: "Sgscfpxx",
  data() {
    return {
      sgscfpxxQueryForm: {
        startdate: null,
        endofdate: null,
        customid: null,
        customname: null,
        invoice_type: null,
        print_type: null
      },
      sgscfpxxTableData: [],
      sgscfpxxLoading: false,
      sgscfpxxTableHeight: 300,
      sgscfpxxGdhj: 0,
      sgscfpxxSelection: [],
      sgscfpxxHovVisible: false,
      sgscfpxxHov: {
        hovTitle: '客户查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "sgscfpxxQueryForm",
        parentVisible: 'sgscfpxxHovVisible',
        hovColumns:
          [
            {id: "customid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "门店名称", queryStatus: true, dataStatus: 1, fillid: "customname"},
            {id: "customopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.sgscfpxxTableHeight = (window.innerHeight - 250);
    this.sgscfpxxQueryForm.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.sgscfpxxQueryForm.endofdate = new Date(this.getNewDate() + ' 23:59:59');
    this.sgscfpxxQueryForm.invoice_type = 1;
    this.sgscfpxxQueryForm.print_type = 1;
  },
  methods: {
    queryFunction() {
      let params = {};
      let formData = this.sgscfpxxQueryForm;
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
      if (params.indexOf('customid') < 0) {
        alert('客户不能为空');
        return false;
      }
      this.sgscfpxxLoading = true;
      this.sgscfpxxTableData = [];
      this.$api.pfsales.selectSgscfpxx({params: params}).then(res => {
        this.sgscfpxxTableData = res.data;
        this.sgscfpxxLoading = false;
      }).catch(() => {
        this.sgscfpxxLoading = false;
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
      this.sgscfpxxSelection = value;
      this.sgscfpxxGdhj = number;
    },
    //删除
    saveAll() {
      if (this.sgscfpxxSelection.length === 0) {
        alert("没有选择数据，不能保存！");
        return false;
      }
      let params = {};
      let selections = this.sgscfpxxSelection;
      let query = this.sgscfpxxQueryForm;
      let alldocid = '';
      let updatedtl = [];
      let insertdtl = [];
      let insertdoc = {};
      let pdtaxrate = selections[selections.length - 1].taxrate;
      insertdoc.customid = query.customid;
      insertdoc.inputmanid = Number(sessionStorage['userid']);
      insertdoc.invoice_type = query.invoice_type;
      insertdoc.print_type = query.print_type;
      insertdoc.dtl_lines = selections.length;
      insertdoc.customname = query.customname;
      insertdoc.iftax = selections[selections.length - 1].iftax;
      insertdoc.pdtaxrate = selections[selections.length - 1].taxrate;
      selections.forEach(item => {
        if (item.goodsqty === 0 && item.unitprice === 0 && item.total_line > 0) {
          alert("生成发票信息失败:折扣明细金额必须为负数");
          return false;
        }
        if (pdtaxrate !== item.taxrate) {
          alert("税率不同无法保存");
          return false;
        }
        if (query.invoice_type === 2 && item.iftax === 0) {
          alert("结算细单" + item.sasetdtlid + "不可开增值税发票");
          return false;
        }
        if (query.invoice_type === 2 && item.iftax === null && query.invoice_type.length === 0) {
          alert("结算细单" + item.sasetdtlid + "不可开增值税发票");
          return false;
        }
        let notaxmoney = (parseFloat(item.total_line) / parseFloat(1 + item.taxrate)).toFixed(2);
        let taxmoney = (parseFloat(item.total_line) - parseFloat(notaxmoney));
        let taxitem = "";
        if (parseFloat(item.taxrate) === 0.17) {
          taxitem = 4001;
        } else if (parseFloat(item.taxrate) === 0.03) {
          taxitem = 9005;
        } else if (parseFloat(item.taxrate) === 0) {
          taxitem = 9006;
        } else if (parseFloat(item.taxrate) === 0.11) {
          taxitem = 4002;
        } else if (parseFloat(item.taxrate) === 0.10) {
          taxitem = 4002;
        } else if (parseFloat(item.taxrate) === 0.16) {
          taxitem = 4001;
        } else if (parseFloat(item.taxrate) === 0.13) {
          taxitem = 4001;
        } else if (parseFloat(item.taxrate) === 0.09) {
          taxitem = 4002;
        }
        alldocid = alldocid + item.sasetdocid;
        updatedtl.push({settledtlid: item.sasetdtlid});
        insertdtl.push({
          settledtlid: item.sasetdtlid,
          salerid: item.salerid,
          goodsid: item.goodsid,
          goodsqty: item.goodsqty,
          price: item.unitprice,
          total_line: item.total_line,
          notaxmoney: notaxmoney,
          lotno: item.lotno,
          taxmoney: taxmoney,
          taxitem: taxitem
        })
      })
      params.insertdoc = insertdoc;
      params.insertdtl = insertdtl;
      params.updatedtl = updatedtl;
      params.alldocid = alldocid;
      if (confirm("是否确认删除") === true) {
        this.$api.pfsales.insertSgscfpxx(params).then(res => {
          if (res.code === 200) {
            alert("保存成功");
          } else {
            alert(res.msg);
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    openQueryHov() {
      this.sgscfpxxHovVisible = true;
    }
  }
}
