<template>
  <div>

    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button v-permission="'TemplateSegmentCreate'" type="success" plain @click="handleAdd">新增环节</el-button>
      </el-form-item>
    </el-form>

    <my-table
      :data="list">

      <el-table-column
        prop="id" label="id"></el-table-column>

      <el-table-column
        prop="code" label="编号"></el-table-column>

      <el-table-column
        prop="title"
        label="标题"></el-table-column>

      <el-table-column
        prop="status_text"
        label="状态">
        <template slot-scope="scope">
          <cc-cell-switch
            :value="scope.row.status"
            @click="handleSwitch(scope.row.id, scope.row.status)"></cc-cell-switch>
        </template>
      </el-table-column>

      <el-table-column
        prop="type_text"
        label="类别"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
		  v-permission="'TemplateResourcePreview'"
            plain size="small" type="primary"
            @click="handlePreview(scope.row)">预览
          </el-button>

          <el-button
		  v-permission="'TemplateResourceUpdate'"
            plain size="small" type="warning"
            @click="handleEdit(scope.row)">编辑
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

    <segment-dialog :dialog-data="dialogData"></segment-dialog>

  </div>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage"
  import menuRole from "@/views/common/menuRole"
  import SegmentDialog from "@/views/basic/segment/SegmentDialog"

  export default {
    name: "Segment",

    mixins: [commonMessage, menuRole],

    components: {SegmentDialog},

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
        }
      }
    },

    mounted() {
      this.getData();
    },

    methods: {
      handleAdd() {
        this.dialogData = {
          show: true,
          type: 'add',
          param: {
            id: 0
          }
        }
      },

      handleEdit(row) {
        this.dialogData = {
          show: true,
          type: 'edit',
          param: row
        }
      },

      handlePreview(row) {
        this.dialogData = {
          show: true,
          type: 'view',
          param: row
        }
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

        this.$confirm(`确定 ${_targetText} 环节？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.loading = true;

          let param = {
            id: id,
            status: _target
          }

          this.ApiBasic.postSegmentStatus(param).then(res => {
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

      async getData() {
        let param = {
          pageIndex: this.page.index,
          pageSize: this.page.size,
        }
        let res = await this.ApiBasic.getSegment(param);
        this.loading = false;

        this.list = res.items;
        this.page.total = res.total;
      },

      pageCurrentChange(index) {
        this.page.index = index;
        this.getData();
      },
    }
  }
</script>

<style scoped>

</style>