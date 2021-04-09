<template>
  <el-form
    :model="model"
    :label-width="labelWidth"
    :ref = 'refName'
    :label-position="labelPosition"
    :rules="rules"
  >
    <el-row>
      <slot></slot>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: "ElFormRow",
    props: {
      model:{type:Object,default: () => {
        return {};
        }},
      labelWidth: {type:String, default: '0'},
      refName: {type:String, default: ''},
      labelPosition: {type:String, default: 'right'},
      rules:{type:Object,default:() => {
        return {}
        }}
    }
  }
</script>

<style scoped>

</style>
