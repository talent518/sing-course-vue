<template>
  <div class="relation-dialog">
    <el-dialog
      width="800px"
      title="教材列表"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form inline size="small">
        <div class="course-management-form">
          <el-form-item label="教材编号：">
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

          <el-form-item label="教材标题：">
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
        <el-table-column prop="code" label="教材编号"></el-table-column>
        <el-table-column prop="course_title" label="教材标题"></el-table-column>
        <el-table-column prop="cover" label="封面" width="">
          <template slot-scope="scope">
            <img src="" alt="" />
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--  prop="class_user_num"-->
        <!--  label="教材数"-->
        <!--  width="115"-->
        <!--&gt;</el-table-column>-->
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
  name: "RelationMaterialDialog",
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
  mounted() {
    this.init();
  },
  methods: {
    //提交表单内容
    sub() {},

    async init() {
      // let json = {
      //   pageIndex: this.page.now,
      //   pageSize: this.page.limit,
      //   title: this.search.title,
      // };
      let data = await this.ApiTeach.getTextbookList();
      this.list = data.items;
      // this.page.total = data.total;
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
    // "dialogObj.show"() {
    //   this.$nextTick(() => {
    //     this.form.title = "";
    //     this.form.sub_title = [];
    //     this.form.cover = "";
    //     this.form.status = 1;
    //     if (this.dialogObj.type == 2) {
    //       this.form = {
    //         title: this.dialogObj.title,
    //         sub_title: this.dialogObj.sub_title,
    //         cover: this.dialogObj.cover,
    //         status: this.dialogObj.status,
    //       };
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped></style>
