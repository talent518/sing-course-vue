<template>
  <el-dialog
    class="resource-dialog"
    top="5vh"
    width="1200px"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body
  >
    <div>
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        size="small"
        :loading="loading"
      >
        <el-form-item prop="id">
          <el-input v-model="form.id" style="display: none;"></el-input>
        </el-form-item>
        <el-form-item label="课节标题：" prop="title">
          <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="课节副标题：" prop="sub_title">
          <el-input v-model="form.sub_title" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="封面：" prop="cover">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="image/*"
            :show-file-list="false"
            :http-request="uploadFileCover"
            list-type="picture-card"
            multiple
          >
            <el-image
              style="width: 100%; height: 100%;"
              fit="contain"
              v-if="form.cover"
              :src="form.cover"
            >
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="教材模板：" prop="textbook_template_id">
          <el-select
            v-if="form.id == 0"
            v-model="form.textbook_template_id"
            filterable
            clearable
            placeholder="请选择模版"
            @change="handleTemplateChange"
          >
            <el-option
              v-for="item in listTemplateResource"
              :key="item.id"
              :label="item.code + ' ' + item.title"
              :value="item.id"
            >
              <span style="float: left;">{{ item.code }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px;">{{
                item.title
              }}</span>
            </el-option>
          </el-select>
          <label style="font-weight: bold;" v-else
            >({{ form.textbook_template_code }}){{
              form.textbook_template_name
            }}</label
          >
        </el-form-item>

        <el-form-item label="关联环节：" prop="segments">
          <div class="segment-card">
            <div
              v-for="(segement, index) in form.segments"
              class="card-item"
              :key="index"
            >
              <el-card shadow="hover" :body-style="{ padding: '12px' }">
                <div class="header">
                  <el-input
                    v-model="segement.title"
                    placeholder="标题"
                  ></el-input>
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
                  multiple
                >
                  <el-image
                    style="width: 100%; height: 100%;"
                    fit="cover"
                    v-if="segement.cover"
                    :src="segement.cover"
                  >
                  </el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-divider></el-divider>

                <el-button
                  @click="handleSegementLink(segement, index)"
                  type="default"
                  style="width: 100%;"
                >
                  关联内容
                </el-button>
              </el-card>
            </div>
          </div>
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
      :modal="false"
    >
      <component
        ref="segmentView"
        :is="segmentComponent"
        :payload="segmentData"
      ></component>
      <div slot="footer" v-if="dialogData.type !== 'view'">
        <el-button @click="handleSegmentCancel">取 消</el-button>
        <el-button type="primary" @click="handleSegmentSave">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import { upload } from "@api/upload";
import ResourceEditSegment from "@/views/resource/ResourceEditSegment";
import VideoSegment from "@/views/resource/segments/video";
import AudioSegment from "@/views/resource/segments/audio";
import EvaluationSegment from "@/views/resource/segments/evaluation";

export default {
  name: "ResourceDialog",
  components: {
    ResourceEditSegment,
    VideoSegment,
    AudioSegment,
    EvaluationSegment,
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
      form: {
        id: 0,
        title: "",
        sub_title: "",
        cover: "",
        textbook_template_id: "",
        textbook_template_code: "",
        textbook_template_name: "",
        segments: [],
      },
      title: "编辑教材",
      listSegment: [],
      listTemplateResource: [],
      segmentComponent: "",
      segmentDialogVisible: false,
      segmentData: {},
      loading: false,
    };
  },

  watch: {
    "dialogData.show"(val) {
      if (val) this.init();
    },
  },

  methods: {
    init() {
      if (this.dialogData.param.id === 0) {
        this.loading = true;
        this.ApiBasic.getResource({ scene: "all", status: 1 })
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
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    handleTemplateChange(value) {
      this.loading = true;
      let template = this.ApiBasic.getResourceById(value)
        .then((template) => {
          this.form.segments = [];
          template.items.forEach((e) => {
            this.form.segments.push({
              id: 0,
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
        })
        .catch(() => {
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
      }
      this.segmentData = item;
      this.segmentDialogVisible = true;
    },

    async uploadFileCover(e) {
      let res = await upload(e.file);
      this.form.cover = res.url;
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
          this.$refs.form.resetFields();
          this.dialogToggle();
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
          this.$refs.form.resetFields();
          this.dialogData.show = false;
          this.$parent.getData();
        });
      }
    },
    handleCancel() {
      this.$refs.form.resetFields();
      this.dialogData.show = false;
    },
    handleSegmentSave() {
      this.segmentDialogVisible = false;
      let newValue = this.$refs.segmentView.getFormData();
      let segmentIndex = undefined;
      this.form.segments.forEach((value, index) => {
        if (value.id === newValue.id || value.type === newValue.type) {
          segmentIndex = index;
          return false;
        }
      });
      this.form.segments[segmentIndex] = newValue;
      this.$refs.segmentView.restForm();
    },
    handleSegmentCancel() {
      this.segmentDialogVisible = false;
      this.$refs.segmentView.restForm();
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
