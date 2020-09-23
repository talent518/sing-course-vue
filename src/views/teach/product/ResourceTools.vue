<template>
  <el-dialog class="resource-tool-dialog" title="关联工具" :visible.sync="show" :before-close="beforeClose">
    <div>
      <div
        v-for="(item, index) in toolsList"
        :key="index"
        class="m30 resource-tool-item">
        <el-checkbox v-model="item.checked">{{ item.value }}</el-checkbox>

        <!--家长须知需要关联内容-->
        <el-button
          v-if="item.key == 1"
          @click="uploadContent"
          class="relationBtn"
          plain
          type="success">关联内容
        </el-button>

        <cc-form-upload
          v-if="item.key == 2"
          v-model="item.resources[0].url"
          tips="建议图片尺寸为：750 * 1128px"></cc-form-upload>

      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="handleSegmentSave">保存</el-button>
    </div>

    <div>
      <el-dialog title="音视频" :visible.sync="childIsShow" append-to-body top="4vh" width="800px">
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
      toolsList: [],
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

    /**
     * 结构
     */
    /*[{
      "tool_title": "家长须知",
      "play_type": 1,
      "tool_type": 1,
      "resources": [{
        "id": 77,
        "title": "哈哈哈哈",
        "type": 2,
        "type_text": "毕业证书",
        "url": "https://media.changchangenglish.com/course/124bbab2455b3668c7798b801dac5862.mp3"
      }]
    }, {
      "tool_title": "毕业证书",
      "play_type": 1,
      "tool_type": 2,
      "resources": [{"id": 75, "title": "", "type": 0, "type_text": "", "url": ""}]
    }, {
      "tool_types": "1,2"
    }]*/

    async handleSegmentSave() {
      let newValue = (this.$refs.segmentView && this.$refs.segmentView.getFormData()) || this.segmentData;
      let arr = [];
      /*this.toolsList.forEach((i) => {
        if (i.checked) {
          i.resources.map(v => {
            v.tool_type = i.key
          });
          arr.push(i);
        }
      });*/
      // console.log('save', arr);
      console.log('save', arr);
      this.$parent.ApiResource.postProduceTool(this.id, {tools: this.toolsList}).then(res => {
        this.$message.success("修改成功");
        this.cancel();
        this.$parent.init();
      });
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

      let {ProductToolTypeEnum} = this.$parent.dictoryObj,
        toolsList = JSON.parse(JSON.stringify(ProductToolTypeEnum)); // 用枚举构造列表

      /*ProductToolTypeEnum.forEach((i) => {
        i.checked = false;
      });*/

      let toolsData = await this.$parent.auxiliaryTool(this.id); // 已保存的数据

      toolsList.forEach(val => {

        let toolItem = toolsData.find(i => i.tool_type == val.key);
        if (toolItem) { // 手动合并
          val.checked = toolItem.checked || false;
          val.play_type = toolItem.play_type;
          val.tool_title = toolItem.tool_title;
          val.tool_type = toolItem.tool_type;
          val.resources = toolItem.resources;
        } else { // 添加默认值
          val.checked = false;
          val.play_type = 1;
          val.tool_title = val.value;
          val.tool_type = val.key;
          val.resources = [{
            title: "",
            type: 0,
            type_text: "",
            url: "",
          }];
        }

      })

      toolsList.forEach((i) => {
        if (i.tool_type == 1) {
          this.segmentData = i;
        } else if (i.tool_type == 2) {
          i.resources[0].url = i.resources[0].url || 'https://static-cdn.changchangenglish.com/course/79105504a51cc43633b32615f584d429.png'
        }
      });

      this.toolsList = toolsList;

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
  .resource-tool-item {
    display: flex;

    .el-checkbox {
      margin-right: 20px;
    }
  }
}
</style>
