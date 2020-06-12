<template>

  <el-dialog
    class="segement-dialog"
    top="5vh"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body>
    <div>

      <el-form :model="form" label-width="100px" size="small">
        <el-form-item label="环节模板名称">
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

        <el-form-item label="环节模板类别">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in SEGMENT_TYPE_ENUM"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="环节模板样式">
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
            :show-file-list="false"
            :http-request="uploadFile"
            list-type="picture-card"
            multiple>
            <img v-if="form.preview_image" :src="form.preview_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>

    </div>
    <div slot="footer">
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

    computed: {
      /*SEGMENT_TYPE_ENUM() {
        return getEnum('SegmentTypeEnum')
      }*/
    },

    watch: {
      'dialogData.show'(val) {
        if (val) this.init();
      }
    },

    methods: {
      init() {
        if (!this.dialogData.param.id) {
          this.title = '新增';
          this.form = JSON.parse(JSON.stringify(FORM_DEFAULT))
        } else {
          this.title = '编辑';
          this.form = this.dialogData.param
        }
      },


      uploadFile(e) {
        upload(e.file).then(res => {
          console.log('!!!!', res);
          // this.fileList.push(res)
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

        let json = {
          title: '评分标准名',
          rule: JSON.stringify(this.form.rule),
          evaluate_voice: JSON.stringify(this.form.evaluate_voice),
          retry_voice: this.form.retry_voice,
        }


      },

    }

  }
</script>

<style lang="scss">
  .segment-dialog {

  }
</style>