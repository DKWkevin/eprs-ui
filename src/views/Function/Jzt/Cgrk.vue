<!--    采购入库   -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="cgrk_formList"
      :form-data="cgrk_formData"
      :btn-options="cgrk_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="cgrk_tableColumns"
      :table-data="cgrk_tableData"
      :table-height="cgrk_tableHeight"
      :table-width-status="false"
      :loading="cgrk_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="cgrk_orderVisible"
      :hov-data="cgrk_orderHov"
    ></hov-tools>
    <hov-tools
      v-if="cgrk_companyVisible"
      :hov-data="cgrk_companyHov"
    ></hov-tools>

    <div>
      <!-- 新增   -->
      <el-dialog
        v-if="cgrk_dialogVisible"
        :visible.sync="cgrk_dialogVisible"
        :title="cgrk_dialogTitle"
        :width="cgrk_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="cgrk_base"
          :inline="cgrk_inline"
          :label-width="cgrk_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="订单ID">
                <el-input
                  v-model="cgrk_base.orderid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('orderid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商ID">
                <el-input
                  v-model="cgrk_base.supplyid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商名称">
                <el-input
                  v-model="cgrk_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额">
                <el-input
                  v-model="cgrk_base.total"
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
      <!-- 采购入库明细查询 -->
      <el-dialog
        v-if="cgrk_dialogVisible_2 == true"
        :visible.sync="cgrk_dialogVisible_2"
        :title="'采购入库明细查询'"
        :width="'750px'"
        :destroy-on-close="true"
        @close="closeDialog_2"
        :close-on-click-modal="false"
      >

        <div style="overflow:hidden;padding-left:15px;padding-bottom:15px;">
          <kt-button
            style="float:left;"
            type="primary"
            @click="accCgrk"
            :disabled="!cgrk_base.canAcc"
            :perms="'cgrkjz:select'"
            :label="'记账'"
          ></kt-button>
        </div>

        <e-table
          ref="doctable_2"
          :table-columns="cgrk_tableColumns_2"
          :table-data="cgrk_tableData_2"
          :table-height="cgrk_tableHeight_2"
          :loading="cgrk_loading_2"
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
      cgrk_formList: [
        // {
        //   type: "inputHov",
        //   label: "单位ID",
        //   id: "companyid",
        //   dataType: "number"
        // },
        {
          type: "inputHov",
          label: "采购订单ID",
          id: "orderid",
          dataType: "number"
        }
      ],
      cgrk_formData: {
        //companyid: null
        orderid: null
      },
      cgrk_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "cgrk:select"
          //perms: ""
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          perms: "cgrk:insert"
          //perms: ""
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          perms: "cgrk:select"
          //perms: ""
        }
      ],

      cgrk_tableColumns: [
        {
          prop: "orderid",
          label: "采购订单ID",
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
        {
          prop: "supplyname",
          label: "供应商名称",
          type: 0,
          tableStatus: 0,
          width: 150
        },
        { prop: "total", label: "金额", type: 0, tableStatus: 0 },
        {
          prop: "jzt_usestatus",
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
              //perms: ""
              perms: "cgrk:syc"
            },
            {
              id: "selectdtl",
              icon: "fa fa-quary",
              label: "入库明细",
              perms: "rkhc:select"
              //perms:"rkhc:select",
            }
          ]
        }
      ],
      cgrk_tableData: [],
      cgrk_tableHeight: 350,
      cgrk_loading: false,

      cgrk_orderVisible: false,
      cgrk_orderHov: {
        hovTitle: "采购订单查询",
        hovUrl: "cgrk/cgdd",
        afterStatus: false,
        fillDataName: "cgrk_formData",
        parentVisible: "cgrk_orderVisible",
        hovColumns: [
          {
            id: "orderid",
            name: "订单ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "orderid"
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
            id: "supplyid",
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
            id: "companyid",
            name: "公司ID",
            queryStatus: true,
            dataStatus: 2,
            display: 1,
            value: sessionStorage.getItem("companyid")
          }
        ]
      },

      cgrk_companyVisible: false,
      cgrk_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "cgrk_formData",
        parentVisible: "cgrk_companyVisible",
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
      cgrk_dialogVisible: false,
      cgrk_dialogTitle: "",
      cgrk_dtlstatus: false, // 新增 false 修改 true

      cgrk_dialogWidth: "700px",
      cgrk_inline: true,
      cgrk_dialogLabelWidth: "120px",

      cgrk_base: {
        orderid: null, // 采购订单
        supplyid: null, // 供应商ID
        companyname: null, //供应商名称
        total: null, // 金额
        usestatus: null, // eprs状态

        canAcc: false, // 是否可以记账
        accParams: [] // 记账请求参数
      },

      cgrk_dialogVisible_2: false, // 默认隐藏
      // 入库明细查询
      cgrk_tableColumns_2: [
        { prop: "orderdtlid", label: "细单ID", type: 0, tableStatus: 0 },
        {
          prop: "goodsid",
          label: "货品ID",
          type: 0,
          tableStatus: 0,

          widthStatus: true
        },
        {
          prop: "goodsname",
          label: "品名",
          type: 0,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        {
          prop: "goodstype",
          label: "规格",
          type: 0,
          tableStatus: 0,
          widthStatus: true
        },
        {
          prop: "goodsunit",
          label: "单位",
          type: 0,
          tableStatus: 0,
          widthStatus: true
        },
        {
          prop: "prodarea",
          label: "产地",
          type: 0,
          tableStatus: 0,
          width: 150
        },
        {
          prop: "recqty",
          label: "合格数量",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "breakqty",
          label: "不合格数量",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "statusname",
          label: "状态",
          type: 0,
          tableStatus: 0,
          width: 150
        },
        {
          prop: "indocid",
          label: "收货单ID",
          type: 0,
          tableStatus: 0,
          width: 150
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
        //       //perms: "cgrk:acc"
        //     }
        //   ]
        // }
      ],
      cgrk_tableData_2: [],
      cgrk_tableHeight_2: 350,
      cgrk_loading_2: false
    };
  },

  methods: {
    // data  cgrk_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.cgrk_formData);
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
        this.accCgrk(data.row);
      }
    },

    openHov(data) {
      this.cgrk_orderHov.fillDataName = "cgrk_formData";
      this.cgrk_companyHov.fillDataName = "cgrk_formData";
      if (data == "companyid") {
        this.cgrk_companyVisible = true;
      } else if (data == "orderid") {
        this.cgrk_orderVisible = true;
      }
    },
    openDailogHov(data) {
      this.cgrk_orderHov.fillDataName = "cgrk_base";
      this.cgrk_companyHov.fillDataName = "cgrk_base";
      if (data == "companyid") {
        this.cgrk_companyVisible = true;
      } else if (data == "orderid") {
        this.cgrk_orderVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let cgrk_formData = this.cgrk_formData;
      let params = paramsFormat(cgrk_formData);
      this.cgrk_loading = true;
      this.cgrk_tableData = [];
      this.$api.jzt
        .selectCgrk({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.cgrk_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.cgrk_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.cgrk_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.cgrk_dialogVisible = false;
    },
    openDialog() {
      this.cgrk_dialogVisible = true;
    },

    closeDialog_2() {
      this.cgrk_dialogVisible_2 = false;
    },
    openDialog_2() {
      this.cgrk_dialogVisible_2 = true;
    },

    beforeInsert() {
      this.cgrk_dialogTitle = "新增";
      this.cgrk_dtlstatus = false;
      Object.keys(this.cgrk_base).forEach(e => {
        this.cgrk_base[e] = null;
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
        orderid: this.cgrk_base.orderid,
        supplyid: this.cgrk_base.supplyid,
        usestatus: this.cgrk_base.usestatus,
        total: this.cgrk_base.total
      };
      console.log("jzt Cgrk insert p ", params);
      this.$api.jzt
        .insertCgrk(params)
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
      if (row.jzt_usestatus != "未上传") {
        alert("当前状态不能同步。");
        return;
      }
      let params = {
        orderid: row.orderid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username"),
        companyid: sessionStorage.getItem("companyid")
      };
      console.log("jzt Cgrk upload p ", params);
      this.$api.jzt
        .uploadCgrk(params)
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
      this.cgrk_base.orderid = row.orderid;
      this.cgrk_base.canAcc = false;

      this.openDialog_2();
      this.cgrk_loading_2 = true;
      let params = {
        orderid: row.orderid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username")
      };
      this.$api.jzt
        .selectCgrkDtl(params)
        .then(res => {
          if (res.code === 200) {
            this.cgrk_tableData_2 = Object.freeze(res.data);
          } else {
            alert(res.msg);
          }
          this.cgrk_loading_2 = false;
          this.cgrk_base.accParams = this.getAccCgrkParams();
          if (this.cgrk_base.accParams) this.cgrk_base.canAcc = true;
        })
        .catch(error => {
          this.cgrk_loading_2 = false;
          return false;
        });
    },

    // 记账
    accCgrk(row) {
      this.cgrk_base.canAcc = false;

      let params = this.cgrk_base.accParams;
      console.log("cgrk acc p ", params);
      this.$api.jzt
        .accCgrk(params)
        .then(res => {
          if (res.code == 200) {
            alert("记账成功");
            this.closeDialog_2();
            this.afterSave();
            return;
          } else {
            alert(res.msg);
          }

          this.cgrk_base.canAcc = true;
        })
        .catch(e => {
          this.cgrk_base.canAcc = true;
          return false;
        });
    },

    // 生成记账参数
    getAccCgrkParams() {
      if (!this.cgrk_tableData_2 instanceof Array) {
        return null;
      }
      let params = null;
      let set = new Set();
      this.cgrk_tableData_2.forEach(item => {
        if (item.status && item.status == "4") {
          params = params ? params : [];
          //状态4-未记账
          if (!set.has(item.indocid)) {
            let b = {
              indocid: item.indocid,
              inputmanid: sessionStorage.getItem("userid"),
              inputmanname: sessionStorage.getItem("username"),
              orderid: this.cgrk_base.orderid
            };
            params.push(b);
            set.add(item.indocid);
          }
        }
      });
      return params;
    },

    afterSave() {
      // 新增 修改 成功  关闭弹窗 再查询
      this.closeDialog();
      let pageSize = this.$refs.doctable.pageSize;
      this.selectDoc(1, pageSize);
    },

    setTableHeight() {
      // 设置表格高度
      this.cgrk_tableHeight = window.innerHeight - 240;
    },
  },
  created() {
    this.setTableHeight();
  }
};
</script>
<style scoped>
</style>