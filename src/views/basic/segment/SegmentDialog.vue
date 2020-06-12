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
            active-value="1"
            inactive-value="0"
            active-color="#13ce66">
          </el-switch>
        </el-form-item>

        <el-form-item label="环节模板状态">
          <el-select v-model="model" placeholder="请选择">
            <el-option :label="item.label" :value="item.value"></el-option>
            <el-option :label="item.label" :value="item.value"></el-option>

          </el-select>
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

  const FORM_DEFAULT = {
    title: '',
    type: '',
    status: '1',
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
        if (!this.dialogData.param.id) {
          this.title = '新增';
          this.form = JSON.parse(JSON.stringify(FORM_DEFAULT))
        } else {
          this.title = '编辑';
          this.form = this.dialogData.param
        }
      },


      uploadFileVideo1Banner(a) {
        upload('http://admin.test.changchangenglish.com/api/public/upload/zone', {
          file: a.file,
          type: 'local'
        }).then(res => {
          console.log('!!!!', res);
          /*res.url = process.env.MEDIA_URL + res.url;
          this.fileList.push(res)*/
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