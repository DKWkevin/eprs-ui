export default {
    state: {
        navTree: [],  // 导航菜单树
    },
    getters: {
   
    },
    mutations: {
        setNavTree(state, navTree){  // 设置导航菜单树
            //console.log('navTree'+navTree)
            state.navTree = navTree;
        }
    },
    actions: {
        
    }
}