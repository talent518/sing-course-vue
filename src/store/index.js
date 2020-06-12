import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import menu from "./modules/menu";
import course from "./modules/course";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    menu,
    course,
  },
});

export default store;
