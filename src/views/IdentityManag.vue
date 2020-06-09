<template>
  <section>
    <el-row class="el-form100 m20" :gutter="20">
      <el-col :span="4">
        <el-input v-model="name" placeholder="请输入身份"></el-input>
      </el-col>
      <el-col :span="16" class="textLeft">
        <el-button type="primary" @click="searchM" v-permission="'IdentityView'"
        >查询
        </el-button
        >
        <el-button type="success" @click="addM" v-permission="'IdentityCreate'"
        >添加身份
        </el-button
        >
      </el-col>
    </el-row>

    <my-table :data="data">
      <el-table-column
        v-for="colum in columnslist"
        :label="colum.label"
        :prop="colum.prop"
        :key="colum.id"
        :label-position="labelPosition"
        :label-width="labelWidth"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="editM(scope)"
            type="text"
            size="small"
            v-permission="'IdentityUpdate'"
          >
            编辑
          </el-button>
          <el-button
            @click="deleteM(scope)"
            type="text"
            size="small"
            v-permission="'IdentityDelete'"
          >
            删除
          </el-button>
          <el-button
            @click="authM(scope)"
            type="text"
            size="small"
            v-permission="'IdentityAuth'"
          >
            系统权限
          </el-button>
        </template>
      </el-table-column>
    </my-table>
    <el-dialog
      :title="ctitle"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <el-form
        :model="model"
        :label-position="labelPosition"
        status-icon
        ref="ruleForm"
        :label-width="labelWidth"
        :rules="rules"
      >
        <el-form-item label="身份" prop="name">
          <el-input v-model="model.name" placeholder="请输入身份"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles" class="textLeft">
          <el-checkbox-group v-model="model.roles">
            <el-checkbox
              name="type"
              v-for="role in roles"
              :key="role.roleId"
              :label="role.roleId"
            >{{ role.roleName }}
            </el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="model.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="textLeft">
          <el-radio :label="isState1" v-model="model.enabled">启用</el-radio>
          <el-radio :label="isState0" v-model="model.enabled">禁用</el-radio>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveData('ruleForm')"
          >保存
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="系统权限"
      v-if="authIsShow"
      :visible.sync="authIsShow"
      class="textLeft"
      :close-on-click-modal="clickmodal"
    >
      <el-form :model="model1" ref="ruleForm1" :rules="rules1">
        <el-form-item label="可管理身份" prop="identitys">
          <el-checkbox-group v-model="model1.identitys">
            <el-checkbox
              :label="item.id"
              v-for="item in identitys"
              :key="item.id"
            >{{ item.name }}
            </el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数据查看权限">
          <el-checkbox-group v-model="model1.viewAuth">
            <el-checkbox
              :label="i.value"
              v-for="i in viewAuth"
              :key="i.value"
            >{{ i.name }}
            </el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数据编辑权限">
          <el-checkbox-group v-model="model1.editAuth">
            <el-checkbox
              :label="i.value"
              v-for="i in editAuth"
              :key="i.value"
            >{{ i.name }}
            </el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveAuth('ruleForm1')"
          >保存
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
  import user from "@api/user";
  import other from "@api/other";
  import {mapActions, mapGetters} from "vuex";
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import {cloneDeep} from "lodash";
  //0 添加 1 编辑
  export default {
    name: "IdentityManag",
    mixins: [menuRole, commonMessage],
    data() {
      return {
        columnslist: [
          {prop: "name", label: "身份"},
          {prop: "remark", label: "备注"},
          {prop: "enabledV", label: "状态"},
        ],
        name: "",
        data: [],
        state: 0,
        model: {
          name: "",
          remark: "",
          enabled: 1,
          roles: [],
        },
        rules: {
          name: [
            {
              required: true,
              message: "请输入身份",
              trigger: ["blur", "change"],
            },
          ],
          roles: [
            {
              required: true,
              message: "至少选择一个角色",
              trigger: ["blur", "change"],
            },
          ],
        },
        rules1: {
          identitys: [
            {
              required: true,
              message: "至少选择一个管理身份",
              trigger: ["blur", "change"],
            },
          ],
        },
        authIsShow: false,
        roles: [],
        isState0: 0,
        isState1: 1,
        model1: {
          identitys: [],
          editAuth: 2,
          viewAuth: 2,
        },
        ideneityAuth: [],
        viewAuth: [],
        editAuth: [],
        identitys: [],
      };
    },
    async mounted() {
      this.initData();
      this.getAuthM();
    },
    computed: {
      ctitle() {
        return this.state === 0 ? "添加身份" : "编辑身份";
      },
    },
    methods: {
      async initData() {
        let list = await other.getIdentity(this.name);
        list.forEach((d) => {
          d.enabledV = d.enabled === 0 ? "禁用" : "启用";
        });
        this.identitys = list;
        this.data = list;
        this.getRole();
      },
      searchM() {
        this.initData();
      },
      editM({row}) {
        this.state = 1;
        this.open();
        Object.assign(this.model, row);
        this.model.roles = this.model.roles.split(",").map(Number);
      },
      deleteM({row}) {
        this.confirmDelMessage(
          "确定要删除该身份吗",
          async () => {
            return other.delIdentity(row.id);
          },
          async () => {
            this.initData();
          }
        );
      },
      authM({row}) {
        this.authIsShow = true;
        this.model1.identitys =
          (row.identitys && row.identitys.split(",").map(Number)) || [];
        this.model1.editAuth =
          (row.editAuth && row.editAuth.split(",").map(Number)) || [];
        this.model1.viewAuth =
          (row.viewAuth && row.viewAuth.split(",").map(Number)) || [];
        this.authMId = row.id;
      },
      addM() {
        this.model = {
          name: "",
          remark: "",
          enabled: 1,
          roles: [],
        };
        this.state = 0;
        this.open();
      },
      async getRole() {
        // this.roles = await user.getRole();
        this.roles = await other.dictRoles();
      },
      saveAuth(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let d = await other.getIdentityAuth({
              id: this.authMId,
              ...this.model1,
            });
            this.authIsShow = false;
            this.initData();
          } else {
            return false;
          }
        });
      },
      resetData1() {
        this.name = "";
        this.remark = "";
        this.enabled - 1;
        this.roles = [];
      },
      async getAuthM() {
        this.viewAuth = await other.viewAuth();
        this.editAuth = await other.editAuth();
      },
      saveData(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.state === 0) {
              await other.postIdentity(this.model);
            } else if (this.state === 1) {
              await other.putIdentity(this.model);
            }
            this.initData();
            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
  //      identity/4/auth  identity/3/auth
</script>
<style lang="scss" module>
  .headSearch {
    max-width: 1300px;
    margin: 20px 0;
  }
</style>
