<template>
<ul class="subTreeUl">
  <tree-item v-for="(item,index) in treeData" :key="index" :treeItemData="item" :defautData="defautData" :level="level+1"></tree-item>
</ul>
</template>

<script>
import TreeItem from "./treeItem";
export default {
  name: 'treeParent',
  props:{
    treeData:{type:Array,default(){return []}},
    defautData:{type:Array,default(){return []}},
    level:{type:Number}
  },
  components:{TreeItem}
}
</script>

<style scoped>
.subTreeUl{
    width:100%;
    height:100%;
    margin:0;
    padding:0;
    overflow-y:auto;
    overflow-x:hidden;
  }
</style>
