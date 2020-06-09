<template>
  <div class="home" @click="goto">
    我是Link4 页面
  </div>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "Link2",
    methods: {
      ...mapMutations("menu", {
        set_menu_name: "set_menu_name",
      }),
      goto() {
        this.set_menu_name("Link1");
        this.$router.push({name: "Link1"});
      },
    },
  };
</script>
