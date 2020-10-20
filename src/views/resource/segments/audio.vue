<template>
  <el-form ref="audioForm" :model="form" label-width="120px" class="audioForm">
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
        <el-upload
          class="upload-item"
          action="/api/public/upload"
          accept="audio/mp3"
          :show-file-list="false"
          :http-request="
              (file) => {
                return uploadFile(file, '1');
              }
            "
          list-type="picture-card"
          multiple
        >
          <template v-if="form.payload.resources[0].url">
            <div
              class="video-wrapper"
              v-for="(item, index) in form.payload.resources"
              :key="index"
            >
              <audio :src="item.url" controls class="upload-audio"></audio>
            </div>
          </template>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-form-item>

    <el-form-item label="封面：">
      <el-upload
        class="avatar-uploader"
        action="/api/public/upload"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
        :before-upload="beforeAvatarUpload"
        :http-request="
              (file) => {
                return uploadFile(file, '2');
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
        <div slot="tip" class="el-upload__tip">
          <el-link type="danger" :underline="false">建议图片尺寸为：长360px * 高270px</el-link></div>
      </el-upload>
    </el-form-item>

  </el-form>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import { upload } from "@api/upload";

const COVER = 'https://static-cdn.changchangenglish.com/course/e4e395e4b223fbcbbb27a0c91b8d9801001399b6.png'

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
        payload: {

        },
      },
    };
  },
  methods: {
    async uploadFile(e,num) {
      let res = await upload(e.file);
      if(num == 1){
        this.form.payload.resources[0].url = res.url;
      }else{
        this.form.payload.bg_image = res.url;
      }
      this.$forceUpdate();
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
        if(!this.form.payload.bg_image){
          this.form.payload.bg_image = COVER
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
  .audioForm{
    .el-upload--picture-card{
      width: 200px!important;
    }
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
  }

</style>
