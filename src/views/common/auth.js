import Vue from "vue";
import {mapGetters} from "vuex";

Vue.mixin({
  computed: {
    ...mapGetters("menu", {
      allButtonKey: "allButtonKey",
    }),
  },
  methods: {
    hasBtn(val) {
      return this.allButtonKey.includes(val);
    },
  },
});
