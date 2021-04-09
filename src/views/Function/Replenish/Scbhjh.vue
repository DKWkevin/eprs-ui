<template>
<div>
  <kt-button :type="type" @click="scbhjhUpdate" :perms="perms" :label="label"></kt-button>
</div>
</template>

<script>
import KtButton from "@/views/Core/KtButton";
export default {
  name: 'Scbhjh',
  components:{KtButton},
  data(){
    return{
      perms:'replenishment:scbhjh:add',
      label:'生成补货计划',
      type:'primary'
    }
  },
  methods:{
    scbhjhUpdate(){
      this.$api.replenish.updateScbhjh({companyid:Number(sessionStorage['companyid'])}).then(res => {
        if(res.code === 200){
          alert("生成成功");
        }
      }).catch(error => {
        return false;
      })
    }
  }
}
</script>
