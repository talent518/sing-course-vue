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

        <el-form-item label="课程标题" required>
          <el-input
            placeholder="请输入"
            v-model="form.title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="课程副标题">
          <el-input
            placeholder="请输入"
            v-model="form.sub_title"
            clearable></el-input>
          <span><i class="el-icon-warning"></i> 用户端可见，请填写月主题英文</span>
        </el-form-item>

        <!--<el-form-item label="教材数">
          <el-input
            placeholder="请输入"
            v-model="form.textbook_number"
            clearable
          ></el-input>
        </el-form-item>-->

        <el-form-item label="课程封面" required>
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="image/*"
            :show-file-list="false"
            :http-request="uploadFile"
            list-type="picture-card"
            multiple>

            <div
              v-if="form.cover"
              class="upload-item-image">
              <div class="mask"><i class="iconfont icon-cloud-upload"></i></div>
              <el-image
                style="width: 100%; height: 100%;"
                fit="contain"
                :src="form.cover">
              </el-image>
            </div>

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <span><i class="el-icon-warning"></i> 建议图片尺寸为：600 * 600px</span>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogObj.show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="sub">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {upload} from "@api/upload";
import Teach from "@/views/common/teach";

const COVER = 'https://static-cdn.changchangenglish.com/course/1e89746fad68128ea9711e30e5852051fbffb989.png',
  SUB_TITLE = '用户端可见，请填写月主题英文';

export default {
  mixins: [Teach],
  name: "CourseDialog",
  props: ["dialogObj"],
  data() {
    return {
      form: {
        title: "", //课程标题
        sub_title: '', //课程副标题
        cover: COVER, //课程封面
        status: 0, //状态
        textbook_number: "", //教材数
      },
    };
  },
  methods: {
    //提交表单内容
    sub() {
      let api,
        form = this.form,
        json = {
          title: form.title,
          sub_title: form.sub_title,
          status: form.status,
          cover: form.cover,
          textbook_number: form.textbook_number,
        };

      if (!form.title) {
        this.$message({
          type: 'error',
          message: '请输入标题!'
        });
        return false;
      }
      if (!form.cover) {
        this.$message({
          type: 'error',
          message: '请上传课程封面!'
        });
        return false;
      }

      if (this.dialogObj.type == 2) {
        json.id = this.dialogObj.id;
        api = this.ApiTeach.putCourseAPi;
      } else {
        api = this.ApiTeach.postCourseApi;
      }

      api(json).then((res) => {
        if (JSON.stringify(res) === '{}') {
          this.$message({
            type: "success",
            message: "保存成功",
          });
        }
        this.$emit("reflash");
        this.dialogObj.show = false;
      });
    },

    uploadFile(e) {
      upload(e.file).then((res) => {
        this.form.cover = res.url;
      });
    },
  },
  watch: {
    "dialogObj.show"(value) {
      if (value) {
        this.$nextTick(() => {
          this.form.title = "";
          this.form.sub_title = '';
          this.form.cover = COVER;
          this.form.status = 1;
          if (this.dialogObj.type == 2) {
            this.form = {
              title: this.dialogObj.title,
              sub_title: this.dialogObj.sub_title,
              cover: this.dialogObj.cover || COVER,
              status: this.dialogObj.status,
              textbook_number: this.dialogObj.textbook_number,
            };
          }
        });
      }
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
