<template>
  <div>
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button type="success" v-permission="'ResourceCreate'" plain @click="handleDialogAdd()">新增教材</el-button>
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
		  v-permission="'ResourcePreview'"
            plain
            size="small"
            type="primary"
            @click="handleDialogEdit(scope.row)">预览
          </el-button>

          <el-button
		   v-permission="'ResourceUpdate'"
            plain
            size="small"
            type="warning"
            @click="handleDialogEdit(scope.row)">编辑
          </el-button>
          <el-button
                  v-permission="'ResourceDel'"
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
      :current-page.sync="page.index"></el-pagination>

    <resource-add :dialog-data="dialogAddData"></resource-add>

    <resource-edit :dialog-data="dialogEditData"></resource-edit>

  </div>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import ResourceAdd from "@/views/resource/ResourceAdd";
  import ResourceEdit from "@/views/resource/ResourceEdit";

  export default {
    name: "Resource",

    mixins: [commonMessage],

    components: {ResourceEdit, ResourceAdd},

    data() {
      return {
        loading: true,
        dialogAddData: {
          show: false,
        },

        dialogEditData: {
          show: false
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
      handleDialogAdd() {
        this.dialogAddData = {
          show: true,
          param: {
            type: 'add',
            id: 0
          }
        };
      },

      handleDialogEdit(row) {
        row.type = 'edit';
        this.dialogEditData = {
          show: true,
          param: row
        };
      },

      handleSwitch(id, val) {

        let _targetText = '', _target; // 要到达的状态
        if (val === 0) {
          _target = 'enable';
          _targetText = '启用'
        } else if (val === 1) {
          _target = 'disable';
          _targetText = '停用'
        }

        this.$confirm(`确定 ${_targetText} 教材？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.loading = true;

          let param = {
            id: id,
            status: _target
          }

          this.ApiResource.postResourceStatus(param).then(res => {
            this.$message({type: 'success', message: '修改成功!'});
            this.getData();
            this.loading = false
          }).catch(err => {
            console.log(err)
            this.loading = false;
          })

        }).catch(() => {
          this.$message({type: 'info', message: '已取消'});
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
