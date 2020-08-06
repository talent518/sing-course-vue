<template>
  <div class="course-management">
    <el-form inline size="small">
      <div class="course-management-form" style="padding-top: 0">
        <el-form-item label="">
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

        <el-button v-permission="'CourseView'" type="primary" plain size="small" @click="handleSearch"
          >查询</el-button
        >
        <el-button v-permission="'CourseCreate'" type="success" plain size="small" @click="addClass">新增课程</el-button>
      </div>
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
      <el-table-column prop="title" label="课程标题" width=""></el-table-column>
      <!--<el-table-column prop="" label="教具" width=""></el-table-column>-->
      <el-table-column prop="theme_num" label="主题" width=""></el-table-column>
      <el-table-column
        prop="textbook_number"
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
			v-permission="'CourseUpdate'"
              @click="editCourse(scope.row)"
              plain
              type="primary"
              size="mini"
              >编辑</el-link
            >
            <el-link
			v-permission="'CourseCorrelation'"
              @click="relationClass(scope.row)"
              plain
              type="primary"
              size="mini"
              >关联教材</el-link
            >

            <template>
              <el-popconfirm
			  v-permission="'CourseDel'"
                title="确定要删除课程吗？"
                @onConfirm="delCourse(scope.row.id)"
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
import dialogCom from "./CourseDialog";
import relationDialog from "./RelationDialog";
import page from "@/components/page/page";

export default {
  mixins: [Teach],
  components: { dialogCom, page, relationDialog },
  name: "CourseManagement",
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
      let data = await this.ApiTeach.getCourseListApi(json);
      this.classList = data.items;
      this.page.total = data.total;
    },
    //删除课程
    delCourse(id) {
      this.ApiTeach.delCourseApi(id).then((res) => {
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

      this.$confirm(`确定 ${_targetText} 课程？`, "提示", {
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

          this.ApiTeach.postCourseStatusApi(param)
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
     * 新增课程
     */
    addClass() {
      this.dialogObj = {
        type: 0,
        show: true,
        name: "新增课程",
      };
    },
    editCourse(val) {
      this.dialogObj = {
        type: 2,
        show: true,
        name: "修改课程",
        title: val.title,
        sub_title: val.sub_title,
        status: val.status,
        cover: val.cover,
        id: val.id,
        textbook_number: val.textbook_number,
      };
    },
    relationClass(val) {
      this.relationObj = {
        id: val.id,
        element_type: val.element_type,
        show: true,
      };
    },

    handleClick(tab) {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
.course-management {
  text-align: left;
  .course-management-form {
    padding-top: 20px;
  }
}
</style>
