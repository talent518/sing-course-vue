<template>
  <el-dialog
    class="template-resource-dialog"
    top="5vh"
    width="1200px"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body
  >
    <div>
      <el-form :model="form" label-width="100px" size="small">
        <el-form-item label="名称：">
          <el-input
            v-model="form.template_data.title"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="form.template_data.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66">
          </el-switch>
        </el-form-item>

        <el-form-item label="模板：">
          <el-select v-model="form.template_data.layout" placeholder="请选择">
            <!--<el-option label="横向大卡片" :value="1"></el-option>-->
            <el-option
              v-for="item in dictoryObj.TextbookTypeEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="过渡环节：">
          <el-radio-group v-model="form.template_data.is_excessive">
            <el-radio :label="1" border style="margin-right: 0;">是</el-radio>
            <el-radio :label="0" border>否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="关联环节：">
          <div class="segment-card">
            <div
              v-for="(segement, index) in form.template_data_details"
              class="card-item">
              <div class="card-item-header">
                <el-select
                  v-model="segement.segment_template_id"
                  placeholder="选择环节">
                  <el-option
                    v-for="item in listSegment"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>

                <el-button-group>
                  <el-button
                    type="default"
                    icon="el-icon-minus"
                    @click="segmentDel(index)"
                    :disabled="form.template_data_details.length < 2"></el-button>
                  <el-button
                    type="default"
                    icon="el-icon-plus"
                    @click="segmentAdd(index)"></el-button>
                </el-button-group>
              </div>

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

                <el-select
                  v-model="segement.lead_type"
                  placeholder="关联引导"
                  clearable>
                  <el-option
                    v-for="item in dictoryObj.SegmentLeadTypeEnum"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-card>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="辅助工具：">
          <el-checkbox-group v-model="form.template_data.template_data_tools">
            <el-checkbox style="display: block" v-for="(item,index) in dictoryObj.AssistToolEnum" :label="item.key" :key="index">{{item.value}}</el-checkbox>
          </el-checkbox-group>
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
    template_data: {
      title: "",
      layout: 1,
      status: 1,
      is_excessive: 1,
    },
    template_data_details: [
      {
        segment_template_id: "",
        lead_type: "",
        title: "",
        cover: "",
        template_data_tools:[]
      },
    ],
  };

  const SEGMENT_ITEM = {
    segment_template_id: "",
    lead_type: "",
    title: "",
    cover: "",
  };
  /*
      {
        "template_data":{
          "title":"这是教材标题",
          "layout":"教材模板类型：1：横向大卡片",
          "status":"状态 0：禁用，1：启用",
          "is_excessive":"是否存在过度环节 0：否，1：是'"
      },
        "template_data_details":[
        {
          "segment_template_id":1,
          "lead_type":"Video",
          "d_title":1,
          "cover":1
        },
        {
          "segment_template_id":1,
          "lead_type":"Video",
          "d_title":1,
          "cover":1
        }
      ]
      }*/

  export default {
    name: "TemplateResourceDialog",

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

        this.getSegmentAll();

        if (this.dialogData.type == "add") {
          this.title = "新增教材模板";
          this.form = JSON.parse(JSON.stringify(FORM_DEFAULT));
        } else if (this.dialogData.type == "edit") {
          this.title = "编辑教材模板";
          this.form = {
            template_data: this.dialogData.param,
            template_data_details: this.dialogData.param.template_data_details.length ? this.dialogData.param.template_data_details : FORM_DEFAULT.template_data_details,
          };
          this.form.template_data_details.forEach(e=>{
            if(e.lead_type == 0){
              e.lead_type = ''
            }
          })
        } else if (this.dialogData.type == "view") {
          this.title = "查看教材模板";
          this.form = {
            template_data: this.dialogData.param,
            template_data_details: this.dialogData.param.template_data_details.length ? this.dialogData.param.template_data_details : FORM_DEFAULT.template_data_details,
          };
        }
      },

      async getSegmentAll() {
        let res = await this.ApiBasic.getSegment({scene: "all", status: 1});
        this.listSegment = res.items;
      },

      segmentAdd(index) {
        this.form.template_data_details.splice(
          index + 1,
          0,
          JSON.parse(JSON.stringify(SEGMENT_ITEM))
        );
      },

      segmentDel(index) {
        this.form.template_data_details.splice(index, 1);
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
        if (!this.form.template_data.title) {
          this.$message({
            type: 'error',
            message: '请输入名称!'
          });
          return false;
        }

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
          api = this.ApiBasic.putResource;
        } else {
          api = this.ApiBasic.postResource;
        }

        api(json).then((res) => {
          this.dialogToggle();
          this.$parent.getData();
        });
      },
    },
  };
</script>

<style lang="scss">
  .template-resource-dialog {
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
          /*pointer-events: none;*/
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
