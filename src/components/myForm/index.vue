<template>
  <el-form
    label-width="100px"
    class="demo-ruleForm"
    autocomplete="off"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
  >
    <slot></slot>
  </el-form>
</template>
<script>
  export default {
    name: "myTable",
    props: {
      model: {
        type: Object,
        dafault() {
          return {};
        },
      },
      rules: {
        type: Object,
        dafault() {
          return {};
        },
      },
    },
  };
</script>
