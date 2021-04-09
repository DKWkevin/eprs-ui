<template>
<el-col :span="span">
  <el-form-item :prop="prop" :label="label">
    <el-input v-if="type === 'number'" :value="value" :disabled="disabled" :style="{width:hovWidth}" @input="input" clearable></el-input>
    <el-input v-else :value="value" :style="{width:hovWidth}" @input="input" clearable :disabled="disabled"></el-input>
    <el-button icon="el-icon-search" circle size="mini" @click="openHov(id)"></el-button>
  </el-form-item>
</el-col>
</template>

<script>
  export default {
    name: "ElFormColItemHov",
    props:{
      label:{type:String,default:''},
      type:{type:String,default: ''},
      value:{type:null},
      prop:{type:String,default:''},
      id:{type:String,default:''},
      hovWidth:{type:String,default:'80%'},
      disabled:{type:Boolean,default:false},
      span:{type:Number,default:0},
      /*rules:{type:Object,default:() => {
        return {};
      }}*/
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
