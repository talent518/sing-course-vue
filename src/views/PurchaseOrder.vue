<template>
  <section>
    <!-- <my-breadcrumb :list="listCrumb"></my-breadcrumb> -->
    <div :class="$style.searchWrap1" class="textLeft">
      <el-row :gutter="20" class="m20 el-form100">
        <el-col :span="4">
          <el-input
            clearable
            v-model="purchaseId"
            placeholder="请输入采购单号"
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
            clearable
            v-model="uid"
            filterable
            remote
            reserve-keyword
            placeholder="请选择经销人员"
            :remote-method="remoteMethod"
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
          <!-- <el-select
            v-model="identityId"
            placeholder="请选择身份"
            value-key="id"
          >
            <el-option value="">请选择组织</el-option>
            <el-option
              :label="item.name"
              :key="item.id"
              :value="item.id"
              v-for="item in identitys"
            ></el-option>
          </el-select> -->
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
        <el-col :span="6">
          <!-- <el-button type="success" @click="getTableList">查询</el-button> -->
          <el-button
            type="primary"
            @click="searchM"
            v-permission="'PurchaseView'"
          >查询
          </el-button
          >
          <el-button
            type="success"
            @click="sponsorSale"
            v-permission="'PurchaseRequest'"
          >发起采购
          </el-button
          >
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m20 el-form100">
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
        <el-col :span="4">
          <el-select
            v-model="status"
            placeholder="请选择采购状态"
            value-key="value"
            clearable
          >
            <el-option
              :label="item.name"
              :key="item.value"
              :value="item.value"
              v-for="item in statusList"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="type"
            placeholder="请选择入库类型"
            value-key="value"
            clearable
          >
            <el-option
              :label="item.name"
              :key="item.value"
              :value="item.value"
              v-for="item in typeList"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div>
      <my-table :data="data" v-loading="loading" class="textLeft">
        <el-table-column
          label="经销人员"
          width="240"
          style="text-left !imporant;"
        >
          <template slot-scope="scope">
            <ul class="textLeft">
              <li>
                <span>所属组织：</span><span>{{ scope.row.orgName }}</span>
              </li>
              <li>
                <span>经销人员：</span><span>{{ scope.row.nickname }}</span>
              </li>
              <li>
                <span>身份：</span><span>{{ scope.row.identityName }}</span>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="item in columnslist"
          :key="item.prop"
          :width="item.width"
        >
          <template slot-scope="{ row }">
            <span :class="judgeClassName(item, row)">{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-popover
              trigger="click"
              v-if="scope.row.status == objstatus.unpaid"
              v-permission="'PurchaseStatus'"
            >
              <div>
                <el-link @click="stateChange(scope, 2)">付款中</el-link>
                <el-link @click="stateChange(scope, 3)">采购成功</el-link>
                <el-link @click="stateChange(scope, 4)">采购失败</el-link>
              </div>
              <el-button slot="reference" type="text" size="small">
                模拟状态变更
              </el-button>
            </el-popover>
            <el-button
              type="text"
              size="small"
              @click="sale(scope)"
              v-if="
                scope.row.status == objstatus.unpaid &&
                userInfo.uid === scope.row.uid
              "
            >
              去支付
            </el-button>
            <el-button
              type="text"
              size="small"
              v-permission="'PurchaseDelete'"
              v-if="scope.row.status == objstatus.unpaid"
              @click="del(scope, 0)"
            >
              删除
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="sale(scope)"
              v-if="scope.row.status == objstatus.purFail"
            >
              去支付
            </el-button>
            <!-- <el-button
              type="text"
              size="small"
              v-permission="'PurchaseDelete'"
              @click="del(scope, 1)"
              v-if="scope.row.status == objstatus.purCancel"
            >
              作废
            </el-button> -->
          </template>
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
    </div>
    <el-dialog
      title="采购申请"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
      :before-close="handleClose"
    >
      <el-form
        label-width="150px"
        class="demo-ruleForm"
        label-position="right"
        ref="ruleForm"
        v-show="isSubmitNoOrder === 0"
      >
        <el-row class="textLeft" type="flex" align="middle">
          <el-col :span="10">
            <el-form-item label="所属组织：">
              <span>{{ model.orgName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="经销人员：">
              <span>{{ model.nickname }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="身份：">
              <span>{{ model.identityName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="textLeft" type="flex" align="middle">
          <el-col :span="10">
            <el-form-item label="采购单号：">
              <span>{{ model.purchaseId }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="供货商：">
              <span>{{ model.fromName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="textLeft" type="flex" align="middle">
          <el-col :span="10">
            <el-form-item label="采购商品：" required>
              <el-select
                v-model="model.productId"
                placeholder="请选择商品"
                @change="selectProducts"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in prices"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="采购单价：">{{ model.price }}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="textLeft">
          <el-col :span="10">
            <el-form-item
              label="入库类型："
              :rules="[
                {
                  required: true,
                  message: '请选择入库类型',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-radio-group v-model="stateId" @change="selectProducts">
                <el-radio
                  :label="item.value"
                  :key="item.value"
                  :value="item.value"
                  v-for="item in typeList"
                >{{ item.name }}
                </el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="现有库存：">
              <el-link type="danger">{{ selfCount }}</el-link>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="textLeft" type="flex" align="middle">
          <el-col :span="10">
            <el-form-item label="采购数量：" required>
              <el-input
                @change="validNumber"
                :controls="false"
                placeholder="请选择数量"
                :precision="0"
                v-model="count"
                :min="1"
                :max="fromAmount"
                :disabled="fromAmount == 0"
              ></el-input>
              <div v-if="error" class="red">采购数量不能超过最大采购数</div>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="textLeft">
            <el-form-item label="最大采购数：">
              <span>{{ fromAmount }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="textLeft" type="flex" align="middle">
          <el-col :span="10">
            <el-form-item label="采购金额：">
              <el-link type="danger"
              ><span>{{ totalMoney | formatNum }}</span></el-link
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="" class="textLeft">
          <el-button
            type="success"
            :disabled="fromAmount == 0"
            @click="submitOrder('ruleForm')"
          >提交订单
          </el-button
          >
        </el-form-item>
      </el-form>
      <section v-show="isSubmitNoOrder !== 0">
        <el-row>
          <el-col :span="12">采购单号：{{ purchaseNOByPro }}</el-col>
          <el-col :span="12"
          >采购金额：<span class="red">{{
              totalMoney1 | formatNum
            }}</span></el-col
          >
        </el-row>
        <el-image :src="qrUrl">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </section>
    </el-dialog>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import commonSelect from "@/views/common/commonSelect";
  import {mapGetters} from "vuex";
  //mybreadcrumb
  const objstatus = {
    unpaid: 1,
    duringPayment: 2,
    purSuccess: 3,
    purFail: 4,
    purCancel: 5,
  };
  const payOrder = {
    SUCCESS: "支付成功",
    REFUND: "转入退款",
    CLOSED: "已关闭",
    REVOKED: "已撤销",
    USERPAYING: "支付中",
    PAYERROR: "支付失败",
  };
  export default {
    name: "PurchaseOrder",
    mixins: [menuRole, commonMessage, commonSelect],
    data() {
      return {
        m1: "",
        objstatus,
        data: [],
        count: "",
        listCrumb: [
          {
            name: "系统管理",
          },
          {
            name: "会员卡库存",
            path: "PurchaseOrder",
          },
        ],
        columnslist: [
          // { prop: "orgName", label: "所属组织" },
          // { prop: "username", label: "经销人员" },
          // { prop: "identityName", label: "身份" },
          {prop: "productName", label: "商品名称"},
          {prop: "typeV", label: "入库类型"},
          {prop: "purchaseId", label: "采购单号"},
          {prop: "fromName", label: "供货商"},
          {prop: "priceV", label: "采购价"},
          {prop: "amount", label: "采购数量"},
          {prop: "moneyV", label: "采购金额"},
          {prop: "createTime", label: "采购时间"},
          {prop: "statusV", label: "采购状态"},
          {prop: "remark", label: "备注", width: 150},
        ],
        fromAmount: 0,
        prices: [],
        model: {},
        // typeList: [],
        // statusList: [],
        state: 0,
        stateId: "",
        selfCount: 0,
        rules1: [
          {
            required: true,
            message: "请选择入库类型",
            trigger: ["blur", "change"],
          },
        ],
        products: [],
        productId: "",
        identitys: [],
        identityId: "",
        orgId: "",
        orgs: [],
        status: "",
        statusList: [],
        typeList: [],
        type: "",
        purchaseId: "",
        users: [],
        valueDate: [],
        beginDate: "",
        endDate: "",
        pageSize: 5,
        remark: "",
        isSubmitNoOrder: 0,
        qrUrl: "",
        purchaseNOByPro: "",
        totalMoney1: 0,
        error: false,
      };
    },
    computed: {
      ...mapGetters("user", {
        userInfo: "userInfo",
      }),
      totalMoney() {
        let price = (this.count * this.model.price).toFixed(2);
        if (Number.isNaN(Number(price))) {
          return 0;
        } else {
          return price;
        }
      },
    },
    watch: {
      count(n) {
        if (n == null || n == "" || n < 1) {
          this.count = 1;
        } else {
          if (typeof this.count === "string") {
            this.count = this.count.replace(/\D/g, "");
            if (this.count > this.fromAmount) {
              this.count = Math.min(this.count, this.fromAmount);
              this.error = true;
              setTimeout(() => {
                this.error = false;
              }, 2000);
            }
          }
        }
      },
    },
    methods: {
      judgeClassName(item, row) {
        let className = item.prop === "statusV" ? "red" : "";
        return row.status == 4 || row.status == 5 ? className : "";
      },
      handleClose(done) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.getTableList();
        }, 100);
        done();
      },
      async stateChange({row}, status) {
        let d = await this.ApiProduction.productPruStatus(row.purchaseId, status);
        this.getTableList();
      },
      searchM() {
        if (this.valueDate && this.valueDate.length) {
          this.beginDate = this.dayjs(this.valueDate[0]).format("YYYY-MM-DD");
          this.endDate = this.dayjs(this.valueDate[1]).format("YYYY-MM-DD");
        } else {
          this.beginDate = "";
          this.endDate = "";
        }
        this.getTableList();
      },
      checkPayState() {
        this.timer = setInterval(async () => {
          let d = await this.ApiProduction.orderQueryStatus(
            this.buyPro.purchaseNO
          );
          let type = d === "SUCCESS" ? "success" : "error";
          if (payOrder[d]) {
            this.$message({
              showClose: true,
              message: payOrder[d],
              type,
            });
            clearInterval(this.timer);
            this.close();
            this.getTableList();
          }
        }, 1000);
      },
      del({row}, state) {
        let content = "";
        if (state === 0) {
          content = `确定要删除该订单吗`;
        } else if (state === 1) {
          content = `确定要作废该订单吗`;
        }
        this.confirmDelMessage(
          content,
          async () => {
            return this.ApiProduction.delProductPurchase(row.purchaseId);
          },
          async () => {
            this.getTableList();
          }
        );
      },
      cancellation() {
      },
      pay() {
      },
      validNumber() {
        // this.count = this.count.replace(/\D/g, "");
        // if (this.count > this.fromAmount) {
        //   this.count = this.fromAmount;
        //   this.error = true;
        // }
        // if (this.count == null) {
        //   this.$nextTick(() => {
        //     this.count = 1;
        //   });
        // }
        // setTimeout(() => {
        //   this.error = false;
        // }, 2000);
        // console.log(this.count);
      },
      selectProducts() {
        this.prices.forEach((price) => {
          if (price.id === this.model.productId) {
            if (this.stateId === 0) {
              this.selfCount = price.firstAmount;
              this.fromAmount = price.fromFirstAmount;
              this.model.price = price.firstPrice;
              this.model.fromAmount = this.firstAmount;
            } else if (this.stateId === 1) {
              this.selfCount = price.secondAmount;
              this.fromAmount = price.fromSecondAmount;
              this.model.price = price.secondPrice;
              this.model.fromAmount = this.secondAmount;
            }
            // this.fromAmount = Math.min(this.maxVipBatch, this.fromAmount);
          }
        });
      },
      async getBathSetting() {
        let obj = await this.ApiProduction.getBathSetting();
        this.maxVipBatch = Number(obj.maxVipBatch);
      },
      async sale({row}) {
        this.isSubmitNoOrder = 1;
        this.state = 0;
        this.open();
        this.totalMoney1 = row.money;
        this.buyPro = {purchaseNO: row.purchaseNO};
        this.purchaseNOByPro = row.purchaseNO;
        this.qrUrl = await this.ApiProduction.getProductPay(row.purchaseId);
        this.checkPayState();
        this.closeLoading();
      },
      async sponsorSale() {
        this.isSubmitNoOrder = 0;
        this.stateId = "";
        this.count = 1;
        this.state = 1;
        this.fromAmount = 0;
        this.remark = "";
        this.selfCount = "";
        this.$nextTick(() => {
          this.open();
          this.addNewSale("");
        });
      },
      async addNewSale() {
        let d = await this.ApiProduction.productRequest();
        d.price = "";
        this.prices = d.prices;
        this.model = d;
      },
      async submitOrder(formForm) {
        if (this.model.productId == null) {
          this.$message({message: "请选择采购产品", type: "error"});
          return;
        }
        if (this.stateId === "") {
          this.$message({message: "请选择入库类型", type: "error"});
          return;
        }
        this.model.money = this.totalMoney;
        this.model.amount = this.count;
        this.model.type = this.stateId;
        this.model.fromAmount = this.fromAmount;
        this.model.remark = this.remark;
        this.prices.forEach((price) => {
          if (price.id === this.model.productId) {
            this.model.productName = price.name;
            this.model.priceId = price.priceId;
          }
        });
        this.buyProduction();
        this.isSubmitNoOrder = 1;
      },
      async buyProduction() {
        //this.openLoading();
        let d = "";
        if (this.state === 0) {
          d = await this.ApiProduction.putProductPurchase(this.model);
        } else {
          d = await this.ApiProduction.postProductPurchase(this.model);
        }
        this.buyPro = d;
        this.qrUrl = await this.ApiProduction.getProductPay(d.purchaseId);
        this.purchaseNOByPro = d.purchaseNO;
        //if (d == this.saveSuccess) {
        //this.close();
        //this.getTableList();
        //}
        this.totalMoney1 = this.totalMoney;
        this.checkPayState();
        // this.closeLoading();
      },
      currentChange() {
        this.getTableList();
      },
      async getProduct() {
        this.products = await this.ApiProduction.getProduct();
      },
      async getUserIdentitys() {
        this.identitys = await this.ApiUser.getUserIdentitys();
      },
      async getUser() {
        this.users = await this.ApiUser.getUser();
      },
      selectTypes() {
      },
      async getTableList() {
        this.openLoading();
        /*** curPage,
         pageSize,
         purchaseId,
         orgId,
         uid,
         curPage,
         productId,
         status, */
        let typeList = await this.ApiProduction.productPurchaseType();
        let statusList = await this.ApiProduction.productPurchaseStatus();
        this.typeList = typeList;
        let data = await this.ApiProduction.productPurchase({
          curPage: this.curPage,
          pageSize: this.pageSize,
          orgId: this.orgId,
          status: this.status,
          productId: this.productId,
          purchaseId: this.purchaseId,
          type: this.type,
          beginDate: this.beginDate,
          endDate: this.endDate,
          uid: this.uid,
        });
        this.total = data.rowCount;
        data.list.forEach((i) => {
          typeList.forEach((item) => {
            if (i.type === item.value) {
              i.typeV = item.name;
            }
          });
          statusList.forEach((item) => {
            if (i.status === item.value) {
              i.statusV = item.name;
            }
          });
          i.priceV = this.formatNum(i.price);
          i.moneyV = this.formatNum(i.money);
        });
        this.data = data.list;
        this.statusList = statusList;
        this.typeList = typeList;
        this.closeLoading();
      },
    },
    mounted() {
      this.getBathSetting();
      this.getTableList();
      this.getProduct();
      this.getUserIdentitys();
      this.getOrgs();
      this.getUser();
      this.remoteMethod("");
    },
  };
</script>
<style lang="scss" module>
  @import "./common/search.scss";

  .searchWrap1 {
    // max-width: 1400px;
    overflow: hidden;
  }

  .myInput {
    display: inline-block;
    width: 220px;
  }

  .labelSpan {
    display: inline-block;
    width: 120px;
  }
</style>
