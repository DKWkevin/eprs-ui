import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

// 引入子模块
import app from './modules/app'
import tab from './modules/tab'
import user from './modules/user'
import menu from './modules/menu'
import sock from './modules/sock'
import socket from './modules/socket'

const store = new vuex.Store({
    modules: {
        app: app,
        tab: tab,
        user: user,
        menu: menu,
        sock: sock,
      socket:socket
    }
});

export default store
