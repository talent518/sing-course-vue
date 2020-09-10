<template>
  <div class="product-dialog">
    <el-dialog
      width="800px" top="4vh"
      :title="dialogObj.name"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body>
      <el-form :model="form" ref="form" size="small" label-width="100px">

        <el-form-item label="产品标题" required>
          <el-input
            placeholder="请输入"
            v-model="form.title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="产品副标题">
          <el-input
            placeholder="请输入"
            v-model="form.sub_title"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="课程类型" required>
          <el-select
            v-model="form.layout"
            filterable
            clearable
            placeholder="请选择"
            style="width: 200px;"
          >
            <el-option
              v-for="(data, index) in dictoryObj.CourseTypeEnum"
              :key="index"
              :label="data.value"
              :value="data.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品封面" required>
          <el-upload
            class="upload-item"
            action="/api/public/upload"
            accept="image/*"
            :show-file-list="false"
            :http-request="uploadFile"
            list-type="picture-card"
            multiple>

            <div
              v-if="form.cover"
              class="upload-item-image">
              <div class="mask"><i class="iconfont icon-cloud-upload"></i></div>
              <el-image
                style="width: 100%; height: 100%;"
                fit="contain"
                :src="form.cover"></el-image>
            </div>

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span><i class="el-icon-warning"></i> 建议图片尺寸为：546 * 342px</span>
        </el-form-item>

        <el-form-item label="生产成本" required>
          <el-input
            class="unit_price"
            placeholder="请填写单节教材的价格"
            v-model="form.unit_price"
            clearable
            @change="changeNumber"
          ></el-input>
        </el-form-item>

        <el-form-item label="产品说明">
          <editor-detail v-if="dialogObj.show" :lookData="form.desc"/>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogObj.show = false"
        >取 消</el-button
        >
        <el-button size="small" type="primary" @click="sub">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {upload} from "@api/upload";
import Teach from "@/views/common/teach";
import editorDetail from "@/components/editorDetail/editorDetail";
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";

const COVER = 'https://static-cdn.changchangenglish.com/course/c6ae41dd961f24a72c0d407e8510cdfec6a3684c.png';

export default {
  mixins: [Teach, commonMessage, menuRole],
  name: "ProductDialog",
  components: {editorDetail},
  props: ["dialogObj"],
  data() {
    return {
      form: {
        title: "", //课程标题
        sub_title: "", //课程副标题
        cover: COVER, //课程封面
        layout: "", //布局类型
        unit_price: "", //教材单价
        desc: {
          detail: "",
        },
      },
    };
  },
  methods: {
    //提交表单内容
    sub() {
      let api,
        form = this.form,
        json = {
          title: form.title,
          sub_title: form.sub_title,
          cover: form.cover,
          layout: form.layout,
          unit_price: form.unit_price,
          content: form.desc.detail,
        };

      if (!form.title) {
        this.$message({
          type: 'error',
          message: '请输入标题!'
        });
        return false;
      }
      if (!form.layout) {
        this.$message({
          type: 'error',
          message: '请选择布局类型!'
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
      if (!form.unit_price) {
        this.$message({
          type: 'error',
          message: '请填写单节教材的价格!'
        });
        return false;
      }

      if (this.dialogObj.type == 2) {
        json.id = this.dialogObj.id;
        api = this.ApiTeach.putProductAPi;
      } else {
        api = this.ApiTeach.postProductApi;
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

    uploadFile(e) {
      upload(e.file).then((res) => {
        this.form.cover = res.url;
      });
    },
    changeNumber() {
      this.form.unit_price = this.form.unit_price.replace(/[^0-9.]/g, "").trim()

    }
  },
  watch: {
    "dialogObj.show"(value) {
      if (value) {
        this.$nextTick(() => {
          this.form.title = "";
          this.form.sub_title = "";
          this.form.cover = COVER;
          this.form.layout = "";
          this.form.unit_price = "";
          this.form.desc = {detail: ""};
          if (this.dialogObj.type == 2) {
            this.form = {
              title: this.dialogObj.title,
              sub_title: this.dialogObj.sub_title,
              cover: this.dialogObj.cover,
              unit_price: this.dialogObj.unit_price,
              layout: this.dialogObj.layout,
            };
            let richText = {...this.dialogObj}.content;
            this.form.desc = {
              detail: richText,
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
.product-avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.product-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.product-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.product-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.unit_price {
  width: 200px;
}

/*}*/
</style>
