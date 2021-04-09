<template>
<el-form-item :prop="prop" :label="label" :rules="rules" :disabled="disabled" :style="{width:hovFormWidth}">
  <el-select v-if="type === 'number'"  :value="value" :disabled="disabled" :style="{width:hovWidth}"  clearable @input="$emit('input', $event)">
    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
  </el-select>
  <el-select v-else :value="value" :disabled="disabled" clearable @input="input" :style="{width:hovWidth}" >
    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
  </el-select>
</el-form-item>
</template>

<script>
  export default {
    name: "ElFormItemSelect",
    props:{
      label:{type:String,default:''},
      value: {
        type: null
      },
      prop:{type:String,default:''},
      id:{type:String,default:''},
      disabled:{type:Boolean,default:false},
      options:{type:Array},
      hovFormWidth:{type:String,default:'auto'},
      hovWidth:{type:String,default:''},
      type:{type:String,default:'number'},
      rules:{type:Object,default:() => {
        return {type:'number'};
      }}
    },
    methods: {
      input(){
        let value = '';
        if(event.target.value !== null){
          value = event.target.value.toString();
        }
        this.$emit('input', value);
      }
    }
  }
</script>

<style scoped>
  .el-form-item{float: left;}
</style>
