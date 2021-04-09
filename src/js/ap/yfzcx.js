import CdfkAdd from "@/views/Function/Ap/CdfkAdd";
import {selectOption} from "@/utils/functions";
import {selectHsy} from "@/utils/drops";

export default {
  name: 'Yfzcx',
  components: {CdfkAdd},
  data() {
    return {
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '创建日期'},
        {type: 'inputHov', id: 'cvid', label: '供应商ID', formWidth: 200, labelWidth: 65},
        {type: 'select', id: 'checker', label: '核算员', options: [], clearable: true}
      ],
      formData: {
        startdate: null,
        endofdate: null,
        cvid: null,
        checker: null
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ap:yfzcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ap:yfzcx:select"}
      ],
      docTableHeight: 300,
      loading: false,
      tableColumns: [
        {type: 0, prop: 'dtlid', label: '明细ID', tableStatus: 0},
        {type: 2, prop: 'credate', label: '日期', tableStatus: 0, width: 150, widthStatus: true},
        {type: 0, prop: 'cvid', label: '客商ID', tableStatus: 0},
        {type: 0, prop: 'cvname', label: '客商名称', tableStatus: 0},
        {type: 0, prop: 'addmoney', label: '增加金额', tableStatus: 0},
        {type: 0, prop: 'decmoney', label: '减少金额', tableStatus: 0},
        {type: 0, prop: 'remmoney', label: '余额', tableStatus: 0},
        {type: 0, prop: 'sourceid', label: '源单ID', tableStatus: 0},
        {type: 0, prop: 'doctypename', label: '源单类型', tableStatus: 0},
        {type: 0, prop: 'keepmanid', label: '记账人ID', tableStatus: 0},
        {type: 0, prop: 'keepman', label: '记账人', tableStatus: 0},
        {type: 0, prop: 'summary', label: '摘要', tableStatus: 0},
        {type: 0, prop: 'checker', label: '核算员', tableStatus: 0}
      ],
      tableData: [],
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "cvid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 280);
    selectOption(this.formList, 'checker', selectHsy());
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    dialogClose() {
      this.dtlVisible = false;
      this.dtlTableData = [];
    },
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === 'download') {
        this.exportExcelDOM(this.tableColumns, this.tableData, '应付账查询' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pagesize);
    },
    selectDoc(pageNum, pagesize) {
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
      params.companyid = Number(sessionStorage['companyid']);
      this.tableData = [];
      this.loading = true;
      this.$api.ap.selectYfzcx({pageNum: pageNum, pageSize: pagesize, params: params}).then(res => {
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
    openHov(data) {
      if (data === 'cvid') {
        this.supplyVisible = true;
      }
    }
  }
}
