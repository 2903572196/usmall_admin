<template>
  <div>
    <el-container class="page">
      <el-aside width="200px">
        <!-- 导航开始 -->
        <!-- 
            router 路由模式
            index 是唯一标识，配置了路由，就改为自己的path
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :unique-opened="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>


          <!-- 有目录 -->
          <el-submenu v-show="hasChildren" :index="item.id+''"  v-for="item in user.menus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}
</el-menu-item>
          </el-submenu>



   <!-- 没有目录 -->
          <el-menu-item v-show="!hasChildren" :index="i.url" v-for="(i) in user.menus" :key="i.title">
            <span slot="title">{{i.title}}</span>
          </el-menu-item>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{user.username}}</span>
            <el-button type="primary" @click=" exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
export default {
  computed:{
    ...mapGetters({
      user:"user"
    }),
    hasChildren(){
      //判断是否有目录
       return this.user.menus[0].children?true:false
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
        ...mapActions({
"changeUser":"changeUser"
    }),
    //退出
    exit(){
      this.changeUser(null)
      this.$router.push("/login")
    }
  },
  mounted() {},
};
</script>
<style scoped>
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
  overflow: hidden;
}
.page {
  height: 100vh;
}
.header-con {
  float: right;
}
.header-con span {
  line-height: 60px;
  color: #ffffff;
}
.view{
  padding-top: 20px;
}
</style>