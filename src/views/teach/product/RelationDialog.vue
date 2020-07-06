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
        <el-link @click="relationCourse" plain type="primary" size="mini"
          >关联课程</el-link
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
        <div
          class="class-box"
          v-for="(item, index) in list"
          v-dragging="{ item: item, list: list, group: 'list' }"
          :key="index"
        >
          <div class="title">
            {{ item.course.title }}
          </div>
          <div class="img-box">
            <img :src="item.course.cover" alt="" />

            <template>
              <el-popconfirm
                title="确定要移除吗？"
                @onConfirm="deleteClass(item.id)"
              >
                <i class="iconfont el-icon-delete" slot="reference"></i>
              </el-popconfirm>
            </template>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" v-if="productSortBtn" @click="productSort">保存当前排序</el-button>
      </span>
    </el-dialog>
    <relation-course-dialog :dialogObj="relationCourseObj" @reflash="init" />
  </div>
</template>

<script>
import RelationCourseDialog from "./RelationCourseDialog";
import Teach from "@/views/common/teach";
export default {
  mixins: [Teach],
  name: "RelationDialog",
  props: ["dialogObj"],
  components: { RelationCourseDialog },
  data() {
    return {
      relationCourseObj: {
        //给子组件的数据
        show: false,
      },
      list: [],
      productSortArr:[],
      productSortBtn:false
    };
  },
  mounted() {
    this.$dragging.$on("dragged", ({ value }) => {
      this.productSortArr = value.list
      this.productSortBtn = true
    });
    this.$dragging.$on("dragend", () => {});
  },
  methods: {
    async init() {
      let json = {
        product_id: this.id,
        scene: "all",
      };
      let data = await this.ApiTeach.getProductDetailRelationApi(json);
      this.list = data.items;
      // this.page.total = data.total;
    },
    //提交表单内容
    sub() {},
    relationCourse() {
      this.relationCourseObj = {
        show: true,
        id: this.id,
      };
    },
    productSort(){
      let json={ids:''},arr=[]
      this.productSortArr.forEach(e=>{
        arr.push(e.id)
      })
      json.ids = arr.join(',')
      this.ApiTeach.patchProductDetailSortApi(this.id,json).then((res) => {
        this.$message({
          type: "success",
          message: "保存成功",
        });
      })
    },
    //删除单个
    deleteClass(id) {
      this.ApiTeach.delProductDetailApi(id).then((res) => {
        if(this.list.length==1){
          this.list = []
        }else{
          this.init();
        }
      });
    },
    //删除全部
    deleteAllClass() {
      if(this.list.length==0){
        return
      }
      this.ApiTeach.delAllProductRelationCourseApi(this.id).then((res) => {
        this.init();
      });
    },
  },
  watch: {
    "dialogObj.show"(value) {
      if (value) {
        this.productSortBtn = false
        this.$nextTick(() => {
          this.id = this.dialogObj.id;
          this.init();
        });
      }
    },
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
        margin: 0 auto;
        width: 180px;
        height: 140px;
        display: block;
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
