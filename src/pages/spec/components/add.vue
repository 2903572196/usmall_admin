<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <!-- .................................................. -->
        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" label-width="80px">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
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
  requestSpecAdd,
  requestSpecDetail,
  requestSpecUpdate, //更新
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
      //定义属性的数组----点击时属规格增加一条
      attrArr: [
        {
          value: "",
        },
      ],
      // 提交给后端的数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  // mounted() {
  //   //如果之前menu的list没有请求，就发请求，请求你过了，就不发了
  //   if (this.roleList.length === 0) {
  //     this.requestRoleList();
  //   }
  // },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
    // -----------------------------------------------------------
    //新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    // ---------------------------------------------------
    //删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },

    //置空
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      //置空属性
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    // 取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      //验证是否为空
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      //点击添加按钮时
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      //发起添加请求
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据

          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取详情
    //ajax
    //获取一条数据
    getDetail(id) {
      //ajax
      requestSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));
      });
    },
    //点击修改按钮
    update() {
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }

      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      //成功之后看结果
      requestSpecUpdate(this.form).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestList();
          this.requestTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}
</style>