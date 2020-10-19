<template>
  <div class="course-dialog">
    <el-dialog
      width="800px"
      :title="dialogObj.name"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form :model="form" ref="form" size="small" label-width="100px" >
        <!--<div class="form-section">-->
        <!--  <div class="form-section-content form-col-2">-->

        <!--<el-form-item label="课程类目">-->
        <!--  <el-select-->
        <!--    v-model="form.category"-->
        <!--    placeholder="请选择"-->
        <!--    style="width: 200px;"-->
        <!--  >-->
        <!--    <el-option-->
        <!--      v-for="(data, index) in dictoryObj.ProductCategoryTypeEnum"-->
        <!--      :key="index"-->
        <!--      :label="data.value"-->
        <!--      :value="data.key"-->
        <!--    ></el-option>-->
        <!--  </el-select>-->
        <!--</el-form-item>-->

        <el-form-item label="课程标题" required>
          <el-input
            placeholder="请输入"
            v-model="form.title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="课程副标题">
          <el-input
            placeholder="请输入"
            v-model="form.sub_title"
            clearable></el-input>
          <span><i class="el-icon-warning"></i> 用户端可见，请填写月主题英文</span>
        </el-form-item>

        <!--<el-form-item label="教材数">
          <el-input
            placeholder="请输入"
            v-model="form.textbook_number"
            clearable
          ></el-input>
        </el-form-item>-->

        <el-form-item label="课程封面" required>
          <cc-form-upload
            v-model="form.cover"
            tips="建议图片尺寸为：600 * 600px"></cc-form-upload>
        </el-form-item>

        <!--<el-form :model="musicForm" ref="musicForm" size="small" label-width="100px">-->
          <div class="form-section">
            <div class="form-section-content form-col-2">

              <el-form-item label="周数" required>
                <el-input
                  placeholder="请输入"
                  v-model="form.weeks"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="课节数" required>
                <el-input
                  placeholder="请输入"
                  v-model="form.lessons"
                  clearable
                ></el-input>
              </el-form-item>

              <template v-for="(item,index) in properties">
                <el-form-item :label="item.label" required>
                  <el-input
                    placeholder="请输入"
                    v-model="item.value"
                    clearable
                  ></el-input>
                </el-form-item>
              </template>
            </div>
          </div>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogObj.show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="sub">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {upload} from "@api/upload";
import Teach from "@/views/common/teach";

const COVER = 'https://static-cdn.changchangenglish.com/course/1e89746fad68128ea9711e30e5852051fbffb989.png',
  SUB_TITLE = '用户端可见，请填写月主题英文';

export default {
  mixins: [Teach],
  name: "CourseDialog",
  props: ["dialogObj"],
  data() {
    const validpatchStarOnce = (rule, value, callback) => {
      if (!/^\+?[1-9]\d*$/.test(value)) {
        callback(new Error('只能输入大于0的正整数'));
      } else {
        callback();
      }
    };
    return {
      form: {
        category:0,//课程类目
        title: "", //课程标题
        sub_title: '', //课程副标题
        cover: COVER, //课程封面
        status: 0, //状态
        textbook_number: "", //教材数
        weeks:'',
        lessons:'',
      },
      // rules:{
      //   number1: [{required: true, message: '请输入'}],
      //   number2: [{required: true, message: '请输入'}],
      //   number3: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //   number4: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //   number5: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //   number6: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //   number7: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //   number8: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //   number9: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //   number10: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
      //
      // },
      properties: []
    };
  },
  methods: {
    //提交表单内容
    sub() {
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {
          let api,
            form = this.form,
            json = {
              title: form.title,
              sub_title: form.sub_title,
              status: form.status,
              cover: form.cover,
              textbook_number: form.textbook_number,
              weeks: form.weeks,
              lessons: form.lessons,
              properties:[]
            };

          this.properties.forEach(e=>{
            json.properties.push({key:e.key,value:e.value});
          })
          if (!form.title) {
            this.$message({
              type: 'error',
              message: '请输入标题!'
            });
            return false;
          }
          if (!form.cover) {
            this.$message({
              type: 'error',
              message: '请上传课程封面!'
            });
            return false;
          }

          if (this.dialogObj.type == 2) {
            json.id = this.dialogObj.id;
            api = this.ApiTeach.putMusicCourseAPi;
          } else {
            api = this.ApiTeach.postMusicCourseApi;
          }

          api(json).then((res) => {
            if (JSON.stringify(res) === '{}') {
              this.$message({
                type: "success",
                message: "保存成功",
              });
            }
            this.$emit("reflash");
            this.dialogObj.show = false;
          });
        }
    //   })
    //
    // },
  },
  watch: {
    "dialogObj.show"(value) {
      if (value) {
        let properties = [], o = {};
        // debugger;
        // this.dialogObj.properties.forEach(e=>{
        //   o[e.key] = e.value;
        // });
        // this.dictoryObj.CourseMusicPropertiesEnum.forEach(e=>{
        //   properties.push({label:e.value,key:e.key,value:(e.key in o) ? o[e.key] : ''});
        // })
        // this.properties = properties;
        this.$nextTick(() => {
          this.form.title = "";
          this.form.sub_title = '';
          this.form.cover = COVER;
          this.form.status = 1;
          if (this.dialogObj.type == 2) {
            this.form = {
              title: this.dialogObj.title,
              sub_title: this.dialogObj.sub_title,
              cover: this.dialogObj.cover || COVER,
              status: this.dialogObj.status,
              textbook_number: this.dialogObj.textbook_number,
              weeks: this.dialogObj.weeks,
              lessons: this.dialogObj.lessons,
            };
            this.dialogObj.properties.forEach(e=>{
              o[e.key] = e.value;
            });
          }
          this.dictoryObj.CourseMusicPropertiesEnum.forEach(e=>{
            properties.push({label:e.value,key:e.key,value:(e.key in o) ? o[e.key] : ''});
          })
          this.properties = properties;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
/*.course-dialog {*/
.course-avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.course-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.course-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.course-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/*}*/
</style>
