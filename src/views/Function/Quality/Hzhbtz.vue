<template>
  <div>
    <!-- <e-query
      ref="query"
      :form-list="hzhbtzFormList"
      :form-data="hzhbtzFormData"
      :btn-options="hzhbtzBtnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query> -->

    <e-querys>
      <template v-slot:query>
        <el-form
          :model="hzhbtzFormData"
          :inline="true"
        >
          <el-form-item-hov
            prop="companyid"
            label="合作伙伴ID"
            v-model="hzhbtzFormData.companyid"
            id="companyid"
            @openHov="openHov"
          ></el-form-item-hov>
          <el-form-item label="采购分组">
            <el-select
              @change="class1Change"
              v-model="hzhbtzFormData.class1"
            >
              <el-option
                v-for="(op,i) in hzhbtzFormList[1].options"
                :key="i"
                :label="op.label"
                :value="op.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购经理">
            <el-select v-model="hzhbtzFormData.managerid">
              <el-option
                v-for="(op,i) in hzhbtzFormList[2].options"
                :key="i"
                :label="op.label"
                :value="op.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大数值分类">
            <el-select v-model="hzhbtzFormData.class2">
              <el-option
                v-for="(op,i) in hzhbtzFormList[3].options"
                :key="i"
                :label="op.label"
                :value="op.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:button>
        <kt-button
          type="primary"
          icon="fa fa-edit"
          :label="$t('action.edit')"
          perms="quality:hzhbtz:update"
          @click="save"
        ></kt-button>
        <!-- <el-button
          type="primary"
          icon="fa fa-edit"
          @click="save"
        >保存</el-button> -->
      </template>
    </e-querys>

    <hov-tools
      v-if="hzhbtzCompanyVisible"
      :hov-data="hzhbtzCompanyHov"
      @updatehov="hideHov"
    ></hov-tools>
  </div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import HovTools from "@/views/Core/HovTools";

import KtButton from "@/views/Core/KtButton";

import {
  getNewDate,
  paramsFormat,
  formDataReset,
  dateFormat,
  exportExcelDOM,
  selectDdlOption
} from "@/utils/functions";
export default {
  components: { EQuery, ETable, HovTools, KtButton },
  data() {
    return {
      hzhbtzFormList: [
        {
          type: "inputHov",
          label: "合作伙伴ID",
          id: "companyid",
          dataType: "number"
        },
        { type: "select", label: "采购分组", id: "class1", options: [] },
        { type: "select", label: "采购经理", id: "managerid", options: [] },
        { type: "select", label: "最大数值分类", id: "class2", options: [] }
      ],
      hzhbtzFormData: {
        companyid: null,
        class1: null,
        managerid: null,
        class2: null
      },
      // hzhbtzBtnOptions: [
      //   {
      //     id: "edit",
      //     icon: "fa fa-plus",
      //     label: "action.edit",
      //     perms: "quality:hzhbtz:insert"
      //     perms: ""
      //   }
      // ],

      hzhbtzTableColumns: [],
      hzhbtzTableData: {},
      hzhbtzLoading: false,

      hzhbtzCompanyVisible: false,
      hzhbtzCompanyHov: {
        hovTitle: "合作伙伴查询",
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: true,
        fillDataName: "hzhbtzFormData",
        parentVisible: "hzhbtzCompanyVisible",
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
            dataStatus: 1
          },
          {
            id: "companyopcode",
            name: "公司操作码",
            queryStatus: true,
            dataStatus: 1
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    // queryFunction(data) {
    //   if (data == "edit") {
    //     this.save();
    //   }
    // },
    openHov(data) {
      if (data == "companyid") {
        this.hzhbtzCompanyVisible = true;
      }
    },
    handleFunction(data) {},
    handleChange() {},

    hideHov() {
      // console.log('source_goodsid',this.zpdzFormData.source_goodsid)
      this.class1()
        .then(res => {
          this.managerid();
        })
        .then(res => {
          this.class2();
        })
        .catch(e => {
          return false;
        });
    },

    class1() {
      //查询 采购分组 下拉菜单
      let params = {
        companyid: this.hzhbtzFormData.companyid
      };
      console.log("quality hzhbtz class1", params);
      return this.$api.quality.selectHzhbtzClass1(params).then(res => {
        if (res.code == 200) {
          let list = [];
          res.data.forEach(e => {
            let tel = {};
            tel.value = e.groupid;
            tel.label = e.groupname;
            list.push(tel);
          });
          this.hzhbtzFormList[1].options = list;
          if (this.hzhbtzFormList[1].options.length > 0) {
            this.hzhbtzFormData.class1 = this.hzhbtzFormList[1].options[0].value;
          }
        }
      });
    },

    class1Change() {
      //采购分组 下拉菜单 改变
      this.managerid()
        .then(res => {
          this.class2();
        })
        .catch(e => {
          return false;
        });
    },

    managerid() {
      // 采购经理 下拉菜单
      let params = {
        companyid: this.hzhbtzFormData.companyid,
        class1: this.hzhbtzFormData.class1
      };
      console.log("quality hzhbtz managerid", params);
      return this.$api.quality
        .selectHzhbtzManagerid()
        .then(res => {
          let list = [];
          if (res.code == 200) {
            res.data.forEach(e => {
              let tel = {};
              tel.value = e.buyerid;
              tel.label = e.buyername;
              list.push(tel);
            });

            this.hzhbtzFormList[2].options = list;
          }
        })
        .then(res => {
          this.$api.quality.selectHzhbtzCgjl(params).then(res1 => {
            if (res1.code == 200) {
              this.hzhbtzFormData.managerid = res1.data[0].managerid;
            }
          });
        });
    },
    class2() {
      // 最大数值分类 下拉菜单
      let params = {
        companyid: this.hzhbtzFormData.companyid,
        class1: this.hzhbtzFormData.class1
      };
      console.log("quality hzhbtz class2", params);
      return this.$api.quality
        .selectHzhbtzClass2()
        .then(res => {
          if (res.code == 200) {
            let list = [];
            res.data.forEach(e => {
              let tel = {};
              tel.value = e.categoryid2;
              tel.label = e.categoryname2;
              list.push(tel);
            });
            this.hzhbtzFormList[3].options = list;
          }
        })
        .then(res => {
          this.$api.quality.selectHzhbtzZdszfl(params).then(res1 => {
            if (res1.code == 200) {
              this.hzhbtzFormData.class2 = res1.data[0].class2;
            }
          });
        });
    },

    save() {
      if (this.hzhbtzFormData.companyid == null) {
        alert("合作伙伴ID不能为空");
        return;
      }
      if (this.hzhbtzFormData.class1 == null) {
        alert("采购分组不能为空");
        return;
      }
      let params = {
        companyid: this.hzhbtzFormData.companyid,
        class1: this.hzhbtzFormData.class1,
        class2: this.hzhbtzFormData.class2,
        managerid: this.hzhbtzFormData.managerid
      };
      console.log("quality hzhbtz save p", params);
      this.$api.quality
        .updateHzhbtz(params)
        .then(res => {
          if (res.code == 200) {
            alert("保存成功");
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