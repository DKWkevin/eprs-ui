<template>
  <div>
    <e-query
      ref="query"
      :form-list="gdwzsjxqygyFormList"
      :form-data="gdwzsjxqygyFormData"
      :btn-options="gdwzsjxqygyBtnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="gdwzsjxqygyTableColumns"
      :table-data="gdwzsjxqygyTableData"
      :table-height="350"
      :loading="gdwzsjxqygyLoading"
      :table-width-status="false"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >
    </e-table>

    <hov-tools
      v-if="gdwzsjxqygyCompanyVisible"
      :hov-data="gdwzsjxqygyCompanyHov"
    ></hov-tools>

  </div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import HovTools from "@/views/Core/HovTools";

import {
  getNewDate,
  paramsFormat,
  formDataReset,
  dateFormat,
  exportExcelDOM,
  selectDdlOption
} from "@/utils/functions";
export default {
  components: { EQuery, ETable, HovTools },
  data() {
    return {
      gdwzsjxqygyFormList: [
        {
          type: "inputHov",
          label: "客商ID",
          id: "businessid",
          dataType: "number"
        },
        {
          type: "select",
          label: "内/外部",
          id: "companyflag",
          clearable: true,
          options: [
            {
              label: "供应商",
              value: "1"
            },
            {
              label: "客户",
              value: "0"
            }
          ]
        }
      ],
      gdwzsjxqygyFormData: {
        businessid: null,
        companyflag: null
      },
      gdwzsjxqygyBtnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "quality:gdwzsjxqygy:select"
          perms: "qualitysearch:gdwzsjxqygy:select"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "quality:gdwzsjxqygy:select"
          perms: "qualitysearch:gdwzsjxqygy:select"
        }
      ],

      gdwzsjxqygyTableColumns: [
        { prop: "companyid", label: "公司ID", type: 0, tableStatus: 0 },
        { prop: "gs", label: "公司", type: 0, tableStatus: 0 },
        { prop: "businessid", label: "客商ID", type: 0, tableStatus: 0 },
        { prop: "ks", label: "客商", type: 0, tableStatus: 0 },
        { prop: "companyflagname", label: "供应商/客商", type: 0, tableStatus: 0 },
        { prop: "cfid", label: "证书ID", type: 0, tableStatus: 0 },
        { prop: "cfname", label: "证书名", type: 0, tableStatus: 0 },
        { prop: "cfno", label: "证书编码", type: 0, tableStatus: 0 },
        { prop: "invalidedate", label: "效期", type: 2, tableStatus: 0 },
        { prop: "sxq", label: "失效月数", type: 0, tableStatus: 0 },
        { prop: "selfflag", label: "内外部客户标记", type: 0, tableStatus: 0 }
      ],
      gdwzsjxqygyTableData: [],
      gdwzsjxqygyLoading: false,

      gdwzsjxqygyCompanyVisible: false,
      gdwzsjxqygyCompanyHov: {
        hovTitle: "客商查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "gdwzsjxqygyFormData",
        parentVisible: "gdwzsjxqygyCompanyVisible",
        hovColumns: [
          {
            id: "companyid",
            name: "客商ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "businessid"
          },
          {
            id: "companyname",
            name: "客商名称",
            queryStatus: true,
            dataStatus: 1
          },
          {
            id: "companyopcode",
            name: "客商操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    queryFunction(data) {
      if (data == "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data == "reset") {
        formDataReset(this.gdwzsjxqygyFormData);
      }
    },
    openHov(data) {
      console.log(data)
      if (data == "businessid") {
        this.gdwzsjxqygyCompanyVisible = true;
      }
    },
    handleFunction(data) {},

    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = paramsFormat(this.gdwzsjxqygyFormData);
      this.gdwzsjxqygyLoading = true;
      this.$api.qualitysearch
        .selectGdwzsjxqygy({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.gdwzsjxqygyTableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.gdwzsjxqygyLoading = false;
          }
        })
        .catch(error => {
          this.gdwzsjxqygyLoading = false;
          return false;
        });
    }
  }
};
</script>

<style scoped>
</style>
