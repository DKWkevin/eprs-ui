import {selectFkfs, selectHsy} from "@/utils/drops";
import {selectOption} from "@/utils/functions";

export default {
  name: 'Jhjsmxcx',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ap:jhjsmxcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ap:jhjsmxcx:select"}
      ],
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'input', id: 'susetdocid', label: '结算单ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {
          type: 'select',
          id: 'usestatus',
          label: '状态',
          options: [{value: 0, label: '临时'}, {value: 1, label: '确认'}, {value: 2, label: '合并'}, {value: 3, label: '作废'}],
          clearable: true
        },
        {type: 'select', id: 'checker', label: '核算员', options: [], clearable: true},
        {
          type: 'select',
          id: 'payflag',
          label: '付款完成标志',
          options: [{value: 0, label: '未付'}, {value: 1, label: '已付'}, {value: 2, label: '不付'}],
          clearable: true
        },
        {type: 'select', id: 'paymode', label: '付款方式', options: [], clearable: true},
      ],
      formData: {
        susetdocid: null,
        startdate: null,
        endofdate: null,
        supplyid: null,
        goodsid: null,
        usestatus: null,
        checker: null,
        payflag: null,
        paymode: null
      },
      loading: false,
      docTableHeight: 0,
      tableColumns: [
        {indexType: 'selection'},
        {type: 0, prop: 'susetdocid', label: '结算单ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 2, prop: 'sucredate', label: '进货日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'goodsqty', label: '数量', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
        {type: 0, prop: 'total_line', label: '金额', tableStatus: 0},
        {type: 0, prop: 'doctypename', label: '单据类型', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '状态', tableStatus: 0},
        {type: 0, prop: 'settlemodename', label: '结算方式', tableStatus: 0},
        {type: 0, prop: 'paymodename', label: '付款方式', tableStatus: 0},
        {type: 0, prop: 'buydeptname', label: '进货部门', tableStatus: 0},
        {type: 0, prop: 'payflagname', label: '付款完成标志', tableStatus: 0},
        {type: 2, prop: 'paycredate', label: '付款日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'checker', label: '核算员', tableStatus: 0},
        {type: 0, prop: 'hbid', label: '合作伙伴ID', tableStatus: 0},
        {type: 0, prop: 'hbname', label: '合作伙伴名称', tableStatus: 0},
        {type: 0, prop: 'hbcgjl', label: '合作伙伴采购经理', tableStatus: 0},
        {type: 0, prop: 'inputman', label: '结算员', tableStatus: 0},
        {type: 0, prop: 'invoiceno', label: '发票号', tableStatus: 0},
      ],
      tableData: [],
      jehj: 0,
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
    this.docTableHeight = (window.innerHeight - 280);
    selectOption(this.formList, 'checker', selectHsy());
    selectOption(this.formList, 'paymode', selectFkfs());
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '进货结算明细查询' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = {};
      let formData = this.formData;
      Object.keys(formData).forEach(e => {
        if (e !== "querydate") {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
          }
        }
      });
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (Object.keys(params).length === 0) {
        alert("请输入查询条件");
        return false;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.loading = true;
      this.$api.ap.selectJhjsmxcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content;
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
    selectionChange(val) {
      this.jehj = 0;
      val.forEach(e => {
        this.jehj = this.jehj + e.total_line;
      });
      this.jehj = this.jehj.toFixed(2);
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
