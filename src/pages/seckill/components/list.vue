<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="编号" width="120"></el-table-column>
      <el-table-column prop="title" label="活动名称" width="120"></el-table-column>
      <el-table-column label="状态"  width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- 删除 -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>
  <script>
import { mapGetters, mapActions } from "vuex";
import { requestSeckillDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "seckill/list",
      total: "seckill/total",
    //   size: "seckill/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "seckill/requestList",
      requestTotal: "seckill/requestTotal",
        changePage: "seckill/changePage",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      console.log(id)
      requestSeckillDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.requestList();
            //  this.requestTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cPage(a){
         this.changePage(a)
           this.requestList();
    }
  },
  mounted() {
    // this.requestTotal();
    this.requestList();
  },
};
</script>
<style scoped>

</style>