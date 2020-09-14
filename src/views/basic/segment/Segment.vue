<template>
  <div class="segment-management">
    <el-form inline size="small">
      <div class="segment-management-form">
        <el-form-item label="">
          <el-input
            placeholder="请输入环节模板标题"
            v-model="search.title"
            style="width: 200px;"></el-input>
        </el-form-item>

        <el-button
          v-permission="'TemplateSegmentView'"
          type="primary"
          plain
          size="small"
          @click="handleSearch">查询
        </el-button>
        <el-button plain size="small" @click="clearSearch">清除</el-button>
        <el-button
          type="success"
          plain
          size="small"
          @click="handleAdd"
          v-permission="'TemplateSegmentCreate'">新增
        </el-button>
      </div>
    </el-form>


    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="启用" name="enable"></el-tab-pane>
      <el-tab-pane label="禁用" name="disable"></el-tab-pane>
    </el-tabs>

    <my-table :data="list" v-loading="loading">
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

      <el-table-column label="操作" width="190">
        <template slot-scope="scope">

          <el-button-group>

            <el-button
              v-permission="'TemplateSegmentPreview'"
              plain
              size="small"
              type="primary"
              @click="handlePreview(scope.row)">预览
            </el-button>

            <el-button
              v-permission="'TemplateSegmentUpdate'"
              plain
              size="small"
              type="warning"
              @click="handleEdit(scope.row)">编辑
            </el-button>

            <el-button
              v-permission="'TemplateResourceDel'"
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
      @sizeChange="onSizeChange"
    />

    <segment-dialog :dialog-data="dialogData"></segment-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import SegmentDialog from "@/views/basic/segment/SegmentDialog";
import page from "@/components/page/page";

export default {
  name: "Segment",

  mixins: [commonMessage, menuRole],

  components: {SegmentDialog, page},

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
        type: "add",
        param: {
          id: 0,
        },
      };
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
    async handleDelete(id) {
      this.confirmDelMessage(
        "确定要删除环节模板吗？",
        async () => {
          return await this.ApiBasic.delSegment(id);
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
              this.$message({type: "success", message: "修改成功!"});
              this.getData();
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({type: "info", message: "已取消"});
        });
    },

    async getData() {
      this.loading = true;
      let param = {
        pageIndex: this.page.now,
        pageSize: this.page.limit,
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

  }
}
</style>
