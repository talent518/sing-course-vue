<template>
  <MenuItem :folder="menu" :select="select"></MenuItem>
</template>
<script>
  import MenuItem from "./MenuItem";
  import {mapGetters} from "Vuex";

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
  };
</script>
