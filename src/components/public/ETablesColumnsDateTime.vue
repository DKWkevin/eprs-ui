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
    <template slot-scope="scope">
      {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row[prop])}}
    </template>
  </el-table-column>
</template>

<script>
  export default {
    name: "ETablesColumnsDateTime",
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
    },
    methods:{
      dateFormat(fmt, data) {
        if(data==null||data===''){
          fmt=''
        }else{
          let ret;
          var date=new Date(data);
          const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
          };
          for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
              fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
          }
        }
        return fmt;
      }
    }
  }
</script>

<style scoped>

</style>
