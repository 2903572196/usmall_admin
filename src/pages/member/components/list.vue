<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
         
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total"></el-pagination> -->
  </div>
</template>
  <script>
import { mapGetters, mapActions } from "vuex";
import { requestMemberDetail } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "member/list",
      total: "member/total",
      size: "manage/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "member/requestList",
    
    }),
    edit(id) {
      this.$emit("edit", id);
    },

  
  },
  mounted() {
 
    this.requestList();
  },
};
</script>
<style scoped>
</style>