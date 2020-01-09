import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
// import VueAxios from 'vue-axios';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
// import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
// import './components/common/directives';
import "babel-polyfill";
import md5 from 'js-md5';
import Print from '@/utils/print.js'
import './utils/request';

Vue.prototype.$ajax = axios;
Vue.config.productionTip = false

Vue.prototype.$md5 = md5;

// Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(axios)
Vue.use(Print);
// Vue.use(VueAxios);
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;
// Vue.prototype.$http = axios;

/* const i18n = new VueI18n({
    locale: 'zh',
    messages
}) */




//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    /* const role = localStorage.getItem('role');
    console.log(localStorage.getItem('role'))
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        next();
        this.$message('执行了')
    } */
    const role = localStorage.getItem('role');
    if (!role && to.path !== '/login') {
        next('/login');
        console.log(111)
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        console.log(222)
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('跳转到这里说明错误', {
                confirmButtonText: '确定'
            });
        } else {
            next();
            console.log(333)
        }
    }
    if(to.path == "/login"){
        if(sessionStorage.getItem('TokenID')){
          next({
            path:'/'
          });
        }else {
          next();
        }
      }
})


new Vue({
    router,
    // i18n,
    render: h => h(App)
}).$mount('#app')