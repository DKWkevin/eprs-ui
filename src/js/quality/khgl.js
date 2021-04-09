import KhglDtl from "@/views/Function/Quality/KhglDtl";
import {
  paramsFormat,
  formDataReset,
  selectDdl,
  selectDdlOption,
  dateFormat,
  disForm
} from "@/utils/functions"

export default {
  name: 'Khgl',
  components: {KhglDtl},
  data() {
    return {
      labelWidth: '100px',
      formList: [
        {type: 'inputHov', label: '单位ID', id: 'customid'},
        {type: 'input', label: '操作码', id: 'companyopcode'},
        {type: 'select', label: '单位类型', id: 'companytype', options: [], clearable: true},
        {type: 'inputHov', label: '价格类型', id: 'priceid'},
        {type: 'select', label: '状态', id: 'usestatus', options: [], clearable: true},
        {type: 'select', label: '客户性质', id: 'customtypeid', options: [], clearable: true}
      ],
      formData: {
        customid: null,
        companyopcode: null,
        companytype: null,
        priceid: null,
        usestatus: null,
        customtypeid: null
      },
      btnOptions: [
        {id: "query", icon: "fa fa-search", label: "action.search", perms: 'quality:khgl:select'},
        {id: "add", icon: "fa fa-plus", label: "action.add", perms: 'quality:khgl:add'},
        {id: "reset", icon: "fa fa-cog", label: "action.reset", perms: 'quality:khgl:select'},
        {id: "download", icon: "fa fa-download", label: "action.download", perms: 'quality:khgl:select'},
        /*{id:"downloadInter",icon:"fa fa-download",label:"action.downloadInter",perms:'quality:khgl:select',loading:false}*/
      ],
      queryCustomVisible: false,
      customHov: {
        hovTitle: '单位查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryCustomVisible',
        hovColumns:
          [
            {id: "customid", name: "单位ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "单位名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "单位操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      queryPriceVisible: false,
      priceHov: {
        hovTitle: '价格类型查询',
        hovUrl: 'priceidhov/select',
        afterStatus: false,
        fillDataName: 'formData',
        parentVisible: 'queryPriceVisible',
        hovColumns:
          [
            {id: 'priceid', name: "价格类型ID", queryStatus: true, dataStatus: 2, fillid: "priceid"},
            {id: 'pricename', name: "价格类型名称", queryStatus: true, dataStatus: 1}
          ]
      },
      tableColumns: [
        {prop: 'customid', label: '单位ID', type: 0, tableStatus: 0},
        {prop: 'customname', label: '单位名称', type: 0, tableStatus: 0},
        {prop: 'customcredate', label: '录入日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'inputmanid', label: '录入人ID', type: 0, tableStatus: 0},
        {prop: 'inputmanname', label: '录入人名称', type: 0, tableStatus: 0},
        {prop: 'customtypeid', label: '客户性质ID', type: 0, tableStatus: 0},
        {prop: 'customtypename', label: '客户性质', type: 0, tableStatus: 0},
        {prop: 'priceid', label: '价格类型ID', type: 0, tableStatus: 0},
        {prop: 'pricename', label: '价格类型', type: 0, tableStatus: 0},
        {prop: 'customgrade', label: '客户等级', type: 0, tableStatus: 0},
        {prop: 'companyno', label: '编码', type: 0, tableStatus: 0},
        {prop: 'companyopcode', label: '操作码', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '名称', type: 0, tableStatus: 0},
        {prop: 'companyshortname', label: '简称', type: 0, tableStatus: 0},
        {prop: 'companytypename', label: '单位类型', type: 0, tableStatus: 0},
        {prop: 'parentcompanyid', label: '上级单位ID', type: 0, tableStatus: 0},
        {prop: 'parentcompanyname', label: '上级单位名称', type: 0, tableStatus: 0},
        {prop: 'area', label: '地区', type: 0, tableStatus: 0},
        {prop: 'selfflagname', label: '内外标识', type: 0, tableStatus: 0},
        {prop: 'companycredate', label: '录入日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'modifydate', label: '修改日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'companyinputmanid', label: '录入人ID', type: 0, tableStatus: 0},
        {prop: 'companyinputmanname', label: '录入人名称', type: 0, tableStatus: 0},
        {prop: 'legalflag', label: '法人单位标志', type: 0, tableStatus: 0},
        {prop: 'usestatusname', label: '状态', type: 0, tableStatus: 0},
        {prop: 'enterprisetype', label: '企业性质', type: 0, tableStatus: 0},
        {prop: 'archiveno', label: '档案标识号', type: 0, tableStatus: 0},
        {prop: 'salerid', label: '业务员ID', type: 0, tableStatus: 0},
        {prop: 'saler', label: '业务员名称', type: 0, tableStatus: 0},
        {prop: 'iftaxname', label: '是否一般纳税人', type: 0, tableStatus: 0},
        {prop: 'ifcontrolname', label: '是否控制信用限额', type: 0, tableStatus: 0},
        {prop: 'iftogename', label: '是否票货同行', type: 0, tableStatus: 0},
        {prop: 'signtype', label: '签收方式', type: 0, tableStatus: 0},
        {prop: 'signman', label: '收货人', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          width: 100,
          widthStatus: true,
          type: 1,
          tableStatus: 0,
          options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.edit", perms: "quality:khgl:update"}
          ]
        },
      ],
      tableData: [],
      tableHeight: 0,
      khglDtlVisible: false,
      dtlData: {},
      customOptions: [],
      dltStatus: false,
      loading: false,
      docTitle: ''
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    selectDdl(this.formList, 'id', 'companytype', 'COMPANY_TYPE');
    selectDdl(this.formList, 'id', 'usestatus', 'COMPANY_USESTATUS');
    selectDdl(this.formList, 'id', 'customtypeid', 'CUSTOM_TYPE');
    this.customOptions = selectDdlOption('CUSTOM_TYPE');
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        this.$refs.query.collapse = false;
        let formData = this.formData;
        formData.companyid = Number(sessionStorage['companyid']);
        let params = paramsFormat(formData);
        let pageSize = this.$refs.doctable.pageSize;

        this.loading = true;
        this.tableData = [];
        this.$api.quality.selectKhglDoc({pageNum: 1, pageSize: pageSize, params: params}).then(res => {
          if (res.code === 200) {
            this.tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.pageNum = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.loading = false;
          }
        }).catch(error => {
          this.loading = false;
          return false;
        })
      } else if (data === "add") {
        this.khglDtlVisible = true;
        this.dltStatus = false;
        this.dtlData = {};
        this.docTitle = '新增客户信息';
      } else if (data === "reset") {
        let formData = this.formData;
        formDataReset(formData);
      } else if (data === "download") {
        let params = [];
        this.tableData.forEach(res => {
          let tel = {};
          Object.keys(res).forEach(e => {
            if (e === "customcredate" || e === "companycredate" || e === "modifydate") {
              tel[e] = dateFormat('YYYY-mm-dd HH:MM:SS', res[e]);
            } else {
              tel[e] = res[e];
            }
          });
          params.push(tel);
        });
        this.exportExcelDOM(this.tableColumns, params, '客户管理');
      } else if (data === "downloadInter") {
        disForm(this.btnOptions, 'id', 'downloadInter', 'loading', true);
        let formData = this.formData;
        let params = paramsFormat(formData);
        this.$api.quality.selectKhglDoc({params: params}).then(res => {
          if (res.code === 200) {
            this.exportExcelDOM(this.tableColumns, Object.freeze(res.data.content), '客户管理');
            disForm(this.btnOptions, 'id', 'downloadInter', 'loading', false);
          }
        }).catch(error => {
          disForm(this.btnOptions, 'id', 'downloadInter', 'loading', false);
          return false;
        })

      }
    },
    handleChange(data) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = paramsFormat(formData);
      params.companyid = Number(sessionStorage['companyid']);
      this.loading = true;
      this.tableData = [];
      this.$api.quality.selectKhglDoc({pageNum: data.pageNum, pageSize: data.pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleQuery(data) {
      this.khglDtlVisible = true;
      this.dltStatus = true;
      this.docTitle = '修改客户信息';
      this.dtlData = data.row;
    },
    queryHov(data) {
      if (data === "customid") {
        this.queryCustomVisible = true;
      } else if (data === "priceid") {
        this.queryPriceVisible = true;
      }
    }
  }
}
