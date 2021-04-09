<template>
  <div>
    <e-query
      ref="query"
      :btn-options="rkysjl_btnOptions"
      :form-list="rkysjl_formList"
      :form-data="rkysjl_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>
    <hov-tools
      v-if="rkysjl_goodsVisible"
      :hov-data="rkysjl_goodsHov"
    ></hov-tools>
    <el-table
      :data="rkysjl_tableData"
      :height="rkysjl_tableHeight"
      @selection-change="tableSelectChange"
      border

      :header-cell-style="headerStyle"
    >
      <el-table-column type="selection"></el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="credate,arrivetime"
        label="单据日期,验收日期"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.credate)}}</p>
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.arrivetime)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="goodsid,sudtlid"
        label="货品ID,进货细单ID"
      >
        <template slot-scope="scope">
          <p>{{scope.row.goodsid}}</p>
          <p>{{scope.row.sudtlid}}</p>
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
        prop="supplyname"
        label="供货单位"
      >
        <template slot-scope="scope">
          <p>{{scope.row.supplyname}}</p>
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
        label="到货数量"
      >
        <template slot-scope="scope">
          <p>{{scope.row.goodsqty}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="hgqty"
        label="验收合格数量"
      >
        <template slot-scope="scope">
          <p>{{scope.row.hgqty}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="yanshoujielun"
        label="验收结论"
      >
        <template slot-scope="scope">
          <p>{{scope.row.yanshoujielun}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="shelveman"
        label="验收员"
      >
        <template slot-scope="scope">
          <p>{{scope.row.shelveman}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="arrivetime"
        label="收货时间"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.arrivetime)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="shelvetime"
        label="上柜时间"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.shelvetime)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="id"
        label="总单ID"
      >
        <template slot-scope="scope">
          <p>{{scope.row.id}}</p>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination
      small
      background
      :current-page="rkysjl_pageNum"
      :page-size="rkysjl_pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="rkysjl_total"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    > </el-pagination>

    <!--&lt;!&ndash;打印&ndash;&gt;
    <rkysjldy
      :allid="rkysjl_base.allid"
      v-if="rkysjl_printVisible"
    ></rkysjldy>-->
    <e-print ref="print" iframe-url="Rkysjldy" :dtl-data="rkysjl_base"></e-print>
  </div>
</template>

<script lang="js" src="../../../js/counter/rkysjl.js"></script>
