<!--  采购渠道  -->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="cgqd_btnOptions"
      :form-list="cgqd_formList"
      :form-data="cgqd_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <e-table
      ref="doctable"
      :table-width-status="false"
      :table-columns="cgqd_tableColumns"
      :table-data="cgqd_tableData"
      :table-height="setTableHeight()"
      :loading="cgqd_loading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="cgqd_dialogVisible"
        :visible.sync="cgqd_dialogVisible"
        :title="cgqd_dialogTitle"
        :width="cgqd_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          ref="saveForm"
          :model="cgqd_base"
          :inline="cgqd_inline"
          :label-width="cgqd_dialogLabelWidth"
        >
          <el-row>

            <el-col
              :span="12"
              v-if="cgqd_dtlstatus == true"
            >
              <el-form-item label="渠道ID">
                <el-input
                  v-model="cgqd_base.channelid"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="公司ID"
                prop="companyid"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  v-model.number="cgqd_base.companyid"
                  :disabled="true"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称">
                <el-input
                  v-model="cgqd_base.companyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="供应商ID"
                prop="supplyid"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  style="width:130px;"
                  v-model.number="cgqd_base.supplyid"
                  :disabled="true"
                  :validate-event="false"
                ></el-input>
                <el-button
                  v-if="cgqd_dtlstatus == false"
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('supplyid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商名称">
                <el-input
                  v-model.number="cgqd_base.supplyname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="物流收货单位">
                <el-select
                  v-model="cgqd_base.lmcompanyid"
                  :disabled="cgqd_dtlstatus === true"
                >
                  <el-option
                    v-for="(op,i) in cgqd_selectData.lmcompanyid"
                    :key="i"
                    :label="op.label"
                    :value="op.value"
                  ></el-option>

                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="货品ID"
                prop="goodsid"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  style="width:130px;"
                  v-model.number="cgqd_base.goodsid"
                  :disabled="true"
                  :validate-event="false"
                ></el-input>
                <el-button
                  v-if="cgqd_dtlstatus == false"
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品名">
                <el-input
                  v-model.number="cgqd_base.goodsname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格">
                <el-input
                  v-model.number="cgqd_base.goodstype"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产地">
                <el-input
                  v-model.number="cgqd_base.prodarea"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位">
                <el-input
                  v-model.number="cgqd_base.goodsunit"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="采购员ID"
                prop="buyerid"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  style="width:130px;"
                  v-model.number="cgqd_base.buyerid"
                  :disabled="true"
                  :validate-event="false"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('buyerid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购员">
                <el-input
                  v-model.number="cgqd_base.buyer"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="采购部门ID"
                prop="pcdtpeid"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  style="width:130px;"
                  v-model.number="cgqd_base.pcdtpeid"
                  :disabled="true"
                  :validate-event="false"
                ></el-input>
                <el-button
                  v-if="cgqd_dtlstatus == false"
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('pcdtpeid_2')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购部门">
                <el-input
                  v-model.number="cgqd_base.pcdtpename"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="财务退货方式">
                <el-input v-model="cgqd_base.backmode"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="经销方式"
                prop="salesmode"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  v-model="cgqd_base.salesmode"
                  :disabled="true"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="付款方式"
                prop="paymode"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-select
                  @change="setSalesmode"
                  v-model="cgqd_base.paymode"
                  :validate-event="false"
                >
                  <el-option
                    v-for="(op ,i) in cgqd_selectData.paymode"
                    :key="i"
                    :label="op.label"
                    :value="op.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="账期"
                prop="payterm"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  v-model="cgqd_base.payterm"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="采购价格"
                prop="suprice"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input v-model="cgqd_base.suprice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="折现价格"
                prop="discprice"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  v-model="cgqd_base.discprice"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="最大出厂天数"
                prop="largfactdays"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  v-model="cgqd_base.largfactdays"
                  :disabled="cgqd_dtlstatus === true"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="采购周期"
                prop="pccycle"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  v-model="cgqd_base.pccycle"
                  :disabled="cgqd_dtlstatus === true"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="到货周期"
                prop="sucycle"
                :rules="cgqd_form_rules.not_empty"
              >
                <el-input
                  v-model="cgqd_base.sucycle"
                  :disabled="cgqd_dtlstatus === true"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="进货优先级"
                prop="prioritiesno"
                :rules="cgqd_form_rules.prioritiesno"
              >
                <el-input
                  v-model="cgqd_base.prioritiesno"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col
              :span="12"
              v-if="cgqd_dtlstatus == true"
            >
              <el-form-item label="状态">
                <el-select v-model="cgqd_base.usestatus">
                  <el-option
                    :label="'正式'"
                    :value="'1'"
                  ></el-option>
                  <el-option
                    :label="'停用'"
                    :value="'0'"
                  ></el-option>
                  <el-option
                    :label="'临时'"
                    :value="'2'"
                  ></el-option>
                  <el-option
                    :label="'终止'"
                    :value="'3'"
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
          >保存
          </el-button>
          <el-button
            type="info"
            round
            @click="closeDialog"
          >取消
          </el-button>
        </div>
      </el-dialog>
    </div>

    <hov-tools
      v-if="cgqd_goodsVisible"
      :hov-data="cgqd_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="cgqd_companyVisible"
      :hov-data="cgqd_companyHov"
    ></hov-tools>

    <hov-tools
      v-if="cgqd_e_buyeridVisible"
      :hov-data="cgqd_e_buyeridHov"
    ></hov-tools>

    <hov-tools
      v-if="cgqd_e_deptidVisible"
      :hov-data="cgqd_e_deptidHov"
    ></hov-tools>

    <hov-tools
      v-if="cgqd_e_deptidVisible_2"
      :hov-data="cgqd_e_deptidHov_2"
    ></hov-tools>

  </div>
</template>


<script lang="js" src="../../../js/quality/cgqd.js"></script>
