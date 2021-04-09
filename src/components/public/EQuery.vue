<template>
<div class="toolbar">
  <div class="querybtndiv">
    <div class="querybtn">
      <slot name="button"></slot>
    </div>
  </div>
  <div class="discollapseDiv">
    <slot name="query"></slot>
  </div>
</div>
</template>

<script>
  export default {
    name: "EQuery"
  }
</script>

<style scoped>
  .toolbar{float:left;position:relative;width:100%;height:75px;}
  .toolbar .discollapseDiv{width:100%;max-height:30px;position:absolute;top:35px;left:0;overflow: hidden;background:white;}
  .toolbar .querybtndiv{width:100%;position: absolute;top:0;left:0;padding-left:15px;}
  .toolbar .collapseBtn{width:40px;position:absolute;top:0;right:0;}
  .discollapseDiv .el-form{float:left;}
  .querybtndiv .querybtn{float:left;}
</style>
