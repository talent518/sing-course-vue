<template>
  <section>
    <el-row class="textLeft m20 el-form100" :gutter="20">
      <el-col :span="4">
        <el-select
          v-model="uid"
          filterable
          remote
          reserve-keyword
          placeholder="请选择经销人员"
          :remote-method="getUsers"
          clearable
        >
          <el-option
            v-for="item in userList"
            :key="item.uid"
            :label="item.username"
            :value="item.uid"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select clearable v-model="model.method" placeholder="请选择方法">
          <el-option v-for="m in methods" :value="m" :key="m"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input
          clearable
          v-model="model.api"
          placeholder="请输入API"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          clearable
          v-model="ymd"
          type="datetime"
          placeholder="请选择时间"
          @change="selectTime"
        ></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="searchM">查询</el-button>
        <el-button type="primary" @click="statisticsM">统计</el-button>
      </el-col>
    </el-row>
    <my-table :data="data">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columnslist"
        :key="item.prop"
      >
      </el-table-column>
    </my-table>
    <div class="mt-4">
      <el-pagination
        background
        layout="prev, pager, next,total"
        :total="total"
        :page-size="pageSize"
        @current-change="currentChange"
        :current-page.sync="model.curPage"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="每个路由的访问次数"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <my-table :data="data1">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="item in columnslist1"
          :key="item.prop"
        >
        </el-table-column>
      </my-table>
    </el-dialog>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import commonSelect from "@/views/common/commonSelect";

  export default {
    name: "LogView",
    mixins: [menuRole, commonMessage, commonSelect],
    data() {
      return {
        data: [],
        data1: [],
        ymd: "",
        columnslist: [
          // { prop: "uid", label: "用户ID" },
          {prop: "nickname", label: "用户名"},
          {prop: "api", label: "API"},
          {prop: "method", label: "方法"},
          {prop: "runTime", label: "执行时间"},
          {prop: "createTime", label: "请求时间"},
        ],
        columnslist1: [
          {prop: "name", label: "路由"},
          {prop: "value", label: "次数"},
        ],
        model: {
          method: "",
          api: "",
          ymd: "",
          uid: "",
          curPage: 1,
        },
        methods: ["OPTIONS", "HEAD", "GET", "POST", "PUT", "PATCH", "DELETE"],
      };
    },
    methods: {
      statisticsM() {
        this.open();
      },
      searchM() {
        this.model.curPage = 1;
        this.getLog();
      },
      async getLog() {
        let d = await this.ApiOther.getLog(this.model);
        this.data = d.list;
        this.total = d.rowCount;
      },
      statisticsM() {
        this.getLogStatus();
      },
      currentChange(curPage) {
        this.model.curPage = curPage;
        this.getLog();
      },
      async getLogStatus() {
        this.open();
        this.data1 = await this.ApiOther.getLogStatus();
      },
      selectTime() {
        if (this.ymd instanceof Date) {
          this.model.ymd = this.dayjs(this.ymd).format("YYYYMMDD");
        } else {
          this.model.ymd = "";
        }
      },
    },
    mounted() {
      this.getLog();
      this.getUsers("");
    },
  };
</script>
