<template>
  <div class="tinymce">
    <editor id="tinymce" v-model="lookData.detail" :init="init"></editor>
    <div>
      <div class="imgInter" @click="showDialog()">插入图片</div>
    </div>
    <el-dialog
      title="插入图片"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      center
      :append-to-body="true"
      width="550px"
    >
      <el-form label-width="80px">
        <el-form-item label="图片">
          <el-upload
            action="/api/public/upload"
            :http-request="uploadFile"
            :on-remove="removeFile"
            :before-upload="beforeAvatarUploadImg"
            drag
            :on-exceed="handleExceed"
            multiple
            :limit="1"
            :file-list="form.imgList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传png或jpg文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="铺满">
          <el-switch v-model="form.big"></el-switch>
        </el-form-item>
        <el-form-item label="居中">
          <el-switch v-model="form.center"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="imgInter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/modern/theme";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/preview";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/media";

import { upload } from "@api/upload";

export default {
  name: "tinymce",
  props: ["lookData"],
  data() {
    return {
      radio: [],
      imageType: false,
      form: {
        imgList: [],
        big: false,
        weight: "",
        center: true,
      },
      show: "",
      dialogVisible: false,
      init: {
        toolbar:
          "bold italic underline strikethrough | fontselect | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | ",
        language: "zh_CN",
        language_url: "static/tinymce/langs/zh_CN.js",
        skin_url: "/static/tinymce/skins/lightgray",
        height: 500,
        plugins:
          "preview textpattern colorpicker lists code colorpicker fullpage textcolor wordcount contextmenu media",
        branding: false,
      },
    };
  },
  activated() {
    this.show = true;
  },
  deactivated() {},
  mounted() {},
  methods: {
    beforeAvatarUploadImg(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }

      return isJPG;
    },
    imgInter() {
      if (this.form.imgList.length < 1) {
        this.$message({
          type: "error",
          message: "请选择图片",
        });
        return false;
      }
      let ImageStyle = "";
      if (this.form.big) {
        ImageStyle += "width:100%;";
      } else {
        ImageStyle += "width:70%";
      }
      if (this.form.center) {
        ImageStyle = "display:block;margin:auto";
      }
      let str = `<img src="${this.form.imgList[0].url}" style="${ImageStyle}"/>`;
      tinymce.activeEditor.insertContent(str);
      this.dialogVisible = false;
    },
    uploadFile(a) {
      upload({ file: a.file, type: "local" }).then((res) => {
        this.$message({
          type: "success",
          message: "上传成功!",
        });
        this.form.imgList = [
          { name: res.name, url: process.env.MEDIA_URL + res.url },
        ];
      });
    },
    showDialog() {
      this.dialogVisible = true;
      this.form = {
        imgList: [],
        big: false,
        weight: "",
        center: true,
      };
    },
    insertContent(content) {
      if (!content) {
        //如果插入的内容为空则返回
        return;
      }
      let sel = null;
      if (document.selection) {
        //IE9以下
        sel = document.selection;
        sel.createRange().pasteHTML(content);
      } else {
        sel = document
          .getElementById("tinymce_ifr")
          .contentWindow.getSelection();
        if (sel.rangeCount > 0) {
          let range = sel.getRangeAt(0); //获取选择范围
          range.deleteContents(); //删除选中的内容
          let el = document.createElement("div"); //创建一个空的div外壳
          el.innerHTML = content; //设置div内容为我们想要插入的内容。
          let frag = document.createDocumentFragment(); //创建一个空白的文档片段，便于之后插入dom树

          let node = el.firstChild;
          let lastNode = frag.appendChild(node);
          range.insertNode(frag); //设置选择范围的内容为插入的内容
          let contentRange = range.cloneRange(); //克隆选区
          contentRange.setStartAfter(lastNode); //设置光标位置为插入内容的末尾
          contentRange.collapse(true); //移动光标位置到末尾
          sel.removeAllRanges(); //移出所有选区
          sel.addRange(contentRange); //添加修改后的选区
        }
      }
    },
    removeFile() {},
    handleExceed() {},
  },
  created: function () {
    tinymce.init({});
  },
  components: { Editor },
};
</script>
<style scoped lang="scss">
.tinymce {
  position: relative;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  /*.clear-both;*/
  .imgInter {
    position: absolute;
    display: inline-block;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
    top: 3px;
    left: 330px;
    box-shadow: none;
    filter: none;
    padding: 4px 6px;
    border: 1px solid transparent;
    line-height: 1.4;
    margin: 0 5px;
    &:hover {
      border-color: #e2e4e7;
      cursor: pointer;
    }
  }
}
</style>
