<template>
  <el-form ref="blendForm" :model="form" label-width="110px" size="small" class="resource-form">
    <el-form-item label="播放规则：">
      <el-select v-model="form.payload.auto_play" placeholder="请选择" style="width: 150px">
        <el-option
          v-for="item in dictoryObj.PlayStatusEnum"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="素材列表：">
      <el-button
        type="success" plain
        @click="handleAdd">新增素材
      </el-button>
    </el-form-item>

    <template v-for="(val,index) in form.payload.resources">

      <div class="resource-item">

        <el-form-item class="resource-item-index">
          <span>{{index + 1}}</span>
        </el-form-item>

        <!--如果不用el-form-item包起来，按钮的size不会跟着form设置的size变化-->
        <el-form-item class="resource-item-control">


          <!--<el-button-group>
            <span class="control-index">{{index + 1}}</span>
          </el-button-group>-->

          <el-button-group>
            <el-button :disabled="index == 0" @click="moveUp(index)"><i class="el-icon-top"></i></el-button>
            <el-button :disabled="index == form.payload.resources.length - 1" @click="moveDown(index)">
              <i class="el-icon-bottom"></i></el-button>
          </el-button-group>

          <el-button-group>
            <el-button plain type="success" @click="videoAdd(index)"><i class="el-icon-plus"></i></el-button>
            <el-button plain type="danger" @click="videoDelete(index)"><i class="el-icon-minus"></i></el-button>
          </el-button-group>
        </el-form-item>

        <el-form-item label="素材名称：">
          <el-input v-model="val.title" style="width: 150px" placeholder="请填写"></el-input>
        </el-form-item>

        <el-form-item label="播放格式：">
          <el-select v-model="val.type" placeholder="请选择" @change="stateUpdate" style="width: 150px">
            <el-option
              v-for="item in dictoryObj.BlendResourcesTypeEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key"></el-option>
          </el-select>
        </el-form-item>


        <!--视频模板-->
        <el-form-item label="视频：" v-if="val.type === 1">
          <cc-form-upload type="video" v-model="val.url"></cc-form-upload>
        </el-form-item>

        <!--音频模板-->
        <el-form-item label="音频：" v-if="val.type === 2">
          <cc-form-upload type="audio" v-model="val.url"></cc-form-upload>
        </el-form-item>
        <el-form-item label="封面：" v-if="val.type === 2">
          <cc-form-upload type="image" v-model="val.bg_image" tips="建议图片尺寸为：600 * 600px"></cc-form-upload>
        </el-form-item>

        <!--图文音模板-->
        <el-form-item label="图片：" v-if="val.type === 7">
          <cc-form-upload type="image" v-model="val.image"></cc-form-upload>
        </el-form-item>
        <el-form-item label="音频：" v-if="val.type === 7">
          <cc-form-upload type="audio" v-model="val.audio"></cc-form-upload>
        </el-form-item>
        <el-form-item label="文字：" v-if="val.type === 7" style="padding-right: 80px">
          <el-input type="textarea" v-model="val.text"></el-input>
        </el-form-item>

        <!--选择题模板-->
        <el-form-item label="题目图片：" v-if="val.type === 8">
          <cc-form-upload type="image" v-model="val.subject_image"></cc-form-upload>
        </el-form-item>
        <el-form-item label="正确答案：" v-if="val.type === 8">
          <el-checkbox-group v-model="val.answer" @change="checkChange">
            <el-checkbox label="A"></el-checkbox>
            <el-checkbox label="B"></el-checkbox>
            <el-checkbox label="C"></el-checkbox>
            <el-checkbox label="D"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

    </template>

  </el-form>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import {upload} from "@api/upload";

  const NEW_ITEM = {
    url: '',
    type: 1,
    title: '',
    image: '',
    audio: '',
    text: '',
    bg_image: '',
    subject_image:'',
    answer:[],
  };

  export default {
    name: "BlendSegment",
    components: {

    },
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
        checkList: []
      };
    },
    watch: {
      "payload.id": {
        handler() {
          this.form = this.payload;
          this.form.payload.auto_play =
            parseInt(this.form.payload.auto_play) || 1;
          // if(!this.form.payload.auto_play){
          //   this.form.payload.auto_play = 1
          // }
          if (!this.form.payload.resources) {
            this.form.payload.resources = []
          }
          this.$forceUpdate();
        },

        immediate: true,
      },
    },
    methods: {
      checkChange(val){
        console.log(this.form.payload.resources)
        this.$forceUpdate();
      },
      copy(json) {
        return JSON.parse(JSON.stringify(json))
      },

      moveUp(index) {
        let current = this.form.payload.resources[index];
        this.form.payload.resources.splice(index, 1);
        this.form.payload.resources.splice(index - 1, 0, current);
      },

      moveDown(index) {
        let current = this.form.payload.resources[index];
        this.form.payload.resources.splice(index, 1);
        this.form.payload.resources.splice(index + 1, 0, current);
      },

      handleAdd() {
        this.form.payload.resources.push(this.copy(NEW_ITEM))
        console.log(this.form.payload.resources)
        this.$forceUpdate();
      },

      videoAdd(i) {
        this.form.payload.resources.splice(i + 1, 0, this.copy(NEW_ITEM));
        this.$forceUpdate();
      },

      videoDelete(i) {
        this.form.payload.resources.splice(i, 1);
        this.$forceUpdate();
      },
      getFormData(callback) {

        // if (this.form.payload.resources && this.form.payload.resources.length) {
        //   this.form.payload.resources.forEach(val => {
        //     if (val.type == 3) {
        //       val.url = val.detail
        //     }
        //   })
        // }

        return this.form;
      },
      restForm() {
        return this.$refs.blendForm.resetFields();
      },
      stateUpdate() {
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
