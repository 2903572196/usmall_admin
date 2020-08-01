// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/reset.css"
import store from "./store"
//2.处理公共组件
import commonComponents from "./components/index"
for(let i in commonComponents){
  Vue.component(i,commonComponents[i])
}

//3.处理过滤器
import filters from "./filters"
for(let i in filters){
  Vue.filter(i,filters[i])
}
//6.element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//图片前缀
Vue.prototype.$imgPre=""
