<template>
  <section :class="$style.container" class="w100 h100">
    <header class="app-header">
      <el-dropdown class="user-dropdown" trigger="click">
        <div class="user-dropdown-link">
          <img class="avatar" src="~@assets/image/avatar.png" />
          {{ userInfo.name }}
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
          <el-dropdown-item @click.native="goOut">
            <i class="iconfont icon-logout"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>

    <!-- <keep-alive> -->
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view class="app-main"></router-view>
    </transition>
    <!-- </keep-alive> -->
  </section>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import {getStorage} from "@util/storage";
  import config from "@/config";

  export default {
    name: "AppMain",
    data() {
      return {
        size: "large",
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters['user/userInfo'];
      }
    },
    methods: {
      goOut() {
        this.$store.dispatch("user/logout").then(() => {
          window.location.replace(`${config.ssoUrl}site/sso?isLogout=1&url=${encodeURIComponent(window.location.href)}`);
        });
      },
    },
  };
</script>

<style lang="scss">
.app-main {
  padding: 16px;
  height:calc(100% - 64px);
  overflow: scroll;
}

.app-header {
  position: relative;
  z-index: 100;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .user-dropdown {
    height: 100%;
    cursor: pointer;
    transition: background-color 240ms;

    &:hover {
      background-color: #f5f5f5;
    }

      .user-dropdown-link {
        padding: 0 16px;
        display: flex;
        align-items: center;
        height: 100%;
        .avatar {
          margin-right: 12px;
          width: 24px;
        }
      }
    }
  }

.el-dropdown-menu.user-dropdown-menu {
  margin-top: 8px !important;
  padding: 6px 0;
}
</style>

<style lang="scss" module>
.container {
  flex: 1;
    overflow: hidden;
  max-height: 100%;
}

.link {
  margin-left: 10px;
}
</style>
<style lang="scss">
  .el-container{
    height:100%;
  }
</style>
