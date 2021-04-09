<template>
<div>
  <kt-button :type="type" @click="gxbhmlUpdate" :perms="perms" :label="label"></kt-button>
</div>
</template>

<script>
//更新补货记录
import KtButton from "@/views/Core/KtButton";
export default {
  name: 'Gxbhml',
  components:{KtButton},
  data(){
    return{
      perms:'replenishment:gxbhml:add',
      label:'更新补货记录',
      type:'primary'
    }
  },
  methods:{
    gxbhmlUpdate(){
      this.$api.replenish.updateGbhml({companyid:Number(sessionStorage['companyid'])}).then(res => {
        if(res.code === 200){
          alert("更新成功");
        }
      }).catch(error => {
        return false;
      })
    }
  }
}
</script>
