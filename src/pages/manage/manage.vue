<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    



    <!-- 添加弹框 -->
    <v-Add :info="info" ref="add"></v-Add>



    <!-- 列表 -->
    <v-List @edit="edit($event)"></v-List>
  </div>
</template>
  <script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info:{
        show:false,
          title: "添加管理员",
          isAdd:true
    }
    };
  },
  methods: {
    add(){
      this.info.show=true;
      this.info.title="添加管理员"
      this.info.isAdd=true
    
    },
    // 点击了编辑
    edit(id){
     this.info.show=true;
      this.info.title="编辑管理员"
       this.info.isAdd=false
      this.$refs.add.getDetail(id)
      
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>