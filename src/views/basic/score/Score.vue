<template>
  <div v-loading="loading">
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button type="success" plain @click="handleAdd">新增标准</el-button>
      </el-form-item>
    </el-form>

    <my-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>

      <el-table-column prop="title" label="评分标准名"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            size="small"
            type="warning"
            @click="handleEdit(scope.row)"
            >编辑
          </el-button>
          <el-button
            plain
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </my-table>

    <el-pagination
      class="m20"
      background
      layout="prev, pager, next,total"
      :total="page.total"
      :page-size="page.size"
      @current-change="pageCurrentChange"
      :current-page.sync="page.index"
    ></el-pagination>

    <score-dialog :dialog-data="dialogData"></score-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import ScoreDialog from "@/views/basic/score/ScoreDialog";

export default {
  name: "Score",

  mixins: [commonMessage, menuRole],

  components: { ScoreDialog },

  data() {
    return {
      loading: true,
      dialogData: {
        show: false,
      },

      search: {},

      list: [],

      page: {
        total: 0,
        index: 1,
        size: 10,
      },
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    handleAdd() {
      this.dialogData = {
        show: true,
        param: {
          id: 0,
        },
      };
    },

    handleEdit(row) {
      this.dialogData = {
        show: true,
        param: row,
      };
    },

    async handleDelete(id) {
      this.confirmDelMessage(
        "确定要删除评分标准吗？",
        async () => {
          return await this.ApiBasic.delScore(id);
        },
        async () => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getData();
        }
      );
    },

    async getData() {
      let param = {
        pageIndex: this.page.index,
        pageSize: this.page.size,
      };

      let res = await this.ApiBasic.getScore(param);
      this.loading = false;

      this.list = res.items;
      this.page.total = res.total;
    },

    pageCurrentChange(index) {
      this.page.index = index;
      this.getData();
    },
  },
};
</script>
