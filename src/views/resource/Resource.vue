<template>
  <div>
    resource0

    <el-pagination
      class="m20"
      background
      layout="prev, pager, next,total"
      :total="page.total"
      :page-size="page.size"
      @current-change="pageCurrentChange"
      :current-page.sync="page.index"></el-pagination>
  </div>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage"
  import menuRole from "@/views/common/menuRole"

  export default {
    name: "Resource",

    mixins: [commonMessage, menuRole],

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

    },

    methods: {
      async getData() {
        let param = {
          pageIndex: this.page.index,
          pageSize: this.page.size,
        }
        let res = await this.ApiBasic.getResource(param);
        this.loading = false;
        this.list = res.items;
        this.page.total = res.total;
      },

      pageCurrentChange(index) {
        this.page.index = index;
        this.getData();
      },
    },
  }
</script>

<style scoped>

</style>