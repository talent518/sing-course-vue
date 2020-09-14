<template>
  <span class="cell-img-wrapper flex">
    <el-image
      v-if="src"
      style="width: 100%; height: 100%"
      fit="contain"
      :src="src + '?imageView2/2/w/144'"
      :preview-src-list="getImgList()"></el-image>
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

    list: { // 图片列表
      type: Array,
      default: () => []
    },

    index: { // list中当前图片的index
      type: Number,
      default: 0
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
    },

    getImgList() {
      let arr = [];

      if (this.list && this.list.length) {
        arr = JSON.parse(JSON.stringify(this.list));
        for (let i = 0; i < this.index; i++) {
          arr.push(arr[0]);
          arr.splice(0, 1);
        }
      } else {
        arr = [this.src];
      }

      return arr
    },
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

.el-image-viewer__close {
  color: #ffffff;
}
</style>
