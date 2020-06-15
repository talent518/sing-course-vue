<template>
  <el-submenu v-if="item.children.length" :index="item.menuKey">
    <template slot="title">
      <div class="menu-text">
        <i class="iconfont menu-icon" :class="myFont(item)"></i>
        {{ item.menuName }}
      </div>
    </template>
    <template v-for="m in item.children">
      <MenuItem :item="m" :key="m.menuKey"></MenuItem>
    </template>
  </el-submenu>

  <el-menu-item :index="item.menuKey" v-else>
    <div
      @click="goto(item.menuKey)"
      class="menu-text"
      v-if="item.parentId != 0"
    >
      {{ item.menuName }}
    </div>
    <div class="menu-text" v-else @click="goto(item.menuKey)">
      <i class="iconfont menu-icon" :class="myFont(item)"></i>
      {{ item.menuName }}
    </div>
  </el-menu-item>
</template>

<script>
const iconObj = {
  SysManager: "icon-setting",
  PurchaseManager: "icon-YUAN",
  Report: "icon-dashboard",
  LogView: "icon-rizhi",
  Resource: "icon-file-copy",
  Basic: "icon-build",
  Product: "icon-appstore",
};
import { mapMutations } from "vuex";

export default {
  name: "MenuItem",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    myFont(item) {
      return iconObj[item.menuKey];
    },
    ...mapMutations("menu", {
      set_menu_name: "set_menu_name",
    }),
    goto(name) {
      this.set_menu_name(name);
      this.$router.push({ name });
    },
  },
};
</script>
