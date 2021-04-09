import {selectCompanyOrDept} from "@/utils/drops";

export default {
  name: "Pfcgdd",
  data() {
    return {
      pfcgddQueryForm: {
        supplyid: null,
        supplyname: null,
        goodsid: null,
        goodsname: null,
        pcdtpeid: null,
        lmcompanyid: null
      },
      pfcgddTableData: [],
      pfcgddPageNum: 1,
      pfcgddPageSize: 50,
      pfcgddTotal: 0,
      pfcgddLoading: false,
      pfcgddTableHeight: 300,
      pfcgddDialog: '采购订单',
      pfcgddDtlStatus: 0,
      pfcgddStatus: false,
      pfcgddIndex: 0,
      pfcgddDtlForm: {
        paymode: null
      },
      pfcgddDtlData: [],
      lmcompanyid: null,
      supplyid: null,
      supplyname: null,
      pfcgddDtlHeight: 360,
      dtlTotal: 0,
      pfcgddPcdtpeidOptions: [],
      pfcgddLmcompanyidOptions: [],
      pfcgddPaymode: [],
      pfcgddHovVisible: false,
      pfcgddHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "pfcgddDtlForm",
        parentVisible: 'pfcgddHovVisible',
        hovColumns:
          [
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.pfcgddTableHeight = (window.innerHeight - 240);

    this.pfcgddPcdtpeidOptions = selectCompanyOrDept({companyid: sessionStorage['deptid']});
    //this.pfcgddPcdtpeidOptions = selectCompanyOrDept({companyid:83670});
    this.pfcgddQueryForm.pcdtpeid = Number(sessionStorage['deptid']);
    //this.pfcgddQueryForm.pcdtpeid = 83670;
    this.pfcgddLmcompanyidOptions = this.getBgdw();
    this.pfcgddQueryForm.lmcompanyid = 7;
    //this.pfcgddQueryForm.lmcompanyid = 40;
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.pfcgddPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.pfcgddQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      params.companyid = Number(sessionStorage['companyid']);
      this.pfcgddLoading = true;
      this.pfcgddTableData = [];
      this.$api.pfsales.selectPfcgdd({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.pfcgddTableData = res.data.content;
        this.pfcgddPageNum = res.data.pageNum;
        this.pfcgddPageSize = res.data.pageSize;
        this.pfcgddTotal = res.data.totalSize;
        this.pfcgddLoading = false;
      }).catch(() => {
        this.pfcgddPageNum = 1;
        this.pfcgddTotal = 0;
        this.pfcgddLoading = false;
        return false;
      })
    },
    sss() {
      this.pfcgddDtlStatus = 1;
      this.pfcgddStatus = true;
    },
    //加载生成订单页面
    updateOpen(row, index) {
      let params = {};
      params.supplyid = row.supplyid;
      params.companyid = Number(sessionStorage['companyid']);
      params.companyname = row.companyname;
      params.pcdtpeid = this.pfcgddQueryForm.pcdtpeid;
      params.lmcompanyid = this.pfcgddQueryForm.lmcompanyid;
      console.log(row.goodsid)
      if (row.goodsid !== null && row.goodsid !== '') {
        params.goodsid = row.goodsid;
      } else {
        params.goodsid = null;
      }
      this.$api.pfsales.selectPfcgddDtl(params).then(res => {
        if (res.code === 200) {
          this.pfcgddDtlStatus = 1;
          this.pfcgddDtlData = res.data.lst;
          this.lmcompanyid = res.data.lmcompanyid;
          this.supplyid = res.data.supplyid;
          this.supplyname = res.data.companyname;
          this.pfcgddStatus = true;
        } else {
          alert(res.msg);
          return false;
        }
      }).catch(() => {
        return false;
      })
    },
    //生成合同
    saveAll() {
      if (confirm("是否确认提交") === true) {
        let params = [];
        this.pfcgddDtlData.forEach(item => {
          let json = {};
          json.lmcompanyid = this.lmcompanyid;
          json.paymode = item.paymode;
          json.supplyid = this.supplyid;
          json.supplyname = this.supplyname;
          json.employeeid = Number(sessionStorage['userid']);
          json.employeename = sessionStorage['username'];
          json.companyid = Number(sessionStorage['companyid']);
          json.pcdtpeid = Number(sessionStorage['deptid']);
          if (item.number !== null && item.number !== '') {
            json.goodsqty = item.number;
          } else {
            json.goodsqty = 0;
          }
          json.goodsid = item.goodsid;
          json.payterm = item.payterm;
          json.lxr = item.lxr;
          json.bz = item.bz;
          json.channelid = item.channelid;
          json.price = item.price;

          params.push(json);
        })
        this.$api.pfsales.updatePfcgdd(params).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.dialogClose();
          } else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    //保存付款方式
    saveFkfs() {
      let params = {};
      this.$api.pfsales.insertFkfs(params).then(res => {
        this.pfcgddDtlStatus = 1;
        this.pfcgddDtlData = res.data.lst;
      }).catch(() => {
        return false;
      })
    },
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = "";
      let hovColumns = []
      if (data === "supplyid") {
        hovTitle = '供应商查询';
        hovUrl = "companyidhov/selectcompanyid";
        hovColumns =
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      } else if (data === "goodsid") {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns =
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
          ]
      }
      this.pfcgddHov.hovTitle = hovTitle;
      this.pfcgddHov.hovUrl = hovUrl;
      this.pfcgddHov.hovColumns = hovColumns;
      this.pfcgddHov.fillDataName = "pfcgddQueryForm";
      this.pfcgddHovVisible = true;
    },
    openHov() {
      this.pfcgddHov.fillDataName = "pfcgddDtlForm";
      this.pfcgddHovVisible = true;
    },
    dialogClose() {
      this.formIsNull(this.pfcgddDtlForm);
      this.pfcgddDialog = '';
      this.pfcgddDtlStatus = false;
      this.pfcgddIndex = 0;
      this.pfcgddStatus = false;
    },
    getBgdw() {
      let list = [];
      this.$api.pfsales.selectXsbccxbgdw({
        pageNum: 1,
        pageSize: 999,
        params: {companyid: Number(sessionStorage['companyid'])}
      }).then(res => {
        res.data.content.forEach(item => {
          let json = {
            value: item.stcompanyid,
            label: item.companyname
          }
          list.push(json);
        })
      }).catch(() => {
        return false;
      })
      return list;
    },
    keyDownCom(e, className, index) {
      let reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
      let value = this.$refs[className + index].value;
      if (e.keyCode === 38) {
        if (className === 'number') {
          if (reg.test(value)) {
            let newClassName = className + (index - 1);
            this.$refs[newClassName].focus();
          } else {
            return false
          }
        } else {
          let newClassName = className + (index - 1);
          this.$refs[newClassName].focus();
        }
      }
      if (e.keyCode === 40) {
        if (className === 'number') {
          if (reg.test(value)) {
            let newClassName = className + (index + 1);
            this.$refs[newClassName].focus();
          } else {
            return false
          }
        } else {
          let newClassName = className + (index + 1);
          this.$refs[newClassName].focus();
        }
      }
      if (e.keyCode === 13) {
        if (className === 'zxcolumn1' || className === 'zxcolumn2') {
          e.keyCode = 0;
        } else {
          if (reg.test(value)) {
            if (index < this.pfcgddDtlData.length - 1) {
              let newClassName = className + (index + 1);
              this.$refs[newClassName].focus();
            }
          } else {
            return false;
          }
        }
      }
    },
    closethis(className, index) {
      let value = this.$refs[className + index].value;
      let reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
      let total = 0;
      if (reg.test(value)) {
        this.pfcgddDtlData.forEach(item => {
          let goodsprice = item.price;
          let goodsqty = item.number;
          let singleprice = goodsprice * goodsqty;
          total = total + parseFloat(singleprice);
        })
        this.dtlTotal = total.toFixed(2);
      } else {
        alert('请输入正确的数量');
        return value = 0;
      }
    }
  }
}
