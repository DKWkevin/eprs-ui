<!--    货品管理   -->
<template>
  <div>
    <e-query
      ref="query"
      :form-list="hpgl_formList"
      :form-data="hpgl_formData"
      :btn-options="hpgl_btnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="hpgl_tableColumns"
      :table-data="hpgl_tableData"
      :table-height="hpgl_tableHeight"
      :table-width-status="false"
      :loading="hpgl_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="hpgl_goodsVisible"
      :hov-data="hpgl_goodsHov"
    ></hov-tools>
    <hov-tools
      v-if="hpgl_companyVisible"
      :hov-data="hpgl_companyHov"
    ></hov-tools>

    <div>
      <!-- 新增   -->
      <el-dialog
        v-if="hpgl_dialogVisible"
        :visible.sync="hpgl_dialogVisible"
        :title="hpgl_dialogTitle"
        :width="hpgl_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="hpgl_base"
          :inline="hpgl_inline"
          :label-width="hpgl_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  v-model="hpgl_base.goodsid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品名">
                <el-input
                  v-model="hpgl_base.goodsname"
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

  </div>
</template>
<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import HovTools from "@/views/Core/HovTools";
import KtButton from "@/views/Core/KtButton"
import { paramsFormat, formDataReset } from "@/utils/functions";

export default {
  components: { EQuery, ETable, HovTools, KtButton },
  data() {
    return {
      hpgl_formList: [
        // {
        //   type: "inputHov",
        //   label: "单位ID",
        //   id: "companyid",
        //   dataType: "number"
        // },
        { type: "inputHov", label: "货品ID", id: "goodsid", dataType: "number" }
      ],
      hpgl_formData: {
        //companyid: null
        goodsid: null
      },
      hpgl_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          //perms: "hpgl:select",
          perms: "hpgl:select"
        },
        {
          id: "add",
          icon: "fa fa-plus",
          label: "action.add",
          //perms: "hpgl:insert"
          perms: "hpgl:insert"
        },
        {
          id: "reset",
          icon: "fa fa-cog",
          label: "action.reset",
          //perms: "hpgl:select"
          perms: "hpgl:select"
        }
      ],

      hpgl_tableColumns: [
        { prop: "goodsid", label: "货品ID", type: 0, tableStatus: 0 },
        { prop: "goodsname", label: "品名", type: 0, tableStatus: 0 },
        { prop: "goodstype", label: "规格", type: 0, tableStatus: 0 },
        { prop: "goodsunit", label: "单位", type: 0, tableStatus: 0 },
        { prop: "prodarea", label: "产地", type: 0, tableStatus: 0 },
        {
          prop: "credate",
          label: "创建日期",
          type: 2,
          tableStatus: 0,
          width: 150,
          widthStatus: true
        },
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
              perms: "hpgl:syc"
              //perms:"hpgl:syc",
            }
          ]
        }
      ],
      hpgl_tableData: [],
      hpgl_tableHeight: 350,
      hpgl_loading: false,

      hpgl_goodsVisible: false,
      hpgl_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "hpgl_formData",
        parentVisible: "hpgl_goodsVisible",
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

      hpgl_companyVisible: false,
      hpgl_companyHov: {
        hovTitle: "单位查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "hpgl_formData",
        parentVisible: "hpgl_companyVisible",
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
      hpgl_dialogVisible: false,
      hpgl_dialogTitle: "",
      hpgl_dtlstatus: false, // 新增 false 修改 true

      hpgl_dialogWidth: "700px",
      hpgl_inline: true,
      hpgl_dialogLabelWidth: "120px",

      hpgl_base: {
        goodsid: null,
        goodsname: null
      }
    };
  },

  methods: {
    // data  hpgl_btnOptions[i].id
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "reset") {
        formDataReset(this.hpgl_formData);
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
      this.hpgl_goodsHov.fillDataName = "hpgl_formData";
      this.hpgl_companyHov.fillDataName = "hpgl_formData";
      if (data == "companyid") {
        this.hpgl_companyVisible = true;
      } else if (data == "goodsid") {
        this.hpgl_goodsVisible = true;
      }
    },
    openDailogHov(data) {
      this.hpgl_goodsHov.fillDataName = "hpgl_base";
      this.hpgl_companyHov.fillDataName = "hpgl_base";
      if (data == "companyid") {
        this.hpgl_companyVisible = true;
      } else if (data == "goodsid") {
        this.hpgl_goodsVisible = true;
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let hpgl_formData = this.hpgl_formData;
      let params = paramsFormat(hpgl_formData);
      this.hpgl_loading = true;
      this.hpgl_tableData = [];
      this.$api.jzt
        .selectHpgl({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.hpgl_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.hpgl_loading = false;
          }else{
            alert(res.msg)
          }
        })
        .catch(error => {
          this.hpgl_loading = false;
          return false;
        });
    },

    closeDialog() {
      this.hpgl_dialogVisible = false;
    },
    openDialog() {
      this.hpgl_dialogVisible = true;
    },

    beforeInsert() {
      this.hpgl_dialogTitle = "新增";
      this.hpgl_dtlstatus = false;
      Object.keys(this.hpgl_base).forEach(e => {
        this.hpgl_base[e] = null;
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
        credate: new Date(),
        goodsid: this.hpgl_base.goodsid,
        goodsname: this.hpgl_base.goodsname,
        usestatus: 0 // 状态 0 未同步
      };
      console.log("jzt Hpgl insert p ", params);
      this.$api.jzt
        .insertHpgl(params)
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
      let params = {
        goodsid: row.goodsid,
        inputmanid: sessionStorage.getItem("userid"),
        companyid: sessionStorage.getItem("companyid")
      };
      console.log("jzt Hpgl upload p ", params);
      this.$api.jzt
        .uploadHpgl(params)
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
      this.hpgl_tableHeight = window.innerHeight - 240;
    }
  },
  created() {
    this.setTableHeight();
  }
};
</script>
<style scoped>
</style>