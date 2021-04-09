export default {
  name: 'Xsmxcx',
  data() {
    return {
      formList: [
        {type: 'input', id: 'salesid', label: '销售单ID', labelWidth: 60, formWidth: 180},
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'customid', label: '客户ID', labelWidth: 50, formWidth: 180},
        {
          type: 'select',
          id: 'usestatus1sel',
          label: '内外标识',
          options: [{value: 0, label: '外销'}, {value: 1, label: '内销'}],
          clearable: true
        },
        {type: 'inputHov', id: 'salerid', label: '业务员ID', labelWidth: 60, formWidth: 180},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', labelWidth: 50, formWidth: 200},
        {type: 'inputHov', id: 'inputmanid', label: '开票员ID', labelWidth: 60, formWidth: 200},
        {type: 'input', id: 'lotno', label: '批号', labelWidth: 40, formWidth: 180},
        {
          type: 'select',
          id: 'jch',
          label: '进退货标志',
          options: [{value: 0, label: '进货'}, {value: 1, label: '退货'}],
          clearable: true
        },
        {type: 'inputHov', id: 'sudeptid', label: '进货部门ID', labelWidth: 80, formWidth: 200},
        {type: 'inputHov', id: 'companyidhz', label: '合作伙伴ID', labelWidth: 80, formWidth: 200},
        {type: 'inputHov', id: 'employeenamehz', label: '合作伙伴采购经理', labelWidth: 120, formWidth: 240},
        {type: 'input', id: 'allsalesid', label: '多笔销售单ID(用逗号间隔)'},
        {type: 'input', id: 'allgoodsid', label: '货品ID(可多个,用逗号间隔)'},
        {
          type: 'select', id: 'salesdeptid', label: '销售部门', options: [
            {value: 6, label: '批发销售部'}, {value: 94965, label: '批发采购'}, {value: 117791, label: '医院一部'}, {
              value: 202435,
              label: '医院二部'
            }
          ], clearable: true
        },
      ],
      formData: {
        salesid: null,
        startdate: null,
        endofdate: null,
        customid: null,
        usestatus1sel: null,
        salerid: null,
        goodsid: null,
        inputmanid: null,
        lotno: null,
        jch: null,
        sudeptid: null,
        companyidhz: null,
        employeenamehz: null,
        allsalesid: null,
        allgoodsid: null,
        salesdeptid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "wholesale:xsmxcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "wholesale:xsmxcx:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'salesid', label: '销售单ID', tableStatus: 0},
        {type: 0, prop: 'sadtlid', label: '细单ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'sudeptid', label: '进货部门ID', tableStatus: 0},
        {type: 0, prop: 'sudeptname', label: '进货部门名称', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: ' 单位', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: ' 产地', tableStatus: 0},
        {type: 0, prop: 'lotno', label: '批号', tableStatus: 0},
        {type: 0, prop: 'goodsqty', label: ' 数量 ', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '单价 ', tableStatus: 0},
        {type: 0, prop: 'total_lines', label: '金额 ', tableStatus: 0},
        {type: 0, prop: 'refpriceid', label: '参考单价ID ', tableStatus: 0},
        {type: 0, prop: 'refprince', label: '参考单价 ', tableStatus: 0},
        {type: 0, prop: 'saler', label: '业务员', tableStatus: 0},
        {type: 0, prop: 'customid', label: '客户ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '客户名称', tableStatus: 0},
        {type: 0, prop: 'usestatus', label: '状态', tableStatus: 0},
        {type: 0, prop: 'stioflag', label: '记账标志', tableStatus: 0},
        {type: 2, prop: 'stiodate', label: '记账日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'db', label: '包装', tableStatus: 0},
        {type: 5, prop: 'saadjdtlid', label: '销售补差细单ID', tableStatus: 0},
        {type: 0, prop: 'inputmanid', label: '开票员ID', tableStatus: 0},
        {type: 0, prop: 'inputman', label: '开票员', tableStatus: 0},
        {type: 0, prop: 'cityid', label: '地区ID', tableStatus: 0},
        {type: 0, prop: 'dqcompanyname', label: '地区', tableStatus: 0},
        {type: 0, prop: 'mdtype', label: '门店类型', tableStatus: 0},
        {type: 0, prop: 'companyidhz', label: '合作伙伴ID', tableStatus: 0},
        {type: 0, prop: 'companynamehz', label: '合作伙伴', tableStatus: 0},
        {type: 0, prop: 'employeenamehz', label: '合作伙伴采购经理', tableStatus: 0},
        {type: 0, prop: 'salerid', label: '业务员ID', tableStatus: 0},
        {type: 0, prop: 'sfyfp', label: '是否有发票', tableStatus: 0},
        {type: 2, prop: 'invaliddate', label: '效期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'stcompanyid', label: '保管单位ID', tableStatus: 0}
      ],
      tableData: [],
      loading: false,
      tableHeight: 0,
      hjje: 0,
      dtlVisible: false,
      dtlColumns: [
        {type: 0, prop: 'saadjdtlid', label: '细单ID', tableStatus: 0},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '货品名称', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'taxrate', label: '税率', tableStatus: 0},
        {type: 0, prop: 'goodsqty', label: '数量', tableStatus: 0},
        {type: 0, prop: 'unitprice', label: '单价', tableStatus: 0},
        {type: 0, prop: 'total_line', label: '金额', tableStatus: 0},
        {type: 0, prop: 'notaxmoney', label: '不含税额', tableStatus: 0},
        {type: 0, prop: 'taxmoney', label: '税额', tableStatus: 0},
        {type: 0, prop: 'inbatchid', label: '内部批次ID', tableStatus: 0},
        {type: 0, prop: 'outbatchid', label: '外部批次ID', tableStatus: 0},
        {type: 0, prop: 'saadjdocid', label: '总单ID', tableStatus: 0}
      ],
      dtlData: [],
      dtlHeight: 300,
      dtlLoading: false,
      customVisible: false,
      customHov: {
        hovTitle: '客户查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'customVisible',
        hovColumns:
          [
            {id: "customid", name: "客户ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "客户名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "客户操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      salerVisible: false,
      salerHov: {
        hovTitle: '业务员查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'salerVisible',
        hovColumns:
          [
            {id: "employeeid", name: "业务员ID", queryStatus: true, dataStatus: 2, fillid: "salerid"},
            {id: "employeename", name: "业务员名称", queryStatus: true, dataStatus: 1},
            {id: "employeeopcode", name: "业务员操作码", queryStatus: true, dataStatus: 1}
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
      inputmanVisible: false,
      inputmanHov: {
        hovTitle: '开票员查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'inputmanVisible',
        hovColumns:
          [
            {id: "employeeid", name: "开票员ID", queryStatus: true, dataStatus: 2, fillid: "inputmanid"},
            {id: "employeename", name: "开票员名称", queryStatus: true, dataStatus: 1},
            {id: "employeeopcode", name: "开票员操作码", queryStatus: true, dataStatus: 1}
          ]
      },
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
      } else if (data === "download") {
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== "endofdate") {
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
      params.compayid = Number(sessionStorage['companyid']);
      this.tableData = [];
      this.loading = true;
      this.hjje = 0;
      this.$api.wholesale.selectXsmxcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.total = res.data.totalSize;
          this.$api.wholesale.selectXsmxcxJe({params: params}).then(res => {
            if (res.code === 200) {
              this.hjje = Object.freeze(res.data.total);
              this.loading = false;
            }
          }).catch(error => {
            this.loading = false;
            return false;
          })
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(data) {
      this.dtlVisible = true;
      this.dtlLoading = true;
      this.dtlData = [];
      this.$api.wholesale.selectXsmxcxDtl({saadjdtlid: data.row.saadjdtlid}).then(res => {
        if (res.code === 200) {
          this.dtlData = Object.freeze(res.data);
          this.dtlLoading = false;
        }
      }).catch(error => {
        this.dtlLoading = false;
        return false;
      })
    },
    openHov(id) {
      if (id === "customid") {
        this.customVisible = true;
      } else if (id === "salerid") {
        this.salerVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "inputmanid") {
        this.inputmanVisible = true;
      }
    },
    docClose() {
      this.dtlVisible = false;
    }
  }
}
