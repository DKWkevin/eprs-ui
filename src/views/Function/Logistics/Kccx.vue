<template>
<div>
  <e-query ref="query"
           :btn-options="btnOptions"
           :form-list="formList"
           :form-data="formData"
           :labelWidth="labelWidth"
           @openHov="openHov"
           @query="queryFunction"
  ></e-query>
  <div>
    <el-table :data="tableData" border stripe :height="tableHeight" v-loading="loading" :header-cell-style="headerStyle" @cell-click="aqkc" :row-class-name="tableRowClassName">
      <el-table-column label="货品ID" prop="goodsid"></el-table-column>
      <el-table-column label="品名" prop="goodsname" min-width="200"></el-table-column>
      <el-table-column label="规格" prop="goodstype" width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="单位" prop="goodsunit"></el-table-column>
      <el-table-column label="产地" prop="prodarea" min-width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="批号" prop="lotno"></el-table-column>
      <el-table-column label="生产日期" prop="proddate" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.proddate)}}
        </template>
      </el-table-column>
      <el-table-column label="失效日期" prop="invaliddate" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.invaliddate)}}
        </template>
      </el-table-column>
      <el-table-column label="库存" prop="remqty"></el-table-column>
      <el-table-column label="进价" prop="unitprice"></el-table-column>
      <el-table-column label="安全库存" prop="aqkc" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.buydeptid===83672">{{scope.row.aqkc}}</div>
          <div v-else>
              <div v-if="deptid===94965||deptid===6||deptid===117791||deptid===202435">
                <div v-if="scope.row.index === tableIndex">
                  <el-input v-model="scope.row.aqkc"></el-input>
                  <el-link type="primary" @click="saveAqkc(scope.row)">保存</el-link>
                  <el-link type="info" @click="closeAqkc(scope.row)">取消</el-link>
                </div>
                <span v-else>{{scope.row.aqkc}}</span>
              </div>
              <div v-else>{{scope.row.aqkc}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="进货部门ID" prop="buydeptid"></el-table-column>
      <el-table-column label="进货部门名称" prop="buydeptname"></el-table-column>
      <el-table-column label="货品状态" prop="goodsstatus"></el-table-column>
      <el-table-column label="内部批次ID" prop="inbatchid" width="100"></el-table-column>
      <el-table-column label="外部批次ID" prop="outbatchid"></el-table-column>
      <el-table-column label="供应商ID" prop="supplyid"></el-table-column>
      <el-table-column label="供应商名称" prop="supplyname" min-width="200"></el-table-column>
      <el-table-column label="采购支持" prop="buyer"></el-table-column>
      <el-table-column label="状态" prop="usestatusname"></el-table-column>
      <el-table-column label="保管单位ID" prop="stcompanyid"></el-table-column>
      <el-table-column label="保管单位名称" prop="stcompanyname"></el-table-column>
    </el-table>
    <el-pagination
      small
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="total"
      :layout="layout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>
  </div>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="partenerVisible" :hov-data="partenerHov"></hov-tools>
</div>
</template>
<!--库存查询-->
<script lang="js" src="../../../js/logistics/kccx.js"></script>
