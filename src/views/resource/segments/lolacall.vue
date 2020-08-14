<template>
  <el-form ref="lolacallForm" :model="form" label-width="120px">
    <el-form-item style="display: none;">
      <el-input  v-model="form.id" ></el-input>
    </el-form-item>
    <el-form-item label="标题：" prop="title" required>
      <el-input style="width: 217px" v-model="form.title" placeholder="请输入"></el-input>
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
            <div v-if="form.url"
              class="video-wrapper"
            >
              <video :src="form.url" controls class="upload-video"></video>
            </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
    name: "LolacallSegment",
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
    watch: {
      "payload.id": {
        handler() {
          this.form = this.payload;
        },
        immediate: true,
      },
    },
    methods: {
      async uploadFile(e) {
        let res = await upload(e.file);
        this.form.url = res.url;
        this.$forceUpdate();
      },
      videoDelete(i) {
        this.form.url = '';
      },
      getFormData(callback) {
        return this.form;
      },
      restForm() {
        this.payload.id='';
        return this.$refs.lolacallForm.resetFields();
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
