<template>
  <div>
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-input
          clearable
          placeholder="请输入教材ID"
          v-model="filter.id"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          clearable
          placeholder="请输入教材编号"
          v-model="filter.code"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          clearable
          placeholder="请输入教材标题"
          v-model="filter.title"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-select clearable v-model="filter.status" placeholder="请选择状态">
            <el-option
              v-for="item in dictoryObj.BaseStatusEnum"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button
          v-permission="'CourseView'"
          type="primary"
          plain
          size="small"
          @click="handleSearch()"
          >查询</el-button
        >
        <el-button
          type="success"
          v-permission="'ResourceCreate'"
          plain
          @click="handleDialogAdd()"
          >新增教材</el-button
        >
      </el-form-item>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="上架" name="enable"></el-tab-pane>
        <el-tab-pane label="下架" name="disable"></el-tab-pane>
      </el-tabs>

    </el-form>

    <my-table :data="list" :loading="loading">
      <el-table-column prop="id" label="id"></el-table-column>

      <el-table-column prop="code" label="编号"></el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="cover" label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px;"
            :src="scope.row.cover"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="关联环节">
        <template slot-scope="scope">
          <template v-if="scope.row.template_data_details.length">
            <div v-for="item in scope.row.template_data_details" :key="item.id">
              {{ item.title }}
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
            v-permission="'ResourcePreview'"
            plain
            size="small"
            type="primary"
            @click="handleDialogEdit(scope.row)"
            >预览</el-button
          >

          <el-button
            v-permission="'ResourceUpdate'"
            plain
            size="small"
            type="warning"
            @click="handleDialogEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-permission="'ResourceDel'"
            plain
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </my-table>

    <el-pagination
      class="m20"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      :page-size="page.size"
      @size-change="handleSizeChange"
      @current-change="pageCurrentChange"
      :current-page.sync="page.index"
    ></el-pagination>
    <resource-edit :dialog-data="dialogEditData"></resource-edit>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
// import ResourceAdd from "@/views/resource/ResourceAdd";
import ResourceEdit from "@/views/resource/ResourceEdit";

export default {
  name: "Resource",

  mixins: [commonMessage],

  components: { ResourceEdit },

  data() {
    return {
      loading: true,
      filter: {
        id: "",
        title: "",
        sub_title: "",
        status: "",
      },
      dialogEditData: {
        show: false,
      },
      list: [],
      page: {
        total: 0,
        index: 1,
        size: 10,
      },
      activeName: "all",
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    handleSearch() {
      this.page.index = 1;
      this.getData();
    },
    handleDialogAdd() {
      this.dialogEditData = {
        show: true,
        param: {
          type: "add",
          id: 0,
        },
      };
    },

    handleDialogEdit(row) {
      row.type = "edit";
      this.dialogEditData = {
        show: true,
        param: row,
      };
    },

      handleSwitch(id, val) {

        let _targetText = '', _target; // 要到达的状态
        if (val === 0) {
          _target = 'enable';
          _targetText = '上架'
        } else if (val === 1) {
          _target = 'disable';
          _targetText = '下架'
        }

      this.$confirm(`确定 ${_targetText} 教材？`, "提示", {
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

          this.ApiResource.postResourceStatus(param)
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

    async handleDelete(id) {
      this.confirmDelMessage(
        "确定要删除教材吗？",
        async () => {
          return await this.ApiResource.delResource(id);
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
      let param = Object.assign(
        {
          pageIndex: this.page.index,
          pageSize: this.page.size,
        },
        this.filter
      );
      if (this.activeName == "enable") {
        param.status = 1;
      } else if (this.activeName == "disable") {
        param.status = 0;
      }

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

    pageCurrentChange(index) {
      this.page.index = index;
      this.getData();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getData();
    },
    handleClick() {
      this.getData();
    },
  },
};
</script>

<style scoped></style>
