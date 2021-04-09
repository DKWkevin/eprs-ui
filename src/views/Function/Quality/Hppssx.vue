<!--  货品配送属性   -->
<template>
  <div>
    <!-- :form-list="hppssx_formList"
      :form-data="hppssx_formData" -->
    <e-query
      ref="query"
      :btn-options="hppssx_btnOptions"
      :form-list="hppssx_formList"
      :form-data="hppssx_formData"
      @openHov="openHov"
      @query="queryFunction"
      @implUserExcel="importSpttdl"
    ></e-query>

    <e-table
      ref="doctable"
      :table-width-status="false"
      :table-columns="hppssx_tableColumns"
      :table-data="hppssx_tableData"
      :table-height="setTableHeight()"
      :loading="hppssx_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="hppssx_dialogVisible"
        :visible.sync="hppssx_dialogVisible"
        :title="hppssx_dialogTitle"
        :width="hppssx_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="hppssx_base"
          :inline="hppssx_inline"
          :label-width="hppssx_dialogLabelWidth"
        >
          <el-row>

            <el-col :span="12">
              <el-form-item label="公司ID">
                <el-input
                  style="width:130px;"
                  v-model.number="hppssx_base.companyid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('companyid')"
                  v-if="hppssx_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="公司名称">
                <el-input
                  v-model.number="hppssx_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  style="width:130px;"
                  v-model="hppssx_base.goodsid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                  v-if="hppssx_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品名">
                <el-input
                  v-model="hppssx_base.goodsname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格">
                <el-input
                  v-model="hppssx_base.goodstype1"
                  :disabled="true"
                ></el-input>
                <!-- <el-select v-model="hppssx_base.goodstype1">
                  <el-option
                    v-for="(op,i) in hppssx_selectData.monitortype"
                    :key="i"
                    :label="op.label"
                    :value="op.value"
                  ></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位">
                <el-input
                  v-model="hppssx_base.goodsunit"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产地">
                <el-input
                  v-model="hppssx_base.prodarea"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="货品分类">
                <el-select v-model="hppssx_base.goodstype">
                  <el-option
                    :label="'G'"
                    :value="'G'"
                  ></el-option>
                  <el-option
                    :label="'Z'"
                    :value="'Z'"
                  ></el-option>
                  <el-option
                    :label="'QR'"
                    :value="'QR'"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="毛利率等级">
                <el-input v-model="hppssx_base.gprograde"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="最小请货量">
                <el-input v-model="hppssx_base.minreqqty"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="适销店型">
                <el-input
                  v-model="hppssx_base.fsaletype"
                  @blur="setFnrelation"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="必备店型">
                <el-input
                  v-model="hppssx_base.nesstype"
                  @blur="setFnrelation"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="适销必备关系">
                <el-input
                  v-model="hppssx_base.fnrelation"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="录入人ID">
                <el-input
                  v-model="hppssx_base.inputmanid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录入人">
                <el-input
                  v-model="hppssx_base.employeename"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录入时间">
                <el-input
                  v-model="hppssx_base.credate"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="状态">
                <el-select v-model="hppssx_base.usestatus">
                  <el-option
                    :label="'正式'"
                    :value="'1'"
                  ></el-option>
                  <el-option
                    :label="'临时'"
                    :value="'0'"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="12"
              v-if="hppssx_dtlstatus == true"
            >
              <el-form-item label="更新人">
                <el-input
                  v-model="hppssx_base.updatemanid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  v-model="hppssx_base.memo"
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
      v-if="hppssx_goodsVisible"
      :hov-data="hppssx_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="hppssx_companyVisible"
      :hov-data="hppssx_companyHov"
    ></hov-tools>
  </div>
</template>


<script>
import XLSX from "xlsx";
import {
  paramsFormat,
} from "@/utils/functions";
export default {
  data() {
    return {
      hppssx_btnOptions: [
        {
          id: "query",
          icon: "fa fa-search",
          label: "action.search",
          perms: "quality:hppssx:select"
        },
        {
          id: "add",
          icon: "fa fa-edit",
          label: "action.add",
          perms: "quality:hppssx:insert"
        },
        {
          id: "upload",
          icon: "fa fa-upload",
          label: "action.upload",
          perms: "quality:hppssx:insertImport"
        }
      ],
      hppssx_formList: [
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
      hppssx_formData: {
        goodsid: null,
        companyid: null
      },

      hppssx_tableColumns: [
        { label: "公司ID", prop: "companyid", type: 0, tableStatus: 0 },
        { label: "公司操作码", prop: "companyopcode", type: 0, tableStatus: 0 },
        { label: "公司名称", prop: "companyname", type: 0, tableStatus: 0 },
        { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
        { label: "品名", prop: "goodsname", type: 0, tableStatus: 0 },
        { label: "规格", prop: "goodstype1", type: 0, tableStatus: 0 },
        { label: "单位", prop: "goodsunit", type: 0, tableStatus: 0 },
        { label: "产地", prop: "prodarea", type: 0, tableStatus: 0 },

        { label: "货品分类", prop: "goodstype", type: 0, tableStatus: 0 },
        { label: "毛利率等级", prop: "gprograde", type: 0, tableStatus: 0 },
        { label: "最小请货量", prop: "minreqqty", type: 0, tableStatus: 0 },
        { label: "适销店型", prop: "fsaletype", type: 0, tableStatus: 0 },
        { label: "必备店型", prop: "nesstype", type: 0, tableStatus: 0 },
        { label: "适销必备关系", prop: "fnrelation", type: 0, tableStatus: 0 },

        { label: "备注", prop: "memo", type: 0, tableStatus: 0 },
        { label: "录入人ID", prop: "inputmanid", type: 0, tableStatus: 0 },
        { label: "录入人", prop: "employeename", type: 0, tableStatus: 0 },
        { label: "录入日期", prop: "credate", type: 2, tableStatus: 0 },

        { label: "状态", prop: "usestatus_name", type: 0, tableStatus: 0 },

        {
          prop: "caozuos",
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
              perms: "quality:hppssx:update"
            },
            {
              id: "delete",
              icon: "fa fa-trash",
              label: "action.delete",
              perms: "quality:hppssx:delete"
            }
          ]
        }
      ],
      hppssx_tableData: [],
      hppssx_loading: false,

      //   el-dialog 数据
      hppssx_dialogVisible: false,
      hppssx_dialogTitle: "",
      hppssx_dtlstatus: false, // false 新增  true 修改

      hppssx_dialogWidth: "700px",
      hppssx_inline: true,
      hppssx_dialogLabelWidth: "120px",

      hppssx_base: {
        companyid: null, // 公司ID
        companyname: null, // 公司名称
        goodsid: null, // 货品ID
        goodsname: null, // 品名
        goodstype1: null, // 规格
        goodsunit: null, // 单位
        prodarea: null, // 产地

        goodstype: null, // 货品分类
        gprograde: null, // 毛利率等级
        minreqqty: null, // 最小请货量
        fsaletype: null, // 适销店型
        nesstype: null, // 必备店型
        fnrelation: null, // 适销必备关系

        inputmanid: null, // 录入人ID
        employeename: null, // 录入人
        credate: null, // 录入时间

        updatemanid: null, // 更新人ID

        memo: null, // 备注

        usestatus: null // 状态   1 正式   0　临时
      },

      //  excel 导入模板
      hppssx_excel_template: [
        { id: "companyid", name: "公司ID" },
        { id: "goodsid", name: "货品ID" },
        { id: "goodstype", name: "货品分类" },
        { id: "gprograde", name: "毛利率等级" },
        { id: "minreqqty", name: "最小请货量" },
        { id: "fsaletype", name: "适销店型" },
        { id: "nesstype", name: "必备店型" },
        { id: "fnrelation", name: "适销必备关系" },
        { id: "memo", name: "备注" }
      ],

      hppssx_selectData: { monitortype: [] },

      // hov
      hppssx_companyVisible: false,
      hppssx_companyHov: {
        hovTitle: "省公司查询",
        hovUrl: "companyidhov/selectbyuid",
        afterStatus: false,
        fillDataName: "hppssx_formData",
        parentVisible: "hppssx_companyVisible",
        hovColumns: [
          {
            id: "companyid",
            name: "公司ID",
            queryStatus: false,
            dataStatus: 2,
            fillid: "companyid"
          },
          {
            id: "companyname",
            name: "公司名称",
            queryStatus: false,
            dataStatus: 1,
            fillid: "companyname"
          },
          {
            id: "companyopcode",
            name: "公司操作码",
            queryStatus: false,
            dataStatus: 1
          },
          {
            id: "inputmanid",
            name: "登陆人ID",
            queryStatus: true,
            dataStatus: 2,
            display: 1,
            value: sessionStorage.getItem("userid")
          }
        ]
      },
      hppssx_goodsVisible: false,
      hppssx_goodsHov: {
        hovTitle: "货品查询",
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "hppssx_formData",
        parentVisible: "hppssx_goodsVisible",
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
            fillid: "goodstype1"
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
    // this.hppssx_selectData.monitortype = selectDdlOption("MONITORTYPE");
    // this.$api.counter.selectLlsbxxwhMonitortype().then(res => {
    //   this.hppssx_selectData.monitortype = res.data[0].monitortype;
    // });
  },
  methods: {
    queryFunction(data) {
      if (data == "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "add") {
        this.beforeInsert();
      } else if (data === "upload") {
        console.log("导入excel");
      }
    },

    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let params = paramsFormat(this.hppssx_formData);
      if(params == null){
        params = {}
      }
      params.inputmanid = sessionStorage.getItem("userid")
      console.log("查询 p", params);
      this.hppssx_loading = true;
      this.$api.quality
        .selectHppssx({ pageNum, pageSize, params })
        .then(res => {
          if (res.code === 200) {
            this.hppssx_tableData = Object.freeze(res.data.content);
            this.$refs.doctable.pageSize = res.data.pageSize;
            this.$refs.doctable.currentPage = res.data.pageNum;
            this.$refs.doctable.total = res.data.totalSize;
            this.hppssx_loading = false;
          }
        })
        .catch(error => {
          this.hppssx_loading = false;
          return false;
        });
    },

    // 设置 适销必备关系
    setFnrelation() {
      let str1 = "";
      if (this.hppssx_base.fsaletype != null) {
        str1 = this.hppssx_base.fsaletype.toLowerCase();
      }
      let str2 = "";
      if (this.hppssx_base.nesstype != null) {
        str2 = this.hppssx_base.nesstype.toLowerCase();
      }
      if (str1 != "" && str2 != "") {
        if (str1.indexOf(str2) >= 0) {
          this.hppssx_base.fnrelation = "1";
        } else {
          this.hppssx_base.fnrelation = "0";
        }
      }else{
        this.hppssx_base.fnrelation = "0";
      }
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
      this.hppssx_goodsHov.fillDataName = "hppssx_formData";
      this.hppssx_companyHov.fillDataName = "hppssx_formData";
      if (data === "goodsid") {
        this.hppssx_goodsVisible = true;
      } else if (data === "companyid") {
        this.hppssx_companyVisible = true;
      }
    },

    openDailogHov(data) {
      this.hppssx_goodsHov.fillDataName = "hppssx_base";
      this.hppssx_companyHov.fillDataName = "hppssx_base";
      if (data === "goodsid") {
        this.hppssx_goodsVisible = true;
      } else if (data === "companyid") {
        this.hppssx_companyVisible = true;
      }
    },
    closeDialog() {
      this.hppssx_dialogVisible = false;
    },
    openDialog() {
      this.hppssx_dialogVisible = true;
    },
    beforeInsert() {
      this.hppssx_dialogTitle = "新增";
      this.hppssx_dtlstatus = false;
      Object.keys(this.hppssx_base).forEach(e => {
        this.hppssx_base[e] = null;
      });

      this.hppssx_base.usestatus = "1";

      this.hppssx_base.inputmanid = sessionStorage.getItem("userid");
      this.hppssx_base.employeename = sessionStorage.getItem("username");
      this.hppssx_base.credate = this.getNewDate() + " 00:00:00";

      this.hppssx_base.goodstype = 'G';
      this.hppssx_base.gprograde = 'W';
      this.hppssx_base.fnrelation = "0";

      this.openDialog();
    },

    beforeUpdate(data) {
      this.hppssx_dialogTitle = "修改";
      this.hppssx_dtlstatus = true;
      Object.keys(this.hppssx_base).forEach(e => {
        this.hppssx_base[e] = data.row[e];
      });

      this.hppssx_base.updatemanid = sessionStorage.getItem("userid");

      this.setFnrelation();

      this.openDialog();
    },

    save() {
      if (this.hppssx_dtlstatus == false) {
        this.insert();
      } else {
        this.update();
      }
    },
    // 新增
    insert() {
      let params = {
        companyid: this.hppssx_base.companyid,
        companyname: this.hppssx_base.companyname,
        goodsid: this.hppssx_base.goodsid,
        goodsname: this.hppssx_base.goodsname,
        goodstype1: this.hppssx_base.goodstype1,
        goodsunit: this.hppssx_base.goodsunit,
        prodarea: this.hppssx_base.prodarea,
        goodstype: this.hppssx_base.goodstype,
        gprograde: this.hppssx_base.gprograde,
        minreqqty: this.hppssx_base.minreqqty,

        fsaletype: this.hppssx_base.fsaletype,
        nesstype: this.hppssx_base.nesstype,
        fnrelation: this.hppssx_base.fnrelation,

        inputmanid: this.hppssx_base.inputmanid,
        employeename: this.hppssx_base.employeename,
        credate: new Date(this.hppssx_base.credate),

        usestatus: this.hppssx_base.usestatus,
        memo: this.hppssx_base.memo
      };
      console.log("货品配送属性 insert p ", params);
      this.$api.quality
        .insertHppssx(params)
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
        companyid: this.hppssx_base.companyid,
        companyname: this.hppssx_base.companyname,
        goodsid: this.hppssx_base.goodsid,
        goodsname: this.hppssx_base.goodsname,
        goodstype1: this.hppssx_base.goodstype1,
        goodsunit: this.hppssx_base.goodsunit,
        prodarea: this.hppssx_base.prodarea,
        goodstype: this.hppssx_base.goodstype,
        gprograde: this.hppssx_base.gprograde,
        minreqqty: this.hppssx_base.minreqqty,

        fsaletype: this.hppssx_base.fsaletype,
        nesstype: this.hppssx_base.nesstype,
        fnrelation: this.hppssx_base.fnrelation,

        updatemanid: this.hppssx_base.updatemanid,

        usestatus: this.hppssx_base.usestatus,
        memo: this.hppssx_base.memo
      };
      console.log("货品配送属性 update p ", params);
      this.$api.quality
        .updateHppssx(params)
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
        companyid: row.companyid,
        goodsid: row.goodsid,
        inputmanid: sessionStorage.getItem("userid")
      };
      console.log("货品配送属性 delete p ", params);
      this.$api.quality
        .deleteHppssx(params)
        .then(res => {
          if (res.code == 200) {
            alert("成功");
          }
        })
        .catch(e => {
          return false;
        });
    },
    // 导入 Excel
    importSpttdl(file) {
      //console.log(file);
      if (this.checkFile(file)) {
        console.log("校验通过");
        this.getJsonArray(file, this.hppssx_excel_template).then(res => {
          console.log("货品配送属性 Excel文件jsonArray", res);
          let inputmanid = sessionStorage.getItem("userid");
          res.forEach(e=>{
            e.inputmanid = inputmanid
          })
          this.$api.quality
            .uploadHppssx({data:res})
            .then(res1 => {
              if (res1.code == 200) {
                alert("导入成功");
              }
            })
            .catch(e => {
              return false;
            });
        });
      }
    },
    checkFile(file) {
      const isExecl =
        file.name.split(".")[1] === "xlsx" || file.name.split(".")[1] === "xls";
      const isLt = file.size / 1024 / 1024 < 3;
      if (!isExecl) {
        alert("上传文件应为EXECL格式文件");
        return false;
      }
      if (!isLt) {
        alert("上传文件大小不能超过3M");
        return false;
      }
      return true;
    },
    /**
     *
     * 文件转换 jsonArray
     *
     * file  el-upload  on-change 回调函数的入参
     *
     * excel_template  自定义excel模板 {id,name} id 字段名  name 字段对应中文名
     *
     */
    getJsonArray(file, excel_template) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file.raw);
        reader.onload = function(e) {
          const workbook = XLSX.read(e.target.result, { type: "binary" });
          const wsname = workbook.SheetNames[0];
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
          let params = [];
          ws.forEach(sheet => {
            var sheetData = {};
            excel_template.forEach(res => {
              Object.keys(sheet).forEach(key => {
                if (key === res.name) {
                  sheetData[res.id] = sheet[key];
                  if (res.id.indexOf("date") >= 0 && sheet[key]) {
                    sheetData[res.id] = new Date(sheet[key]);
                  }
                }
              });
            });
            params.push(sheetData);
          });
          resolve(params);
        };
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

<style scoped>
</style>
