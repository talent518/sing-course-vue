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

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
