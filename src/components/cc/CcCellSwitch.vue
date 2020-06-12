<template>
  <span :disabled="disabled" class="cc-switch-wrapper" @click="componentClick">
    <!--v-model="value"-->
    <el-switch
      style="pointer-events: none;"
      :value="String(value)"
      :disabled="disabled"
      :active-value="String(activeValue)"
      :inactive-value="String(inactiveValue)"
      active-color="#13ce66"
    >
    </el-switch>
  </span>
</template>

<script>
export default {
  name: "CcCellSwitch", // 放在 table cell 里，切换开关前调用接口

  props: {
    value: {},

    activeValue: {
      type: [Number, String],
      default: 1,
    },

    inactiveValue: {
      type: [Number, String],
      default: 0,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  methods: {
    componentClick() {
      if (!this.disabled) {
        this.$emit("click");
      }
    },
  },
};
</script>

<style>
.cc-switch-wrapper {
  cursor: pointer;
  display: inline-block;
}

.cc-switch-wrapper[disabled] {
  cursor: not-allowed;
}
</style>
