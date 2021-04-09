<!--    销售出库   -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="xsck_formList"
      :form-data="xsck_formData"
      :btn-options="xsck_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="xsck_tableColumns"
      :table-data="xsck_tableData"
      :table-height="xsck_tableHeight"
      :table-width-status="false"
      :loading="xsck_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="xsck_saleVisible"
      :hov-data="xsck_saleHov"
    ></hov-tools>
    <hov-tools
      v-if="xsck_companyVisible"
      :hov-data="xsck_companyHov"
    ></hov-tools>

    <div>
      <!-- 新增   -->
      <el-dialog
        v-if="xsck_dialogVisible"
        :visible.sync="xsck_dialogVisible"
        :title="xsck_dialogTitle"
        :width="xsck_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="xsck_base"
          :inline="xsck_inline"
          :label-width="xsck_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="销售单ID">
                <el-input
                  v-model="xsck_base.salesid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('salesid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户ID">
                <el-input
                  v-model="xsck_base.customid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户名称">
                <el-input
                  v-model="xsck_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额">
                <el-input
                  v-model="xsck_base.total"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>

        <div
          slot="footer"
          style="text-align:center"
        >
          <el-button
            type="primary"
            round
            @click="save"
          >保存</el-button>
          <el-button
            type="info"
            round
            @click="closeDialog"
          >取消</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <!-- 销售出库明细查询 -->
      <el-dialog
        v-if="xsck_dialogVisible_2 == true"
        :visible.sync="xsck_dialogVisible_2"
        :title="'销售出库明细查询'"
        :width="'750px'"
        :destroy-on-close="true"
        @close="closeDialog_2"
        :close-on-click-modal="false"
      >
        <div style="overflow:hidden;padding-left:15px;padding-bottom:15px;">
          <kt-button
            style="float:left;"
            type="primary"
            @click="accXsck"
            :disabled="xsck_base.jzt_usestatus != '1' || xsck_tableData_2.length == 0"
            :perms="'xsckjz:select'"
            :label="'记账'"
          ></kt-button>
        </div>
        <e-table
          ref="doctable_2"
          :table-columns="xsck_tableColumns_2"
          :table-data="xsck_tableData_2"
          :table-height="xsck_tableHeight_2"
          :loading="xsck_loading_2"
          :page-status="false"
          @handle="handleFunction_2"
        >
        </e-table>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import HovTools from "@/views/Core/HovTools";
import KtButton from "@/views/Core/KtButton";
import { paramsFormat, formDataReset } from "@/utils/functions";

export default {
  components: { EQuery, ETable, HovTools, KtButton },
  data() {
    return {
      xsck_formList: [
        // {
        //   type: "inputHov",
        //   label: "单位ID",
        //   id: "companyid",
        //   dataType: "number"
        // },
        {
          type: "inputHov",
          label: "销售单ID",
          id: "salesid",
          dataType: "number"
        }
      ],
      xsck_formData: {
        //companyid: null
        salesid: null
      },
      xsck_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "xsck:select",
          perms: "xsck:select"
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          //perms: "xsck:insert"
          perms: "xsck:insert"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "xsck:select"
          perms: "xsck:select"
        }
      ],

      xsck_tableColumns: [
        { prop: "salesid", label: "销售单ID", type: 0, tableStatus: 0 },
        {
          prop: "credate",
          label: "创建日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        { prop: "customid", label: "客户ID", type: 0, tableStatus: 0 },
        {
          prop: "companyname",
          label: "客户名称",
          type: 0,
          tableStatus: 0,
          width: 150
        },
        { prop: "total", label: "金额", type: 0, tableStatus: 0 },
        {
          prop: "jzt_usestatusname",
          label: "状态",
          type: 0,
          tableStatus: 0
        },
        // { prop: "usestatus", label: "EPRS状态", type: 0, tableStatus: 0 },
        { prop: "inputmanid", label: "录入人", type: 0, tableStatus: 0 },
        { prop: "uploadmanid", label: "上传人", type: 0, tableStatus: 0 },
        {
          prop: "uploaddate",
          label: "上传日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        { prop: "accname", label: "记账人", type: 0, tableStatus: 0 },
        {
          prop: "accdate",
          label: "记账日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },

        {
          prop: "caozuo",
          label: "操作",
          type: 1,
          fixed: "right",
          width: 200,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: "upload",
              icon: "fa fa-edit",
              label: "同步",
              perms: "xsck:syc"
              //perms:"xsck:syc",
            },
            {
              id: "selectdtl",
              icon: "fa fa-quary",
              label: "出库明细",
              perms: "xsckhc:select"
              //perms:"xsck:selectdtl",
            }
          ]
        }
      ],
      xsck_tableData: [],
      xsck_tableHeight: 350,
      xsck_loading: false,

      xsck_saleVisible: false,
      xsck_saleHov: {
        hovTitle: "销售单查询",
        hovUrl: "/xsckhov/select",
        afterStatus: false,
        fillDataName: "xsck_formData",
        parentVisible: "xsck_saleVisible",
        hovColumns: [
          {
            id: "salesid",
            name: "销售单ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "salesid"
          },
          {
            id: "total",
            name: "金额",
            queryStatus: false,
            dataStatus: 2,
            fillid: "total"
          },
          {
            id: "credate",
            name: "生成日期",
            queryStatus: false,
            dataStatus: 1,
            type: "date",
            fillid: "credate"
          },
          {
            id: "customid",
            name: "客户ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "customid"
          },
          {
            id: "companyname",
            name: "客户名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "companyname"
          },
          {
            id: "usestatus",
            name: "eprs状态",
            queryStatus: false,
            dataStatus: 1,
            display: 1,
            fillid: "usestatus"
          },
          {
            // hov 需要 companyid
            id: "companyid",
            name: "rccompanyid",
            queryStatus: true,
            dataStatus: 1,
            display: 1,
            value: sessionStorage.getItem("companyid")
          }
        ]
      },

      xsck_companyVisible: false,
      xsck_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "xsck_formData",
        parentVisible: "xsck_companyVisible",
        hovColumns: [
          {
            id: "companyid",
            name: "单位ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "companyid"
          },
          {
            id: "companyname",
            name: "单位名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "companyname"
          },
          {
            id: "companyopcode",
            name: "单位操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },

      //   el-dialog 数据
      xsck_dialogVisible: false,
      xsck_dialogTitle: "",
      xsck_dtlstatus: false, // 新增 false 修改 true

      xsck_dialogWidth: "700px",
      xsck_inline: true,
      xsck_dialogLabelWidth: "120px",

      xsck_base: {
        salesid: null, // 采购订单
        customid: null, // 客户ID
        companyname: null, //客户名称
        total: null, // 金额
        usestatus: null, // eprs状态

        code: null, // 200 可记账  201 不可以记账
        jzt_usestatus: null // '1'- 已上传未记账
      },

      xsck_dialogVisible_2: false, // 默认隐藏
      // 入库明细查询
      xsck_tableColumns_2: [
        { prop: "Biz_Bill_No", label: "业务单据编号", type: 0, tableStatus: 0 },
        {
          prop: "Goods_No",
          label: "商品编号",
          type: 0,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        {
          prop: "Goods_Lotno",
          label: "商品批号",
          type: 0,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        {
          prop: "Production_Date",
          label: "生产日期",
          type: 2,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        {
          prop: "Valid_Until",
          label: "有效期",
          type: 2,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        {
          prop: "Outnbound_Quantity",
          label: "出库数量",
          type: 0,
          tableStatus: 0
        }
        // {
        //   prop: "caozuo",
        //   label: "操作",
        //   type: 1,
        //   fixed: "right",
        //   width: 90,
        //   widthStatus: true,
        //   tableStatus: 0,
        //   options: [
        //     {
        //       id: "acc",
        //       icon: "fa fa-edit",
        //       label: "记账",
        //       perms: ""
        //       //perms: "xsck:acc"
        //     }
        //   ]
        // }
      ],
      xsck_tableData_2: [],
      xsck_tableHeight_2: 350,
      xsck_loading_2: false
    };
  },

  methods: {
    // data  xsck_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.xsck_formData);
      } else if (data === "add") {
        this.beforeInsert();
      }
    },

    handleFunction(data) {
      if (data.id === "upload") {
        this.upload(data.row);
      } else if (data.id == "selectdtl") {
        this.selectDtl(data.row);
      }
    },

    handleFunction_2(data) {
      if (data.id === "acc") {
        this.accXsck(data.row);
      }
    },

    openHov(data) {
      this.xsck_saleHov.fillDataName = "xsck_formData";
      this.xsck_companyHov.fillDataName = "xsck_formData";
      if (data == "companyid") {
        this.xsck_companyVisible = true;
      } else if (data == "salesid") {
        this.xsck_saleVisible = true;
      }
    },
    openDailogHov(data) {
      this.xsck_saleHov.fillDataName = "xsck_base";
      this.xsck_companyHov.fillDataName = "xsck_base";
      if (data == "companyid") {
        this.xsck_companyVisible = true;
      } else if (data == "salesid") {
        this.xsck_saleVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let xsck_formData = this.xsck_formData;
      let params = paramsFormat(xsck_formData);
      this.xsck_loading = true;
      this.xsck_tableData = [];
      this.$api.jzt
        .selectXsck({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.xsck_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.xsck_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.xsck_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.xsck_dialogVisible = false;
    },
    openDialog() {
      this.xsck_dialogVisible = true;
    },

    closeDialog_2() {
      this.xsck_dialogVisible_2 = false;
    },
    openDialog_2() {
      this.xsck_dialogVisible_2 = true;
    },

    beforeInsert() {
      this.xsck_dialogTitle = "新增";
      this.xsck_dtlstatus = false;
      Object.keys(this.xsck_base).forEach(e => {
        this.xsck_base[e] = null;
      });
      this.openDialog();
    },

    // 保存
    save() {
      this.insert();
    },
    // 新增
    insert() {
      let params = {
        inputmanid: sessionStorage.getItem("userid"),
        salesid: this.xsck_base.salesid,
        customid: this.xsck_base.customid,
        total: this.xsck_base.total
      };
      console.log("jzt xsck insert p ", params);
      this.$api.jzt
        .insertXscks(params)
        .then(res => {
          if (res.code == 200) {
            alert("保存成功");
            this.afterSave();
          } else {
            alert(res.msg);
          }
        })
        .catch(e => {
          return false;
        });
    },

    // 同步
    upload(row) {
      if (row.jzt_usestatusname != "未上传") {
        alert("当前状态不能同步。");
        return;
      }
      let params = {
        salesid: row.salesid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username"),
        companyid: sessionStorage.getItem("companyid")
      };
      console.log("jzt xsck upload p ", params);
      this.$api.jzt
        .uploadXsck(params)
        .then(res => {
          if (res.code == 200) {
            alert("同步成功");
          } else {
            alert(res.msg);
          }
        })
        .catch(e => {
          return false;
        });
    },

    // 查询 采购入库 回传明细
    selectDtl(row) {
      this.xsck_base.code = null;
      this.xsck_base.salesid = row.salesid;
      this.xsck_base.jzt_usestatus = row.jzt_usestatus;

      this.openDialog_2();
      this.xsck_loading_2 = true;
      let params = {
        salesid: row.salesid
      };
      this.$api.jzt
        .selectXsckDtl(params)
        .then(res => {
          this.xsck_base.code = res.code;
          if (res.code === 200 || res.code === 201) {
            this.xsck_tableData_2 = Object.freeze(res.data);
          } else {
            alert(res.msg);
          }
          this.xsck_loading_2 = false;
        })
        .catch(error => {
          this.xsck_loading_2 = false;
          return false;
        });
    },

    // 记账
    accXsck(row) {
      let params = {
        salesid: this.xsck_base.salesid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username")
      };
      console.log("Xsck acc p ", params);
      this.$api.jzt
        .accXsck(params)
        .then(res => {
          if (res.code == 200) {
            alert("记账成功");
            this.closeDialog_2();
            this.afterSave();
          } else {
            alert(res.msg);
          }
        })
        .catch(e => {
          return false;
        });
    },

    afterSave() {
      // 新增 修改 成功  关闭弹窗 再查询
      this.closeDialog();
      let pageSize = this.$refs.doctable.pageSize;
      this.selectDoc(1, pageSize);
    },

    setTableHeight() {
      // 设置表格高度
      this.xsck_tableHeight = window.innerHeight - 240;
    }
  },
  created() {
    this.setTableHeight();
  },
};
</script>
<style scoped>
</style>