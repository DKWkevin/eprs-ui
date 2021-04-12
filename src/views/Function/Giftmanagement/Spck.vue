<!--商品出库-->

<template>
  <div>
    <e-query
      ref="query"
      :btn-options="spck_btnOptions"
      :form-list="spck_formList"
      :form-data="spck_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <el-table
      v-loading="spck_loading"
      :data="spck_tableData"
      :height="setTableHeight()"
      @selection-change="tableSelectChange"
      border
      :header-cell-style="headerStyle"
    >

      <!-- <el-table-column type="selection"></el-table-column> -->

      <!-- <el-table-column
        prop="caozuo"
        width="120"
        label="操作"
        fixed
      >
        <template slot-scope="scope">
          <kt-button
            type="primary"
            icon="fa fa-edit"
            :label="'结算'"
            :disabled="scope.row.settleflag != 0"
            perms="freegood:spck:update"
            @click="beforeUpdate(scope)"
          ></kt-button>
        </template>
      </el-table-column> -->

      <el-table-column
        v-for="(item ,index) in spck_tableColumns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :formatter="formatter"
      ></el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination
      small
      background
      :current-page="spck_pageNum"
      :page-size="spck_pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="spck_pageTotal"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="spck_dialogVisible"
        :visible.sync="spck_dialogVisible"
        :title="spck_dialogTitle"
        :width="spck_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="spck_base"
          :inline="spck_inline"
          :label-width="spck_dialogLabelWidth"
        >
          <el-row v-if="spck_dtlstatus == false">

            <el-col :span="12">
              <el-form-item label="门店ID">
                <el-input
                  style="width:160px;"
                  v-model.number="spck_base.counterid"
                  :disabled="true"
                ></el-input>
                <!-- <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('counterid')"
                  v-if="spck_dtlstatus == false"
                ></el-button> -->
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="门店名称">
                <el-input
                  v-model="spck_base.countername"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>


            <el-col :span="12">
              <el-form-item label="销售单ID">
                <el-input
                  v-model.number="spck_base.rsdocid"
                  :disabled="false"
                  @blur="getRsInfo"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="销售日期">
                <el-input
                  v-model="spck_base.rscredate"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售金额">
                <el-input
                  v-model="spck_base.rstotal"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>


            <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  style="width:130px;"
                  v-model.number="spck_base.goodsid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                  v-if="spck_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="货品名称">
                <el-input
                  v-model.number="spck_base.goodsname"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格">
                <el-input
                  v-model="spck_base.goodstype"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="单位">
                <el-input
                  v-model="spck_base.goodsunit"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="产地">
                <el-input
                  v-model="spck_base.prodarea"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="价格">
                <el-input
                  v-model="spck_base.unitprice"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="数量">
                <el-input v-model="spck_base.goodsqty" @blur="getTotal"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="金额">
                <el-input
                  v-model="spck_base.total"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="批号">
                <el-input v-model="spck_base.lotno" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="spck_base.memo"></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row v-if="spck_dtlstatus == true">
            <el-col :span="12">
              <el-form-item label="发票号">
                <el-input v-model="spck_base.invoiceno"></el-input>
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
      v-if="spck_goodsVisible"
      :hov-data="spck_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="spck_supplyVisible"
      :hov-data="spck_supplyHov"
    ></hov-tools>

    <hov-tools
      v-if="spck_counterVisible"
      :hov-data="spck_counterHov"
    ></hov-tools>

    <hov-tools
      v-if="spck_rsdocidVisible"
      :hov-data="spck_rsdocidHov"
    ></hov-tools>

  </div>
</template>

<script lang="js" src="../../../js/giftmanagement/spck.js"></script>

<style scoped>
</style>


