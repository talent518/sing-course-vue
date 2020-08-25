<template>
  <el-dialog title="关联工具" :visible.sync="show" :before-close="beforeClose">
    <div>
      <div
        v-for="(item, index) in ProductToolTypeEnum"
        :key="index"
        class="m30"
      >
        <el-checkbox v-model="item.checked">{{ item.value }}</el-checkbox>
        <el-button
          class="relationBtn"
          @click="uploadContent"
          v-if="item.key == 1"
          type="default"
          >关联内容</el-button
        >
      </div>
    </div>
    <div>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="handleSegmentSave">保存</el-button>
    </div>
    <div>
      <el-dialog title="音视频" :visible.sync="childIsShow" append-to-body>
        <toolslink :payload="segmentData" ref="segmentView"></toolslink>
        <div slot="footer">
          <el-button @click="childIsShow = false">取 消</el-button>
          <el-button type="primary" @click="childIsShow = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </el-dialog>
</template>
<script>
let parentVal = {
  play_type: 1,
  tool_type: 2,
  resources: [
    {
      title: "",
      type: 0,
      type_text: "",
      url: "",
    },
  ],
};
//https://media.changchangenglish.com/course/847368d37b9166d723fc3ad51341a627fab414b8.mp4
import toolslink from "@/views/teach/product/toolslink";
export default {
  props: {
    // id 为product_id
    id: {
      type: [String, Number],
    },
  },
  components: { toolslink },
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
      let newValue =
        (this.$refs.segmentView && this.$refs.segmentView.getFormData()) ||
        this.segmentData;
      let arr = [];
      let tool_types = "";
      this.ProductToolTypeEnum.forEach((i) => {
        if (i.key == 1 && i.checked) {
          newValue.tool_type = i.key;
          tool_types += i.key;
          arr.push(newValue);
        } else if (i.key == 2 && i.checked) {
          tool_types += "," + i.key;
          arr.push(parentVal);
        }
      });
      arr.push({ tool_types });
      console.log(arr);
      this.$parent.ApiResource.postProduceTool(this.id, { tools: arr });
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
      this.ProductToolTypeEnum = ProductToolTypeEnum;
      d.forEach((i) => {
        for (let attr in ProductToolTypeEnum) {
          if (ProductToolTypeEnum[attr].value === i.tool_title) {
            ProductToolTypeEnum[attr].checked = true;
          }
        }
      });
      this.list = d;
      this.list.forEach((i) => {
        if (i.tool_type == 1) {
          this.segmentData = i;
        }
      });
      if (!this.segmentData.hasOwnProperty("resources")) {
        this.segmentData = { play_type: 1, resources: [] };
      }
    } else {
      console.error("您没有传值");
    }
  },
};
</script>
<style scoped>
.relationBtn {
  width: 200px;
  margin-left: 30px;
}
</style>
