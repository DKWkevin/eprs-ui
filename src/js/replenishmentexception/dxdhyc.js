import {selectOption} from "@/utils/functions";
import {selectbuyid} from "@/utils/drops";

export default {
  name: 'Dxbhyc',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "replenishmentexception:dxbhyc:select"},
        {
          id: 'download',
          icon: "fa fa-download",
          label: "action.download",
          perms: "replenishmentexception:dxbhyc:select"
        }
      ],
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商'},
        {type: 'select', id: 'buyerid', label: '采购支持', options: []}
      ],
      formData: {startdate: null, endofdate: null, supplyid: null, buyerid: null},
      widthStatus: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'useday', label: '生成日期', type: 2, tableStatus: 0, width: 200},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0, width: 200},
        {prop: 'supplyname', label: '供应商', type: 0, tableStatus: 0},
        {prop: 'buyername', label: '采购支持', type: 0, tableStatus: 0, width: 200},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          type: 1,
          width: 120,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: 'edit',
              icon: "fa fa-edit",
              label: "action.selectDtl",
              perms: "replenishmentexception:dxbhyc:selectdtl"
            }
          ]
        }
      ],
      docTableData: [],
      pageStatus: false,
      dtlVisible: false,
      dialogWidth: '1000px',
      dialogTop: '10vh',
      dialogTitle: '查询细单',
      loading: false,
      dtlTableColumns: [
        {prop: 'goodsid', label: '商品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '商品名称', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'addqty', label: '生成补货数量', type: 0, tableStatus: 0},
        {prop: 'confirmqty', label: '确认补货数量', type: 0, tableStatus: 0},
        {prop: 'lxrname', label: '联系人', type: 0, tableStatus: 0},
        {prop: 'lxrtel', label: '联系电话', type: 0, tableStatus: 0},
        {prop: 'dkkc', label: '库存', type: 0, tableStatus: 0},
        {prop: 'syxl', label: '上月销量', type: 0, tableStatus: 0},
        {prop: 'qqxl', label: '前期销量', type: 0, tableStatus: 0}
      ],
      dtlTableData: [],
      dtlTableHeight: 400,
      dtlLoading: false,
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
    this.docTableHeight = (window.innerHeight - 240);
    selectOption(this.formList, 'buyerid', selectbuyid());
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.docTableColumns, this.docTableData, '代销补货异常' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.formData;
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (this.returnValue(formData.supplyid) === true) {
        params.supplyid = formData.supplyid;
      }
      if (this.returnValue(formData.buyerid) === true) {
        params.buyerid = formData.buyerid;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.loading = true;
      this.docTableData = [];
      this.$api.replenishmentexception.selectDxbhycDoc({
        pageNum: pageNum,
        pageSize: pageSize,
        params: params
      }).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(data) {
      let companyid = Number(sessionStorage['companyid']);
      let params = {};
      params.supplyid = data.row.supplyid;
      params.useday = data.row.useday;
      params.buyerid = data.row.buyerid;
      params.companyid = companyid;
      this.dtlLoading = true;
      this.$api.replenishmentexception.selectDxbhycDtl(params).then(res => {
        if (res.code === 200) {
          this.dtlTableData = res.data;
          this.dtlLoading = false;
        }
      }).catch(error => {
        this.dtlLoading = false;
        return false;
      });
      this.dtlVisible = true;
    },
    openHov() {
      this.supplyVisible = true;
    },
    dialogClose() {
      this.dtlVisible = false;
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
