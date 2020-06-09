<template>
  <ul>
    <li v-for="item in folder" :key="item.menuKey" :class="$style.li">
      <div :class="$style.title" @click="select(item)">
        <span>{{ item.menuName }}</span>
        <span
          :class="$style.icon"
          v-if="item.children.length"
          @click.stop.prevent="hideOrShow(item)"
        ><i class="el-icon-arrow-down" v-show="!item.isShow"></i
        ><i class="el-icon-arrow-up" v-show="item.isShow"></i
        ></span>
      </div>
      <MenuItem
        v-if="item.children.length"
        :folder="item.children"
        :select="select"
        v-show="item.isShow"
      ></MenuItem>
    </li>
  </ul>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "MenuItem",
    props: ["folder", "select"],
    data() {
      return {
        isShow: true,
      };
    },
    methods: {
      hideOrShow(item) {
        item.isShow = !item.isShow;
      },
    },
  };
</script>
<style lang="scss" module>
  .buttonsOperate {
    display: flex;
  }

  .title {
    cursor: pointer;
    position: relative;
  }

  .li {
    font-size: 14px;
    margin: 10px 0;
    text-align: left;
    padding-left: 20px;
    ul {
      padding-left: 1em;
      line-height: 1.5em;
      list-style-type: dot;
    }
    margin: 10px 0;
  }

  .icon {
    font-size: 22px;
    position: absolute;
    right: 10px;
    top: -3px;
  }
</style>
