<template>
  <div class="product-management">
    <el-form inline size="small">
      <div class="product-management-form">
        <el-form-item label="课程标题：">
          <el-input
            placeholder="请输入课程标题"
            v-model="search.title"
            style="width: 200px;"
          ></el-input>
        </el-form-item>

        <!--<el-form-item label="标签：">-->
        <!--  <el-select-->
        <!--    v-model="search.label"-->
        <!--    multiple-->
        <!--    filterable-->
        <!--    clearable-->
        <!--    placeholder=""-->
        <!--    style="width: 200px;"-->
        <!--  >-->
        <!--    <el-option-->
        <!--      v-for="(data, index) in watchList"-->
        <!--      :key="index"-->
        <!--      :label="data.title"-->
        <!--      :value="data.id"-->
        <!--    ></el-option>-->
        <!--  </el-select>-->
        <!--</el-form-item>-->

        <el-button type="primary" plain size="small" @click="handleSearch"
          >查询</el-button
        >
        <el-button plain size="small" @click="clearSearch">清除</el-button>
      </div>
    </el-form>

    <el-divider></el-divider>

    <el-button type="success" size="small" @click="addClass">新增</el-button>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="启用" name="enable"></el-tab-pane>
      <el-tab-pane label="禁用" name="disable"></el-tab-pane>
    </el-tabs>

    <el-table
      style="width: 100%;"
      :data="classList"
      v-loading="loading"
      size="small"
      border
    >
      <el-table-column prop="code" label="产品编号" width=""></el-table-column>
      <el-table-column prop="title" label="产品标题" width=""></el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: space-around;">
            <el-link @click="" plain type="primary" size="mini">编辑</el-link>
            <el-link
              @click="relationCourse(scope.row.id)"
              plain
              type="primary"
              size="mini"
              >关联教材</el-link
            >
            <template>
              <el-popconfirm
                title="确定要删除课程吗？"
                @onConfirm="delProduct(scope.row.id)"
              >
                <el-link plain type="primary" size="mini" slot="reference"
                  >删除</el-link
                >
              </el-popconfirm>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <page
      :nowPage="page.now"
      :total="page.total"
      :limit="page.limit"
      @pageChange="onPageChange"
      @sizeChange="onSizeChange"
    />
    <dialog-com :dialogObj="dialogObj" @reflash="init" />
    <relation-dialog :dialogObj="relationObj" @reflash="init" />
  </div>
</template>

<script>
import Teach from "@/views/common/teach";
import dialogCom from "./ProductDialog";
import page from "@/components/page/page";
import relationDialog from "./RelationDialog";

export default {
  mixins: [Teach],
  components: { dialogCom, page, relationDialog },
  name: "ProductManagement",
  data() {
    return {
      loading: false,
      params: {},
      activeName: "all",
      search: {
        title: "",
        // label: "",
      },
      classList: [],
      // watchList: [
      //   { id: 5, title: 5 },
      //   { id: 6, title: 6 },
      //   { id: 10, title: 10 },
      //   { id: 12, title: 12 },
      //   { id: 20, title: 20 },
      // ],
      page: {
        now: 1,
        total: 0,
        limit: 10,
      },
      dialogObj: {
        //给子组件的数据
        type: 0,
        show: false,
        name: "",
      },
      relationObj: {
        //给子组件的数据
        id: "",
        show: false,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 获取课程列表
     */
    async init() {
      let json = {
        pageIndex: this.page.now,
        pageSize: this.page.limit,
        title: this.search.title,
      };
      if (this.activeName == "enable") {
        json.status = 1;
      } else if (this.activeName == "disable") {
        json.status = 0;
      }
      let data = await this.ApiTeach.getProductListApi(json);
      this.classList = data.items;
      this.page.total = data.total;
    },

    handleSearch() {
      this.page.now = 1;
      this.init();
    },

    clearSearch() {
      this.search.title = "";
    },

    onPageChange(val) {
      this.page.now = val;
      this.init();
    },
    onSizeChange(val) {
      this.page.now = 1;
      this.page.limit = val;
      this.init();
    },

    //删除课程
    delProduct(id) {
      this.ApiTeach.delProductApi(id).then((res) => {
        this.init();
      });
    },

    /**
     * 新增课程
     */
    addClass() {
      this.dialogObj = {
        type: 0,
        show: true,
        name: "新增产品",
      };
    },

    editTheme(val) {
      this.dialogObj = {
        type: 2,
        show: true,
        name: "修改产品",
        title: val.title,
        sub_title: val.sub_title,
        status: val.status,
        cover: val.cover,
      };
    },

    relationCourse() {
      this.relationObj = {
        show: true,
      };
    },

    handleClick(tab) {
      console.log(tab.name);
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
.product-management {
  text-align: left;
  .product-management-form {
    padding-top: 20px;
  }
}
</style>
