<template>
  <section>
    <!-- <el-divider></el-divider> -->
    <el-row class="el-form100 m20" :gutter="20">
      <el-col :span="4">
        <el-input
          clearable
          v-model="searchObj.orgName"
          placeholder="请输入组织名称"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="searchObj.province"
          placeholder="请选择省"
          data-key="provId"
          @change="selectCity"
        >
          <el-option
            v-for="item in province"
            :key="item.provId"
            :label="item.provName"
            :value="item.provId"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="searchObj.city"
          placeholder="请选择市"
          data-key="provId"
        >
          <el-option
            v-for="item in city"
            :key="item.provId"
            :label="item.provName"
            :value="item.provId"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12" class="textLeft">
        <el-button type="primary" v-permission="'OrgView'" @click="searchM"
        >查询
        </el-button
        >
        <el-button
          type="success"
          v-permission="'OrgCreateRoot'"
          @click="addRootOrg"
          ref="addOrg"
          id="addOrg"
        >添加根组织
        </el-button
        >
      </el-col>
    </el-row>
    <my-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px;"
      row-key="orgId"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="orgName" label="组织名称"></el-table-column>
      <el-table-column label="上级组织">
        <template slot-scope="scope">
          <span>{{ getParent(scope) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columnslist"
        :key="item.prop"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope" v-if="isEditM(scope)">
          <el-button
            @click="editOrg(scope)"
            type="text"
            size="small"
            v-permission="'OrgUpdate'"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            v-permission="'OrgCreate'"
            @click="addChildOrg(scope)"
          >
            添加下级组织
          </el-button>
          <el-button
            type="text"
            size="small"
            v-permission="'OrgDelete'"
            @click="delorg(scope)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </my-table>
    <el-dialog
      title="添加组织"
      :visible.sync="dialogFormVisible"
      v-if="rootDialogShow"
      :before-close="closeDialg"
      :close-on-click-modal="clickmodal"
    >
      <el-form
        :model="model"
        label-width="100px"
        :label-position="labelPosition"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="组织名称" prop="orgName">
          <el-input
            v-model="model.orgName"
            placeholder="请输入组织名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属省市" prop="province" class="textLeft">
          <el-select
            v-model="model.province"
            placeholder="请选择省"
            data-key="provId"
            clearable
          >
            <el-option
              v-for="item in province1"
              :key="item.provId"
              :label="item.provName"
              :value="item.provId"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="model.city"
            placeholder="请选择市"
            data-key="provId"
            clearable
          >
            <el-option
              v-for="item in city1"
              :key="item.provId"
              :label="item.provName"
              :value="item.provId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="orgSort">
          <el-input
            type="number"
            v-model="model.orgSort"
            placeholder="请输入排序号"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" class="textLeft">
          <el-radio-group v-model="model.enabled">
            <el-radio :label="isOpen">启用</el-radio>
            <el-radio :label="isClose">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveRootOrg('ruleForm')"
          >保存
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加下级组织"
      :visible.sync="dialogFormVisible"
      v-if="childDialogShow"
      :before-close="closeDialg"
      :close-on-click-modal="clickmodal"
    >
      <el-form
        :model="model2"
        label-width="100px"
        :label-position="labelPosition"
        :rules="rules"
        ref="ruleForm2"
      >
        <el-form-item label="组织名称" prop="orgName">
          <el-input
            v-model="model2.orgName"
            placeholder="请输入组织名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属组织" prop="orgId" class="textLeft">
          <el-select
            v-model="model2.orgId"
            placeholder="请选择"
            data-key="orgId"
            @change="changeOrg2"
          >
            <el-option
              v-for="item in org2"
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
        <el-form-item label="所属省市" prop="province" class="textLeft">
          <el-select
            v-model="model2.province"
            placeholder="请选择省"
            data-key="provId"
            :disabled="true"
          >
            <el-option
              v-for="item in province2"
              :key="item.provId"
              :label="item.provName"
              :value="item.provId"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="model2.city"
            placeholder="请选择市"
            data-key="provId"
            :disabled="isCityDisabled2"
          >
            <el-option
              v-for="item in city2"
              :key="item.provId"
              :label="item.provName"
              :value="item.provId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="orgSort">
          <el-input
            type="number"
            v-model="model2.orgSort"
            placeholder="请输入排序号"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" class="textLeft">
          <el-radio-group v-model="model2.enabled">
            <el-radio :label="isOpen">启用</el-radio>
            <el-radio :label="isClose">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveChildOrg('ruleForm2')"
          >保存
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="编辑组织"
      :visible.sync="dialogFormVisible"
      v-if="editDialogShow"
      :before-close="closeDialg"
      :close-on-click-modal="clickmodal"
    >
      <el-form
        :model="model3"
        label-width="100px"
        :label-position="labelPosition"
        :rules="rules"
        ref="reform3"
      >
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="model3.orgName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上级组织" prop="orgId" class="textLeft">
          <el-select
            v-model="model3.orgId"
            placeholder="请选择"
            data-key="orgId"
            @change="changeOrg3"
          >
            <el-option
              v-for="item in org3"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId"
              v-if="!item.isPath || item.orgId == model3.orgId"
            ><span v-for="item in item.index" class="opcaity">13</span
            ><span>{{ item.orgName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属省市" prop="province" class="textLeft">
          <el-select
            v-model="model3.province"
            placeholder="请选择省"
            data-key="provId"
            :disabled="isCityDisabled31"
          >
            <el-option
              v-for="item in province3"
              :key="item.provId"
              :label="item.provName"
              :value="item.provId"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="model3.city"
            placeholder="请选择市"
            data-key="provId"
            :disabled="isCityDisabled3"
          >
            <el-option
              v-for="item in city3"
              :key="item.provId"
              :label="item.provName"
              :value="item.provId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="orgSort">
          <el-input
            type="number"
            v-model="model3.orgSort"
            placeholder="请输入排序号"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" class="textLeft">
          <el-radio-group v-model="model3.enabled">
            <el-radio :label="isOpen">启用</el-radio>
            <el-radio :label="isClose">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="editSave('reform3')"
          >保存
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
  import other from "@api/other";
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import {cloneDeep, flattenDeep} from "lodash";

  export default {
    name: "OrgManager",
    mixins: [commonMessage, menuRole],
    data() {
      return {
        columnslist: [
          // { prop: "orgName", label: "组织名称" },
          {prop: "provinceCity", label: "省市"},
          {prop: "orgSort", label: "排序号"},
          {prop: "enabledV", label: "状态"},
        ],
        rules: {
          orgName: [
            {
              required: true,
              message: "请输入组织名称",
              trigger: ["blur", "change"],
            },
          ],
          orgId: [
            {
              required: true,
              message: "请选择组织",
              trigger: ["blur", "change"],
            },
          ],
          province: [
            {
              required: true,
              message: "请选择省",
              trigger: ["blur", "change"],
            },
          ],
          orgSort: [],
          enabled: {
            required: true,
            trigger: ["blur", "change"],
          },
          idenditys: [],
        },
        searchObj: {
          orgName: "",
          province: "",
          city: "",
        },
        model: {
          //添加组织
          orgName: "",
          orgId: 0,
          province: "",
          city: "",
          orgSort: 1,
          enabled: 1,
        },
        model2: {
          //添加二级组织
          orgName: "",
          orgId: "",
          province: "",
          city: "",
          orgSort: 1,
          enabled: 1,
        },
        model3: {
          //编辑组织
          orgName: "",
          orgId: "",
          province: "",
          city: "",
          orgSort: 1,
          enabled: 1,
        },
        province1: [],
        city1: [],
        org2: [],
        province2: [],
        city2: [],
        province3: [],
        city3: [],
        province: [],
        city: [],
        tableData: [],
        state: 1,
        isOpen: 1,
        isClose: 0,
        allOrgDataTree: [],
        isCityDisabled2: false,
        isCityDisabled3: false,
        isCityDisabled31: false,
        isAdmin: false,
      };
    },
    async mounted() {
      this.openLoading();
      await this.getPageAllData();
      this.closeLoading();
    },
    computed: {
      rootDialogShow() {
        return this.dialogFormVisible && this.state === 1;
      },
      childDialogShow() {
        return this.dialogFormVisible && this.state === 2;
      },
      editDialogShow() {
        return this.dialogFormVisible && this.state === 3;
      },
    },
    watch: {
      "model.province"(n) {
        this.model.city = "";
        this.city1 = [this.getEmptyObj(), ...getTarget(this.allProvince, n)];
      },
      "model2.province"(n) {
        if (!this.isKeepCity2) {
          this.model2.city = "";
        }
        this.isKeepCity2 = false;
        this.city2 = [this.getEmptyObj(), ...getTarget(this.allProvince, n)];
      },
      "model3.province"(n) {
        if (!this.isKeepCity3) {
          this.model3.city = "";
        }
        this.isKeepCity3 = false;
        this.city3 = [{}, ...getTarget(this.allProvince, n)];
      },
    },
    async activated() {
    },
    methods: {
      getParent({row}) {
        let org3x = cloneDeep(this.allOrgData);
        let o1x = org3x.find((item) => {
          return row.parentId === item.orgId;
        });
        if (o1x) {
          return o1x.orgName;
        }
        return "";
      },
      close() {
        this.dialogFormVisible = false;
        this.state = 0;
        this.getPageAllData();
      },
      open() {
        this.dialogFormVisible = true;
      },
      selectCity() {
        this.searchObj.city = "";
        let o = getTargetObj(this.allProvince, this.searchObj.province);
        this.city = getTarget(this.allProvince, this.searchObj.province);
      },
      addRootOrg() {
        //添加跟组织 状态为1
        this.model = {
          //添加组织
          orgName: "",
          orgId: 0,
          province: "",
          city: "",
          orgSort: 1,
          enabled: 1,
        };
        this.getTableData();
        this.open();
        this.state = 1;
      },
      saveChildOrg(ruleForm) {
        this.$nextTick(() => {
          this.$refs[ruleForm].validate(async (valid) => {
            if (valid) {
              let d = await other.postOrg(this.model2);
              if (d === this.saveSuccess) {
                this.close();
              }
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        });
      },
      addChildOrg({row}) {
        //添加下级组织
        row = cloneDeep(row);
        this.isKeepCity2 = true;
        this.model2 = {
          //添加二级组织
          orgName: "",
          parentId: row.orgId,
          province: row.province,
          city: row.city == 0 ? "" : row.city,
          orgSort: 1,
          enabled: 1,
          orgId: row.orgId,
        };
        let org2 = this.getAllChildOrg([], row.orgId);
        org2.unshift(row);
        this.org2 = org2;
        if (this.model2.city == 0) {
          this.model2.city = "";
        }

        if (!!this.model2.city) {
          this.isCityDisabled2 = true;
        } else {
          this.isCityDisabled2 = false;
        }
        this.open();
        this.state = 2;
      },
      //找到父级下面所有的子级
      getAllChildOrg(arr, parentId, index = 1) {
        this.allOrgDataTree.forEach((org) => {
          if (org.parentId === parentId) {
            org.index = index;
            arr.push(org);
            this.getAllChildOrg(arr, org.orgId, ++index);
          }
        });
        return arr;
      },
      editOrg(scope) {
        //编辑组织
        // debugger;
        let row = scope.row;
        this.isKeepCity3 = true; //打开的时候，不跟随watch
        Object.assign(this.model3, row);
        row = cloneDeep(row);
        this.model3.orgId1 = this.model3.orgId;
        this.model3.orgId = row.parentId;
        let org3 = cloneDeep(this.allOrgDataTree);
        let childsList = this.flatten(row.children);
        org3 = org3.filter((item) => {
          return !(item.orgId == row.orgId);
        });
        if (row.children.length > 0) {
          let newArr = [];
          for (let i = 0, len = org3.length; i < len; i++) {
            for (let j = 0, len1 = childsList.length; j < len1; j++) {
              if (org3[i].orgId !== childsList[j].orgId) {
                newArr.push(org3[i]);
              }
            }
          }
          org3 = [...new Set(newArr)];
        }
        if (this.model3.city == 0) {
          this.model3.city = "";
        }
        if (!!this.model3.city) {
          this.isCityDisabled3 = true;
        } else {
          this.isCityDisabled3 = false;
        }
        this.isCityDisabled31 = true;
        //过滤子元素
        let list1 = this.getTreeList(cloneDeep(org3), row.orgId, [], "orgId");
        var b = list1;
        b = this.flatten(list1);
        org3 = org3.filter((item) => {
          return !b.find((i) => {
            return i.orgId === item.orgId;
          });
        });
        this.org3 = org3;
        org3 = this.getAllChildOrg3([], 0, 0);
        this.state = 3;
        if (document.getElementById("addOrg")) {
          if (row.parentId === 0) {
            this.isCityDisabled31 = false;
            this.isCityDisabled3 = false;
          }
          this.org3 = [{orgId: 0, orgName: "根组织", index: 0}, ...this.org3];
          // this.isAdmin = false;
        } else {
          //this.isAdmin = true;
        }
        if (!this.org3.length) {
          this.org3 = [{orgId: 0, orgName: "根组织", index: 0}, ...this.org3];
        }
        let org3x = cloneDeep(this.allOrgDataTree);
        let o1x = org3x.find((item) => {
          return row.parentId === item.orgId;
        });
        if (o1x) {
          if (o1x.city === 0) {
            this.isCityDisabled3 = false;
          } else {
            this.isCityDisabled3 = true;
          }
        }
        this.open();
      },
      getAllChildOrg3(arr, parentId, index = 0) {
        this.org3.forEach((org) => {
          if (org.parentId === parentId) {
            org.index = index;
            arr.push(org);
            this.getAllChildOrg3(arr, org.orgId, index + 1);
          }
        });
        return arr;
      },
      editSave(ruleForm) {
        this.$nextTick(() => {
          this.$refs[ruleForm].validate(async (valid) => {
            if (valid) {
              let model = cloneDeep(this.model3);
              model.parentId = model.orgId;
              model.orgId = model.orgId1;
              let d = await other.putOrg(model);
              if (d === this.saveSuccess) {
                this.close();
              }
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        });
      },
      closeDialg(done) {
        if (this.state === 1) {
          this.model = {
            orgName: "",
            orgId: 0,
            province: "",
            city: "",
            orgSort: 1,
            enabled: 1,
          };
        }
        done();
        this.close();
      },
      searchM() {
        this.getTableData();
      },
      delorg({row}) {
        this.confirmDelMessage(
          "确定要删除该组织吗",
          async () => {
            return await other.delOrg(row.orgId);
          },
          () => {
            this.getTableData();
          }
        );
      },
      getEmptyObj() {
        return {provId: "", provName: ""};
      },
      changeOrg2() {
        this.model2.orgId;
        let o = this.allOrgDataTree.find(
          (tree) => tree.orgId === this.model2.orgId
        );
        if (o) {
          this.isKeepCity2 = true;
          this.model2.province = o.province;
          this.model2.city = o.city;
        }
        if (this.model2.city == 0) {
          this.model2.city = "";
        }
        if (!!this.model2.city) {
          this.isCityDisabled2 = true;
        } else {
          this.isCityDisabled2 = false;
        }
      },
      changeOrg3() {
        let o = this.allOrgDataTree.find(
          (tree) => tree.orgId === this.model3.orgId
        );
        if (o) {
          this.model3.province = o.province;
          this.isKeepCity3 = true;
          this.model3.city = o.city;
        }
        if (this.model3.city == 0) {
          this.model3.city = "";
        }
        if (!!this.model3.city) {
          this.isCityDisabled3 = true;
        } else {
          this.isCityDisabled3 = false;
        }
        if (this.model3.orgId === 0) {
          this.isCityDisabled31 = false;
          this.isCityDisabled3 = false;
        } else {
          this.isCityDisabled31 = true;
        }
      },
      isEditM({row}) {
        if (Array.isArray(this.buttonAuths.edit)) {
          return this.buttonAuths.edit.includes(row.orgId);
        } else {
          return !!this.buttonAuths.edit;
        }
      },
      async saveRootOrg(ruleForm) {
        this.$nextTick(() => {
          this.$refs[ruleForm].validate(async (valid) => {
            if (valid) {
              this.model.parentId = 0;
              let d = await other.postOrg(this.model);
              if (d === this.saveSuccess) {
                this.close();
              }
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        });
      },
      async getNoAuthProvince() {
        return await other.dictProvince();
      },
      async getAllOrgDataNoChange() {
        this.allOrgDataTree = await other.getOrg({
          orgName: "",
          orgId: "",
          city: "",
        });
        this.allOrgDataTree.forEach((item) => {
          this.allProvince.forEach((province) => {
            if (province.provId == item.province) {
              item.provinceCity = province.provName;
            }
          });
          this.allProvince.forEach((province) => {
            if (province.provId == item.city) {
              item.provinceCity += province.provName;
            }
          });
          item.enabledV = item.enabled == 1 ? "启用" : "禁用";
        });
      },
      async getTableData() {
        this.allOrgData = await other.getOrg(this.searchObj);
        this.allOrgData.forEach((item) => {
          this.allProvince.forEach((province) => {
            if (province.provId == item.province) {
              item.provinceCity = province.provName;
            }
          });
          this.allProvince.forEach((province) => {
            if (province.provId == item.city) {
              item.provinceCity += province.provName;
            }
          });
          item.enabledV = item.enabled == 1 ? "启用" : "禁用";
        });
        this.tableData = this.getTreeList(
          cloneDeep(this.allOrgData),
          0,
          [],
          "orgId"
        );
        let d = await other.dataAuth();
        this.buttonAuths = d;
      },
      getOrgData() {
      },
      async getProvinceData() {
        //搜索框的 省市和组织  所有的省市
        this.allProvince = await this.getNoAuthProvince();
        this.province = getTarget(this.allProvince);
        this.province.unshift(this.getEmptyObj());
        this.province1 = cloneDeep(this.province);
        this.province2 = cloneDeep(this.province);
        this.province3 = cloneDeep(this.province);
      },
      async getPageAllData() {
        await this.getProvinceData();
        this.getTableData();
        await this.getAllOrgDataNoChange();
      },
    },
  };
  const getTargetObj = (menuList, provId) =>
    menuList.filter((menu) => menu.provId === provId);

  const getTarget = (menuList, parentId = 0) => {
    return menuList.filter((item) => {
      if (item.parentId === parentId) {
        return item;
      }
    });
  };
</script>
<style lang="scss" module>
  @import "./common/search.scss";

  .static {
    pointer-events: none;
  }

  .searchWrap {
    max-width: 1000px;
  }
</style>
