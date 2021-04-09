<template>
<li class="subTreeLi">
  <a href="javascript:void(0)" :value="treeItemData.value" :check="treeItemData.check" @click="loadNode($event,treeItemData)">
    <i v-if="treeItemData.display === false" class="el-icon-caret-right"></i>
    <i v-else-if="treeItemData.display === true" class="el-icon-caret-bottom"></i>
  </a>
  <i v-show="treeItemData.display" class=""></i>
  <input :ref="level+'_'+treeItemData.value" type="checkbox" :value="treeItemData.value" :indeterminate="treeItemData.indeterminate" :checked="treeItemData.check" @click="checkNode($event,treeItemData)">
  <span>{{treeItemData.label}}</span>
  <ul v-show="treeItemData.display">
    <tree-item v-for="(item,index) in treeItemData.children" :key="index" :treeItemData="item" :defautData="defautData"  :level="level+1"></tree-item>
  </ul>
</li>
</template>

<script>
export default {
  name: 'treeItem',
  props:{
    treeItemData:{type:Object,default(){return{}}},
    defautData:{type:Array,default(){return []}},
    level:{type:Number}
  },
  methods:{
    loadNode(e,item){
      if(item.display === false){
        if(item.hasOwnProperty('children')===true&&item.children.length===0){
          if(item.selectName !==""&&item.selectName!==null){
            this.$selectLoad[item.selectName](item);
          }
        }
        item.display = true;
      }else{
        item.display = false;
      }
    },
    checkNode(e,item){
      let check = e.currentTarget.checked;
      if(check === true){
        item.check = true;
        item.indeterminate = false;
      }else{
        item.check = false;
        item.indeterminate = false;
      }
      let self = this.level+'_'+item.value;
      //console.log(self);
      //console.log(this.$refs[self].$parent);
      this.$selectLoad.checkChild(item.children,item.check);
      this.$selectLoad.checkParent(this)
    },
  }
}
</script>

<style scoped>
li{list-style: none;width:100%;}
ul{padding:2px 0 0 5px;margin:0;}
.subTreeLi{
  float:left;
  text-align: left;
  padding-left:5px;
}
</style>
