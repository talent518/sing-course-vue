<template>
  <section :class="$style.provinceManager" class="profitReport">
    <!-- <el-row class="textLeft m20 el-form100" :gutter="20">
      <el-col :span="4">
        <el-select
          v-model="provId"
          placeholder="请选择省"
          clearable
          @change="selectCity"
        >
          <el-option
            :label="item.provName"
            :key="item.provId"
            :value="item.provId"
            v-for="item in province"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="cityId" placeholder="请选择市" clearable>
          <el-option
            :label="item.provName"
            :key="item.provId"
            :value="item.provId"
            v-for="item in citys"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="productId" placeholder="请选择业绩月" clearable>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="searchM">查询</el-button>
        <el-button type="success" v-permission="'VipBatchCreate'">
          导出</el-button
        >
      </el-col>
    </el-row> -->
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
    <transition name="el-fade-in-linear" mode="out-in">
      <div v-loading="loading" v-if="isShowTable">
        <el-table
          :data="data"
          :span-method="arraySpanMethod"
          @row-click="rowClick"
          :mh="mh"
          class="mh"
        >
          <template>
            <el-table-column label="分销人员信息" width="550">
              <template slot-scope="scope">
                <dt v-if="!scope.row.isOrg" :class="$style.textLeft">
                  <dl>
                    <span v-for="i in scope.row.index" :key="i"
                    ><span
                      class="el-table__indent"
                      style="padding-left: 16px;"
                    ></span
                    ><span class="el-table__placeholder"></span></span
                    >所属组织：{{ scope.row.orgName }}
                  </dl>
                  <dl>
                    <span v-for="i in scope.row.index" :key="i">
                      <span
                        class="el-table__indent"
                        style="padding-left: 16px;"
                      ></span
                      ><span class="el-table__placeholder"></span></span
                    >分销人员：{{ scope.row.nickname }}
                  </dl>
                  <dl>
                    <span v-for="i in scope.row.index" :key="i">
                      <span
                        class="el-table__indent"
                        style="padding-left: 16px;"
                      ></span
                      ><span class="el-table__placeholder"></span></span
                    >身份：{{ scope.row.identityName }}
                  </dl>
                </dt>
                <div :class="$style.textLeft" class="fold1" v-else>
                  <div class="el-table__expand-icon myIconSpecial">
                    <span v-for="i in scope.row.index - 1" :key="i">
                      <span
                        class="el-table__indent"
                        style="padding-left: 16px;"
                      ></span
                      ><span class="el-table__placeholder"></span>
                    </span>
                    <i class="el-icon-arrow-down"></i>
                    <span style="font-size: 14px;"
                    >{{ scope.row.orgName }}合计</span
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="totalMoney" label="总计分润">
              <template slot-scope="{ row }">
                <el-link type="primary" @click.stop.prevent="payLog(row)">{{
                  row.total1 | formatNum
                  }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="产品"></el-table-column>
            <template>
              <el-table-column label="首次分销">
                <el-table-column prop="firstAmount" label="订单" width="100">
                </el-table-column>
                <el-table-column
                  prop="firstRefundAmount"
                  label="退单"
                  width="100"
                >
                </el-table-column>
                <el-table-column prop="firstMoney" label="分润金额" width="150">
                  <template slot-scope="{ row }">
                    <span> {{ row.firstMoney | formatNum }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="二次裂变">
                <el-table-column prop="secondAmount" label="订单" width="100">
                </el-table-column>
                <el-table-column
                  prop="secondRefundAmount"
                  label="退单"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="secondMoney"
                  label="分润金额"
                  width="150"
                >
                  <template slot-scope="{ row }">
                    <span> {{ row.secondMoney | formatNum }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="totalMoney" label="合计分润" width="150">
                <template slot-scope="{ row }">
                  <span> {{ row.totalMoney | formatNum }}</span>
                </template>
              </el-table-column>
            </template>
          </template>
        </el-table>
      </div>
    </transition>
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
          type="success"
          @click="ExportProfitLog"
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
        this.getReportList();
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
        let triggerlist = [];
        let o = {};
        let isOrg = list.forEach((item) => {
          if (item.isOrg) {
            if (!o[item.orgId]) {
              o[item.orgId] = item.orgId;
              triggerlist.push(item);
            }
          }
        });
        this.$nextTick(() => {
          setTimeout(() => {
            $(".mh")
              .find(".el-icon-arrow-down")
              .each((i, item) => {
                this.rowClick(triggerlist[i], "", "", item);
              });
          }, 10);
        });
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
      async exportProfitLog() {
        let d = await this.ApiReport.exportProfitLog(this.model1);
        location.href = d;
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

      rowClick(row, column, event, tar) {
        let target = (event && event.target) || tar;
        let b = $(target).attr("class");
        if (b) {
          if (!b.includes("el-icon-arrow")) {
            return;
          }
        }
        this.findIcon(event);
        let len = (row.products && row.products.length) || 1;
        target.isShow = !target.isShow;
        let index = this.data.findIndex((d) => d.orgId === row.orgId);
        let p = this.data[index].products.length + index;
        let allData = this.cloneDeep(this.allData);
        //找到所有的组织
        let arr1 = this.findAllOrgPerson(allData, row.orgId, "orgId", []);
        //找到所有组织下的员工
        let arr2 = this.findChildOrg(allData, row.orgId, "parentId", []);
        //过滤重复的orgId
        let orgList = [];
        var obj = {};
        arr2.forEach((item) => {
          if (!obj[item.orgId]) {
            orgList.push(item);
            obj[item.orgId] = item;
          }
        });
        let personList = [];
        orgList.forEach((item) => {
          personList.push(...this.findAllOrgPerson(allData, item.orgId));
        });
        let totalList = [...arr1, ...personList, ...arr2];
        let $target = $(target).closest(".el-table__row");
        let $tbody = $(target).closest("tbody");
        let $rows = $tbody.find(".el-table__row").slice(p, p + totalList.length);
        // let $fold = $rows.filter(".fold");
        // if ($fold.length) {
        //   $rows = $rows.slice(0, $rows.index($fold) + len);
        // }

        if (target.isShow) {
          // $target.addClass("fold");
          $rows.hide();
        } else {
          //  $target.removeClass("fold");
          $rows.show();
        }
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
    },
    async mounted() {
      this.setH();
      await this.getOrderReportBySelect();
      this.getNoAuthProvince();
      this.closeLoading();
      this.getOrgs();
      this.getUsers("");
      this.getReportList();
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
