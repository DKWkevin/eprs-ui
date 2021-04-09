<template>
<el-form-item :prop="prop" :label="label" :rules="rules">
  <el-input v-if="type === 'number'" :style="{width:inputWidth}" :value="value" :disabled="disabled" clearable @input="input"></el-input>
  <el-input v-else :value="value" :style="{width:inputWidth}" @input="input" :disabled="disabled" clearable></el-input>
</el-form-item>
</template>

<script>
  export default {
    name: "ElFormItemInput",
    props:{
      label:{type:String,default:''},
      type:{type:String,default: ''},
      value:{type:null,default:null},
      prop:{type:String,default:''},
      inputWidth:{type:String,default:'100%'},
      disabled:{type:Boolean,default:false},
      rules:{type:Object,default:() => {
        return {};
      }}
    },
    methods:{
      input(){
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style scoped>
  .el-form-item{float: left;}
</style>
