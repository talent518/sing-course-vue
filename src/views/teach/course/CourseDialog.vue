<template>
  <div class="course-dialog">
    <el-dialog
      width="800px"
      :title="dialogObj.name"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form :model="form" ref="form" size="small" label-width="100px">
        <!--<div class="form-section">-->
        <!--  <div class="form-section-content form-col-2">-->

        <el-form-item label="课程标题">
          <el-input
            placeholder="请输入"
            v-model="form.title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="课程副标题">
          <el-input
            placeholder="请输入"
            v-model="form.title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="课程封面">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="image/*"
            :show-file-list="false"
            :http-request="uploadFile"
            list-type="picture-card"
            multiple
          >
            <el-image
              style="width: 100%; height: 100%;"
              fit="contain"
              v-if="form.cover"
              :src="form.cover"
            >
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogObj.show = false"
          >取 消</el-button
        >
        <el-button size="small" type="primary" @click="sub">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { upload } from "@api/upload";
import Teach from "@/views/common/teach";
export default {
  mixins: [Teach],
  name: "CourseDialog",
  props: ["dialogObj"],
  data() {
    return {
      form: {
        title: "", //课程标题
        sub_title: "", //课程副标题
        cover: "", //课程封面
        status: 1, //状态
      },
      // watchList: [
      //   { id: 5, title: 5 },
      //   { id: 6, title: 6 },
      //   { id: 10, title: 10 },
      //   { id: 12, title: 12 },
      //   { id: 20, title: 20 },
      // ],
    };
  },
  methods: {
    //提交表单内容
    sub() {},

    uploadFile(e) {
      upload(e.file).then((res) => {
        console.log(res.url);
        this.form.cover = res.url;
      });
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt100k = file.size / 1024 / 1024 < 0.1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt100k) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  watch: {
    "dialogObj.show"() {
      this.$nextTick(() => {
        this.form.title = "";
        this.form.sub_title = [];
        this.form.cover = "";
        this.form.status = 1;
        if (this.dialogObj.type == 2) {
          this.form = {
            title: this.dialogObj.title,
            sub_title: this.dialogObj.sub_title,
            cover: this.dialogObj.cover,
            status: this.dialogObj.status,
          };
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
/*.course-dialog {*/
.course-avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.course-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.course-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.course-avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/*}*/
</style>
