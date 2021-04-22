<template>
  <div>
    <e-query
      ref="query"
      :btn-options="bqgl_btnOptions"
      :form-list="bqgl_formList"
      :form-data="bqgl_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <el-table
      v-loading="bqgl_loading"
      :data="bqgl_tableData"
      :height="setTableHeight()"
      @selection-change="tableSelectChange"
      border
      :header-cell-style="headerStyle"
    >

      <!-- <el-table-column type="selection"></el-table-column> -->

      <el-table-column
        prop="caozuo"
        width="220"
        label="操作"
        fixed
      >
        <template slot-scope="scope">

          <kt-button
            v-if="scope.row.usestatus == 2"
            type="primary"
            icon="fa fa-edit"
            :label="'数据定义'"
            :perms="'label:insertData'"
            @click="beforeUpdate(scope)"
          ></kt-button>
          <kt-button
            v-if="scope.row.usestatus == 2"
            type="primary"
            icon="fa fa-edit"
            :label="'转正'"
            :perms="'label:updateStatus'"
            @click="update(1,scope.row)"
          ></kt-button>
          <kt-button
            v-if="scope.row.usestatus == 1"
            type="primary"
            icon="fa fa-edit"
            :label="'停用'"
            :perms="'label:updateStatus'"
            @click="update(3,scope.row)"
          ></kt-button>
          <kt-button
            v-if="scope.row.usestatus == 1 ||　scope.row.usestatus == 3"
            type="primary"
            icon="fa fa-edit"
            :label="'作废'"
            :perms="'label:updateStatus'"
            @click="update(4,scope.row)"
          ></kt-button>
          <kt-button
            v-if="scope.row.usestatus == 3 || scope.row.usestatus == 4"
            type="primary"
            icon="fa fa-edit"
            :label="'恢复'"
            :perms="'label:updateStatus'"
            @click="update(1,scope.row)"
          ></kt-button>
        </template>
      </el-table-column>

      <el-table-column
        v-for="(item ,index) in bqgl_tableColumns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :formatter="formatter"
      ></el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination
      small
      background
      :current-page="bqgl_pageNum"
      :page-size="bqgl_pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="bqgl_pageTotal"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>

    <div>
      <!-- 新增  修改  -->
      <el-dialog
        v-if="bqgl_dialogVisible"
        :visible.sync="bqgl_dialogVisible"
        :title="bqgl_dialogTitle"
        :width="bqgl_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <el-form
          :model="bqgl_base"
          :inline="bqgl_inline"
          :label-width="bqgl_dialogLabelWidth"
        >
          <el-row v-if="bqgl_dtlstatus == false">

            <el-col :span="12">
              <el-form-item label="标签名称">
                <el-input
                  v-model="bqgl_base.flagname"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="操作码">
                <el-input
                  v-model.number="bqgl_base.opcode"
                  :disabled="false"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="类型ID">
                <el-input
                  style="width:130px;"
                  v-model.number="bqgl_base.typeid"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('classifyid')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型名称">
                <el-input
                  v-model.number="bqgl_base.typename"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row v-if="bqgl_dtlstatus == true && bqgl_base.typeid == 1">
            <!--数据定义 标签类型: 付款方式-->
            <el-col :span="12">
              <el-form-item label="付款方式ID">
                <el-input
                  style="width:130px;"
                  v-model.number="bqgl_base.data"
                  :disabled="true"
                ></el-input>
                <el-button
                  circle
                  icon="el-icon-search"
                  @click="openDailogHov('paymode')"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款方式">
                <el-input
                  v-model.number="bqgl_base.dataname"
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
      v-if="bqgl_classifyVisible"
      :hov-data="bqgl_classifyHov"
    ></hov-tools>

    <hov-tools
      v-if="bqgl_opcodeVisible"
      :hov-data="bqgl_opcodeHov"
    ></hov-tools>

    <hov-tools
      v-if="bqgl_paymodeVisible"
      :hov-data="bqgl_paymodeHov"
    ></hov-tools>

  </div>
</template>

<script lang="js" src="../../../js/crmflag/bqgl.js"></script>

<style scoped>
</style>