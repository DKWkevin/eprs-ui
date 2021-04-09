<!--  品类分类定义  -->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="plfldy_btnOptions"
      :form-list="plfldy_formList"
      :form-data="plfldy_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <e-table
      ref="doctable"
      :table-width-status="false"
      :table-columns="plfldy_tableColumns"
      :table-data="plfldy_tableData"
      :table-height="setTableHeight()"
      :loading="plfldy_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="plfldy_dialogVisible"
        :visible.sync="plfldy_dialogVisible"
        :title="plfldy_dialogTitle"
        :width="plfldy_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="plfldy_base"
          :inline="plfldy_inline"
          :label-width="plfldy_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item
                label="品类ID"
                v-if="plfldy_dtlstatus == true"
              >
                <el-input
                  v-model.number="plfldy_base.categoryid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="日期">
                <el-input
                  v-model="plfldy_base.credate"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品类名称">
                <el-input v-model="plfldy_base.categoryname"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="品类操作码">
                <el-input v-model="plfldy_base.categoryopcode"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="品类编码">
                <el-input v-model="plfldy_base.categoryno"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="是否末级">
                <el-select v-model="plfldy_base.ifend">
                  <el-option
                    :label="'是'"
                    :value="'1'"
                  ></el-option>
                  <el-option
                    :label="'否'"
                    :value="'0'"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-select v-model="plfldy_base.usestatus">
                  <el-option
                    label="正式"
                    value="1"
                  ></el-option>
                  <el-option
                    label="停用"
                    value="0"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级品类">
                <el-input
                  v-model="plfldy_base.parentcategoryid"
                  style="width:130px;"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('parentcategoryid')"
                ></el-button>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="上级品类名称">
                <el-input
                  v-model="plfldy_base.parentcategoryname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="备注" class="bz">
                <el-input
                  type="textarea"
                  v-model="plfldy_base.memo"
                  maxlength="30"
                  show-word-limit
                  style="width: 100%"
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
      v-if="plfldy_categoryVisible"
      :hov-data="plfldy_categoryHov"
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
      plfldy_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "quality:plfldy:select"
        },
        {
          id: "add",
          icon: "fa fa-edit",
          label: "action.add",
          perms: "quality:plfldy:insert"
        }
      ],
      plfldy_formList: [
        { type: "input", id: "categoryid", label: "品类ID" },
        { type: "input", id: "categoryname", label: "品类名称" },
        { type: "input", id: "categoryno", label: "品类编码" },
        { type: "input", id: "categoryopcode", label: "品类操作码" }
      ],
      plfldy_formData: {
        categoryid: null,
        categoryname: null,
        categoryno: null,
        categoryopcode: null
      },

      plfldy_tableColumns: [
        { label: "品类ID", prop: "categoryid", type: 0, tableStatus: 0 },
        { label: "品类编码", prop: "categoryno", type: 0, tableStatus: 0 },
        {
          label: "品类操作码",
          prop: "categoryopcode",
          type: 0,
          tableStatus: 0
        },
        { label: "品类名称", prop: "categoryname", type: 0, tableStatus: 0 },
        { label: "日期", prop: "credate", type: 2, tableStatus: 0 },
        { label: "上级品类ID", prop: "parentcategoryid" },
        {
          label: "上级品类名称",
          prop: "parentcategoryname",
          type: 0,
          tableStatus: 0
        },
        { label: "是否末级", prop: "ifendname", type: 0, tableStatus: 0 },
        { label: "状态", prop: "usestatusname", type: 0, tableStatus: 0 },
        { label: "备注", prop: "memo", type: 0, tableStatus: 0 },
        {
          prop: "caozuo",
          label: "操作",
          type: 1,
          fixed: "right",
          width: 220,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: "edit",
              icon: "fa fa-edit",
              label: "action.edit",
              perms: "quality:plfldy:update"
            },
            {
              id: "delete",
              icon: "fa fa-trash",
              label: "删除",
              perms: "quality:plfldy:delete"
            }
          ]
        }
      ],
      plfldy_tableData: [],
      plfldy_loading: false,

      //   el-dialog 数据
      plfldy_dialogVisible: false,
      plfldy_dialogTitle: "",
      plfldy_dtlstatus: false, // false 新增  true 修改

      plfldy_dialogWidth: "700px",
      plfldy_inline: true,
      plfldy_dialogLabelWidth: "120px",

      plfldy_base: {
        categoryid: null, // 品类ID
        categoryname: null, // 品类名称
        categoryno: null, // 品类编码
        categoryopcode: null, // 品类操作码

        credate: null, // 日期

        ifend: null, // 是否末级
        usestatus: null, // 状态

        parentcategoryid: null, // 上级品类ID
        parentcategoryname: null, // 上级品类名称

        memo: null // 备注
      },

      plfldy_selectData: { monitortype: [] },

      // hov
      plfldy_categoryVisible: false,
      plfldy_categoryHov: {
        hovTitle: "品类查询",
        hovUrl: "categoryidhov/select",
        afterStatus: false,
        fillDataName: "plfldy_formData",
        parentVisible: "plfldy_categoryVisible",
        hovColumns: [
          {
            id: "categoryid",
            name: "品类ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "parentcategoryid"
          },
          {
            id: "categoryname",
            name: "品类名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "parentcategoryname"
          },
          {
            id: "categoryopcode",
            name: "品类操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      }
    };
  },
  created() {
    // this.plfldy_selectData.monitortype = selectDdlOption("MONITORTYPE");
    // this.$api.counter.selectLlsbxxwhMonitortype().then(res => {
    //   this.plfldy_selectData.monitortype = res.data[0].monitortype;
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
      let params = paramsFormat(this.plfldy_formData);
      console.log("查询 p", params);
      this.plfldy_loading = true;
      this.$api.quality
        .selectPlfldy({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.plfldy_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.plfldy_loading = false;
          }
        })
        .catch(error => {
          this.plfldy_loading = false;
          return false;
        });
    },

    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    handleFunction(data) {
      if (data.id == "edit") {
        this.beforeUpdate(data);
      } else if (data.id == "delete") {
        //console.log("delete");
        this.delete(data.row);
      }
    },
    openHov(data) {
      // 无HOV
    },

    openDailogHov(data) {
      this.plfldy_categoryHov.fillDataName = "plfldy_base";
      if (data === "parentcategoryid") {
        this.plfldy_categoryVisible = true;
      }
    },

    closeDialog() {
      this.plfldy_dialogVisible = false;
    },
    openDialog() {
      this.plfldy_dialogVisible = true;
    },
    beforeInsert() {
      this.plfldy_dialogTitle = "新增";
      this.plfldy_dtlstatus = false;
      Object.keys(this.plfldy_base).forEach(e => {
        this.plfldy_base[e] = null;
      });

      this.plfldy_base.ifend = "1";
      this.plfldy_base.usestatus = "1";
      this.plfldy_base.credate = this.getNewDate();

      this.openDialog();
    },

    beforeUpdate(data) {
      this.plfldy_dialogTitle = "修改";
      this.plfldy_dtlstatus = true;
      Object.keys(this.plfldy_base).forEach(e => {
        this.plfldy_base[e] = data.row[e];
      });
      this.plfldy_base.ifend = this.plfldy_base.ifend + "";
      this.plfldy_base.usestatus = this.plfldy_base.usestatus + "";
      this.plfldy_base.credate = dateFormat(
        "YYYY-mm-dd",
        this.plfldy_base.credate
      );

      this.openDialog();
    },

    save() {
      if (this.plfldy_dtlstatus == false) {
        this.insert();
      } else {
        this.update();
      }
    },
    // 新增
    insert() {
      let params = {
        credate: new Date(this.plfldy_base.credate + " 00:00:00"),
        categoryname: this.plfldy_base.categoryname,
        categoryopcode: this.plfldy_base.categoryopcode,
        categoryno: this.plfldy_base.categoryno,
        ifend: this.plfldy_base.ifend,
        usestatus: this.plfldy_base.usestatus,
        parentcategoryid: this.plfldy_base.parentcategoryid,
        parentcategoryname: this.plfldy_base.parentcategoryname,
        memo: this.plfldy_base.memo
      };
      console.log("品类分类定义 insert p ", params);
      this.$api.quality
        .insertPlfldy(params)
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
        // credate: this.plfldy_base.credate,
        categoryname: this.plfldy_base.categoryname,
        categoryopcode: this.plfldy_base.categoryopcode,
        categoryno: this.plfldy_base.categoryno,
        ifend: this.plfldy_base.ifend,
        usestatus: this.plfldy_base.usestatus,
        parentcategoryid: this.plfldy_base.parentcategoryid,
        parentcategoryname: this.plfldy_base.parentcategoryname,
        memo: this.plfldy_base.memo,

        categoryid: this.plfldy_base.categoryid
      };
      console.log("品类分类定义 update p ", params);
      this.$api.quality
        .updatePlfldy(params)
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

    // 删除
    delete(row) {
      let params = {
        categoryid: this.plfldy_base.categoryid
      };
      console.log("品类分类定义 delete p ", params);
      this.$api.quality
        .deletePlfldy(params)
        .then(res => {
          if (res.code == 200) {
            alert("成功");
          }
        })
        .catch(e => {
          return false;
        });
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

<style type="text/css" scoped>
.bz{width: 100%;}
.bz >>> .el-form-item__content{width:75%;}
</style>


