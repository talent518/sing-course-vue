<template>
  <div class="app-menu dark">
    <el-menu
      :default-active="name"
      :myName="name"
      :unique-opened="opend">
      <template v-for="item in menu">
        <MenuItem
          :item="item"
          :key="item.name"
          :index="item.name"></MenuItem>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import MenuItem from "./MenuItem";
  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters("permission", {
        menu: "routes",
      }),
      name() {
        return this.$route.name;
      },
    },
    data() {
      return {
        //  name: "orgManager",
        opend: true,
        isCollapse: true,
        open: ["SysManager"],
      };
    },
    components: {
      MenuItem,
    },
    // watch: {
    //   "$route.name": {
    //     immediate: true,
    //     handler: function (newVal, oldVal) {
    //       console.log(newVal);
    //     },
    //   },
    // },
  };
</script>
