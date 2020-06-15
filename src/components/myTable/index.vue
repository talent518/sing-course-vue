<template>
  <section>
    <el-table
      :data="data"
      border
      size="small"
      :fit="fit"
      v-loading="loading"
      v-bind="$attrs"
      v-if="mh"
      v-on="$listeners"
    >
      <slot></slot>
    </el-table>
  </section>
</template>
<script>
export default {
  name: "myTable",
  props: {
    data: {
      type: Array,
      dafault() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    mh: {
      type: [Number, String],
      default: (410 * document.documentElement.clientHeight) / 625,
    },
  },
  data() {
    return {
      fit: true,
    };
  },
  mounted() {},
};
</script>
