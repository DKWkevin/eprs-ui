<!--    购进退出   -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="gjtc_formList"
      :form-data="gjtc_formData"
      :btn-options="gjtc_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="gjtc_tableColumns"
      :table-data="gjtc_tableData"
      :table-height="gjtc_tableHeight"
      :table-width-status="false"
      :loading="gjtc_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="gjtc_orderVisible"
      :hov-data="gjtc_orderHov"
    ></hov-tools>
    <hov-tools
      v-if="gjtc_companyVisible"
      :hov-data="gjtc_companyHov"
    ></hov-tools>

    <div>
      <!-- 新增   -->
      <el-dialog
        v-if="gjtc_dialogVisible"
        :visible.sync="gjtc_dialogVisible"
        :title="gjtc_dialogTitle"
        :width="gjtc_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="gjtc_base"
          :inline="gjtc_inline"
          :label-width="gjtc_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="退货通知单ID">
                <el-input
                  v-model="gjtc_base.subackdocid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('subackdocid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商ID">
                <el-input
                  v-model="gjtc_base.supplyid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商名称">
                <el-input
                  v-model="gjtc_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额">
                <el-input
                  v-model="gjtc_base.total"
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
      <!-- 购进退出明细查询 -->
      <el-dialog
        v-if="gjtc_dialogVisible_2 == true"
        :visible.sync="gjtc_dialogVisible_2"
        :title="'购进退出明细查询'"
        :width="'750px'"
        :destroy-on-close="true"
        @close="closeDialog_2"
        :close-on-click-modal="false"
      >
        <div style="overflow:hidden;padding-left:15px;padding-bottom:15px;">
          <kt-button
            style="float:left;"
            type="primary"
            @click="accGjtc"
            :disabled="gjtc_base.jzt_usestatus != '1' || gjtc_tableData_2.length == 0"
            :perms="'gjtcjz:select'"
            :label="'记账'"
          ></kt-button>
        </div>

        <e-table
          ref="doctable_2"
          :table-columns="gjtc_tableColumns_2"
          :table-data="gjtc_tableData_2"
          :table-height="gjtc_tableHeight_2"
          :loading="gjtc_loading_2"
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
import KtButton from "@/views/Core/KtButton"
import { paramsFormat, formDataReset } from "@/utils/functions";

export default {
  components: { EQuery, ETable, HovTools , KtButton},
  data() {
    return {
      gjtc_formList: [
        // {
        //   type: "inputHov",
        //   label: "单位ID",
        //   id: "companyid",
        //   dataType: "number"
        // },
        {
          type: "inputHov",
          label: "退货通知单ID",
          id: "subackdocid",
          dataType: "number"
        }
      ],
      gjtc_formData: {
        //companyid: null
        subackdocid: null
      },
      gjtc_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "gjtc:select",
          perms: "gjtc:select"
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          //perms: "gjtc:insert"
          perms: "gjtc:insert"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "gjtc:select"
          perms: "gjtc:select"
        }
      ],

      gjtc_tableColumns: [
        {
          prop: "subackdocid",
          label: "退货通知单ID",
          type: 0,
          width: 150,
          tableStatus: 0
        },
        {
          prop: "credate",
          label: "创建日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        { prop: "supplyid", label: "供应商ID", type: 0, tableStatus: 0 },
        { prop: "supplyname", label: "供应商名称", type: 0, tableStatus: 0, width:150,},
        { prop: "total", label: "金额", type: 0, tableStatus: 0 },
        {
          prop: "jzt_usestatusname",
          label: "状态",
          type: 0,
          tableStatus: 0
        },
        // { prop: "usestatusname", label: "EPRS状态", type: 0, tableStatus: 0 },
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
              perms: "gjtc:syc"
              //perms:"gjtc:syc",
            },
            {
              id: "selectdtl",
              icon: "fa fa-quary",
              label: "出库明细",
              perms: "gjtchc:select"
              //perms:"gjtc:selectdtl",
            }
          ]
        }
      ],
      gjtc_tableData: [],
      gjtc_tableHeight: 350,
      gjtc_loading: false,

      gjtc_orderVisible: false,
      gjtc_orderHov: {
        hovTitle: "进货退货通知单查询",
        hovUrl: "gjtchov/select",
        afterStatus: false,
        fillDataName: "gjtc_formData",
        parentVisible: "gjtc_orderVisible",
        hovColumns: [
          {
            id: "subackdocid",
            name: "退货通知单ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "subackdocid"
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
            id: "reccompanyid",
            name: "供应商ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "supplyid"
          },
          {
            id: "companyname",
            name: "供应商名称",
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

      gjtc_companyVisible: false,
      gjtc_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "gjtc_formData",
        parentVisible: "gjtc_companyVisible",
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
      gjtc_dialogVisible: false,
      gjtc_dialogTitle: "",
      gjtc_dtlstatus: false, // 新增 false 修改 true

      gjtc_dialogWidth: "700px",
      gjtc_inline: true,
      gjtc_dialogLabelWidth: "120px",

      gjtc_base: {
        subackdocid: null, // 进货退货通知单
        supplyid: null, // 供应商ID
        companyname: null, //供应商名称
        total: null, // 金额
        usestatus: null, // eprs状态

        code: null,
        jzt_usestatus: null // '1' 已上传未记账 时 才可以记账
      },
      gjtc_dialogVisible_2: false, // 默认隐藏
      // 入库明细查询
      gjtc_tableColumns_2: [
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
        //       //perms: "gjtc:acc"
        //     }
        //   ]
        // }
      ],
      gjtc_tableData_2: [],
      gjtc_tableHeight_2: 350,
      gjtc_loading_2: false
    };
  },

  methods: {
    // data  gjtc_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.gjtc_formData);
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
        this.accGjtc(data.row);
      }
    },
    openHov(data) {
      this.gjtc_orderHov.fillDataName = "gjtc_formData";
      this.gjtc_companyHov.fillDataName = "gjtc_formData";
      if (data == "companyid") {
        this.gjtc_companyVisible = true;
      } else if (data == "subackdocid") {
        this.gjtc_orderVisible = true;
      }
    },
    openDailogHov(data) {
      this.gjtc_orderHov.fillDataName = "gjtc_base";
      this.gjtc_companyHov.fillDataName = "gjtc_base";
      if (data == "companyid") {
        this.gjtc_companyVisible = true;
      } else if (data == "subackdocid") {
        this.gjtc_orderVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let gjtc_formData = this.gjtc_formData;
      let params = paramsFormat(gjtc_formData);
      this.gjtc_loading = true;
      this.gjtc_tableData = [];
      this.$api.jzt
        .selectGjtc({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.gjtc_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.gjtc_loading = false;
          }else{
            alert(res.msg)
          }
        })
        .catch(error => {
          this.gjtc_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.gjtc_dialogVisible = false;
    },
    openDialog() {
      this.gjtc_dialogVisible = true;
    },

    closeDialog_2() {
      this.gjtc_dialogVisible_2 = false;
    },
    openDialog_2() {
      this.gjtc_dialogVisible_2 = true;
    },

    beforeInsert() {
      this.gjtc_dialogTitle = "新增";
      this.gjtc_dtlstatus = false;
      Object.keys(this.gjtc_base).forEach(e => {
        this.gjtc_base[e] = null;
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
        subackdocid: this.gjtc_base.subackdocid,
        supplyid: this.gjtc_base.supplyid,
        // usestatus: this.gjtc_base.usestatus,
        total: this.gjtc_base.total
      };
      console.log("jzt Gjtc insert p ", params);
      this.$api.jzt
        .insertGjtc(params)
        .then(res => {
          if (res.code == 200) {
            alert("保存成功");
            this.afterSave();
          }else{
            alert(res.msg)
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
        subackdocid: row.subackdocid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username"),
        companyid: sessionStorage.getItem("companyid")
      };
      console.log("jzt Gjtc upload p ", params);
      this.$api.jzt
        .uploadGjtc(params)
        .then(res => {
          if (res.code == 200) {
            alert("同步成功");
          }else{
            alert(res.msg)
          }
        })
        .catch(e => {
          return false;
        });
    },

    // 查询 采购入库 回传明细
    selectDtl(row) {
      this.gjtc_base.code = null;
      this.gjtc_base.subackdocid = row.subackdocid;
      this.gjtc_base.jzt_usestatus = row.jzt_usestatus;

      this.openDialog_2();
      this.gjtc_loading_2 = true;
      let params = {
        subackdocid: row.subackdocid
      };
      this.$api.jzt
        .selectGjtcDtl(params)
        .then(res => {
          this.gjtc_base.code = res.code;
          if (res.code === 200 || res.code === 201) {
            this.gjtc_tableData_2 = Object.freeze(res.data);
          }else{
            alert(res.msg)
          }
          this.gjtc_loading_2 = false;
        })
        .catch(error => {
          this.gjtc_loading_2 = false;
          return false;
        });
    },

    // 记账
    accGjtc(row) {
      let params = {
        subackdocid: this.gjtc_base.subackdocid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username")
      };
      console.log("Gjtc acc p ", params);
      this.$api.jzt
        .accGjtc(params)
        .then(res => {
          if (res.code == 200) {
            alert("记账成功");
            this.closeDialog_2();
            this.afterSave();
          }else{
            alert(res.msg)
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
      this.gjtc_tableHeight = window.innerHeight - 240;
    }
  },
  created() {
    this.setTableHeight();
  }
};
</script>
<style scoped>
</style>