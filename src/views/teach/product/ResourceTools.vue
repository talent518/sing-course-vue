<template>
  <el-dialog class="resource-tool-dialog" title="关联工具" :visible.sync="show" :before-close="beforeClose">
    <div>
      <div
        v-for="(item, index) in ProductToolTypeEnum"
        :key="index"
        class="m30 resource-tool-item">
        <el-checkbox v-model="item.checked">{{ item.value }}</el-checkbox>

        <!--家长须知需要关联内容-->
        <el-button
          v-if="item.key == 1"
          @click="uploadContent"
          class="relationBtn"
          type="default">关联内容
        </el-button>

        <cc-form-upload
          v-if="item.key == 2"
          v-model="item.url"
          tips="建议图片尺寸为：750 * 1128px"></cc-form-upload>

      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="handleSegmentSave">保存</el-button>
    </div>

    <div>
      <el-dialog title="音视频" :visible.sync="childIsShow" append-to-body>
        <toolslink :payload="segmentData" ref="segmentView"></toolslink>
        <div slot="footer">
          <el-button @click="childIsShow = false">取 消</el-button>
          <el-button type="primary" @click="childIsShow = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </el-dialog>
</template>
<script>
//https://media.changchangenglish.com/course/847368d37b9166d723fc3ad51341a627fab414b8.mp4
import toolslink from "@/views/teach/product/toolslink";

export default {
  props: {
    // id 为product_id
    id: {
      type: [String, Number],
    },
  },
  components: {toolslink},
  data() {
    return {
      show: true,
      list: [],
      childIsShow: false,
      segmentData: {},
      ProductToolTypeEnum: [],
      rules: {
        play_type: [
          {
            required: true,
            message: "请选择播放规则",
          },
        ],
      },
      model: {
        play_type: "",
        tool_type: "",
      },
    };
  },
  methods: {
    handleSegmentSave() {
      let newValue = (this.$refs.segmentView && this.$refs.segmentView.getFormData()) || this.segmentData;
      let arr = [];
      let tool_types = "";
      this.ProductToolTypeEnum.forEach((i) => {
        if (i.key == 1 && i.checked) {
          newValue.tool_type = i.key;
          tool_types += i.key;
          arr.push(newValue);
        } else if (i.key == 2 && i.checked) { // 毕业证书
          debugger
          let o2 = this.list.find((item) => item.tool_type == i.key);
          if (o2) {
            arr.push(o2);
          } else {
            arr.push({
              play_type: 1,
              tool_type: 2,
              resources: [{
                title: "",
                type: 0,
                type_text: "",
                url: this.ProductToolTypeEnum.find(i => i.key == 2).url || "",
              },],
            });
          }
          tool_types += "," + i.key;
        }
      });
      arr.push({tool_types});
      debugger
      this.$parent.ApiResource.postProduceTool(this.id, {tools: arr});
      this.cancel();
      this.$parent.init();
    },
    cancel() {
      this.$emit("closeTools");
    },
    beforeClose(done) {
      done();
      this.cancel();
    },
    uploadContent() {
      this.childIsShow = true;
    },
  },
  async mounted() {
    if (this.id) {
      let d = await this.$parent.auxiliaryTool(this.id);
      let {
        ProductToolTypeEnum,
        PlayStatusEnum,
        ResourcesTypeEnum,
      } = this.$parent.dictoryObj;
      ProductToolTypeEnum = JSON.parse(JSON.stringify(ProductToolTypeEnum));
      ProductToolTypeEnum.forEach((i) => {
        i.checked = false;
      });
      ProductToolTypeEnum;
      d.forEach((i) => {
        for (let attr in ProductToolTypeEnum) {
          if (ProductToolTypeEnum[attr].value === i.tool_title) {
            ProductToolTypeEnum[attr].checked = true;
          }
        }
      });

      ProductToolTypeEnum.forEach(val => {
        // 毕业证书增加url
        if (val.key == 2) {
          val.url = val.url || 'https://media.changchangenglish.com/new-sing/deaba9b74efe6a26d6c0d06584d80b19a60ed10b.png'
        }
      })

      this.ProductToolTypeEnum = ProductToolTypeEnum;

      this.list = d;
      this.list.forEach((i) => {
        if (i.tool_type == 1) {
          this.segmentData = i;
        }
      });
      if (!this.segmentData.hasOwnProperty("resources")) {
        this.segmentData = {play_type: 1, resources: []};
      }
    } else {
      console.error("您没有传值");
    }
  },
};
</script>
<style lang="scss">
.resource-tool-dialog {
  .relationBtn {
    width: 200px;
  }

  .resource-tool-item {
    display: flex;

    .el-checkbox {
      margin-right: 20px;
    }
  }

}
</style>
