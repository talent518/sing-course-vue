import {mapGetters} from "vuex";

export default {
  inject: [
    "ApiBasic",
    "ApiResource",
    "ApiBase",
    "ApiUser",
    "cloneDeep",
    "dayjs",
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
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100kb!");
        return false;
      }
    },
    filterEnum(type, key) {
      /*console.log("123", this.dictoryObj[type]);*/
      let result = this.dictoryObj[type].find((i) => {
        return i.key == key;
      });

      /*console.log("filterEnum", result);*/

      return result && result.value ? result.value : "-";
    },

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
    filterAllChild() {
    },
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
