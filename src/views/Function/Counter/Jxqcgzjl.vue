<template>
  <div>
    <e-query
      ref="query"
      :btn-options="jxqcgzjl_btnOptions"
      :form-list="jxqcgzjl_formList"
      :form-data="jxqcgzjl_formData"
      @openHov="openHov"
      @query="queryFunction"
    ></e-query>

    <hov-tools
      v-if="jxqcgzjl_goodsVisible"
      :hov-data="jxqcgzjl_goodsHov"
    ></hov-tools>

    <el-table
      :data="jxqcgzjl_tableData"
      :height="jxqcgzjl_tableHeight"
      @selection-change="tableSelectChange"
      border
      :header-cell-style="headerStyle"
    >
      <el-table-column type="selection"></el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="rsdocid,sacredate"
        label="销售单ID,销售日期"
      >
        <template slot-scope="scope">
          <p>{{scope.row.rsdocid}}</p>
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.sacredate)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="goodsid,salesdtlid"
        label="货品ID,细单ID"
      >
        <template slot-scope="scope">
          <p>{{scope.row.goodsid}}</p>
          <p>{{scope.row.salesdtlid}}</p>
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
        prop="lotno,goodsqty"
        label="批号,数量"
      >
        <template slot-scope="scope">
          <p>{{scope.row.lotno}}</p>
          <p>{{scope.row.goodsqty}}</p>
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
        prop="starttime,arrivetime"
        label="起运时间,收货时间"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.starttime)}}</p>
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.arrivetime)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="starttemp,arrivetemp"
        label="起运温度,收货温度"
      >
        <template slot-scope="scope">
          <p>{{scope.row.starttemp}}</p>
          <p>{{scope.row.arrivetemp}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="shelvetime,shelveman"
        label="上柜时间,上柜人"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.shelvetime)}}</p>
          <p>{{scope.row.shelveman}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="outtime.outman,cgfhman"
        label="出柜时间,出柜人/复核人"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.outtime)}}</p>
          <p>{{scope.row.outman}} / {{scope.row.cgfhman}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="outposno,smonitorno"
        label="出柜货位编号,送货设备编码"
      >
        <template slot-scope="scope">
          <p>{{scope.row.outposno}}</p>
          <p>{{scope.row.arrivetemp}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="sendtime,delivertime"
        label="送货时间,交付时间"
      >
        <template slot-scope="scope">
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.sendtime)}}</p>
          <p>{{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row.delivertime)}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="sendtemp,delivertemp"
        label="送货温度,交付温度"
      >
        <template slot-scope="scope">
          <p>{{scope.row.sendtemp}}</p>
          <p>{{scope.row.delivertemp}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="sendman,distance"
        label="送货人,送货距离（KM）"
      >
        <template slot-scope="scope">
          <p>{{scope.row.sendman}}</p>
          <p>{{scope.row.distance}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        :render-header="renderHeader"
        prop="arriverecid,sendrecid"
        label="收货温度记录,送货温度记录"
      >
        <template slot-scope="scope">
          <p><a
              href='javascript:void(0);'
              @click="selectDtl(scope.row.id , scope.row.arriverecid)"
            >{{scope.row.arriverecid}}</a></p>
          <p><a
              href='javascript:void(0);'
              @click="selectDtl(scope.row.id ,  scope.row.sendrecid)"
            >{{scope.row.sendrecid}}</a> </p>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination
      small
      background
      :current-page="jxqcgzjl_pageNum"
      :page-size="jxqcgzjl_pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="jxqcgzjl_total"
      layout="prev,pager,next,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>

    <div>
      <el-dialog
        v-if="jxqcgzjl_dialogVisible"
        :visible.sync="jxqcgzjl_dialogVisible"
        :title="'查询细单'"
        :width="'700'"
        :destroy-on-close="true"
        @close="closeDialog"
        :close-on-click-modal="false"
      >
        <e-table
          ref="doctable"
          :loading="false"
          :table-columns="jxqcgzjl_tableColumns_2"
          :table-data="jxqcgzjl_tableData_2"
          :table-height="'350'"
          :page-status="false"
          :table-width-status="false"
        ></e-table>
      </el-dialog>
    </div>

    <!--&lt;!&ndash;打印&ndash;&gt;
    <jxqcgzjldy
      :allid="jxqcgzjl_base.allid"
      v-if="jxqcgzjl_printVisible"
    ></jxqcgzjldy>-->
    <e-print ref="print" iframe-url="Jxqcgzjldy" :dtl-data="jxqcgzjl_base"></e-print>
  </div>
</template>

<script lang="js" src="../../../js/counter/jxqcgzjl.js"></script>
