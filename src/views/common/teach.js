import { mapGetters } from "vuex";
export default {
  inject: ["ApiTeach", "ApiResource"],
  computed: {
    ...mapGetters("course", {
      dictoryObj: "dictoryObj",
    }),
  },
};
