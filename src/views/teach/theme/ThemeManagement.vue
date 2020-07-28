<template>
  <div class="theme-management">
    <el-form inline size="small" class="section-search">
      <el-form-item>
        <el-input
          placeholder="请输入主题标题"
          v-model="search.title"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-button
        v-permission="'ThemeView'"
        type="primary"
        plain
        size="small"
        @click="handleSearch"
        >查询
      </el-button>
      <el-button plain size="small" @click="clearSearch">清除</el-button>
      <el-button
        type="success"
        plain
        v-permission="'ThemeCreate'"
        size="small"
        @click="addTheme"
      >新增主题</el-button
      >
    </el-form>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="上架" name="enable"></el-tab-pane>
      <el-tab-pane label="下架" name="disable"></el-tab-pane>
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
          <div style="display: flex; justify-content: space-around;">
            <el-link
              v-permission="'ThemeUpdate'"
              @click="editTheme(scope.row)"
              plain
              type="primary"
              size="mini"
              >编辑
            </el-link>
            <el-link
              v-permission="'ThemeCorrelation'"
              @click="relationMaterial(scope.row.id)"
              plain
              type="primary"
              size="mini"
              >关联教材
            </el-link>
            <template>
              <el-popconfirm
                v-permission="'ThemeDel'"
                title="确定要删除主题吗？"
                @onConfirm="delTheme(scope.row.id)"
              >
                <el-link plain type="primary" size="mini" slot="reference"
                  >删除
                </el-link>
              </el-popconfirm>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <page
      style="text-align: left;margin: 18px 0"
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
import dialogCom from "./ThemeDialog";
import relationDialog from "./RelationDialog";
import page from "@/components/page/page";

export default {
  mixins: [Teach],
  components: { dialogCom, page, relationDialog },
  name: "ThemeManagement",
  data() {
    return {
      loading: false,
      params: {},
      activeName: "all",
      search: {
        title: "",
      },
      classList: [],
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

    handleSwitch(id, val) {
      let _targetText = "",
        _target; // 要到达的状态
      if (val === 0) {
        _target = "enable";
        _targetText = "上架";
      } else if (val === 1) {
        _target = "disable";
        _targetText = "下架";
      }

      this.$confirm(`确定 ${_targetText} 主题？`, "提示", {
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

          this.ApiTeach.postThemeStatusApi(param)
            .then((res) => {
              this.$message.success("修改成功");
              this.init();
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },

    /**
     * 新增主题
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
