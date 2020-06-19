<template>
  <main :class="$style.container">
    <el-container class="w100 h100">

      <el-aside :width="sideBarWidth" class="app-aside">
        <div :class="$style.logo">
          <img src="~@assets/image/login/logo1.png">
        </div>
        <el-row class="tac" span="24">
          <Menu></Menu>
        </el-row>
      </el-aside>

      <el-container>
        <AppMain/>
      </el-container>
    </el-container>
  </main>
</template>
<script>
  import AppMain from "@/views/AppMain";
  import Menu from "@/components/menu/Menu";
  import {mapActions, mapGetters} from "vuex";
  import base from "@api/base"
  import user from "@api/user"
  import other from "@api/other"
  import production from "@api/production"
  import menu from "@api/menu"
  import order from "@api/order"
  import report from "@api/report"
  import basic from "@api/basic"
  import resource from "@api/resource"
  import course from "@api/course"
  import teach from "@api/teach"
  import {mapMutations} from "vuex";

  const sideBarWidth = "240px";
  export default {
    name: "mainPage",
    data() {
      return {
        sideBarWidth,
      };
    },
    components: {
      AppMain,
      Menu,
    },
    computed: {},

    provide() {
      return {
        dictoryObj: this.dictoryObj,
      };
    },

    mounted() {
      // this.getEnum();
    },

    methods: {

      ...mapMutations("course", {
        set_dictoryObj: "set_dictoryObj",
      }),

      /*
       * BooleanEnum  是否
       * DubbingTypeEnum  配音类型
       * ElementTypeEnum  课程元素类型
       * EvaluationSwitchTypeEnum  评测切换方式
       * QuestionMaterialTypeEnum  评测素材类型
       * SegmentLeadTypeEnum  环节引导类型
       * SegmentTypeEnum  环节类型
       * */
      async getEnum() {
        let param = {
          enum: [
            "BooleanEnum",
            "DubbingTypeEnum",
            "ElementTypeEnum",
            "EvaluationSwitchTypeEnum",
            "QuestionMaterialTypeEnum",
            "SegmentLeadTypeEnum",
            "SegmentTypeEnum",
            "CourseTypeEnum",
            "PlayStatusEnum",
          ],
        };
        let o = {};
        let data = await base.getEnum(param);
        data.forEach((item) => {
          o[item.name] = item.items;
        });
        this.set_dictoryObj(o);
      },

      handleOpen() {
      },
      handleClose() {
      },
    }
  };
</script>
<style lang="scss" module>
  .container {
    height: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    height: 64px;
    color: #ffffff;
    font-size: 36px;

    img {
      height: 40px;
    }
  }
</style>
