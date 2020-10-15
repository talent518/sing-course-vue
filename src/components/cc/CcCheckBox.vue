<template>
  <span class="cell-img-wrapper flex">
      <el-checkbox-group v-model="value" @change="checkChange">
        <el-checkbox label="A"></el-checkbox>
        <el-checkbox label="B"></el-checkbox>
        <el-checkbox label="C"></el-checkbox>
        <el-checkbox label="D"></el-checkbox>
      </el-checkbox-group>
  </span>

</template>

<script>

  export default {
    name: "CcCheckBox", // 多选

    props: {
      value: {
        type: Object,
        default: () => []
      },

      // align: {
      //   type: String,
      //   default: 'center'
      // }
    },

    data() {
      return {}
    },

    methods: {
      checkChange() {
        this.$emit('change')
      },


    }
  }

</script>

<style lang="scss">

</style>
