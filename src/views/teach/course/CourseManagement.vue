<template>
  <div class="course-management">
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
      activeName: "english",
    };
  },
  mounted() {
    if(this.$route.query.name){
      this.activeName = this.$route.query.name
    }
  },
  methods: {
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
