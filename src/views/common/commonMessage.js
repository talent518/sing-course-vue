import { mapGetters } from "vuex";

export default {
  inject: [
    "ApiBasic",
    "ApiResource",
    "ApiBase",
    "ApiProduction",
    "ApiOther",
    "ApiUser",
    "ApiReport",
    "cloneDeep",
    "ApiMenu",
    "dayjs",
    "ApiOrder",
    "ApiCourse",
  ],
  computed: {
    ...mapGetters("course", {
      dictoryObj: "dictoryObj",
    }),
  },
  data() {
    return {
      loading: true,
      total: 1,
      uid: "",
      userList: [],
      clickmodal: false,
    };
  },
  methods: {
    openLoading() {
      this.loading = true;
    },
    formatNum(num) {
      num = Number(num);
      return (num.toFixed(2) + "").replace(
        /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
        "$&,"
      );
    },
    closeLoading() {
      this.loading = false;
    },
    confirmDelMessage(content, fn, fn1) {
      this.$confirm(content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let message = fn && (await fn());
        if (typeof message != "number") {
          // this.$message({
          //   type: "success",
          //   message: message || "删除成功",
          // });
          fn1 && fn1();
        }
      });
    },
    tipMessage(message, type) {
      this.$message({
        showClose: true,
        message,
        type,
      });
    },
    getTreeList(menuList, parentId = 0, menu = [], key) {
      if (Array.isArray(menuList)) {
        menuList.forEach((item) => {
          if (item.parentId === parentId) {
            menu.push(item);
            item.children = [];
            return this.getTreeList(menuList, item[key], item.children, key);
          }
        });
        return menu;
      }
    },
    flatten(arr, index = 1, list = []) {
      arr.forEach((item) => {
        item.index = index;
        list.push(item);
        if (item.children) {
          this.flatten(item.children, index + 1, list);
        }
      });
      return list;
    },
    filterAllChild() {},
    async remoteMethod(name) {
      this.userList = await this.ApiUser.getSelectUsers(name);
    },
    getTarget(menuList, parentId = 0) {
      return menuList.filter((item) => {
        if (item.parentId === parentId) {
          return item;
        }
      });
    },
  },
};
