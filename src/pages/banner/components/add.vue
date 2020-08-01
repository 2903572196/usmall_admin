<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate, //更新
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import E from "wangeditor"; //引入
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      
    }),
  },
  data() {
    return {
      //图片地址
      imageUrl: "",
      // 提交给后端的数据
      form: {
          title:"",
          img:null,
          status:1
      },
    };
  },
  methods: {
    ...mapActions({
       //获取轮播图列表
      requestBannerList: "banner/requestList",
    }),


    //图片发生了修改
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    }, 
      //置空
    empty() {
      //二级分类的数组
      this.secondCateArr= []
      //商品规格属性值
      // this.attrsArr=[]
      //图片地址
      this.imageUrl= ""
      //提交给后端的数据
      this.form={
              title:"",
          img:null,
          status:1
      }


    },
    // 取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add() {
      if(!this.form.title){
        return warningAlert("标题不能为空")
      }
      //发起添加请求
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.requestBannerList()
          // //重新获取总的数量
      
         
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
      requestBannerDetail({ id: id }).then((res) => {
        // console.log(res.data)
        this.form=res.data.list;
        this.form.id=id;
        this.imageUrl=this.$imgPre+this.form.img;    
      });
    },

    
    
    //点击修改按钮
     //点击了修改
    update() {
       if(!this.form.title){
        return warningAlert("标题不能为空")
      }
      requestBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestBannerList();//修改后刷新页面
         
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.add >>>.el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>>.el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.box-img {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  position: relative;

  h3 {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>