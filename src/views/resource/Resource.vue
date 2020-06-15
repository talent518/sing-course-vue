<template>
  <div>
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button type="success" plain @click="handleDialog('add')"
          >新增教材</el-button
        >
      </el-form-item>
    </el-form>

    <my-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>

      <el-table-column prop="code" label="编号"></el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="cover" label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px;"
            :src="scope.row.cover"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="关联环节">
        <template slot-scope="scope">
          <template v-if="scope.row.template_data_details.length">
            <div v-for="item in scope.row.template_data_details">
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
            plain
            size="small"
            type="primary"
            @click="handleDialog('add', scope.row)"
            >预览
          </el-button>

          <el-button
            plain
            size="small"
            type="warning"
            @click="handleDialog('edit', scope.row)"
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

    <resource-dialog :dialog-data="dialogData"></resource-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import ResourceDialog from "@/views/resource/ResourceDialog";

export default {
  name: "Resource",

  mixins: [commonMessage, menuRole],

  components: { ResourceDialog },

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

  mounted() {
    this.getData();
  },

  methods: {
    handleDialog(type, row) {
      this.dialogData = {
        show: true,
        type: type,
        param: row ? row : { id: 0 },
      };
    },

    async getData() {
      let param = {
        pageIndex: this.page.index,
        pageSize: this.page.size,
      };
      let res = await this.ApiResource.getResource(param);
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

<style scoped></style>
