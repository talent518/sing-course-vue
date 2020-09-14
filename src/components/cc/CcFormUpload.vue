<template>
  <div class="cc-form-upload">

    <div class="form-upload-content">
      <el-upload
        class="upload-item"
        action="/api/public/upload"
        accept="image/*"
        :show-file-list="false"
        :http-request="handleUploadFile"
        list-type="picture-card"
        multiple>

        <div v-if="value" class="upload-item-image">

          <div class="mask"><i class="iconfont icon-cloud-upload"></i></div>

          <el-image :src="value" style="width: 100%; height: 100%;" fit="contain"></el-image>

        </div>

        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div v-if="tips" class="form-upload-tip"><i class="el-icon-warning"></i> {{tips}}</div>

  </div>
</template>

<script>
import {upload} from "@api/upload"

export default {
  name: "CcFormUpload", // 表单上传图片组件

  props: {
    value: {
      type: String,
      default: '',
    },

    tips: {
      type: String,
      default: '',
    },
  },

  data() {
    return {};
  },

  methods: {
    handleUploadFile(e) {
      upload(e.file).then((res) => {
        this.$emit("input", res.url);
      });
    },
  },
};
</script>

<style lang="scss">
.cc-form-upload {

  .form-upload-content {
    display: block;
  }

  .form-upload-tip {
    display: block;
  }

  .upload-item {

    .el-upload--picture-card {
      overflow: hidden;
    }

    .upload-item-image {
      position: relative;
      width: 100%;
      height: 100%;

      &:hover .mask {
        opacity: 1;
      }

      .mask {
        transition: opacity 280ms;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        .iconfont {
          color: #ffffff;
          font-size: 28px;
        }
      }
    }
  }

}
</style>
