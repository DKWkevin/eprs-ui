import JxbhxxcxDtl from "@/views/Function/Replenish/JxbhxxcxDtl";

export default {
  name: 'Jxbhxxcx',
  components: {JxbhxxcxDtl},
  data() {
    return {
      labelWidth: '110px',
      collapseStatus: true,
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'batchid', label: '批次ID'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {type: 'select', id: 'select2', label: '采购支持', options: []},
        {type: 'select', id: 'groupid', label: '采购分组', options: []},
        {type: 'check', id: 'check1', label: '是否修改过'},
        {
          type: 'select',
          id: 'usestatus',
          label: '是否已确认',
          options: [{value: 1, label: '未确认'}, {value: 2, label: '已确认'}]
        },
      ],
      formData: {
        batchid: null,
        supplyid: null,
        goodsid: null,
        check1: null,
        startdate: null,
        endofdate: null,
        select2: null,
        groupid: null,
        usestatus: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:jxbhpccx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:jxbhpccx:select"},
        {id: 'reset', icon: "fa fa-cog", label: "action.resetNumber", perms: "replenishment:jxbhpccx:select"},
        {id: 'queryError', icon: "fa fa-search", label: "action.queryError", perms: "replenishment:jxbhpccx:select"},
        {id: 'commitbatch', icon: "fa fa-search", label: "action.commitbatch", perms: "replenishment:jxbhpccx:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'orderqty', label: '修改数量', type: 0, tableStatus: 0},
        {prop: 'zxcolumn1', label: '说明', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '货品名称', type: 0, tableStatus: 0, width: 200},
        {prop: 'goodstype', label: '货品规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'baseunitqty', label: '包装数量', type: 0, tableStatus: 0},
        {prop: 'yxhtsl', label: '有效合同数量', type: 0, tableStatus: 0},
        {prop: 'sydb', label: '上月调拨', type: 0, tableStatus: 0},
        {prop: 'qqdb', label: '前期调拨', type: 0, tableStatus: 0},
        {prop: 'syxl', label: '上月销量', type: 0, tableStatus: 0},
        {prop: 'qqxl', label: '前期销量', type: 0, tableStatus: 0},
        {prop: 'ywkc', label: '业务库存', type: 0, tableStatus: 0},
        {prop: 'addqty', label: '应补货数量', type: 0, tableStatus: 0},
        {prop: 'pfyxht', label: '批发有效合同', type: 0, tableStatus: 0},
        {prop: 'pfkc', label: '批发库存', type: 0, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'contactman', label: '联系人', type: 0, tableStatus: 0},
        {prop: 'daysales', label: '日均销量', type: 0, tableStatus: 0},
        {prop: 'daysdd', label: '大库下限天数', type: 0, tableStatus: 0},
        {prop: 'daysud', label: '大库上限天数', type: 0, tableStatus: 0},
        {prop: 'caldown', label: '计算下限', type: 0, tableStatus: 0},
        {prop: 'calup', label: '计算上限', type: 0, tableStatus: 0},
        {prop: 'dedown', label: '设定下限', type: 0, tableStatus: 0},
        {prop: 'deup', label: '设定上限', type: 0, tableStatus: 0},
        {prop: 'usedown', label: '使用下限', type: 0, tableStatus: 0},
        {prop: 'useup', label: '使用上限', type: 0, tableStatus: 0},
        {prop: 'mdcxsl', label: '门店超限数量', type: 0, tableStatus: 0},
        {prop: 'minbach', label: '最小批量', type: 0, tableStatus: 0},
        {prop: 'minpack', label: '最小包装', type: 0, tableStatus: 0},
        {prop: 'confirmqty', label: '确认补货数量', type: 0, tableStatus: 0},
        {prop: 'jjxs', label: '季节系数', type: 0, tableStatus: 0},
        {prop: 'channelid', label: '渠道ID', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经销方式', type: 0, tableStatus: 0},
        {prop: 'paymode', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'payterm', label: '账期', type: 0, tableStatus: 0},
        {prop: 'drivemode', label: '驱动方式', type: 0, tableStatus: 0},
        {prop: 'dhzq', label: '到货周期', type: 0, tableStatus: 0},
        {prop: 'unitprice', label: '单价', type: 0, tableStatus: 0},
        {prop: 'taxrate', label: '税率', type: 0, tableStatus: 0},
        {prop: 'conid', label: '合同ID', type: 0, tableStatus: 0},
        {prop: 'condtlid', label: '合同细单ID', type: 0, tableStatus: 0},
        {prop: 'addid', label: 'ID', type: 0, tableStatus: 0},
        {prop: 'batchid', label: '批次ID', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '修改订单数量',
          type: 1,
          fixed: 'right',
          width: 100,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "replenishment:jxbhpccx:update"}
          ]
        }
      ],
      tableData: [],
      dtlVisible: false,
      dtlType: 0,
      dtlData: {},
      batchVisible: false,
      batchHov: {
        hovTitle: '批次查询',
        hovUrl: "batchidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'batchVisible',
        hovColumns:
          [
            {id: "batchid", name: "批次ID", queryStatus: true, dataStatus: 2, fillid: "batchid"},

          ]
      },
      companyVisible: false,
      companyHov: {
        hovTitle: '公司查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'companyVisible',
        hovColumns:
          [
            {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
            {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      goodsVisible: false,
      goodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'goodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
            {id: "goodsopcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
          ]
      },
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "customid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "customname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
    let params = [];
    this.$api.hov.selectCgfz({}).then(res => {
      if (res.code === 200) {
        res.data.forEach(e => {
          let tel = {};
          tel.value = e.groupid;
          tel.label = e.groupname;
          params.push(tel);
        });
        this.formList[5].options = params;
        this.$api.hov.selectCgfz({buyerid: Number(sessionStorage['userid'])}).then(res => {
          if (res.code === 200) {
            this.formData.groupid = res.data[0].groupid;
          }
        }).catch(error => {
          return false;
        });
      }
    }).catch(error => {
      return false;
    });
    this.$api.hov.selectBuyid({pageNum: 1, pageSize: 999, params: null}).then(res => {
      if (res.code === 200) {
        let params = [];
        res.data.forEach(e => {
          let tel = {};
          tel.value = e.buyerid;
          tel.label = e.buyername;
          params.push(tel);
        });
        this.formList[4].options = params;
      }
    }).catch(error => {
      return false;
    });
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '维护商品补货属性批发定义' + this.getNewDate());
      } else if (data === "reset") {
        if (this.returnValue(this.formData.batchid) === true) {
          alert("批次ID不能为空");
          return false;
        }
        if (this.returnValue(this.formData.buyerid) === false && this.returnValue(this.formData.supplyid) === false) {
          alert("供应商和采购支持不能同时为空！");
          return false;
        }
        let sqlLength = 0;
        if (this.returnValue(this.formData.supplyid) === false) {

        }
        if (sqlLength === 0) {
          alert("批次填写错误或者没有批次信息 ");
          return false;
        }
        let params = {};
        params.batchid = this.formData.batchid;
        params.supplyid = this.formData.supplyid;
        params.buyerid = this.formData.buyerid;
        params.sqllength = sqlLength;
        params.cgfz = this.formData.cgfz;
        if (confirm('是否重置')) {
          this.$api.replenish.resetJxbhxxcxNumber(params).then(res => {
            if (res.code === 200) {
              alert("重置成功");
            }
          }).catch(error => {
            return false;
          })
        }
      } else if (data === 'queryError') {
        this.dtlType = 2;
        if (this.returnValue(this.formData.batchid) === false && this.returnValue(this.formData.supplyid) === false && this.returnValue(this.formData.goodsid) === false) {
          alert("批次ID，供应商ID，货品ID不能同时为空");
          return false;
        }
        if (this.returnValue(this.formData.batchid) === false) {
          this.dtlData.batchid = -1;
        } else {
          this.dtlData.batchid = this.formData.batchid;
        }
        if (this.returnValue(this.formData.supplyid) === false) {
          this.dtlData.supplyid = -1;
        } else {
          this.dtlData.supplyid = this.formData.supplyid;
        }
        if (this.returnValue(this.formData.goodsid) === false) {
          this.dtlData.goodsid = -1;
        } else {
          this.dtlData.goodsid = this.formData.goodsid;
        }
        this.dtlVisible = true;
      } else if (data === "commitbatch") {
        let params = {};
        if ((this.formData.startdate !== null && this.formData.startdate !== '') && (this.formData.endofdate !== null && this.formData.endofdate !== '')) {
          params.startdate = this.formData.startdate;
          params.endofdate = this.formData.endofdate;
        } else {
          alert("请选择日期");
          return false;
        }
        if (this.returnValue(this.formData.cgfz) === false) {
          alert("请选择采购分组");
          return false;
        }
        if (this.returnValue(this.formData.batchid) === false) {
          alert("请选择批号");
          return false;
        }
        params.batchid = this.formData.batchid;
        params.employeeid = Number(sessionStorage['userid']);
        params.groupid = this.formData.cgfz;
        this.$api.replenish.commitJxbhxxcxDoc(params).then(res => {
          if (res.code === 200) {
            if (res.msg === '1') {
              alert("审核成功");
            } else {
              alert(res.data);
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      if (this.returnValue(formData.batchid) === true) {
        params.batchid = formData.batchid;
      }
      if (this.returnValue(formData.supplyid) === true) {
        params.supplyid = formData.supplyid;
      }
      if (this.returnValue(formData.goodsid) === true) {
        params.goodsid = formData.goodsid;
      }
      if (this.returnValue(formData.check1) === true) {
        if (formData.check1 === true) {
          params.check1 = 1;
        }
      }
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (this.returnValue(formData.select2) === true) {
        params.select2 = formData.select2;
      }
      if (this.returnValue(formData.usestatus) === true) {
        params.usestatus = formData.usestatus;
      }
      if (this.returnValue(formData.groupid) === true) {
        params.groupid = formData.groupid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.loading = true;
      this.$api.replenish.selectJxbhxxcxDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.currentPage = res.data.pageNum;
          this.$refs.doctable.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(data) {
      this.dtlType = 1;
      let dtlData = this.dtlData;
      dtlData.orderqty = data.row.orderqty;
      dtlData.goodsid = data.row.goodsid;
      dtlData.addqty = data.row.addqty;
      dtlData.addid = data.row.addid;
      dtlData.batchid = data.row.batchid;
      this.dtlVisible = true;
    },
    openHov(id) {
      if (id === "companyid") {
        this.companyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "batchid") {
        this.batchVisible = true;
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
