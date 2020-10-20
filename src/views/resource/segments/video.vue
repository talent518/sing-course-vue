<template>
  <el-form ref="videoForm" :model="form" label-width="120px">
    <el-form-item label="播放规则：">
      <el-select v-model="form.payload.auto_play" placeholder="请选择">
        <el-option
          v-for="item in dictoryObj.PlayStatusEnum"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="视频：">
      <div class="upload-wrapper">
        <el-upload
          class="upload-item"
          action="/api/public/upload"
          accept="video/mp4"
          :show-file-list="false"
          :http-request="uploadFile"
          list-type="picture-card"
          multiple
        >
          <template v-if="form.payload.resources[0].url">
            <div
              class="video-wrapper"
              v-for="(item, index) in form.payload.resources"
              :key="index"
            >
              <video :src="item.url" controls class="upload-video"></video>
              <el-button
                @click.stop="videoDelete(index)"
                style="position: absolute; top: 150px;"
                >删除</el-button
              >
            </div>
          </template>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-progress v-if="progress>0&&progress<100" :percentage="progress" style="width: 190px"></el-progress>
    </el-form-item>
  </el-form>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import { upload } from "@api/upload";

export default {
  name: "VideoSegment",
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
        progress:0,
      },
    };
  },
  watch: {
    "payload.id": {
      handler() {
        this.form = this.payload;
        console.log(this.form);
        this.form.payload.auto_play =
          parseInt(this.form.payload.auto_play) || "";
        if(!this.form.payload.auto_play){
          this.form.payload.auto_play = 1
        }
      },
      immediate: true,
    },
  },
  methods: {
    async uploadFile(e) {
      let res = await upload(e.file,(progress)=>{this.progress=progress;});
      this.form.payload.resources[0].url = res.url;
      console.log(this.form.payload.resources)
      this.$forceUpdate();
    },
    videoDelete(i) {
      this.form.payload.resources[0].url = '';
    },
    getFormData(callback) {
      return this.form;
    },
    restForm() {
      return this.$refs.videoForm.resetFields();
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
