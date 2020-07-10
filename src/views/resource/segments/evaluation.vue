<template>
  <el-form
    ref="evaluationForm"
    :model="form"
    label-width="120px"
    :loading="loading"
  >
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
  </el-form>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";

export default {
  name: "EvaluationSegment",
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
      loading: false,
      listScore: [],
      listQuestion: [],
    };
  },
  methods: {
    async uploadFile(e) {
      let res = await upload(e.file);
      this.form.payload.urls.push(res.url);
    },
    getFormData(callback) {
      return this.form;
    },
    async getScoreAll() {
      let res = await this.ApiBasic.getScoreAll();
      this.listScore = res;
    },
    async getQuestionAll() {
      let res = await this.ApiCourse.getVoiceQuestionAll({
        scene: "all",
        status: 1,
      });
      this.listQuestion = res.items;
    },
    restForm() {
      return this.$refs.evaluationForm.resetFields();
    },
  },
  watch: {
    "payload.id": {
      handler() {
        this.loading = true;
        this.form = this.payload;
        this.form.payload.score_config_id = parseInt(
          this.form.payload.score_config_id
        );
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
};
</script>

<style lang="scss">
.upload-wrapper {
  display: flex;

  .video-wrapper {
    overflow: hidden;
    margin-right: 12px;
    background-color: #000;
    border-radius: 6px;
    width: 200px;
    height: 148px;

    display: flex;
    align-items: center;
    justify-content: center;

    .upload-audio {
      margin: 12px;
    }

    .upload-video {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
