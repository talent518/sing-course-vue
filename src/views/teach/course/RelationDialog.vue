<template>
  <div class="relation-dialog">
    <el-dialog
      width="800px"
      title="唱唱VIP口语配音课"
      :visible.sync="dialogObj.show"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="handle-box">
        <el-link @click="relationMaterial" plain type="primary" size="mini"
          >关联教材</el-link
        >
        <el-link @click="relationTheme" plain type="primary" size="mini"
          >关联主题</el-link
        >

        <template>
          <el-popconfirm title="确定要移除所有吗？" @onConfirm="deleteAllClass">
            <el-link @click="" plain type="primary" size="mini" slot="reference"
              >全部清除</el-link
            >
          </el-popconfirm>
        </template>
      </div>
      <div class="class-list-box">
        <div class="class-box">
          <div class="title">
            1.Day1 一个人睡
          </div>
          <div class="img-box">
            <img src="../../../assets/image/login/homeLogo.png" alt="" />
            <i class="iconfont el-icon-delete"></i>
          </div>
        </div>

        <div class="class-box">
          <div class="title">
            1.Day1 一个人睡
          </div>
          <div class="img-box">
            <img src="../../../assets/image/login/homeLogo.png" alt="" />
            <i class="iconfont el-icon-delete"></i>
          </div>
        </div>

        <div class="class-box">
          <div class="title">
            1.Day1 一个人睡
          </div>
          <div class="img-box">
            <img src="../../../assets/image/login/homeLogo.png" alt="" />
            <i class="iconfont el-icon-delete"></i>
          </div>
        </div>

        <div class="class-box">
          <div class="title">
            1.Day1 一个人睡
          </div>
          <div class="img-box">
            <img src="../../../assets/image/login/homeLogo.png" alt="" />

            <template>
              <el-popconfirm title="确定要移除吗？" @onConfirm="deleteClass">
                <i class="iconfont el-icon-delete" slot="reference"></i>
              </el-popconfirm>
            </template>
          </div>
        </div>
      </div>

      <!--<div class="color-list" style="display: flex; flex-wrap: wrap;">-->
      <!--  <div-->
      <!--    class="color-item"-->
      <!--    v-for="color in colors"-->
      <!--    v-dragging="{ item: color, list: colors, group: 'color' }"-->
      <!--    :key="color.text"-->
      <!--    style="width: 200px;"-->
      <!--  >-->
      <!--    {{ color.text }}-->
      <!--  </div>-->
      <!--</div>-->
    </el-dialog>
    <relation-material-dialog :dialogObj="relationMaterialObj" />
    <relation-theme-dialog :dialogObj="relationThemeObj" />
  </div>
</template>

<script>
import RelationMaterialDialog from "./RelationMaterialDialog";
import RelationThemeDialog from "./RelationThemeDialog";
export default {
  name: "RelationDialog",
  props: ["dialogObj"],
  components: { RelationMaterialDialog, RelationThemeDialog },
  data() {
    return {
      relationMaterialObj: {
        //给子组件的数据
        show: false,
      },
      relationThemeObj: {
        //给子组件的数据
        show: false,
      },
      // colors: [
      //   {
      //     text: "111",
      //   },
      //   {
      //     text: "222",
      //   },
      //   {
      //     text: "333",
      //   },
      //   {
      //     text: "444",
      //   },
      //   {
      //     text: "555",
      //   },
      //   {
      //     text: "666",
      //   },
      //   {
      //     text: "777",
      //   },
      //   {
      //     text: "888",
      //   },
      //   {
      //     text: "999",
      //   },
      // ],
    };
  },
  mounted() {
    // this.$dragging.$on("dragged", ({ value }) => {
    //   console.log(value.item);
    //   console.log(value.list);
    //   console.log(value.otherData);
    // });
    // this.$dragging.$on("dragend", () => {});
  },
  methods: {
    //提交表单内容
    sub() {},
    relationMaterial() {
      this.relationMaterialObj = {
        show: true,
      };
    },
    relationTheme() {
      this.relationThemeObj = {
        show: true,
      };
    },
    deleteClass() {
      console.log("删除单个");
    },
    deleteAllClass() {
      console.log("删除全部");
    },
  },
  watch: {
    // "dialogObj.show"() {
    //   this.$nextTick(() => {
    //     this.form.title = "";
    //     this.form.sub_title = [];
    //     this.form.cover = "";
    //     this.form.status = 1;
    //     if (this.dialogObj.type == 2) {
    //       this.form = {
    //         title: this.dialogObj.title,
    //         sub_title: this.dialogObj.sub_title,
    //         cover: this.dialogObj.cover,
    //         status: this.dialogObj.status,
    //       };
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.handle-box {
  display: flex;
  width: 50%;
  justify-content: space-around;
}
.class-list-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .class-box {
    margin-top: 20px;
    margin-right: 24px;
    width: 30%;
    height: 200px;
    box-shadow: rgba(0, 0, 0, 0.35) 3px 3px 5px;
    border-radius: 10px;
    text-align: center;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 6px;
      margin-bottom: 6px;
    }
    .img-box {
      img {
        width: 180px;
        height: 140px;
      }
      i {
        display: block;
        background: #c1ebfd;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin: 0 auto;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
