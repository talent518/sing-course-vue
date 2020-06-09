export default {
  data() {
    return {
      orgId: "",
      productId: "",
      uid: "",
      beginDate: "",
      endDate: "",
      orgs: [],
      products: [],
      userList: [],
      valueDate: [],
      inventoryList: [],
      type: "",
      allProCityList: [],
      provinceList: [],
      reportList: [],
    };
  },
  methods: {
    async getOrgs() {
      let orgs = await this.ApiOther.getOrgs();
      let treeOrgs = this.getTreeList(orgs, 0, [], "orgId");
      orgs = this.flattenOrgs(treeOrgs);
      this.orgs = orgs;
    },
    async getProduct() {
      this.products = await this.ApiProduction.getProduct();
    },
    flattenOrgs(treeOrgs, arr = [], index = 0) {
      treeOrgs.forEach((org) => {
        org.index = index;
        arr.push(org);
        if (org.children) {
          this.flattenOrgs(org.children, arr, index + 1);
        }
      });
      return arr;
    },
    async getUsers(name) {
      this.userList = await this.ApiUser.getSelectUsers(name);
    },
    async getInventorTypes() {
      this.inventoryList = await this.ApiProduction.productPurchaseType();
    },
    async getAllProvince() {
      this.allProCityList = await this.ApiOther.dictProvince();
      this.provinceList = this.getTarget(this.allProCityList);
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
const getTargetObj = (menuList, provId) =>
  menuList.filter((menu) => menu.provId === provId);
