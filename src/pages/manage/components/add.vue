<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
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
  requestManageAdd,
  requestManageDetail,
  requestManageUpdate,
  requestRoleUpdate, //更新接口
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      // 提交给后端的数据
      form: {
        roleid:"",
        username:"",
        password:"",
        status:1
      },
      defaultKey: [],

    
    };
  },
  mounted() {
    //如果之前menu的list没有请求，就发请求，请求你过了，就不发了
    if (this.roleList.length === 0) {
    this.requestRoleList();
    }
  },
  methods: {
    ...mapActions({
      // requestMenuList: "menu/requestList",
      requestRoleList: "role/requestList",
       requestManageList:"manage/requestList",
          requestTotal:"manage/requestTotal"
    }),
    //清空
    empty() {
      this.form = {
        roleid:"",
        username:"",
        password:"",
        status:1
      };
      
    },
    // 取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      if(!this.form.username ||!this.form.password){
       return warningAlert("请填写用户名或密码")
      }
     
   //发起添加请求
      requestManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.requestManageList();
          this.requestTotal()
          
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取详情
    //ajax
    getDetail(id) {
      requestManageDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password =""
       
      });
    },
    //点击修改按钮
    update() {
    if(!this.form.username){
       return warningAlert("请填写用户名")
      }

      //成功之后看结果
   requestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestManageList();//更新
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>