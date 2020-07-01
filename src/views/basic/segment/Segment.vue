<template>
  <div class="segment-management">
    <el-form inline size="small">
      <div class="segment-management-form">
        <el-form-item label="环节模板标题：">
          <el-input
            placeholder="请输入环节模板标题"
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

    <el-button type="success" size="small" @click="handleAdd">新增</el-button>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="启用" name="enable"></el-tab-pane>
      <el-tab-pane label="禁用" name="disable"></el-tab-pane>
    </el-tabs>

    <my-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>

      <el-table-column prop="code" label="编号"></el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="status_text" label="状态">
        <template slot-scope="scope">
          <cc-cell-switch
            :value="scope.row.status"
            @click="handleSwitch(scope.row.id, scope.row.status)"
          ></cc-cell-switch>
        </template>
      </el-table-column>

      <el-table-column prop="type_text" label="类别"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-permission="'TemplateResourcePreview'"
            plain
            size="small"
            type="primary"
            @click="handlePreview(scope.row)"
            >预览
          </el-button>

          <el-button
            v-permission="'TemplateResourceUpdate'"
            plain
            size="small"
            type="warning"
            @click="handleEdit(scope.row)"
            >编辑
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

    <segment-dialog :dialog-data="dialogData"></segment-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import SegmentDialog from "@/views/basic/segment/SegmentDialog";

export default {
  name: "Segment",

  mixins: [commonMessage, menuRole],

  components: { SegmentDialog },

  data() {
    return {
      loading: true,
      dialogData: {
        show: false,
      },
      activeName: "all",
      search: {
        title: "",
      },

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
        type: "add",
        param: {
          id: 0,
        },
      };
    },

    handleEdit(row) {
      this.dialogData = {
        show: true,
        type: "edit",
        param: row,
      };
    },

    handlePreview(row) {
      this.dialogData = {
        show: true,
        type: "view",
        param: row,
      };
    },

    handleSwitch(id, val) {
      let _targetText = "",
        _target; // 要到达的状态
      if (val === 0) {
        _target = "enable";
        _targetText = "启用";
      } else if (val === 1) {
        _target = "disable";
        _targetText = "停用";
      }

      this.$confirm(`确定 ${_targetText} 环节？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;

          let param = {
            id: id,
            status: _target,
          };

          this.ApiBasic.postSegmentStatus(param)
            .then((res) => {
              this.$message({ type: "success", message: "修改成功!" });
              this.getData();
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消" });
        });
    },

    async getData() {
      let param = {
        pageIndex: this.page.index,
        pageSize: this.page.size,
        title: this.search.title,
      };
      if (this.activeName == "enable") {
        param.status = 1;
      } else if (this.activeName == "disable") {
        param.status = 0;
      }
      let res = await this.ApiBasic.getSegment(param);
      this.loading = false;

      this.list = res.items;
      this.page.total = res.total;
    },

    handleSearch() {
      this.page.now = 1;
      this.getData();
    },

    clearSearch() {
      this.search.title = "";
    },

    handleClick(tab) {
      this.getData();
    },

    pageCurrentChange(index) {
      this.page.index = index;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.segment-management {
  text-align: left;
  .segment-management-form {
    padding-top: 20px;
  }
}
</style>
