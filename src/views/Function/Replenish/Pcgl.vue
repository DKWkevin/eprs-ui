<template>
<div>
  <el-input v-model.number="batchid" placeholder="批次ID"></el-input>
  <kt-button :type="type" @click="pcglDel" :perms="perms" :label="zflabel"></kt-button>
  <kt-button :type="type" @click="pcglUpdate" :perms="perms" :label="scddlabel"></kt-button>
</div>
</template>

<script>
import KtButton from "@/views/Core/KtButton";
export default {
  name: 'Pcgl',
  components:{KtButton},
  data () {
    return {
      batchid:null,
      type:'primary',
      perms:'perms',
      zflabel:'作废',
      scddlabel:'生成合同',
    }
  },
  methods:{
    pcglDel(){
      if(this.batchid!==null&&this.batchid!==""){
        this.$api.replenish.deletePcgl({batchid:this.batchid}).then(res => {
          if(res.code === 200){
            if(res.data===1){
              alert("作废成功");
            }else{
              alert(res.msg);
              return false;
            }

          }
        }).catch(error => {
          return false;
        })
      }else{
        alert("必须录入批次id否则无法作废");
        return false;
      }
    },
    pcglUpdate(){
      if(this.batchid!==null&&this.batchid!=="") {
        this.$api.replenish.updatePcgl({batchid:this.batchid}).then(res => {
          if (res.code === 200) {
            alert("生成合同成功");
          }
        }).catch(error => {
          return false;
        })
      }else{
        alert("必须录入批次id否则无法生成合同");
        return false;
      }
    }
  }
}
</script>
