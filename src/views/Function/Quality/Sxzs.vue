<template>
<div>
  <e-querys>
    <template v-slot:button>
      <el-button type="primary" @click="queryFunction">刷新证书</el-button>
    </template>
  </e-querys>
</div>
</template>

<script>
  export default {
    name: "Sxzs",
    methods:{
      queryFunction(){
        if (confirm('您真的确定要进行刷新吗?') === true) {
          this.$api.quality.selectSxzs().then(res => {
            if (res.code === 200) {
              if(res.data > 0){
                alert('刷新成功！！');
              }else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(() => {
            return false;
          })
        } else {
          return false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
