import {paramsFormat} from "@/utils/functions";

export default {
  name: 'Cgqdwh',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {
          type: 'select',
          id: 'pcdtpeid',
          label: '采购部门',
          options: [{value: 6, label: '批发采购'}, {value: 83672, label: '零售采购'}]
        },
        {
          type: 'select',
          id: 'usestatus',
          label: '状态',
          options: [{value: 3, label: "终止"}, {value: 2, label: "停用"}, {value: 1, label: "正式"}, {value: 0, label: "临时"}]
        }
      ],
      formData: {
        supplyid: null,
        goodsid: null,
        pcdtpeid: null,
        usestatus: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:cgqdwh:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:cgqdwh:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'channelid', label: '渠道ID', type: 0, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品id', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '单位', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '产地', type: 0, tableStatus: 0},
        {prop: 'paymodename', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'payterm', label: '账期', type: 0, tableStatus: 0},
        {prop: 'suprice', label: '进价', type: 0, tableStatus: 0},
        {prop: 'prioritiesno', label: '进货优先级', type: 0, tableStatus: 0},
        {prop: 'usestatusname', label: '状态', type: 0, tableStatus: 0},
        {prop: 'pcdtpename', label: '采购部门', type: 0, tableStatus: 0},
        {prop: 'cgzc', label: '采购支持', type: 0, tableStatus: 0},
        {prop: 'buyer', label: '采购员', type: 0, tableStatus: 0},
        {prop: 'companyid', label: '公司id', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '公司名称', type: 0, tableStatus: 0},
        {prop: 'lmcompanyname', label: '物流收货单位', type: 0, tableStatus: 0},
        {prop: 'credate', label: '创建日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'inputmanname', label: '录入人', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经销方式', type: 0, tableStatus: 0},
        {prop: 'discprice', label: '折现价格', type: 0, tableStatus: 0},
        {prop: 'largfactdays', label: '最大出厂天数', type: 0, tableStatus: 0},
        {prop: 'pccycle', label: '采购周期', type: 0, tableStatus: 0},
        {prop: 'sucycle', label: '到货周期', type: 0, tableStatus: 0},
        {prop: 'backmode', label: '财务退货方式', type: 0, tableStatus: 0},
        {
          prop: 'caozuo', label: '操作', type: 1, fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "replenishment:cgqdwh:select"}
          ]
        }
      ],
      tableData: [],
      paymodeOptions: [],
      dtlstatus: false,
      dtlFormList: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogWidth: '700px',
      inline: true,
      dialogLabelWidth: '100px',
      base: {
        channelid: null,
        companyid: null,
        companyname: null,
        supplyid: null,
        supplyname: null,
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null,
        prioritiesno: null
      },
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
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '采购渠道维护' + this.getNewDate());
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = paramsFormat(formData);
      this.loading = true;
      this.tableData = [];
      this.$api.replenish.selectCgqdwh({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    handleFunction(data) {
      this.dialogTitle = "修改";
      Object.keys(this.base).forEach(e => {
        this.base[e] = data.row[e];
      });
      this.dialogVisible = true;
    },
    insertCdfk() {
      let params = {};
      Object.keys(this.base).forEach(e => {
        params[e] = this.base[e];
      });
      this.$api.replenish.updateCgqdwh(params).then(res => {
        if (res.code === 200) {
          alert("保存成功");
          this.closeDialog();
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
    closeDialog() {
      this.dialogVisible = false;
    }
  }
}
