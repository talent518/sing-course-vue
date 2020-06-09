<template>
  <section class="userWrap">
    <!-- <el-divider></el-divider> -->
    <el-row>
      <el-col :span="4">
        <el-tree
          :data="treeData"
          default-expand-all
          ref="mytree"
          highlight-current
          node-key="orgId"
          v-if="treeData.length"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            @click="selectOrg(data)"
            v-if="isShowM(data)"
          >
            <el-link type="primary">
              <span
                :title="data.orgName"
                class="ellpis textLeft"
                :class="$style.w160"
              >
                {{ data.orgName }}</span
              >
            </el-link>
          </span>
          <span class="custom-tree-node" slot-scope="{ node, data }" v-else>
            {{ data.orgName }}
          </span>
        </el-tree>
      </el-col>
      <el-col :span="20">
        <div class="myuserSearch m20 mySpecialSearch">
          <div :class="$style.search1" class="userSearchWrap1">
            <div :class="$style.inputW">
              <el-input
                v-model="searchObj.username"
                placeholder="请输入登录账号"
                clearable
              ></el-input>
            </div>
            <div>
              <el-input
                clearable
                v-model="searchObj.nickname"
                placeholder="请输入用户名"
              ></el-input>
            </div>
            <div>
              <el-input
                type="number"
                clearable
                v-model="searchObj.mobile"
                placeholder="请输入手机号"
              ></el-input>
            </div>
            <el-button type="primary" @click="searchM" v-permission="'UserView'"
            >查询
            </el-button
            >
            <el-button
              type="success"
              @click="addUser"
              v-permission="'UserCreate'"
            >添加用户
            </el-button
            >
          </div>
        </div>
        <div class="textLeft"></div>
        <my-table :data="data" v-loading="loading">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            v-for="item in columnslist"
            :key="item.prop"
          >
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope" v-if="isEditM(scope)">
              <el-button
                @click="editAuth(scope.$index, data)"
                type="text"
                size="small"
                v-permission="'UserUpdate'"
              >
                编辑
              </el-button>
              <el-button
                @click="deleteM(scope.$index, data)"
                type="text"
                size="small"
                v-permission="'UserDelete'"
              >
                删除
              </el-button>
              <el-button
                @click="qrCodeM(scope)"
                type="text"
                size="small"
                v-permission="'SellQrCode'"
              >
                销售二维码
              </el-button>
              <el-button
                @click="changePassword(scope.$index, data)"
                type="text"
                size="small"
              >
                修改密码
              </el-button>
            </template>
          </el-table-column>
        </my-table>
        <el-pagination
          class="m20"
          background
          layout="prev, pager, next,total"
          :total="total"
          :page-size="pageSize"
          @current-change="currentChange"
          :current-page.sync="curPage"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      top="3vh"
      :close-on-click-modal="clickmodal"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
        v-if="state === 0 || state === 2"
        :rules="rules"
        autocomplete="off"
      >
        <el-form-item label="登录账号：" prop="username">
          <el-input
            placeholder="请输入登录账号"
            v-model="ruleForm.username"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="nickname">
          <el-input
            placeholder="请输入用户名"
            v-model="ruleForm.nickname"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" v-if="!isEdit">
          <el-input
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色">
          <el-select
            v-model="value1"
            multiple
            allow-create
            default-first-option
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in role"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="手机号：" prop="mobile">
          <el-input
            clearable
            v-model="ruleForm.mobile"
            autocomplete="off"
            placeholder="请输入手机号"
            :controls="false"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属组织：" prop="orgId">
              <el-select
                v-model="ruleForm.orgId"
                placeholder="请选择"
                data-key="orgId"
              >
                <el-option
                  label="请选择所属组织"
                  :value="0"
                  v-if="ruleForm.orgId === 0 || isShowM({ orgId: 0 })"
                ></el-option>
                <el-option
                  v-for="item in org1"
                  :key="item.orgId"
                  :label="item.orgName"
                  :value="item.orgId"
                  v-if="!item.isPath"
                >
                  <span v-for="item in item.index" class="opcaity">13</span
                  ><span>{{ item.orgName }}</span></el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"
          >
            <el-form-item
              label="是否是组织管理者："
              prop="isManager"
              label-width="200"
              style="margin-left: 20px;"
            >
              <el-radio :label="isManager1" v-model="ruleForm.isManager"
              >否
              </el-radio
              >
              <el-radio :label="isManager2" v-model="ruleForm.isManager"
              >是
              </el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="所属组织：" prop="orgId">
          <div class="myOrg">
            <el-select
              v-model="ruleForm.orgId"
              placeholder="请选择"
              data-key="orgId"
            >
              <el-option
                label="请选择所属组织"
                :value="0"
                v-if="ruleForm.orgId === 0 || isShowM({ orgId: 0 })"
              ></el-option>
              <el-option
                v-for="item in org1"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
                v-if="!item.isPath"
              >
                <span v-for="item in item.index" class="opcaity">13</span
                ><span>{{ item.orgName }}</span></el-option
              >
            </el-select>
            <el-form-item
              label="是否是组织管理者："
              prop="isManager"
              label-width="200"
              style="margin-left: 20px;"
            >
              <el-radio :label="isManager1" v-model="ruleForm.isManager"
                >否</el-radio
              >
              <el-radio :label="isManager2" v-model="ruleForm.isManager"
                >是</el-radio
              >
            </el-form-item>
          </div>
        </el-form-item> -->
        <!-- <el-form-item label="所属上级">
          <el-select
            v-model="ruleForm.superior"
            placeholder="请选择"
            value-key="uid"
          >
            <el-option
              v-for="superior in superiors"
              :key="superior.uid"
              :label="superior.username"
              :value="superior.uid"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="身份：" prop="identityId">
          <div>
            <el-select
              v-model="ruleForm.identityId"
              placeholder="请选择"
              value-key="id"
            >
              <el-option
                v-for="identity in identitys"
                :key="identity.id"
                :label="identity.name"
                :value="identity.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- <el-form-item label="银行卡号：">
          <el-input
            type="number"
            v-model="ruleForm.bankCard"
            autocomplete="off"
            placeholder="请输入银行卡号"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属银行：">
              <el-select
                v-model="ruleForm.bankType"
                placeholder="请选择"
                data-key="value"
              >
                <el-option
                  v-for="bank in banks"
                  :key="bank.value"
                  :label="bank.name"
                  :value="bank.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属支行：">
              <el-input
                placeholder="请输入银行支行"
                v-model="ruleForm.bankBranch"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row type="flex" align="middle">
          <el-col :span="23">
            <el-form-item label="微信支付商户号：">
              <el-input
                clearable
                v-model="ruleForm.wxMchId"
                placeholder="请输入微信支付商户号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"
          ><i
            @click="openTarget(0)"
            class="el-icon-question"
            :class="$style.myIconPos"
          ></i
          ></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="23">
            <el-form-item label="微信APPID：">
              <el-input
                clearable
                v-model="ruleForm.wxAppId"
                placeholder="请输入微信APPID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"
          ><i
            @click="openTarget(1)"
            class="el-icon-question"
            :class="$style.myIconPos"
          ></i
          ></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="23">
            <el-form-item label="API密钥：">
              <el-input
                clearable
                v-model="ruleForm.wxKey"
                placeholder="请输入微信API密钥"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"
          ><i
            @click="openTarget(2)"
            class="el-icon-question"
            :class="$style.myIconPos"
          ></i
          ></el-col>
        </el-row>
        <el-row type="flex" align="middle" v-if="isAlwaysHidden">
          <el-col :span="23">
            <el-form-item label="微信公众号安全码：">
              <el-input
                clearable
                v-model="ruleForm.wxAppSecret"
                placeholder="请输入微信公众号安全码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"
          ><i
            @click="openTarget(2)"
            class="el-icon-question"
            :class="$style.myIconPos"
          ></i
          ></el-col>
        </el-row>
        <el-form-item label="状态">
          <el-radio :label="state1" v-model="ruleForm.enabled">启用</el-radio>
          <el-radio :label="state0" v-model="ruleForm.enabled">禁用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUserData('ruleForm')"
          >提交
          </el-button
          >
        </el-form-item>
      </el-form>
      <el-form
        :model="passwordObj"
        :rules="rules1"
        v-else
        :label-position="labelPosition"
        ref="ruleForm1"
        :label-width="labelWidth"
      >
        <el-form-item label="密码：" prop="pass">
          <el-input
            v-model="passwordObj.pass"
            autocomplete="off"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword('ruleForm1')"
          >保存
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="销售二维码"
      v-if="isQrlistShow"
      :visible.sync="isQrlistShow"
      :before-close="handleCloseQrcode"
      :close-on-click-modal="clickmodal"
    >
      <el-row>
        <el-col :span="12" v-for="item in qrList" :key="item.id">
          <el-row :class="$style.min30">
            <el-col :span="10">课程名称：</el-col>
            <el-col :span="14">{{ item.name }}</el-col>
          </el-row>
          <el-row :class="$style.min30">
            <el-col :span="10">售价：</el-col>
            <el-col :span="14">{{ item.price }}元</el-col>
          </el-row>
          <el-row :class="$style.min30">
            <el-col :span="10">销售二维码：</el-col>
            <el-col :span="14">
              <el-image
                :src="item.src"
                style="width: 150px; height: 150px;"
              ></el-image>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="success" @click="downloadM(item.src)"
            >下载
            </el-button
            >
          </el-row>
        </el-col>
      </el-row>
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

  const stateObj = {
    0: "添加用户",
    2: "编辑用户",
    1: "重置密码",
  };
  export default {
    name: "User",
    mixins: [menuRole, commonMessage],
    data() {
      const validateMobile = function (rule, value, callback) {
        var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          if (value == null || !value.length) {
            callback();
            return;
          }
          callback(new Error("请输入正确手机号码"));
        }
      };
      const validatePass = function (rule, value, callback) {
        debugger;
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,16}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(
            new Error("不能包括空格，至少8个字符，必须包含大小写字母和数字。")
          );
        }
      };

      return {
        isAlwaysHidden: false,
        input: "",
        fit: true,
        columnslist: [
          {prop: "username", label: "登录账号"},
          {prop: "nickname", label: "用户名"},
          {prop: "mobile", label: "手机号"},
          {prop: "identityIdV", label: "身份"},
          // { prop: "cityV", label: "所属市" },
          {prop: "orgV", label: "所属组织"},
          // { prop: "orgCodes", label: "组织代码" },
          // { prop: "wxMchId", label: "微信支付商户号", width: 150 },
          // { prop: "wxAppId", label: "微信APPID", width: 150 },
          // { prop: "bankBranch", label: "所属支行", width: 150 },
          // { prop: "superiorUidV", label: "所属组织" },
        ],
        org: [],
        data: [],
        value: [],
        value1: [],
        options: [],
        options1: [],
        org: [],
        isEdit: false,
        state1: 1,
        state0: 0,
        isManager1: 0,
        isManager2: 1,
        ruleForm: {
          nickname: "",
          username: "",
          password: "",
          mobile: "",
          bankCard: "",
          bankType: "",
          identityId: "",
          superior: "",
          bankBranch: "",
          orgId: 0,
          enabled: 1,
          isManager: 0,
          wxAppId: "",
          wxMchId: "",
          wxKey: "",
          wxAppSecret: "",
        },
        qrCodeUrl: "",
        banks: {},
        identitys: {},
        superiors: {},
        treeData: [],
        searchObj: {
          nickname: "",
          username: "",
          mobile: "",
          orgId: 0,
        },
        org1: [],
        rules: {
          username: [
            {
              required: true,
              message: "请输入登录账号",
              trigger: ["blur", "change"],
            },
          ],
          nickname: [
            {
              required: true,
              message: "请输入用户名",
              trigger: ["blur", "change"],
            },
          ],
          ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/
          password: [
            {
              required: true,
              message: "请输入密码",
              trigger: ["blur", "change"],
            },
            {
              validator: validatePass,
              trigger: ["blur", "change"],
            },
          ],
          mobile: [
            {
              message: "请输入正确手机号",
              validator: validateMobile,
              trigger: ["blur", "change"],
            },
          ],
          orgId: [
            {
              required: true,
              message: "请选择所属组织",
              trigger: ["blur", "change"],
            },
          ],
          isManager: [
            {
              required: true,
              message: "请选择是否是管理者",
              trigger: ["blur", "change"],
            },
          ],
          identityId: [
            {
              required: true,
              message: "请选择身份",
              trigger: ["blur", "change"],
            },
          ],
        },
        state: 0,
        passwordObj: {
          pass: "",
        },
        rules1: {
          pass: [
            {
              required: true,
              message: "请输入密码",
              trigger: ["blur", "change"],
            },
            {
              validator: validatePass,
              trigger: ["blur", "change"],
            },
          ],
        },
        currentRow: {},
        isQrlistShow: false,
        searchObj: {
          orgName: "",
          province: "",
          city: "",
        },
        tableHead: "tableHead",
        qrList: [],
      };
    },
    computed: {
      title() {
        return stateObj[this.state];
      },
    },
    activated() {
      this.reload();
    },
    methods: {
      downloadM(src) {
        const imgUrl = src;

        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(imgUrl.split(",")[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var blob = new Blob([u8arr]);
          window.navigator.msSaveOrOpenBlob(blob, "chart-download" + "." + "png");
        } else {
          // 这里就按照chrome等新版浏览器来处理
          const a = document.createElement("a");
          a.href = imgUrl;
          a.setAttribute("download", "chart-download");
          a.click();
        }
      },
      isShowM(row) {
        if (Array.isArray(this.buttonAuths.view)) {
          return this.buttonAuths.view.includes(row.orgId);
        } else {
          return !!this.buttonAuths.view;
        }
      },
      isEditM({row}) {
        if (Array.isArray(this.buttonAuths.edit)) {
          return this.buttonAuths.edit.includes(row.orgId);
        } else {
          return !!this.buttonAuths.edit;
        }
      },
      searchM() {
        this.curPage = 1;
        this.getUserList();
      },
      reload() {
        this.getUserList();
      },
      searchAll() {
        this.searchObj.orgId = "";
        this.ruleForm.orgId = "";
        this.searchM();
      },
      async qrCodeM({row}) {
        let uid = row.uid;
        this.qrList = await this.ApiProduction.getProductsByUserId(uid);

        this.isQrlistShow = true;
      },
      handleCloseQrcode() {
        this.isQrlistShow = false;
      },
      async editAuth(index, list) {
        this.isEdit = true;
        let data = list[index];
        Object.assign(this.ruleForm, data);
        this.ruleForm.superior = data.superiorUid;
        this.open();
        this.state = 2;
        // if (data.orgId === 0) {
        //   return cloneDeep(this.org1Alldata);
        // }
        // let list1 = this.getTreeList(
        //   cloneDeep(this.org1Alldata),
        //   data.orgId,
        //   [],
        //   "orgId"
        // );
        // var b = this.flatten(list1);
        // this.org1 = this.org1Alldata.filter((item) => {
        //   return !b.find((i) => {
        //     return i.orgId === item.orgId;
        //   });
        // });
        this.org1 = cloneDeep(this.org1Alldata);
      },

      currentChange(curPage) {
        this.curPage = curPage;
        this.getUserList();
      },
      updatePassword(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let d = await user.putPassWord({
              uid: this.currentRow.uid,
              password: this.passwordObj.pass,
            });
            if (this.saveSuccess === d) {
              this.close();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetObj() {
        this.passwordObj.pass = "";
      },
      getAllRoles(auth) {
        this.value = [];
        auth = auth.map((item) => item.roleKey);
        let str = "";
        let authsM = this.role.filter((role) => {
          if (auth.includes(role.roleKey)) {
            this.value.push(role.roleId);
          }
          return auth.includes(role.roleKey);
        });
        authsM.forEach((auth) => {
          str += auth.menuIds + ",";
        });
        str = str.substring(0, str.length - 1);
        let endAuth = [...new Set(str.split(","))];
        this.$nextTick(() => {
          this.$refs.mytree.setCheckedKeys(endAuth);
        });
        //this.$refs.mytree.setCheckedKeys(endAuth);
      },
      getUserAuth() {
      },
      change() {
        let str = "";
        this.role.forEach((item) => {
          if (this.value.includes(item.roleId)) {
            str += item.menuIds + ",";
          }
        });
        str = str.substring(0, str.length - 1);
        let endAuth = str.split(",");
        this.$nextTick(() => {
          this.$refs.mytree.setCheckedKeys(endAuth);
        });
      },
      addUser() {
        this.org1 = cloneDeep(this.org1Alldata);
        this.isEdit = false;
        this.open();
        this.state = 0;
        this.resetData();
      },
      resetData() {
        let orgId = 0;
        this.ruleForm = {
          nickname: "",
          username: "",
          password: "",
          mobile: "",
          bankCard: "",
          bankType: "",
          identityId: "",
          superior: "",
          bankBranch: "",
          orgId,
          enabled: 1,
          isManager: 0,
          wxAppId: "",
          wxMchId: "",
          wxKey: "",
          wxAppSecret: "",
        };
      },
      addUserData(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let d = "";
            if (this.isEdit) {
              d = await user.putUser(this.ruleForm);
            } else {
              d = await user.postUser(this.ruleForm);
            }
            if (d === this.saveSuccess) {
              this.close();
              await this.searchM();
            }
          } else {
            return false;
          }
        });
      },
      handleClose(done) {
        done();
      },
      async deleteM(index, data) {
        this.confirmDelMessage(
          "确定要删除该用户吗",
          async () => {
            return await user.delUser(data[index].uid);
          },
          () => {
            this.searchM();
          }
        );
      },
      changePassword(index, data) {
        this.open();
        this.currentRow = data[index];
        this.state = 1;
      },
      async getUserList() {
        this.openLoading();
        this.org1 = this.getAllChildOrg();
        this.org1Alldata = cloneDeep(this.org1);
        let data = await user.userList({
          ...this.searchObj,
          curPage: this.curPage,
        });
        data.list.forEach((item) => {
          this.org1Alldata &&
          this.org1Alldata.forEach((p) => {
            if (item.orgId === p.orgId) {
              item.orgV = p.orgName;
            }
          });
          if (Array.isArray(this.banks)) {
            this.banks.forEach((p) => {
              if (item.bankType === p.value) {
                item.bankTypeV = p.name;
              }
            });
          }
          if (Array.isArray(this.identitys)) {
            this.identitys.forEach((p) => {
              if (item.identityId === p.id) {
                item.identityIdV = p.name;
              }
            });
          }
          // this.superiors.forEach((p) => {
          //   if (item.superiorUid === p.uid) {
          //     debugger;
          //     item.superiorUidV = p.nickname;
          //   }
          // });
        });
        // let childsList = this.flatten(this.org1);
        // org3 = this.allOrgDataTree.filter((item) => {
        //   return !(item.orgId == row.orgId);
        // });
        //ruleForm.orgId  过滤所有的子节点

        this.data = data.list;
        this.total = data.rowCount;
        this.closeLoading();
      },
      getAllChildOrg(arr = [], parentId = 0, index = 0) {
        this.org1.forEach((org) => {
          if (org.parentId === parentId) {
            org.index = index;
            arr.push(org);
            this.getAllChildOrg(arr, org.orgId, index + 1);
          }
        });
        return arr;
      },
      selectOrg(data) {
        this.ruleForm.orgId = data.orgId;
        this.searchObj.orgId = data.orgId;
        this.searchM();
      },
      openTarget(index) {
        let o = {
          0: "https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2Findex.php%2Fcore%2Faccount%2Finfo",
          1: "https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2Findex.php%2Fextend%2Fpay_setting",
          2: "https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2Findex.php%2Fcore%2Fcert%2Fapi_cert",
        };
        window.open(o[index]);
      },
    },
    async mounted() {
      // this.province = await other.getProvince();
      //this.org = await other.getOrgs();
      this.org1 = await other.getOrgsArgus(1);
      let listAll = [
        {
          orgId: "",
          orgName: "全部组织",
          children: this.getTreeList(cloneDeep(this.org1), 0, [], "orgId"),
        },
      ];
      this.treeData = listAll;
      this.banks = (await other.getBank()) || [];
      this.identitys = (await user.getIdentitys()) || [];
      // this.superiors = (await user.getsuperiors()) || [];
      this.getUserList();

      // this.qrCodeUrl = await other.qrCode();
      let d = await other.dataAuth();
      this.buttonAuths = d;
    },
  };
</script>
<style lang="scss" module>
  @import "./common/search.scss";

  .static {
    pointer-events: none;
  }

  .w160 {
    width: 140px;
    display: inline-block;
  }

  .myIconPos {
    font-size: 20px;
    position: relative;
    top: -10px;
    cursor: pointer;
  }
</style>
<style lang="scss">
  .userSearchWrap1 {
    max-width: 900px !important;
    margin-right: 0 !important;
  }

  .userWrap {
    .el-form-item__content {
      text-align: left;
    }
    padding-left: 0 !important;
    .el-tree-node__expand-icon {
      color: #409eff;
    }
  }

  .myOrg {
    display: flex;
    .el-form-item {
      width: 400px;
    }
  }

  .myuserSearch {
    // max-width: 900px;
  }
</style>
