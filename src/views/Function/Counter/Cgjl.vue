<template>
  <div>
    <e-query
      ref="query"
      :btn-options="cgjl_btnOptions"
      :form-list="cgjl_formList"
      :form-data="cgjl_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>
    <hov-tools
      v-if="cgjl_goodsVisible"
      :hov-data="cgjl_goodsHov"
    ></hov-tools>
    <el-table
      :data="cgjl_tableData"
      :height="cgjl_tableHeight"
      @selection-change="tableSelectChange"
      border
      :header-cell-style="headerStyle"
    >
      <el-table-column type="selection"></el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="credate,outtime"
        label="销售日期,出柜日期"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.credate)}}</p>
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.outtime)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="goodsid,salesid"
        label="货品ID,销售单ID"
      >
        <template slot-scope="scope">
          <p>{{scope.row.goodsid}}</p>
          <p>{{scope.row.salesid}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="goodsname,jx,goodstype,goodsunit"
        label="品名、剂型,规格、单位"
      >
        <template slot-scope="scope">
          <p>
            <span>{{scope.row.goodsname}}</span>
            <span>{{scope.row.jx}}</span>
          </p>
          <p>
            <span>{{scope.row.goodstype}}</span>
            <span>{{scope.row.goodsunit}}</span>
          </p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="factname,prono"
        label="生产企业,批准文号"
      >
        <template slot-scope="scope">
          <p>{{scope.row.factname}}</p>
          <p>{{scope.row.prono}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="lotno,posno"
        label="批号,货柜号"
      >
        <template slot-scope="scope">
          <p>{{scope.row.lotno}}</p>
          <p>{{scope.row.posno}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="proddate,invaliddate"
        label="生产日期,有效期至"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.proddate)}}</p>
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.invaliddate)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="goodsqty"
        label="出柜数量"
      >
        <template slot-scope="scope">
          <p>{{scope.row.goodsqty}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="saprice,total"
        label="单价,金额"
      >
        <template slot-scope="scope">
          <p>{{scope.row.saprice}}</p>
          <p>{{scope.row.total}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="outman"
        label="出柜人"
      >
        <template slot-scope="scope">
          <p>{{scope.row.outman}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="cgfhman"
        label="复核人"
      >
        <template slot-scope="scope">
          <p>{{scope.row.cgfhman}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="finishflag"
        label="配送完成标志"
      >
        <template slot-scope="scope">
          <p>{{scope.row.finishflag}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="id"
        label="总单ID"
      >
        <template slot-scope="scope">
          <p>{{scope.row.id}}</p>
        </template>
      </el-table-column> -->

    </el-table>
    <!--分页-->
    <el-pagination
      small
      background
      :current-page="cgjl_pageNum"
      :page-size="cgjl_pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="cgjl_total"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    > </el-pagination>

    <!--打印-->
    <e-print ref="print" iframe-url="Cgjldy" :dtl-data="cgjl_base"></e-print>
  </div>
</template>


<script lang="js" src="../../../js/counter/cgjl.js"></script>
