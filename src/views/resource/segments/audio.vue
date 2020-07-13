<template>
  <el-form ref="audioForm" :model="form" label-width="120px">
    <el-form-item label="播放规则：">
      <el-select v-model="form.payload.auto_play" placeholder="请选择播放规则">
        <el-option
          v-for="item in dictoryObj.PlayStatusEnum"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="音频：">
      <div class="upload-wrapper">
        <template v-if="form.payload.urls.length">
          <div
            class="video-wrapper"
            v-for="(item, index) in form.payload.urls"
            :key="index"
          >
            <audio :src="item" controls class="upload-audio"></audio>
          </div>
        </template>

        <el-upload
          class="upload-item"
          action="/api/public/upload"
          accept="audio/mp3"
          :show-file-list="false"
          :http-request="uploadFile"
          list-type="picture-card"
          multiple
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import { upload } from "@api/upload";

export default {
  name: "AudioSegment",
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
    };
  },
  methods: {
    async uploadFile(e) {
      let res = await upload(e.file);
      this.form.urls.push(res.url);
    },
    getFormData(callback) {
      return this.form;
    },
    restForm() {
      return this.$refs.audioForm.resetFields();
    },
  },
  watch: {
    "payload.id": {
      handler() {
        this.form = this.payload;
        this.form.payload.auto_play =
          parseInt(this.form.payload.auto_play) || "";
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
