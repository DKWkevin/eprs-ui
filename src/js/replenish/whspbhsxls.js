import {paramsFormat, selectDdl, selectDdlOption} from "@/utils/functions";
import WhspbhsxlsDtl from "@/views/Function/Replenish/WhspbhsxlsDtl";

export default {
  name: 'Whspbhsxls',
  components: {WhspbhsxlsDtl},
  data() {
    return {
      labelWidth: '110px',
      formList: [
        {type: 'inputHov', id: 'companyid', label: '公司ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {
          type: 'select', id: 'usestatus', label: '状态', clearable: true, options: [
            {value: 1, label: '正式'},
            {value: 2, label: '缺少采购渠道'},
            {value: 3, label: '缺少参数'},
            {value: 0, label: '作废'}
          ]
        },
        {type: 'inputHov', id: 'contactinfoid', label: '对方联系方式ID'},
        {type: 'select', id: 'paymode', label: '付款方式', clearable: true, options: []}
      ],
      formData: {
        companyid: null,
        goodsid: null,
        supplyid: null,
        usestatus: null,
        contactinfoid: null,
        paymode: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:whspbhsxls:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:whspbhsxls:select"}
      ],
      tableHeight: 300,
      loading: false,
      tableColumns: [
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'supplyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'zb', label: '中包', type: 0, tableStatus: 0},
        {prop: 'db', label: '大包', type: 0, tableStatus: 0},
        {prop: 'contactman', label: '对方联系人', type: 0, tableStatus: 0},
        {prop: 'salesmode', label: '经/代销', type: 0, tableStatus: 0},
        {prop: 'paymodename', label: '付款方式', type: 0, tableStatus: 0},
        {prop: 'payterm', label: '账期', type: 0, tableStatus: 0},
        {prop: 'drivemodename', label: '驱动方式', type: 0, tableStatus: 0},
        {prop: 'daysales_d', label: '定速日销量', type: 0, tableStatus: 0},
        {prop: 'daysales', label: '日均销量', type: 0, tableStatus: 0},
        {prop: 'autoldledown', label: '怠速下限', type: 0, tableStatus: 0},
        {prop: 'dedown', label: '设定下限', type: 0, tableStatus: 0},
        {prop: 'caldown', label: '计算下限', type: 0, tableStatus: 0},
        {prop: 'usedown', label: '使用下限', type: 0, tableStatus: 0},
        {prop: 'daysdd', label: '大库下限天数', type: 0, tableStatus: 0},
        {prop: 'daysud', label: '大库上限天数', type: 0, tableStatus: 0},
        {prop: 'daysds', label: '门店下限天数', type: 0, tableStatus: 0},
        {prop: 'daysus', label: '门店上限天数', type: 0, tableStatus: 0},
        {prop: 'deup', label: '设定上限', type: 0, tableStatus: 0},
        {prop: 'calup', label: '计算上限', type: 0, tableStatus: 0},
        {prop: 'useup', label: '使用上限', type: 0, tableStatus: 0},
        {prop: 'minbach', label: '最小批量', type: 0, tableStatus: 0},
        {prop: 'houseup', label: '仓储上限', type: 0, tableStatus: 0},
        {prop: 'mdcxsl', label: '门店库存超限数量', type: 0, tableStatus: 0},
        {prop: 'plsx', label: '批零上限', type: 0, tableStatus: 0},
        {prop: 'plxx', label: '批量下限', type: 0, tableStatus: 0},
        {prop: 'minpack', label: '最小包装', type: 0, tableStatus: 0},
        {prop: 'jjxs', label: '季节系数', type: 0, tableStatus: 0},
        {prop: 'ifsplit', label: '是否可拆', type: 0, tableStatus: 0},
        {prop: 'dhzq', label: '到货周期', type: 0, tableStatus: 0},
        {prop: 'caldate', label: '计算日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'modidate', label: '修改日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'usestatus', label: '状态', type: 0, tableStatus: 0},
        {prop: 'modimanid', label: '修改人ID', type: 0, tableStatus: 0},
        {prop: 'modiman', label: '修改人', type: 0, tableStatus: 0},
        {prop: 'companyid', label: '公司ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '公司名称', type: 0, tableStatus: 0},
        {prop: 'channelid', label: '采购渠道ID', type: 0, tableStatus: 0},
        {prop: 'contactinfoid', label: '对方联系方式ID', type: 0, tableStatus: 0},
        {
          prop: 'caozuo', label: '操作', type: 1, fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "financial:cdfk:select"}
          ]
        }
      ],
      tableData: [],
      paymodeOptions: [],
      dtlVisible: false,
      dtlData: {},
      companyVisible: false,
      companyHov: {
        hovTitle: '公司查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'companyVisible',
        hovColumns:
          [
            {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
            {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
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
      contactinfoVisible: false,
      contactinfoHov: {
        hovTitle: '对方联系方式查询',
        hovUrl: "contactinfoidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'contactinfoVisible',
        hovColumns:
          [
            {id: "contactinfoid", name: "对方联系方式ID", queryStatus: true, dataStatus: 2, fillid: "contactinfoid"},
            {id: "contactman", name: "对方联系方式名称", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    selectDdl(this.formList, 'id', 'paymode', 'AP_PAYMODE');
    this.paymodeOptions = selectDdlOption('AP_PAYMODE');
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '维护商品补货属性零售' + this.getNewDate());
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
      this.$api.replenish.selectWhspbhsxls({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
      this.dtlVisible = true;
      this.dtlData = data.row;
    },
    openHov(id) {
      if (id === "companyid") {
        this.companyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "contactinfoid") {
        this.contactinfoVisible = true;
      }
    }
  }
}
