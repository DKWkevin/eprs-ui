import {selectOption} from "@/utils/functions";
import {selectbuyid, selectCgfz} from "@/utils/drops";
import CgddGoods from "@/views/Function/Ordermanagement/CgddGoods";
import CgddUpdateKc from "@/views/Function/Ordermanagement/CgddUpdateKc";

export default {
  name: 'Cgddgl',
  components: {CgddUpdateKc, CgddGoods},
  data() {
    return {
      labelWidth: 100,
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ordermanagement:cgddgl:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ordermanagement:cgddgl:select"}
      ],
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商', formWidth: 170, labelWidth: 50},
        {type: 'input', id: 'supplyname', label: '供应商名称', formWidth: 260, labelWidth: 75},
        {type: 'inputHov', id: 'goodsid', label: '货品ID', formWidth: 170, labelWidth: 50},
        {type: 'input', id: 'goodsname', label: '货品名称', formWidth: 260, labelWidth: 65},
        {type: 'select', id: 'buyerid', label: '采购支持', options: [], clearable: true},
        {type: 'select', id: 'groupid', label: '采购分组', options: [], clearable: true},
        {type: 'check', id: 'check1', label: ''}
      ],
      formData: {
        supplyid: null,
        supplyname: null,
        goodsid: null,
        goodsname: null,
        buyerid: null,
        cgfz: null,
        check1: null
      },
      loading: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'prioritiesno', label: '优先级', type: 0, tableStatus: 0},
        {prop: 'companyopcode', label: '供应商操作码', type: 0, tableStatus: 0},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '供应商名称', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          type: 1,
          width: 280,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {id: 'save', icon: "fa fa-edit", label: "action.sccgdd", perms: "ordermanagement:cgddgl:add"},
            {id: 'update', icon: "fa fa-edit", label: "action.xgaqkc", perms: "ordermanagement:cgddgl:update"},
          ]
        }
      ],
      docTableData: [],
      pageStatus: false,
      dtlVisible: false,
      goodsData: {},
      updatekcVisible: false,
      updatekcData: {},
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
      inputmanVisible: false,
      inputmanHov: {
        hovTitle: '录入人查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'inputmanVisible',
        hovColumns:
          [
            {id: "employeeid", name: "录入人ID", queryStatus: true, dataStatus: 2, fillid: "inputmanid"},
            {id: "employeename", name: "录入人名称", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    selectOption(this.formList, 'buyerid', selectbuyid());
    selectOption(this.formList, 'groupid', selectCgfz());
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        this.exportExcelDOM(this.docTableColumns, this.docTableData, '采购订单查询/作废' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = {};
      let formData = this.formData;
      Object.keys(formData).forEach(e => {
        if (e !== "check1" || e !== "goodsid") {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
          }
        }
      });
      if (this.returnValue(formData.check1) === true) {
        if (formData.check1 === true) {
          params.lmcompanyid = 14;
        } else {
          params.lmcompanyid = 7;
        }
      } else {
        params.lmcompanyid = 7;
      }
      if (this.returnValue(formData.goodsid) === true) {
        params.companyid = Number(sessionStorage['companyid']);
        params.goodsid = formData.goodsid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.docTableData = [];
      this.loading = true;
      this.$api.ordermanagement.selectCgddglDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
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
      if (data.id === 'save') {
        if (this.returnValue(this.formData.check1) === true) {
          if (this.formData.check1 === true) {
            this.goodsData.lmcompanyid = 14;
          } else {
            this.goodsData.lmcompanyid = 7;
          }
        } else {
          this.goodsData.lmcompanyid = 7;
        }
        this.goodsData.supplyid = data.row.supplyid;
        this.goodsData.companyid = data.row.companyid;
        this.goodsData.buyerid = this.formData.buyerid;
        this.goodsData.groupid = this.formData.groupid;
        this.goodsData.goodsid = this.formData.goodsid;
        if (this.formData.check1 === true) {
          this.updatekcData.lmcompanyid = 14;
        } else {
          this.updatekcData.lmcompanyid = 7;
        }
        this.dtlVisible = true;
      } else if (data.id === 'update') {
        this.updatekcData.supplyid = data.row.supplyid;
        this.updatekcData.companyid = data.row.companyid;
        this.updatekcData.buyerid = this.formData.buyerid;
        this.updatekcData.groupid = this.formData.groupid;
        this.updatekcData.goodsid = this.formData.goodsid;
        if (this.formData.check1 === true) {
          this.updatekcData.lmcompanyid = 14;
        } else {
          this.updatekcData.lmcompanyid = 7;
        }
        this.updatekcVisible = true;
      }
    },
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "inputmanid") {
        this.inputmanVisible = true;
      }
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
