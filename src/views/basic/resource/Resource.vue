<template>
  <div>
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button
          v-permission="'TemplateResourceCreate'"
          type="success"
          plain
          @click="handleDialog('add')"
          >新增教材模板
        </el-button>
      </el-form-item>
    </el-form>

    <my-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>

      <el-table-column prop="code" label="编号"></el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="title" label="关联环节">
        <template slot-scope="scope">
          <template v-if="scope.row.template_data_details.length">
            <div v-for="item in scope.row.template_data_details">
              {{ filterEnum("SegmentTypeEnum", item.lead_type) }}
            </div>
          </template>
          <template v-else>-</template>
        </template>
      </el-table-column>

      <el-table-column prop="status_text" label="状态">
        <template slot-scope="scope">
          <cc-cell-switch
            :value="scope.row.status"
            @click="handleSwitch(scope.row.id, scope.row.status)"
          ></cc-cell-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-permission="'TemplateResourcePreview'"
            plain
            size="small"
            type="primary"
            @click="handleDialog('view', scope.row)"
            >预览
          </el-button>

          <el-button
            v-permission="'TemplateResourceUpdate'"
            plain
            size="small"
            type="warning"
            @click="handleDialog('edit', scope.row)"
            >编辑
          </el-button>
          <el-button
            v-permission="'TemplateResourceDel'"
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

    <template-resource-dialog
      :dialog-data="dialogData"
    ></template-resource-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import TemplateResourceDialog from "@/views/basic/resource/ResourceDialog";
import globalFilter from "@util/filter";

export default {
  name: "TemplateResource",

  mixins: [commonMessage],

  components: { TemplateResourceDialog },

  data() {
    return {
      loading: true,
      dialogData: {
        show: false,
      },

      list: [],

      page: {
        total: 0,
        index: 1,
        size: 10,
      },
    };
  },
  methods: {
    handleDialog(type, row) {
      this.dialogData = {
        show: true,
        type: type,
        param: row ? row : { id: 0 },
      };
    },

    handleDialog(type, row) {
      this.dialogData = {
        show: true,
        type: type,
        param: row ? row : { id: 0 },
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
      this.$confirm(`确定 ${_targetText} 模板？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {
        this.$message.info("已取消");
      });
    },

    async handleDelete(id) {
      this.confirmDelMessage(
        "确定要删除教材模板吗？",
        async () => {
          return await this.ApiBasic.delResource(id);
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
      let res = await this.ApiBasic.getResource(param);
      this.loading = false;
      this.list = res.items;
      this.page.total = res.total;
    },

    pageCurrentChange(index) {
      this.page.index = index;
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped></style>
