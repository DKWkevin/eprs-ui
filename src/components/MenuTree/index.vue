<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.menuid">
    <template slot="title">
      <i :class="menu.icon" ></i>
      <span slot="title">{{menu.menuname}}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.menuid" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.menuid" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{menu.menuname}}</span>
  </el-menu-item>
</template>

<script>
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {
      // 通过菜单URL跳转至指定路由
      if(menu.url===null){
        return false;
      }
      this.$router.push("/" + menu.url)
    }
  }
}
</script>

<style scoped>
.el-submenu >>> .el-submenu__title{height:30px;line-height:30px;padding-left:1px !important;}
.el-submenu >>> .el-menu-item{height:30px;line-height:30px;border-bottom:1px solid #ccc;font-weight: normal;padding-left:10px !important;}
</style>
