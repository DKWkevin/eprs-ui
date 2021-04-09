<template>
  <el-table-column
    :key="prop"
    :prop="prop"
    :label="label"
    :fixed="fixed"
    :sortable="sortable"
    :width="width"
    :sort-method="sortMethod"
    :formatter="formatter"
    :filters="filters"
    :filter-method="filterMethod"
    :show-overflow-tooltip="true"
  >
  </el-table-column>
</template>

<script>
  export default {
    name: "ETablesColumns",
    props:{
      prop:{type:String,default:''},
      label:{type:String,default:''},
      fixed:{type:Boolean || String,default:false},
      sortable:{type:Boolean,default:false},
      width:{type:String,default:'auto'},
      sortMethod:{type:Function},
      formatter:{type:Function},
      filters:{type:Array},
      filterMethod:{type:Function},
    }
  }
</script>

<style scoped>

</style>
