<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import Vue from "vue";
  import {mapActions, mapGetters} from "vuex";
  import user from "@api/user";
  import other from "@api/other";
  import production from "@api/production";
  import menu from "@api/menu";
  import order from "@api/order";
  import report from "@api/report";
  import basic from "@api/basic"
  import base from "@api/base"
  import {cloneDeep} from "lodash";
  import dayjs from "dayjs";
  import {setStorage} from "@util/storage"

  export default {
    name: "app",

    data() {
      return {
        eventBus: new Vue(),
      };
    },

    computed: {},

    provide() {
      return {
        eventBus: this.eventBus,
        ApiUser: user,
        ApiOther: other,
        ApiProduction: production,
        ApiMenu: menu,
        ApiOrder: order,
        ApiReport: report,
        ApiBasic: basic,
        ApiBase: base,
        cloneDeep,
        dayjs,
      };
    },

    mounted() {
      this.getEnum();
    },

    methods: {
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
          enum: ['BooleanEnum', 'SegmentLeadTypeEnum', 'SegmentTypeEnum']
        }
        let data = await base.getEnum(param);

        setStorage('enum', data);
        console.log(data);
      }
    }
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
