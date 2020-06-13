<template>
  <section>
    <el-row class="m20 el-form100" :gutter="20">
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
          reserve-keyword
          placeholder="请选择经销人员"
          :remote-method="remoteMethod"
          value-key="id"
          clearable
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
      <el-col :span="6">
        <div class="flexCenterH">
          <div>
            <el-input
              type="number"
              v-model="beginAmount"
              placeholder="库存数"
              @change="changeNumber"
            ></el-input>
          </div>
          <span style="margin: 0 10px;">至</span>
          <div>
            <el-input
              @change="changeNumber"
              type="number"
              v-model="endAmount"
              placeholder="库存数"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="textLeft">
        <el-button type="primary" @click="searchM">查询</el-button>
        <!-- <el-button type="success">导出</el-button> -->
      </el-col>
    </el-row>
    <my-table :data="data" v-loading="loading">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columnslist"
        :key="item.prop"
      >
      </el-table-column>
      <el-table-column prop="priceV" label="销售价">
        <template slot-scope="{ row }">
          <span>{{ row.priceV | formatNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经销库存">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="showDetail(scope, 1)"
            v-if="scope.row.firstWarningAmount < scope.row.firstAmount"
            >{{ scope.row.firstAmount }}
          </el-link>
          <el-link v-else type="danger" @click="showDetail(scope, 1)"
            >{{ scope.row.firstAmount }}
          </el-link>
        </template>
      </el-table-column>
      <!-- <el-table-column  label="首次经销暂扣库存数">
        <template slot-scope="scope">
          <span>{{ scope.row.firstTempAmount }}</span></template
        >
      </el-table-column> -->
      <el-table-column label="裂变库存">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="showDetail(scope, 0)"
            v-if="scope.row.secondWarningAmount < scope.row.secondAmount"
            >{{ scope.row.secondAmount }}
          </el-link>
          <el-link v-else type="danger" @click="showDetail(scope, 1)"
            >{{ scope.row.secondAmount }}
          </el-link>
        </template>
      </el-table-column>
      <!-- <el-table-column  label="二次经销暂扣库存数">
        <template slot-scope="scope">
          <span>{{ scope.row.secondTempAmount }}</span></template
        >
      </el-table-column> -->
    </my-table>
    <el-dialog
      title="库存流水"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <el-row class="textLeft m20 el-form100" :gutter="20">
        <el-col :span="10">
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-select
            placeholder="请选择类型"
            v-model="type"
            @change="changeType"
            value-key="id"
          >
            <el-option value="">请选择类型</el-option>
            <el-option
              :label="item.name"
              :key="item.value"
              :value="item.value"
              v-for="item in stockTypes"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="textLeft">
          <el-button type="success" @click="searchChildTable">查询</el-button>
        </el-col>
      </el-row>
      <my-table :data="data1">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="item in c1"
          :key="item.prop"
        >
        </el-table-column>
      </my-table>
      <el-pagination
        class="m20"
        background
        layout="prev, pager, next,total"
        :total="total"
        :page-size="pageSize"
        @current-change="currentChange"
        :current-page.sync="curPage"
      >
      </el-pagination>
    </el-dialog>
  </section>
</template>
<script>
import menuRole from "@/views/common/menuRole";
import commonMessage from "@/views/common/commonMessage";
import commonSelect from "@/views/common/commonSelect";

export default {
  name: "StockManager",
  mixins: [menuRole, commonMessage, commonSelect],
  data() {
    return {
      orgId: "",
      data: [],
      productId: "",
      columnslist: [
        { prop: "orgName", label: "所属组织" },
        { prop: "nickname", label: "经销人员" },
        { prop: "identityV", label: "身份" },
        { prop: "productV", label: "商品名称" },
        // { prop: "priceV", label: "销售价" },
        // { prop: "firstAmount", label: "首次经销库存数" },
        // { prop: "firstTempAmount", label: "首次经销暂扣库存数" },
        // { prop: "secondAmount", label: "二次经销库存数" },
        // { prop: "secondTempAmount", label: "二次经销暂扣库存数" },
      ],
      products: [],
      orgs: [],
      identityId: "",
      identitys: [],
      valueDate: [],
      typeList: [],
      rowId: "",
      type: "",
      data1: [],
      c1: [
        { prop: "typeV", label: "类型" },
        { prop: "amount", label: "库存变化" },
        { prop: "createTime", label: "时间" },
        { prop: "newAmount", label: "剩余库存" },
      ],
      stockTypes: [],
      username: "",
      beginDate: "",
      endDate: "",
      name: "",
      beginAmount: "",
      endAmount: "",
      pageSize: 5,
    };
  },
  methods: {
    searchChildTable() {
      this.getPageStockLog();
    },
    changeType(val) {
      this.curPage = 1;
      this.o.curPage = 1;
      this.o.type = this.type;
      this.searchChildTable();
      //this.getPageStockLog();
    },
    changeDate() {
      this.curPage = 1;
      this.o.curPage = 1;
      if (this.valueDate && this.valueDate.length) {
        this.beginDate = this.dayjs(this.valueDate[0]).format("YYYY-MM-DD");
        this.endDate = this.dayjs(this.valueDate[1]).format("YYYY-MM-DD");
        this.o.beginDate = this.beginDate;
        this.o.endDate = this.endDate;
      } else {
        this.o.beginDate = this.beginDate = "";
        this.o.endDate = this.endDate = "";
      }
    },
    async searchM() {
      this.productStock();
    },
    async getPageStockLog() {
      let d = await this.getProductStockLog(this.o);
      this.total = d.rowCount;
      d.list.forEach((i) => {
        this.stockTypes.forEach((item) => {
          if (i.type === item.value) {
            i.typeV = item.name;
          }
        });
      });
      this.data1 = d.list;
      this.open();
    },
    resetData() {
      this.curPage = 1;
      this.valueDate = [];
      this.beginAmount = "";
      this.endAmount = "";
      this.type = "";
    },
    async showDetail({ row }, isFirst) {
      this.resetData();
      this.o = {
        curPage: this.curPage,
        pageSize: this.pageSize,
        uid: row.uid,
        productId: row.productId,
        type: this.type,
        isFirst,
        beginDate: this.beginDate,
        endDate: this.endDate,
      };
      await this.stockLogType();
      this.getPageStockLog();
    },
    currentChange() {
      this.o.curPage = this.curPage;
      this.getPageStockLog();
    },
    async getProductStockLog(obj) {
      return await this.ApiProduction.productStockLog(obj);
    },
    async getProduct() {
      this.products = await this.ApiProduction.getProduct();
    },
    async stockLogType() {
      this.stockTypes = await this.ApiProduction.stockLogType();
    },

    async getIndetitys() {
      this.identitys = await this.ApiUser.getUserIdentitys();
    },
    async productPurchaseType() {
      this.typeList = await this.ApiProduction.productPurchaseType();
    },
    changeNumber() {
      this.beginAmount = parseInt(this.beginAmount) || "";
      this.endAmount = parseInt(this.endAmount) || "";
    },
    async productStock() {
      this.openLoading();
      let d = await this.ApiProduction.productStock({
        productId: this.productId,
        orgId: this.orgId,
        curPage: this.curPage,
        uid: this.uid,
        pageSize: this.pageSize,
        beginAmount: this.beginAmount,
        endAmount: this.endAmount,
      });
      d.list.forEach((item) => {
        this.identitys.forEach((i) => {
          if (i.id === item.identityId) {
            item.identityV = i.name;
          }
        });
        this.products.forEach((i) => {
          if (i.id === item.productId) {
            item.productV = i.name;
            item.priceV = i.price;
          }
        });
      });
      this.data = d.list;
      this.closeLoading();
    },
  },
  async mounted() {
    await this.productPurchaseType();
    await this.getProduct();
    await this.getOrgs();
    await this.getIndetitys();
    await this.productStock();
    this.remoteMethod("");
    //this.stockLogType();
  },
};
</script>
