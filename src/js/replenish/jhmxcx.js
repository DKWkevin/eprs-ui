import {selectOption} from "@/utils/functions";

export default {
  name: 'Jhmxcx',
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', labelWidth: 60, formWidth: 160},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', labelWidth: 50, formWidth: 160},
        {
          type: 'select',
          id: 'doctypeid',
          label: '单据类型',
          options: [{value: 2, label: '退货'}, {value: 1, label: '进货'}],
          clearable: true
        },
        {type: 'select', id: 'buyerid', label: '采购支持', options: [], clearable: true},
        {
          type: 'select',
          id: 'deptid',
          label: '采购部门',
          options: [{value: 6, label: '批发采购'}, {value: 83672, label: '零售采购'}],
          clearable: true
        },
        {type: 'input', id: 'sudocid', label: '进货单ID'},
        {type: 'inputHov', id: 'companyidhz', label: '合作伙伴ID'},
        {type: 'inputHov', id: 'employeenamehz', label: '合作伙伴采购经理'},
        {type: 'input', id: 'lotno', label: '批号'},
        {type: 'input', id: 'orderid', label: '订单ID'},
        {type: 'input', id: 'ingoodsid', label: '货品ID(逗号间隔)'},
        {type: 'inputHov', id: 'sudeptid', label: '进货部门ID'}
      ],
      formData: {
        sudocid: null,
        goodsid: null,
        doctypeid: null,
        supplyid: null,
        buyerid: null,
        deptid: null,
        companyidhz: null,
        employeenamehz: null,
        lotno: null,
        orderid: null,
        ingoodsid: null,
        sudeptid: null,
        startdate: null,
        endofdate: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:jhmxcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:jhmxcx:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'dhzy', label: '订货专员', type: 0, tableStatus: 0},
        {prop: 'sudocid', label: '进货单ID', type: 0, tableStatus: 0},
        {prop: 'credate', label: '进货日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品id', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'orderid', label: '订单id', type: 0, tableStatus: 0},
        {prop: 'lotno', label: '批号', type: 0, tableStatus: 0},
        {prop: 'inbatchid', label: '内部批次ID', type: 0, tableStatus: 0},
        {prop: 'goodsqty', label: '数量', type: 0, tableStatus: 0},
        {prop: 'unitprice', label: '单价', type: 0, tableStatus: 0},
        {prop: 'total_lines', label: '金额', type: 0, tableStatus: 0},
        {prop: 'thmemo', label: '退货备注', type: 0, tableStatus: 0},
        {prop: 'htmemo', label: '合同备注', type: 0, tableStatus: 0},
        {prop: 'deptid', label: '采购部门ID', type: 0, tableStatus: 0},
        {prop: 'pcdeptname', label: '采购部门', type: 0, tableStatus: 0},
        {prop: 'companyidhz', label: '合作伙伴ID', type: 0, tableStatus: 0},
        {prop: 'companynamehz', label: '合作伙伴', type: 0, tableStatus: 0},
        {prop: 'employeenamehz', label: '合作伙伴采购经理', type: 0, tableStatus: 0},
        {prop: 'paymodename', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'sudeptid', label: '进货部门id', type: 0, tableStatus: 0},
        {prop: 'sudeptname', label: '进货部门', type: 0, tableStatus: 0}
      ],
      tableData: [],
      total: 0,
      totalStatus: false,
      inLine: true,
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
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      companyVisible: false,
      companyHov: {
        hovTitle: '合作伙伴查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'companyVisible',
        hovColumns:
          [
            {id: "customid", name: "合作伙伴ID", queryStatus: true, dataStatus: 2, fillid: "companyidhz"},
            {id: "customname", name: "合作伙伴名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "合作伙伴操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      employeeVisible: false,
      employeeHov: {
        hovTitle: '合作伙伴采购经理查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'employeeVisible',
        hovColumns:
          [
            {id: "employeeid", name: "采购经理ID", queryStatus: true, dataStatus: 2, fillid: "employeenamehz"},
            {id: "employeename", name: "采购经理名称", queryStatus: true, dataStatus: 1},
            {id: "employeeopcode", name: "采购经理操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      deptVisible: false,
      deptHov: {
        hovTitle: '进货部门查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'deptVisible',
        hovColumns:
          [
            {id: "companyid", name: "进货部门ID", queryStatus: true, dataStatus: 2, fillid: "sudeptid"},
            {id: "companyname", name: "进货部门名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "进货部门操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 280);
    this.$api.replenish.selectGysthxxwhBuyid({pageNum: 1, pageSize: 999, params: null}).then(res => {
      if (res.code === 200) {
        let params = [];
        res.data.forEach(e => {
          let tel = {};
          tel.value = e.buyerid;
          tel.label = e.buyername;
          params.push(tel);
        });
        selectOption(this.formList, 'buyerid', params);
      }
    }).catch(error => {
      return false;
    });
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '进货明细查询' + this.getNewDate());
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      let sum = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" || e !== "endofdate") {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
            sum[e] = formData[e];
          } else {
            sum[e] = null;
          }
        }
      });
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
        sum.startdate = formData.startdate;
      } else {
        sum.startdate = null;
        sum.endofdate = null;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
        sum.endofdate = formData.endofdate;
      } else {
        sum.startdate = null;
        sum.endofdate = null;
      }
      params.companyid = Number(sessionStorage['companyid']);
      sum.companyid = Number(sessionStorage['companyid']);
      /*  if(Object.keys(params).length===0){
          params=null;
        }*/
      this.loading = true;
      this.tableData = [];
      this.$api.replenish.selectJhdcxjhmx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          let data = res.data;
          this.$api.replenish.selectJhMxcxsum(sum).then(res => {
            if (res.code === 200) {
              this.total = res.data;
              this.tableData = Object.freeze(data.content);
              this.$refs.doctable.pageSize = data.pageSize;
              this.$refs.doctable.currentPage = data.pageNum;
              this.$refs.doctable.total = data.totalSize;
              this.totalStatus = true;
              this.loading = false;
            }
          }).catch(error => {
            this.loading = false;
            return false;
          });
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
      } else if (id === "companyidhz") {
        this.companyVisible = true;
      } else if (id === "employeenamehz") {
        this.employeeVisible = true;
      } else if (id === "sudeptid") {
        this.deptVisible = true;
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
