import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      dialogFormVisible: false,
      curPage: 1,
      pageSize: 10,
      total: 0,
      labelPosition: "left",
      checkStrictly: false,
      saveSuccess: "保存成功",
      code: 200,
      labelWidth: "100px",
      buttonAuths: {},
    };
  },
  computed: {
    ...mapGetters("menu", {
      allMenu: "allMenu",
    }),
    ...mapGetters("user", {
      role: "role",
    }),
  },
  methods: {
    ...mapActions("menu", {
      getAllMenu: "getAllMenu",
      getMenu: "getMenu",
    }),
    ...mapActions("user", {
      getRole: "getRole",
    }),
    open() {
      this.dialogFormVisible = true;
    },
    close() {
      this.dialogFormVisible = false;
      this.resetData1 && this.resetData1();
    },
  },
};
