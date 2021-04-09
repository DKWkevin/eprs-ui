import {selectbuyid} from "@/utils/drops";

export default {
  name: 'Pscqwcl',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishmentexception:pscqwcl:select"}
      ],
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'input', id: 'sudocid', label: '进货总单ID', formWidth: 200, labelWidth: 80},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 200, labelWidth: 60},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 200, labelWidth: 50},
        {type: 'input', id: 'cgys', label: '超过月数'}
      ],
      formData: {startdate: null, endofdate: null, sudocid: null, supplyid: null, goodsid: null, cgys: null},
      loading: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'sudocid', label: '总单ID', type: 0, tableStatus: 0},
        {prop: 'sudocdtlid', label: '细单ID', type: 0, tableStatus: 0},
        {prop: 'credate', label: '日期', type: 2, tableStatus: 0, widthStatus: true, width: 150},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'sudeptid', label: '配送部门ID', type: 0, tableStatus: 0},
        {prop: 'psbm', label: '配送部门名称', type: 0, tableStatus: 0},
        {prop: 'cgys', label: '超过月数', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名/规格/单位/产地', type: 0, tableStatus: 0},
        {prop: 'orderdtlid', label: '订货明细ID', type: 0, tableStatus: 0},
        {prop: 'taxrate', label: '税率', type: 0, tableStatus: 0},
        {prop: 'goodsqty', label: '数量', type: 0, tableStatus: 0},
        {prop: 'remqty', label: '库存', type: 0, tableStatus: 0},
        {prop: 'unitprice', label: '单价', type: 0, tableStatus: 0},
        {prop: 'total_lines', label: '金额', type: 0, tableStatus: 0},
        {prop: 'costingmoney', label: '成本', type: 0, tableStatus: 0},
        {prop: 'taxmoney', label: '税额', type: 0, tableStatus: 0},
        {prop: 'stdeptid', label: '报关单位ID', type: 0, tableStatus: 0},
        {prop: 'stareaid', label: '仓储区域ID', type: 0, tableStatus: 0},
        {prop: 'outbatchid', label: '外部批次ID', type: 0, tableStatus: 0},
        {prop: 'inbatchid', label: '内部批次ID', type: 0, tableStatus: 0},
        {prop: 'lotid', label: '批号ID', type: 0, tableStatus: 0},
        {prop: 'posid', label: '货位', type: 0, tableStatus: 0},
        {prop: 'buyerid', label: '采购员ID', type: 0, tableStatus: 0},
        {prop: 'buyer', label: '采购员', type: 0, tableStatus: 0},
        {prop: 'operator', label: '操作员ID', type: 0, tableStatus: 0},
        {prop: 'operatorname', label: '操作员', type: 0, tableStatus: 0},
        {prop: 'doctypename', label: '单据类型', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经销方式', type: 0, tableStatus: 0},
        {prop: 'paymodename', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'hbcgjl', label: '采购经理', type: 0, tableStatus: 0}
      ],
      docTableData: [],
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
      }
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    this.formList[2].options = selectbuyid();
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = {};
      let formData = this.formData;
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (this.returnValue(formData.sudocid) === true) {
        params.sudocid = formData.sudocid;
      }
      if (this.returnValue(formData.supplyid) === true) {
        params.supplyid = formData.supplyid;
      }
      if (this.returnValue(formData.goodsid) === true) {
        params.goodsid = formData.goodsid;
      }
      if (this.returnValue(formData.cgys) === true) {
        params.cgys = formData.cgys;
      }
      if (Object.keys(params).length === 0) {
        alert("请填写查询条件");
        return false;
      }
      this.docTableData = [];
      this.loading = true;
      this.$api.replenishmentexception.selectCscqwcl({
        pageNum: pageNum,
        pageSize: pageSize,
        params: params
      }).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
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
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
