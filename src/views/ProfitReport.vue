<template>
  <section :class="$style.provinceManager" class="profitReport">
    <el-row class="textLeft m20 el-form100" :gutter="20">
      <el-col :span="4">
        <el-select
          v-model="model.orgId"
          placeholder="请选择组织"
          value-key="orgId"
          clearable
        >
          <el-option
            :label="item.orgName"
            :key="item.orgId"
            :value="item.orgId"
            v-for="item in orgs"
          >
            <span v-for="item in item.index" class="opcaity">13</span
            ><span>{{ item.orgName }}</span></el-option
          >
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="model.uid"
          filterable
          remote
          reserve-keyword
          placeholder="请选择经销人员"
          :remote-method="getUsers"
          value-key="id"
          clearable
        >
          <el-option
            v-for="item in userList"
            :key="item.uid"
            :label="item.nickname"
            :value="item.uid"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="model.id" placeholder="请选择业绩月">
          <el-option
            v-for="item in reportList"
            :key="item.profitId"
            :value="item.profitId"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-button
          type="primary"
          @click="searchM"
          v-permission="'ProfitReportView'"
        >查询
        </el-button
        >
        <el-button
          @click="export1"
          type="success"
          v-permission="'ExportProfit'"
        >
          导出
        </el-button
        >
      </el-col>
    </el-row>
    <div class="m20 textLeft red">最后统计时间：{{ makeTime }}</div>
    <div
      class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
    >
      <table class="el-table__body" id="j-report-profit" width="100%">
        <thead>
        <tr>
          <th class="nm" rowspan="2" width="600">组织与分销人员信息</th>
          <th rowspan="2">总计分润</th>
          <th class="pd" rowspan="2">产品</th>
          <th class="fs" colspan="3">首次分销</th>
          <th class="sc" colspan="3">二次裂变</th>
          <th class="tt" rowspan="2">合计分润</th>
        </tr>
        <tr>
          <th class="fs t1">订单</th>
          <th class="fs t2">退单</th>
          <th class="fs t3">分润金额</th>
          <th class="sc t1">订单</th>
          <th class="sc t1">退单</th>
          <th class="sc t1">分润金额</th>
        </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <el-dialog
      title="业绩明细"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="clickmodal"
      width="70%;"
      top="10vh"
    >
      <div class="m20b textLeft">
        <el-button
          @click="exportProfitLogM"
          type="success"
          v-permission="'ExportProfitLog'"
        >导出
        </el-button
        >
      </div>
      <el-table :data="data1" border fit>
        <el-table-column label="订单号" prop="orderNO" width="245">
        </el-table-column>
        <el-table-column label="收支类型" prop="isPay">
          <template slot-scope="{ row }">
            <span class="red" v-if="row.isPay == 0">
              收入
            </span>
            <span v-else>
              支出
            </span>
          </template>
        </el-table-column>
        <el-table-column label="实付金额" prop="productPrice">
        </el-table-column>
        <el-table-column label="付款时间" prop="createTime" width="180">
        </el-table-column>
        <el-table-column label="订单类型" prop="typeV"></el-table-column>
        <el-table-column label="经销人员" width="280">
          <template slot-scope="{ row }">
            <ul>
              <li>所属组织：{{ row.orgName }}</li>
              <li>经销人员：{{ row.nickname }}</li>
              <li>身份：{{ row.identityName }}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="分润金额" prop="money"></el-table-column>
      </el-table>
      <el-pagination
        class="m20"
        background
        layout="prev, pager, next,total"
        :total="model1.total"
        :page-size="model1.pageSize"
        @current-change="currentChange"
        :current-page.sync="model1.curPage"
      >
      </el-pagination>
    </el-dialog>
  </section>
</template>
<script>
  import menuRole from "@/views/common/menuRole";
  import commonMessage from "@/views/common/commonMessage";
  import commonSelect from "@/views/common/commonSelect";
  import {mapGetters} from "vuex";

  export default {
    name: "ProfitReport",
    mixins: [menuRole, commonMessage, commonSelect],
    data() {
      return {
        data: [],
        data1: [],
        provId: "",
        cityId: "",
        province: [],
        citys: [],
        reportList: [],
        id: 2,
        loading: false,
        isShowTable: false,
        model: {
          id: 2,
          uid: "",
          orgId: "",
        },
        makeTime: "",
        model1: {
          id: 2,
          uid: "",
          orgId: "",
          pageSize: 5,
          curPage: 1,
          total: 0,
        },
        mh: 500,
        types: [],
      };
    },
    methods: {
      async exportProfitLogM() {
        let d = await this.ApiReport.exportProfitLog(this.model1);
        location.href = d;
      },
      async payLog(row) {
        this.open();
        let uid = row.uid || 0;
        let id = this.model.id;
        let orgId = row.orgId;
        this.model1 = {
          ...this.model1,
          uid,
          id,
          orgId,
        };
        this.getLogList();
      },
      async getLogList() {
        let d = await this.ApiReport.payLog(this.model1);
        d.list.forEach((item) => {
          this.types.forEach((i) => {
            if (item.orderType == i.value) {
              item.typeV = i.name;
            }
          });
        });
        this.model1.total = d.rowCount;
        this.data1 = d.list;
      },
      async getNoAuthProvince() {
        this.Allprovince = await this.ApiOther.dictProvince();
        this.province = this.getTarget(this.cloneDeep(this.Allprovince));
      },
      searchM() {
        // this.getReportList();
        this.getTable();
      },
      currentChange(currentPage) {
        this.model1.curPage = currentPage;
        this.getLogList();
      },
      selectCity() {
        this.citys = this.getTarget(
          this.cloneDeep(this.Allprovince),
          this.provId
        );
      },
      async export1() {
        let d = await this.ApiReport.exportProfit(this.model.id);
        document.location.href = d;
      },
      findAllOrgPerson(allData, orgId, key = "orgId", arr = []) {
        allData.forEach((item) => {
          if (item.orgId === orgId && !item.isOrg) {
            arr.push(item);
          }
        });
        return arr;
      },
      //找到组织 下级组织
      findChildOrg(allData, orgId, key = "parentId", arr = []) {
        allData.forEach((item) => {
          if (item[key] === orgId && item.isOrg) {
            arr.push(item); //找到所有的个人
            arr.concat(this.findChildOrg(allData, item.orgId, key, arr));
          }
        });
        return arr;
      },

      async getReportList() {
        this.loading = true;
        this.isShowTable = false;
        let d = await this.ApiReport.getOrderReport(this.model);
        let orgs = d.orgs;
        let users = d.users;
        orgs = this.gerOrgsbyUsers(orgs, users);
        orgs = this.sortParent(orgs);

        let list = [];
        orgs.forEach((i) => {
          if (Array.isArray(i.products)) {
            i.products.forEach((p) => {
              list.push({...i, ...p, isOrg: true, total1: i.totalMoney});
            });
          }
          if (Array.isArray(i.user)) {
            i.user.forEach((o) => {
              if (o.childrens.length) {
                o.childrens.forEach((oc) => {
                  list.push({
                    ...o,
                    ...oc,
                    index: i.index,
                    total1: o.totalMoney,
                  });
                  o;
                });
              } else {
                list.push({...o, index: i.index, total1: o.totalMoney});
              }
            });
          }
        });
        this.allData = this.cloneDeep(list);
        this.data = list;
        this.isShowTable = true;
        this.loading = false;
      },
      //排序规则
      sortParent(orgs) {
        let treeOrgs = this.getTreeList(orgs, 0, [], "orgId");
        let orgSortList = this.flatten(treeOrgs);
        return orgSortList;
      },

      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        let len = 0;
        try {
          if (row.products && row.products.length) {
            len = row.products.length;
          } else if (row.childrens) {
            len = row.childrens.length || 1;
          }
        } catch (error) {
          len = 1;
        }
        if (columnIndex === 0 || columnIndex === 1) {
          if (rowIndex % len === 0) {
            return {
              rowspan: len,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },

      findIcon(event) {
        let $target = $(event.target).closest(".el-table__row");
        let $obj = $target.find("i");
        if ($obj.length) {
          let b = $obj.attr("class").includes("right");
          if (event.target.isShow) {
            $obj.removeClass().addClass("el-icon-arrow-down");
          } else {
            $obj.removeClass().addClass("el-icon-arrow-right");
          }
        }
      },
      async orderTypes() {
        this.types = await this.ApiOrder.orderTypes();
      },
      async getOrderReportBySelect() {
        let d = await this.ApiReport.getOrderReportBySelect();
        d.forEach((item) => {
          item.label = item.beginDate + "~" + item.endDate;
        });
        this.reportList = d;
        this.$nextTick(() => {
          this.model.id = d[0].profitId;
          this.makeTime = d[0].makeTime;
        });
      },
      allHide() {
      },
      gerOrgsbyUsers(orgs, users) {
        orgs.forEach((org) => {
          users.forEach((user) => {
            if (org.orgId === user.orgId) {
              if (!org["user"]) {
                org["user"] = [];
                org.user.push(user);
              } else {
                org.user.push(user);
              }
            }
          });
        });
        return orgs;
      },

      setH() {
        // this.mh = (this.mh * document.documentElement.clientHeight) / 625;
        // console.log(this.mh);
      },
      getOrgAndPerson(allData, orgId, orgs, arr = []) {
        orgs.forEach((org) => {
          this.getOrgAndPerson(allData, orgId, "orgId", arr);
        });
      },
      async getTable() {
        let vm = this;
        var orderTypes = {};
        let data = await this.ApiReport.getOrderReport(this.model);
        const users = {};
        $.each(data.users, function () {
          if (!(this.orgId in users)) {
            users[this.orgId] = [];
          }
          users[this.orgId].push(this);
        });

        const orgs = {};
        $.each(data.orgs, function () {
          if (!(this.parentId in orgs)) {
            orgs[this.parentId] = [];
          }
          orgs[this.parentId].push(this);
        });

        var maxGrade = 0;
        const orgPaths = [];
        const orgPath = function (pid, grade, path) {
          if (!(pid in orgs)) {
            return 0;
          }

          maxGrade = Math.max(maxGrade, grade);

          var childrens = 0;

          $.each(orgs[pid], function () {
            orgPaths.push(this);
            this.path = path + this.orgId + ",";
            this.grade = grade;
            this.childrens = orgPath(this.orgId, grade + 1, this.path);
            if (this.orgId in users) {
              var n = 0;
              $.each(users[this.orgId], function () {
                n += Math.max(1, this.childrens.length);
              });
              this.childrens += n;
            }
            childrens += this.products.length;
            childrens += this.childrens;
          });

          return childrens;
        };

        orgPath(0, 0, "");
        const $tbody = $("#j-report-profit>tbody").empty();
        $.each(orgPaths, function (i, item) {
          const n = item.products.length;
          const $tr = $("<tr></tr>")
            .attr({
              orgId: item.orgId,
              path: item.path,
              childrens: item.childrens,
              n: n,
            })
            .appendTo($tbody);
          $('<td class="nm"><i class="el-icon-arrow-down iconmenu"></i></td>')
            .css("paddingLeft", 10 + item.grade * 14)
            .attr("rowspan", item.products.length)
            .append(item.orgName)
            .appendTo($tr);
          $('<td class="tt logd"/>')
            .attr("rowspan", item.products.length)
            .text(item.totalMoney)
            .appendTo($tr)
            .click(() => {
              vm.payLog({uid: 0, orgId: item.orgId});
            });
          const prod = item.products.shift();
          $('<td class="pd"/>').text(prod.productName).appendTo($tr);
          $('<td class="fs t1"/>').text(prod.firstAmount).appendTo($tr);
          $('<td class="fs t2"/>').text(prod.firstRefundAmount).appendTo($tr);
          $('<td class="fs t3"/>').text(prod.firstMoney).appendTo($tr);
          $('<td class="sc t1"/>').text(prod.secondAmount).appendTo($tr);
          $('<td class="sc t2"/>').text(prod.secondRefundAmount).appendTo($tr);
          $('<td class="sc t3"/>').text(prod.secondMoney).appendTo($tr);
          $('<td class="tt"/>').text(prod.totalMoney).appendTo($tr);
          $.each(item.products, function (i2, item2) {
            const $tr2 = $("<tr></tr>")
              .attr({
                orgId: item.orgId,
                path: item.path.substring(0, item.path.length - 1) + "P",
                childrens: item.childrens,
              })
              .appendTo($tbody);
            $('<td class="pd"/>').text(item2.productName).appendTo($tr2);
            $('<td class="fs t1"/>').text(item2.firstAmount).appendTo($tr2);
            $('<td class="fs t2"/>').text(item2.firstRefundAmount).appendTo($tr2);
            $('<td class="fs t3"/>').text(item2.firstMoney).appendTo($tr2);
            $('<td class="sc t1"/>').text(item2.secondAmount).appendTo($tr2);
            $('<td class="sc t2"/>')
              .text(item2.secondRefundAmount)
              .appendTo($tr2);
            $('<td class="sc t3"/>').text(item2.secondMoney).appendTo($tr2);
            $('<td class="tt"/>').text(item2.totalMoney).appendTo($tr2);
          });

          if (item.orgId in users) {
            $.each(users[item.orgId], function (i2, item2) {
              const n = Math.max(1, item2.childrens.length);
              const $tr2 = $("<tr></tr>")
                .attr({
                  orgId: item2.orgId,
                  path: item.path,
                  uid: item2.uid,
                })
                .appendTo($tbody);
              $('<td class="nm"/>') // 10 + item.grade * 14
                .css("paddingLeft", 24 + item.grade * 14)
                .attr("rowspan", n)
                .html(
                  "<p>所属组织：" +
                  item2.orgName +
                  "</p><p>分销人员：" +
                  (item2.nickname || item2.username) +
                  "</p><p>身份：" +
                  item2.identityName +
                  "</p>"
                )
                .appendTo($tr2);
              $('<td class="tt logd"/>')
                .attr("rowspan", n)
                .text(item2.totalMoney)
                .appendTo($tr2)
                .click(function () {
                  logDialog.call(
                    $tr2,
                    item2.nickname || item2.username,
                    item2.orgId,
                    item2.uid
                  );
                });
              const user = item2.childrens.length
                ? item2.childrens.shift()
                : item2;
              $('<td class="pd"/>').text(user.productName).appendTo($tr2);
              $('<td class="fs t1"/>').text(user.firstAmount).appendTo($tr2);
              $('<td class="fs t2"/>')
                .text(user.firstRefundAmount)
                .appendTo($tr2);
              $('<td class="fs t3"/>').text(user.firstMoney).appendTo($tr2);
              $('<td class="sc t1"/>').text(user.secondAmount).appendTo($tr2);
              $('<td class="sc t2"/>')
                .text(user.secondRefundAmount)
                .appendTo($tr2);
              $('<td class="sc t3"/>').text(user.secondMoney).appendTo($tr2);
              $('<td class="tt"/>').text(user.totalMoney).appendTo($tr2);

              $.each(item2.childrens, function (i3, item3) {
                const $tr3 = $("<tr></tr>")
                  .attr({
                    orgId: item2.orgId,
                    path: item.path,
                    uid: item2.uid,
                  })
                  .appendTo($tbody);
                $('<td class="pd"/>').text(item3.productName).appendTo($tr3);
                $('<td class="fs t1"/>').text(item3.firstAmount).appendTo($tr3);
                $('<td class="fs t2"/>')
                  .text(item3.firstRefundAmount)
                  .appendTo($tr3);
                $('<td class="fs t3"/>').text(item3.firstMoney).appendTo($tr3);
                $('<td class="sc t1"/>').text(item3.secondAmount).appendTo($tr3);
                $('<td class="sc t2"/>')
                  .text(item3.secondRefundAmount)
                  .appendTo($tr3);
                $('<td class="sc t3"/>').text(item3.secondMoney).appendTo($tr3);
                $('<td class="tt"/>').text(item3.totalMoney).appendTo($tr3);
              });
            });
          }
        });
        $("#j-report-profit")
          .off()
          .on("click", ".iconmenu", function () {
            const $this = $(this);
            const $tr = $this.parent().parent();
            var $trs = $tr.nextAll('[path^="' + $tr.attr("path") + '"]');
            const $fold = $trs.filter(".fold");
            if ($fold.length) {
              $trs = $trs.slice(0, $trs.index($fold) + parseInt($fold.attr("n")));
            }
            if ($this.is(".el-icon-arrow-down")) {
              $this
                .removeClass("el-icon-arrow-down")
                .addClass("el-icon-arrow-right");
              $tr.addClass("fold");
              $trs.hide();
            } else {
              $tr.removeClass("fold");
              $trs.show();
              $this
                .removeClass("el-icon-arrow-right")
                .addClass("el-icon-arrow-down");
            }
          });
        $("#j-report-profit").find(".iconmenu").trigger("click");
        return false;
      },
    },
    async mounted() {
      this.setH();
      await this.getOrderReportBySelect();
      this.getNoAuthProvince();
      this.closeLoading();
      this.getOrgs();
      this.getUsers("");
      //this.getReportList();
      this.getTable();
      this.orderTypes();
    },
  };
</script>
<style lang="scss" module>
  .myInput {
    width: 220px;
    display: inline-block;
  }

  .provinceManager {
    .textLeft {
      text-align: left !important;
    }
  }
</style>
<style lang="scss">
  #j-report-profit td,
  #j-report-profit th {
    padding-left: 10px;
    padding-left: 10px;
  }

  #j-report-profit .logd {
    cursor: pointer;
    color: #409eff;
  }

  .myNumber {
    .el-input-number {
      width: 217px !important;
    }
  }

  .profitReport {
    .el-dialog {
      width: 80%;
    }
  }
</style>
