<template>
  <el-form ref="eatbiscuitsForm" :model="form" label-width="120px" class="eatbiscuitsForm">
    <el-form-item label="背景图片：">
      <el-upload
        class="avatar-uploader"
        action="/api/public/upload"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
        :http-request="
              (file) => {
                return uploadFile(file, '1');
              }
            "
      >
        <div class="imageWrap">
          <img
            v-if="form.payload.bg_image"
            :src="form.payload.bg_image"
            class="avatar"
          />

          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </el-upload>
    </el-form-item>

    <el-form-item label="评分规则：">
      <el-select v-model="form.payload.score_config_id" placeholder="请选择">
        <el-option
                v-for="item in listScore"
                :key="item.id"
                :label="item.title"
                :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="练习题：">
      <el-select
        v-model="form.payload.question_ids"
        multiple
        filterable
        placeholder="请选择"
        style="padding-bottom: 2px"
      >
        <el-option
          v-for="item in listQuestion"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="重试次数：">
      <el-input style="width: 216px" v-model="form.payload.again_count"  placeholder="请填写最多重试次数"/>
    </el-form-item>
  </el-form>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import { upload } from "@api/upload";

  export default {
    name: "EatbiscuitsSegment",
    mixins: [commonMessage, menuRole],
    props: {
      payload: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        form: {
          id: 0,
          template_id: 0,
          payload: {},
        },
        listScore: [],
        listQuestion: [],
      };
    },
    watch: {
      "payload.id": {
        handler() {
          this.loading = true;
          this.form = this.payload;
          this.form.payload.score_config_id =
                  parseInt(this.form.payload.score_config_id) || "";
          Promise.all([this.getScoreAll(), this.getQuestionAll()])
                  .then(() => {
                    this.loading = false;
                  })
            .catch(() => {
              this.loading = false;
            });
        },
        immediate: true,
      },
    },
    methods: {
      async getScoreAll() {
        this.listScore = await this.ApiBasic.getScoreAll();
      },
      async getQuestionAll() {
        let res = await this.ApiCourse.getVoiceQuestionAll({
          scene: "all",
          status: 1,
        });
        this.listQuestion = res.items;
      },
      async uploadFile(e) {
        let res = await upload(e.file);
        this.form.payload.bg_image=res.url;
        this.$forceUpdate();
      },
      videoDelete(i) {
        this.form.payload.urls.splice(i, 1);
      },
      getFormData(callback) {
        return this.form;
      },
      restForm() {
        return this.$refs.eatbiscuitsForm.resetFields();
      },
    },
  };
</script>

<style lang="scss">
  .eatbiscuitsForm {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
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
    .imageWrap {
      display: flex;
    }
    .upload-demo {
      display: inline-block;
      margin-right: 10px;
    }

  }
</style>
