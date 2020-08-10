<template>
  <el-dialog
    class="resource-dialog"
    top="5vh"
    width="1200px"
    title="音视频"
    :visible.sync="toolsData.show"
    :close-on-click-modal="false"
    append-to-body
  >
  <el-form ref="toolslinkForm" :model="form" label-width="120px">
    <el-form-item label="播放规则：">
      <el-select v-model="form.obj.play_type" placeholder="请选择">
        <el-option
          v-for="item in dictoryObj.PlayStatusEnum"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="素材列表：">
      <el-button
        type="success"
        plain
        @click="handleAdd"
      >新增教材</el-button
      >
    </el-form-item>

    <template v-for="(val,index) in form.obj.resources">

      <el-form-item label="素材名称：">
        <el-input v-model="val.title" style="width: 216px" placeholder="请填写素材名称"></el-input>
      </el-form-item>

      <el-form-item label="播放格式：">
        <el-select v-model="val.type" placeholder="请选择" @change="stateUpdate">
          <el-option

            v-for="item in dictoryObj.ResourcesTypeEnum"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="视频：" v-if="val.type === 1" style="margin-bottom: 44px">
        <div class="upload-wrapper">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="video/mp4"
            :show-file-list="false"
            :http-request=" (file) => {
                return uploadFile(file, index);
              }"

            list-type="picture-card"
            multiple
          >
            <template v-if="val.url">
              <div
                class="video-wrapper"
              >
                <video :src="val.url" controls class="upload-video"></video>

              </div>
            </template>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button
            @click.stop="videoDelete(index)"
            style="position: absolute; top: 150px;"
          >删除</el-button
          >
        </div>
      </el-form-item>

      <el-form-item label="音频：" v-if="val.type === 2" style="margin-bottom: 44px">
        <div class="upload-wrapper">
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="audio/mp3"
            :show-file-list="false"
            :http-request="(file) => {
                return uploadFile(file, index);
              }"
            list-type="picture-card"
            multiple
          >
            <template v-if="val.url">
              <div
                class="video-wrapper"
              >
                <audio :src="val.url" controls class="upload-audio"></audio>

              </div>
            </template>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button
            @click.stop="videoDelete(index)"
            style="position: absolute; top: 150px;"
          >删除</el-button
          >
        </div>
      </el-form-item>

    </template>

  </el-form>
    <div slot="footer">
      <el-button @click="toolsData.show = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import { upload } from "@api/upload";

  export default {
    name: "toolslink",
    mixins: [commonMessage, menuRole],
    props: {
      toolsData: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        form: {
          obj: {},
        },
      };
    },
    watch: {
      "toolsData.show"(val) {
          if(val){
            console.log(this.toolsData)
            this.form = this.toolsData;
            this.form.obj.play_type =
              parseInt(this.form.obj.play_type) || 1;

            if(!this.form.obj.resources){
              this.form.obj.resources = []
            }else{
              this.form.obj.resources.forEach(e=>{
                if(e.type == 0){
                  e.type == 1
                }
              })
            }
            this.$forceUpdate();
          }
      },
    },
    methods: {
      handleSave(){
        let flag = false
        console.log(this.form)
        this.form.obj.resources.forEach(e=>{
          Object.getOwnPropertyNames(e).forEach(function(key){
            if(key == 'type_text'){

            }else{
              if(!e[key]){
                flag = true
              }
            }
          })
        })
        if(flag){
          this.$message({
            type: "error",
            message: "请完善每一项的内容！",
          });
          return false
        }
        this.$emit('emit', this.form)
        this.toolsData.show = false
      },

      handleAdd(){
        this.form.obj.resources.push({type:'',url:'',title:''})
        this.$forceUpdate();
      },

      async uploadFile(e,i) {
        let that = this
        let res = await upload(e.file);
        that.form.obj.resources[i].url = res.url
        that.$forceUpdate();

      },
      videoDelete(i) {
        this.form.obj.resources.splice(i, 1);
        this.$forceUpdate();
      },
      getFormData(callback) {
        return this.form;
      },
      restForm() {
        return this.$refs.toolslinkForm.resetFields();
      },
      stateUpdate(){
        this.$forceUpdate();
      },
    },
  };
</script>

<style lang="scss">
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
</style>
