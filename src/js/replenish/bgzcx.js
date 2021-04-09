import {paramsFormat} from "@/utils/functions";

export default {
  name: 'Bgzcx',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'goodsid', label: '商品ID'},
        {type: 'select', id: 'storeid', label: '仓储区域', options: []}
      ],
      formData: {
        goodsid: null,
        storeid: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishment:bgzcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "replenishment:bgzcx:select"}
      ],
      tableHeight: 300,
      loading: false,
      widthStatus: false,
      tableColumns: [
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'storename', label: '仓储区域', type: 0, tableStatus: 0},
        {prop: 'remqty', label: '库存', type: 0, tableStatus: 0},
        {prop: 'stcompanyid', label: '保管单位ID', type: 0, tableStatus: 0},
        {prop: 'stcompanyname', label: '保管单位名称', type: 0, tableStatus: 0}
      ],
      tableData: [],
      supplyVisible: false,
      supplyHov: {
        hovTitle: '商品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "goodsid", name: "商品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "商品名称", queryStatus: true, dataStatus: 1},
            {id: "opcode", name: "商品操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    this.$api.replenish.selectBgzcxCcqy({pageNum: 1, pageSize: 999, params: {stcompanyid: 7}}).then(res => {
      if (res.code === 200) {
        let params = [];
        res.data.content.forEach(e => {
          let tel = {};
          tel.value = e.storeid;
          tel.label = e.storename;
          params.push(tel);
        });
        this.formList[1].options = params;
      }
    }).catch(error => {
      return false;
    })
  },
  methods: {
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.tableColumns, this.tableData, '保管账查询' + this.getNewDate());
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
      this.$api.replenish.selectBgzcx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
    openHov(id) {
      if (id === "goodsid") {
        this.supplyVisible = true;
      }
    }
  }
}
