<template>
  <div class="cc-number-range">
    <el-input
      placeholder="请输入"
      :clearable="clearable"
      :min="Number(min)"
      :max="Number(max)"
      :maxlength="Number(maxlength)"
      :value="value && value[0]"
      @input="handleStartInput">
    </el-input>

    <div class="range-gutter">~</div>

    <!--type="number"-->
    <!--input type=number 时，maxlength无效-->
    <el-input
      placeholder="请输入"
      :clearable="clearable"
      :min="Number(min)"
      :max="Number(max)"
      :maxlength="Number(maxlength)"
      :value="value && value[1]"
      @input="handleEndInput">
    </el-input>
  </div>
</template>

<script>

  export default {
    name: "CcNumberRange", // 数字区间输入框

    props: {
      value: {
        type: Array,
        default: () => []
      },

      min: {
        type: [Number, String],
        default: NaN
      },

      max: {
        type: [Number, String],
        default: NaN
      },

      maxlength: {
        type: [Number, String],
        default: NaN
      },

      clearable: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {}
    },

    methods: {
      handleStartInput(value) {
        let _value = value,
          _val = JSON.parse(JSON.stringify(this.value));

        if (Array.isArray(_val)) {
          _val[0] = _value
        } else {
          _val = [_value, '']
        }

        this.$emit('input', _val)
      },

      handleEndInput(value) {
        let _value = value,
          _val = JSON.parse(JSON.stringify(this.value));

        if (Array.isArray(_val)) {
          _val[1] = _value
        } else {
          _val = ['', _value]
        }

        this.$emit('input', _val)
      },
    }
  }

</script>

<style lang="scss">
  .cc-number-range {
    display: flex;

    .el-input {
      width: calc((100% - 30px) / 2);

      .el-input__inner {
        padding-right: 15px;
      }
    }

    .range-gutter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
    }
  }
</style>