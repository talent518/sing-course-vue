<template>
  <div class="theme-management">
    <el-form inline size="small" class="section-search">
      <el-form-item>
        <el-input
          placeholder="主题标题"
          v-model="search.title"
          style="width: 200px;"></el-input>
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
      >查询
      </el-button
      >
      <el-button plain size="small" @click="clearSearch">清除</el-button>
    </el-form>

    <el-divider></el-divider>

    <el-button type="success" size="small" @click="addTheme">新增</el-button>

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
      <el-table-column prop="code" label="编号" width=""></el-table-column>
      <el-table-column prop="title" label="主題标题" width=""></el-table-column>
      <el-table-column
        prop="textbook_num"
        label="教材"
        width=""
      ></el-table-column>
      <el-table-column
        prop="status_text"
        label="状态"
        width=""
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: space-around;">
            <el-link
              @click="editTheme(scope.row)"
              plain
              type="primary"
              size="mini"
            >编辑
            </el-link
            >
            <el-link
              @click="relationMaterial(scope.row.id)"
              plain
              type="primary"
              size="mini"
            >关联教材
            </el-link
            >
            <template>
              <el-popconfirm
                title="确定要删除主题吗？"
                @onConfirm="delTheme(scope.row.id)"
              >
                <el-link plain type="primary" size="mini" slot="reference"
                >删除
                </el-link
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
    <dialog-com :dialogObj="dialogObj" @reflash="init"/>
    <relation-dialog :dialogObj="relationObj" @reflash="init"/>
  </div>
</template>

<script>
  import Teach from "@/views/common/teach";
  import dialogCom from "./ThemeDialog";
  import relationDialog from "./RelationDialog";
  import page from "@/components/page/page";

  export default {
    mixins: [Teach],
    components: {dialogCom, page, relationDialog},
    name: "ThemeManagement",
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
        let data = await this.ApiTeach.getThemeListApi(json);
        this.classList = data.items;
        this.page.total = data.total;
      },

      //删除课程
      delTheme(id) {
        this.ApiTeach.delThemeApi(id).then((res) => {
          this.init();
        });
      },

      handleSearch() {
        this.page.now = 1;
        this.init();
      },

      clearSearch() {
        this.search.title = "";
      },
      relationMaterial(id) {
        this.relationObj = {
          id: id,
          show: true,
        };
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

      /**
       * 新增课程
       */
      addTheme() {
        this.dialogObj = {
          type: 1,
          show: true,
          name: "新增主题",
        };
      },

      editTheme(val) {
        this.dialogObj = {
          type: 2,
          show: true,
          name: "修改主题",
          title: val.title,
          sub_title: val.sub_title,
          status: val.status,
          cover: val.cover,
          id: val.id,
        };
      },

      handleClick(tab) {
        this.init();
      },
    },
  };
</script>
