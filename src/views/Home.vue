<template>
  <div :class="$style.home">
    <img :src="homeLogo" :class="$style.img"/>
    <h1 :class="$style.title">Welcome</h1>
  </div>
</template>

<script>
  import homeLogo from "@/assets/image/login/homeLogo.png";

  export default {
    name: "Home",
    data() {
      return {
        homeLogo,
      };
    },
    methods: {},
  };
</script>
<style lang="scss" module>
  .home {
    text-align: center;
    .img {
      margin: 60px auto;
      width: 331px;
    }
    .title {
      font-size: 36px;
      line-height: 1.2;
    }
  }
</style>
