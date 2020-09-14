<template>
  <div v-loading="loading">
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button v-permission="'ScoreCreate'" type="success" plain @click="handleAdd">新增标准</el-button>
      </el-form-item>
    </el-form>

    <my-table :data="list" v-loading="loading">
      <el-table-column prop="id" label="id"></el-table-column>

      <el-table-column prop="title" label="评分标准名"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button-group>
            <el-button
              v-permission="'ScoreUpdate'"
              plain
              size="small"
              type="warning"
              @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
              v-permission="'ScoreDel'"
              plain
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)">删除
            </el-button>
          </el-button-group>

        </template>
      </el-table-column>
    </my-table>

    <page
      style="text-align: left;margin: 18px 0"
      :nowPage="page.now"
      :total="page.total"
      :limit="page.limit"
      @pageChange="onPageChange"
      @sizeChange="onSizeChange"/>

    <score-dialog :dialog-data="dialogData"></score-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import ScoreDialog from "@/views/basic/score/ScoreDialog";
import page from "@/components/page/page";

export default {
  name: "Score",

  mixins: [commonMessage, menuRole],

  components: {ScoreDialog, page},

  data() {
    return {
      loading: true,
      dialogData: {
        show: false,
      },

      search: {},

      list: [],

      page: {
        now: 1,
        total: 0,
        limit: 10,
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

    handleSearch() {
      this.page.now = 1;
      this.getData();
    },

    onPageChange(val) {
      this.page.now = val;
      this.getData();
    },
    onSizeChange(val) {
      this.page.now = 1;
      this.page.limit = val;
      this.getData();
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
      this.loading = true;
      let param = {
        pageIndex: this.page.now,
        pageSize: this.page.limit,
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
