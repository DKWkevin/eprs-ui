<template>
  <div :class="disabled===true?'file-uploads':'file-upload'">
    <div class="file-upload-text">导入</div>
    <input v-if="disabled===true" class="file-upload-input"></input>
    <input v-else type="file" accept=".xlsx,.xls" @change="implUserExcel($event)" class="file-upload-input"></input>
  </div>
</template>

<script>
export default {
  name: 'uploadButton',
  props:{
    disabled:{type:Boolean,default:false}
  },
  methods:{
    implUserExcel(e){
      this.$emit('upload',e);
    }
  }
}
</script>

<style scoped>
  .file-upload {
    width: 60px;
    height: 26px;
    position: relative;
    overflow: hidden;
    border: 1px solid #1E88C7 ;
    display: inline-block;
    border-radius: 4px;
    font-size: 12px;
    color: #1E88C7;
    text-align: center;
    line-height: 26px;
    float: left;
    margin: 0 5px 10px 5px;
    background:#1E88C7;
  }
  .file-uploads {
    width: 60px;
    height: 26px;
    position: relative;
    overflow: hidden;
    border: 1px solid #8cc5f3 ;
    display: inline-block;
    border-radius: 4px;
    font-size: 12px;
    color: #8cc5f3;
    text-align: center;
    line-height: 26px;
    float: left;
    margin: 0 5px 10px 5px;
    background:#8cc5f3;
  }
  .file-upload-text{
    color:white;
  }
  .file-upload-input {
    background-color: transparent;
    position: absolute;
    width: 999px;
    height: 999px;
    top: -10px;
    right: -10px;
    cursor: pointer;
  }
</style>
