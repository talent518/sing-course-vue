<template>
  <section>
    <el-row class="textLeft m20 el-form100" :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="请输入销售单号"
          v-model="sellId"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="orgId"
          placeholder="请选择组织"
          value-key="orgId"
          clearable
        >
          <el-option
            :label="item.orgName"
            :key="item.orgId"
            :value="item.orgId"
            v-for="item in orgs"
          >
            <span v-for="item in item.index" class="opcaity">13</span
            ><span>{{ item.orgName }}</span></el-option
          >
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="uid"
          filterable
          remote
          clearable
          reserve-keyword
          placeholder="请选择经销人员"
          :remote-method="getUsers"
          value-key="id"
        >
          <el-option
            v-for="item in userList"
            :key="item.uid"
            :label="item.nickname"
            :value="item.uid"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="productId"
          placeholder="请选择商品"
          value-key="id"
          clearable
        >
          <el-option
            :label="item.name"
            :key="item.id"
            :value="item.id"
            v-for="item in products"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="textLeft m20 el-form100" :gutter="20">
      <el-col :span="4">
        <el-select
          v-model="type"
          placeholder="出库类型"
          value-key="value"
          clearable
        >
          <el-option value="">请选择出库类型</el-option>
          <el-option
            :label="item.name"
            :key="item.value"
            :value="item.value"
            v-for="item in inventoryList"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="valueDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="searchM">查询</el-button>
      </el-col>
    </el-row>
    <my-table :data="data" v-loading="loading">
      <el-table-column
        label="销售单号"
        prop="sellId"
        width="100"
      ></el-table-column>
      <el-table-column label="销售商信息">
        <template slot-scope="scope">
          <ul>
            <li>
              <span>组织：{{ scope.row.orgName }}</span>
            </li>
            <li>
              <span>销售商：{{ scope.row.nickname }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="出库类型" prop="typeV"></el-table-column>
      <el-table-column label="采购商信息" width="200">
        <template slot-scope="scope">
          <ul>
            <li>
              <span>组织：{{ scope.row.fromOrgName }}</span>
            </li>
            <li>
              <span>销售商：{{ scope.row.fromName }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
        v-for="item in cols"
      ></el-table-column>
      <el-table-column label="销售状态" width="">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">{{ scope.row.statusV }}</span>
          <span v-else class="red">{{ scope.row.statusV }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </my-table>
    <el-pagination
      :total="total"
      :current-page="curPage"
      :page-size="pageSize"
      @current-change="currentChange"
      class="m20"
      background
      layout="prev, pager, next,total"
    ></el-pagination>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import commonSelect from "@/views/common/commonSelect";

  export default {
    name: "SellManager",
    mixins: [menuRole, commonMessage, commonSelect],
    data() {
      return {
        sellId: "",
        data: [],
        status: [],
        pageSize: 5,
        cols: [
          {prop: "productName", label: "商品名称", width: 100},
          {prop: "price", label: "销售价"},
          {prop: "amount", label: "销售数量", width: 120},
          {prop: "moneyV", label: "销售金额"},
          {prop: "createTime", label: "销售时间", width: 200},
          // { prop: "status", label: "销售状态" },
          // { prop: "remark", label: "备注" },
        ],
      };
    },
    methods: {
      currentChange(curPage) {
        this.curPage = curPage;
        this.searchM();
      },
      searchM() {
        this.getPaySellList();
      },
      async getPaySellList() {
        this.openLoading();
        if (this.valueDate && this.valueDate.length) {
          this.beginDate = this.dayjs(this.valueDate[0]).format("YYYY-MM-DD");
          this.endDate = this.dayjs(this.valueDate[1]).format("YYYY-MM-DD");
        } else {
          this.beginDate = "";
          this.endDate = "";
        }
        let o = {
          sellId: this.sellId,
          orgId: this.orgId,
          productId: this.productId,
          uid: this.uid,
          beginDate: this.beginDate,
          endDate: this.endDate,
          type: this.type,
          curPage: this.curPage,
          pageSize: this.pageSize,
        };
        let d = await this.ApiProduction.paySell(o);
        d.list.forEach((item) => {
          this.inventoryList.forEach((i) => {
            if (item.type === i.value) {
              item.typeV = i.name;
            }
          });
          this.status.forEach((i) => {
            if (item.status === i.value) {
              item.statusV = i.name;
            }
          });
          item.moneyV = this.formatNum(item.money);
        });
        this.total = d.rowCount;
        this.data = d.list;
        this.closeLoading();
      },
      async dictStatus() {
        this.status = await this.ApiProduction.dictStatus();
      },
    },
    async mounted() {
      await this.dictStatus();
      await this.getOrgs();
      await this.getProduct();
      await this.getUsers("");
      await this.getInventorTypes();
      this.getPaySellList();
    },
  };
</script>
