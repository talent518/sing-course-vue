<template>
  <section>
    <div class="textLeft searchWrap">
      <el-button
        v-permission="'ProductRefresh'"
        type="success"
        @click="refleshM(1)"
      >刷新商品信息
      </el-button
      >
    </div>
    <my-table :data="products" v-loading="loading">
      <el-table-column
        :label="item.label"
        :key="item.id"
        :prop="item.prop"
        v-for="item in columnslist"
      ></el-table-column>
    </my-table>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";

  export default {
    name: "productManager",
    mixins: [menuRole, commonMessage],
    data() {
      return {
        columnslist: [
          {prop: "name", label: "商品"},
          {prop: "price", label: "销售价"},
          {prop: "url", label: "购买页"},
        ],
        products: [],
        refresh: 0,
      };
    },
    methods: {
      async getProducts() {
        this.openLoading();
        this.products = await this.ApiProduction.getProduct(this.refresh);
        this.closeLoading();
      },
      refleshM() {
        this.refresh = 1;
        this.getProducts();
      },
    },
    mounted() {
      this.getProducts();
    },
  };
</script>
<style lang="scss">
  @import "./common/search.scss";
</style>
