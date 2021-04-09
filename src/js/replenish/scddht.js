import {selectDdl} from "@/utils/functions";

export default {
  name: 'Scddht',
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 220, labelWidth: 60},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 220, labelWidth: 50},
        {type: 'select', id: 'buyerid', label: '采购支持', options: [], clearable: true},
        {type: 'select', id: 'goodsusestatus', label: '货品状态', options: []}
      ],
      formData: {
        startdate: null,
        endofdate: null,
        supplyid: null,
        goodsid: null,
        buyerid: null,
        goodsusestatus: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:scddht:select"},
        {id: 'scht', icon: "fa fa-plus", label: "action.scht", perms: "replenishment:scddht:add"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:scddht:select"}
      ],
      tableHeight: 300,
      pageStatus: false,
      loading: false,
      tableColumns: [
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'buyername', label: '采购支持', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品id', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0, width: 160, widthStatus: true},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0, width: 120, widthStatus: true},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0, width: 180, widthStatus: true},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'sutaxrate', label: '进货税率', type: 0, tableStatus: 0},
        {prop: 'usestatus', label: '货品状态', type: 0, tableStatus: 0},
        {prop: 'dgsl', label: '订购数量', type: 0, tableStatus: 0},
        {prop: 'htsl', label: '合同数量', type: 0, tableStatus: 0},
        {prop: 'wfpsl', label: '未分配数量', type: 0, tableStatus: 0},
        {prop: 'lskc', label: '连锁库存', type: 0, tableStatus: 0},
        {prop: 'pfkc', label: '批发库存', type: 0, tableStatus: 0},
        {prop: 'sydb', label: '上月调拨', type: 0, tableStatus: 0},
        {prop: 'qydb', label: '前期调拨', type: 0, tableStatus: 0},
        {prop: 'sysx', label: '上月实销', type: 0, tableStatus: 0},
        {prop: 'qqsx', label: '前期实销', type: 0, tableStatus: 0},
        {prop: 'zxcolumn1', label: '说明', type: 0, tableStatus: 0, width: 180, widthStatus: true},
        {prop: 'qhsl', label: '请货数量', type: 0, tableStatus: 0},
        {prop: 'suprice', label: '渠道进价', type: 0, tableStatus: 0},
        {prop: 'dge', label: '订购额', type: 0, tableStatus: 0},
        {prop: 'kce', label: '库存额', type: 0, tableStatus: 0},
        {prop: 'lmcompanyid', label: '物流单位ID', type: 0, tableStatus: 0},
        {prop: 'buyerid', label: '采购支持ID', type: 0, tableStatus: 0},
        {prop: 'dhzq', label: '到货周期', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经销方式', type: 0, tableStatus: 0},
        {prop: 'paymode', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'payterm', label: '账期', type: 0, tableStatus: 0},
      ],
      tableData: [],
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
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    selectDdl(this.formList, 'id', 'goodsusestatus', 'GOODS_USESTATUS');
    this.formData.startdate = this.getNewDate(0);
    this.formData.endofdate = this.getNewDate(1);
    this.$api.hov.selectBuyid({pageNum: 1, pageSize: 999, params: null}).then(res => {
      if (res.code === 200) {
        let params = [];
        res.data.forEach(e => {
          let tel = {};
          tel.value = e.buyerid;
          tel.label = e.buyername;
          params.push(tel);
        });
        this.formList[3].options = params;
      }
    }).catch(error => {
      return false;
    });
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        this.selectDoc();
      } else if (data === 'scht') {
        this.schtUpdate();
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '生成订单合同' + this.getNewDate());
      }
    },
    selectDoc() {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" || e !== "endofdate") {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
          }
        }
      });
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      } else {
        alert("请填写日期");
        return false;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      } else {
        alert("请填写日期");
        return false;
      }
      this.loading = true;
      this.tableData = [];
      this.$api.replenish.selectScddht(params).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data);
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    schtUpdate() {
      let inputmanid = Number(sessionStorage['userid']);
      let inputmanname = sessionStorage['username'];
      let companyid = Number(sessionStorage['companyid']);
      let params = [];
      this.tableData.map((e, index) => {
        if (e.dgsl > 0) {
          let scddhtinsertdoc = {};
          scddhtinsertdoc.lmcompanyid = e.lmcompanyid;
          scddhtinsertdoc.supplyid = e.supplyid;
          scddhtinsertdoc.paymode = e.paymode;
          scddhtinsertdoc.payterm = e.payterm;
          scddhtinsertdoc.salesmode = e.salesmode;
          scddhtinsertdoc.companyid = companyid;
          scddhtinsertdoc.inputmanid = inputmanid;
          scddhtinsertdoc.inputmanname = inputmanname;
          scddhtinsertdoc.planqty = e.dgsl;
          scddhtinsertdoc.realqty = e.dgsl;
          scddhtinsertdoc.unitprice = e.suprice;
          scddhtinsertdoc.goodsid = e.goodsid;
          params.push(scddhtinsertdoc);
        }
      });
      this.$api.replenish.inserScddht({params: params}).then(res => {
        if (res.code === 200) {
          if (res.msg === "1") {
            alert("保存成功");
          } else {
            alert(res.data);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      }
    },
    getNewDate(type) {
      let date = new Date();
      let year = date.getFullYear().toString();       // 年
      let month = date.getMonth().toString();    // 月
      let day = date.getDate().toString();          // 日
      if (type === 0) {
        if (month !== 1 || month !== '01') {
          month = month - 1;
        }
        return new Date(year, month, day, 0, 0, 0);
      } else if (type === 1) {
        return new Date(year, month, day, 23, 59, 59);
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
