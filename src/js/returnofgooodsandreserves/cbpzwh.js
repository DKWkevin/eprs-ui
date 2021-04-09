export default {
  name: 'Cbpzwh',
  data() {
    return {
      formList: [
        {type: 'input', label: '储备品种ID', id: 'stid'},
        {
          type: 'select',
          label: '储备差额',
          id: 'cejudge',
          options: [{value: 1, label: '大于0'}, {value: 2, label: '小于0'}],
          clearable: true
        }
      ],
      formData: {stid: null, cejudge: null},
      btnOptions: [
        {id: 'query', label: 'action.search', icon: 'fa fa-search', perms: 'returnofgoodsandreserves:cbpzwh:select'},
        {id: 'add', label: 'action.add', icon: 'fa fa-plus', perms: 'returnofgoodsandreserves:cbpzwh:select'},
        {
          id: 'download1',
          label: 'action.download',
          icon: 'fa fa-download',
          perms: 'returnofgoodsandreserves:cbpzwh:select'
        },
        {
          id: 'download2',
          label: 'action.downloadph',
          icon: 'fa fa-download',
          perms: 'returnofgoodsandreserves:cbpzwh:select'
        },
      ],
      tableHeight: 0,
      loading: false,
      tableColumns: [
        {type: 0, prop: 'rownum', label: '序号', tableStatus: 0},
        {type: 0, prop: 'stid', label: '储备品种ID', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '货品名称', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'calrel', label: '计算关系', tableStatus: 0},
        {type: 0, prop: 'dkkc', label: '库房库存', tableStatus: 0},
        {type: 0, prop: 'dqkc', label: '地区库存', tableStatus: 0},
        {type: 0, prop: 'stname', label: '储备品名称', tableStatus: 0},
        {type: 0, prop: 'stjx', label: '剂型', tableStatus: 0},
        {type: 0, prop: 'sttype', label: '储备品规格', tableStatus: 0},
        {type: 0, prop: 'stunit', label: '储备品单位', tableStatus: 0},
        {type: 0, prop: 'stprice', label: '储备单价', tableStatus: 0},
        {type: 0, prop: 'stqty', label: '计划储备数量', tableStatus: 0},
        {type: 0, prop: 'cbcount', label: '计划储备金额', tableStatus: 0},
        {type: 0, prop: 'kfcbl', label: '库房储备量', tableStatus: 0},
        {type: 0, prop: 'zbcount', label: '库房储备金额', tableStatus: 0},
        {type: 0, prop: 'cbce', label: '库房储备量差', tableStatus: 0},
        {type: 0, prop: 'dqcbl', label: '地区储备量', tableStatus: 0},
        {type: 0, prop: 'hdqcblc', label: '含地区储备量差', tableStatus: 0},
        {
          type: 0,
          prop: 'caozuo',
          label: '操作',
          tableStatus: 0,
          fixed: 'right',
          width: 280,
          widthStatus: true,
          options: [
            {id: 'addDtl', label: 'action.add', icon: 'fa fa-push', perms: 'returnofgoodsandreserves:cbpzwh:select'},
            {id: 'updateDoc', label: 'action.dtl', icon: 'fa fa-dtl', perms: 'returnofgoodsandreserves:cbpzwh:select'},
            {
              id: 'delDoc',
              label: 'action.delete',
              icon: 'fa fa-delete',
              perms: 'returnofgoodsandreserves:cbpzwh:select'
            },
            {
              id: 'selectDtl',
              label: 'action.search',
              icon: 'fa fa-search',
              perms: 'returnofgoodsandreserves:cbpzwh:select'
            }
          ]
        }
      ],
      tableData: [],
      addVisible: false,
      doctype: 0,
      title: null,
      dtlData: {},
      base: {
        stid: null,
        stname: null,
        sttype: null,
        stunit: null,
        stqty: null,
        stprice: null,
        stjx: null
      },
      baseDtl: {
        stid: null,
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null,
        calrel: null,
        dkkc: null
      },
      dialogVisible: false,
      dialogWidth: 700,
      dialogHeight: 500,
      dialogTop: '12vh',
      labelPosition: 'right',
      btnloading: false,
      showSummary: true,
      dtlLoading: false,
      pageStatus: false,
      tableDtlColumns: [
        {type: 0, prop: 'stid', label: '储备品种ID', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'calrel', label: '计算关系', tableStatus: 0},
        {type: 0, prop: 'dkkc', label: '总部库存', tableStatus: 0},
        {type: 0, prop: 'dqkc', label: '地区库存', tableStatus: 0},
        {
          type: 0,
          prop: 'caozuo',
          label: '操作',
          tableStatus: 0,
          fixed: 'right',
          width: 280,
          widthStatus: true,
          options: [
            {
              id: 'delDtl',
              label: 'action.delete',
              icon: 'fa fa-delete',
              perms: 'returnofgoodsandreserves:cbpzwh:select'
            },
            {id: 'updateDtl', label: 'action.dtl', icon: 'fa fa-dtl', perms: 'returnofgoodsandreserves:cbpzwh:select'},
          ]
        }
      ],
      tableDtlData: [],
      stid: null
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
  },
  methods: {
    functionQuery(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "add") {
        this.doctype = 1;
        this.title = '新增总单';
        this.dialogVisible = true;
      } else if (data === "download1") {
        let columns = [];
        this.tableColumns.map((e, index) => {
          if (index !== 0) {
            columns.push(e);
          }
        });
        this.exportExcelDOM(columns, this.tableData, "储备品种维护" + this.getNewDate());
      } else if (data === "download2") {
        let data = [];
        let columns = [
          {prop: 'stid', label: '储备品种ID'},
          {prop: 'goodsid', label: '货品ID'},
          {prop: 'goodsname', label: '货品名称'},
          {prop: 'goodstype', label: '规格'},
          {prop: 'goodsunit', label: '单位'},
          {prop: 'prodarea', label: '产地'},
          {prop: 'calrel', label: '计算关系'},
          {prop: '', label: '总部库存'},
          {prop: '', label: '单品储备量'},
          {prop: '', label: '地区库存'},
          {prop: 'stname', label: '储备品名称'},
          {prop: 'stjx', label: '剂型'},
          {prop: 'sttype', label: '储备品规格'},
          {prop: 'stunit', label: '储备品单位'},
          {prop: 'stprice', label: '单价'},
          {prop: '', label: '规定储备数量'},
          {prop: '', label: '储备金额'},
          {prop: 'zbcount', label: '总部储备量'},
          {prop: '', label: '总部储备金额'},
          {prop: '', label: '储备差额'},
          {prop: '', label: '地处储备量'},
          {prop: '', label: '占比'},
          {prop: '', label: '采购支持'},
          {prop: '', label: '货品状态'},
          {prop: 'stcompanyid', label: '保管单位ID'},
          {prop: 'lotid', label: '批号ID'},
          {prop: 'lotno', label: '批号'},
          {prop: 'areaid', label: '仓促区域ID'},
          {prop: 'areaname', label: '仓储区域'},
          {prop: 'posid', label: '货位ID'},
          {prop: 'posno', label: '货位'},
          {prop: 'wmsqty', label: 'wms数量'}
        ];
        let formData = this.formData;
        let params = {};
        if (formData.stid !== null && formData.stid !== "") {
          params.stid = formData.stid;
        }
        if (formData.cejudge !== null && formData.cejudge !== "") {
          if (formData.cejudge === 1) {
            params.cejudge = 'and (nvl(b.dkkc,0)-a.stqty)>0';
          } else if (formData.cejudge === 2) {
            params.cejudge = 'and (nvl(b.dkkc,0)-a.stqty)<0';
          }
        }
        if (Object.keys(params).length === 0) {
          params = null;
        }
        this.$api.returnofgoodsandreserves.downloadCbpzwh({params: params}).then(res => {
          if (res.code === 200) {
            data = Object.freeze(res.data);
            this.exportExcelDOM(columns, data, '储备品种维护(带批号)' + this.getNewDate());
          }
        }).catch(error => {
          this.loading = false;
          return false;
        });
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let formData = this.formData;
      let params = {};
      if (formData.stid !== null && formData.stid !== "") {
        params.stid = formData.stid;
      }
      if (formData.cejudge !== null && formData.cejudge !== "") {
        if (formData.cejudge === 1) {
          params.cejudge = 'and (nvl(b.dkkc,0)-a.stqty)>0';
        } else if (formData.cejudge === 2) {
          params.cejudge = 'and (nvl(b.dkkc,0)-a.stqty)<0';
        }
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.loading = true;
      this.tableData = [];
      this.$api.returnofgoodsandreserves.selectCbpzwh({
        pageNum: pageNum,
        pageSize: pageSize,
        params: params
      }).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(data) {
      if (data.id === "addDtl") {
        this.title = "新增细单";
        this.doctype = 3;
        Object.keys(this.baseDtl).forEach(e => {
          this.baseDtl[e] = data.row[e];
        });
        this.dialogVisible = true;
      } else if (data.id === "updateDoc") {
        this.title = "修改总单";
        this.doctype = 2;
        Object.keys(this.base).forEach(e => {
          this.base[e] = data.row[e];
        });
        this.dialogVisible = true;
      } else if (data.id === "delDoc") {
        this.$api.returnofgoodsandreserves.delCbpzwhDoc({stid: data.row.stid}).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("删除总单成功");
              this.functionQuery('query');
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      } else if (data.id === "") {
        this.title = "查看细单";
        this.doctype = 4;
        this.selectDtl(data.row.stid);
        this.dialogVisible = true;
      }
    },
    insertForm() {
      if (this.doctype === 1) {
        this.insertOfupdateDoc(true);
      } else if (this.doctype === 2) {
        this.insertOfupdateDoc(false);
      } else if (this.doctype === 3) {
        this.insertOfupdateDtl(true);
      }
    },
    insertOfupdateDoc(data) {
      let params = {};
      Object.keys(this.base).forEach(e => {
        if (e !== 'stid') {
          params[e] = this.base[e];
        }
      });
      this.loading = true;
      if (data === true) {
        this.$api.returnofgoodsandreserves.insertCbpzwhDoc(params).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("保存成功");
              this.loading = false;
              this.closeDialog();
            }
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      } else if (data === false) {
        params.stid = this.base.stid;
        this.$api.returnofgoodsandreserves.updateCbpzwhDoc(params).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("修改成功");
              this.loading = false;
              this.closeDialog();
            }
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      }
    },
    insertOfupdateDtl(data) {
      let params = {};
      Object.keys(this.baseDtl).forEach(e => {
        params[e] = this.baseDtl[e];
      });
      if (data === true) {
        this.$api.returnofgoodsandreserves.insertCbpzwhDtl(params).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("保存成功");
              this.loading = false;
              this.closeDialog();
            }
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      } else if (data === false) {
        this.stid = this.baseDtl.stid;
        this.$api.returnofgoodsandreserves.updateCbpzwhDtl(params).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("修改成功");
              this.loading = false;
              this.doctype = 4;
              this.title = '查询细单';
              this.selectDtl(this.stid);
            }
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      }
    },
    handleFunctionDtl(data) {
      if (data.id === "delDtl") {
        this.$api.returnofgoodsandreserves.delCbpzwhDtl({stid: data.row.stid, goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("删除细单成功");
              this.functionQuery('query');
            } else {
              alert(res.msg);
              return false;
            }
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      } else if (data.id === "updateDtl") {
        Object.keys(this.baseDtl).forEach(e => {
          this.baseDtl[e] = data.row[e];
        });
        this.doctype = 5;
        this.title = '修改细单';
      }
    },
    selectDtl(stid) {
      let params = {};
      params.stid = stid;
      this.dtlLoading = true;
      this.tableDtlData = [];
      this.$api.returnofgoodsandreserves.selectCbpzwhDtl({params: params}).then(res => {
        if (res.code === 200) {
          this.tableDtlData = Object.freeze(res.data);
          this.dtlLoading = false;
        }
      }).catch(error => {
        this.dtlLoading = false;
        return false;
      })
    },
    dialogColse() {
      this.doctype = 0;
      this.title = null;
      Object.keys(this.base).keys(e => {
        this.base[e] = null;
      });
      Object.keys(this.baseDtl).keys(e => {
        this.baseDtl[e] = null;
      });
      this.dialogVisible = false;
    }
  }
}
