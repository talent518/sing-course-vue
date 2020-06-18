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
    computed: {
    },
    methods: {
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
