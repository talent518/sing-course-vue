<template>
  <section>
    <el-row :gutter="20" class="el-form100 m20">
      <el-col :span="4">
        <el-input
          v-model="searchObj.orderNO"
          placeholder="请输入完整订单号"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select clearable v-model="searchObj.orgId" placeholder="请选择组织">
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
          clearable
          v-model="searchObj.productId"
          placeholder="请选择商品"
        >
          <el-option
            :label="item.name"
            :key="item.id"
            :value="item.id"
            v-for="item in products"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="searchObj.type"
          placeholder="请选择订单类型"
          clearable
        >
          <el-option
            :label="item.name"
            :key="item.value"
            :value="item.value"
            v-for="item in types"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="searchObj.buyType"
          placeholder="请选择购买类型"
          clearable
        >
          <el-option
            :label="item.name"
            :key="item.value"
            :value="item.value"
            v-for="item in buytypes"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="el-form100 m20">
      <el-col :span="4">
        <el-select
          clearable
          v-model="searchObj.uid"
          placeholder="请选择销售人员"
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
          clearable
          v-model="searchObj.status"
          placeholder="请选择付款类型"
          value-key="value"
        >
          <el-option
            :label="item.name"
            :key="item.value"
            :value="item.value"
            v-for="item in status"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="searchObj.valueDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="4" class="textLeft">
        <el-button type="primary" @click="searchM">查询</el-button>
        <el-button type="success" @click="exportOrder">导出</el-button>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <my-table :data="data" v-loading="loading">
      <el-table-column label="订单号">
        <template slot-scope="{ row }">
          <span>{{ row.orderNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买人">
        <template slot-scope="{ row }">
          <ul>
            <li>
              <span>姓名：{{ row.userNick }}</span>
            </li>
            <li>
              <span>手机号：{{ row.mobile }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="商品信息">
        <template slot-scope="{ row }">
          <ul>
            <li>
              <span>期数：{{ row.periodsName }}</span>
            </li>
            <li>
              <span>商品：{{ row.productName }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" prop="typeV"></el-table-column>
      <el-table-column label="购买类型" prop="buyTypeV"></el-table-column>
      <el-table-column label="付款金额" prop="productPrice"></el-table-column>
      <el-table-column label="付款类型">
        <template slot-scope="{ row }">
          <ul>
            <li>
              付款状态：<span :class="row.status != 1 ? 'red' : ''">{{
                row.statusV
              }}</span>
            </li>
            <li>
              <span>付款时间：{{ row.orderTime }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="经销人员信息">
        <template slot-scope="{ row }">
          <ul>
            <li>
              <span>组织：{{ row.orgName }}</span>
            </li>
            <li>
              <span>经销人员：{{ row.nickname }}</span>
            </li>
            <li>
              身份：<span>：{{ row.identityName }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
    </my-table>
    <el-pagination
      class="m20"
      background
      layout="prev, pager, next,total"
      :total="searchObj.total"
      :page-size="searchObj.pageSize"
      @current-change="currentChange"
      :current-page.sync="searchObj.curPage"
    >
    </el-pagination>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import commonSelect from "@/views/common/commonSelect";

  export default {
    name: "OrderQuery",
    mixins: [menuRole, commonMessage, commonSelect],
    data() {
      return {
        searchObj: {
          orgId: "",
          uid: "",
          productId: "",
          valueDate: [],
          beginDate: "",
          endDate: "",
          curPage: 1,
          pageSize: 5,
          total: 1,
          orderNO: "",
          type: "",
          status: "",
          buyType: "",
        },
        data: [],
        orders: [],
        types: [],
        status: [],
        buytypes: [],
      };
    },
    watch: {
      "searchObj.valueDate"(n) {
        if (Array.isArray(n)) {
          this.searchObj.beginDate = this.dayjs(n[0]).format("YYYY-MM-DD");
          this.searchObj.endDate = this.dayjs(n[1]).format("YYYY-MM-DD");
        } else {
          this.searchObj.beginDate = "";
          this.searchObj.endDate = "";
        }
      },
    },
    methods: {
      searchM() {
        this.searchObj.curPage = 1;
        this.orderQuery();
      },
      async exportOrder() {
        let d = await this.ApiOrder.exportOrder(this.searchObj);
        document.location.href = d;
      },
      currentChange(curPage) {
        this.searchObj.curPage = curPage;
        this.orderQuery();
      },
      async orderQuery() {
        this.openLoading();
        let d = await this.ApiOrder.getOrders(this.searchObj);
        this.searchM.total = d.rowCount;
        d.list.forEach((item) => {
          this.status.forEach((i) => {
            if (item.status === i.value) {
              item.statusV = i.name;
            }
          });
          this.types.forEach((i) => {
            if (item.type === i.value) {
              item.typeV = i.name;
            }
          });
          this.buytypes.forEach((i) => {
            if (item.buyType === i.value) {
              item.buyTypeV = i.name;
            }
          });
        });
        this.searchObj.total = d.rowCount;
        this.data = Object.freeze(d.list);
        this.closeLoading();
      },
      async orderTypes() {
        this.types = await this.ApiOrder.orderTypes();
      },
      async buyTypes() {
        this.buytypes = await this.ApiOrder.buyType();
      },
      async orderStatus() {
        this.status = await this.ApiOrder.orderStatus();
      },
    },
    async mounted() {
      this.buyTypes();
      this.orderTypes();
      this.orderStatus();
      await this.getOrgs();
      await this.getProduct();
      await this.getUsers("");
      this.searchM();
    },
  };
</script>
