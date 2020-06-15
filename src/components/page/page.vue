<template>
  <div class="page-div">
    <el-pagination
      :small="small"
      :page-size="limit"
      :page-sizes="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="nowPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "page",
  data() {
    return {
      nowPage: 1,
      pageSize: [5, 10, 20, 30, 40, 50, 60, 80, 100],
    };
  },
  props: {
    currentPage: {
      required: false,
    },
    edition: {
      required: false,
    },
    total: {
      required: true,
    },
    limit: {
      default: 10,
    },
    small: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.edition == "1000") {
      this.pageSize = [5, 10, 20, 30, 40, 50, 60, 80, 100, 500, 1000];
    }
  },
  watch: {
    currentPage(val) {
      // 改变这个值并不会触发 handleCurrentChange
      if (typeof val === "number") {
        console.log("prop currentPage!!!");
        this.nowPage = val;
      }
    },
  },
  methods: {
    // 当前页变化
    handleCurrentChange(val) {
      console.log("methods pageChange!!!");
      this.$emit("pageChange", val);
    },
    // size变化
    handleSizeChange(val) {
      this.nowPage = 1;
      this.$emit("sizeChange", val);
    },
  },
};
</script>

<style scoped>
.page-div {
  display: block;
  text-align: center;
}
</style>
