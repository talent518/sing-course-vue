<template>
  <el-dialog
    class="resource-view-dialog"
    top="5vh"
    width="370px"
    title="请使用“唱唱启蒙英语APP”扫码预览"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body>
    <img v-show="qrcode" :src="qrcode" />
  </el-dialog>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";

export default {
  name: "ResourceDialog",
  components: {},
  mixins: [commonMessage],

  props: {
    dialogData: {
      type: Object,
      default: {
        show: false,
        type: "",
        param: {
          id: 0,
        },
      },
    },
  },

  data() {
    return {
      qrcode: '',
    };
  },

  watch: {
    "dialogData.show"(val) {
      if (val) this.init();
      else this.qrcode = '';
    },
  },

  methods: {
    init() {
      this.ApiResource.getQrcodeById(this.dialogData.param.id).then((res) => {
        this.qrcode = res;
      });
    }
  }
};
</script>

<style lang="scss">
  .resource-view-dialog{
    .el-dialog {min-width:370px;}
  }
</style>
