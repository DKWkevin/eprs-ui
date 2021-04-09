export default {
  name: 'Zgzcx',
  data() {
    return {
      collapse: false,
      formList: [
        {type: 'inputHov', id: 'companyid', label: '公司ID', formWidth: 200, labelWidth: 65, disabled: true},
        {type: 'input', id: 'companyname', label: '公司名称', disabled: true},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 200, labelWidth: 65},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 200, labelWidth: 65},
        {type: 'inputHov', id: 'companyname', label: '供应商ID'},

      ],
      formData: {
        credate: null,
        supplyid: null,
        goodsid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ap:zgzcx:select"},
        {id: 'download1', icon: "fa fa-download", label: "action.download", perms: "ap:zgzcx:select"},
        {id: 'dtl', icon: "fa fa-edit", label: "action.dtl", perms: "ap:zgzcx:select"},
        {id: 'download2', icon: "fa fa-download", label: "action.download", perms: "ap:zgzcx:select"}
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
        {type: 0, prop: 'companyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'paymode', label: '付款方式', tableStatus: 0},
        {
          type: 1, prop: 'caozuo', label: '操作', fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "ap:zgzcx:select"}
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
        {type: 0, prop: 'companyname', label: '供应商名称', tableStatus: 0}
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
    this.tableHeight = (window.innerHeight - 240);
    this.formData.credate = [new Date(this.getNewDate() + ' 00:00:00'), new Date(this.getNewDate() + ' 23:59:59')];
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === 'download1') {
        this.exportExcelDOM();
      } else if (data === 'dtl') {
        this.dtlVisible = true;
        this.dtlloading = true;
        let params = {};
        Object.keys(formData).forEach(e => {
          if (e !== "credate") {
            if (formData[e] !== null && formData[e] !== "") {
              params[e] = formData[e];
            }
          }
        });
        if (Object.keys(params).length === 0) {
          alert("货品ID和供应商ID不能同时为空！");
          return false;
        }
        if (formData.credate !== null && formData.credate !== "") {
          params.startdate = formData.credate[0];
          params.endofdate = formData.credate[1];
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
        this.exportExcelDOM();
      }

    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "credate") {
          if (formData[e] !== null && formData[e] !== "") {
            params[e] = formData[e];
          }
        }
      });
      if (formData.credate !== null && formData.credate !== "") {
        params.startdate = formData.credate[0];
        params.endofdate = formData.credate[1];
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.docTableData = [];
      this.loading = true;
      this.$api.ap.selectZgzcx({pageNum: pageNum, pageSize: pagesize, params: params}).then(res => {
        if (res.code === 200) {
          this.docTableData = Object.freeze(res.data.content);
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
