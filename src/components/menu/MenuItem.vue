<template>
  <div v-if="!item.hidden">
    <el-submenu v-if="item.children &&item.children.length" :index="item.name">
      <template slot="title">
        <div class="menu-text">
          <i class="iconfont menu-icon" :class="item.meta.icon ? item.meta.icon : 'icon-folder'"></i>
          {{ item.title }}
        </div>
      </template>
      <template v-for="m in item.children">
        <MenuItem :item="m" :key="m.name"></MenuItem>
      </template>
    </el-submenu>

    <el-menu-item :index="item.name" v-else>
      <div class="menu-text" @click="goto(item.name)">
        <i
          v-if="item.meta.icon"
          :class="item.meta.icon ? item.meta.icon : 'icon-file'"
          class="iconfont menu-icon"></i>
        {{ item.title }}
      </div>
    </el-menu-item>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "MenuItem",
    props: {
      item: {
        type: Object,
        default: () => {
        },
      },
    },
    methods: {
      goto(name) {
        this.$router.push({name});
      },
    },
  };
</script>
