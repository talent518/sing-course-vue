<template>
  <MenuItem :folder="menu" :select="select"></MenuItem>
</template>
<script>
  import MenuItem from "./MenuItem";
  import {mapGetters, mapMutations} from "vuex";

  export default {
    computed: {
      ...mapGetters("menu", {
        menu: "allMenu",
      }),
    },
    data() {
      return {
        collapse: false,
      };
    },
    components: {
      MenuItem,
    },
    methods: {
      ...mapMutations("menu", {
        set_operateMenu: "set_operateMenu",
      }),
      select(item) {
        this.set_operateMenu(item);
      },
    },
  };
</script>
