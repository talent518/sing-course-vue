<template>
  <el-dialog
    class="resource-dialog"
    top="5vh"
    width="1200px"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body>
    <div>
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        size="small"
        :loading="loading">
        <el-form-item prop="id">
          <el-input v-model="form.id" style="display: none"></el-input>
        </el-form-item>
        <el-form-item label="教材标题：" prop="title" required>
          <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="教材副标题：" prop="sub_title">
          <el-input v-model="form.sub_title" placeholder="请输入"></el-input>
          <span><i class="el-icon-warning"></i> 仅在后台展示，用户端不可见</span>
        </el-form-item>

        <el-form-item label="封面：" prop="cover" required>

          <cc-form-upload
            v-model="form.cover"
            tips="建议图片尺寸为：600 * 600px"></cc-form-upload>

        </el-form-item>

        <el-form-item label="教材模板：" prop="textbook_template_id" required>
          <el-select
            v-if="form.id == 0"
            v-model="form.textbook_template_id"
            filterable
            clearable
            placeholder="请选择模版"
            @change="handleTemplateChange">
            <el-option
              v-for="item in listTemplateResource"
              :key="item.id"
              :label="item.code + ' ' + item.title"
              :value="item.id">
              <span style="float: left">{{ item.code }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{item.title}}</span>
            </el-option>
          </el-select>
          <label style="font-weight: bold" v-else>({{ form.textbook_template_code }}) {{ form.textbook_template_name }}</label>
        </el-form-item>

        <el-form-item label="关联环节：" prop="segments">
          <div class="segment-card">
            <div
              v-for="(segement, index) in form.segments"
              class="card-item"
              :key="index">
              <el-card shadow="hover" :body-style="{ padding: '12px' }">
                <div class="header">
                  <el-input
                    v-model="segement.title"
                    placeholder="标题"></el-input>
                </div>

                <el-divider></el-divider>

                <el-upload
                  class="upload-item"
                  action="/api/public/upload"
                  accept="image/*"
                  :show-file-list="false"
                  :http-request="
                    (file) => {
                      return uploadFile(file, index);
                    }
                  "
                  list-type="picture-card"
                  multiple>
                  <el-image
                    style="width: 100%; height: 100%"
                    fit="cover"
                    v-if="segement.cover"
                    :src="segement.cover">
                  </el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-divider></el-divider>

                <el-button
                  @click="handleSegementLink(segement, index)"
                  type="default"
                  style="width: 100%">关联内容
                </el-button>
              </el-card>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="辅助工具：" v-if="form.tools.length > 0">
          <template v-for="(item, index) in form.tools">
            <el-form-item :label="item.tool_title + ':'">
              <el-button
                @click="toolSegementLink(item, index)"
                type="default"
                style="width: 200px"
                v-if="item.tool_type != 3">关联内容
              </el-button>
            </el-form-item>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" v-if="dialogData.type !== 'view'">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
    <el-dialog
      title="编辑环节"
      :visible.sync="segmentDialogVisible"
      :modal="false">
      <component
        ref="segmentView"
        :is="segmentComponent"
        :payload="segmentData"></component>
      <div slot="footer" v-if="dialogData.type !== 'view'">
        <el-button @click="segmentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSegmentSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="辅助工具"
      :visible.sync="toolDialogVisible"
      :modal="false">
      <component
        ref="toolView"
        v-if="toolDialogVisible"
        :is="toolComponent"
        :payload="toolData"></component>
      <div slot="footer" v-if="dialogData.type !== 'view'">
        <el-button @click="toolDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleToolSave">确 定</el-button>
      </div>
    </el-dialog>

    <!--<tools-link :toolsData="toolsData" @emit="updateToolsData"></tools-link>-->
  </el-dialog>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import {upload} from "@api/upload";
import ResourceEditSegment from "@/views/resource/ResourceEditSegment";
import VideoSegment from "@/views/resource/segments/video";
import AudioSegment from "@/views/resource/segments/audio";
import EvaluationSegment from "@/views/resource/segments/evaluation";
import AudioandvideoSegment from "@/views/resource/segments/audioandvideo";
import ListentothepictureSegment from "@/views/resource/segments/listentothepicture";
import EatbiscuitsSegment from "@/views/resource/segments/eatbiscuits";
import LolacallSegment from "@/views/resource/segments/lolacall";
import ToolsLink from "@/views/resource/segments/toolslink";

const COVER = 'https://static-cdn.changchangenglish.com/course/e4e395e4b223fbcbbb27a0c91b8d9801001399b6.png',
  SUB_TITLE = '仅在后台展示，用户端不可见';

export default {
  name: "ResourceDialog",
  components: {
    ResourceEditSegment,
    VideoSegment,
    AudioSegment,
    EvaluationSegment,
    AudioandvideoSegment,
    ListentothepictureSegment,
    EatbiscuitsSegment,
    LolacallSegment,
    ToolsLink,
  },
  mixins: [commonMessage],

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
      coverSnapshot: '', // 封面快照（用于标识之前是否有cover）
      form: {
        id: 0,
        title: "",
        sub_title: '',
        cover: "",
        textbook_template_id: "",
        textbook_template_code: "",
        textbook_template_name: "",
        segments: [],
        tools: [],
      },
      title: "编辑教材",
      listSegment: [],
      listTemplateResource: [],
      segmentComponent: "",
      toolComponent: "",
      segmentDialogVisible: false,
      toolDialogVisible: false,
      segmentData: {},
      toolData: {},
      loading: false,
      toolsData: {
        show: false,
        obj: {},
        index: "",
      },
    };
  },

  watch: {
    "dialogData.show"(val) {
      if (val) this.init();
      else this.$refs.form.resetFields();
    },
    segmentDialogVisible(val) {
      if (!val) this.$refs.segmentView.restForm();
    },
  },

  methods: {
    init() {
      if (this.dialogData.param.id === 0) {
        this.loading = true;
        this.title = '新增教材';
        this.form.tools = [];
        this.form.cover = COVER;
        this.coverSnapshot = '';
        this.ApiBasic.getResource({scene: "all", status: 1})
          .then((res) => {
            this.listTemplateResource = res.items;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.loading = true;
        this.ApiResource.getResourceById(this.dialogData.param.id)
          .then((res) => {
            this.form = res;

            this.coverSnapshot = res.cover;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },

    // updateToolsData(val){
    //   console.log(val)
    //   this.form.tools[val.index] = val.obj
    // },

    handleTemplateChange(value) {
      this.loading = true;

      // todo 这里有逻辑问题（如果已经有cover是否要）
      // 通过 coverSnapshot 是否可用解决？
      if (!this.coverSnapshot) {
        let cover = this.listTemplateResource.find(i => {
          return i.id == value
        }).cover;
        this.form.cover = cover || COVER
      }

      let template = this.ApiBasic.getResourceById(value).then((template) => {
        this.form.segments = [];
        this.form.tools = template.tools;
        template.items.forEach((e, index) => {
          this.form.segments.push({
            id: index,
            cover: e.cover,
            lead_type: e.lead_type,
            segment_id: 0,
            segment_template_id: e.segment_template_id,
            title: e.title,
            type: e.segment_type,
            payload: e.payload,
          });
        });
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },

    handleSegementLink(item, itemIndex) {
      switch (item.type) {
        case 1:
          this.segmentComponent = VideoSegment;
          break;
        case 2:
          this.segmentComponent = AudioSegment;
          break;
        case 3:
          this.segmentComponent = EvaluationSegment;
          break;
        case 5:
          this.segmentComponent = AudioandvideoSegment;
          break;
        case 6:
          this.segmentComponent = ListentothepictureSegment;
          break;
        case 7:
          this.segmentComponent = EatbiscuitsSegment;
          break;
      }
      this.segmentData = item;
      this.segmentDialogVisible = true;
    },

    toolSegementLink(item, itemIndex) {
      switch (item.tool_type) {
        case 1:
          this.toolComponent = ToolsLink;
          break;
        case 2:
          this.toolComponent = ToolsLink;
          break;
        case 4:
          this.toolComponent = LolacallSegment;
          break;
      }
      this.toolData = item;
      this.toolDialogVisible = true;
    },

    handleToolsLink(val, index) {
      this.toolsData.show = true;
      this.toolsData.obj = val;
      this.toolsData.index = index;
    },

    async uploadFile(e, index) {
      let res = await upload(e.file);
      this.form.segments[index].cover = res.url;
    },

    openMedia(url) {
      window.open(url, "_blank");
    },

    handleSave() {
      // 校验
      if (!this.form.title) {
        this.$message({
          type: "error",
          message: "请输入标题!",
        });
        return false;
      }

      if (!this.form.cover) {
        this.$message({
          type: "error",
          message: "请上传封面!",
        });
        return false;
      }
      if (this.form.id == 0) {
        this.ApiResource.postResource(this.form).then((res) => {
          if (JSON.stringify(res) === "{}") {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
          this.dialogData.show = false;
          this.$parent.getData();
        });
      } else {
        this.ApiResource.putResource(this.form).then((res) => {
          if (JSON.stringify(res) === "{}") {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
          this.dialogData.show = false;
          this.$parent.getData();
        });
      }
    },
    handleCancel() {
      this.dialogData.show = false;
      this.$parent.getData();
    },
    handleSegmentSave() {
      let newValue = this.$refs.segmentView.getFormData(),
        flag = false;
      if (newValue.type == 5) {
        newValue.payload.resources.forEach((e) => {
          Object.getOwnPropertyNames(e).forEach(function (key) {
            if (key == "type_text") {
            } else {
              if (!e[key]) {
                flag = true;
              }
            }
          });
        });
        if (flag) {
          this.$message({
            type: "error",
            message: "请完善每一项的内容！",
          });
          return false;
        }
      }
      this.segmentDialogVisible = false;
      let segmentIndex = undefined;
      this.form.segments.forEach((value, index) => {
        if (value.id === newValue.id && value.type === newValue.type) {
          segmentIndex = index;
          return false;
        }
      });
      this.form.segments[segmentIndex] = newValue;
    },
    handleToolSave() {
      let newValue = this.$refs.toolView.getFormData();
      this.toolDialogVisible = false;
      let segmentIndex = undefined;
      this.form.tools.forEach((value, index) => {
        if (value.tool_type === newValue.tool_type) {
          segmentIndex = index;
          return false;
        }
      });
      let jsonStr = JSON.stringify(newValue);
      let a = JSON.parse(jsonStr);
      this.form.tools[segmentIndex] = a;
      this.$refs.toolView.restForm();
    },
  },
};
</script>

<style lang="scss">
.resource-dialog {
  .segment-card {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -6px;
    /*width: 100%;*/

    .card-item {
      box-sizing: border-box;
      flex-shrink: 0;
      flex-grow: 0;
      margin-bottom: 12px;
      padding: 0 6px;
      width: 20%;

      .card-item-header {
        display: flex;
        margin-bottom: 12px;
        .el-select {
          flex-grow: 0;
        }

        .el-button-group {
          margin-left: 12px;
          flex-shrink: 0;
          .el-button {
            padding-left: 11px;
            padding-right: 11px;
          }
        }
      }

      .el-divider--horizontal {
        margin: 12px -12px;
        width: auto;
        background-color: #ebeef5;
      }

      .upload-item {
        display: flex;
        justify-content: center;
        .el-upload--picture-card {
          overflow: hidden;
          position: relative;
          width: 100px;
          height: 100px;
          /*line-height: 100px;*/
          border-radius: 50%;
          .avatar-uploader-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
