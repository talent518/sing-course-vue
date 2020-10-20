<template>
  <div class="cc-form-upload">

    <div class="form-upload-content">
      <el-upload
        class="upload-item"
        :class="`upload-item-${type}`"
        action="/api/public/upload"
        :accept="MAP_TYPE_ACCEPT[type]"
        :show-file-list="false"
        :http-request="handleUploadFile"
        list-type="picture-card"
        multiple>

        <template v-if="type === 'image'">
          <div v-if="value" class="upload-content upload-content-image">
            <div class="mask"><i class="iconfont icon-cloud-upload"></i></div>
            <el-image :src="value" style="width: 100%; height: 100%;" fit="contain"></el-image>
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </template>

        <template v-if="type === 'audio'">
          <div v-if="value" class="upload-content upload-content-audio">
            <audio :src="value" controls></audio>
          </div>
          <i v-else class="iconfont icon-music-note"></i>

        </template>

        <template v-if="type === 'video'">
          <div v-if="value" class="upload-content upload-content-video">
            <video :src="value" controls preload="metadata"></video>
          </div>
          <i v-else class="iconfont icon-video1"></i>
        </template>

      </el-upload>
    </div>
    <el-progress v-if="progress>0&&progress<100" :percentage="progress" style="width: 190px"></el-progress>
    <div v-if="tips" class="form-upload-tip"><i class="el-icon-warning"></i> {{tips}}</div>

  </div>
</template>

<script>
  import {upload} from "@api/upload";

  const MAP_TYPE_ACCEPT = {
    image: 'image/*',
    audio: 'audio/mp3',
    video: 'video/mp4',
  }

  export default {
    name: "CcFormUpload", // 表单上传图片组件

    props: {
      value: { // url值
        type: String,
        default: '',
      },

      type: { // 类型
        type: String,
        default: 'image',
      },

      tips: { // 提示文案
        type: String,
        default: '',
      },
    },

    data() {
      return {
        MAP_TYPE_ACCEPT: MAP_TYPE_ACCEPT,
        progressFlag: false, // 关闭进度条
        progress: 0// 动态显示进度条
      };
    },

    methods: {

      handleUploadFile(e) {
        // this.progress({type: 'new', id: e.file.uid})
        console.log(this.$store)
        upload(e.file, (progress)=>{this.progress=progress;}).then((res) => {
          this.$emit("input", res.url);
          this.$emit("change", res.url);
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
      line-height: 32px;
    }

    .upload-item {

      .el-upload {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      &.upload-item-audio {
        .el-upload {
          //width: 300px;
          padding: 10px;
          width: 300px;
          height: 64px;
        }

        audio {
          width: 280px;
          height: 44px;
          //transform: scale(0.9);
        }
      }

      &.upload-item-video {
        .el-upload {
          padding: 10px;
          max-width: 300px;
          min-width: 150px;
          width: auto;
          height: 150px;
          //height: 168px;
        }

        .upload-content-video {
          //box-sizing: border-box;
          //padding: 10px;
          video {
            max-width: 100%;
            max-height: 100%;
          }
        }

      }

      .el-upload--picture-card {
        overflow: hidden;
        background-color: #fff;
      }

      .upload-content {
        display: flex;
        align-items: center;
        justify-content: center;
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
