<!-- 进销存查询 -->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="jxccx_btnOptions"
      :form-list="jxccx_formList"
      :form-data="jxccx_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <el-table
      v-loading = "jxccx_loading"
      :data="jxccx_tableData"
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
            :label="scope.row.usestatus==0?'启用':'停用'"
            perms="freegood:freegoods:update"
            @click="update(scope.row, scope.$index)"
          ></kt-button>
        </template>
      </el-table-column> -->

      <el-table-column
         v-for="(item ,index) in jxccx_tableColumns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :formatter="formatter"
        :width="item.width"
      ></el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination
      small
      background
      :current-page="jxccx_pageNum"
      :page-size="jxccx_pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="jxccx_pageTotal"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="jxccx_dialogVisible"
        :visible.sync="jxccx_dialogVisible"
        :title="jxccx_dialogTitle"
        :width="jxccx_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="jxccx_base"
          :inline="jxccx_inline"
          :label-width="jxccx_dialogLabelWidth"
        >
          <el-row>

            <!-- <el-col :span="12">
              <el-form-item label="供应商ID">
                <el-input
                  style="width:130px;"
                  v-model.number="jxccx_base.supplyid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('supplyid')"
                  v-if="jxccx_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col> -->

            <el-col :span="12">
              <el-form-item label="供应商名称">
                <el-input
                  v-model="jxccx_base.supplyname"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="12">
              <el-form-item label="货品ID">
                <el-input
                  style="width:130px;"
                  v-model.number="jxccx_base.goodsid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('goodsid')"
                  v-if="jxccx_dtlstatus == false"
                ></el-button>
              </el-form-item>
            </el-col> -->

            <el-col :span="12">
              <el-form-item label="货品名称">
                <el-input
                  v-model.number="jxccx_base.goodsname"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格">
                <el-input
                  v-model="jxccx_base.goodstype"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="单位">
                <el-input
                  v-model="jxccx_base.goodsunit"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="产地">
                <el-input
                  v-model="jxccx_base.prodarea"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="价格">
                <el-input v-model="jxccx_base.unitprice"></el-input>
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
      v-if="jxccx_goodsVisible"
      :hov-data="jxccx_goodsHov"
    ></hov-tools>

    <hov-tools
      v-if="jxccx_supplyVisible"
      :hov-data="jxccx_supplyHov"
    ></hov-tools>

    <hov-tools
      v-if="jxccx_counterVisible"
      :hov-data="jxccx_counterHov"
    ></hov-tools>

  </div>
</template>

<script lang="js" src="../../../js/giftmanagement/jxccx.js"></script>

<style scoped>
</style>

