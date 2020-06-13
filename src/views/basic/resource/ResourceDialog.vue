<template>

  <el-dialog
    class="resource-dialog"
    top="5vh"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body>
    <div>

      <el-form :model="form" label-width="100px" size="small">
        <el-form-item label="名称：">
          <el-input v-model="form.template_data.title" placeholder="请输入"></el-input>
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
            <el-option label="横向大卡片" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="过渡环节：">
          <el-radio-group v-model="form.template_data.is_excessive">
            <el-radio :label="1" border style="margin-right: 0;">是</el-radio>
            <el-radio :label="0" border>否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="关联环节：">

          <el-card class="segment-card" shadow="hover" :body-style="{ padding: '12px' }">
            <div slot="header" class="clearfix">
              <el-input v-model="form.template_data_details[0].d_title" placeholder="标题"></el-input>
            </div>

            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="image/*"
              :show-file-list="false"
              :http-request="uploadFile"
              list-type="picture-card"
              multiple>
              <el-image
                style="width: 100%; height: 100%"
                fit="contain"
                v-if="form.preview_image"
                :src="form.preview_image">
              </el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-card>


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
  import commonMessage from "@/views/common/commonMessage"
  import menuRole from "@/views/common/menuRole"
  import {upload} from "@api/upload"
  import {getEnum} from "@util/storage"

  const FORM_DEFAULT = {
    template_data: {
      title: '',
      layout: 1,
      status: 1,
      is_excessive: 1,
    },
    template_data_details: [
      {
        segment_template_id: 0,
        lead_type: "",
        d_title: '',
        cover: ''
      },
    ]
  }
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
    name: "ResourceDialog",

    mixins: [commonMessage, menuRole],

    props: {
      dialogData: {
        type: Object,
        default: {
          show: false,
          type: '',
          param: {
            id: 0
          }
        }
      }
    },

    data() {
      return {
        title: '',

        SEGMENT_TYPE_ENUM: getEnum('SegmentTypeEnum'),

        form: JSON.parse(JSON.stringify(FORM_DEFAULT))
      }
    },

    watch: {
      'dialogData.show'(val) {
        if (val) this.init();
      }
    },

    methods: {
      init() {
        if (this.dialogData.type == 'add') {
          this.title = '新增教材模板';
          this.form = JSON.parse(JSON.stringify(FORM_DEFAULT))
        } else if (this.dialogData.type == 'edit') {
          this.title = '编辑教材模板';
          this.form = this.dialogData.param
        } else if (this.dialogData.type == 'view') {
          this.title = '查看教材模板';
          this.form = this.dialogData.param
        }
      },


      uploadFile(e) {
        upload(e.file).then(res => {
          this.form.preview_image = res.url
        })
      },

      openMedia(url) {
        console.log('media url', url);
        window.open(url, '_blank')
      },

      dialogToggle() {
        this.dialogData.show = !this.dialogData.show
      },

      dialogSave() {

        // 校验
        /*if () {

        }*/


        let
          api,
          form = this.form,
          json = {
            title: form.title,
            type: form.type,
            status: form.status,
            preview_image: form.preview_image,
          };

        if (this.dialogData.param.id) {
          json.id = this.dialogData.param.id;
          api = this.ApiBasic.putSegment;
        } else {
          api = this.ApiBasic.postSegment;
        }

        api(json).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          });
          this.dialogToggle();
          this.$parent.getData();
        })

      },

    }

  }
</script>

<style lang="scss">
  .resource-dialog {
    .segment-card {
      width: 25%;
    }
  }
</style>