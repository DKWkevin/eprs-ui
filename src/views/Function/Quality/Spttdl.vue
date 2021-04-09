<!--  商品淘汰队列  -->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="spttdl_btnOptions"
      :form-list="spttdl_formList"
      :form-data="spttdl_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <e-table
      ref="doctable"
      :table-width-status="false"
      :table-columns="spttdl_tableColumns"
      :table-data="spttdl_tableData"
      :table-height="setTableHeight()"
      :loading="spttdl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="spttdl_dialogVisible"
        :visible.sync="spttdl_dialogVisible"
        :title="spttdl_dialogTitle"
        :width="spttdl_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="spttdl_base"
          :inline="spttdl_inline"
          :label-width="spttdl_dialogLabelWidth"
        >
          <el-row>

            <el-col
              :span="12"
              v-if="spttdl_dtlstatus == true"
            >
              <el-form-item label="淘汰队列ID">
                <el-input v-model.number="spttdl_base.id"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="录入日期">
                <el-date-picker
                  style="width:165px;"
                  v-model="spttdl_base.credate"
                  type="date"
                  placeholder="选择日期"
                  disabled="true"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司ID">
                <el-input
                  style="width:130px;"
                  v-model.number="spttdl_base.companyid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('companyid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称">
                <el-input
                  v-model="spttdl_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  style="width:130px;"
                  v-model.number="spttdl_base.goodsid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货品名称">
                <el-input
                  v-model.number="spttdl_base.goodsname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="库存清理方式">
                <el-input v-model="spttdl_base.srmode"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="淘汰原因">
                <el-input v-model="spttdl_base.eliminatereason"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="计划完成日期">
                <el-date-picker
                  style="width:165px;"
                  v-model="spttdl_base.plandate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实际完成日期">
                <el-date-picker
                  style="width:165px;"
                  v-model="spttdl_base.accomplishdate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="录入人ID">
                <el-input
                  v-model="spttdl_base.inputmanid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录入人">
                <el-input
                  v-model="spttdl_base.inputman"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="淘汰人ID">
                <el-input
                  style="width:130px;"
                  v-model.number="spttdl_base.e_buyerid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('e_buyerid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="淘汰人">
                <el-input
                  v-model.number="spttdl_base.e_buyer"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="淘汰部门ID">
                <el-input
                  style="width:130px;"
                  v-model.number="spttdl_base.e_deptid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('e_deptid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="淘汰部门">
                <el-input
                  v-model.number="spttdl_base.e_dept"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="状态">
                <el-select v-model="spttdl_base.usestatus">
                  <el-option
                    :label="'未完成'"
                    :value="'1'"
                  ></el-option>
                  <el-option
                    :label="'已完成'"
                    :value="'2'"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  v-model="spttdl_base.memo"
                  maxlength="30"
                  show-word-limit
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

    <hov-tools
      v-if="spttdl_goodsVisible"
      :hov-data="spttdl_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="spttdl_companyVisible"
      :hov-data="spttdl_companyHov"
    ></hov-tools>

    <hov-tools
      v-if="spttdl_e_buyeridVisible"
      :hov-data="spttdl_e_buyeridHov"
    ></hov-tools>

    <hov-tools
      v-if="spttdl_e_deptidVisible"
      :hov-data="spttdl_e_deptidHov"
    ></hov-tools>

  </div>
</template>


<script>
import {
  paramsFormat,
} from "@/utils/functions";
export default {
  data() {
    return {
      spttdl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "quality:spttdl:select"
        },
        {
          id: "add",
          icon: "fa fa-edit",
          label: "action.add",
          perms: "quality:spttdl:insert"
        }
      ],
      spttdl_formList: [
        {
          type: "inputHov",
          label: "公司ID",
          id: "companyid",
          dataType: "number"
        },
        {
          type: "inputHov",
          label: "货品ID",
          id: "goodsid",
          dataType: "number"
        }
      ],
      spttdl_formData: {
        goodsid: null,
        companyid: null
      },

      spttdl_tableColumns: [
        { label: "淘汰队列ID", prop: "id", type: 0, tableStatus: 0 },
        { label: "录入日期", prop: "credate", type: 2, tableStatus: 0 },
        { label: "录入人ID", prop: "inputmanid", type: 0, tableStatus: 0 },
        { label: "录入人", prop: "inputman", type: 0, tableStatus: 0 },
        { label: "公司ID", prop: "companyid", type: 0, tableStatus: 0 },
        { label: "公司名称", prop: "companyname" },
        { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
        { label: "货品名称", prop: "goodsname", type: 0, tableStatus: 0 },

        { label: "淘汰原因", prop: "eliminatereason", type: 0, tableStatus: 0 },
        { label: "库存清理方式", prop: "srmode", type: 0, tableStatus: 0 },
        { label: "计划完成日期", prop: "plandate", type: 2, tableStatus: 0 },
        {
          label: "实际完成日期",
          prop: "accomplishdate",
          type: 2,
          tableStatus: 0
        },
        { label: "状态", prop: "usestatusname", type: 0, tableStatus: 0 },
        { label: "备注", prop: "memo", type: 0, tableStatus: 0 },

        { label: "淘汰人员ID", prop: "e_buyerid", type: 0, tableStatus: 0 },
        { label: "淘汰人员", prop: "e_buyer", type: 0, tableStatus: 0 },
        { label: "淘汰部门ID", prop: "e_deptid", type: 0, tableStatus: 0 },
        { label: "淘汰部门", prop: "e_dept", type: 0, tableStatus: 0 },
        {
          prop: "caozuo",
          label: "操作",
          type: 1,
          fixed: "right",
          width: 270,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: "edit",
              icon: "fa fa-edit",
              label: "action.edit",
              perms: "quality:spttdl:update"
            },
            {
              id: "updateStatus",
              icon: "fa fa-edit",
              label: "完成",
              perms: "quality:spttdl:updateusestatus"
            },
            {
              id: "delete",
              icon: "fa fa-trash",
              label: "删除",
              perms: "quality:spttdl:delete"
            }
          ]
        }
      ],
      spttdl_tableData: [],
      spttdl_loading: false,

      //   el-dialog 数据
      spttdl_dialogVisible: false,
      spttdl_dialogTitle: "",
      spttdl_dtlstatus: false, // false 新增  true 修改

      spttdl_dialogWidth: "700px",
      spttdl_inline: true,
      spttdl_dialogLabelWidth: "120px",

      spttdl_base: {
        id: null, // 淘汰队列ID

        credate: null, // 录入日期

        companyid: null,
        companyname: null,
        goodsid: null,
        goodsname: null,

        srmode: null, // 库存清理方式
        eliminatereason: null, // 淘汰原因

        plandate: null, // 计划完成日期
        accomplishdate: null, // 实际完成日期

        inputmanid: null, // 录入人ID
        inputman: null, // 录入人

        usestatus: null, // 状态

        e_buyerid: null, // 淘汰人员ID
        e_buyer: null, // 淘汰人员

        e_deptid: null, // 淘汰部门ID
        e_dept: null, // 淘汰部门

        memo: null // 备注
      },

      spttdl_selectData: { monitortype: [] },

      // hov
      spttdl_companyVisible: false,
      spttdl_companyHov: {
        hovTitle: "公司查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "spttdl_formData",
        parentVisible: "spttdl_companyVisible",
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
      spttdl_goodsVisible: false,
      spttdl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "spttdl_formData",
        parentVisible: "spttdl_goodsVisible",
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
      spttdl_e_buyeridVisible: false,
      spttdl_e_buyeridHov: {
        hovTitle: "淘汰人员查询",
        hovUrl: "spttdl/selecthovuser",
        afterStatus: false,
        fillDataName: "spttdl_formData",
        parentVisible: "spttdl_e_buyeridVisible",
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
      spttdl_e_deptidVisible: false,
      spttdl_e_deptidHov: {
        hovTitle: "淘汰部门查询",
        hovUrl: "spttdl/selecthovdept",
        afterStatus: false,
        fillDataName: "spttdl_formData",
        parentVisible: "spttdl_e_deptidVisible",
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
            value: null,
          }
        ]
      }
    };
  },
  created() {
    // this.spttdl_selectData.monitortype = selectDdlOption("MONITORTYPE");
    // this.$api.counter.selectLlsbxxwhMonitortype().then(res => {
    //   this.spttdl_selectData.monitortype = res.data[0].monitortype;
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
      let params = paramsFormat(this.spttdl_formData);
      if (params == null) params = {};
      params.inputmanid = sessionStorage.getItem("userid");

      console.log("查询 p", params);
      this.spttdl_loading = true;
      this.$api.quality
        .selectSpttdl({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.spttdl_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.spttdl_loading = false;
          }
        })
        .catch(error => {
          this.spttdl_loading = false;
          return false;
        });
    },

    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    handleFunction(data) {
      if (data.id == "edit") {
        this.beforeUpdate(data);
      } else if (data.id == "updateStatus") {
        //console.log("updateStatus");
        this.updateUsestatus(data.row);
      } else if (data.id == "delete") {
        //console.log("delete");
        this.delete(data.row);
      }
    },
    openHov(data) {
      this.spttdl_goodsHov.fillDataName = "spttdl_formData";
      this.spttdl_companyHov.fillDataName = "spttdl_formData";
      this.spttdl_e_buyeridHov.fillDataName = "spttdl_formData";
      this.spttdl_e_deptidHov.fillDataName = "spttdl_formData";
      if (data === "goodsid") {
        this.spttdl_goodsVisible = true;
      } else if (data === "companyid") {
        this.spttdl_companyVisible = true;
      } else if (data === "e_buyerid") {
        this.spttdl_e_buyeridVisible = true;
      } else if (data === "e_deptid") {
        this.spttdl_e_deptidVisible = true;
      }
    },

    openDailogHov(data) {
      this.spttdl_goodsHov.fillDataName = "spttdl_base";
      this.spttdl_companyHov.fillDataName = "spttdl_base";
      this.spttdl_e_buyeridHov.fillDataName = "spttdl_base";
      this.spttdl_e_deptidHov.fillDataName = "spttdl_base";
      if (data === "goodsid") {
        this.spttdl_goodsVisible = true;
      } else if (data === "companyid") {
        this.spttdl_companyVisible = true;
      } else if (data === "e_buyerid") {
        this.spttdl_e_buyeridVisible = true;
      } else if (data === "e_deptid") {
        this.spttdl_e_deptidHov.hovColumns[2].value = this.spttdl_base.companyid
        console.log(this.spttdl_base.companyid)
        this.spttdl_e_deptidVisible = true;
      }
    },

    closeDialog() {
      this.spttdl_dialogVisible = false;
    },
    openDialog() {
      this.spttdl_dialogVisible = true;
    },
    beforeInsert() {
      this.spttdl_dialogTitle = "新增";
      this.spttdl_dtlstatus = false;
      Object.keys(this.spttdl_base).forEach(e => {
        this.spttdl_base[e] = null;
      });

      this.spttdl_base.inputmanid = sessionStorage.getItem("userid");
      this.spttdl_base.inputman = sessionStorage.getItem("username");
      this.spttdl_base.credate = this.getNewDate();
      this.spttdl_base.usestatus = "1";

      this.openDialog();
    },

    beforeUpdate(data) {
      this.spttdl_dialogTitle = "修改";
      this.spttdl_dtlstatus = true;
      Object.keys(this.spttdl_base).forEach(e => {
        this.spttdl_base[e] = data.row[e];
      });

      this.openDialog();
    },

    save() {

      console.log("dtl",this.spttdl_dtlstatus)
      if (this.spttdl_dtlstatus == false) {
        this.insert();
      } else {
        this.update();
      }
    },
    // 新增
    insert() {
      let params = {
        // id: this.spttdl_base.id,
        memo: this.spttdl_base.memo,
        credate: this.toDate(this.spttdl_base.credate), // 录入日期
        companyid: this.spttdl_base.companyid,
        companyname: this.spttdl_base.companyname,
        goodsid: this.spttdl_base.goodsid,
        goodsname: this.spttdl_base.goodsname,
        srmode: this.spttdl_base.srmode,
        eliminatereason: this.spttdl_base.eliminatereason,
        plandate: this.toDate(this.spttdl_base.plandate), // 计划完成日期
        accomplishdate: this.toDate(this.spttdl_base.accomplishdate), //实际完成日期
        inputmanid: this.spttdl_base.inputmanid,
        inputman: this.spttdl_base.inputman,
        usestatus: this.spttdl_base.usestatus,
        e_buyerid: this.spttdl_base.e_buyerid,
        e_buyer: this.spttdl_base.e_buyer,
        e_deptid: this.spttdl_base.e_deptid,
        e_dept: this.spttdl_base.e_dept
      };

      console.log("商品淘汰队列 insert p ", params);
      this.$api.quality
        .insertSpttdl(params)
        .then(res => {
          if (res.code == 200) {
            alert("保存成功");
            this.afterSave();
          }
        })
        .catch(e => {
          return false;
        });
    },
    // 修改
    update() {
      let params = {
        id: this.spttdl_base.id,
        memo: this.spttdl_base.memo,
        credate: this.toDate(this.spttdl_base.credate), // 录入日期
        companyid: this.spttdl_base.companyid,
        companyname: this.spttdl_base.companyname,
        goodsid: this.spttdl_base.goodsid,
        goodsname: this.spttdl_base.goodsname,
        srmode: this.spttdl_base.srmode,
        eliminatereason: this.spttdl_base.eliminatereason,
        plandate: this.toDate(this.spttdl_base.plandate), // 计划完成日期
        accomplishdate: this.toDate(this.spttdl_base.accomplishdate), //实际完成日期
        inputmanid: this.spttdl_base.inputmanid,
        inputman: this.spttdl_base.inputman,
        usestatus: this.spttdl_base.usestatus,
        e_buyerid: this.spttdl_base.e_buyerid,
        e_buyer: this.spttdl_base.e_buyer,
        e_deptid: this.spttdl_base.e_deptid,
        e_dept: this.spttdl_base.e_dept
      };
      console.log("商品淘汰队列 update p ", params);
      this.$api.quality
        .updateSpttdl(params)
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

    // 修改状态  完成
    updateUsestatus(row) {
      let params = {
        id: row.id
      };
      console.log("商品淘汰队列 updateUsestatus p ", params);
      this.$api.quality
        .updateSpttdlUsestatus({id:params.id})
        .then(res => {
          if (res.code == 200) {
            alert("成功");
          }
        })
        .catch(e => {
          return false;
        });
    },

    delete(row) {
      let params = {
        id: row.id
      };
      console.log("商品淘汰队列 delete p ", params);
      this.$api.quality
        .deleteSpttdl({id:params.id})
        .then(res => {
          if (res.code == 200) {
            alert("成功");
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

