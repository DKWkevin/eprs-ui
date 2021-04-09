export default {
    state: {
      // 主入口标签页
      mainTabs: [],
      // 当前标签页名
      mainTabsActiveName: ''
      //keepAliveList:[]
    },
    mutations: {
      updateMainTabs (state, tabs) {
        state.mainTabs = tabs
      },
      updateMainTabsActiveName (state, name) {
        state.mainTabsActiveName = name
      }
      /*setkeepAliveList(state,name){
        state.keepAliveList = name;
      }*/
    }
  }
