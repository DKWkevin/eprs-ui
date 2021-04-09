<template>
<div class="spjxxx">
  <div class="topDiv">
    <el-form class="topForm">
      <el-form-item label="货品ID" class="fl wh26">
        <el-input v-model="formData.goodsid" disabled="disabled" style="width:160px;float:left;"></el-input>
        <el-button circle icon="el-icon-search" style="float:left;margin-left:5px;" @click="openHov()"></el-button>
      </el-form-item>
      <el-form-item label="货品名称" class="fl wh26">
        <el-input v-model="formData.goodsname" disabled="disabled" style="width:180px;"></el-input>
      </el-form-item>
      <el-form-item label="货品规格" class="fl wh26">
        <el-input v-model="formData.goodstype" disabled="disabled" style="width:180px;"></el-input>
      </el-form-item>
      <el-form-item label="货品单位" class="fl wh26">
        <el-input v-model="formData.goodsunit" disabled="disabled" style="width:180px;"></el-input>
      </el-form-item>
      <el-form-item label="货品产地" class="fl wh26">
        <el-input v-model="formData.prodarea" disabled="disabled" style="width:180px;"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div class="content">
    <div class="leftNav">
      <el-menu>
        <el-menu-item v-for="(term,index) in list" :key="index" :index="term.groupid" @click="navOpen(term.groupid)">{{term.groupname}}</el-menu-item>
      </el-menu>
    </div>
    <div class="rightDiv">
      <div class="buttonArea">
        <el-button type="primary" @click="addTo('gotpage')" ref="gotopage" :disabled="gotopage" style="float:left;margin:10px 0 0 10px;">查询</el-button>
        <el-button type="primary" @click="addTo('addDoc')" ref="addDoc" :disabled="addDoc" style="float:left;margin:10px 0 0 10px;">新增</el-button>
        <el-button type="primary" @click="addTo('dervice')" ref="dervice" :disabled="dervice" style="float:left;margin:10px 0 0 10px;">导出</el-button>
      </div>
        <e-table
          ref="doctable"
          v-if="formStatus===true"
          :table-columns="tableColumns"
          :table-data="tableData"
          :table-height="tableHeight"
          :table-width-status="false"
          @handle="handle"
        ></e-table>
        <el-form v-else-if="formStatus===false">
          <el-form-item label="最大请货数量">
            <el-input v-model="goodsqty" clearable></el-input>
          </el-form-item>
          <el-form-item>
             	<el-button disabled v-if="status===1">已禁销</el-button>
             	<el-button  type="primary" v-if="status===0"  @click="addDoc">保存</el-button>
             	<el-button  type="primary" v-if="(type===3&&status===1)||type===4||type===5" @click="deleteDoc">删除</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
  <spjxxx-dialog ref="docForm" v-if="dtlVisible" :type="formType" :goodsid="dtlGoods"></spjxxx-dialog>
  <spjxxx-query ref="query" v-if="query" @query="queryDoc" :form-type="formType"></spjxxx-query>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>
<!--商品禁销限销-->
<script lang="js" src="../../../js/bussiness/spjxxx.js"></script>

<style scoped>
.spjxxx{width:100%;height:100%;border:2px solid #ccc;border-radius:6px;}
.spjxxx >>> .fl{float:left;}
.spjxxx >>> .wh26{width:260px;}
.topDiv{border-bottom: 1px solid #ccc;width:100%;min-height:80px;}
.topForm{margin-top:5px;margin-left:5px;}
.spjxxx >>> .content{width:100%;height:calc(100% - 85px);position: relative;}
.leftNav{width:260px;height:100%;border-right:1px solid #ccc;position: absolute;top:0;left:0}
.rightDiv{width:calc(100% - 260px);height:100%;position: absolute;top:0;left:260px;}
.buttonArea{width:100%;height:50px;background: #f5f4f4;float: left;border-bottom: 1px solid #dddddd;overflow: auto;}
</style>
