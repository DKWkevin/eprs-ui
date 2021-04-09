<template>
<div>
  <tree-item></tree-item>
</div>
</template>

<script>
import TreeItem from "./treeItem";
export default {
  name: 'treeMenu',
  components:{TreeItem},
  props:{
    treeData:{
      type:Array,default()
      {
        return []
      }
    }
  },
  data () {
    return {
      treeItemData:[]
    }
  },
  mounted() {
    this.reloadTreeData(this.treeData, this.treeItemData);
    console.log(this.treeItemData);
  },
  methods:{
    reloadTreeData(treeData1, treeData2){
      treeData1.forEach(item => {
        let params = {
          show:false,
          check:false,
          indeterminate:false,
        };
        Object.keys(item).forEach(key => {
          params[key] = item[key];
        });
        this.reloadTreeData(item.children, params.children);
        treeData2.push(params);
      })
    }
  }
}
</script>

<style scoped>

</style>
