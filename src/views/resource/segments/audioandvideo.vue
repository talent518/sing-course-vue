<template>
  <el-form ref="audioandvideoForm" :model="form" label-width="120px" size="medium">
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

    <el-form-item label="素材列表：">
      <el-button
        type="success" plain
        @click="handleAdd">新增素材
      </el-button>
    </el-form-item>

    <template v-for="(val,index) in form.payload.resources">
      <el-form-item label="素材名称：">
        <el-input v-model="val.title" style="width: 216px" placeholder="请填写素材名称"></el-input>
      </el-form-item>
      <el-form-item label="素材类型：">
        <el-select v-model="val.type" placeholder="请选择" @change="stateUpdate">
          <el-option

            v-for="item in dictoryObj.ResourcesTypeEnum"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="视频：" v-if="val.type === 1" style="margin-bottom: 44px">
        <div class="upload-wrapper">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="video/mp4"
            :show-file-list="false"
            :http-request=" (file) => {
                return uploadFile(file, index);
              }"

            list-type="picture-card"
            multiple
          >
            <template v-if="val.url">
              <div
                class="video-wrapper"
              >
                <video :src="val.url" controls class="upload-video"></video>
                <el-button
                  @click.stop="videoDelete(index)"
                  style="position: absolute; top: 150px;"
                >删除
                </el-button
                >
              </div>
            </template>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-progress v-if="progress>0&&progress<100" :percentage="progress" style="width: 190px"></el-progress>
      </el-form-item>

      <el-form-item label="音频：" v-if="val.type === 2" style="margin-bottom: 44px">
        <div class="upload-wrapper">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="audio/mp3"
            :show-file-list="false"
            :http-request="(file) => {
                return uploadFile(file, index);
              }"
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
                >删除
                </el-button
                >
              </div>
            </template>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>

      <!--<el-form-item label="封面：" v-if="val.type === 2">-->
      <!--  <el-upload-->
      <!--    class="avatar-uploader"-->
      <!--    action="/api/public/upload"-->
      <!--    :show-file-list="false"-->
      <!--    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"-->
      <!--    :before-upload="beforeAvatarUpload"-->
      <!--    :http-request="-->
      <!--        (file) => {-->
      <!--          return coverUploadFile(file, index);-->
      <!--        }-->
      <!--      "-->
      <!--  >-->
      <!--    <div class="imageWrap">-->
      <!--      <img-->
      <!--        v-if="val.bg_image"-->
      <!--        :src="val.bg_image"-->
      <!--        class="avatar"-->
      <!--      />-->

      <!--      <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--    </div>-->
      <!--    <div slot="tip" class="el-upload__tip">-->
      <!--      <el-link type="danger" :underline="false">只能上传图片文件，且不超过100kb</el-link></div>-->
      <!--  </el-upload>-->
      <!--</el-form-item>-->

      <el-form-item label="封面：" v-if="val.type === 2">
        <cc-form-upload type="image" v-model="val.bg_image" tips="建议图片尺寸为：长360px * 高270px"></cc-form-upload>
      </el-form-item>

    </template>

  </el-form>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import {upload} from "@api/upload";
const COVER = 'https://static-cdn.changchangenglish.com/course/e4e395e4b223fbcbbb27a0c91b8d9801001399b6.png'
export default {
  name: "AudioandvideoSegment",
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
          // resources:[
          //   {
          //     type: '',
          //     url: '',
          //     title: '',
          //     bg_image:COVER
          //   }
          // ]
        },
      },
      progress:0,
    };
  },
  watch: {
    "payload.id": {
      handler() {

        this.form = this.payload;
        this.form.payload.auto_play =
          parseInt(this.form.payload.auto_play) || 1;
        // if(!this.form.payload.auto_play){
        //   this.form.payload.auto_play = 1
        // }
        if (!this.form.payload.resources) {
          this.form.payload.resources = []
        }else{
          this.form.payload.resources.forEach(e=>{
            if(!e.bg_image){
              e.bg_image = COVER
            }
          })
        }

        this.$forceUpdate();
      },

      immediate: true,
    },
  },
  methods: {
    handleAdd() {
      this.form.payload.resources.push({type: '', url: '', title: '',bg_image:COVER})
      this.$forceUpdate();

    },

      async uploadFile(e,i) {
        let that = this
        let res = await upload(e.file,(progress)=>{this.progress=progress;});
        that.form.payload.resources[i].url = res.url
        that.$forceUpdate();
      },
      async coverUploadFile(e,i) {
        let that = this
        let res = await upload(e.file);
        that.form.payload.resources[i].bg_image = res.url
        that.$forceUpdate();
      },
      videoDelete(i) {
        this.form.payload.resources.splice(i, 1);
        this.$forceUpdate();
      },
      getFormData(callback) {
        return this.form;
      },
      restForm() {
        return this.$refs.audioandvideoForm.resetFields();
      },
      stateUpdate(){
        this.$forceUpdate();
      },
    },
  };
</script>

<style lang="scss">
  .audioandvideoForm{
    .el-upload--picture-card{
      width: 178px!important;
      height: 178px!important;
    }
    .upload-wrapper {
      display: flex;

      .video-wrapper {
        overflow: hidden;
        margin-right: 12px;
        background-color: #000;
        border-radius: 6px;
        width: 178px;
        height: 178px;

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
