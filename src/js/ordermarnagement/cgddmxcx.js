import {selectDdl, selectOption} from "@/utils/functions";
import {selectbuyid, selectHsy} from "@/utils/drops";

export default {
  name: 'Cgddmxcx',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ordermanagement:cgddmxcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ordermanagement:cgddmxcx:select"}
      ],
      formList: [
        {type: 'inputNumber', id: 'orderid', label: '订单ID', formWidth: 200, labelWidth: 50},
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 200, labelWidth: 50},
        {type: 'check', id: 'dhzqwdh', label: '未到货', formWidth: 120, trueLabel: 1, falseLabel: ''},
        {
          type: 'select', id: 'finishflag', label: '状态', options: [
            {value: "0", label: '未完成'},
            {value: "1", label: '完成'},
            {value: "2", label: '执行'},
            {value: "3", label: '作废'},
            {value: "4", label: '终止'}
          ], clearable: true
        },
        {type: 'inputHov', id: 'supplyid', label: '供应商', formWidth: 200, labelWidth: 50},
        {type: 'select', id: 'checker', label: '核算员', options: [], clearable: true},
        {type: 'select', id: 'buyerid', label: '采购支持', options: [], clearable: true},
        {
          type: 'select',
          id: 'pcdeptid',
          label: '采购部门',
          options: [{value: 6, label: '批发采购'}, {value: 83672, label: '零售采购'}],
          clearable: true
        },
        {type: 'inputHov', id: 'inputmanid', label: '录入人', formWidth: 200, labelWidth: 50},
        {type: 'select', id: 'paymode', label: '付款方式', options: [], clearable: true},
      ],
      formData: {
        orderid: null,
        startdate: null,
        endofdate: null,
        goodsid: null,
        dhzqwdh: null,
        finishflag: null,
        supplyid: null,
        checker: null,
        buyerid: null,
        pcdeptid: null,
        inputmanid: null,
        paymode: null
      },
      loading: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'orderid', label: '订单ID', type: 0, tableStatus: 0},
        {prop: 'credate', label: '日期', type: 2, tableStatus: 0, widthStatus: true, width: 150},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'total', label: '金额', type: 0, tableStatus: 0},
        {prop: 'usestatusname', label: '状态', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'realqty', label: '实订数量', type: 0, tableStatus: 0},
        {prop: 'planqty', label: '合同数量', type: 0, tableStatus: 0},
        {prop: 'unitprice', label: '单价', type: 0, tableStatus: 0},
        {prop: 'total_lines', label: '金额', type: 0, tableStatus: 0},
        {prop: 'buyer', label: '采购支持', type: 0, tableStatus: 0},
        {prop: 'memo', label: '备注', type: 0, tableStatus: 0},
        {prop: 'sumarriveqty', label: '入库数量', type: 0, tableStatus: 0},
        {prop: 'remqty', label: '合同余额', type: 0, tableStatus: 0},
        {prop: 'tmpgoodsqty', label: '合同占用余额', type: 0, tableStatus: 0},
        {prop: 'goodddlname', label: '货品状态', type: 0, tableStatus: 0},
        {prop: 'paymodename', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'pcdeptname', label: '采购部门', type: 0, tableStatus: 0},
        {prop: 'hbid', label: '合作伙伴ID', type: 0, tableStatus: 0},
        {prop: 'hbname', label: '合作伙伴名称', type: 0, tableStatus: 0},
        {prop: 'hbcgjl', label: '合作伙伴采购经理', type: 0, tableStatus: 0},
        {prop: 'checker', label: '核算员', type: 0, tableStatus: 0},
        {prop: 'diff', label: '差异数量', type: 0, tableStatus: 0},
        {prop: 'dhzq', label: '到货周期', type: 0, tableStatus: 0}
      ],
      docTableData: [],
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
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      inputmanVisible: false,
      inputmanHov: {
        hovTitle: '录入人查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'inputmanVisible',
        hovColumns:
          [
            {id: "employeeid", name: "录入人ID", queryStatus: true, dataStatus: 2, fillid: "inputmanid"},
            {id: "employeename", name: "录入人名称", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    selectOption(this.formList, 'checker', selectHsy());
    selectOption(this.formList, 'buyerid', selectbuyid());
    selectDdl(this.formList, 'id', 'paymode', 'AP_PAYMODE');
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.docTableColumns, this.docTableData, '采购订单明细查询' + this.getNewDate())
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
        if (e !== "startdate" && e !== 'endofdate') {
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
      if (this.returnValue(formData.dhzqwdh) === true) {
        if (formData.dhzqwdh === true) {
          params.dhzqwdh = 1;
        }
      }
      if (Object.keys(params).length === 0) {
        alert("请填写查询条件");
        return false;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.docTableData = [];
      this.loading = true;
      this.$api.ordermanagement.selectCgddmxcxDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
      } else if (id === "inputmanid") {
        this.inputmanVisible = true;
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
