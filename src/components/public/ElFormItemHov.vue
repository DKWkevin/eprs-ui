<template>
<el-form-item :prop="prop" :label="label" :rules="rules" :style="{width:hovFormWidth}">
  <el-input v-if="type === 'number'" :value="value" :disabled="disabled" :style="{width:hovWidth}" clearable @input="input"></el-input>
  <el-input v-else :value="value" :style="{width:hovWidth}" @input="input" clearable :disabled="disabled"></el-input>
  <el-button icon="el-icon-search" :disabled="btnDisabled" circle @click="openHov(id)"></el-button>
</el-form-item>
</template>

<script>
  export default {
    name: "ElFormItemHov",
    props:{
      label:{type:String,default:''},
      type:{type:String,default: ''},
      value:{type:null},
      prop:{type:String,default:''},
      id:{type:String,default:''},
      hovFormWidth:{type:String,default:'auto'},
      hovWidth:{type:String,default:'70%'},
      disabled:{type:Boolean,default:false},
      btnDisabled:{type:Boolean,default:false},
      rules:{type:Object,default:() => {
        return {};
      }}
    },
    methods: {
      openHov (id) {
        this.$emit('openHov', id);
      },
      input(){
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style scoped>
  .el-form-item{float: left;}
</style>
