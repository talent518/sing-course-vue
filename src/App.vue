<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import Vue from "vue";
  import {mapActions, mapGetters, mapMutations} from "vuex";
  import user from "@api/user";
  import basic from "@api/basic";
  import base from "@api/base";
  import course from "@api/course";
  import {cloneDeep} from "lodash";
  import dayjs from "dayjs";
  import teach from "@api/teach";
  import resource from "@api/resource";

  export default {
    name: "app",

    data() {
      return {
        eventBus: new Vue(),
        o: {},
      };
    },

    computed: {},

    provide() {
      return {
        eventBus: this.eventBus,
        ApiUser: user,
        ApiBasic: basic,
        ApiResource: resource,
        ApiBase: base,
        ApiCourse: course,
        ApiTeach: teach,
        cloneDeep,
        dayjs,
        dictoryObj: this.dictoryObj,
      };
    },

    mounted() {
      this.getEnum();
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
            "BaseStatusEnum",
            "VoiceQuestionTypeEnum",
            "PlaySortStatusEnum",
            "AssistToolEnum",
            "TextbookTypeEnum",
            "SegmentMaterialTypeEnum",
            "ResourcesTypeEnum",
          ],
        };
        let o = {};
        let data = await base.getEnum(param);
        data.forEach((item) => {
          o[item.name] = item.items;
        });
        this.set_dictoryObj(o);
      },
    },
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
