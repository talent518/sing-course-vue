<template>
  <div v-if="!item.hidden">
    <el-submenu v-if="item.children &&item.children.length" :index="item.name">
      <template slot="title">
        <div class="menu-text">
          <i class="iconfont menu-icon" :class="myFont(item)"></i>
          {{ item.title }}
        </div>
      </template>
      <template v-for="m in item.children">
        <MenuItem :item="m" :key="m.name"></MenuItem>
      </template>
    </el-submenu>

    <el-menu-item :index="item.name" v-else>
      
      <div class="menu-text" @click="goto(item.name)">
        <i class="iconfont menu-icon" :class="myFont(item)"></i>
        {{ item.title }}
      </div>
    </el-menu-item>
  </div>
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
