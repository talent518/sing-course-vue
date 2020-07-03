<template>
  <el-dialog
    class="resource-dialog-segment"
    top="5vh"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body>
    <div>
      <el-form :model="form" label-width="100px" size="small" v-if="form">

        <template v-if="dialogData.segementType == '测评'">
          <el-form-item label="评分规则：">

            <el-select v-model="form.score_config_id" placeholder="请选择">
              <el-option
                v-for="item in listScore"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="练习题：">
            <el-select
              v-model="form.resources_content.question_ids"
              multiple filterable
              placeholder="请选择">
              <el-option
                v-for="item in listQuestion"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>

          </el-form-item>
        </template>

        <el-form-item label="播放规则：" v-else>
          <el-select v-model="form.resources_content.auto_play" placeholder="请选择">
            <el-option
              v-for="item in dictoryObj.PlayStatusEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="dialogData.segementType == '视频'" label="视频：">

          <div class="upload-wrapper">
            <template v-if="form.resources_content.urls.length">
              <div class="video-wrapper" v-for="(item,i) in form.resources_content.urls">
                <video
                  :src="item" controls class="upload-video"></video>
                <el-button @click.stop="videoDelete(i)" style="position: absolute;top: 150px">删除</el-button>
              </div>
            </template>

            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="video/mp4"
              :show-file-list="false"
              :http-request="uploadFile"
              list-type="picture-card"
              multiple>
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </div>

        </el-form-item>

        <el-form-item v-if="dialogData.segementType == '音频'" label="音频：">

          <div class="upload-wrapper">
            <template v-if="form.resources_content.urls.length">
              <div class="video-wrapper" v-for="item in form.resources_content.urls">
                <audio
                  :src="item" controls class="upload-audio"></audio>
              </div>
            </template>

            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="audio/mp3"
              :show-file-list="false"
              :http-request="uploadFile"
              list-type="picture-card"
              multiple>
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer" v-if="dialogData.type !== 'view'">
      <el-button @click="dialogToggle">取 消</el-button>
      <el-button type="primary" @click="dialogSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import {upload} from "@api/upload";

  // 音、视频
  const FORM_DEFAULT = {
    segment_template_id: '',
    resources_content: {
      auto_play: 2,
      urls: []
    },
  };

  // 评测
  const FORM_DEFAULT_EVA = {
    segment_template_id: '',
    score_config_id: "",
    resources_content: {
      switch_type: 1, // 写死
      question_ids: []
    },
  };

  export default {
    name: "ResourceDialogSegment",

    mixins: [commonMessage, menuRole],

    props: {
      dialogData: {
        type: Object,
        default: {
          show: false,
          type: "",
          index: '',
          param: {
            id: 0,
          },
        },
      },
    },

    data() {
      return {
        title: "",

        listScore: [],

        listQuestion: [],

        form: {
          resources_content: {
            question_ids: [],
            urls: []
          },
          score_config_id: '',
          id: ''

        },
      };
    },

    watch: {
      "dialogData.show"(val) {
        if (val) this.init();
      },
    },

    methods: {
      videoDelete(i) {
        console.log(this.form.resources_content)
        this.form.resources_content.urls.splice(i, 1)
        // console.log(this.form.resources_content)
      },

      init() {

        this.getQuestionAll();

        this.getScoreAll();

        if (this.dialogData.type == "add") {
          this.title = "新增教材";

          if (this.dialogData.segementType == '测评') {
            this.form = JSON.parse(JSON.stringify(FORM_DEFAULT_EVA));
          } else {
            this.form = JSON.parse(JSON.stringify(FORM_DEFAULT));
          }

        } else if (this.dialogData.type == "edit") {
          this.title = "编辑教材";
          this.form.resources_content = this.dialogData.param;
          this.form.resources_content = {
            ...this.dialogData.param,
            switch_type: '',
            question_ids: [],
            auto_play: '',
            urls: []
          };

          if (this.dialogData.segementType == '测评') {
            let switch_type,
              question_ids;

            let _resource_content = this.$parent.$parent.dialogData.param.textbook_segment_data_details[this.dialogData.index].resources_content;

            switch_type = JSON.parse(JSON.stringify(_resource_content.switch_type));
            question_ids = JSON.parse(JSON.stringify(_resource_content.question_ids));
            this.form.score_config_id = switch_type;
            this.form.resources_content.question_ids = question_ids;
          } else {

            let _resource_content = this.$parent.$parent.dialogData.param.textbook_segment_data_details[this.dialogData.index].resources_content;

            this.form.resources_content.urls = JSON.parse(JSON.stringify(_resources_content.urls));
            this.form.resources_content.auto_play = JSON.parse(JSON.stringify(_resources_content.auto_play));
          }
          this.form.id = this.dialogData.param.segment_template_detail.segment_detail.id
          console.log(this.dialogData.param.segment_template_detail.segment_detail.id)
          // console.log(this.form.resources_content.urls)
        } else if (this.dialogData.type == "view") {
          this.title = "查看教材";
          this.form.resources_content = this.dialogData.param;
        }


      },

      async getQuestionAll() {
        let res = await this.ApiCourse.getVoiceQuestionAll({scene: "all", status: 1});
        this.listQuestion = res.items;
      },

      async getScoreAll() {
        let res = await this.ApiBasic.getScoreAll();
        this.listScore = res;
      },

      async uploadFile(e) {
        let res = await upload(e.file);
        this.form.resources_content.urls.push(res.url);
      },

      openMedia(url) {
        console.log("media url", url);
        window.open(url, "_blank");
      },

      dialogToggle() {
        this.dialogData.show = !this.dialogData.show;
      },

      dialogSave() {

        let form = this.form;

        let result = {
          segment_template_id: this.dialogData.param.segment_template_id,
          score_config_id: form.score_config_id ? form.score_config_id : '',
          resources_content: {},
        }
        // todo 需要优化 直接格式化就行？
        if (this.dialogData.segementType == '测评') {
          result.resources_content = {
            switch_type: form.score_config_id, // 写死
            question_ids: form.resources_content.question_ids
          }
        } else {
          if (!form.resources_content.auto_play) {
            this.$message({
              type: 'error',
              message: '请选择播放规则!'
            });
            return false;
          }
          result.resources_content = {
            auto_play: form.resources_content.auto_play,
            urls: form.resources_content.urls
          }
        }
        this.$parent.$parent.form.textbook_segment_data_details[this.dialogData.index] = result;

        this.dialogToggle();

      },
    },
  };
</script>

<style lang="scss">
  .resource-dialog-segment {

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

  }
</style>
