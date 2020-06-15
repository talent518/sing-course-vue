import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueDND from "awe-dnd";

import "@assets/style/index.scss"; // eslint-disable-line
import "@/plugins";
import "@util/filter";
import "@util/directive";
import vueTime from "@util/time";
import myTable from "@components/myTable";
import myForm from "@components/myForm";
import myBreadcrumb from "@components/breadcrumb/breadcrumb";

Vue.component("myTable", myTable);
Vue.component("myForm", myForm);
Vue.component("myBreadcrumb", myBreadcrumb);
Vue.use(vueTime).use(VueDND);

// 表格内开关 组件
import CcCellSwitch from "@components/cc/CcCellSwitch";

Vue.component("CcCellSwitch", CcCellSwitch);

// 数字区间 组件
import CcNumberRange from "@components/cc/CcNumberRange";

Vue.component("CcNumberRange", CcNumberRange);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
