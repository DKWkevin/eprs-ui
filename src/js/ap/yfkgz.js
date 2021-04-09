export default {
  name: 'Zgzcx',
  data() {
    return {
      collapse: false,
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '创建日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 200, labelWidth: 65},
        {type: 'input', id: 'payid', label: '付款单ID'},
        {
          type: 'select', id: 'htzt', label: '合同状态', clearable: true, options: [
            {value: 0, label: '作废'}, {value: 1, label: '确认'}, {value: 2, label: '临时'}, {
              value: 3,
              label: '完成'
            }, {value: 4, label: '终止'}
          ]
        },
      ],
      formData: {
        startdate: null,
        endofdate: null,
        supplyid: null,
        goodsid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ap:yfkgz:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ap:yfkgz:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'payid', label: '付款单ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'total', label: '金额', tableStatus: 0},
        {type: 0, prop: 'sourceid', label: '合同ID', tableStatus: 0},
        {type: 0, prop: 'htztname', label: '合同状态', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '预付单状态', tableStatus: 0},
        {type: 0, prop: 'ifkpf', label: '是否开发票', tableStatus: 0},
        {
          type: 1, prop: 'caozuo', label: '操作', fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "ap:yfkgz:select"}
          ]
        }
      ],
      tableData: [],
      tableHeight: 0,
      loading: false,
      dtlVisible: false,
      dtlVisibles: true,
      dtlTitle: '明细查询',
      dialogTop: '12vh',
      dialogWidth: '1000px',
      dtlloading: false,
      dtlTableColumns: [
        {type: 0, prop: 'orderid', label: '合同ID', tableStatus: 0},
        {type: 0, prop: 'orderdtlid', label: '细单ID', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '货品名称', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'planqty', label: '应订数量', tableStatus: 0},
        {type: 0, prop: 'realqty', label: '实订数量', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
        {type: 0, prop: 'total_lines', label: '金额', tableStatus: 0},
        {type: 0, prop: 'sumarriveqty', label: '累计到货数量', tableStatus: 0},
        {type: 0, prop: 'arrivaldate', label: '到货日期', tableStatus: 0},
        {type: 0, prop: 'finishflagname', label: '完成标志', tableStatus: 0},
        {type: 0, prop: 'earlydate', label: '最早生产日期', tableStatus: 0},
        {type: 0, prop: 'specialreq', label: '特殊质量要求', tableStatus: 0},
        {type: 0, prop: 'baseunitqty', label: '包装大小', tableStatus: 0},
        {type: 0, prop: 'paymode', label: '付款方式', tableStatus: 0},
        {type: 0, prop: 'paymodename', label: '付款方式', tableStatus: 0},
        {type: 0, prop: 'payterm', label: '账期', tableStatus: 0},
        {type: 0, prop: 'salesmode', label: '经销方式', tableStatus: 0},
        {type: 0, prop: 'invalidman', label: '作废人', tableStatus: 0},
        {type: 0, prop: 'invalidday', label: '作废日期', tableStatus: 0},
        {type: 0, prop: 'orderid2', label: '订单ID', tableStatus: 0},
        {type: 0, prop: 'channelid', label: '渠道ID', tableStatus: 0},
        {type: 0, prop: 'taxrate', label: '税率', tableStatus: 0},
        {type: 0, prop: 'opcode', label: '操作码', tableStatus: 0},
        {type: 0, prop: 'memo', label: '备注', tableStatus: 0},
        {type: 0, prop: 'ifkpfdtl', label: '是否开发票', tableStatus: 0},
      ],
      dtlData: [],
      dtlHeight: 300,
      supplyVisible: false,
      supplyHovData: {
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
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === 'download') {
        this.exportExcelDOM(this.tableColumns, this.tableData, '预付款跟踪' + this.getNewDate());
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== "startdate") {
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
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.tableData = [];
      this.loading = true;
      this.$api.ap.selectYfkgz({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    handle(data) {
      this.dtlVisible = true;
      this.dtlloading = true;
      this.$api.ap.selectYfkgzDtl({orderid: data.row.sourceid}).then(res => {
        if (res.code === 200) {
          let data = [];
          res.data.forEach(e => {
            e.orderid2 = e.orderid;
            data.push(e);
          });
          this.dtlData = data;
          this.dtlloading = false;
        }
      }).catch(error => {
        this.dtlloading = false;
        return false;
      })
    },
    queryHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      }
    },
    closeDialog() {
      this.dtlData = [];
      this.dtlVisible = false;
    }
  }
}
