<template>
  <div>
    <e-query
      ref="query"
      :form-list="formList"
      :form-data="formData"
      :btn-options="btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-height="tableHeight"
      :loading="loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="goodsVisible"
      :hov-data="goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="supplyVisible"
      :hov-data="supplyHov"
    ></hov-tools>

    <div>
      <!-- 商品引进 新增   -->
      <el-dialog
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        :title="dialogTitle"
        :width="dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="base"
          :inline="inline"
          :label-width="dialogLabelWidth"
        >
          <el-row>
            <el-col
              :span="12"
              v-if="dtlstatus == true"
            >
              <el-form-item
                label="ID"
                v-if="dtlstatus == true"
              >
                <el-input
                  v-model.number="base.id"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="引进公司ID"
                v-if="dtlstatus == true"
              >
                <el-input
                  v-model="base.companyid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('companyid')"
                  v-if="dtlstatus===false"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="引进公司名称"
                v-if="dtlstatus == true"
              >
                <el-input
                  v-model="base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  v-model="base.goodsid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                  v-if="dtlstatus===false"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货品名称">
                <el-input
                  disabled
                  v-model="base.goodsname"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="状态"
                v-if="dtlstatus===false"
              >
                <el-select v-model="base.usestatus">
                  <el-option
                    label="正式"
                    value="1"
                  ></el-option>
                  <el-option
                    label="作废"
                    value="0"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="转正状态"
                v-if="dtlstatus===false"
              >
                <el-select v-model="base.f_status">
                  <el-option
                    label="未转正"
                    value="0"
                  ></el-option>
                  <el-option
                    label="转正通过"
                    value="1"
                  ></el-option>
                  <el-option
                    label="转正未通过"
                    value="2"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转正业绩要求">
                <el-input
                  type="textarea"
                  v-model="base.formalneed"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="转正业绩"
                v-if="dtlstatus == true"
              >
                <el-input
                  type="textarea"
                  v-model="base.f_performance"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  v-model="base.memo"
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

  </div>
</template>
<script>
import { paramsFormat, formDataReset } from "@/utils/functions";

export default {
  data() {
    return {
      formList: [
        {
          type: "inputHov",
          label: "引进公司ID",
          id: "companyid",
          dataType: "number"
        },
        { type: "inputHov", label: "货品ID", id: "goodsid", dataType: "number" }
      ],
      formData: {
        companyid: null,
        goodsid: null
      },
      btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "quality:spyj:select",
          perms: "quality:spyj:select"
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          //perms: "quality:spyj:add"
          perms: "quality:spyj:add"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "quality:spyj:select"
          perms: "quality:spyj:select"
        }
      ],

      tableColumns: [
        { prop: "id", label: "ID", type: 0, tableStatus: 0 },
        {
          prop: "credate",
          label: "录入日期",
          type: 2,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        { prop: "inputmanid", label: "录入人ID", type: 0, tableStatus: 0 },
        { prop: "inputman", label: "录入人", type: 0, tableStatus: 0 },
        { prop: "companyid", label: "引进公司id", type: 0, tableStatus: 0 },
        { prop: "companyname", label: "引进公司名称", type: 0, tableStatus: 0 },
        { prop: "goodsid", label: "货品ID", type: 0, tableStatus: 0 },
        { prop: "goodsname", label: "品名", type: 0, tableStatus: 0 },
        { prop: "formaldate", label: "转正日期", type: 2, tableStatus: 0 },
        { prop: "formalneed", label: "转正业绩要求", type: 0, tableStatus: 0 },
        { prop: "usestatus", label: "状态ID", type: 0, tableStatus: 0 },
        { prop: "usestatusname", label: "状态", type: 0, tableStatus: 0 },
        { prop: "invalidmanid", label: "作废人ID", type: 0, tableStatus: 0 },
        { prop: "invalidman", label: "作废人", type: 0, tableStatus: 0 },
        { prop: "invaliddate", label: "作废日期", type: 2, tableStatus: 0 },
        { prop: "f_credate", label: "转正操作日期", type: 2, tableStatus: 0 },
        {
          prop: "f_inputmanid",
          label: "转正操作人ID",
          type: 0,
          tableStatus: 0
        },
        { prop: "f_inputman", label: "转正操作人", type: 0, tableStatus: 0 },
        { prop: "f_performance", label: "转正业绩", type: 0, tableStatus: 0 },
        { prop: "f_status", label: "转正状态ID", type: 0, tableStatus: 0 },
        { prop: "f_statusname", label: "转正状态", type: 0, tableStatus: 0 },
        { prop: "memo", label: "备注", type: 0, tableStatus: 0 },
        {
          prop: "caozuo",
          label: "操作",
          type: 1,
          fixed: "right",
          width: 360,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: "edit",
              icon: "fa fa-edit",
              label: "action.edit",
              perms: "quality:spyj:update"
              //perms:"quality:spyj:update",
            },
            {
              id: "delete",
              icon: "fa fa-trash",
              label: "action.delete",
              perms: "quality:spyj:delete"
              //perms:"quality:spyj:delete",
            },
            {
              id: "nullify",
              icon: "fa fa-trash",
              label: "action.nullify",
              perms: "quality:spyj:update"
              //perms:"quality:spyj:update",
            },
            {
              id: "submit",
              icon: "fa fa-edit",
              label: "转正",
              perms: "quality:spyj:update"
              //perms:"quality:spyj:update",
            }
          ]
        }
      ],
      tableData: [],
      tableHeight: 350,
      loading: false,

      goodsVisible: false,
      goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: "goodsVisible",
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
          { id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1 }
        ]
      },

      supplyVisible: false,
      supplyHov: {
        hovTitle: "引进公司查询",
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: "supplyVisible",
        hovColumns: [
          {
            id: "customid",
            name: "供应商ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "companyid"
          },
          {
            id: "customname",
            name: "供应商名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "companyname"
          },
          {
            id: "customopcode",
            name: "供应商操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },

      //   el-dialog 数据
      dialogVisible: false,
      dialogTitle: "",
      dtlstatus: false, // 新增 false 修改 true

      dialogWidth: "700px",
      inline: true,
      dialogLabelWidth: "120px",

      base: {
        id: null, // 修改只读
        companyid: null, // 修改只读
        companyname: null, // 修改只读

        goodsid: null,
        goodsname: null,
        usestatus: null,
        f_status: null,
        formalneed: null,
        memo: null,
        f_performance: null // 转正业绩
      }
    };
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.formData);
      } else if (data === "add") {
        this.beforeInsert();
      }
    },

    handleFunction(data) {
      if (data.id === "edit") {
        this.beforeUpdate(data);
      } else if (data.id === "delete") {
        this.delete(data.row);
      } else if (data.id === "nullify") {
        this.updateZf(data.row);
      } else if (data.id === "submit") {
        this.updateZz(data.row);
      }
    },

    openHov(data) {
      this.goodsHov.fillDataName = "formData";
      this.supplyHov.fillDataName = "formData";
      if (data == "companyid") {
        this.supplyVisible = true;
      } else if (data == "goodsid") {
        this.goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.goodsHov.fillDataName = "base";
      this.supplyHov.fillDataName = "base";
      if (data == "companyid") {
        this.supplyVisible = true;
      } else if (data == "goodsid") {
        this.goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = paramsFormat(formData);
      this.loading = true;
      this.tableData = [];
      this.$api.quality
        .selectSpyj({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(3);
          this.loading = false;
          return false;
        });
    },

    closeDialog() {
      this.dialogVisible = false;
    },
    openDialog() {
      this.dialogVisible = true;
    },

    beforeInsert() {
      this.dialogTitle = "新增";
      this.dtlstatus = false;
      Object.keys(this.base).forEach(e => {
        this.base[e] = null;
      });
      this.base.usestatus = "1"; // 正式
      this.base.f_status = "0"; // 未转正
      this.base.companyid = sessionStorage.getItem("companyid");
      this.base.companyname = sessionStorage.getItem("companyname");
      this.base.inputmanid = sessionStorage.getItem("userid");
      this.base.inputmanname = sessionStorage.getItem("username");
      this.openDialog();
    },

    beforeUpdate(data) {
      this.dialogTitle = "修改";
      this.dtlstatus = true;
      Object.keys(this.base).forEach(e => {
        this.base[e] = data.row[e];
      });
      this.base.inputmanid = sessionStorage.getItem("userid");
      this.base.inputmanname = sessionStorage.getItem("username");
      this.base.companyid = sessionStorage.getItem("companyid");
      this.base.companyname = sessionStorage.getItem("companyname");
      this.openDialog();
    },

    // 保存
    save() {
      let params = {};
      Object.keys(this.base).forEach(e => {
        params[e] = this.base[e];
      });
      if (this.dtlstatus == false) {
        this.insert();
      } else {
        this.update();
      }
    },
    // 新增
    insert() {
      let params = {
        inputmanid: this.base.inputmanid,
        inputmanname: this.base.inputmanname,
        companyid: this.base.companyid,
        goodsid: this.base.goodsid,
        formalneed: this.base.formalneed,
        usestatus: this.base.usestatus,
        f_status: this.base.f_status,
        memo: this.base.memo
      };
      this.$api.quality
        .insertSpyj(params)
        .then(res => {
          if (res.code == 200) {
            alert("保存成功");
          }
        })
        .catch(e => {
          return false;
        });
    },
    // 修改
    update() {
      let params = {
        id: this.base.id,
        f_performance: this.base.f_performance,
        memo: this.base.memo,
        formalneed: this.base.formalneed
      };
      this.$api.quality
        .updateSpyj(params)
        .then(res => {
          if (res.code == 200) {
            alert("修改成功");
          }
        })
        .catch(e => {
          return false;
        });
    },
    // 删除
    delete(row) {
      let params = {
        id: row.id
      };
      this.$api.quality
        .deleteSpyj(params)
        .then(res => {
          if (res.code == 200) {
            alert("删除成功");
          }
        })
        .catch(e => {
          return false;
        });
    },
    //作废
    updateZf(row) {
      if (row.usestatus == 0) {
        alert("已作废的不能转正！");
        return;
      }
      let params = {
        id: row.id,
        usestatus: 0,
        invalidmanid: sessionStorage.getItem("userid"),
        invalidman: sessionStorage.getItem("username"),
        invaliddate: new Date()
      };
      this.$api.quality
        .updateSpyj(params)
        .then(res => {
          if (res.code == 200) {
            alert("作废成功");
          }
        })
        .catch(e => {
          return false;
        });
    },
    //转正
    updateZz(row) {
      if (row.usestatus == 0) {
        alert("已作废的不能转正！");
        return;
      }
      if (row.f_status == 1) {
        alert("已经转正的不能重复转正！");
        return;
      }
      let params = {
        id: row.id,
        f_status: 1,
        // formaldate: new Date()
      };
      this.$api.quality
        .updateSpyj(params)
        .then(res => {
          if (res.code == 200) {
            alert("转正成功");
          }
        })
        .catch(e => {
          return false;
        });
    }
  }
};
</script>
<style scoped>
</style>
