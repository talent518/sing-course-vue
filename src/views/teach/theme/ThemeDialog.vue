<template>
  <div class="theme-dialog">
    <el-dialog
      width="800px"
      :title="dialogObj.name"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body>
      <el-form :model="form" ref="form" size="small" label-width="100px">
        <!--<div class="form-section">-->
        <!--  <div class="form-section-content form-col-2">-->

        <el-form-item label="主题标题" required>
          <el-input
            placeholder="请输入"
            v-model="form.title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="主题副标题">
          <el-input
            placeholder="请输入"
            v-model="form.sub_title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="主题封面" required>

          <cc-form-upload
            v-model="form.cover"
            tips="建议图片尺寸为：600 * 600px"></cc-form-upload>

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

const COVER = 'https://static-cdn.changchangenglish.com/course/1e89746fad68128ea9711e30e5852051fbffb989.png';

export default {
  mixins: [Teach],
  name: "ThemeDialog",
  props: ["dialogObj"],
  data() {
    return {
      form: {
        title: "", //主题标题
        sub_title: "", //主题副标题
        cover: COVER, //主题封面
        status: 0, //状态
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
          message: '请上传主题封面!'
        });
        return false;
      }

      if (this.dialogObj.type == 2) {
        json.id = this.dialogObj.id;
        api = this.ApiTeach.putThemeAPi;
      } else {
        api = this.ApiTeach.postThemeApi;
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
              cover: this.dialogObj.cover,
              status: this.dialogObj.status,
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
.theme-avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.theme-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.theme-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.theme-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/*}*/
</style>
