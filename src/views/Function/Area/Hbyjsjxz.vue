<template>
<div
  v-loading="loading"
  element-loading-text="正在下载中,请耐心等待"
  element-loading-background="rgba(0, 0, 0, 0.8)"
  style="height:100%;"
>
  <div style="width:500px;margin:0 auto;">
    <el-form :model="base" label-width="40px;" label-position="right">
      <el-form-item label="日期" style="text-align:left;">
        <el-date-picker type="datetime" v-model="base.querydate"></el-date-picker>
      </el-form-item>
      <el-form-item style="text-align:left;margin-left:40px;">
        <el-radio label="1" v-model="base.stcompanyid">门店</el-radio>
        <el-radio label="4" v-model="base.stcompanyid">地区</el-radio>
      </el-form-item>
      <el-form-item style="text-align:left;margin-left:40px;">
        <el-radio label="0" v-model="base.type">进货</el-radio>
        <el-radio label="1" v-model="base.type">销售</el-radio>
        <el-radio label="2" v-model="base.type">库存</el-radio>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <el-form>
      <el-form-item>
        <kt-button size="small" :icon="icon" :label="$t(label)" :perms="perms" type="primary" @click="xmlToStrings()"></kt-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script lang="js" src="../../../js/area/hbyjsjxz.js"></script>
