<template>
  <el-rate
    :value="Number(star)"
    :max="3"
    class="score-star"
    :style="`width: ${width}`"
    disabled
    disabled-void-color="#ffffff"
    text-color="#ff9900"
  >
  </el-rate>
</template>

<script>
export default {
  name: "ScoreStar",

  props: {
    star: {
      type: [Number, String],
      default: 3,
    },

    width: {
      type: String,
      default: "auto",
    },
  },
};
</script>

<style lang="scss">
.score-star {
  overflow: hidden;
}
</style>
