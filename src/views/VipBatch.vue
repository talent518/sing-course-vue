<template>
  <section>
    <el-row class="textLeft m20 el-form100" :gutter="20">
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
          :remote-method="getUsers"
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
            v-for="item in vipProducts"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="valueDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="searchM">查询</el-button>
        <el-button
          type="success"
          @click="addbatch"
          v-permission="'VipBatchCreate'"
        >
          制作兑换码
        </el-button
        >
      </el-col>
    </el-row>
    <my-table :data="data" v-loading="loading">
      <el-table-column label="经销人员" width="300">
        <template slot-scope="scope">
          <ul>
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
      >
      </el-table-column>
      <el-table-column label="兑换码数量">
        <template slot-scope="scope">
          <el-link type="primary" @click="showDetail(scope)"
          >{{ scope.row.actives }}/{{ scope.row.num }}
          </el-link
          >
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columnslistX"
        :key="item.prop"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <span
            type="text"
            v-if="scope.row.num !== scope.row.actives && scope.row.status === 1"
          >{{ scope.row.statusV }}</span
          >
          <el-button
            type="text"
            @click="downQrCode(scope)"
            v-if="
              scope.row.num !== scope.row.actives &&
              scope.row.status === 2 &&
              userInfo.uid === scope.row.uid
            "
          >{{ scope.row.statusV }}
          </el-button
          >
          <el-button type="text" v-if="scope.row.num === scope.row.actives"
          >已兑换完毕
          </el-button
          >
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
    <el-dialog
      title="制作兑换码"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <my-form :rules="rules" :model="model">
        <el-form-item label="兑换商品：" class="textLeft" prop="productId1">
          <el-select
            placeholder="请选择兑换商品"
            v-model="model.productId1"
            value-key="id"
            @change="changeProduct"
          >
            <el-option
              :label="item.name"
              :key="item.id"
              :value="item.id"
              v-for="item in vipProducts"
            ></el-option>
          </el-select>
          <span class="m30L">现有库存：{{ amount }}</span>
        </el-form-item>
        <el-form-item label="兑换数量：" class="textLeft myNumber" prop="num">
          <div :class="$style.myInput">
            <el-input
              v-model="model.num"
              :controls="false"
              :precision="0"
              :min="1"
              :max="maxValue"
              placeholder="请选择兑换数量"
            ></el-input>
          </div>
          <span class="m30L">最大兑换数量：{{ maxValue }}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="请输入备注" v-model="remark"></el-input>
        </el-form-item>
        <el-form-item label="" class="textLeft">
          <el-button :disabled="maxValue == 0" type="success" @click="save"
          >确定制作
          </el-button
          >
        </el-form-item>
      </my-form>
    </el-dialog>
    <el-dialog
      title="已使用兑换码"
      v-if="dialogFormVisible2"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="clickmodal"
    >
      <el-row class="m20 el-form100" :gutter="20">
        <el-col :span="10" class="textLeft">
          <el-date-picker
            v-model="valueDate1"
            @change="changeDetailDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            l
          >
          </el-date-picker
          >
        </el-col>
        <el-col :span="6">
          <el-input v-model="cardId" placeholder="请输入卡号"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" @click="searchDetail">查询</el-button>
        </el-col>
      </el-row>
      <my-table :data="cardsList">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="item in columnslist1"
          :key="item.prop"
        >
        </el-table-column>
      </my-table>
      <el-pagination
        background
        layout="prev, pager, next,total"
        :total="total1"
        :page-size="pageSize1"
        @current-change="currentChange1"
        :current-page.sync="curPage1"
      >
      </el-pagination>
    </el-dialog>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import commonSelect from "@/views/common/commonSelect";
  import {mapGetters} from "vuex";

  export default {
    name: "VipBatch",
    mixins: [menuRole, commonMessage, commonSelect],
    data() {
      //this.count.replace(/\D/g, "");
      const checkNum = (rule, value, callback) => {
        if (value == 0 || value == "") {
          this.model.num = 1;
          callback();
          return;
        }
        if (typeof value === "string") {
          value = value.replace(/\D/g, "");
        }
        let num = this.maxValue * 1;
        value *= 1;
        if (value > num) {
          this.timer = true;
          callback(new Error("您输入的值不能超过最大兑换数量"));
          setTimeout(() => {
            this.model.num = num;
          }, 1000);
        } else {
          this.model.num = value;
          callback();
        }
      };
      return {
        data: [],
        columnslist: [
          {prop: "productName", label: "商品名称", width: 100},
          {prop: "price", label: "销售价"},
        ],
        columnslistX: [
          {prop: "batchId", label: "批次号", width: 100},
          {
            prop: "createTime",
            label: "生成时间",
            width: 160,
          },
          {prop: "remark", label: "备注"},
        ],
        dialogFormVisible2: false,
        valueDate1: [],
        columnslist1: [
          {prop: "cardId", label: "卡号"},
          {prop: "salt", label: "激活码"},
          {prop: "orderNO", label: "订单号"},
          {prop: "updateTime", label: "激活时间", width: 200},
        ],
        vipProducts: [],
        status: [],
        amount: "",
        model: {
          productId1: "",
          num: 1,
        },
        rules: {
          productId1: [
            {
              required: true,
              message: "选择兑换商品",
              trigger: ["blur", "change"],
            },
          ],
          num: [
            {
              required: true,
              message: "请输入兑换数量",
              trigger: ["blur", "change"],
            },
            {
              validator: checkNum,
              trigger: "change",
            },
          ],
        },
        remark: "",
        maxVipBatch: 0,
        pageSize: 5,
        total1: 1,
        pageSize1: 5,
        cardsList: [],
        valueDate1: [],
        beginDate1: "",
        endDate1: "",
        cardId: "",
        curPage1: 1,
      };
    },
    computed: {
      ...mapGetters("user", {
        userInfo: "userInfo",
      }),
      maxValue() {
        return Math.min(this.amount, this.maxVipBatch);
      },
    },
    methods: {
      open1() {
        this.dialogFormVisible2 = true;
      },
      close1() {
        this.dialogFormVisible2 = false;
      },
      resetData1() {
        this.curPage1 = 1;
        this.valueDate1 = [];
        this.beginDate1 = "";
        this.endDate1 = "";
        this.cardId = "";
      },
      async changeDetailDate() {
        if (this.valueDate1 && this.valueDate1.length) {
          this.beginDate1 = this.dayjs(this.valueDate1[0]).format("YYYY-MM-DD");
          this.endDate1 = this.dayjs(this.valueDate1[1]).format("YYYY-MM-DD");
        } else {
          this.beginDate1 = "";
          this.endDate1 = "";
        }
      },
      async getVipCardsData() {
        let o = {
          cardId: this.cardId,
          beginDate: this.beginDate1,
          endDate: this.endDate1,
          pageSize: this.pageSize1,
          curPage: this.curPage1,
          id: this.batchId,
        };
        let d = await this.ApiProduction.vipBatchCards(o);
        this.cardsList = d.list;
        this.total1 = d.rowCount;
      },
      async searchDetail() {
        this.getVipCardsData();
      },
      async showDetail({row}) {
        this.resetData1();
        this.open1();
        this.batchId = row.batchId;
        this.getVipCardsData();
      },
      async save() {
        let d = await this.ApiProduction.vipBatchProd({
          productId: this.model.productId1,
          num: this.model.num,
          remark: this.remark,
        });
        if (d === this.saveSuccess) {
          this.close();
          this.refleshData();
        }
      },
      refleshData() {
        this.getTableList();
      },
      changeProduct() {
        let o = this.vipProducts.find((item) => {
          return item.id === this.model.productId1;
        });
        this.amount = o.amount;
      },
      async downQrCode({row}) {
        // let uid = row.uid;
        // if (this.userInfo.uid === uid) {
        let d = await this.ApiProduction.getVipQrCode(row.batchId);
        location.href = d;
        // } else {
        //   //this.$alert("用户不一样，不允许下载");
        // }
      },
      resetData() {
        this.model = {
          productId1: "",
          num: 1,
        };
        this.amount = 0;
        this.getBathSetting();
        this.remark = "";
      },
      addbatch() {
        this.resetData();
        this.open();
      },
      searchM() {
        this.getTableList();
      },
      currentChange() {
        this.searchM();
      },
      currentChange1() {
        this.getVipCardsData();
      },
      async getVipBatchPro() {
        this.vipProducts = await this.ApiProduction.getVipBatchPro();
      },
      async getVipBatchStatus() {
        this.status = await this.ApiProduction.getVipBatchStatus();
      },
      async getBathSetting() {
        let obj = await this.ApiProduction.getBathSetting();
        this.maxVipBatch = Number(obj.maxVipBatch);
      },
      async getTableList() {
        this.openLoading();
        if (this.valueDate && this.valueDate.length) {
          this.beginDate = this.dayjs(this.valueDate[0]).format("YYYY-MM-DD");
          this.endDate = this.dayjs(this.valueDate[1]).format("YYYY-MM-DD");
        } else {
          this.beginDate = "";
          this.endDate = "";
        }
        let o = {
          orgId: this.orgId,
          productId: this.productId,
          uid: this.uid,
          beginDate: this.beginDate,
          endDate: this.endDate,
          curPage: this.curPage,
          pageSize: this.pageSize,
        };
        let d = await this.ApiProduction.getVipBatch(o);
        d.list.forEach((item) => {
          this.vipProducts.forEach((i) => {
            if (item.productId === i.id) {
              item.price = i.price;
            }
          });
          this.status.forEach((i) => {
            if (item.status === i.value) {
              item.statusV = i.name;
            }
          });
        });
        this.data = d.list;
        this.total = d.rowCount;
        this.closeLoading();
      },
    },
    async mounted() {
      this.getBathSetting();
      this.getVipBatchStatus();
      await this.getVipBatchPro();
      this.getOrgs();
      this.getProduct();
      this.getUsers("");
      this.getTableList();
    },
  };
</script>
<style lang="scss" module>
  .myInput {
    width: 220px;
    display: inline-block;
  }
</style>
<style lang="scss">
  .myNumber {
    .el-input-number {
      width: 217px !important;
    }
  }
</style>
