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
  import {cloneDeep} from "lodash";
  import dayjs from "dayjs";

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
        cloneDeep,
        dayjs,
      };
    },
  };
</script>
<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
