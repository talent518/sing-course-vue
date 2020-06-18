import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import course from "./modules/course";
import permission from "./modules/permission";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    course,
    permission
  },
});

export default store;
