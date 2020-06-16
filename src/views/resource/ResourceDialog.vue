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
      <el-form :model="form" label-width="100px" size="small">
        <el-form-item label="课节标题：">
          <el-input
            v-model="form.textbook_data.title"
            placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="课节副标题：">
          <el-input
            v-model="form.textbook_data.sub_title"
            placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="封面：">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="image/*"
            :show-file-list="false"
            :http-request="uploadFileCover"
            list-type="picture-card"
            multiple>
            <el-image
              style="width: 100%; height: 100%;"
              fit="contain"
              v-if="form.textbook_data.cover"
              :src="form.textbook_data.cover">
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="form.textbook_data.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66">
          </el-switch>
        </el-form-item>

        <el-form-item label="教材模板：">
          <el-radio-group v-model="form.textbook_data.textbook_template_id" @change="templateResourceChange" style="margin-bottom: -10px;">
            <el-radio v-for="item in listTemplateResource" :label="item.id" border style="margin-right: 10px; margin-left: 0; margin-bottom: 10px;" :key="item.id">{{item.title}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="关联环节：">
          <div class="segment-card">
            <div
              v-for="(segement, index) in form.template_data_details"
              class="card-item">

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
                  :http-request="(file) => {return uploadFile(file, index);}"
                  list-type="picture-card"
                  multiple>
                  <el-image
                    style="width: 100%; height: 100%;"
                    fit="cover"
                    v-if="segement.cover"
                    :src="segement.cover">
                  </el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-divider></el-divider>

                <el-button @click="segementLink(segement, index)" type="default" style="width: 100%;">

                  关联内容
                </el-button>

              </el-card>

            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" v-if="dialogData.type !== 'view'">
      <el-button @click="dialogToggle">取 消</el-button>
      <el-button type="primary" @click="dialogSave">确 定</el-button>
    </div>

    <resource-dialog-segment :dialog-data="dialogSegmentData"></resource-dialog-segment>

  </el-dialog>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import {upload} from "@api/upload";
  import ResourceDialogSegment from "@/views/resource/ResourceDialogSegment"

  const FORM_DEFAULT = {
    textbook_data: {
      textbook_template_id: "",
      title: "",
      sub_title: "",
      cover: '',
      status: 1,
    },
    template_data_details: [
      {
        textbook_template_id: '',
        segment_template_id: "",
        lead_type: "",
        title: "",
        cover: "",
        id: '',
      },
    ],
    textbook_segment_data_details: [
      {
        segment_template_id: '',
        score_config_id: "",
        resources_content: {
          auto_play: '',
          urls: []
        },
      },
    ]
  };

  const SEGMENT_ITEM = {
    segment_template_id: "",
    lead_type: "",
    title: "",
    cover: "",
  };

  export default {
    name: "ResourceDialog",
    components: {ResourceDialogSegment},
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

        dialogSegmentData: {
          show: false,

        }
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

      /**
       * 获取所有 教材模板
       */
      async getTemplateResourceAll() {
        let res = await this.ApiBasic.getResource({scene: "all", status: 1});
        this.listTemplateResource = res.items;
        // 新增默认选中第一个
        if (this.dialogData.type == 'add') {
          this.form.textbook_template_id = res.items[0].id;
          this.form.textbook_data.textbook_template_id = res.items[0].id;
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
          // this.form.template_data_details[0].id =
        }

      },

      segementLink(item, itemIndex) {
        let type = this.dictoryObj.SegmentTypeEnum.find(i => {
          return i.key == item.lead_type
        }).value;
        // todo 优化
        this.dialogSegmentData = {
          show: true,
          type: this.dialogData.type,
          segementType: type,
          index: itemIndex,
          param: item
        }
      },

      async uploadFileCover(e) {
        let res = await upload(e.file);
        this.form.textbook_data.cover = res.url;
      },

      async uploadFile(e, index) {
        let res = await upload(e.file);
        this.form.template_data_details[index].cover = res.url;
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
          jsonOrg = {
            textbook_data: this.form.textbook_data,
            template_data_details: this.form.template_data_details,
            textbook_segment_data_details: this.form.textbook_segment_data_details
          },
          json = {
            textbook_data: JSON.stringify(this.form.textbook_data),
            template_data_details: JSON.stringify(this.form.template_data_details),
            textbook_segment_data_details: JSON.stringify(this.form.textbook_segment_data_details)
          };


        console.log(jsonOrg);

        if (this.dialogData.param.id) {
          json.id = this.dialogData.param.id;
          api = this.ApiResource.putResource;
        } else {
          api = this.ApiResource.postResource;
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
