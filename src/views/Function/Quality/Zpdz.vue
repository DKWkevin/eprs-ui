<template>
  <div>
    <e-query
      ref="query"
      :form-list="zpdzFormList"
      :form-data="zpdzFormData"
      :btn-options="zpdzBtnOptions"
      @query="queryFunction"
      @openHov="openHov"
    >
    </e-query>

    <e-table
      ref="doctable"
      :table-columns="zpdzTableColumns"
      :table-data="zpdzTableData"
      :table-height="350"
      :table-width-status="false"
      :loading="zpdzLoading"
      @handle="handleFunction"
      @sizeChange="handleChange"
      @currentChange="handleChange"
    >

    </e-table>

    <hov-tools
      v-if="zpdzGoodsVisible"
      :hov-data="zpdzGoodsHov"
      @updatehov="hideHov"
    ></hov-tools>
    <hov-tools
      v-if="zpdzGoodsVisible_2"
      :hov-data="zpdzGoodsHov_2"
    ></hov-tools>

    <div>
      <!-- 商品引进 新增   -->
      <el-dialog
        v-if="zpdzDialogVisible"
        :visible.sync="zpdzDialogVisible"
        :title="zpdzDialogTitle"
        :width="zpdzDialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >

        <el-form
          :model="zpdzBase"
          :inline="zpdzInline"
          :label-width="zpdzDialogLabelWidth"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="赠品ID">
                <el-input
                  v-model="zpdzBase.source_goodsid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('source_goodsid')"
                  v-if="zpdzDtlstatus===false"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="原货品ID">
                <el-input
                  v-model="zpdzBase.traget_goodsid"
                  :disabled="true"
                  style="width:70%"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('traget_goodsid')"
                  v-if="zpdzDtlstatus===false"
                ></el-button>
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
<script lang="js" src="../../../js/quality/zpdz.js"></script>
