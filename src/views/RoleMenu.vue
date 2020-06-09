<template>
  <main :class="$style.container">
    <el-container>
      <el-aside :width="sideBarWidth">
        <el-row class="tac" span="24">
          <el-tree
            :data="allMenu"
            show-checkbox
            default-expand-all
            ref="tree"
            highlight-current
            node-key="menuId"
            :props="defaultProps"
            :check-strictly="checkStrictly"
          >
          </el-tree>
        </el-row>
      </el-aside>
      <div :class="$style.buttonsOperate">
        <div :class="$style.formContent">
          <h2 :class="$style.title">修改角色</h2>
          <el-select
            v-model="value"
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
            @change="change"
          >
            <el-option
              v-for="item in role"
              :key="item.roleKey"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
          <el-button type="primary">修改角色权限</el-button>
        </div>
      </div>
    </el-container>
  </main>
</template>
<script>
  import AppMain from "@/views/AppMain";
  import Menu from "@/components/editmenu/Menu";
  import {mapActions, mapGetters} from "vuex";

  const sideBarWidth = "240px";
  import menu from "@api/menu";
  import menuRole from "@/views/common/menuRole";

  export default {
    name: "EditMenu",
    mixins: [menuRole],
    data() {
      return {
        labelPosition: "right",
        ruleForm: {
          key: "",
          name: "",
          href: false,
        },
        checkStrictly: true,
        isCreateOneMenu: false,
        value: [],
        sideBarWidth,
        rules: {
          key: [{required: true, message: "请输入key值", trigger: "change"}],
          name: [
            {required: true, message: "请输入菜单名称", trigger: "change"},
          ],
        },
      };
    },
    components: {
      AppMain,
      Menu,
    },
    created() {
      this.getAllMenu();
      this.getRole();
    },
    methods: {
      ...mapActions("menu", {
        getAllMenu: "getAllMenu",
      }),
      ...mapActions("user", {
        getRole: "getRole",
      }),
      change() {
        let obj = this.role.filter((item) => {
          if (item.roleId === this.value) {
            return true;
          }
        });
        let menuIds = obj[0].menuIds.split(",");
        this.$refs.tree.setCheckedKeys(menuIds);
      },
    },
  };
</script>
<style lang="scss" module>
  .container {
    height: 100%;
  }

  .buttonsOperate {
    display: flex;
    width: 800px;
    justify-content: space-around;
  }

  .formContent {
    width: 400px;
    padding: 0 50px;
    box-sizing: border-box;
  }

  .title {
    font-size: 20px;
    margin: 10px 0;
  }

  .buttons {
    margin: 0;
    text-align: right;
  }
</style>
