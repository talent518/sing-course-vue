<template>
  <span class="cell-img-wrapper flex">
    <a v-if="src" target="_blank" download :href="src">
      <img class="cell-img" :src="src + '?imageView2/2/w/144'">
    </a>
    <img v-else class="cell-img" :src="src + '?imageView2/2/w/144'">
  </span>

</template>

<script>

export default {
  name: "CcCellImage", // 放在 table cell 里的图片

  props: {
    src: {
      type: String,
      default: ''
    },

    align: {
      type: String,
      default: 'center'
    }
  },

  data() {
    return {}
  },

  methods: {
    componentClick() {
      this.$emit('click')
    }
  }
}

</script>

<style lang="scss">
.cell-img-wrapper {

  &.flex {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .cell-img {
      /*display: block;*/
      max-width: 100%;
      max-height: 100%;
      /*border: solid 1px #EBEEF5;*/
    }

  }
}
</style>
