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
              v-for="item in dictoryObj.EvaluationSwitchTypeEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="dialogData.segementType == '视频'" label="视频：">

          <div class="upload-wrapper">
            <template v-if="form.resources_content.urls.length">
              <div class="video-wrapper" v-for="item in form.resources_content.urls">
                <video
                  :src="item" controls class="upload-video"></video>
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
          resources_content:{}
        },
      };
    },

    watch: {
      "dialogData.show"(val) {
        if (val) this.init();
      },
    },

    methods: {
      init() {
        console.log(this.dictoryObj);

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
          let arr = []
          this.title = "编辑教材";
          this.form.resources_content = this.dialogData.param;
          arr.push(this.dialogData.param.cover);
          this.form.resources_content.urls = arr
          // this.form.resources_content.auto_play =
          console.log(this.dialogData.param.cover)
          console.log(this.form.resources_content.urls)
        } else if (this.dialogData.type == "view") {
          this.title = "查看教材";
          this.form.resources_content = this.dialogData.param;
        }


      },

      async getQuestionAll() {
        let res = await this.ApiCourse.getVoiceQuestions({scene: "all", status: 1});
        this.listQuestion = res.items;
        // 新增默认选中第一个
        /*if (this.dialogData.type == 'add') {
          this.form.template_data.textbook_template_id = res.items[0].id;
          this.templateResourceChange(res.items[0].id)
        }*/
      },

      async getScoreAll() {
        let res = await this.ApiBasic.getScoreAll();
        this.listScore = res;
        // 新增默认选中第一个
        /*if (this.dialogData.type == 'add') {
          this.form.score_config_id = res.items[0].id;
        }*/
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
            switch_type: 1, // 写死
            question_ids: form.resources_content.question_ids
          }
        } else {
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
