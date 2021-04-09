import CdfkAdd from "@/views/Function/Ap/CdfkAdd";
import {selectOption} from "@/utils/functions";
import {selectFklx, selectJsfs} from "@/utils/drops";

export default {
  name: 'Jhfk',
  components: {CdfkAdd},
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'daterange', id1: 'startconfirmdate', id2: 'endofconfirmdate', label: '确认日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 180, labelWidth: 60},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 180, labelWidth: 50},
        {type: 'input', id: 'payid', label: '付款单ID', formWidth: 180, labelWidth: 60},
        {type: 'select', id: 'paytypeid', label: '付款类型', options: [], clearable: true, formWidth: 220, labelWidth: 60},
        {type: 'select', id: 'settlemode', label: '结算方式', options: [], clearable: true, formWidth: 220, labelWidth: 60},
        {
          type: 'select', id: 'usestatus', label: '状态', options: [
            {value: 0, label: '临时'}, {value: 1, label: '确认'}, {value: 2, label: '作废'}
          ], clearable: true, formWidth: 200, labelWidth: 40
        },
        {type: 'input', id: 'sourceid', label: '源单ID', formWidth: 200, labelWidth: 50},
      ],
      formData: {
        startdate: null,
        endofdate: null,
        startconfirmdate: null,
        endofconfirmdate: null,
        supplyid: null,
        goodsid: null,
        payid: null,
        paytypeid: null,
        settlemode: null,
        usestatus: null,
        sourceid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ap:jhfk:select"},
        /* {id:'add',icon:"fa fa-plus", label:"action.add",perms:"financial:cdfk:add"},*/
        {id: 'downloadfkd', icon: "fa fa-download", label: "action.dcfkd", perms: "ap:jhfk:select"},
        {id: 'downloadfkmx', icon: "fa fa-download", label: "action.dcfkmx", perms: "ap:jhfk:select"}
      ],
      docTableHeight: 300,
      loading: false,
      docTableColumns: [
        {indexType: 'selection'},
        {type: 0, prop: 'payid', label: '付款单ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'settlemodename', label: '结算方式', tableStatus: 0},
        {type: 0, prop: 'paytypeid', label: '付款类型', tableStatus: 0},
        {type: 0, prop: 'total', label: '金额', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '状态', tableStatus: 0},
        {type: 5, prop: 'sourceid', label: '源单ID', tableStatus: 0},
        {type: 0, prop: 'qrr', label: '确认人', tableStatus: 0},
        {type: 0, prop: 'invalidmanname', label: '作废人', tableStatus: 0},
        {type: 0, prop: 'sourcetype', label: '源单类型', tableStatus: 0},
        {type: 0, prop: 'payman', label: '付款人', tableStatus: 0},
        {type: 0, prop: 'rppayid', label: '出纳付款单号', tableStatus: 0},
        {type: 0, prop: 'rppayflag', label: '出纳付款标志', tableStatus: 0},
        {type: 0, prop: 'companyid', label: '公司ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '公司名称', tableStatus: 0},
        {type: 0, prop: 'summary', label: '摘要', tableStatus: 0},
        {type: 0, prop: 'confirmmanid', label: '确认人ID', tableStatus: 0},
        {type: 0, prop: 'invalidmanid', label: '作废人ID', tableStatus: 0},
        {type: 0, prop: 'paymanid', label: '付款人ID', tableStatus: 0},
        {type: 2, prop: 'confirmdate', label: '确认日期', tableStatus: 0, width: 150, widthStatus: true},
        {
          prop: 'caozuo', label: '操作', type: 1, fixed: 'right', tableStatus: 0, options: [
            /* {id:'edit',icon:"fa fa-edit", label:"action.edit",perms:"financial:cdfk:select"}*/
          ]
        }
      ],
      docTableData: [],
      dtlSelection: [],
      hjje: 0,
      dtlVisible: false,
      dtlVisibles: true,
      dialogWidth: '800px',
      dtlTableHeight: 300,
      dtlLoading: false,
      dtlTableColumns: [],
      dtlTableData: [],
      bankOptions: [],
      addVisible: false,
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
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 280);
    selectOption(this.formList, 'paytypeid', selectFklx());
    selectOption(this.formList, 'settlemode', selectJsfs());
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
    this.formData.startconfirmdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofconfirmdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    dialogClose() {
      this.dtlVisible = false;
      this.dtlTableData = [];
    },
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === 'add') {
        this.addVisible = true;
      } else if (data === 'downloadfkd') {
        let columns = [];
        this.docTableColumns.map((e, index) => {
          if (index !== 0) {
            columns.push(e);
          }
        });
        this.exportExcelDOM(columns, this.docTableData, '进货付款付款单' + this.getNewDate());
      } else if (data === 'downloadfkmx') {
        let params = [];
        let data = [];
        let columns = [
          {prop: 'sucredate', label: '生成日期'},
          {prop: 'confirmdate', label: '确认日期'},
          {prop: 'payid', label: '付款单ID'},
          {prop: 'supplyid', label: '供应商ID'},
          {prop: 'supplyname', label: '供应商名称'},
          {prop: 'sourceid', label: '结算单ID'},
          {prop: 'paymodename', label: '结算方式'},
          {prop: 'salesmode', label: '经销方式'},
          {prop: 'summary', label: '摘要'},
          {prop: 'invoiceno', label: '发票号'},
          {prop: 'paytypename', label: '类型'},
          {prop: 'total', label: '付款单金额'},
          {prop: 'goodsname', label: '货品ID/品名/规格/产地'},
          {prop: 'unitprice', label: '单价'},
          {prop: 'total_line', label: '金额'},
          {prop: 'taxrate', label: '税率'},
          {prop: 'goodsqty', label: '数量'},
          {prop: 'dtlsucredate', label: '进货日期'},
        ];
        if (this.dtlSelection.length === 0) {
          alert("没有选择数据，不能导出！");
          return false;
        } else {
          this.dtlSelection.forEach(e => {
            params.push(e.payid);
            if (e.usestatusname !== '确认') {
              alert("状态不为确认无法导出");
              return false;
            }
          })
        }
        this.$api.ap.downloadmx({inpayid: params.toString()}).then(res => {
          if (res.code === 200) {
            data = Object.freeze(res.data);
            this.exportExcelDOM(columns, data, '进货付款付款明细' + this.getNewDate());
          }
        }).catch(error => {
          this.loading = false;
          return false;
        });
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pagesize);
    },
    selectDoc(pageNum, pagesize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== "endofdate" && e !== "startconfirmdate" && e !== "endofconfirmdate") {
          if (formData[e] !== null && formData[e] !== "") {
            params[e] = formData[e];
          }
        }
      });
      if (formData.startdate !== null && formData.startdate !== "") {
        params.startdate = formData.startdate;
      }
      if (formData.endofdate !== null && formData.endofdate !== "") {
        params.endofdate = formData.endofdate;
      }
      if (formData.startconfirmdate !== null && formData.startconfirmdate !== "") {
        params.startconfirmdate = formData.startconfirmdate;
      }
      if (formData.endofconfirmdate !== null && formData.endofconfirmdate !== "") {
        params.endofconfirmdate = formData.endofconfirmdate;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.docTableData = [];
      this.hjje = 0;
      this.loading = true;
      this.$api.ap.selectJhfk({pageNum: pageNum, pageSize: pagesize, params: params}).then(res => {
        if (res.code === 200) {
          this.docTableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.currentPage = res.data.pageNum;
          this.$refs.doctable.total = res.data.totalSize;
          this.$api.ap.selectJhfkJe(params).then(res => {
            if (res.code === 200) {
              this.hjje = Object.freeze(res.data.total);
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
    handleFunction(data) {
      this.$api.ap.selectdtl({bindid: data.row.bindid}).then(res => {
        if (res.code === 200) {
          this.dtlTableData = Object.freeze(res.data);
          this.dtlVisible = true;
        }
      }).catch(error => {
        return false;
      })
    },
    openA(data) {
      this.dtlTableData = [];
      this.dtlLoading = true;
      if (data.row.paytypeid === 1) {
        this.dtlTableColumns = [
          {type: 0, prop: 'susetdtlid', label: '采购细单ID', tableStatus: 0},
          {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
          {type: 0, prop: 'goodsname', label: '货品名称', tableStatus: 0},
          {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
          {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
          {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
          {type: 0, prop: 'goodsqty', label: '数量', tableStatus: 0},
          {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
          {type: 0, prop: 'total_line', label: '金额', tableStatus: 0}
        ];
        this.$api.ap.selectYdxdOrder({orderid: data.row.sourceid}).then(res => {
          if (res.code === 200) {
            this.dtlTableData = Object.freeze(res.data);
            this.dtlLoading = false;
            this.dtlVisible = true;
          }
        }).catch(error => {
          this.dtlLoading = false;
          return false;
        })
      } else {
        this.dtlTableColumns = [
          {type: 0, prop: 'susetdtlid', label: '结算细单ID', tableStatus: 0},
          {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
          {type: 0, prop: 'goodsname', label: '货品名称', tableStatus: 0},
          {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
          {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
          {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
          {type: 0, prop: 'goodsqty', label: '数量', tableStatus: 0},
          {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
          {type: 0, prop: 'total_line', label: '金额', tableStatus: 0}
        ];
        this.$api.ap.selectYdxd({susetdocid: data.row.sourceid}).then(res => {
          if (res.code === 200) {
            this.dtlTableData = Object.freeze(res.data);
            this.dtlLoading = false;
            this.dtlVisible = true;
          }
        }).catch(error => {
          this.dtlLoading = false;
          return false;
        })
      }
    },
    selectionChange(val) {
      this.dtlSelection = val;
    },
    openHov(data) {
      if (data === 'supplyid') {
        this.supplyVisible = true;
      } else if (data === 'goodsid') {
        this.goodsVisible = true;
      }
    }
  }
}
