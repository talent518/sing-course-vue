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
            <!--<el-select-->
            <!--  v-model="search.code"-->
            <!--  multiple-->
            <!--  filterable-->
            <!--  clearable-->
            <!--  placeholder=""-->
            <!--  style="width: 200px;"-->
            <!--&gt;-->
            <!--  <el-option-->
            <!--    v-for="(data, index) in watchList"-->
            <!--    :key="index"-->
            <!--    :label="data.title"-->
            <!--    :value="data.id"-->
            <!--  ></el-option>-->
            <!--</el-select>-->
            <el-input
              placeholder="请输入教材编号"
              v-model="search.code"
              style="width: 200px;"
            ></el-input>
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
        <el-table-column prop="title" label="教材标题"></el-table-column>
        <el-table-column label="封面" width="">
          <template slot-scope="scope">
            <img class="coverImg" :src="scope.row.cover" alt="" />
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
        code: "",
      },
      list: [],
      selected: [], // 已选择
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    //提交表单内容
    sub() {
      let json = {
        course_id: this.dialogObj.id,
        element_type: 1,
      };

      if (this.selected.length==0) {
        this.$message({
          type: 'error',
          message: '请至少勾选一个!'
        });
        return false;
      }

      let arr = [];
      this.selected.forEach((val) => {
        arr.push(val.id);
      });
      json.element_id = arr.join(",");
      this.ApiTeach.postCourseDetailApi(json).then((res) => {
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
        exclude: "yes",
        id:this.dialogObj.id,
        title: this.search.title,
        code: this.search.code,
      };
      let data = await this.ApiTeach.getTextbookListApi(json);
      this.list = data.items;
      // this.page.total = data.total;
    },

    handleSearch() {
      // this.page.now = 1;
      this.init();
    },

    clearSearch() {
      this.search.title = "";
      this.search.code = "";
      this.init();
    },

    handleSelectionChange(val) {
      this.selected = val;
    },
  },
  watch: {
    "dialogObj.show"(value) {
      if (value) {
        this.clearSearch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.coverImg {
  width: 100px;
  height: 100px;
}
</style>
