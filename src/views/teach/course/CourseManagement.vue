<template>
  <div class="course-management">
    <!--<el-form inline size="small" class="section-search">-->

    <!--  <el-form-item>-->
    <!--    <el-input-->
    <!--      clearable-->
    <!--      placeholder="请输入课程标题"-->
    <!--      v-model="search.title"-->
    <!--      style="width: 200px;"></el-input>-->
    <!--  </el-form-item>-->

    <!--  <el-form-item>-->
    <!--    <el-button v-permission="'CourseView'" type="primary" plain size="small" @click="handleSearch">查询</el-button>-->
    <!--  </el-form-item>-->

    <!--  <el-form-item>-->
    <!--    <el-button v-permission="'CourseCreate'" type="success" plain size="small" @click="addClass">新增课程</el-button>-->
    <!--  </el-form-item>-->
    <!--</el-form>-->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="英语课程" name="english"></el-tab-pane>
      <el-tab-pane label="音乐课程" name="music"></el-tab-pane>
      <el-tab-pane label="美术课程" name="art"></el-tab-pane>
    </el-tabs>

    <english-course v-if="activeName=='english'"></english-course>
    <music-course v-if="activeName=='music'"></music-course>
    <art-course v-if="activeName=='art'"></art-course>
  </div>
</template>

<script>
import Teach from "@/views/common/teach";
import EnglishCourse from "./englishCourse/EnglishCourse";
import MusicCourse from "./musicCourse/MusicCourse";
import ArtCourse from "./artCourse/ArtCourse";

export default {
  mixins: [Teach],
  components: {EnglishCourse,MusicCourse,ArtCourse},
  name: "CourseManagement",
  data() {
    return {
      loading: false,
      params: {},
      activeName: "english",
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
    if(this.$route.query.name){
      this.activeName = this.$route.query.name
    }
    // console.log(this.$route.query.name)
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

    handleClick(val) {
      this.$router.push({
        name: 'Course',
        query:{
          name:val.name
        }
      });
      console.log(this.$route.query.name)
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
