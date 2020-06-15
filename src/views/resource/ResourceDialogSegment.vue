<template>
  <el-dialog
    class="resource-dialog-segment"
    top="5vh"
    width="1200px"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body>
    <div>
      <el-form :model="form" label-width="100px" size="small">
        <el-form-item label="播放规则：">
          <el-select v-model="form.resources_content.auto_play" placeholder="请选择">
            <el-option
              v-for="item in dictoryObj.EvaluationSwitchTypeEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="dialogData.type == '视频'" label="视频：">

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

        <el-form-item v-if="dialogData.type == '音频'" label="音频：">

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

  const FORM_DEFAULT = {
    segment_template_id: '',
    resources_content: {
      auto_play: 2,
      urls: []
    },
    score_config_id: ""
  };

  const SEGMENT_ITEM = {
    segment_template_id: "",
    lead_type: "",
    title: "",
    cover: "",
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
          param: {
            id: 0,
          },
        },
      },
    },

    data() {
      return {
        title: "",

        listSegment: [],

        listTemplateResource: [],

        SEGMENT_ITEM: SEGMENT_ITEM,

        form: JSON.parse(JSON.stringify(FORM_DEFAULT)),
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

        this.getTemplateResourceAll();

        if (this.dialogData.type == "add") {
          this.title = "新增教材";
          this.form = JSON.parse(JSON.stringify(FORM_DEFAULT));
        } else if (this.dialogData.type == "edit") {
          this.title = "编辑教材";
          this.form = this.dialogData.param;
        } else if (this.dialogData.type == "view") {
          this.title = "查看教材";
          this.form = this.dialogData.param;
        }
      },

      async getTemplateResourceAll() {
        let res = await this.ApiBasic.getResource({scene: "all"});
        this.listTemplateResource = res.items;
        // 新增默认选中第一个
        if (this.dialogData.type == 'add') {
          this.form.template_data.textbook_template_id = res.items[0].id;
          this.templateResourceChange(res.items[0].id)
        }
      },

      /**
       * 教材模板变化
       */
      templateResourceChange(label) {
        let _idx = this.listTemplateResource.findIndex(i => {
            return i.id == label
          }),
          _listSegment = this.listTemplateResource[_idx].template_data_details;
        if (_listSegment && _listSegment.length) {
          this.form.template_data_details = _listSegment
        } else {
          this.form.template_data_details = JSON.parse(JSON.stringify(FORM_DEFAULT.template_data_details))
        }

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
        // 校验
        /*if () {

          }*/

        let api,
          json = {
            template_data: JSON.stringify(this.form.template_data),
            template_data_details: JSON.stringify(
              this.form.template_data_details
            ),
          };

        console.log(json);

        if (this.dialogData.param.id) {
          json.id = this.dialogData.param.id;
          api = this.ApiBasic.putSegment;
        } else {
          api = this.ApiBasic.postResource;
        }

        api(json).then((res) => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.dialogToggle();
          this.$parent.getData();
        });
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
