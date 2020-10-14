<template>
  <el-form class="resource-tools-dialog" ref="audioandvideoForm" :model="form" label-width="120px" size="medium">
    <el-form-item label="播放规则：">
      <el-select v-model="form.play_type" placeholder="请选择">
        <el-option
          v-for="item in dictoryObj.PlayStatusEnum"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="素材列表：">
      <el-button type="success" plain @click="handleAdd">新增素材</el-button>
    </el-form-item>

    <template v-for="(val, index) in form.resources">

      <div class="resourec-item" v-if="val.is_show">

        <el-form-item label="素材名称：">
          <el-input
            v-model="val.title"
            style="width: 216px"
            placeholder="请填写素材名称"></el-input>

          <el-button class="button-del" plain type="danger" @click.stop="videoDelete(index)">删除</el-button>
        </el-form-item>
        <el-form-item label="播放格式：">
          <el-select
            v-model="val.type"
            placeholder="请选择"
            @change="stateUpdate">
            <el-option
              v-for="item in dictoryObj.ResourcesTypeEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="视频："
          v-if="val.type === 1"
          style="margin-bottom: 0">
          <div class="upload-wrapper">
            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="video/mp4"
              :show-file-list="false"
              :http-request="
              (file) => {
                return uploadFile(file, index);
              }"
              list-type="picture-card"
              multiple>
              <template v-if="val.url">
                <div class="video-wrapper">
                  <video :src="val.url" controls class="upload-video"></video>
                </div>
              </template>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </div>
        </el-form-item>

        <el-form-item
          label="音频："
          v-if="val.type === 2"
          style="margin-bottom: 0">
          <div class="upload-wrapper">
            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="audio/mp3"
              :show-file-list="false"
              :http-request="
              (file) => {
                return uploadFile(file, index);
              }
            "
              list-type="picture-card"
              multiple>
              <template v-if="val.url">
                <div class="video-wrapper">
                  <audio :src="val.url" controls class="upload-audio"></audio>
                </div>
              </template>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </div>
        </el-form-item>
      </div>

    </template>
  </el-form>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import {upload} from "@api/upload";

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
        payload: {},
      },
    };
  },
  watch: {
    "payload.tool_type": {
      handler() {
        this.form = this.payload;
        console.log(this.form, 111);
        this.form.play_type = parseInt(this.form.play_type) || 1;
        // if(!this.form.payload.play_type){
        //   this.form.payload.play_type = 1
        // }
        if (!this.form.resources) {
          this.$set(this.form, "resources", []);
        }
        this.$forceUpdate();
      },

      immediate: true,
    },
  },
  methods: {
    handleAdd() {
      this.form.resources.push({type: "", url: "", title: "", is_show: true});
      this.$forceUpdate();
    },

    async uploadFile(e, i) {
      // console.log(this.form.payload.resources)
      let that = this;
      let res = await upload(e.file);
      that.form.resources[i].url = res.url;
      that.$forceUpdate();
    },
    videoDelete(i) {
      // this.form.resources.splice(i, 1);
      this.form.resources[i].is_show = false;
      this.$forceUpdate();
    },
    getFormData(callback) {
      return this.form;
    },
    restForm() {
      return this.$refs.audioandvideoForm.resetFields();
    },
    stateUpdate() {
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss">

.resource-tools-dialog {
  .resourec-item {
    padding: 20px 0;
    border-radius: 8px;
    background-color: #F5F7FA;

    & + .resourec-item {
      margin-top: 20px;
    }

    /*.resource-item-top {
      .el-form-item__content {

      }
    }*/

    .button-del {
      float: right;
      margin-right: 20px;
    }

    .upload-wrapper {
      display: flex;
      align-items: center;

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

  }
}


</style>
