<template>
  <section>
    <el-row :gutter="20" class="m20 el-form100">
      <el-col :span="4">
        <el-select
          v-model="searchObj.province"
          placeholder="请选择省"
          data-key="provId"
          clearable
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
        <el-input
          clearable
          v-model="searchObj.orgName"
          placeholder="请输入城市名"
        ></el-input>
      </el-col>
      <el-col :span="16" class="textLeft">
        <el-button type="primary" v-permission="'ProvinceView'" @click="searchM"
        >查询
        </el-button
        >
        <el-button
          type="success"
          v-permission="'ProvinceCreate'"
          @click="addCity"
          ref="addOrg"
        >添加城市
        </el-button
        >
      </el-col>
    </el-row>
    <section>
      <my-table
        :data="data"
        row-key="provId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        v-loading="loading"
        pmh="700px"
        ref="myTable"
        :expand-row-keys="expands"
        @expand-change="expandChange"
      >
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="item in columnslist"
          :key="item.prop"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editCity(scope)"
              type="text"
              size="small"
              v-permission="'ProvinceUpdate'"
            >
              编辑
            </el-button>
            <el-button
              @click="deleteCity(scope)"
              type="text"
              size="small"
              v-permission="'ProvinceDelete'"
              v-if="scope.row.parentId != 0"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </my-table>
    </section>
    <el-dialog
      :title="title"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <el-form :model="model" :rules="rules" label-width="100px" ref="ruleForm">
        <el-form-item label="省份" prop="pvovinceObj" class="textLeft">
          <el-select v-model="model.pvovinceObj" placeholder="请选择城市">
            <el-option
              v-for="item in province"
              :key="item.provId"
              :label="item.provName"
              :value="item.provId"
            >
            </el-option>
          </el-select
          >
        </el-form-item>
        <el-form-item label="城市" prop="cityName">
          <el-input
            v-model="model.cityName"
            placeholder="请输入城市"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="title1"
      v-if="dialogFormVisible2"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="clickmodal"
    >
      <my-form :model="model1" :rules="rules1">
        <el-form-item label="省份名：" prop="provName">
          <el-input
            v-model="model1.provName"
            placeholder="请输入省份的名字"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序号：" class="textLeft" prop="provSort">
          <el-input-number
            :controls="false"
            v-model="model1.provSort"
            placeholder="请输入排序号："
          ></el-input-number>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="save">保存</el-button>
        </el-form-item>
      </my-form>
    </el-dialog>
  </section>
</template>
<script>
  import other from "@api/other";
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";

  export default {
    name: "city",
    mixins: [menuRole, commonMessage],
    data() {
      return {
        searchObj: {},
        columnslist: [
          {prop: "provName", label: "省份"},
          {prop: "city", label: "城市"},
        ],
        data: [],
        province: [],
        searchObj: {
          province: "",
          city: "",
        },
        state: 0,
        pvovince: "",
        parentId: "",
        model: {
          pvovinceObj: "",
          cityName: "",
        },
        rules: {
          pvovinceObj: [
            {
              required: true,
              message: "请选择城市",
              trigger: ["blur", "change"],
            },
          ],
          cityName: [
            {
              required: true,
              message: "请输入城市名",
              trigger: ["blur", "change"],
            },
          ],
        },
        rules1: {
          provName: [
            {
              required: true,
              message: "请选择城市",
              trigger: ["blur", "change"],
            },
          ],
          provSort: [
            {
              required: true,
              message: "请输入排序号",
              trigger: ["blur", "change"],
            },
          ],
        },
        model1: {
          provName: "",
          provSort: 0,
          provId: "",
        },
        dialogFormVisible2: false,
        title1: "修改省份",
        expands: [],
      };
    },
    computed: {
      title() {
        if (this.state == 1) {
          return "修改城市";
        } else if (this.state == 2) {
          return "添加城市";
        }
      },
    },
    methods: {
      selectCity() {
      },
      searchM() {
        this.getTableData();
      },
      async getTableData() {
        this.openLoading();
        let d = await other.getAllProvince(this.searchObj);
        d = this.getTreeList(d, 0, [], "provId");
        this.data = handle(d);
        this.closeLoading();
      },
      async getSelectCity() {
        this.allOrigin = await other.getAllProvince({province: "", city: ""});
        this.getProvince();
      },
      getProvince() {
        this.province = [
          ...this.allOrigin.filter((item) => {
            if (item.parentId === 0) {
              return true;
            }
          }),
        ];
      },
      addCity({row}) {
        this.resetData();
        this.state = 2;
        this.open();
      },
      save(ruleForm) {
        this.$refs[ruleForm].validate(async (valid) => {
          if (valid) {
            if (this.state == 1) {
              await this.putData();
            } else {
              let d = await this.addData();
            }
            this.close();
            this.initData();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      async addData() {
        //
        return await other.postProvince({
          parentId: this.model.pvovinceObj,
          provName: this.model.cityName,
        });
      },
      async putData() {
        return await other.putProvince({
          provId: this.provId,
          provName: this.model.cityName,
        });
      },
      open2() {
        this.dialogFormVisible2 = true;
      },
      close2() {
        this.dialogFormVisible2 = false;
      },
      expandChange(row, expanded) {
        let provId = row.provId + "";
        if (expanded) {
          if (!this.expands.includes(provId)) {
            this.expands.push(provId);
          }
        } else {
          let index = this.expands.findIndex((item) => {
            return provId == item;
          });
          if (index > -1) {
            this.expands.splice(index, 1);
          }
        }
      },
      rowClick(row) {
        if (row.children.length) {
          let provId = row.provId + "";
          if (!this.expands.includes(provId)) {
            this.expands.push(provId);
          } else {
            let index = this.expands.findIndex((item) => {
              return provId == item;
            });
            if (index > -1) {
              this.expands.splice(index, 1);
              this.$refs.myTable.$children[0].toggleRowExpansion(row, false);
            }
          }
        }
      },
      async save() {
        let d = await other.putProvince(this.model1);
        if (d === this.saveSuccess) {
          this.close2();
          this.getTableData();
        }
      },
      editCity({row}) {
        if (row.parentId === 0) {
          this.model1.provName = row.provName;
          this.model1.provId = row.provId;
          this.open2();
        } else {
          this.model.pvovinceObj = row.parentId;
          this.model.cityName = row.city;
          this.provId = row.provId;
          this.state = 1;
          this.open();
        }
      },
      resetData() {
        this.model.pvovinceObj = "";
        this.model.cityName = "";
      },
      async deleteCity({row}) {
        this.provId = row.provId;
        this.confirmDelMessage(
          "确定要删除该城市吗",
          async () => {
            return other.delProvince(this.provId);
          },
          async () => {
            this.initData();
          }
        );
      },
      initData() {
        this.getTableData();
        this.getSelectCity();
      },
    },
    mounted() {
      this.initData();
    },
  };

  function handle(d) {
    d.forEach((item) => {
      item.children.forEach((i) => {
        i.city = i.provName;
        i.provName = item.provName;
      });
    });
    return d;
  }
</script>
<style lang="scss" module>
  @import "./common/search.scss";

  .search1 {
    width: 650px;
  }
</style>
