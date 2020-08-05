<template>
  <el-form ref="listentothepictureForm" :model="form" label-width="120px" class="listentothepictureForm">
    <el-form-item label="背景图片：">
      <el-upload
        class="avatar-uploader"
        action="/api/public/upload"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
        :http-request="
              (file) => {
                return uploadFile(file, '1');
              }
            "
      >
        <div class="imageWrap">
          <img
            v-if="form.payload.bg_image"
            :src="form.payload.bg_image"
            class="avatar"
          />

          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </el-upload>
    </el-form-item>


    <template>
      <el-form-item label="素材内容：">
        <el-button
          type="success"
          plain
          @click="handleAdd"
        >新增</el-button>
        <div class="upload-wrapper"  v-for="(val,index) in form.payload.resources.resources">
          <el-upload
            style="margin-right: 60px"
            class="upload-item"
            action="/api/public/upload"
            accept="audio/mp3"
            :show-file-list="false"
            :http-request=" (file) => {
                return uploadFile(file, '2',index);
              }"
            list-type="picture-card"
            multiple
          >
            <template v-if="val.audio">
              <div
                class="video-wrapper"
              >
                <audio :src="val.audio" controls class="upload-audio"></audio>

              </div>
            </template>
            <i v-else>上传音频</i>
          </el-upload>

          <el-upload
            class="avatar-uploader"
            action="/api/public/upload"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :http-request="
              (file) => {
                return uploadFile(file, '3',index);
              }
            "
          >
            <div class="imageWrap">
              <img
                v-if="val.image"
                :src="val.image"
                class="avatar"
              />

              <i v-else>上传图片</i>
            </div>
          </el-upload>
          <el-button
            @click.stop="contentDelete(index)"
            style="width: 60px;height: 30px;text-align: center;line-height: 30px;padding: 0;margin-left: 10px"
          >删除</el-button
          >
        </div>
      </el-form-item>
    </template>
    <el-form-item label="播放规则：">
      <el-select v-model="form.payload.play_sort" placeholder="请选择">
        <el-option
          v-for="item in dictoryObj.PlaySortStatusEnum"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import { upload } from "@api/upload";

  export default {
    name: "ListentothepictureSegment",
    mixins: [commonMessage, menuRole],
    props: {
      payload: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        form: {
          id: 0,
          template_id: 0,
          payload: {},
        },
      };
    },
    watch: {
      "payload.id": {
        handler() {
          this.form = this.payload;
          this.form.payload.play_sort =
            parseInt(this.form.payload.play_sort) || 2;
          // if(!this.form.payload.play_sort){
          //   this.form.payload.play_sort = 2
          // }
          if(!this.form.payload.resources.resources){
            this.form.payload.resources.resources = []
          }
        },
        immediate: true,
      },
    },
    methods: {

      handleAdd(){
        this.form.payload.resources.resources.push({audio:'',image:''})
        this.$forceUpdate();
      },

      async uploadFile(e,type,i) {
        let res = await upload(e.file);
        if(type == 1){
          this.form.payload.bg_image = res.url;
        }else if(type == 2){
          this.form.payload.resources.resources[i].audio = res.url
        }else if(type == 3){
          this.form.payload.resources.resources[i].image = res.url
        }
        this.$forceUpdate();
      },
      contentDelete(i) {
        this.form.payload.resources.resources.splice(i, 1);
        this.$forceUpdate();
      },
      getFormData(callback) {
        return this.form;
      },
      restForm() {
        return this.$refs.listentothepictureForm.resetFields();
      },
    },
  };
</script>

<style lang="scss">
  .listentothepictureForm{
    .avatar {
      width: 148px;
      height: 148px;
      display: block;
    }
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
      .upload-audio{

      }
      .imageWrap{
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        cursor: pointer;
        line-height: 146px;
        vertical-align: top;
        font-size: 28px;
        color: #8c939d;
        font-style: normal!important;
      }
    }
  }

</style>
