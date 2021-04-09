<!--    销售退回   -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="xsth_formList"
      :form-data="xsth_formData"
      :btn-options="xsth_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="xsth_tableColumns"
      :table-data="xsth_tableData"
      :table-height="xsth_tableHeight"
      :table-width-status="false"
      :loading="xsth_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="xsth_sabackVisible"
      :hov-data="xsth_sabackHov"
    ></hov-tools>
    <hov-tools
      v-if="xsth_companyVisible"
      :hov-data="xsth_companyHov"
    ></hov-tools>

    <div>
      <!-- 新增   -->
      <el-dialog
        v-if="xsth_dialogVisible"
        :visible.sync="xsth_dialogVisible"
        :title="xsth_dialogTitle"
        :width="xsth_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="xsth_base"
          :inline="xsth_inline"
          :label-width="xsth_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="退货通知单ID">
                <el-input
                  v-model="xsth_base.sabackdocid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('sabackdocid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户ID">
                <el-input
                  v-model="xsth_base.customid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户名称">
                <el-input
                  v-model="xsth_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额">
                <el-input
                  v-model="xsth_base.total"
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
      <!-- 销售退回明细查询 -->
      <el-dialog
        v-if="xsth_dialogVisible_2 == true"
        :visible.sync="xsth_dialogVisible_2"
        :title="'销售退回明细查询'"
        :width="'750px'"
        :destroy-on-close="true"
        @close="closeDialog_2"
        :close-on-click-modal="false"
      >

        <div style="overflow:hidden;padding-left:15px;padding-bottom:15px;">
          
          <kt-button
            style="float:left;"
            type="primary"
            @click="accXsth"
            :disabled="!xsth_base.canAcc"
            :perms="'xsthjz:select'"
            :label="'记账'"
          ></kt-button>
        </div>

        <e-table
          ref="doctable_2"
          :table-columns="xsth_tableColumns_2"
          :table-data="xsth_tableData_2"
          :table-height="xsth_tableHeight_2"
          :loading="xsth_loading_2"
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
      xsth_formList: [
        // {
        //   type: "inputHov",
        //   label: "单位ID",
        //   id: "companyid",
        //   dataType: "number"
        // },
        {
          type: "inputHov",
          label: "退货通知单ID",
          id: "sabackdocid",
          dataType: "number"
        }
      ],
      xsth_formData: {
        //companyid: null
        sabackdocid: null
      },
      xsth_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "xsth:select",
          perms: "xsth:select"
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          //perms: "xsth:insert"
          perms: "xsth:insert"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "xsth:select"
          perms: "xsth:select"
        }
      ],

      xsth_tableColumns: [
        { prop: "sabackdocid", label: "退货通知单ID", type: 0, tableStatus: 0 },
        {
          prop: "credate",
          label: "创建日期",
          type: 2,
          width: 150,
          tableStatus: 0
        },
        { prop: "customid", label: "客户ID", type: 0, tableStatus: 0 },
        { prop: "companyname", label: "客户名称", type: 0, tableStatus: 0, width:150,},
        { prop: "total", label: "金额", type: 0, tableStatus: 0 },
        {
          prop: "jzt_usestatus",
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
              perms: "xsth:syc"
              //perms:"xsth:syc",
            },
            {
              id: "selectdtl",
              icon: "fa fa-quary",
              label: "入库明细",
              perms: "xsthhc:select"
              //perms:"xsth:selectdtl",
            }
          ]
        }
      ],
      xsth_tableData: [],
      xsth_tableHeight: 350,
      xsth_loading: false,

      xsth_sabackVisible: false,
      xsth_sabackHov: {
        hovTitle: "销售退货通知单查询",
        hovUrl: "xsthhov/select",
        afterStatus: false,
        fillDataName: "xsth_formData",
        parentVisible: "xsth_sabackVisible",
        hovColumns: [
          {
            id: "sabackdocid",
            name: "退货通知单ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "sabackdocid"
          },
          {
            id: "total_line",
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

      xsth_companyVisible: false,
      xsth_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "xsth_formData",
        parentVisible: "xsth_companyVisible",
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
      xsth_dialogVisible: false,
      xsth_dialogTitle: "",
      xsth_dtlstatus: false, // 新增 false 修改 true

      xsth_dialogWidth: "700px",
      xsth_inline: true,
      xsth_dialogLabelWidth: "120px",

      xsth_base: {
        sabackdocid: null, // 采购订单
        customid: null, // 客户ID
        companyname: null, //客户名称
        total: null, // 金额
        usestatus: null, // eprs状态

        canAcc: false, // 是否可以记账
        accParams: [] // 记账请求参数
      },

      xsth_dialogVisible_2: false, // 默认隐藏
      // 入库明细查询
      xsth_tableColumns_2: [
        { prop: "inorderdtlid", label: "细单ID", type: 0, tableStatus: 0 },
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
      ],
      xsth_tableData_2: [],
      xsth_tableHeight_2: 350,
      xsth_loading_2: false
    };
  },

  methods: {
    // data  xsth_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.xsth_formData);
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
        this.accXsth(data.row);
      }
    },

    openHov(data) {
      this.xsth_sabackHov.fillDataName = "xsth_formData";
      this.xsth_companyHov.fillDataName = "xsth_formData";
      if (data == "companyid") {
        this.xsth_companyVisible = true;
      } else if (data == "sabackdocid") {
        this.xsth_sabackVisible = true;
      }
    },
    openDailogHov(data) {
      this.xsth_sabackHov.fillDataName = "xsth_base";
      this.xsth_companyHov.fillDataName = "xsth_base";
      if (data == "companyid") {
        this.xsth_companyVisible = true;
      } else if (data == "sabackdocid") {
        this.xsth_sabackVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let xsth_formData = this.xsth_formData;
      let params = paramsFormat(xsth_formData);
      this.xsth_loading = true;
      this.xsth_tableData = [];
      this.$api.jzt
        .selectXsth({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.xsth_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.xsth_loading = false;
          }else{
            alert(res.msg)
          }
        })
        .catch(error => {
          this.xsth_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.xsth_dialogVisible = false;
    },
    openDialog() {
      this.xsth_dialogVisible = true;
    },

    closeDialog_2() {
      this.xsth_dialogVisible_2 = false;
    },
    openDialog_2() {
      this.xsth_dialogVisible_2 = true;
    },

    beforeInsert() {
      this.xsth_dialogTitle = "新增";
      this.xsth_dtlstatus = false;
      Object.keys(this.xsth_base).forEach(e => {
        this.xsth_base[e] = null;
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
        sabackdocid: this.xsth_base.sabackdocid,
        customid: this.xsth_base.customid,
        // usestatus: this.xsth_base.usestatus,
        total_line: this.xsth_base.total
      };
      console.log("jzt Xsth insert p ", params);
      this.$api.jzt
        .insertXsth(params)
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
      if (row.jzt_usestatus != "未上传") {
        alert("当前状态不能同步。");
        return;
      }
      let params = {
        sabackdocid: row.sabackdocid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username"),
        companyid: sessionStorage.getItem("companyid")
      };
      console.log("jzt Xsth upload p ", params);
      this.$api.jzt
        .uploadXsth(params)
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
      this.xsth_base.sabackdocid = row.sabackdocid;
      this.xsth_base.canAcc = false;

      this.openDialog_2();
      this.xsth_loading_2 = true;
      let params = {
        sabackdocid: row.sabackdocid,
        inputmanid: sessionStorage.getItem("userid"),
        inputmanname: sessionStorage.getItem("username")
      };
      this.$api.jzt
        .selectXsthDtl(params)
        .then(res => {
          if (res.code === 200) {
            this.xsth_tableData_2 = Object.freeze(res.data);
          }else{
            alert(res.msg)
          }
          this.xsth_loading_2 = false;

          this.xsth_base.accParams = this.getAccXsthParams();
          if (this.xsth_base.accParams) this.xsth_base.canAcc = true;
        })
        .catch(error => {
          this.xsth_loading_2 = false;
          return false;
        });
    },

    // 记账
    accXsth(row) {
      this.xsth_base.canAcc = false;

      let params = this.xsth_base.accParams;
      console.log("Xsth acc p ", params);
      this.$api.jzt
        .accXsth(params)
        .then(res => {
          if (res.code == 200) {
            alert("记账成功");
            this.closeDialog_2();
            this.afterSave();
            return;
          }else{
            alert(res.msg)
          }
          this.xsth_base.canAcc = true;
        })
        .catch(e => {
          this.xsth_base.canAcc = true;
          return false;
        });
    },
    // 生成记账参数
    getAccXsthParams() {
      if (!this.xsth_tableData_2 instanceof Array) {
        return null;
      }
      let params = null;
      let set = new Set();
      this.xsth_tableData_2.forEach(item => {
        if (item.status && item.status == "4") {
          params = params ? params : [];
          //状态4-未记账
          if (!set.has(item.indocid)) {
            let b = {
              indocid: item.indocid,
              inputmanid: sessionStorage.getItem("userid"),
              inputmanname: sessionStorage.getItem("username"),
              sabackdocid: this.xsth_base.sabackdocid
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
      this.xsth_tableHeight = window.innerHeight - 240;
    }
  },
  created() {
    this.setTableHeight();
  }
};
</script>
<style scoped>
</style>