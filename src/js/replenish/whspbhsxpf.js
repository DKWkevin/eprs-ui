import {paramsFormat} from "@/utils/functions";
import WhspbhsxpfDtl from "@/views/Function/Replenish/WhspbhsxpfDtl";

export default {
  name: 'Whspbhsxpf',
  components: {WhspbhsxpfDtl},
  data() {
    return {
      labelWidth: '110px',
      formList: [
        {type: 'inputHov', id: 'companyid', label: '公司ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'}
      ],
      formData: {
        companyid: null,
        goodsid: null,
        supplyid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:whspbhsxpf:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:whspbhsxpf:select"}
      ],
      tableHeight: 300,
      loading: false,
      widthStatus: false,
      tableColumns: [
        {prop: 'companyid', label: '公司ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '公司名称', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0, width: 200},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'Qty_ul', label: '库存上限', type: 0, tableStatus: 0},
        {prop: 'Qty_ll', label: '库存下限', type: 0, tableStatus: 0},
        {prop: 'modidate', label: '修改人日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'modimanid', label: '修改人ID', type: 0, tableStatus: 0},
        {prop: 'modiman', label: '修改人', type: 0, tableStatus: 0},
        {
          prop: 'caozuo', label: '操作', type: 1, fixed: 'right', width: 90, widthStatus: true, tableStatus: 0, options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "financial:cdfk:select"}
          ]
        }
      ],
      tableData: [],
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
        this.exportExcelDOM(this.tableColumns, this.tableData, '维护商品补货属性批发定义' + this.getNewDate());
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
      this.$api.replenish.selectWhspbhsxpf({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
      }
    }
  }
}
