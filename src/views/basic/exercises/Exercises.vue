<template>
  <div class="exercises">
    <el-row>
      <el-col :span="6">
        <div class="titleFlex">
          <div class="title">配音标题：</div>
          <div>
            <el-input v-model="searchObj.title" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="titleFlex">
          <div>标签：</div>
          <div>
            <el-input
              multiple
              placeholder="请选择标签"
              v-model="searchObj.title"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button type="success" plain @click="handleAdd">添加习题</el-button>
      </el-form-item>
    </el-form>

    <my-table :data="list">
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
            plain
            size="small"
            type="warning"
            @click="handleEdit(scope.row)"
            >编辑
          </el-button>
          <el-button
            plain
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </my-table>
    <el-pagination
      class="m20"
      background
      layout="prev, pager, next,total"
      :total="searchObj.total"
      :page-size="searchObj.pageSize"
      @current-change="pageCurrentChange"
      :current-page.sync="searchObj.pageIndex"
    ></el-pagination>
    <el-dialog
      title="制作兑换码"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <my-form
        :rules="rules"
        :model="model"
        class="textLeft"
        ref="myForm"
        label-width="150px"
      >
        <el-form-item label="配音标题：" prop="title">
          <el-input v-model="model.title" placeholder="请输入标题"></el-input>
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
        <el-form-item label="配音素材">
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
        <el-form-item label="原声录音：" prop="ori_sound">
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
        <el-form-item label="配音内容：" prop="dubbing_content"></el-form-item>
        <el-form-item label="配音答案：" prop="dubbing_answer"></el-form-item>
        <el-form-item label="配音描述详情：" prop="dubbing_content_tran">
        </el-form-item>
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

export default {
  name: "Exercises",
  mixins: [commonMessage, menuRole],
  components: { ScoreDialog },
  data() {
    return {
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
        ori_sound: "",
        dubbing_type: "",
        dubbing_content: "<p class='red'>1234</p>",
        dubbing_answer: "123",
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
      rules: {
        title: [
          {
            required: true,
            message: "请输入配音标题",
            trigger: ["blur", "change"],
          },
        ],
        dubbing_type: [
          {
            required: true,
            message: "请输入配音类型",
            trigger: ["blur", "change"],
          },
        ],
        ori_sound: [
          {
            required: true,
            message: "请上传原声配音",
            trigger: ["blur", "change"],
          },
        ],
        dubbing_content: [
          {
            required: true,
            message: "请填写配音内容",
            trigger: ["blur", "change"],
          },
        ],
        dubbing_answer: [
          {
            required: true,
            message: "请填写配音答案",
            trigger: ["blur", "change"],
          },
        ],
        dubbing_content_tran: [
          {
            required: true,
            message: "请填写配音描述详情",
            trigger: ["blur", "change"],
          },
        ],
      },
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
      }
      // if (type == "retry_voice") {
      //   this.form.retry_voice = res.url;
      // } else if (type == "evaluate_voice") {
      //   this.form.evaluate_voice.splice(index, 1, res.url);
      // }
    },
    save(formName) {
      this.$refs[formName].$children[0].validate(async (valid) => {
        if (valid) {
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    openMedia() {
      window.open(this.model.ori_sound, "_blank");
    },
    openMediaBy({ ori_sound }) {
      window.open(ori_sound, "_blank");
    },
    async handleAvatarSuccess(res, file) {},
    async addQuestion() {
      return await this.ApiCourse.postVoiceQuestions(this.model);
    },
    async editQuestion() {
      return await this.ApiCourse.putVoiceQuestions(this.model);
    },
    async getQuestion() {
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

      this.searchObj.total = d.total;
    },
    handleAdd() {
      this.state = 0;
      this.resetData();
      this.open();
    },
    resetData() {
      this.model = {
        title: "",
        material_type: "",
        material_url: "",
        ori_sound: "",
        dubbing_type: "",
        dubbing_content: "<p class='red'>1234</p>",
        dubbing_answer: "123",
        dubbing_content_tran: "123", //配音详情中文描述
      };
    },
    search() {
      this.searchObj.title = "";
      this.searchObj.pageIndex = 1;
      this.getQuestion();
    },
    pageCurrentChange(index) {
      this.searchObj.index = index;
      this.getQuestion();
    },
    handleEdit(row) {
      Object.assign(this.model, row);
      this.open();
      this.state = 1;
    },
    async delQuestion(id) {
      return await this.ApiCourse.delVoiceQuestions(id);
    },
    handleDelete(id) {
      this.$confirm("确定要删除该问题吗", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let d = await this.delQuestion(id);
        console.log(d);
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
