<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!--  -->
 <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname"></el-input>
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
         <el-button type="primary" @click="update" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapGetters, mapActions } from "vuex";
import {
  requestMemberAdd,
  requestMemberDetail,
  requestMemberUpdate,
  //requestRoleUpdate, //更新接口
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      // roleList: "member/list",
    }),
  },
  data() {
    return {
      // 提交给后端的数据
      form: {
        // roleid:"",
        phone:"",
        password:"",
        status:1
      },
      defaultKey: [],

    
    };
  },
  mounted() {
    //如果之前menu的list没有请求，就发请求，请求你过了，就不发了
    // if (this.roleList.length === 0) {
    // this.requestRoleList();
    // }
  },
  methods: {
    ...mapActions({
      // requestMenuList: "menu/requestList",
      requestMemberList: "member/requestList",
      //  requestMemberList:"Member/requestList",
          // requestTotal:"Member/requestTotal"
    }),
    //清空
    empty() {
      this.form = {
        roleid:"",
        phone:"",
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


    //获取详情
    //ajax
    getDetail(id) {
      requestMemberDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password =""
       
      });
    },
    //点击修改按钮
    update() {
    

      //成功之后看结果
   requestMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestMemberList();//更新
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