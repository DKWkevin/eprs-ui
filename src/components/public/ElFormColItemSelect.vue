<template>
  <el-col :span="span">
  <el-form-item :prop="prop" :label="label" :rules="rules" :disabled="disabled">
    <el-select
      v-model="svalue"
      @change="sChange"
      :disabled="disabled"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
  </el-col>
</template>

<script>
  export default {
    name: "ElFormColItemSelect",
    props:{
      label:{type:String,default:''},
      value: {
        type: null
      },
      prop:{type:String,default:''},
      id:{type:String,default:''},
      disabled:{type:Boolean,default:false},
      span:{type:Number,default:0},
      options:{type:Array},
      rules:{type:Object,default:() => {
        return {type:'number'};
      }}
    },
    data(){
      return{
        svalue: this.value
      }
    },
    watch: {
      value(newVal) {
        this.svalue = newVal;
      },
      svalue(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit("input", this.svalue);
        }
      }
    },
    methods: {
      input(){
        this.$emit('input');
      },
      sChange() {
        this.$emit("sChange");
      }
    }
  }
</script>

<style scoped>
  .el-form-item{float: left;}
</style>
