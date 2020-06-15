<template>
  <div class="relation-dialog">
    <el-dialog
      width="800px"
      title="课程列表"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form inline size="small">
        <div class="course-management-form">
          <el-form-item label="课程类型：">
            <el-select
              v-model="search.label"
              multiple
              filterable
              clearable
              placeholder=""
              style="width: 200px;"
            >
              <el-option
                v-for="(data, index) in watchList"
                :key="index"
                :label="data.title"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="课程标题：">
            <el-input
              placeholder="请输入课程标题"
              v-model="search.title"
              style="width: 200px;"
            ></el-input>
          </el-form-item>

          <el-button type="primary" plain size="small" @click="handleSearch"
            >查询</el-button
          >

          <el-button plain size="small" @click="clearSearch">清除</el-button>
        </div>
      </el-form>
      <el-divider></el-divider>

      <el-table
        :data="list"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        size="mini"
        border
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="code" label="课程编号"></el-table-column>
        <el-table-column prop="title" label="课程标题"></el-table-column>
        <el-table-column prop="" label="课程类型"></el-table-column>
        <!--<el-table-column prop="" label="教具"></el-table-column>-->
        <el-table-column prop="theme_num" label="主题"></el-table-column>
        <el-table-column prop="textbook_num" label="课程"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogObj.show = false"
          >取 消</el-button
        >
        <el-button size="small" type="primary" @click="sub">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Teach from "@/views/common/teach";
export default {
  mixins: [Teach],
  name: "RelationCourceDialog",
  props: ["dialogObj"],
  data() {
    return {
      loading: false,
      search: {
        title: "",
        label: "",
      },
      list: [],
      watchList: [
        { id: 5, title: 5 },
        { id: 6, title: 6 },
        { id: 10, title: 10 },
        { id: 12, title: 12 },
        { id: 20, title: 20 },
      ],
      selected: [], // 已选择
    };
  },
  mounted() {},
  methods: {
    //提交表单内容
    sub() {
      let json = {
        product_id: this.dialogObj.id,
      };
      let arr = [];
      this.selected.forEach((val) => {
        arr.push(val.id);
      });
      json.element_id = arr.join(",");
      this.ApiTeach.postProductDetailApi(json).then((res) => {
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.$emit("reflash");
        this.dialogObj.show = false;
      });
    },

    async init() {
      let json = {
        scene: "all",
        title: this.search.title,
        code: this.search.code,
      };
      let data = await this.ApiTeach.getCourseListApi(json);
      this.list = data.items;
    },

    handleSearch() {
      // this.page.now = 1;
      this.init();
    },

    clearSearch() {
      this.search.title = "";
    },

    handleSelectionChange(val) {
      this.selected = val;
    },
  },
  watch: {
    "dialogObj.show"(value) {
      if (value) {
        this.init();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
