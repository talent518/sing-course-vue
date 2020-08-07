<template>
  <div class="exercises">
      <!--<el-col :span="6">-->
      <!--  <div class="titleFlex">-->
      <!--    <div>标签：</div>-->
      <!--    <div>-->
      <!--      <el-input-->
      <!--        multiple-->
      <!--        placeholder="请选择标签"-->
      <!--        v-model="searchObj.title"-->
      <!--      />-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</el-col>-->
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-input v-model="searchObj.title"  placeholder="请输入配音标题"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="search" v-permission="'ExercisesView'">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-permission="'ExercisesCreate'" type="success" plain @click="handleAdd">添加习题</el-button>
      </el-form-item>
    </el-form>

    <my-table :data="list" v-loading="loading">
      <el-table-column
        v-for="item in cols"
        :key="item.prop"
        :prop="item.prop"
        :label="item.name"
      ></el-table-column>

      <el-table-column prop="title" label="配音素材">
        <template slot-scope="{ row }">
          <el-image :src="row.material_url"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="原生录音" prop="ori_sound">
        <template slot-scope="{ row }">
          <el-button type="primary" @click="openMediaBy(row)"
            >播放录音
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="dubbing_content" label="配音内容">
        <template slot-scope="{ row }">
          <div v-html="row.dubbing_content"></div>
        </template>
      </el-table-column>
      <el-table-column prop="dubbing_answer" label="配音答案">
        <template slot-scope="{ row }">
          <div v-html="row.dubbing_answer"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
		  v-permission="'ExercisesUpdate'"
            plain
            size="small"
            type="warning"
            @click="handleEdit(scope.row)"
            >编辑
          </el-button>
          <el-button
		   v-permission="'ExercisesDel'"
            plain
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </my-table>
    <page
      style="text-align: left;margin: 18px 0"
      :nowPage="searchObj.pageIndex"
      :total="searchObj.total"
      :limit="searchObj.pageSize"
      @pageChange="onPageChange"
      @sizeChange="onSizeChange"
    />
    <el-dialog
      :title="title"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <my-form
        class="textLeft"
        ref="myForm"
        label-width="150px"
      >
        <el-form-item label="配音标题：" prop="title">
          <el-input v-model="model.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="习题模板：">
          <el-select
            v-model="model.question_type"
            placeholder="请选择习题模板"
            clearable
          >
            <el-option
              v-for="item in dictoryObj.VoiceQuestionTypeEnum"
              :label="item.value"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>


        <template v-if="model.question_type">
          <el-form-item label="口型示范：" v-if="model.question_type === 2">
            <div class="upload-wrapper">
              <el-upload
                class="avatar-uploader"
                action="/api/public/upload"
                :show-file-list="false"
                :multiple="multiple"
                :on-success="handleAvatarSuccess"
                accept="video/mp4"
                :http-request="
              (file) => {
                return uploadFile(file, '3');
              }
            "
              >
                <div class="videoWrap">
                  <video style="width: 178px;height: 178px" v-if="model.mouth_video" :src="model.mouth_video" controls class="upload-video"></video>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>

            </div>
          </el-form-item>

          <el-form-item label="素材类型：">
            <el-select
              v-model="model.material_type"
              placeholder="请选择素材"
              clearable
            >
              <el-option
                v-for="item in dictoryObj.QuestionMaterialTypeEnum"
                :label="item.value"
                :value="item.key"
                :key="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="素材内容：">
            <el-upload
              class="avatar-uploader"
              action="/api/public/upload"
              :show-file-list="false"
              :multiple="multiple"
              :on-success="handleAvatarSuccess"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :http-request="
              (file) => {
                return uploadFile(file, '1');
              }
            "
            >
              <div class="imageWrap">
                <img
                  v-if="model.material_url"
                  :src="model.material_url"
                  class="avatar"
                />

                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="原声录音：" prop="ori_sound" v-if="model.question_type !== 2">
            <el-upload
              class="upload-demo"
              action="/api/public/upload"
              accept=".MP3,.APE,.AAC,.WAV,.mp3,.ape,.aac,.wav"
              :show-file-list="false"
              :http-request="
              (file) => {
                return uploadFile(file, '2');
              }
            "
            >
              <el-button size="small" type="primary">上传音频</el-button>
            </el-upload>
            <el-button
              size="small"
              v-if="model.ori_sound"
              type="success"
              @click="openMedia"
            >播放音频
            </el-button>
          </el-form-item>
          <el-form-item label="配音类型：" prop="dubbing_type">
            <el-select
              v-model="model.dubbing_type"
              placeholder="请选择配音类型"
              clearable
            >
              <el-option
                v-for="item in dictoryObj.DubbingTypeEnum"
                :label="item.value"
                :value="item.key"
                :key="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配音内容：" prop="dubbing_content">
            <!--<editor-detail v-if="dialogFormVisible" :lookData="desc" />-->
            <el-input type="textarea" v-model="model.dubbing_content"></el-input>
          </el-form-item>
          <el-form-item label="配音内容翻译：" prop="dubbing_content_tran" v-if="model.question_type === 1">
            <el-input v-model="model.dubbing_content_tran" placeholder="请输入翻译"></el-input>
          </el-form-item>
          <el-form-item label="配音答案：" prop="dubbing_answer">
            <el-input type="textarea" v-model="model.dubbing_answer"></el-input>
          </el-form-item>
        </template>

        <!--<el-form-item label="配音描述详情：" prop="dubbing_content_tran">-->
        <!--</el-form-item>-->
        <el-button type="success" @click="save('myForm')">保存</el-button>
      </my-form>
    </el-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import ScoreDialog from "@/views/basic/score/ScoreDialog";
import { upload } from "@api/upload";
import editorDetail from "@/components/editorDetail/editorDetail";
import page from "@/components/page/page";
export default {
  name: "Exercises",
  mixins: [commonMessage, menuRole],
  components: { ScoreDialog,editorDetail,page },
  data() {
    return {
      loading:false,
      title:'',
      searchObj: {
        title: "",
        total: 0,
        pageIndex: 1,
        pageSize: 5,
      },
      model: {
        title: "",
        material_type: "",
        material_url: "",
        dubbing_type: "",
        dubbing_content: "",
        dubbing_answer: "",
        question_type:'',
        mouth_video: "",
        ori_sound: "",
        dubbing_content_tran:'',
      },
      desc: {
        detail: "",
      },
      cols: [
        { name: "编号", prop: "code" },
        { name: "配音标题", prop: "title" },
        { name: "素材类型", prop: "material_typeV" },
        { name: "配音类型", prop: "dubbing_typeV" },
      ],
      cols1: [
        { name: "配音内容", prop: "ori_sound" },
        { name: "配音答案", prop: "" },
      ],
      list: [],
      state: 0,
      // rules: {
      //   title: [
      //     {
      //       required: true,
      //       message: "请输入配音标题",
      //       trigger: ["blur", "change"],
      //     },
      //   ],
      //   dubbing_type: [
      //     {
      //       required: true,
      //       message: "请输入配音类型",
      //       trigger: ["blur", "change"],
      //     },
      //   ],
      //   ori_sound: [
      //     {
      //       required: true,
      //       message: "请上传原声配音",
      //       trigger: ["blur", "change"],
      //     },
      //   ],
      //   dubbing_content: [
      //     {
      //       required: true,
      //       message: "请填写配音内容",
      //       trigger: ["blur", "change"],
      //     },
      //   ],
      //   dubbing_answer: [
      //     {
      //       required: true,
      //       message: "请填写配音答案",
      //       trigger: ["blur", "change"],
      //     },
      //   ],
      //   // dubbing_content_tran: [
      //   //   {
      //   //     required: true,
      //   //     message: "请填写配音描述详情",
      //   //     trigger: ["blur", "change"],
      //   //   },
      //   // ],
      // },
      multiple: false,
      isShowOpen: false,
    };
  },
  methods: {
    async uploadFile(e, type, index) {
      let res = await upload(e.file);
      if (type == 1) {
        this.model.material_url = res.url;
      } else if (type == 2) {
        this.model.ori_sound = res.url;
      }else if (type == 3) {
        this.model.mouth_video = res.url;
        this.$forceUpdate();
      }
    },
    async save() {
      let flag = false,obj=this.model
      Object.getOwnPropertyNames(obj).forEach(function(key){
          if(!obj[key]){
            if(key == 'dubbing_content_tran' || key == 'mouth_video' || key == 'ori_sound'){

            }else{
              flag = true
            }

          }
      })
      if(this.model.question_type === 1){
        if(!this.model.ori_sound){
          flag =true
        }
      }else if(this.model.question_type === 2){
        if(!this.model.mouth_video){
          flag =true
        }
      }else if(this.model.question_type === 3){
        if(!this.model.ori_sound){
          flag =true
        }
      }
      if (!flag) {
        let d = "";
        if (this.state == 0) {
          d = await this.addQuestion();
        } else {
          d = await this.editQuestion();
        }
        if (typeof d !== "number") {
          this.close();
          this.search();
        }
      } else {
        this.$message({
          type: "error",
          message: "请完善表单内容",
        });
        return false;
      }
    },

    onPageChange(val) {
      this.searchObj.pageIndex = val;
      this.getQuestion();
    },
    onSizeChange(val) {
      this.searchObj.pageIndex = 1;
      this.searchObj.pageSize = val;
      this.getQuestion();
    },

    openMedia() {
      window.open(this.model.ori_sound, "_blank");
    },
    openMediaBy({ ori_sound }) {
      window.open(ori_sound, "_blank");
    },
    async handleAvatarSuccess(res, file) {},
    async addQuestion() {
      let json = Object.assign(this.model);
      return await this.ApiCourse.postVoiceQuestions(json);
    },
    async editQuestion() {

      let json = Object.assign(this.model);
      console.log(json)
      return await this.ApiCourse.putVoiceQuestions(json);
    },
    async getQuestion() {
      this.loading = true
      const QuestionMaterialTypeEnum = this.dictoryObj.QuestionMaterialTypeEnum;
      const DubbingTypeEnum = this.dictoryObj.DubbingTypeEnum;
      let d = await this.ApiCourse.getVoiceQuestions(this.searchObj);

      d.items.forEach((o) => {
        QuestionMaterialTypeEnum.forEach((i) => {
          if (o.material_type == i.key) {
            o.material_typeV = i.value;
          }
        });
        DubbingTypeEnum.forEach((i) => {
          if (o.dubbing_type == i.key) {
            o.dubbing_typeV = i.value;
          }
        });
      });
      this.list = d.items;
      this.loading = false
      this.searchObj.total = d.total;
    },
    handleAdd() {
      this.title = '添加习题'
      this.state = 0;
      this.resetData();
      this.open();
    },
    resetData() {
      this.model = {
        title:'',
        material_type: "",
        material_url: "",
        dubbing_type: "",
        dubbing_content: "",
        dubbing_answer: "",
        question_type: "",
        // dubbing_content_tran: "", //配音详情中文描述
        mouth_video: "",
        ori_sound: "",
        dubbing_content_tran:'',
      };
      this.desc = {
        detail:''
      }
    },
    search() {
      this.searchObj.title = this.searchObj.title;
      this.searchObj.pageIndex = 1;
      this.getQuestion();
    },
    pageCurrentChange(index) {
      this.searchObj.index = index;
      this.getQuestion();
    },
    handleEdit(row) {
      this.title = '编辑习题'
      // Object.assign(this.model, row);
      this.model.id = row.id;
      this.model.title = row.title;
      this.model.material_type = row.material_type;
      this.model.material_url = row.material_url;
      this.model.dubbing_type = row.dubbing_type;
      this.model.dubbing_content = row.dubbing_content;
      this.model.dubbing_answer = row.dubbing_answer;
      this.model.question_type = row.question_type;
      this.model.mouth_video = row.mouth_video;
      this.model.ori_sound = row.ori_sound;
      this.model.dubbing_content_tran = row.dubbing_content_tran;

      let richText = {... this.model}.dubbing_content
      this.desc = {
        detail: richText,
      };
      this.open();
      this.state = 1;
      console.log(this.model)
    },
    async delQuestion(id) {
      return await this.ApiCourse.delVoiceQuestions(id);
    },
    handleDelete(id) {
      this.$confirm("确定要删除该习题吗", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let d = await this.delQuestion(id);
        this.getQuestion();
      });
    },
  },

  mounted() {
    this.getQuestion();
  },
};
</script>

<style lang="scss">
.titleFlex {
  display: flex;
  align-items: center;
  .title {
    width: 100px;
  }
}

.exercises {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .imageWrap {
    display: flex;
  }
  .upload-demo {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
