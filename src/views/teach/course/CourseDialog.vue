<template>
  <div class="course-dialog">
    <el-dialog
      width="800px"
      :title="dialogObj.name"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form :model="form" ref="form" size="small" label-width="100px">
        <!--<div class="form-section">-->
        <!--  <div class="form-section-content form-col-2">-->

        <el-form-item label="课程类目">
          <el-select
            v-model="form.category"
            placeholder="请选择"
            style="width: 200px;"
          >
            <el-option
              v-for="(data, index) in dictoryObj.ProductCategoryTypeEnum"
              :key="index"
              :label="data.value"
              :value="data.key"
            ></el-option>
          </el-select>
        </el-form-item>

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

        <el-form :model="musicForm" ref="musicForm" size="small" label-width="100px" :rules="musicRules" v-if="form.category==1">
          <div class="form-section">
            <div class="form-section-content form-col-1">
              <el-form-item label="适合宝宝" required prop="number9">
                <el-input
                  placeholder="请输入"
                  v-model="musicForm.number9"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="学习目标" required prop="number10">
                <el-input
                  placeholder="请输入"
                  v-model="musicForm.number10"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-content form-col-2">
              <el-form-item label="经典音乐" required prop="number1">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number1"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="配乐故事" required prop="number2">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number2"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="亲子游戏" required prop="number3">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number3"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="电子绘本" required prop="number4">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number4"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="音乐技能" required prop="number5">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number5"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="律动舞蹈" required prop="number6">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number6"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="乐器认知" required prop="number7">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number7"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="音乐知识" required prop="number8">
                <el-input
                  placeholder="请输入正整数"
                  v-model="musicForm.number8"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>

        <el-form :model="artForm" ref="artForm" size="small" label-width="100px" :rules="artRules" v-if="form.category==2">
          <div class="form-section">
            <div class="form-section-content form-col-1">
              <el-form-item label="适合宝宝" required prop="number9">
                <el-input
                  placeholder="请输入"
                  v-model="artForm.number9"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="学习目标" required prop="number10">
                <el-input
                  placeholder="请输入"
                  v-model="artForm.number10"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-content form-col-2">
              <el-form-item label="感知名作" required prop="number1">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number1"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="艺术家" required prop="number2">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number2"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="美术故事" required prop="number3">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number3"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="艺术知识" required prop="number4">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number4"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="亲子制作" required prop="number5">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number5"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="艺术手法" required prop="number6">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number6"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="百科知识" required prop="number7">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number7"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="综合材料" required prop="number8">
                <el-input
                  placeholder="请输入正整数"
                  v-model="artForm.number8"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
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
      },
      musicForm:{
        number1:'',
        number2:'',
        number3:'',
        number4:'',
        number5:'',
        number6:'',
        number7:'',
        number8:'',
        number9:'',
        number10:'',
      },
      artForm:{
        number1:'',
        number2:'',
        number3:'',
        number4:'',
        number5:'',
        number6:'',
        number7:'',
        number8:'',
        number9:'',
        number10:'',
      },
      musicRules: {
        number1: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number2: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number3: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number4: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number5: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number6: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number7: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number8: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number9: [{required: true, message: '请输入'}],
        number10: [{required: true, message: '请输入'}],
      },
      artRules: {
        number1: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number2: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number3: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number4: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number5: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number6: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number7: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number8: [{required: true, message: '请输入正整数',validator: validpatchStarOnce}],
        number9: [{required: true, message: '请输入'}],
        number10: [{required: true, message: '请输入'}],
      },
    };
  },
  methods: {
    //提交表单内容
    sub() {
      if(this.form.category==1){
        this.$refs['musicForm'].validate((valid) => {
          if (valid) {
            console.log('music success')
            // this.preserve()
          }
        })
      }else if(this.form.category==2){
        this.$refs['artForm'].validate((valid) => {
          if (valid) {
            console.log('art success')
            // this.preserve()
          }
        })
      }else{
        // this.preserve()
        console.log('success2')
      }


    },

    preserve(){
      let api,
        form = this.form,
        json = {
          title: form.title,
          sub_title: form.sub_title,
          status: form.status,
          cover: form.cover,
          textbook_number: form.textbook_number,
        };

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
        api = this.ApiTeach.putCourseAPi;
      } else {
        api = this.ApiTeach.postCourseApi;
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
    },

  },
  watch: {
    "dialogObj.show"(value) {
      if (value) {
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
            };
          }
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
