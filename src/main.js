// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import api from './http'
import i18n from './i18n'
import global from '@/utils/global'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/dialog.css'
import discInfo from '@/utils/DiscInfo'
import './utils/directives'
import './components/public/index'
import globalIndex from './globalIndex'

Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'mini'});
Vue.use(api); // 注册使用API模块
Vue.use(discInfo);
Vue.use(globalIndex);

Vue.prototype.global = global;// 挂载全局配置模块

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
