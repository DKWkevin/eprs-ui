<template>
  <div class="container">
      <!-- 导航菜单栏 -->
      <nav-bar></nav-bar>
      <!-- 头部区域 -->
      <head-bar></head-bar>
      <!-- 主内容区域 -->
      <main-content></main-content>
  </div>
</template>

<script>
import HeadBar from "./HeadBar"
import NavBar from "./NavBar"
import MainContent from "./MainContent"
export default {
  components:{
        HeadBar,
        NavBar,
        MainContent
  },
  mounted() {
    if(document.querySelector(".v-modal")!==null){
      document.querySelector(".v-modal").parentNode.remove(document.querySelector(".v-modal"));
    }
  }
};
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: rgba(224, 234, 235, 0.1);
  }
</style>  
