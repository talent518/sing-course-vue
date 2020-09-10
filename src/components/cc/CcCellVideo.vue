<template>
  <video
    v-if="src"
    class="cc-cell-video" :src="src" preload="metadata" controls controlslist=""></video>
  <span v-else>-</span>
</template>

<script>
export default {
  name: "CcCellVideo", // 放在 table cell 里，音乐播放

  props: {
    value: {},

    src: {
      type: String,
      default: '',
    },

  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss">
.cc-cell-video {
  height: 135px;
  width: 240px;
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    font-size: 12px;
  }

  /*&::-webkit-media-controls-volume-control-container {
    display: none;
  }*/

  /*&::-internal-media-controls-overflow-button {
    display: none !important;
  }*/

  &::-webkit-media-controls-timeline {
    //padding-left: 8px;
    padding-right: 6px;
  }

  &::-webkit-media-controls-panel {
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>
