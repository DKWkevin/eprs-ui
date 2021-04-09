export default {
  name: 'Zgzcx',
  data() {
    return {
      collapse: false,
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '创建日期'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 200, labelWidth: 45},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 200, labelWidth: 65},
      ],
      formData: {
        startdate: null,
        endofdate: null,
        supplyid: null,
        goodsid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.cxye", perms: "ap:zgzcx:select"},
        {id: 'download1', icon: "fa fa-download", label: "action.dcye", perms: "ap:zgzcx:select"},
        {id: 'dtl', icon: "fa fa-edit", label: "action.dtl", perms: "ap:zgzcx:select"},
        {id: 'download2', icon: "fa fa-download", label: "action.dcmx", perms: "ap:zgzcx:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'estimateid', label: '暂估ID', tableStatus: 0},
        {type: 2, prop: 'sucredate', label: '进货日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'taxrate', label: '税率', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
        {type: 0, prop: 'remqty', label: '数量', tableStatus: 0},
        {type: 0, prop: 'remmoney', label: '金额', tableStatus: 0},
        {type: 0, prop: 'sudocid', label: '进货单ID', tableStatus: 0},
        {type: 0, prop: 'sourceid', label: '原单ID', tableStatus: 0},
        {type: 0, prop: 'doctypename', label: '原单类型', tableStatus: 0},
        {type: 0, prop: 'inbatchid', label: '内部批次ID', tableStatus: 0},
        {type: 0, prop: 'outbatchid', label: '外部批次ID', tableStatus: 0},
        {type: 0, prop: 'lotno', label: '批号', tableStatus: 0},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'paymode', label: '付款方式', tableStatus: 0},
        {
          type: 1, prop: 'caozuo', label: '操作', fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "ap:zgzcx:select"}
          ]
        }
      ],
      tableData: [],
      hjje: 0,
      tableHeight: 0,
      loading: false,
      dtlVisible: false,
      dtlVisibles: true,
      dtlTitle: '明细查询',
      dialogTop: '12vh',
      dialogWidth: '1000px',
      dtlloading: false,
      dtlTableColumns: [
        {type: 0, prop: 'estimateid', label: '暂估ID', tableStatus: 0},
        {type: 2, prop: 'sucredate', label: '进货日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'addqty', label: '增加数量', tableStatus: 0},
        {type: 0, prop: 'addmoney', label: '增加金额', tableStatus: 0},
        {type: 0, prop: 'decqty', label: '减少数量', tableStatus: 0},
        {type: 0, prop: 'decmoney', label: '减少金额', tableStatus: 0},
        {type: 0, prop: 'summary', label: '摘要', tableStatus: 0},
        {type: 0, prop: 'sudocid', label: '进货单ID', tableStatus: 0},
        {type: 0, prop: 'sourceid', label: '原单ID', tableStatus: 0},
        {type: 0, prop: 'doctypename', label: '原单类型', tableStatus: 0},
        {type: 0, prop: 'inbatchid', label: '内部批次ID', tableStatus: 0},
        {type: 0, prop: 'outbatchid', label: '外部批次ID', tableStatus: 0},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0}
      ],
      dtlData: [],
      dtlHeight: 300,
      alladdmoney: 0,
      alldecmoney: 0,
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
    this.tableHeight = (window.innerHeight - 280);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === 'download1') {
        this.exportExcelDOM(this.tableColumns, this.tableData, '暂估帐余额' + this.getNewDate());
      } else if (data === 'dtl') {
        this.dtlVisible = true;
        this.dtlloading = true;
        let formData = this.formData;
        let params = {};
        Object.keys(formData).forEach(e => {
          if (e !== "startdate" && e !== "endofdate") {
            if (formData[e] !== null && formData[e] !== "") {
              params[e] = formData[e];
            }
          }
        });
        if (Object.keys(params).length === 0) {
          alert("货品ID和供应商ID不能同时为空！");
          return false;
        }
        if (formData.startdate !== null && formData.startdate !== "") {
          params.startdate = formData.startdate;
        }
        if (formData.endofdate !== null && formData.endofdate !== "") {
          params.endofdate = formData.endofdate;
        }
        this.$api.ap.selectZgzcxQueryDtl(params).then(res => {
          if (res.code === 200) {
            this.dtlData = res.data;
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          return false;
        })
      } else if (data === 'download2') {
        let columns = [
          {prop: 'estimateid', label: '暂估ID'},
          {prop: 'sucredate', label: '进货日期'},
          {prop: 'goodsid', label: '货品ID'},
          {prop: 'goodsname', label: '品名'},
          {prop: 'goodstype', label: '规格'},
          {prop: 'goodsunit', label: '单位'},
          {prop: 'prodarea', label: '产地'},
          {prop: 'addqty', label: '增加数量'},
          {prop: 'addmoney', label: '增加金额'},
          {prop: 'decqty', label: '减少数量'},
          {prop: 'decmoney', label: '减少金额'},
          {prop: 'summary', label: '摘要'},
          {prop: 'sudocid', label: '进货单ID'},
          {prop: 'sourceid', label: '原单ID'},
          {prop: 'doctypename', label: '原单类型'},
          {prop: 'inbatchid', label: '内部批次ID'},
          {prop: 'outbatchid', label: '外部批次ID'},
          {prop: 'supplyid', label: '供应商ID'},
          {prop: 'supplyname', label: '供应商名称'},
        ];
        let formData = this.formData;
        let params = {};
        Object.keys(formData).forEach(e => {
          if (e !== "startdate" && e !== "endofdate") {
            if (formData[e] !== null && formData[e] !== "") {
              params[e] = formData[e];
            }
          }
        });
        if (Object.keys(params).length === 0) {
          alert("货品ID和供应商ID不能同时为空！");
          return false;
        }
        if (formData.startdate !== null && formData.startdate !== "") {
          params.startdate = formData.startdate;
        }
        if (formData.endofdate !== null && formData.endofdate !== "") {
          params.endofdate = formData.endofdate;
        }
        this.$api.ap.selectZgzcxQueryDtl(params).then(res => {
          if (res.code === 200) {
            this.exportExcelDOM(columns, res.data, '暂估帐明细' + this.getNewDate());
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
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== "endofdate") {
          if (formData[e] !== null && formData[e] !== "") {
            params[e] = formData[e];
          }
        }
      });
      if (Object.keys(params).length === 0) {
        alert("货品ID和供应商ID不能同时为空！");
        return false;
      }
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
      this.$api.ap.selectZgzcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.currentPage = res.data.pageNum;
          this.$refs.doctable.total = res.data.totalSize;
          this.$api.ap.selectZgzcxJe(params).then(res => {
            if (res.code === 200) {
              this.hjje = res.data.total;
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
    handle(data) {
      this.dtlVisible = true;
      this.dtlloading = true;
      this.$api.ap.selectZgzcxDtl({estimateid: data.row.estimateid, goodsid: data.row.goodsid}).then(res => {
        if (res.code === 200) {
          this.dtlData = res.data;
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
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      }
    },
    closeDialog() {
      this.dtlData = [];
      this.dtlVisible = false;
    },
    collapseBtn() {
      this.collapse = this.collapse === false;
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
