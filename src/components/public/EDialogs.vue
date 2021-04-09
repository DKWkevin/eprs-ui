<template>
  <div v-if="status" class="fixedBox">
    <div
      class="dialogDiv"
      :style="{
      width: dialogWidth+'px',
      height: dialogHeight+'px',
      top: (dialogTop !== -1?'calc((100% - '+dialogTop+'px)/2)':'calc((100% - '+dialogHeight+'px)/2)'),
      left: (dialogLeft !== -1?'calc((100% - '+dialogLeft+'px)/2)':'calc((100% - '+dialogWidth+'px)/2)')
    }"
    >
      <div class="dialogHeaders">
        <span class="dialogHeadersTitle">
          {{dialogTitle}}
        </span>
        <button class="dialogHeadersClose" @click="dialogClose"><i class="fa fa-window-close"></i></button>
      </div>
      <div class="dialogBody">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EDialogs",
    props: {
      status: {type: Boolean, default: false},
      dialogWidth: {type: Number, default: 700},
      dialogHeight: {type: Number, default: 500},
      dialogTop:{type:Number,default:-1},
      dialogLeft:{type:Number,default:-1},
      dialogTitle:{type:String,default:''}
    },
    methods:{
      dialogClose () {
        this.$emit('dialogClose');
      }
    }
  }
</script>

<style scoped>
  .fixedBox{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.2);
    z-index: 10;
  }
  .dialogDiv{
    background:white;
    position: relative;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.6);
  }
  .dialogHeaders{
    width:100%;
    height: 40px;
    /*border-bottom: 1px solid #ccc;*/
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    /*background: linear-gradient(#fcfcfc, #f3f1f1);*/
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
    width:calc(100% - 20px);
    height: calc(100% - 50px);
    overflow: auto;
    padding: 2px 10px;
  }
</style>
