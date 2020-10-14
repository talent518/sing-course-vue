<template>
  <el-form ref="audioandvideoForm" :model="form" label-width="110px" size="small" class="resource-form">
    <el-form-item label="播放规则：">
      <el-select v-model="form.play_type" placeholder="请选择" style="width: 150px">
        <el-option
          v-for="item in dictoryObj.PlayStatusEnum"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="素材列表：">
      <el-button
        type="success" plain
        @click="handleAdd">新增素材
      </el-button>
    </el-form-item>

    <template v-for="(val,index) in form.resources">

      <div class="resource-item">

        <el-form-item class="resource-item-index">
          <span>{{index + 1}}</span>
        </el-form-item>

        <!--如果不用el-form-item包起来，按钮的size不会跟着form设置的size变化-->
        <el-form-item class="resource-item-control">


          <!--<el-button-group>
            <span class="control-index">{{index + 1}}</span>
          </el-button-group>-->

          <el-button-group>
            <el-button :disabled="index == 0" @click="moveUp(index)"><i class="el-icon-top"></i></el-button>
            <el-button :disabled="index == form.resources.length - 1" @click="moveDown(index)">
              <i class="el-icon-bottom"></i></el-button>
          </el-button-group>

          <el-button-group>
            <el-button plain type="success" @click="videoAdd(index)"><i class="el-icon-plus"></i></el-button>
            <el-button plain type="danger" @click="videoDelete(index)"><i class="el-icon-minus"></i></el-button>
          </el-button-group>
        </el-form-item>

        <el-form-item label="素材名称：">
          <el-input v-model="val.title" style="width: 150px" placeholder="请填写"></el-input>
        </el-form-item>

        <el-form-item label="播放格式：">
          <el-select v-model="val.type" placeholder="请选择" @change="stateUpdate" style="width: 150px">
            <el-option
              v-for="item in dictoryObj.TextbookToolTypeEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="富文本：" v-if="val.type === 3">
          <editor-detail style="padding-right: 20px;" :height="300" :lookData="val"/>
        </el-form-item>

        <el-form-item label="视频：" v-if="val.type === 1">
          <!--<div class="upload-wrapper">
            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="video/mp4"
              :show-file-list="false"
              :http-request="(file) => {return uploadFile(file, index);}"
              list-type="picture-card"
              multiple>
              <template v-if="val.url">
                <div class="video-wrapper">
                  <video :src="val.url" controls class="upload-video"></video>
                </div>
              </template>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>-->

          <cc-form-upload type="video" v-model="val.url"></cc-form-upload>

        </el-form-item>

        <el-form-item label="音频：" v-if="val.type === 2">
          <!--<div class="upload-wrapper">
            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="audio/mp3"
              :show-file-list="false"
              :http-request="(file) => {return uploadFile(file, index);}"
              list-type="picture-card"
              multiple>
              <template v-if="val.url">
                <div class="video-wrapper">
                  <audio :src="val.url" controls class="upload-audio"></audio>
                </div>
              </template>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>-->

          <cc-form-upload type="audio" v-model="val.url"></cc-form-upload>
        </el-form-item>

      </div>

    </template>

  </el-form>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import {upload} from "@api/upload";
import editorDetail from "@/components/editorDetail/editorDetail";

const NEW_ITEM = {
  url: '',
  type: 1,
  title: '',
  detail: ''
};

export default {
  name: "AudioandvideoSegment",
  components: {
    editorDetail
  },
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
        console.log(this.form, 111)
        this.form.play_type = parseInt(this.form.play_type) || 1;
        if (!this.form.resources) {
          this.form.resources = []
        } else {
          this.form.resources.forEach(val => {
            if (val.type == 3) {
              val.detail = val.url
            }
          })
        }
        this.$forceUpdate();
      },

      immediate: true,
    },
  },
  methods: {
    copy(json) {
      return JSON.parse(JSON.stringify(json))
    },

    async uploadFile(e, i) {
      // console.log(this.form.payload.resources)
      let that = this
      let res = await upload(e.file);
      that.form.resources[i].url = res.url
      that.$forceUpdate();
    },

    moveUp(index) {
      let current = this.form.resources[index];
      this.form.resources.splice(index, 1);
      this.form.resources.splice(index - 1, 0, current);
    },

    moveDown(index) {
      let current = this.form.resources[index];
      this.form.resources.splice(index, 1);
      this.form.resources.splice(index + 1, 0, current);
    },

    handleAdd() {
      this.form.resources.push(this.copy(NEW_ITEM))
      this.$forceUpdate();
    },

    videoAdd(i) {
      this.form.resources.splice(i + 1, 0, this.copy(NEW_ITEM));
    },

    videoDelete(i) {
      this.form.resources.splice(i, 1);
      this.$forceUpdate();
    },
    getFormData(callback) {

      if (this.form.resources && this.form.resources.length) {
        this.form.resources.forEach(val => {
          if (val.type == 3) {
            val.url = val.detail
          }
        })
      }

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
