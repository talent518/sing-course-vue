<template>
  <audio
    v-if="src"
    class="cc-cell-audio" :src="src" preload="meta" controls controlslist="nofullscreen nodownload"></audio>
  <span v-else>-</span>
</template>

<script>
export default {
  name: "CcCellAudio", // 放在 table cell 里，音乐播放

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
.cc-cell-audio {
  height: 44px;
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
