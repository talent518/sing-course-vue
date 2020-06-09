<template>
  <section class="userWrap">
    <!-- <el-divider></el-divider> -->
    <el-row class="el-form100 m20" :gutter="20">
      <el-col :span="4">
        <el-select
          v-model="searchObj.productId"
          placeholder="请选择商品"
          value-key="id"
          clearable
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in products"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="searchObj.identityId"
          placeholder="请选择身份"
          value-key="id"
          clearable
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in identitys"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="16" class="textLeft">
        <el-button
          type="primary"
          @click="searchM"
          v-permission="'ProductPriceView'"
        >查询
        </el-button
        >
        <el-button
          type="success"
          @click="addPrice"
          v-permission="'ProductPriceCreate'"
        >添加采购价
        </el-button
        >
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
      <el-table-column label="采购价">
        <template slot-scope="scope">
          <ul>
            <li>
              <span>首次经销：</span
              ><span>{{ scope.row.firstPurchasePrice }}</span>
            </li>
            <li>
              <span class="weight">二次裂变：</span
              ><span class="weight">{{ scope.row.secondPurchasePrice }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="库存预警数">
        <template slot-scope="scope">
          <ul>
            <li>
              <span>经销库：</span
              ><span>{{ scope.row.firstWarningAmount }}</span>
            </li>
            <li>
              <span class="weight">裂变库：</span
              ><span class="weight">{{ scope.row.secondWarningAmount }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="分润">
        <template slot-scope="scope">
          <ul>
            <li>
              <span>首次经销：</span
              ><span>{{ scope.row.firstProfitPrice }}</span>
            </li>
            <li>
              <span class="weight">二次裂变：</span
              ><span class="weight">{{ scope.row.secondProfitPrice }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="timeV" label="价格有效期"></el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope)"
            type="text"
            size="small"
            v-permission="'ProductPriceUpdate'"
          >
            编辑
          </el-button>
          <el-button
            @click="del(scope)"
            type="text"
            size="small"
            v-permission="'ProductPriceDelete'"
          >
            删除
          </el-button>
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
      :title="title"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <el-form
        :model="model"
        label-width="150px"
        :label-position="labelPosition"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品：" prop="productId">
              <el-select
                @change="selectProduction"
                v-model="model.productId"
                placeholder="请选择商品"
                :disabled="disabled"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in products"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="定价：">{{ model.price }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="身份：" prop="identityId">
          <el-select
            v-model="model.identityId"
            placeholder="请选择身份"
            :disabled="disabled"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in identitys"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首次经销采购价：" prop="firstPurchasePrice">
              <el-input-number
                v-model="model.firstPurchasePrice"
                :precision="2"
                :controls="false"
                placeholder="请输入首次经销"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经销库存预警数：" prop="firstPurchasePrice">
              <el-input-number
                v-model="model.firstWarningAmount"
                :precision="0"
                :controls="false"
                placeholder="请输入首次经销"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="二次裂变采购价：" prop="secondPurchasePrice">
              <el-input-number
                v-model="model.secondPurchasePrice"
                :precision="2"
                :controls="false"
                placeholder="请输入二次裂变"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="裂变库存预警数：" prop="secondPurchasePrice">
              <el-input-number
                v-model="model.secondWarningAmount"
                :precision="0"
                :controls="false"
                placeholder="请输入二次裂变"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="首次销售分润：" prop="firstProfitPrice">
          <el-input-number
            v-model="model.firstProfitPrice"
            :precision="2"
            :controls="false"
            placeholder="请输入首次销售"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="二次裂变分润：" prop="secondProfitPrice">
          <el-input-number
            v-model="model.secondProfitPrice"
            :precision="2"
            :controls="false"
            placeholder="请输入二次裂变"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="经销扣除库存" prop="type">
          <el-radio-group v-model="model.type">
            <el-radio
              :label="item.value"
              v-for="item in typeList"
              :key="item.value"
            >{{ item.name }}
            </el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="价格有效期：" prop="date">
          <el-date-picker
            v-model="model.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="save('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";

  const o = {
    1: "商品售价设置",
    2: "商品售价编辑",
  };
  export default {
    name: "ProductPrice",
    mixins: [menuRole, commonMessage],
    data() {
      return {
        rules: {
          productId: [
            {
              required: true,
              message: "请选择商品",
              trigger: ["blur", "change"],
            },
          ],
          identityId: [
            {
              required: true,
              message: "请选择身份",
              trigger: ["blur", "change"],
            },
          ],
          firstPurchasePrice: [
            {
              required: true,
              message: "请输入首次经销",
              trigger: ["blur", "change"],
            },
          ],
          secondPurchasePrice: [
            {
              required: true,
              message: "请输入二次裂变",
              trigger: ["blur", "change"],
            },
          ],
          warningAmount: [
            {
              required: true,
              message: "请输入库存预警数",
              trigger: ["blur", "change"],
            },
          ],
          firstProfitPrice: [
            {
              required: true,
              message: "请输入首次经销分润",
              trigger: ["blur", "change"],
            },
          ],
          secondProfitPrice: [
            {
              required: true,
              message: "请输入首次经销分润",
              trigger: ["blur", "change"],
            },
          ],
          date: [
            {
              required: true,
              message: "请输入价格有效期",
              trigger: ["blur", "change"],
            },
          ],
          type: [
            {
              required: true,
              message: "请选择扣除库存",
              trigger: ["blur", "change"],
            },
          ],
        },
        fixPrice: "",
        searchObj: {
          productId: "",
          identityId: "",
          production: "",
        },
        model: {
          type: "",
          productId: "",
          identityId: "",
          firstPurchasePrice: 0,
          secondPurchasePrice: 0,
          beginDate: "",
          endDate: "",
          date: [],
          price: 0,
          firstProfitPrice: 110, //首次经销分润
          secondProfitPrice: 1110, //二次裂变分润
          warningAmount: 0,
          firstWarningAmount: 0,
          secondWarningAmount: 0,
        },
        data: [],
        columnslist: [
          {prop: "productV", label: "商品"},
          {prop: "identityV", label: "身份"},
          {prop: "priceV", label: "定价"},
          // { prop: "firstPurchasePrice", label: "首次经销采购价" },
          // { prop: "firstProfitPrice", label: "首次经销分润价" },
          // { prop: "firstWarningAmount", label: "首次经销库存预警" },
          // { prop: "secondPurchasePrice", label: "二次裂变采购价" },
          // { prop: "secondProfitPrice", label: "二次裂变分润价" },
          // { prop: "secondWarningAmount", label: "二次裂变库存预警" },
          //{ prop: "timeV", label: "价格有效期" },
        ],
        identitys: [],
        products: [],
        productsPrice: [],
        state: 1,
        typeList: [],
      };
    },
    computed: {
      title() {
        return o[this.state];
      },
      disabled() {
        return this.state === 2 ? true : false;
      },
    },
    methods: {
      selectProduction() {
        let o = this.products.find((item) => {
          return item.id === this.model.productId;
        });
        this.model.price = o.price;
      },
      resetData() {
        this.model = {
          productId: "",
          identityId: "",
          firstPurchasePrice: 0,
          secondPurchasePrice: 0,
          beginDate: "",
          endDate: "",
          date: [],
          price: 0,
          firstProfitPrice: 0, //首次经销分润
          secondProfitPrice: 0, //二次裂变分润
          warningAmount: 0,
          firstWarningAmount: 0,
          secondWarningAmount: 0,
        };
      },
      async edit({row}) {
        Object.assign(this.model, row);
        this.selectProduction();
        this.model.date = [
          new Date(this.model.beginDate),
          new Date(this.model.endDate),
        ];
        this.state = 2;
        this.open();
        this.typeList = await this.ApiProduction.getPriceType();
      },
      async addPrice() {
        this.resetData();
        this.state = 1;
        this.open();
        this.typeList = await this.ApiProduction.getPriceType();
      },
      async del({row}) {
        this.confirmDelMessage(
          "确定要删除该商品定价吗",
          async () => {
            let d = await this.ApiProduction.delProductPrice(row.priceId);
            if (d !== this.saveSuccess) {
              return;
            }
          },
          async () => {
            this.searchM();
          }
        );
      },
      searchM() {
        this.getProductPrice();
      },
      resetSearch() {
        this.searchObj.productId = "";
        this.searchObj.identityId = "";
        this.searchM();
      },
      handleChange(val) {
        console.log(val);
      },
      currentChange() {
        this.getProductPrice();
      },
      save(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.model.beginDate = this.dayjs(
              new Date(this.model.date[0])
            ).format("YYYY-MM-DD");
            this.model.endDate = this.dayjs(new Date(this.model.date[1])).format(
              "YYYY-MM-DD"
            );
            if (this.state == 1) {
              let d = await this.addProductPrice(this.model);

              if (d !== this.saveSuccess) {
                return;
              }
            } else if (this.state == 2) {
              let d = await this.putProductPrice(this.model);
              if (d !== this.saveSuccess) {
                return;
              }
            }
            this.close();
            this.resetSearch();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      async showDetail({row}) {
        console.log(row);
      },
      async putProductPrice() {
        return await this.ApiProduction.putProductPrice(this.model);
      },
      async getIndetitys() {
        this.identitys = await this.ApiUser.getUserIdentitys();
      },
      async getProducts() {
        this.products = await this.ApiProduction.getProduct();
      },
      async getProductPrice() {
        this.openLoading();
        let data = await this.ApiProduction.productPrice({
          ...this.searchObj,
          curPage: this.curPage,
        });
        data.list.forEach((item) => {
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
          item.timeV = item.beginDate + "~" + item.endDate;
        });
        this.total = data.rowCount;
        this.data = data.list;
        this.closeLoading();
      },
      async addProductPrice() {
        return await this.ApiProduction.postProductPrice(this.model);
      },
    },
    //   inject: ["Apiother"],
    async mounted() {
      await this.getIndetitys();
      await this.getProducts();
      this.getProductPrice();
    },
  };
</script>
<style lang="scss" module>
  @import "./common/search.scss";

  .static {
    pointer-events: none;
  }

  .searchWrap {
    width: 680px;
    margin-right: 0;
  }
</style>
<style lang="scss">
  .userWrap {
    .el-form-item__content {
      text-align: left;
    }
  }

  .myOrg {
    display: flex;
    .el-form-item {
      width: 400px;
    }
  }
</style>
