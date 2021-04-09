<!--    单位管理   -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="dwgl_formList"
      :form-data="dwgl_formData"
      :btn-options="dwgl_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="dwgl_tableColumns"
      :table-data="dwgl_tableData"
      :table-height="dwgl_tableHeight"
      :table-width-status="false"
      :loading="dwgl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="dwgl_goodsVisible"
      :hov-data="dwgl_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="dwgl_companyVisible"
      :hov-data="dwgl_companyHov"
    ></hov-tools>

    <div>
      <!-- 新增   -->
      <el-dialog
        v-if="dwgl_dialogVisible"
        :visible.sync="dwgl_dialogVisible"
        :title="dwgl_dialogTitle"
        :width="dwgl_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="dwgl_base"
          :inline="dwgl_inline"
          :label-width="dwgl_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="单位ID">
                <el-input
                  v-model="dwgl_base.companyid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('companyid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位名称">
                <el-input
                  v-model="dwgl_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="单位类型"
                v-if="dwgl_dtlstatus===false"
              >
                <el-select v-model="dwgl_base.companytype">
                  <el-option
                    label="供应商"
                    :value="1"
                  ></el-option>
                  <el-option
                    label="客户"
                    :value="2"
                  ></el-option>
                </el-select>
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
      dwgl_formList: [
        {
          type: "inputHov",
          label: "单位ID",
          id: "companyid",
          dataType: "number"
        }
        // { type: "inputHov", label: "货品ID", id: "goodsid", dataType: "number" }
      ],
      dwgl_formData: {
        companyid: null
        //goodsid: null
      },
      dwgl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "dwgl:select"
          //perms: ""
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          perms: "dwgl:insert"
          //perms: ""
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          perms: "dwgl:select"
          //perms: ""
        }
      ],

      dwgl_tableColumns: [
        { prop: "companyid", label: "单位ID", type: 0, tableStatus: 0 },
        { prop: "companyname", label: "单位名称", type: 0, tableStatus: 0 },
        {
          prop: "credate",
          label: "创建日期",
          type: 2,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
        { prop: "companytype", label: "单位类型", type: 0, tableStatus: 0 },
        { prop: "inputmanname", label: "录入人", type: 0, tableStatus: 0 },
        { prop: "synmanname", label: "最后同步人", type: 0, tableStatus: 0 },
        { prop: "syndate", label: "最后同步日期", type: 2, tableStatus: 0 },
        { prop: "usestatusname", label: "状态", type: 0, tableStatus: 0 },

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
              id: "upload",
              icon: "fa fa-edit",
              label: "同步",
              //perms: ""
              perms:"dwgl:syc",
            }
          ]
        }
      ],
      dwgl_tableData: [],
      dwgl_tableHeight: 350,
      dwgl_loading: false,

      dwgl_goodsVisible: false,
      dwgl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "dwgl_formData",
        parentVisible: "dwgl_goodsVisible",
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

      dwgl_companyVisible: false,
      dwgl_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "dwgl_formData",
        parentVisible: "dwgl_companyVisible",
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
      dwgl_dialogVisible: false,
      dwgl_dialogTitle: "",
      dwgl_dtlstatus: false, // 新增 false 修改 true

      dwgl_dialogWidth: "700px",
      dwgl_inline: true,
      dwgl_dialogLabelWidth: "120px",

      dwgl_base: {
        companyid: null,
        companyname: null,
        companytype: 1
      }
    };
  },

  methods: {
    // data  dwgl_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.dwgl_formData);
      } else if (data === "add") {
        this.beforeInsert();
      }
    },

    handleFunction(data) {
      if (data.id === "upload") {
        this.upload(data.row);
      }
    },

    openHov(data) {
      this.dwgl_goodsHov.fillDataName = "dwgl_formData";
      this.dwgl_companyHov.fillDataName = "dwgl_formData";
      if (data == "companyid") {
        this.dwgl_companyVisible = true;
      } else if (data == "goodsid") {
        this.dwgl_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.dwgl_goodsHov.fillDataName = "dwgl_base";
      this.dwgl_companyHov.fillDataName = "dwgl_base";
      if (data == "companyid") {
        this.dwgl_companyVisible = true;
      } else if (data == "goodsid") {
        this.dwgl_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let dwgl_formData = this.dwgl_formData;
      let params = paramsFormat(dwgl_formData);
      this.dwgl_loading = true;
      this.dwgl_tableData = [];
      this.$api.jzt
        .selectDwgl({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.dwgl_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.dwgl_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          console.log(3);
          this.dwgl_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.dwgl_dialogVisible = false;
    },
    openDialog() {
      this.dwgl_dialogVisible = true;
    },

    beforeInsert() {
      this.dwgl_dialogTitle = "新增";
      this.dwgl_dtlstatus = false;
      Object.keys(this.dwgl_base).forEach(e => {
        this.dwgl_base[e] = null;
      });
      this.dwgl_base.companytype = 1; // 1供应商  2客户
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
        credate: new Date(),
        companyid: this.dwgl_base.companyid,
        companyname: this.dwgl_base.companyname,
        companytype: this.dwgl_base.companytype,
        usestatus: 0 // 状态 0 未同步
      };
      console.log("jzt dwgl insert p ", params);
      this.$api.jzt
        .insertDwgl(params)
        .then(res => {
          console.log("res", res);
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
      let params = {
        companyid: row.companyid,
        companytype: row.companytype,
        inputmanid: sessionStorage.getItem("userid")
      };
      console.log("jzt dwgl upload p ", params);
      this.$api.jzt
        .uploadDwgl(params)
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

    afterSave() {
      // 新增 修改 成功  关闭弹窗 再查询
      this.closeDialog();
      let pageSize = this.$refs.doctable.pageSize;
      this.selectDoc(1, pageSize);
    },

    setTableHeight() {
      // 设置表格高度
      this.dwgl_tableHeight = window.innerHeight - 240;
    }
  },
  created() {
    this.setTableHeight();
  }
};
</script>
<style scoped>
</style>
