<!--  批号管理  -->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="phgl_btnOptions"
      :form-list="phgl_formList"
      :form-data="phgl_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <e-table
      ref="doctable"
      :table-width-status="false"
      :table-columns="phgl_tableColumns"
      :table-data="phgl_tableData"
      :table-height="setTableHeight()"
      :loading="phgl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="phgl_dialogVisible"
        :visible.sync="phgl_dialogVisible"
        :title="phgl_dialogTitle"
        :width="phgl_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="phgl_base"
          :inline="phgl_inline"
          :label-width="phgl_dialogLabelWidth"
        >
          <el-row>

            <el-col
              :span="12"
              v-if="phgl_dtlstatus == true"
            >
              <el-form-item label="批号ID">
                <el-input
                  v-model.number="phgl_base.lotid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="批号">
                <el-input
                  v-model.number="phgl_base.lotno"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  v-model.number="phgl_base.goodsid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品名">
                <el-input
                  v-model.number="phgl_base.goodsname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item
                label="规格"
                label-width="80px"
              >
                <el-input
                  v-model.number="phgl_base.goodstype"
                  :disabled="true"
                  style="width:100px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="单位"
                label-width="80px"
              >
                <el-input
                  v-model.number="phgl_base.goodsunit"
                  :disabled="true"
                  style="width:100px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                label="产地"
                label-width="90px"
              >
                <el-input
                  v-model.number="phgl_base.prodarea"
                  :disabled="true"
                  style="width:100px;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item
                label="中包"
                label-width="80px"
              >
                <el-input
                  v-model.number="phgl_base.mpacksize"
                  :disabled="true"
                  style="width:100px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="大包"
                label-width="80px"
              >
                <el-input
                  v-model.number="phgl_base.packsize"
                  :disabled="true"
                  style="width:100px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="批准文号"
                label-width="100px"
              >
                <el-input
                  v-model.number="phgl_base.approvedocno"
                  style="width:140px;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="生产日期">
                <el-date-picker
                  style="width:165px;"
                  v-model="phgl_base.proddate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效期">
                <el-date-picker
                  style="width:165px;"
                  v-model="phgl_base.invaliddate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
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

    <hov-tools
      v-if="phgl_goodsVisible"
      :hov-data="phgl_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="phgl_companyVisible"
      :hov-data="phgl_companyHov"
    ></hov-tools>

    <hov-tools
      v-if="phgl_e_buyeridVisible"
      :hov-data="phgl_e_buyeridHov"
    ></hov-tools>

    <hov-tools
      v-if="phgl_e_deptidVisible"
      :hov-data="phgl_e_deptidHov"
    ></hov-tools>

  </div>
</template>


<script>
import {
  paramsFormat,
  dateFormat,
} from "@/utils/functions";
export default {
  data() {
    return {
      phgl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "quality:phgl:select"
        }
      ],
      phgl_formList: [
        {
          type: "inputHov",
          label: "货品ID",
          id: "goodsid",
          dataType: "number"
        },
        {
          type: "input",
          label: "批号",
          id: "lotno"
        }
      ],
      phgl_formData: {
        goodsid: null,
        lotno: null
      },

      phgl_tableColumns: [
        { label: "批号ID", prop: "lotid", type: 0, tableStatus: 0 },
        { label: "批号", prop: "lotno", type: 0, tableStatus: 0 },
        { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
        { label: "品名", prop: "goodsname", type: 0, tableStatus: 0 },
        { label: "规格", prop: "goodstype", type: 0, tableStatus: 0 },
        { label: "单位", prop: "goodsunit", type: 0, tableStatus: 0 },
        { label: "产地", prop: "prodarea", type: 0, tableStatus: 0 },
        { label: "生产日期", prop: "proddate", type: 2, tableStatus: 0 },
        { label: "失效期", prop: "invaliddate", type: 2, tableStatus: 0 },
        { label: "批准文号", prop: "approvedocno", type: 0, tableStatus: 0 },
        { label: "大包", prop: "packsize", type: 0, tableStatus: 0 },
        { label: "中包", prop: "mpacksize", type: 0, tableStatus: 0 },
        {
          prop: "caozuo",
          label: "操作",
          type: 1,
          fixed: "right",
          width: 90,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: "edit",
              icon: "fa fa-edit",
              label: "action.edit",
              perms: "quality:phgl:update"
            }
          ]
        }
      ],
      phgl_tableData: [],
      phgl_loading: false,

      //   el-dialog 数据
      phgl_dialogVisible: false,
      phgl_dialogTitle: "",
      phgl_dtlstatus: false, // false 新增  true 修改

      phgl_dialogWidth: "700px",
      phgl_inline: true,
      phgl_dialogLabelWidth: "120px",

      phgl_base: {
        lotno: null, // 批号
        lotid: null, // 批号ID
        goodsid: null, // 货品ID

        goodsname: null, //品名
        goodstype: null, // 规格
        goodsunit: null, // 单位
        prodarea: null, // 产地

        packsize: null, // 大包
        mpacksize: null, // 中包

        approvedocno: null, //批准文号

        proddate: null, // 生产日期
        invaliddate: null // 失效期
      },

      phgl_selectData: { monitortype: [] },

      // hov
      phgl_companyVisible: false,
      phgl_companyHov: {
        hovTitle: "公司查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "phgl_formData",
        parentVisible: "phgl_companyVisible",
        hovColumns: [
          {
            id: "companyid",
            name: "公司ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "companyid"
          },
          {
            id: "companyname",
            name: "公司名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "companyname"
          },
          {
            id: "companyopcode",
            name: "公司操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },
      phgl_goodsVisible: false,
      phgl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "phgl_formData",
        parentVisible: "phgl_goodsVisible",
        hovColumns: [
          {
            id: "goodsid",
            name: "货品ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "goodsid"
          },
          {
            id: "goodsname",
            name: "货品名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "goodsname"
          },
          {
            id: "goodstype",
            name: "规格",
            queryStatus: false,
            dataStatus: 1,
            fillid: "goodstype"
          },
          {
            id: "goodsunit",
            name: "单位",
            queryStatus: false,
            dataStatus: 1,
            fillid: "goodsunit"
          },
          {
            id: "prodarea",
            name: "产地",
            queryStatus: false,
            dataStatus: 1,
            fillid: "prodarea"
          },
          {
            id: "usestatusname",
            name: "状态",
            queryStatus: false,
            dataStatus: 1,
            fillid: "usestatusname"
          }
          // { id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1 }
        ]
      },

      // 淘汰人员Hov
      phgl_e_buyeridVisible: false,
      phgl_e_buyeridHov: {
        hovTitle: "淘汰人员查询",
        hovUrl: "spttdl/selecthovuser",
        afterStatus: false,
        fillDataName: "phgl_formData",
        parentVisible: "phgl_e_buyeridVisible",
        hovColumns: [
          {
            id: "buyerid",
            name: "淘汰人员ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "e_buyerid"
          },
          {
            id: "buyername",
            name: "淘汰人员",
            queryStatus: true,
            dataStatus: 1,
            fillid: "e_buyer"
          }
        ]
      },
      // 淘汰部门Hov
      phgl_e_deptidVisible: false,
      phgl_e_deptidHov: {
        hovTitle: "淘汰部门查询",
        hovUrl: "spttdl/selecthovdept",
        afterStatus: false,
        fillDataName: "phgl_formData",
        parentVisible: "phgl_e_deptidVisible",
        hovColumns: [
          {
            id: "pcdtpeid",
            name: "淘汰部门ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "e_deptid"
          },
          {
            id: "companyname",
            name: "淘汰部门",
            queryStatus: true,
            dataStatus: 1,
            fillid: "e_dept"
          },
          {
            id: "companyid",
            name: "公司ID",
            queryStatus: true,
            dataStatus: 2,
            display: 1,
            value: null
          }
        ]
      }
    };
  },
  created() {
    // this.phgl_selectData.monitortype = selectDdlOption("MONITORTYPE");
    // this.$api.counter.selectLlsbxxwhMonitortype().then(res => {
    //   this.phgl_selectData.monitortype = res.data[0].monitortype;
    // });
  },
  methods: {
    queryFunction(data) {
      if (data == "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "add") {
        this.beforeInsert();
      }
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = paramsFormat(this.phgl_formData);
      if (params == null) params = {};
      params.inputmanid = sessionStorage.getItem("userid");

      console.log("查询 p", params);
      this.phgl_loading = true;
      this.$api.quality
        .selectPhgl({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.phgl_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.phgl_loading = false;
          }
        })
        .catch(error => {
          this.phgl_loading = false;
          return false;
        });
    },

    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    handleFunction(data) {
      if (data.id == "edit") {
        this.beforeUpdate(data);
      }
    },
    openHov(data) {
      this.phgl_goodsHov.fillDataName = "phgl_formData";
      this.phgl_companyHov.fillDataName = "phgl_formData";
      this.phgl_e_buyeridHov.fillDataName = "phgl_formData";
      this.phgl_e_deptidHov.fillDataName = "phgl_formData";
      if (data === "goodsid") {
        this.phgl_goodsVisible = true;
      } else if (data === "companyid") {
        this.phgl_companyVisible = true;
      } else if (data === "e_buyerid") {
        this.phgl_e_buyeridVisible = true;
      } else if (data === "e_deptid") {
        this.phgl_e_deptidVisible = true;
      }
    },

    openDailogHov(data) {
      this.phgl_goodsHov.fillDataName = "phgl_base";
      this.phgl_companyHov.fillDataName = "phgl_base";
      this.phgl_e_buyeridHov.fillDataName = "phgl_base";
      this.phgl_e_deptidHov.fillDataName = "phgl_base";
      if (data === "goodsid") {
        this.phgl_goodsVisible = true;
      } else if (data === "companyid") {
        this.phgl_companyVisible = true;
      } else if (data === "e_buyerid") {
        this.phgl_e_buyeridVisible = true;
      } else if (data === "e_deptid") {
        this.phgl_e_deptidHov.hovColumns[2].value = this.phgl_base.companyid;
        console.log(this.phgl_base.companyid);
        this.phgl_e_deptidVisible = true;
      }
    },

    closeDialog() {
      this.phgl_dialogVisible = false;
    },
    openDialog() {
      this.phgl_dialogVisible = true;
    },
    beforeInsert() {
      this.phgl_dialogTitle = "新增";
      this.phgl_dtlstatus = false;
      Object.keys(this.phgl_base).forEach(e => {
        this.phgl_base[e] = null;
      });

      this.phgl_base.inputmanid = sessionStorage.getItem("userid");
      this.phgl_base.inputman = sessionStorage.getItem("username");
      this.phgl_base.credate = this.getNewDate();
      this.phgl_base.usestatus = "1";

      this.openDialog();
    },

    beforeUpdate(data) {
      this.phgl_dialogTitle = "修改";
      this.phgl_dtlstatus = true;
      Object.keys(this.phgl_base).forEach(e => {
        this.phgl_base[e] = data.row[e];
      });

      this.phgl_base.proddate = dateFormat(
        "YYYY-mm-dd",
        this.phgl_base.proddate
      );
      this.phgl_base.invaliddate = dateFormat(
        "YYYY-mm-dd",
        this.phgl_base.invaliddate
      );

      this.openDialog();
    },

    save() {
      console.log("dtl", this.phgl_dtlstatus);
      if (this.phgl_dtlstatus == true) {
        this.update();
      }
    },

    // 修改
    update() {
      let params = {
        approvedocno: this.phgl_base.approvedocno,// 批准文号
        proddate: this.toDate(this.phgl_base.proddate),// 生产日期
        invaliddate: this.toDate(this.phgl_base.invaliddate), // 失效期
        lotid :　 this.phgl_base.lotid,
      };
      console.log("批号管理 update p ", params);
      this.$api.quality
        .updatePhgl(params)
        .then(res => {
          if (res.code == 200) {
            alert("修改成功");
            this.afterSave();
          }
        })
        .catch(e => {
          return false;
        });
    },

    toDate(dateStr) {
      if (dateStr != null) {
        return new Date(dateStr);
      }
      return null;
    },

    setTableHeight() {
      // 设置表格高度
      let height = window.innerHeight - 240;
      //   console.log("table height ", height);
      return height;
    },

    afterSave() {
      // 新增 修改 成功  关闭弹窗 再查询
      this.closeDialog();
      let pageSize = this.$refs.doctable.pageSize;
      this.selectDoc(1, pageSize);
    }
  }
};
</script>

<style scoped>
</style>

