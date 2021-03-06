import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)


//路由独享-----权限
function havePower(url){
  return store.state.user.menus_url.some(i=>i==url)
}

let router= new Router({
  routes: [
    {
      path:"/login",
      component:()=>import("../pages/login/login.vue")
    },
    {
      path:"/",
      component:()=>import("../pages/index/index.vue"),
      children:[
        {
          path:"home",
          component:()=>import("../pages/home/home.vue"),
          name:"首页"
        },
        {
          path:"menu",
          component:()=>import("../pages/menu/menu.vue"),
          name:"菜单管理",
          beforeEnter(to,from,next){
            havePower("/menu")?next():next("/home")
          }
        },
        {
          path:"role",
          component:()=>import("../pages/role/role.vue"),
          name:"角色管理",
          beforeEnter(to,from,next){
            havePower("/role")?next():next("/home")
          }
        },
        {
          path:"manage",
          component:()=>import("../pages/manage/manage.vue"),
          name:"管理员管理",
          beforeEnter(to,from,next){
            havePower("/manage")?next():next("/home")
          }
        },
        {
          path:"cate",
          component:()=>import("../pages/cate/cate.vue"),
          name:"商品分类",
          beforeEnter(to,from,next){
            havePower("/cate")?next():next("/home")
          }
        },
        {
          path:"spec",
          component:()=>import("../pages/spec/spec.vue"),
          name:"商品规格",
          beforeEnter(to,from,next){
            havePower("/spec")?next():next("/home")
          }
        },
        {
          path:"goods",
          component:()=>import("../pages/goods/goods.vue"),
          name:"商品管理",
          beforeEnter(to,from,next){
            havePower("/goods")?next():next("/home")
          }
        },
        {
          path:"member",
          component:()=>import("../pages/member/member.vue"),
          name:"会员管理",
          beforeEnter(to,from,next){
            havePower("/member")?next():next("/home")
          }
        },
        {
          path:"banner",
          component:()=>import("../pages/banner/banner.vue"),
          name:"轮播图管理",
          beforeEnter(to,from,next){
            havePower("/banner")?next():next("/home")
          }
        },
        {
          path:"seckill",
          component:()=>import("../pages/seckill/seckill.vue"),
          name:"秒杀活动",
          beforeEnter(to,from,next){
            havePower("/seckill")?next():next("/home")
          }
        },
        {
          path:"",
          redirect:"home"
        }
      ]
    },
  ]
})
//登陆拦截
router.beforeEach((to,from,next)=>{
    //如果前往登录页面，next()
    if(to.path==="/login"){
      next()
      return;
    }
    //如果去的不是登录，就要拦截
    if(store.state.user){
      next();
      return;
    }
    next("/login")
})

export default router