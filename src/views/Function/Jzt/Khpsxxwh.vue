<!--  客户配送信息维护  khpsxxwh  -->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="khpsxxwh_btnOptions"
      :form-list="khpsxxwh_formList"
      :form-data="khpsxxwh_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <e-table
      ref="doctable"
      :table-width-status="false"
      :table-columns="khpsxxwh_tableColumns"
      :table-data="khpsxxwh_tableData"
      :table-height="setTableHeight()"
      :loading="khpsxxwh_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="khpsxxwh_dialogVisible"
        :visible.sync="khpsxxwh_dialogVisible"
        :title="khpsxxwh_dialogTitle"
        :width="khpsxxwh_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="khpsxxwh_base"
          :inline="khpsxxwh_inline"
          :label-width="khpsxxwh_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="单位ID">
                <el-input
                  :style="khpsxxwh_dtlstatus == false?'width:130px;':''"
                  v-model.number="khpsxxwh_base.customid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('customid')"
                  v-if="khpsxxwh_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位名称">
                <el-input
                  v-model="khpsxxwh_base.customname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input v-model="khpsxxwh_base.contact"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="联系方式">
                <el-input v-model="khpsxxwh_base.contactnote"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="详细地址">
                <el-input
                  style="width:500px;"
                  v-model="khpsxxwh_base.address"
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
      v-if="khpsxxwh_goodsVisible"
      :hov-data="khpsxxwh_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="khpsxxwh_priceVisible"
      :hov-data="khpsxxwh_priceHov"
    ></hov-tools>

    <hov-tools
      v-if="khpsxxwh_customVisible"
      :hov-data="khpsxxwh_customHov"
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
      khpsxxwh_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "yszd:select"
        },
        // {
        //   id: "add",
        //   icon: "fa fa-edit",
        //   label: "action.add",
        //   perms: "yszd:insert"
        // }
      ],
      khpsxxwh_formList: [
        // {
        //   type: "inputHov",
        //   label: "价格类型ID",
        //   id: "priceid",
        //   dataType: "number"
        // },
        // {
        //   type: "inputHov",
        //   label: "货品ID",
        //   id: "goodsid",
        //   dataType: "number"
        // }
        {
          type: "inputHov",
          label: "单位ID",
          id: "customid",
          dataType: "number"
        },
        {
          type: "input",
          label: "单位名称",
          id: "customname",
        }
      ],
      khpsxxwh_formData: {
        customid: null,
        customname: null
      },

      khpsxxwh_tableColumns: [
        { label: "站点ID", prop: "stationid", type: 0, tableStatus: 0 },
        { label: "单位ID", prop: "companyid", type: 0, tableStatus: 0 },
        {
          label: "单位名称",
          prop: "companyname",
          type: 0,
          tableStatus: 0,
          width: 150
        },
        {
          label: "详细地址",
          prop: "address",
          type: 0,
          tableStatus: 0,
          width: 150
        },


        { label: "联系人", prop: "contact", type: 0, tableStatus: 0 },
        {
          label: "联系方式",
          prop: "contactnote",
          type: 0,
          tableStatus: 0,
          width: 150
        },
        // {
        //   prop: "caozuo",
        //   label: "操作",
        //   type: 1,
        //   fixed: "right",
        //   width: 180,
        //   widthStatus: true,
        //   tableStatus: 0,
        //   options: [
        //     {
        //       id: "edit",
        //       icon: "fa fa-edit",
        //       label: "action.edit",
        //       perms: "yszd:update"
        //     },
        //     {
        //       id: "delete",
        //       icon: "fa fa-trash",
        //       label: "删除",
        //       perms: "yszd:delete"
        //     }
        //   ]
        // }
      ],
      khpsxxwh_tableData: [],
      khpsxxwh_loading: false,

      //   el-dialog 数据
      khpsxxwh_dialogVisible: false,
      khpsxxwh_dialogTitle: "",
      khpsxxwh_dtlstatus: false, // false 新增  true 修改

      khpsxxwh_dialogWidth: "700px",
      khpsxxwh_inline: true,
      khpsxxwh_dialogLabelWidth: "120px",

      khpsxxwh_base: {
        stationid: null, // 站点ID
        customid: null, // 单位ID
        customname: null,
        address: null,
        contact: null, // 联系人
        contactnote: null
      },

      // hov
      khpsxxwh_priceVisible: false,
      khpsxxwh_priceHov: {
        hovTitle: "价格类型查询",
        hovUrl: "priceidhov/select",
        afterStatus: false,
        fillDataName: "khpsxxwh_formData",
        parentVisible: "khpsxxwh_priceVisible",
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

      khpsxxwh_customVisible: false,
      khpsxxwh_customHov: {
        hovTitle: "单位查询",
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "khpsxxwh_formData",
        parentVisible: "khpsxxwh_customVisible",
        hovColumns: [
          {
            id: "customid",
            name: "单位ID",
            queryStatus: true,
            dataStatus: 2,
            fillid: "customid"
          },
          {
            id: "customname",
            name: "单位名称",
            queryStatus: true,
            dataStatus: 1,
            fillid: "customname"
          },
          {
            id: "customopcode",
            name: "单位操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      },

      khpsxxwh_goodsVisible: false,
      khpsxxwh_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "khpsxxwh_formData",
        parentVisible: "khpsxxwh_goodsVisible",
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
    // this.khpsxxwh_selectData.monitortype = selectDdlOption("MONITORTYPE");
    // this.$api.counter.selectLlsbxxwhMonitortype().then(res => {
    //   this.khpsxxwh_selectData.monitortype = res.data[0].monitortype;
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
      let params = {
        companyid : this.khpsxxwh_formData.customid,
        companyname : this.khpsxxwh_formData.customname
      };
      params = paramsFormat(params);

      console.log("查询 p", params);
      this.khpsxxwh_loading = true;
      this.$api.jzt
        .selectKhpsxxwh({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.khpsxxwh_tableData = Object.freeze(res.data.content);

            this.khpsxxwh_tableData.forEach(e => {
              console.log(e.contactnote);
            });
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.khpsxxwh_loading = false;
          } else {
            alert(res.msg);
          }
        })
        .catch(error => {
          this.khpsxxwh_loading = false;
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
      this.khpsxxwh_goodsHov.fillDataName = "khpsxxwh_formData";
      this.khpsxxwh_priceHov.fillDataName = "khpsxxwh_formData";
      this.khpsxxwh_customHov.fillDataName = "khpsxxwh_formData";
      if (data === "goodsid") {
        this.khpsxxwh_goodsVisible = true;
      } else if (data === "priceid") {
        this.khpsxxwh_priceVisible = true;
      } else if (data === "customid") {
        this.khpsxxwh_customVisible = true;
      }
    },

    openDailogHov(data) {
      this.khpsxxwh_goodsHov.fillDataName = "khpsxxwh_base";
      this.khpsxxwh_priceHov.fillDataName = "khpsxxwh_base";
      this.khpsxxwh_customHov.fillDataName = "khpsxxwh_base";
      if (data === "goodsid") {
        this.khpsxxwh_goodsVisible = true;
      } else if (data === "priceid") {
        this.khpsxxwh_priceVisible = true;
      } else if (data === "customid") {
        this.khpsxxwh_customVisible = true;
      }
    },

    closeDialog() {
      this.khpsxxwh_dialogVisible = false;
    },
    openDialog() {
      this.khpsxxwh_dialogVisible = true;
    },
    beforeInsert() {
      this.khpsxxwh_dialogTitle = "新增";
      this.khpsxxwh_dtlstatus = false;
      Object.keys(this.khpsxxwh_base).forEach(e => {
        this.khpsxxwh_base[e] = null;
      });

      this.khpsxxwh_base.inputmanid = sessionStorage.getItem("userid");
      this.khpsxxwh_base.inputman = sessionStorage.getItem("username");
      this.khpsxxwh_base.credate = this.getNewDate();

      this.openDialog();
    },

    beforeUpdate(data) {
      this.khpsxxwh_dialogTitle = "修改";
      this.khpsxxwh_dtlstatus = true;
      Object.keys(this.khpsxxwh_base).forEach(e => {
        this.khpsxxwh_base[e] = data.row[e];
      });

      this.khpsxxwh_base.credate = dateFormat(
        "YYYY-mm-dd",
        this.khpsxxwh_base.credate
      );

      this.openDialog();
    },

    save() {
      console.log("dtl", this.khpsxxwh_dtlstatus);
      if (this.khpsxxwh_dtlstatus == false) {
        this.insert();
      } else {
        this.update();
      }
    },
    // 新增
    insert() {
      let params = {
        companyid: this.khpsxxwh_base.credate.customid,
        companyname: this.khpsxxwh_base.customname,
        address: this.khpsxxwh_base.address,
        contact: this.khpsxxwh_base.contact,
        contactnote: this.khpsxxwh_base.contactnote,
        inputmanid: sessionStorage.getItem("userid")
      };

      console.log("客户配送信息维护 insert p ", params);
      this.$api.jzt
        .insertKhpsxxwh(params)
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
        address: this.khpsxxwh_base.address,
        contact: this.khpsxxwh_base.contact,
        contactnote: this.khpsxxwh_base.contactnote,
        stationid: this.khpsxxwh_base.stationid, // 站点ID
        inputmanid: sessionStorage.getItem("userid")
      };
      console.log("客户配送信息维护 update p ", params);
      this.$api.jzt
        .updateKhpsxxwh(params)
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
        stationid: row.stationid
      };
      console.log("客户配送信息维护 delete p ", params);
      this.$api.jzt
        .deleteKhpsxxwh(params)
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

