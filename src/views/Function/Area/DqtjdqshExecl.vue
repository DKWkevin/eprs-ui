<template>
  <div class="dqtjdqshexecl">
    <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse"  v-loading="uploading">
      <div style="float: left">
        <el-form :inline="true">
          <el-form-item label="门店ID">
            <el-input v-model="base.counterid" disabled="disabled" style="width:70%;"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('queryCounter')"></el-button>
          </el-form-item>
          <el-form-item label="货品ID">
            <el-input v-model="base.goodsid" disabled="disabled" style="width:70%;"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('queryGoods')"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="clear: both">
        <el-button type="primary" @click="queryExecl" style="float:left;">查询</el-button>
        <upload-button @upload="implUserExcel"></upload-button>
        <!--<el-button type="primary" @click="saveAll" style="float:left;" :disabled="saveStatus">保存</el-button>-->
        <el-button type="primary" @click="download" style="float:left;">导出</el-button>
        <el-button type="primary" @click="downloadMb" style="float:left;">导出模板</el-button>
        <el-button type="primary" @click="dtlVisible=true" style="float:left;">新增单条</el-button>
      </div>
      <e-table
        ref="docExeclTable"
        :table-data="tableData"
        :table-columns="tableColumns"
        :table-height="tableHeight"
        :loading="loading"
        :tablePageSize="pageSize"
        :tableCurrentPage="currentPage"
        :tableTotal="total"
        @handle="handleFunction"
        @currentChange="handleQuery"
        @sizeChange="handleQuery"
      ></e-table>
    </el-dialog>
    <el-dialog v-if="dtlVisible" :visible.sync="dtlVisible" :title="dtlTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dtlClose">
      <el-form ref="baseForm" :model="dtlFormData" style="width:300px;margin:0 auto;" :label-position="labelPosition" :label-width="labelWidth" :rules="baseRules">
  <!--      <el-form-item prop="cityid" label="城市ID">
          <el-select v-model.number="dtlFormData.cityid" clearable @change="cityChange">
            <el-option v-for="(item,index) in cityOptions" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="areaid" label="区域ID">
          <el-select v-model.number="dtlFormData.areaid">
            <el-option v-for="(item,index) in areaOptions" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item prop="goodsid" label="货品ID">
          <el-input v-model.number="dtlFormData.goodsid" style="width:80%;"></el-input>
          <el-button  icon="el-icon-search" circle @click="openHov('goodsid')"></el-button>
        </el-form-item>
        <el-form-item prop="counterid" label="门店ID">
          <el-input v-model.number="dtlFormData.counterid" style="width:80%;"></el-input>
          <el-button  icon="el-icon-search" circle @click="openHov('counterid')"></el-button>
        </el-form-item>
        <el-form-item prop="inbatchid" label="内部批次">
          <el-input v-model.number="dtlFormData.inbatchid" style="width:90%;"></el-input>
        </el-form-item>
        <el-form-item prop="goodsqty" label="数量">
          <el-input v-model.number="dtlFormData.goodsqty" style="width:90%;"></el-input>
        </el-form-item>
        <el-form-item prop="isregional" label="是否跨区域">
          <el-select v-model.number="dtlFormData.isregional" clearable="clearable">
            <el-option :value="1" label="是"></el-option>
            <el-option :value="0" label="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" @click="dtlClose">取消</el-button>
        <el-button type="primary" @click="insertSingle">保存</el-button>
      </div>
    </el-dialog>
    <hov-tools v-if="queryGoodsVisible" :hov-data="queryGoodsHov"></hov-tools>
    <hov-tools v-if="queryCounterVisible" :hov-data="queryCounterHov"></hov-tools>
    <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
    <hov-tools v-if="counterVisible" :hov-data="counterHov"></hov-tools>
  </div>
</template>

<script lang="js" src="../../../js/area/dqtjdqshexecl.js"></script>

<style scoped>
  .dqtjdqshexecl .el-dialog__body{padding:0 2px 20px 2px;max-height:420px;overflow:auto}
</style>
