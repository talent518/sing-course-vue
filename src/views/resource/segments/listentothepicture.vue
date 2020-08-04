<template>
  <el-form ref="listentothepictureForm" :model="form" label-width="120px">
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


    <template v-for="(val,index) in form.payload.content">
      <el-form-item label="音频：" v-if="val.type === 2">
        <div class="upload-wrapper" @click="getIndex(index)">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="audio/mp3"
            :show-file-list="false"
            :http-request="uploadFile"
            list-type="picture-card"
            multiple
          >
            <template v-if="val.url">
              <div
                class="video-wrapper"
              >
                <audio :src="val.url" controls class="upload-audio"></audio>
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
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import { upload } from "@api/upload";

  export default {
    name: "ListentothepictureSegment",
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
          this.form.payload.auto_play =
            parseInt(this.form.payload.auto_play) || "";
        },
        immediate: true,
      },
    },
    methods: {
      async uploadFile(e) {
        let res = await upload(e.file);
        this.form.payload.urls.push(res.url);
      },
      videoDelete(i) {
        this.form.payload.urls.splice(i, 1);
      },
      getFormData(callback) {
        return this.form;
      },
      restForm() {
        return this.$refs.listentothepictureForm.resetFields();
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
