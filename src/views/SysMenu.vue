<template>
  <section>
    <el-row :gutter="20" class="m20 el-form100">
      <el-col :span="4">
        <el-input :placeholder="placeholder"></el-input>
      </el-col>
      <el-col :span="16" class="textLeft">
        <el-button type="primary">查询</el-button>
        <el-button type="success" @click="addMenu" v-permission="'MenuCreate'"
        >添加菜单
        </el-button
        >
      </el-col>
    </el-row>
    <my-table
      :data="dataMenu"
      row-key="menuId"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columnslist"
        :key="item.menuId"
      >
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            @click="moveMenu(scope)"
            type="text"
            size="small"
            v-permission="'MenuUpdate'"
            v-if="scope.row.menuType != 2"
          >移动菜单
          </el-button>
          <el-button
            @click="editMenu(scope)"
            type="text"
            size="small"
            v-permission="'MenuUpdate'"
          >
            编辑
          </el-button>
          <el-button
            @click="delMenuMethod(scope)"
            type="text"
            size="small"
            v-permission="'MenuDelete'"
          >
            删除
          </el-button>
          <el-button
            @click="addChildMenu(scope)"
            type="text"
            size="small"
            v-permission="'MenuCreate'"
            v-if="scope.row.menuType != 2"
          >
            添加下级菜单
          </el-button>
        </template>
      </el-table-column>
    </my-table>
    <el-dialog
      :title="title"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <my-form :model="model" :rules="rules" ref="ruleForm">
        <el-form-item label="上级菜单" v-if="state == 2">
          <el-input
            disabled
            v-model="model.parentName"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" class="textLeft" prop="menuType">
          <el-radio-group v-model="model.menuType">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">功能</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            placeholder="请输入菜单名"
            v-model="model.menuName"
          ></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input
            placeholder="请输入链接地址"
            v-model="model.menuLink"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单键" prop="menuKey">
          <el-input
            placeholder="请输入菜单键"
            v-model="model.menuKey"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单序号" prop="menuKey">
          <el-input
            placeholder="请输入菜单键"
            v-model="model.menuSort"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序号">
          <el-input placeholder="请输入排序号" type="number"></el-input>
        </el-form-item> 
        sysMenu
        -->
        <el-form-item label="" class="textRight">
          <el-button type="primary" @click="save('ruleForm')">保存</el-button>
        </el-form-item>
      </my-form>
    </el-dialog>
    <el-dialog
      title="移动菜单"
      v-if="dialogFormVisible1"
      :visible.sync="dialogFormVisible1"
      :close-on-click-modal="clickmodal"
    >
      <el-select
        v-model="model1.toId"
        placeholder="请选择移动菜单"
        v-if="filterMenu.length"
      >
        <el-option
          v-for="item in filterMenu"
          :value="item.menuId"
          :key="item.menuId"
          :label="item.menuName"
          v-if="item.menuType != 2"
        >
          <span v-for="item in item.index" class="opcaity">13</span
          ><span>{{ item.menuName }}</span></el-option
        >
      </el-select>
      <el-button type="success" @click="saveMoveMenu">保存</el-button>
    </el-dialog>
  </section>
</template>
<script>
  import {mapActions} from "vuex";
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";

  export default {
    name: "SysMenu",
    mixins: [menuRole, commonMessage],
    data() {
      return {
        placeholder: "请输入菜单名",
        columnslist: [
          {prop: "menuName", label: "菜单名称"},
          {prop: "menuKey", label: "菜单键"},
          {prop: "type", label: "类型"},
        ],
        state: 0,
        dialogFormVisible1: false,
        model: {
          menuName: "",
          menuKey: "",
          menuLink: "",
          menuType: "",
          parentName: "",
          menuSort: 9999,
        },
        model1: {
          fromId: "",
          toId: "",
        },
        rules: {
          menuType: [
            {
              required: true,
              message: "请选择类型",
              trigger: ["blur", "change"],
            },
          ],
          menuKey: [
            {
              required: true,
              message: "请输入key值",
              trigger: ["blur", "change"],
            },
          ],
          menuName: [
            {required: true, message: "请输入菜单名称", trigger: "change"},
          ],
        },
        filterMenu: [],
      };
    },
    methods: {
      ...mapActions("menu", {
        getAllMenu: "getAllMenu",
      }),
      moveMenu({row}) {
        let allMenu = this.flatten(this.cloneDeep(this.allMenu));
        allMenu = [{menuName: "根菜单", menuId: 0, index: 0}, ...allMenu];
        let rowClone = this.cloneDeep(row);
        let list = this.flatten(rowClone.children, 0);
        delete rowClone.children;
        list = [rowClone, ...list];
        this.filterMenu = allMenu.filter((item) => {
          return !list.find((i) => {
            return item.menuId === i.menuId;
          });
        });
        this.model1.fromId = row.menuId;
        this.open1();
      },
      async saveMoveMenu() {
        let d = await this.ApiMenu.postMenuMove(this.model1);
        if (d == this.saveSuccess) {
          this.close1();
          this.getAllMenu();
        }
      },
      open1() {
        this.dialogFormVisible1 = true;
      },
      close1() {
        this.dialogFormVisible1 = false;
      },
      editMenu({row}) {
        this.state = 1;
        Object.assign(this.model, row);
        this.open();
      },
      resetData() {
        this.model = {
          menuName: "",
          menuKey: "",
          menuLink: "",
          menuType: "",
          parentName: "",
          menuSort: "",
        };
      },
      addMenu({row}) {
        this.state = 0;
        this.open();
      },
      addChildMenu({row}) {
        this.resetData();
        this.model.parentName = row.menuName;
        this.model.parentId = row.menuId;
        this.state = 3;
        this.open();
      },
      async addMenuMehtod(data) {
        let d = await this.ApiMenu.postMenu(data);
        if (d === this.saveSuccess) {
          this.getAllMenu();
          this.close();
        }
      },
      async updateMenuMehtod(data) {
        let d = await this.ApiMenu.putMenu(data);
        if (d === this.saveSuccess) {
          this.getAllMenu();
          this.close();
        }
      },
      async delMenuMethod({row}) {
        this.confirmDelMessage(
          "确定要删除该菜单吗",
          async () => {
            return await this.ApiMenu.delMenu(row.menuId);
          },
          async () => {
            this.getAllMenu();
          }
        );
      },
      deleteAuth({row}) {
      },
      save(ruleForm) {
        this.$refs[ruleForm].$children[0].validate(async (valid) => {
          if (valid) {
            if (this.state === 0) {
              this.model.parentId = 0;
              this.addMenuMehtod(this.model);
            } else if (this.state === 2) {
              this.addMenuMehtod(this.model);
            } else if (this.state === 1) {
              this.updateMenuMehtod(this.model);
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
    },
    computed: {
      title() {
        if (this.state == 0) {
          return "添加菜单";
        } else if (this.state == 1) {
          return "编辑菜单";
        } else if (this.state == 3) {
          return "添加下级菜单";
        }
      },
      dataMenu() {
        return this.allMenu || [];
      },
    },
    created() {
      this.getAllMenu();
    },
  };
</script>

<style lang="scss" module>
  .sysSearch {
    width: 600px;
  }
</style>
