export default {
  name: "Dycbxsspb",
  data() {
    return {
      dycbxsspbQueryForm: {
        customid: null,
        goodsid: null,
        salerid: null
      },
      dycbxsspbTableData: [],
      dycbxsspbPageNum: 1,
      dycbxsspbPageSize: 50,
      dycbxsspbTotal: 0,
      dycbxsspbLoading: false,
      dycbxsspbTableHeight: 300,
      dycbxsspbDialog: '',
      dycbxsspbDtlStatus: false,
      dycbxsspbStatus: false,
      dycbxsspbIndex: 0,
      dycbxsspbDtlForm: {
        companyid: null,
        companyname: null,
        customid: null,
        customname: null,
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null,
        salerid: null,
        salername: null,
        unitprice: null,
        goodsqty: null,
        totals: null,
        flag: null,
        inputmanid: null
      },
      rules: {
        customid: {required: true, message: '客户不能为空', trigger: 'blur'},
        goodsid: {required: true, message: '货品不能为空', trigger: 'blur'},
        salerid: {required: true, message: '业务员不能为空', trigger: 'blur'},
        unitprice: {required: true, message: '单价不能为空', trigger: 'blur'},
        goodsqty: {required: true, message: '数量不能为空', trigger: 'blur'},
      },
      dycbxsspbHovVisible: false,
      dycbxsspbHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible: 'dycbxsspbHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.dycbxsspbTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.dycbxsspbPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.dycbxsspbQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.dycbxsspbLoading = true;
      this.dycbxsspbTableData = [];
      this.$api.pfsales.selectDycbxsspb({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.dycbxsspbTableData = res.data.content;
        this.dycbxsspbPageNum = res.data.pageNum;
        this.dycbxsspbPageSize = res.data.pageSize;
        this.dycbxsspbTotal = res.data.totalSize;
        this.dycbxsspbLoading = false;
      }).catch(() => {
        this.dycbxsspbPageNum = 1;
        this.dycbxsspbTotal = 0;
        this.dycbxsspbLoading = false;
        return false;
      })
    },
    //新增加载表单
    addOpen() {
      this.formIsNull(this.dycbxsspbDtlForm);
      this.dycbxsspbDtlForm.companyid = Number(sessionStorage['companyid']);
      this.dycbxsspbDtlForm.companyname = sessionStorage['companyname'];
      this.dycbxsspbDtlForm.flag = 0;
      this.dycbxsspbDtlForm.inputmanid = Number(sessionStorage['userid']);
      this.dycbxsspbStatus = true;
    },
    //新增提交表单
    addForm() {
      this.$refs.dtl.$refs.dtlForm.validate(valid => {
        if (valid) {
          if (confirm("是否确认保存") === true) {
            this.$api.pfsales.insertDycbxsspb(this.dycbxsspbDtlForm).then(res => {
              if (res.code === 200) {
                alert("保存成功");
                this.dialogClose();
              } else {
                alert(res.msg);
              }
            }).catch(() => {
              return false;
            })
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
    },
    //确认
    confirmDycbxsspb(row, index) {
      if (confirm("是否确认") === true) {
        this.$api.pfsales.confirmDycbxsspb({id: row.id, inputmanid: Number(sessionStorage['userid'])}).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.dycbxsspbTableData[index].flag = "确认";
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
    //删除
    delForm(row, index) {
      if (confirm("是否作废") === true) {
        this.$api.pfsales.deleteDycbxsspb({id: row.id, inputmanid: Number(sessionStorage['userid'])}).then(res => {
          if (res.code === 200) {
            alert("作废成功");
            this.dycbxsspbTableData[index].flag = "作废";
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
    saleSumPrice() {
      let dtlForm = this.dycbxsspbDtlForm;
      dtlForm.unitprice = dtlForm.unitprice.replace(/[^\- \d.]/g, '')
      dtlForm.totals = parseFloat(dtlForm.unitprice) * parseFloat(dtlForm.goodsqty);
    },
    saleSumGoodsqty() {
      let dtlForm = this.dycbxsspbDtlForm;
      if (dtlForm.goodsqty !== null && dtlForm.goodsqty !== "") {
        dtlForm.goodsqty = dtlForm.goodsqty.replace(/[^\- \d.]/g, '');
      }
      dtlForm.totals = parseFloat(dtlForm.unitprice) * parseFloat(dtlForm.goodsqty);
    },
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = "";
      let hovColumns = [];
      if (data === 'customid') {
        hovTitle = '客户查询';
        hovUrl = "customidhov/select";
        hovColumns =
          [
            {id: "customid", name: "客户ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "客户名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "客户操作码", queryStatus: true, dataStatus: 1}
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
      } else if (data === "salerid") {
        hovTitle = '业务员查询';
        hovUrl = "contactinfoidhov/select";
        hovColumns =
          [
            {id: "contactinfoid", name: "业务员ID", queryStatus: true, dataStatus: 2, fillid: "salerid"},
            {id: "contactman", name: "业务员名称", queryStatus: true, dataStatus: 1},
          ]
      }
      this.dycbxsspbHov.hovTitle = hovTitle;
      this.dycbxsspbHov.hovUrl = hovUrl;
      this.dycbxsspbHov.hovColumns = hovColumns;
      this.dycbxsspbHov.fillDataName = "dycbxsspbQueryForm";
      this.dycbxsspbHovVisible = true;
    },
    openHov(data) {
      let hovTitle = '';
      let hovUrl = "";
      let hovColumns = [];
      if (data === 'companyid') {
        hovTitle = '公司查询';
        hovUrl = "companyidhov/selectcompanyid";
        hovColumns =
          [
            {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
            {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1, fillid: "companyname"},
            {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
          ]
      } else if (data === 'customid') {
        hovTitle = '客户查询';
        hovUrl = "customidhov/select";
        hovColumns =
          [
            {id: "customid", name: "客户ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "客户名称", queryStatus: true, dataStatus: 1, fillid: "customname"},
            {id: "customopcode", name: "客户操作码", queryStatus: true, dataStatus: 1}
          ]
      } else if (data === "goodsid") {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns =
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1, fillid: "goodsname"},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: "goodstype"},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: "goodsunit"},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: "prodarea"}
          ]
      } else if (data === "salerid") {
        hovTitle = '业务员查询';
        hovUrl = "contactinfoidhov/select";
        hovColumns =
          [
            {id: "contactinfoid", name: "业务员ID", queryStatus: true, dataStatus: 2, fillid: "salerid"},
            {id: "contactman", name: "业务员名称", queryStatus: true, dataStatus: 1, fillid: "salername"},
          ]
      }
      this.dycbxsspbHov.hovTitle = hovTitle;
      this.dycbxsspbHov.hovUrl = hovUrl;
      this.dycbxsspbHov.hovColumns = hovColumns;
      this.dycbxsspbHov.fillDataName = "dycbxsspbDtlForm";
      this.dycbxsspbHovVisible = true;
    },
    dialogClose() {
      this.formIsNull(this.dycbxsspbDtlForm);
      this.dycbxsspbStatus = false;
    }
  }
}
