<template>
  <section>
    <div :class="$style.searchWrap">
      <div :class="$style.search">
        <div :class="$style.inputW">
          <el-input v-model="roleName" placeholder="请输入角色名"></el-input>
        </div>
        <el-button type="primary" v-permission="'RoleView'" @click="searchM"
        >查询
        </el-button
        >
      </div>
      <el-button type="success" @click="addRole" v-permission="'RoleCreate'"
      >添加角色
      </el-button
      >
    </div>
    <el-table :data="role" border>
      <el-table-column
        :prop="columnu.prop"
        :label="columnu.label"
        v-for="columnu in columnslist"
        :key="columnu.roleKey"
      ></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="editAuth(scope.$index, role)"
            type="text"
            size="small"
            v-permission="'RoleUpdate'"
          >
            编辑
          </el-button>
          <el-button
            v-permission="'RoleDelete'"
            @click="deleteM(scope.$index, role)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isState"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      class="roleDialog"
      :before-close="beforeClose"
      :close-on-click-modal="clickmodal"
    >
      <el-form
        :model="model"
        label-width="120px"
        :label-position="labelPosition"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="model.roleName"></el-input
          >
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="model.remark" placeholder="具备操作权限"></el-input
          >
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="10">
          <el-tree
            :data="menus"
            show-checkbox
            default-expand-all
            ref="mytree"
            highlight-current
            node-key="menuId"
            :props="defaultProps"
            :check-strictly="checkStrictly"
          >
          </el-tree>
        </el-col>
        <el-col>
          <el-button type="primary" @click="submitForm('ruleForm')"
          >保存
          </el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </section>
</template>
<script>
  import {mapActions, mapGetters} from "vuex";
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import user from "@api/user";
  import menu from "@api/menu";

  const state = {
    add: "添加角色",
    edit: "编辑角色",
  };
  export default {
    name: "roleList",
    mixins: [menuRole, commonMessage],
    data() {
      return {
        columnslist: [
          {prop: "roleKey", label: "角色键"},
          {prop: "roleName", label: "业务员"},
          {prop: "remark", label: "备注"},
        ],
        input: "",
        state: "",
        model: {
          roleName: "",
          remark: "",
        },
        roleName: "",
        labelPosition: "left",
        menus: [],
        rules: {
          roleName: [
            {
              required: true,
              message: "请输入角色名称",
              trigger: ["blur", "change"],
            },
          ],
        },
      };
    },
    computed: {
      isState() {
        return state[this.state];
      },
    },
    async mounted() {
      let menus = await menu.dictMenus();
      this.menus = getTreeList(menus);
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let d = "";
            let menuIds = this.$refs.mytree.getCheckedKeys(true);
            if (!Array.isArray(menuIds)) {
              menuIds = menuIds.split(",");
            }
            if (this.state === "add") {
              d = await user.postRole({
                ...this.model,
                menuIds,
              });
            } else {
              d = await user.putRole({
                ...this.model,
                menuIds,
              });
            }
            if (d == this.saveSuccess) {
              this.close();
              this.resetData();
              this.getRole();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      editAuth(index, list) {
        this.open();
        this.state = "edit";
        let obj = list[index];
        this.model = obj;
        let menuIds = obj.menuIds;
        this.setMenus(menuIds.split(","));
      },
      setMenus(menuIds) {
        this.$nextTick(() => {
          this.$refs.mytree.setCheckedKeys(menuIds);
        });
      },
      addRole() {
        this.open();
        this.state = "add";
      },
      resetData() {
        this.model = {
          roleName: "",
          remark: "",
        };
      },
      beforeClose(done) {
        this.resetData();
        done();
      },
      async searchM() {
        let d = this.getRole(this.roleName);
      },
      async deleteM(index, list) {
        this.confirmDelMessage(
          "要删除该角色吗",
          async () => {
            let data = list[index];
            return user.delRole(data.roleId);
          },
          async () => {
            this.getRole();
          }
        );
      },
      save() {
        // let menuIds = this.$refs.mytree.getCheckedKeys();
        // user.postRole({
        //   roleName: this.model.name,
        //   remark: this.model.remark,
        //   menuIds,
        // });
        // return;
        this.close();
      },
    },
  };

  const getTreeList = (menuList, parentId = 0, menu = []) => {
    menuList.forEach((item) => {
      if (item.parentId === parentId) {
        menu.push(item);
        item.children = [];
        return getTreeList(menuList, item.menuId, item.children);
      }
    });
    return menu;
  };
</script>
<style lang="scss" module>
  @import "./common/search.scss";
</style>
<style lang="scss" scope>
  .roleDialog {
    .el-form {
      width: 500px;
    }
    .el-tree {
      overflow: auto;
      height: 300px;
    }
  }
</style>
