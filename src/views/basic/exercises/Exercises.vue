<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="titleFlex">
          <div class="title">配音标题：</div>
          <div>
            <el-input v-model="searchObj.title" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="titleFlex">
          <div>标签：</div>
          <div>
            <el-input
              multiple
              placeholder="请选择标签"
              v-model="searchObj.title"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-form size="small" inline class="section-search">
      <el-form-item>
        <el-button type="success" plain @click="handleAdd">添加习题</el-button>
      </el-form-item>
    </el-form>

    <my-table :data="list">
      <el-table-column
        v-for="item in cols"
        :key="item.prop"
        :prop="item.prop"
        :label="item.name"
      ></el-table-column>

      <el-table-column prop="title" label="配音素材">
        <template slot-scope="{ row }">
          <el-image :src="row.material_url"></el-image>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="title" label="原生录音">
        <template slot-scope="{ row }"> </template>
      </el-table-column>
      <el-table-column prop="title" label="配音内容">
        <template slot-scope="{ row }"> </template>
      </el-table-column>
      <el-table-column prop="title" label="配音答案">
        <template slot-scope="{ row }"> </template>
      </el-table-column> -->
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
      :total="searchObj.total"
      :page-size="searchObj.pageSize"
      @current-change="pageCurrentChange"
      :current-page.sync="searchObj.pageIndex"
    ></el-pagination>
    <el-dialog
      title="制作兑换码"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <my-form :rules="rules" :model="model">
        <el-form-item label="配音标题：" class="textLeft" prop="title">
          <el-input v-model="module.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="素材类型：" class="textLeft" prop="title">
          <el-input v-model="module.title" placeholder="请输入标题"></el-input>
        </el-form-item>
      </my-form>
    </el-dialog>
  </div>
</template>

<script>
import commonMessage from "@/views/common/commonMessage";
import menuRole from "@/views/common/menuRole";
import ScoreDialog from "@/views/basic/score/ScoreDialog";
export default {
  name: "Exercises",
  mixins: [commonMessage, menuRole],
  components: { ScoreDialog },
  methods: {
    async getQuestion() {
      let d = await this.ApiCourse.getVoiceQuestions(this.searchObj);
      this.list = d.items;
      this.searchObj.total = d.total;
    },
    handleAdd() {},
    search() {
      this.searchObj.index = 1;
    },
    pageCurrentChange(index) {
      this.searchObj.index = index;
      this.getQuestion(this.searchObj);
    },
    handleEdit() {
      this.open();
    },
    handleDelete() {},
  },
  data() {
    return {
      searchObj: {
        title: "",
        total: 0,
        pageIndex: 1,
        pageSize: 1,
      },
      module: {
        title: "",
      },
      cols: [
        { name: "编号", prop: "code" },
        { name: "配音标题", prop: "title" },
        { name: "素材类型", prop: "material_type" },
      ],
      cols1: [
        { name: "配音内容", prop: "" },
        { name: "配音答案", prop: "" },
      ],
      list: [],
    };
  },
  mounted() {
    this.getQuestion();
  },
};
</script>

<style lang="scss">
.titleFlex {
  display: flex;
  align-items: center;
  .title {
    width: 100px;
  }
}
</style>
