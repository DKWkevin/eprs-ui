export default {
  name: "Dqshmdzjjh",
  data() {
    let addqty = (rule, value, callback) => {
      let addqty = this.dqshmdzjjhDtlForm.addqty;
      let zxqhl = this.dqshmdzjjhDtlForm.zxqhl;
      if (Number(zxqhl) > 0) {
        let rg = /^[0-9]+$/;
        if (rg.test(Number(addqty) / Number(zxqhl)) !== true) {
          callback(new Error("追加数量必须为最小请货量的整倍数"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    let mdreason = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error("请填写其他理由!"))
      } else {
        callback();
      }
    }
    return {
      dqshmdzjjhQueryForm: {
        counterid: null,
        dqflag: null,
        goodsid: null,
        distunitid: null,
        mdreason: null,
        ifzdfkp: null,
        pret: null
      },
      dqshmdzjjhTableData: [],
      dqshmdzjjhPageNum: 1,
      dqshmdzjjhPageSize: 50,
      dqshmdzjjhTotal: 0,
      dqshmdzjjhLoading: false,
      dqshmdzjjhTableHeight: 300,
      dqshmdzjjhDialog: '',
      dqshmdzjjhDtlStatus: 0,
      dqshmdzjjhStatus: false,
      dqshmdzjjhIndex: 0,
      dqshmdzjjhDtlForm: {
        counterid: null,
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null,
        qhsl: null,
        zxqhl: null,
        addqty: null,
        mdreason: null,
        qtmdreason: null
      },
      dqshmdzjjhDtlRules: {
        counterid: {required: true, message: '门店不能为空', trigger: 'blur'},
        goodsid: {required: true, message: '货品不能为空', trigger: 'blur'},
        addqty: [{required: true, message: '数量不能为空', trigger: 'blur'}, {validator: addqty, trigger: 'blur'}],
        mdreason: [{required: true, message: '请填写其他理由!', trigger: 'change'}, {validator: mdreason, trigger: 'blur'}]
      },
      dqshmdzjjhXgzjsl: {
        addedaddqty: null,
        goodsid: null,
        addedid: null
      },
      dqshmdzjjhZf: {
        reqdtlid: null,
        dqreason: null
      },
      dqshmdzjjhDistunitidOptions: [],
      dqshmdzjjhSelection: [],
      dqshmdzjjhHovVisible: false,
      dqshmdzjjhHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible: 'dqshmdzjjhHovVisible',
        hovColumns: []
      },
      dqshmdzjjhGoodsVisible: false,
      dqshmdzjjhGoods: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: true,
        fillDataName: "dqshmdzjjhDtlForm",
        parentVisible: 'dqshmdzjjhGoodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1, fillid: "goodsname"},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: "goodstype"},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: "goodsunit"},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: "prodarea"}
          ]
      },
    }
  },
  created() {
    this.dqshmdzjjhTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.dqshmdzjjhPageSize);
    },
    handleCurrentChange(value) {
      this.selectDoc(value, this.dqshmdzjjhPageSize);
    },
    handleSizeChange(value) {
      this.selectDoc(this.dqshmdzjjhPageNum, value);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.dqshmdzjjhQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      params.companyid = Number(sessionStorage['companyid']);
      this.dqshmdzjjhLoading = true;
      this.dqshmdzjjhTableData = [];
      this.$api.area.selectDqshmdzjjh({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.dqshmdzjjhTableData = res.data.content;
        this.dqshmdzjjhPageNum = res.data.pageNum;
        this.dqshmdzjjhPageSize = res.data.pageSize;
        this.dqshmdzjjhTotal = res.data.totalSize;
        this.dqshmdzjjhLoading = false;
      }).catch(() => {
        this.dqshmdzjjhPageNum = 1;
        this.dqshmdzjjhTotal = 0;
        this.dqshmdzjjhLoading = false;
        return false;
      })
    },
    updateallshenpi() {
      if (this.dqshmdzjjhSelection.length === 0) {
        alert("没有选择数据，不能审批！");
        return false;
      }
      this.$api.area.updateDqshmdzjjhPlsq(this.dqshmdzjjhSelection).then(res => {
        if (res.code === 200) {
          alert("审批成功");
        } else {
          alert(res.msg);
          return false;
        }
      }).catch(() => {
        return false;
      })
    },
    plqr() {
      if (confirm("是否进行批量确认？") === true) {
        this.$api.area.updateDqshmdzjjhAll().then(res => {
          if (res.code === 200) {
            alert("批量确认成功！！");
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
    addadded() {
      this.formIsNull(this.dqshmdzjjhDtlForm);
      this.dqshmdzjjhDialog = '追加请货';
      this.dqshmdzjjhDtlStatus = 0;
      this.dqshmdzjjhStatus = true;
    },
    //新增提交表单
    addForm() {
      this.$refs.updateDtl.$refs.dtlForm.validate((vaild) => {
        if (vaild) {
          if (confirm("是否保存?") === true) {
            this.$api.area.updateDqshmdzjjh(this.dqshmdzjjhDtlForm).then(res => {
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
    //修改追加数量加载表单
    onclickdbclick(row, index) {
      this.dqshmdzjjhXgzjsl.goodsid = row.goodsid;
      this.dqshmdzjjhXgzjsl.addedaddqty = null;
      this.dqshmdzjjhXgzjsl.addedid = row.id;
      this.dqshmdzjjhIndex = index;
      this.dqshmdzjjhDialog = '修改追加数量';
      this.dqshmdzjjhDtlStatus = 1;
      this.dqshmdzjjhStatus = true;
    },
    //修改追加数量
    saveupdateaddedaddqty() {
      if (confirm("是否修改?") === true) {
        this.$api.area.updateDqshmdzjjhXgzjsl(this.dqshmdzjjhXgzjsl).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            this.dqshmdzjjhTableData[this.dqshmdzjjhIndex].addqty = this.dqshmdzjjhXgzjsl.addqty;
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
    },
    //审批
    updatezhuangtaishenpi(row) {
      if (confirm("是否审批?") === true) {
        this.$api.area.updateDqshmdzjjhSp({inputmanid: Number(sessionStorage['userid']), id: row.id}).then(res => {
          if (res.code === 200) {
            alert("审批成功");
            this.dqshmdzjjhTableData[this.dqshmdzjjhIndex].addqty = this.dqshmdzjjhXgzjsl.addqty;
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
    },
    savezuofeiOpen(row, index) {
      this.dqshmdzjjhIndex = index;
      this.dqshmdzjjhZf.reqdtlid = row.reqdtlid;
      this.dqshmdzjjhDialog = '作废';
      this.dqshmdzjjhDtlStatus = 2;
      this.dqshmdzjjhStatus = true;
    },
    //删除
    savezuofei() {
      if (confirm("是否作废?") === true) {
        let params = {};
        params.reqdtlid = this.dqshmdzjjhZf.reqdtlid;
        params.dqreason = this.dqshmdzjjhZf.dqreason;
        params.inputmanid = Number(sessionStorage['userid']);
        this.$api.area.deleteDqshmdzjjh(params).then(res => {
          if (res.code === 200) {
            alert("作废成功");
            this.colseDialog();
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
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = "";
      let hovColumns = [];
      if (data === 'counterid') {
        hovTitle = '门店查询';
        hovUrl = "counteridhov/select";
        hovColumns =
          [
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
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
      this.dqshmdzjjhHov.hovTitle = hovTitle;
      this.dqshmdzjjhHov.hovUrl = hovUrl;
      this.dqshmdzjjhHov.hovColumns = hovColumns;
      this.dqshmdzjjhHov.fillDataName = "dqshmdzjjhQueryForm";
      this.dqshmdzjjhHovVisible = true;
    },
    openHov(data) {
      if (data === 'counterid') {
        this.dqshmdzjjhHov.hovTitle = '门店查询';
        this.dqshmdzjjhHov.hovUrl = "counteridhov/select";
        this.dqshmdzjjhHov.hovColumns = [
          {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
          {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
          {id: "companyopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
        ]
        this.dqshmdzjjhHov.fillDataName = "dqshmdzjjhDtlForm";
        this.dqshmdzjjhHovVisible = true;
      } else if (data === "goodsid") {
        this.dqshmdzjjhGoodsVisible = true;
      }
    },
    updatehov() {
      let goodsid = this.dqshmdzjjhDtlForm.goodsid;
      let deptid = Number(sessionStorage['deptid']);
    },
    download() {
      let tableColumns = [
        {prop: "counterid", label: "门店ID"},
        {prop: "companyname", label: "门店名称"},
        {prop: "area", label: "面积分类"},
        {prop: "fc", label: "功能"},
        {prop: "district", label: "商圈"},
        {prop: "yinpian", label: "饮片范围"},
        {prop: "apparatus", label: "器械范围"},
        {prop: "sale", label: "销售分类"}
      ];
      this.exportExcelDOM(tableColumns, this.dqshmdzjjhTableData, '门店维度范围');
    },
    dialogClose() {
      this.dqshmdzjjhDialog = '';
      this.dqshmdzjjhDtlStatus = 0;
      this.dqshmdzjjhIndex = 0;
      this.dqshmdzjjhStatus = false;
    },
    getDef() {
      let list = [];
      this.$api.area.selectDqshmdzjjhDistunid({companyid: Number(sessionStorage['companyid'])}).then(res => {
        res.data.forEach(item => {
          let json = {
            value: item.distunitid,
            label: item.unitname + '(' + item.nextdistdate + ')'
          }
          list.push(json);
        })
      }).catch(() => {
        return false;
      })
      return list;
    },
    selectionChange(value) {
      this.dqshmdzjjhSelection = value;
    },
    headerStyle({row, rowIndex}) {
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    },
    rowStyle({row, rowIndex}) {
      if (row.zdfkp === "是") {
        return "background:#D7EDFF";
      } else {
        return "background:white";
      }
    }
  }
}
