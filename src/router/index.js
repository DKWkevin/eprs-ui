import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Intro from '@/views/Intro/Intro'
import NotFound from '@/views/404'
import NoAcess from '@/views/403'
import api from '@/http/api'
import store from '@/store'
import Cookies from "js-cookie"

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: '',
          name: '系统介绍',
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/403',
      name: 'NoAcess',
      component: NoAcess
    }
  ]
});
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
/*router.beforeEach(console.log(111))*/
router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  /*console.log(from);
  console.log(to);*/
  let userid = sessionStorage.getItem('userid');
  //console.log(userid)
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(userid) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!userid) {
      if(to.fullPath.indexOf("userid")>0){
      let userid=to.fullPath.split("=")[1];
      api.login.eprslogin(Number(userid)).then((res) => {  // 调用登录接口
        if(res.code===200){
          if(res.msg != null) {
            alert(res.msg);
            return false;
          } else {
            //Cookies.set('token', res.data.token); // 放置token到Cookie
            // 保存用户到本地会话
            sessionStorage.setItem('token', res.data.token); // token
            sessionStorage.setItem('userid', res.data.user.employeeid); // 人员id
            sessionStorage.setItem('username', res.data.user.employeename); // 人员名称
            sessionStorage.setItem('useropcode', res.data.user.employeeopcode); // 人员操作码
            sessionStorage.setItem('deptid', res.data.user.deptid);// 部门id
            sessionStorage.setItem('deptname', res.data.user.deptName);// 部门名称
            sessionStorage.setItem('companyid', res.data.user.companyid); // 公司id
            sessionStorage.setItem('companyname',res.data.user.companyname);//公司名称
            store.commit('menuRouteLoaded', false); // 要求重新加载导航菜单
            addDynamicMenuAndRoutes(userid, to, from);
            next(to.fullPath.split("?")[0]);
          }
        }
      }).catch((res) => {
        console.log(res);
        return false;
      })
    }else{
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' });
    }
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userid, to, from);
      next()
    }
  }
});

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(userid, to, from) {
  if(store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.');
    return false;
  }
  api.menu.findNavTree({'userid':userid})
  .then(res => {
    // 添加动态路由
    let dynamicRoutes = addDynamicRoutes(res.data);
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes);
    router.addRoutes(router.options.routes);
    // 保存加载状态
    store.commit('menuRouteLoaded', true);
    // 保存菜单树
    //console.log('sssssssssssss:'+res.data);
    //console.log(typeof res.data)
    //console.log(store.state.navTree)
    store.commit('setNavTree', res.data)
  }).then(res => {
    api.user.findPermissions({'userid':userid}).then(res => {
      // 保存用户权限标识集合
      store.commit('setPerms', res.data)
    })
  })
  .catch(function(res) {
  })
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
 var temp = [];
 for (var i = 0; i < menuList.length; i++) {
   if (menuList[i].children && menuList[i].children.length >= 1) {
     temp = temp.concat(menuList[i].children)
   } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '');
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].menuname,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].menuid,
          keepAlive: true
        }
      };
      //console.log(route)
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
        let array = menuList[i].url.split('/');
        let url = '';
        for(let i=0; i<array.length; i++) {
          url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
        }
        url = url.substring(0, url.length - 1);
        route['component'] = resolve => require([`@/views/${url}`], resolve);
      } catch (e) {}
      routes.push(route);
   }
 }
 if (temp.length >= 1) {
   addDynamicRoutes(temp, routes)
 } else {
   /*console.log('动态路由加载...')
   console.log(routes)
   console.log('动态路由加载完成.')*/
 }
 return routes
}

export default router
