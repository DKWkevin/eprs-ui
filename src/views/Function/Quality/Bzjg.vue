<!--  标准价格  -->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="bzjg_btnOptions"
      :form-list="bzjg_formList"
      :form-data="bzjg_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <e-table
      ref="doctable"
      :table-width-status="false"
      :table-columns="bzjg_tableColumns"
      :table-data="bzjg_tableData"
      :table-height="setTableHeight()"
      :loading="bzjg_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="bzjg_dialogVisible"
        :visible.sync="bzjg_dialogVisible"
        :title="bzjg_dialogTitle"
        :width="bzjg_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="bzjg_base"
          :inline="bzjg_inline"
          :label-width="bzjg_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="价格类型ID">
                <el-input
                  style="width:130px;"
                  v-model.number="bzjg_base.priceid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('priceid')"
                  v-if="bzjg_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="价格类型名称">
                <el-input
                  v-model="bzjg_base.pricename"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  style="width:130px;"
                  v-model.number="bzjg_base.goodsid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                  v-if="bzjg_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货品名称">
                <el-input
                  v-model.number="bzjg_base.goodsname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格">
                <el-input
                  v-model="bzjg_base.goodstype"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="单位">
                <el-input
                  v-model="bzjg_base.goodsunit"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="产地">
                <el-input
                  v-model="bzjg_base.prodarea"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="价格">
                <el-input v-model="bzjg_base.price"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="录入日期">
                <el-date-picker
                  style="width:165px;"
                  v-model="bzjg_base.credate"
                  type="date"
                  placeholder="选择日期"
                  :disabled="true"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="录入人ID">
                <el-input
                  v-model="bzjg_base.inputmanid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录入人">
                <el-input
                  v-model="bzjg_base.inputman"
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

    <hov-tools
      v-if="bzjg_goodsVisible"
      :hov-data="bzjg_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="bzjg_priceVisible"
      :hov-data="bzjg_priceHov"
    ></hov-tools>

  </div>
</template>


<script>
import {
  paramsFormat,
  dateFormat,
} from "@/utils/functions";
export default {
  components: { EQuery, KtButton, HovTools, ETable },
  data() {
    return {
      bzjg_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "quality:bzjg:select"
        },
        {
          id: "add",
          icon: "fa fa-edit",
          label: "action.add",
          perms: "quality:bzjg:insert"
        }
      ],
      bzjg_formList: [
        {
          type: "inputHov",
          label: "价格类型ID",
          id: "priceid",
          dataType: "number"
        },
        {
          type: "inputHov",
          label: "货品ID",
          id: "goodsid",
          dataType: "number"
        }
      ],
      bzjg_formData: {
        goodsid: null,
        priceid: null
      },

      bzjg_tableColumns: [
        { label: "价格类型ID", prop: "priceid", type: 0, tableStatus: 0 },
        { label: "价格类型名称", prop: "pricename", type: 0, tableStatus: 0 },
        { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
        { label: "品名", prop: "goodsname", type: 0, tableStatus: 0 },
        { label: "规格", prop: "goodstype", type: 0, tableStatus: 0 },
        { label: "单位", prop: "goodsunit", type: 0, tableStatus: 0 },
        { label: "产地", prop: "prodarea", type: 0, tableStatus: 0 },
        { label: "价格", prop: "price", type: 0, tableStatus: 0 },
        { label: "录入日期", prop: "credate", type: 2, tableStatus: 0 },
        { label: "录入人ID", prop: "inputmanid", type: 0, tableStatus: 0 },
        { label: "录入人", prop: "inputman", type: 0, tableStatus: 0 },
        {
          prop: "caozuo",
          label: "操作",
          type: 1,
          fixed: "right",
          width: 180,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {
              id: "edit",
              icon: "fa fa-edit",
              label: "action.edit",
              perms: "quality:bzjg:update"
            },
            {
              id: "delete",
              icon: "fa fa-trash",
              label: "删除",
              perms: "quality:bzjg:delete"
            }
          ]
        }
      ],
      bzjg_tableData: [],
      bzjg_loading: false,

      //   el-dialog 数据
      bzjg_dialogVisible: false,
      bzjg_dialogTitle: "",
      bzjg_dtlstatus: false, // false 新增  true 修改

      bzjg_dialogWidth: "700px",
      bzjg_inline: true,
      bzjg_dialogLabelWidth: "120px",

      bzjg_base: {
        priceid: null, // 价格类型ID
        pricename: null, // 价格类型名称
        price: null, // 价格
        goodsid: null, // 货品ID
        goodsname: null, //品名
        goodstype: null, // 规格
        goodsunit: null, // 单位
        prodarea: null, // 产地
        credate: null, // 录入日期
        inputmanid: null, // 录入人ID
        inputman: null // 录入人
      },

      // hov
      bzjg_priceVisible: false,
      bzjg_priceHov: {
        hovTitle: "价格类型查询",
        hovUrl: "priceidhov/select",
        afterStatus: false,
        fillDataName: "bzjg_formData",
        parentVisible: "bzjg_priceVisible",
        hovColumns: [
          {
            id: "priceid",
            name: "价格类型ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "priceid"
          },
          {
            id: "pricename",
            name: "价格类型名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "pricename"
          }
        ]
      },
      bzjg_goodsVisible: false,
      bzjg_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "bzjg_formData",
        parentVisible: "bzjg_goodsVisible",
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
      }
    };
  },
  created() {
    // this.bzjg_selectData.monitortype = selectDdlOption("MONITORTYPE");
    // this.$api.counter.selectLlsbxxwhMonitortype().then(res => {
    //   this.bzjg_selectData.monitortype = res.data[0].monitortype;
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
      let params = paramsFormat(this.bzjg_formData);
      if (params == null) params = {};
      params.inputmanid = sessionStorage.getItem("userid");

      console.log("查询 p", params);
      this.bzjg_loading = true;
      this.$api.quality
        .selectBzjg({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.bzjg_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.bzjg_loading = false;
          }
        })
        .catch(error => {
          this.bzjg_loading = false;
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
      this.bzjg_goodsHov.fillDataName = "bzjg_formData";
      this.bzjg_priceHov.fillDataName = "bzjg_formData";
      if (data === "goodsid") {
        this.bzjg_goodsVisible = true;
      } else if (data === "priceid") {
        this.bzjg_priceVisible = true;
      }
    },

    openDailogHov(data) {
      this.bzjg_goodsHov.fillDataName = "bzjg_base";
      this.bzjg_priceHov.fillDataName = "bzjg_base";
      if (data === "goodsid") {
        this.bzjg_goodsVisible = true;
      } else if (data === "priceid") {
        this.bzjg_priceVisible = true;
      }
    },

    closeDialog() {
      this.bzjg_dialogVisible = false;
    },
    openDialog() {
      this.bzjg_dialogVisible = true;
    },
    beforeInsert() {
      this.bzjg_dialogTitle = "新增";
      this.bzjg_dtlstatus = false;
      Object.keys(this.bzjg_base).forEach(e => {
        this.bzjg_base[e] = null;
      });

      this.bzjg_base.inputmanid = sessionStorage.getItem("userid");
      this.bzjg_base.inputman = sessionStorage.getItem("username");
      this.bzjg_base.credate = this.getNewDate();

      this.openDialog();
    },

    beforeUpdate(data) {
      this.bzjg_dialogTitle = "修改";
      this.bzjg_dtlstatus = true;
      Object.keys(this.bzjg_base).forEach(e => {
        this.bzjg_base[e] = data.row[e];
      });

      this.bzjg_base.credate = dateFormat("YYYY-mm-dd", this.bzjg_base.credate);

      this.openDialog();
    },

    save() {
      console.log("dtl", this.bzjg_dtlstatus);
      if (this.bzjg_dtlstatus == false) {
        this.insert();
      } else {
        this.update();
      }
    },
    // 新增
    insert() {
      let params = {
        credate: this.toDate(this.bzjg_base.credate), // 录入日期
        inputmanid: this.bzjg_base.inputmanid,
        inputman: this.bzjg_base.inputman,

        goodsid: this.bzjg_base.goodsid,
        goodsname: this.bzjg_base.goodsname,
        goodstype: this.bzjg_base.goodstype,
        goodsunit: this.bzjg_base.goodsunit,
        prodarea: this.bzjg_base.prodarea,

        priceid: this.bzjg_base.priceid,
        pricename: this.bzjg_base.pricename,
        price: this.bzjg_base.price
      };

      console.log("标准价格 insert p ", params);
      this.$api.quality
        .insertBzjg(params)
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
        credate: this.toDate(this.bzjg_base.credate), // 录入日期
        inputmanid: this.bzjg_base.inputmanid,
        inputman: this.bzjg_base.inputman,

        goodsid: this.bzjg_base.goodsid,
        goodsname: this.bzjg_base.goodsname,
        goodstype: this.bzjg_base.goodstype,
        goodsunit: this.bzjg_base.goodsunit,
        prodarea: this.bzjg_base.prodarea,

        priceid: this.bzjg_base.priceid,
        pricename: this.bzjg_base.pricename,
        price: this.bzjg_base.price
      };
      console.log("标准价格 update p ", params);
      this.$api.quality
        .updateBzjg(params)
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

    delete(row) {
      let params = {
        priceid: row.priceid,
        goodsid: row.goodsid
      };
      console.log("标准价格 delete p ", params);
      this.$api.quality
        .deleteBzjg(params)
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

