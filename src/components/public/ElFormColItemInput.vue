<template>
  <el-col :span="span">
<el-form-item :prop="prop" :label="label" :style="{width:colWidth}">
  <el-input v-if="type === 'number'" :style="{width:inputWidth}" :value="value" :disabled="disabled"  clearable @input="input"></el-input>
  <el-input v-else  :value="value" :style="{width:inputWidth}" @input="input" :disabled="disabled" clearable></el-input>
</el-form-item>
  </el-col>
</template>

<script>
  export default {
    name: "ElFormColItemInput",
    props:{
      label:{type:String,default:''},
      type:{type:String,default: ''},
      value:{type:null,default:null},
      prop:{type:String,default:''},
      disabled:{type:Boolean,default:false},
      colWidth:{type:String,default:'auto'},
      inputWidth:{type:String,default:'100%'},
      span:{type:Number,default:0},
    /*  rules:{type:Object,default:() => {
        return {};
      }}*/
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
