<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="80px">
          <!-- :default-checked-keys="[5]" -->

          <el-tree :data="menuList" show-checkbox node-key="id" :default-checked-keys="defaultKey" :props="defaultProps" ref="tree"></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapGetters, mapActions } from "vuex";
import {
  requestRoleAdd,
  requestRoleDetail,
  requestRoleUpdate,//更新接口
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      // 提交给后端的数据
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultKey:[],

      //树形数据
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    //如果之前menu的list没有请求，就发请求，请求你过了，就不发了
    if (this.menuList.length === 0) {
      this.requestMenuList();
    }
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestList",
      requestRoleList: "role/requestList",
    }),
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //将树形结构的数据，选中的key置空
      this.$refs.tree.setCheckedKeys([]);
      this.defaultKey=[]
    },
    cancel() {
      this.info.show = false;
      if(!this.info.isAdd){
          this.empty();
      }
    },
    add() {
      if(!this.form.rolename){
        return warningAlert("请选择角色名称")
      }
      //获取tree的key赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.form)
      requestRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
   
        //获取详情
    //ajax
    getDetail(id) {
      requestRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(res.data.list.menus);
      });
    },
     update(){
          if(!this.form.rolename){
        return warningAlert("请选择角色名称")
      }
            //获取tree的key赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      //成功之后看结果
      requestRoleUpdate(this.form).then(res=>{
           if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      })
    },
  },
};
</script>
<style scoped>
</style>