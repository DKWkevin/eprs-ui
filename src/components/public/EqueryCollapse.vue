<template>
  <div class="toolbar">
    <div class="querybtndiv">
      <div class="querybtn">
      <slot name="button"></slot>
      </div>
    </div>
    <div :class="[collapse===true?'collapseDiv':'discollapseDiv']">
      <div class="queryForm">
        <slot name="query"></slot>
      </div>
      <div class="collapseBtn">
        <a href="javascript:void(0)" :class="[collapse===true?'el-icon-arrow-up':'el-icon-arrow-down']" @click="collapseBtn"></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EqueryCollapse",
    data (){
      return{
        collapse:false
      }
    },
    methods:{
      collapseBtn(){
        this.collapse = this.collapse === false;
      }
    }
  }
</script>

<style scoped>
  .toolbar{float:left;position:relative;width:100%;height:75px;}
  .toolbar .discollapseDiv{width:100%;max-height:30px;position:absolute;top:32px;left:0;overflow: hidden;background:white;}
  .toolbar .collapseDiv{width:100%;height:auto;position:absolute;overflow:visible;top:32px;left:0;z-index: 10;background:white;}
  .toolbar .querybtndiv{width:100%;position: absolute;top:0;left:0;padding-left:15px;}
  .toolbar .collapseBtn{width:40px;position:absolute;top:0;right:0;}
  .discollapseDiv .el-form,.collapseDiv .el-form{float:left;}
  .discollapseDiv .el-form-item,.collapseDiv .el-form-item{float: left !important;}
  .querybtndiv .querybtn{float:left;}
  .queryForm{width:calc(100% - 40px);}
</style>
