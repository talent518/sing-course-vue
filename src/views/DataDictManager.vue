<template>
  <section>
    <div class="textLeft m20">
      <el-button type="success" @click="addRoot" v-permission="'DictCreate'"
      >添加
      </el-button
      >
    </div>
    <my-table :data="data">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columnslist"
        :key="item.prop"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-permission="'DictView'"
            @click="list(scope)"
          >
            列表
          </el-button>
          <el-button
            @click="edit(scope)"
            type="text"
            size="small"
            v-permission="'DictUpdate'"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            v-permission="'DictCreate'"
            @click="add(scope)"
          >
            添加
          </el-button>
          <el-button
            type="text"
            size="small"
            v-permission="'DictGenerate'"
            @click="release(scope)"
          >
            发布
          </el-button>
          <el-button
            type="text"
            size="small"
            v-permission="'DictDelete'"
            @click="del(scope)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </my-table>
    <el-dialog
      title="添加字典"
      v-if="dialogFormVisible1"
      :visible.sync="dialogFormVisible1"
    >
      <my-form :model="childDataObj" :rules="rules">
        <el-form-item label="属性名" prop="propName">
          <el-input
            v-model="childDataObj.propName"
            placeholder="请输入属性名"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="propValue">
          <el-input
            v-model="childDataObj.propValue"
            placeholder="请输入属性名"
          ></el-input>
        </el-form-item>
        <el-form-item label="缩写">
          <el-input
            v-model="childDataObj.t"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="全写">
          <el-input
            v-model="childDataObj.translate"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="注释">
          <el-input
            v-model="childDataObj.comment"
            placeholder="请写入注释"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </my-form>
    </el-dialog>
    <el-dialog
      :title="title"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
    >
      <my-table :data="childData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="item in childList"
          :key="item.prop"
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="edit1(scope)"
              type="text"
              size="small"
              v-permission="'OrgUpdate'"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              v-permission="'OrgDelete'"
              @click="del1(scope)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </my-table>
    </el-dialog>
    <el-dialog
      :title="title1"
      v-if="dialogFormVisible2"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="clickmodal"
    >
      <my-form :model="model" :rules="rules1" class="textLeft">
        <el-form-item label="数据类型：" prop="dataType">
          <el-select
            clearable
            v-model="model.dataType"
            placeholder="请选择数据类型"
          >
            <el-option
              :key="item.index"
              :label="item.name"
              :value="item.index"
              v-for="item in listData"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则：">
          <el-input
            v-model="model.pattern"
            placeholder="请输入规则"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="是否唯一：">
          <el-checkbox v-model="model.isUnique"></el-checkbox>
        </el-form-item>
        <el-form-item label="字典Key：">
          <el-input
            v-model="model.className"
            placeholder="请输入字典名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="字典名称：">
          <el-input
            v-model="model.classTitle"
            placeholder="请输入类标题"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="注释：">
          <el-input
            v-model="model.comment"
            placeholder="请输入注释"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="saveD">保存</el-button>
        </el-form-item>
      </my-form>
    </el-dialog>
    <el-dialog
      title="数据字典发布"
      v-if="dialogFormVisible3"
      :visible.sync="dialogFormVisible3"
      :close-on-click-modal="clickmodal"
    >
      <div v-html="html" style="text-align: left;"></div>
    </el-dialog>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import commonSelect from "@/views/common/commonSelect";

  export default {
    name: "DataDictManager",
    mixins: [menuRole, commonMessage, commonSelect],
    data() {
      return {
        data: [],
        listData: [],
        html: "",
        columnslist: [
          {prop: "classTitle", label: "字典名称"},
          {prop: "className", label: "字典key"},
          {prop: "classId", label: "字典值"},
          {prop: "comment", label: "注释"},
        ],
        childList: [
          {prop: "propName", label: "属性名"},
          {prop: "propValue", label: "属性值"},
          {prop: "t", label: "缩写"},
          {prop: "translate", label: "全写"},
          {prop: "comment", label: "注释"},
        ],
        childDataObj: {
          propName: "",
          propValue: "",
          t: "",
          translate: "",
          comment: "",
        },
        rules: {
          propName: [
            {
              required: true,
              message: "请输入属性名",
              trigger: ["blur", "change"],
            },
          ],
          propValue: [
            {
              required: true,
              message: "请输入属性值",
              trigger: ["blur", "change"],
            },
          ],
        },
        parentId: "",
        childData: [],
        state: 0,
        dialogFormVisible1: false,
        title: "",
        state1: 0,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        checkedList: [1],
        model: {
          fromId: 0,
          dataType: "",
          pattern: "",
          isUnique: false,
          className: "",
          classTitle: "",
          comment: "",
        },
        rules1: {
          dataType: [
            {
              required: true,
              message: "请选择数据类型",
              trigger: ["blur", "change"],
            },
          ],
        },
      };
    },
    computed: {
      title1() {
        return this.state1 === 0 ? "添加字典类" : "编辑字典类";
      },
    },
    methods: {
      open3() {
        this.dialogFormVisible3 = true;
      },
      close3() {
        this.dialogFormVisible3 = false;
      },
      async release({row}) {
        this.html = "";
        this.open3();
        this.html = await this.ApiOther.getDDCLassGenerate(row.classId);
      },
      async saveD() {
        let model = {...this.model};
        model.isUnique = Number(model.isUnique);
        if (this.state1 === 0) {
          let d = await this.ApiOther.postDClass(model);
          if (d === this.saveSuccess) {
            this.close2();
            this.getddClassList();
          }
        } else {
          let d = await this.ApiOther.putDClass(model);
          if (d === this.saveSuccess) {
            this.close2();
            this.getddClassList();
          }
        }
      },
      async getddClassList() {
        let d = await this.ApiOther.getDClass();
        this.data = d;
      },
      resetData() {
        this.childDataObj = {
          propName: "",
          propValue: "",
          t: "",
          translate: "",
          comment: "",
        };
      },
      open1() {
        this.dialogFormVisible1 = true;
      },
      close1() {
        this.dialogFormVisible1 = false;
      },
      edit({row}) {
        this.open2();
        this.state1 = 1;
        Object.assign(this.model, row);
        this.model.isUnique = Boolean(Number(this.model.isUnique));
      },
      add({row}) {
        this.resetData();
        this.parentId = row.classId;
        //这是添加子元素的功能 需要传入父节点
        this.state = 0;
        this.open1();
      },
      edit1({row}) {
        this.state = 1; //修改
        Object.assign(this.childDataObj, row);
        this.childDataObj.id = this.childDataObj.propId;
        this.open1();
      },
      add1({row}) {
      },
      async save() {
        let d = {};
        if (this.state === 0) {
          d = await this.ApiOther.addDdProperty({
            id: this.parentId,
            ...this.childDataObj,
          });
        } else if (this.state === 1) {
          d = await this.ApiOther.putDdProperty(this.childDataObj);
        }
        if (d === this.saveSuccess) {
          this.refleshData();
          this.close1();
        }
      },
      async refleshData() {
        this.childData = await this.ApiOther.getDdProperty(this.parentId);
      },
      del1({row}) {
        this.state = 3; // 删除属性
        this.parentId = row.classId;
        this.confirmDelMessage(
          "确定要删除该属性吗",
          async () => {
            return this.ApiOther.delDdProperty(row.propId);
          },
          async () => {
            this.refleshData();
          }
        );
      },
      open2() {
        this.dialogFormVisible2 = true;
      },
      close2() {
        this.dialogFormVisible2 = false;
      },
      resetData() {
        this.model = {
          fromId: 0,
          dataType: "",
          pattern: "",
          isUnique: false,
          className: "",
          classTitle: "",
          comment: "",
        };
      },
      addRoot() {
        this.state1 = 0;
        this.resetData();
        this.open2();
      },
      async list({row}) {
        this.title = row.classTitle + `列表`;
        this.parentId = row.classId;
        this.state = 5;
        let d = await this.ApiOther.getDdProperty(row.classId);
        this.childData = d;
        this.open();
      },
      async getDataTypes() {
        let d = await this.ApiOther.getDataTypes();
        this.listData = d.map((name, index) => {
          return {
            name,
            index,
          };
        });
      },
      del({row}) {
        this.confirmDelMessage(
          "确定要删除该字典吗",
          async () => {
            return this.ApiOther.delDClass(row.classId);
          },
          async () => {
            this.getDataTypes();
            this.getddClassList();
          }
        );
      },
    },
    mounted() {
      this.getDataTypes();
      this.getddClassList();
    },
  };
</script>
<style lang="scss" module></style>
