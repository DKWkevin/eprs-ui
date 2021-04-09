<template>
  <div v-if="status" class="fixedBox">
    <div
      class="dialogDiv"
    >
      <div class="dialogHeaders">
        <span class="dialogHeadersTitle">
          {{dialogTitle}}
        </span>
        <button class="dialogHeadersClose" @click="dialogClose"><i class="fa fa-window-close"></i></button>
      </div>
      <div class="dialogBody">
        <iframe :src="baseUrl+iframeUrl+'?'+JSON.stringify(dtlData)" style="width:100%;height:100%;background:white;border:none;"></iframe>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EPrint",
    props:{
      iframeUrl: {type:String,default:''},
      dtlData:{type:Object},
      dialogTitle:{type:String, default: ''}
    },
    data () {
      return {
        //baseUrl:'http://10.0.0.46:10008/#/',
        baseUrl:'http://ecdfyb2b.ecdfy.com:8080/eprs-print/#/',
        status:false,
      }
    },
    methods:{
      dialogClose () {
        this.status = false;
      }
    }
  }
</script>

<style scoped>
  .fixedBox{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    z-index:9999;
    background:white;
    border:none;
    overflow: hidden;
  }
  .dialogDiv{
    width: 100%;
    height:100%;
    background:white;
    position: relative;
  }
  .dialogHeaders{
    width:100%;
    height: 40px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .dialogHeadersTitle{
    line-height:40px;
    font-size:18px;
    text-align:center;
    color: #303133;
    margin-left:20px;
  }
  .dialogHeadersClose{
    float:right;
    margin:10px 20px 0 0;
    background: transparent;
    border:none;
    font-size:16px;
    color: #9c9c9c;
    cursor: pointer;
  }
  .dialogHeadersClose:hover{
    color: #3ac4ff;
  }
  .dialogBody{
    width:100%;
    height: calc(100% - 30px);
    overflow: hidden;
  }
</style>
