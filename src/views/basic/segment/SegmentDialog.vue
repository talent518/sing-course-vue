<template>

  <el-dialog
    class="segement-dialog"
    top="5vh"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body>
    <div>

      <el-form :model="form" label-width="80px" size="small">
        <el-form-item label="名称">
          <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66">
          </el-switch>
        </el-form-item>

        <el-form-item label="类别">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in SEGMENT_TYPE_ENUM"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="样式">
          <!--<el-upload
            :show-file-list="false"
            class="upload-item"
            action="/api/public/upload"
            list-type="text"
            :http-request="uploadFileVideo1Banner">
            <el-button><i class="iconfont icon-cloud-upload"></i> 上传音频</el-button>
          </el-upload>-->

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
    title: '',
    type: '',
    status: 1,
    preview_image: '',
  }

  export default {
    name: "SegmentDialog",

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
          this.title = '新增环节模板';
          this.form = JSON.parse(JSON.stringify(FORM_DEFAULT))
        } else if (this.dialogData.type == 'edit') {
          this.title = '编辑环节模板';
          this.form = this.dialogData.param
        } else if (this.dialogData.type == 'view') {
          this.title = '查看环节模板';
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
  .segment-dialog {

  }
</style>