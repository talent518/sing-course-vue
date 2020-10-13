<template>
  <div id="app">
    <router-view v-if="isShow"></router-view>
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
        isShow:false
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
            "ProductToolTypeEnum",
            "TextbookToolTypeEnum",
            "ProductCategoryTypeEnum",
          ],
        };
        let o = {};
        let data = await base.getEnum(param);
        data.forEach((item) => {
          o[item.name] = item.items;
        });
        if(data.length){
          this.isShow = true;
        }

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

  .form-section {
    /*margin-bottom: 20px;*/
    /*padding: 0 20px;*/

    + .form-section {
      margin-top: 20px;
    }

    .form-section-title {
      position: relative;
      padding: 0 15px 15px;
      line-height: 16px;
      font-size: 16px;
      font-weight: bold;
      color: #333333;

      &:before {
        content: '';
        position: absolute;
        left: 4px;
        top: 1px;
        z-index: 10;
        height: 14px;
        width: 2px;
        border-radius: 1px;
        background-color: #409EFF;
      }
    }

    .form-section-content {
      padding: 20px 20px 5px;
      background-color: #F5F7FA;
      border-radius: 5px;

      .form-section-title-inner.form-section-title-inner {
        margin: -5px 0 12px;
        width: 100%;
        font-weight: bold;

        .el-form-item__label {
          /*color: #007fff;*/
          color: #1f8fff;
        }
      }

      .el-select,
      .el-input,
      .el-cascader,
      .el-date-editor {
        width: 100%;
      }
    }
  }

  .form-col-1 {
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
      flex-shrink: 0;
      width: 100%;
    }
  }

  .form-col-2 {
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
      flex-shrink: 0;
      width: 50%;
    }
  }
</style>
