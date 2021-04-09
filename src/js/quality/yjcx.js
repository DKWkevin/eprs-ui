import {
  paramsFormat,
  formDataReset,
} from "@/utils/functions";

export default {
  data() {
    return {
      yjcxFormList: [
        {
          type: "inputHov",
          label: "单位ID",
          id: "businessid",
          dataType: "number"
        },
        {
          type: "inputHov",
          label: "证书类型ID",
          id: "qualitytypeid",
          dataType: "number"
        },
        {
          type: "select",
          label: "内/外部",
          id: "nwb",
          clearable: true,
          options: [
            {
              label: "内部",
              value: "1"
            },
            {
              label: "外部",
              value: "2"
            }
          ]
        }
      ],
      yjcxFormData: {
        businessid: null,
        qualitytypeid: null,
        nwb: null
      },
      yjcxBtnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "quality:yjcx:select"
          perms: "quality:yjcx:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "quality:yjcx:select"
          perms: "quality:yjcx:select"
        },
        {
          id: "download",
          icon: "fa fa-download",
          label: "action.download",
          //perms: "quality:yjcx:select"
          perms: "quality:yjcx:select"
        }
      ],

      yjcxTableColumns: [
        {prop: "cfid", label: "证书ID", type: 0, tableStatus: 0},
        {prop: "businessid", label: "单位ID", type: 0, tableStatus: 0},
        {prop: "companyname", label: "单位名称", type: 0, tableStatus: 0},
        {prop: "qualitytypeid", label: "类型ID", type: 0, tableStatus: 0},
        {prop: "cfname", label: "失效期", type: 0, tableStatus: 0},
        {prop: "memo", label: "备注", type: 0, tableStatus: 0}
      ],
      yjcxTableData: [],
      yjcxLoading: false,

      yjcxCompanyVisible: false,
      yjcxCompanyHov: {
        hovTitle: "公司查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "yjcxFormData",
        parentVisible: "yjcxCompanyVisible",
        hovColumns: [
          {
            id: "companyid",
            name: "公司ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "businessid"
          },
          {
            id: "companyname",
            name: "公司名称",
            queryStatus: true,
            dataStatus: 1
          },
          {
            id: "companyopcode",
            name: "公司操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },

      yjcxCFVisible: false,
      yjcxCFHov: {
        hovTitle: "证书查询",
        // hovUrl: "qualityscopeidhov/select",
        hovUrl: 'qualityscopeidhov/selectdef',
        afterStatus: false,
        fillDataName: "yjcxFormData",
        parentVisible: "yjcxCFVisible",
        hovColumns: [
          {
            id: "qualitytypeid",
            name: "证书类型ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "qualitytypeid"
          },
          {
            id: "qualitytypename",
            name: "证书类型名称",
            queryStatus: false,
            dataStatus: 1
          }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.yjcxFormData);
      } else if (data === "download") {
        this.exportExcelDOM(
          this.yjcxTableColumns,
          this.yjcxTableData,
          "预警查询" + this.getNewDate()
        );
      }
    },
    openHov(data) {
      if (data === "businessid") {
        this.yjcxCompanyVisible = true
      } else if (data === "qualitytypeid") {
        this.yjcxCFVisible = true
      }
    },

    handleFunction(data) {
    },

    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = paramsFormat(this.yjcxFormData);
      this.yjcxLoading = true;
      this.$api.quality
        .selectYjcx({pageNum, pageSize, params})
        .then(res => {
          if (res.code === 200) {
            this.yjcxTableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.yjcxLoading = false;
          }
        })
        .catch(error => {
          this.yjcxLoading = false;
          return false;
        });
    }
  }
}
