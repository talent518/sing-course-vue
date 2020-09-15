<template>
  <div class="relation-dialog">
    <el-dialog
      width="800px"
      top="4vh"
      title="教材列表"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body>
      <el-form inline size="small">
        <div class="course-management-form">
          <el-form-item>
            <el-input
              clearable
              placeholder="教材编号"
              v-model="filter.code"
              style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              clearable
              placeholder="教材标题"
              v-model="filter.title"
              style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              clearable
              placeholder="教材副标题"
              v-model="filter.sub_title"
              style="width: 200px;"></el-input>
          </el-form-item>

          <el-button type="primary" plain size="small" @click="handleSearch">查询</el-button>
        </div>
      </el-form>

      <el-table
        :data="list"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        size="mini" border>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="code" label="教材编号"></el-table-column>
        <el-table-column prop="title" label="教材标题" min-width="160"></el-table-column>
        <el-table-column prop="sub_title" label="教材副标题" min-width="220">
          <template slot-scope="{row}">
            {{row.sub_title || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="封面" width="">
          <template slot-scope="scope">
            <img
              style="height: 50px; width: 50px;"
              class="coverImg"
              :src="scope.row.cover"/>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="m20"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="page.size"
        @size-change="handleSizeChange"
        @current-change="pageCurrentChange"
        :current-page.sync="page.index"></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogObj.show = false">取 消</el-button>
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
      filter: {
        id: "",
        title: "",
        sub_title: "",
        status: "",
      },
      list: [],
      selected: [], // 已选择
      page: {
        total: 0,
        index: 1,
        size: 10,
      },
    };
  },

  watch: {
    "dialogObj.show"(val) {
      if (val) this.init();
    },
  },

  methods: {
    init() {
      this.filter = {
        id: "",
        title: "",
        sub_title: "",
        status: "",
      };
      this.list = [];
      this.selected = [];
      this.page.index = 1;
      this.handleSearch();
    },

    //提交表单内容
    sub() {
      let json = {
        theme_id: this.dialogObj.id,
      };
      if (this.selected.length == 0) {
        this.$message({
          type: "error",
          message: "请至少勾选一个!",
        });
        return false;
      }
      let arr = [];
      this.selected.forEach((val) => {
        arr.push(val.id);
      });
      json.element_id = arr.join(",");
      this.ApiTeach.postThemeDetailApi(json).then((res) => {
        if (JSON.stringify(res) === '{}') {
          this.$message({
            type: "success",
            message: "保存成功",
          });
        }
        this.$emit("reflash", 1);
        this.dialogObj.show = false;
      });
    },
    async getData() {
      this.loading = true;
      let param = Object.assign(
        {
          pageIndex: this.page.index,
          pageSize: this.page.size,
        },
        this.filter
      );
      param.status = 1;
      this.ApiResource.getResource(param)
        .then((res) => {
          this.loading = false;
          this.list = res.items;
          this.page.total = res.total;
        })
        .catch((error) => {
          this.loading = false;
        });
    },

    handleSearch() {
      this.page.index = 1;
      this.getData();
    },

    handleSelectionChange(val) {
      this.selected = val;
    },
    pageCurrentChange(index) {
      this.page.index = index;
      this.getData();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getData();
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
