<template>
  <main :class="$style.container">
    <div>
      <el-button type="primary" @click="addMenu">添加菜单</el-button>
      <el-dialog
        title="添加菜单"
        :visible.sync="isCreateOneMenu"
        v-if="isCreateOneMenu"
      >
        <el-form :model="form" :rules="rules">
          <el-form-item label="菜单名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单键" :label-width="formLabelWidth">
            <el-input v-model="form.key" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="saveData1">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-container>
      <el-aside :width="sideBarWidth">
        <el-row class="tac" span="24">
          <el-tree
            :data="allMenu"
            :check-strictly="true"
            ref="tree"
            highlight-current
            node-key="menuId"
            :expand-on-click-node="false"
            :props="defaultProps"
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              v-if="data.menyType !== 2"
            >
              <span
              >{{ data.menuName
                }}<span
                  class="icon iconfont menu_font"
                  :class="fontClass(data)"
                ></span
                ></span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)"
                  v-if="data.menuType !== 2"
                >
                  添加
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  删除
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => edit(node, data)"
                >
                  修改
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-row>
      </el-aside>
    </el-container>

    <el-dialog
      title="添加"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      :before-close="beforeClose"
    >
      <el-form :model="form" v-if="!isEdit">
        <el-form-item
          label="类型"
          :label-width="formLabelWidth"
          v-if="isShowSelect"
        >
          <el-select v-model="selectType" placeholder="请选择类型">
            <el-option
              v-for="item in content"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="activityName" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="activityKey" :label-width="formLabelWidth">
          <el-input v-model="form.key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="链接地址"
          :label-width="formLabelWidth"
          v-if="selectType == 1"
        >
          <el-input v-model="form.menuLink" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-if="isEdit">
        <el-form-item :label="activityName1" :label-width="formLabelWidth">
          <el-input v-model="data.menuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="activityKey1" :label-width="formLabelWidth">
          <el-input v-model="data.menuKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="链接地址"
          :label-width="formLabelWidth"
          v-if="data.menuType == 1"
        >
          <el-input v-model="data.href" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
  import AppMain from "@/views/AppMain";
  import Menu from "@/components/editmenu/Menu";
  import {mapActions, mapGetters} from "vuex";

  const sideBarWidth = "410px";
  import menu from "@api/menu";
  import menuRole from "@/views/common/menuRole";

  const menuList = [
    {
      value: 0,
      id: 0,
      label: "菜单",
    },
    {
      value: 1,
      id: 1,
      label: "链接",
    },
  ];

  const objName = {
    0: "菜单名称",
    1: "链接名称",
    2: "按钮名称",
  };

  const objKey = {
    0: "菜单键",
    1: "链接键",
    2: "按钮键",
  };
  const className = {
    0: "icon-menu-line",
    1: "icon-icon-",
    2: "icon-anniu",
  };
  export default {
    name: "EditMenu",
    mixins: [menuRole],
    data() {
      return {
        strictly: true,
        isEdit: false,
        selectType: "",
        labelPosition: "right",
        data: {},
        isCreateOneMenu: false,
        value: [],
        sideBarWidth,
        rules: {
          key: [{required: true, message: "请输入key值", trigger: "change"}],
          name: [
            {required: true, message: "请输入菜单名称", trigger: "change"},
          ],
        },
        content: [],
        form: {
          name: "",
          key: "",
          href: "",
        },
        formLabelWidth: "120px",
      };
    },
    components: {
      AppMain,
      Menu,
    },
    computed: {
      activityName() {
        if (this.selectType === 0) {
          return "菜单名称";
        } else if (this.selectType === 1) {
          return "链接名称";
        }
        if (this.data.menuType === 1) {
          return "按钮名称";
        }
        return "";
      },
      activityName1() {
        return objName[this.data.menuType];
      },
      activityKey1() {
        return objKey[this.data.menuType];
      },
      activityKey() {
        if (this.selectType === 0) {
          return "菜单键";
        } else if (this.selectType === 1) {
          return "链接键";
        }
        if (this.data.menuType === 1) {
          return "按钮键";
        }
        return "";
      },
      isShowSelect() {
        return this.data.menuLink == 0 || this.data.menuLink == 1;
      },
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
      addMenu() {
        this.isCreateOneMenu = true;
      },
      openDialog() {
        this.dialogFormVisible = true;
      },
      beforeClose(done) {
        this.clearData();
        done();
      },
      closeDialog() {
        this.dialogFormVisible = false;
        this.clearData();
      },
      clearData() {
        this.form.name = "";
        this.form.key = "";
        this.content = [];
        this.selectType = "";
      },
      async edit(node, data) {
        this.isEdit = true;
        this.openDialog();
        this.data = data;
      },
      async saveData1() {
        let menuName = this.form.name;
        let menuKey = this.form.key;
        const data = {
          parentId: 0,
          menuType: 0,
          menuKey,
          menuName,
          menuLink: "",
        };
        await this.addMenuMehtod(data);
        this.isCreateOneMenu = false;
        this.form.name = "";
        this.form.key = "";
      },
      async saveData() {
        let menuName = this.form.name;
        let menuKey = this.form.key;
        let menuLink = this.form.menuLink;
        if (this.selectType == null || this.selectType === "") {
          this.selectType = 2;
        }
        const data = {
          parentId: this.data.menuId,
          menuType: this.selectType,
          menuKey,
          menuName,
          menuLink,
        };
        if (this.isEdit) {
          await menu.putMenu(this.data);
        } else {
          await this.addMenuMehtod(data);
        }
        this.getAllMenu();
        this.closeDialog();
      },
      async addMenuMehtod(data) {
        await menu.postMenu(data);
        this.getAllMenu();
        // this.getMenu();
        // this.getRole();
      },
      append(data) {
        this.isEdit = false;
        this.dialogFormVisible = true;
        this.data = data;
        if (data.menuLink == 0 || data.menuLink == "") {
          this.content = menuList;
        }
      },
      async remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index + 1, 1);
        await menu.delMenu(data.menuId);
        this.getAllMenu();
        this.getMenu();
      },
      fontClass(data) {
        return className[data.menuType];
      },
      change() {
        let end = "";
        this.value.forEach((id) => {
          end += id + ",";
        });
        end = end.substring(0, end.length - 1);
        let endMuIds = end.split(",");
        this.$refs.tree.setCheckedKeys(endMuIds);
      },
    },
    mounted() {
      console.log("加载完成");
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
<style lang="scss">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
<style>
  .menu_font {
    margin-left: 10px;
    position: relative;
    top: 1px;
  }
</style>
