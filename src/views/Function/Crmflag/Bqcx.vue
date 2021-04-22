<!--标签查询-->
<template>
  <div>
    <e-query
      ref="query"
      :btn-options="bqcx_btnOptions"
      :form-list="bqcx_formList"
      :form-data="bqcx_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <el-table
      v-loading = "bqcx_loading"
      :data="bqcx_tableData"
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
         v-for="(item ,index) in bqcx_tableColumns"
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
      :current-page="bqcx_pageNum"
      :page-size="bqcx_pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="bqcx_pageTotal"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>

    <div>
      
      <el-dialog
        v-if="bqcx_dialogVisible"
        :visible.sync="bqcx_dialogVisible"
        :title="bqcx_dialogTitle"
        :width="bqcx_dialogWidth"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
        top="30vh"
      >
        
        <div
          style="text-align:center"
        >
        <kt-button
            type="primary"
            icon="fa fa-search"
            :label="'窗口查询'"
            :perms="'label:selectOperate'"
            @click="closeDialog();selectDoc(1,bqcx_pageSize);"
          ></kt-button>
        <kt-button
            type="danger"
            icon="fa fa-download"
            :label="'下载Excel'"
            :perms="'label:download'"
            @click="closeDialog();downloadExcel()"
        ></kt-button>

        </div>
      </el-dialog>
    </div>

    <hov-tools
      v-if="bqcx_classifyVisible"
      :hov-data="bqcx_classifyHov"
    ></hov-tools>

    <hov-tools
      v-if="bqcx_opcodeVisible"
      :hov-data="bqcx_opcodeHov"
    ></hov-tools>

    <hov-tools
      v-if="bqcx_vipareaVisible"
      :hov-data="bqcx_vipareaHov"
    ></hov-tools>

  </div>
</template>

<script lang="js" src="../../../js/crmflag/bqcx.js"></script>

<style scoped>
</style>

