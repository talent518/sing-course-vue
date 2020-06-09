<template>
  <section :class="$style.provinceManager">
    <el-row class="textLeft m20 el-form100" :gutter="20">
      <el-col :span="4">
        <el-select
          v-model="model.provId"
          @change="selectCity"
          placeholder="请选择省份"
          clearable
        >
          <el-option
            v-for="item in provinceList"
            :key="item.provId"
            :label="item.provName"
            :value="item.provId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="model.cityId" clearable placeholder="请选择城市">
          <el-option
            v-for="item in citys"
            :key="item.provId"
            :label="item.provName"
            :value="item.provId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="model.id" placeholder="请选择业绩月" clearable>
          <el-option
            v-for="item in reportList"
            :key="item.naturalId"
            :value="item.naturalId"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-button
          type="primary"
          @click="searchM"
          v-permission="'NaturalReportView'"
        >查询
        </el-button
        >
        <el-button
          @click="export1"
          type="success"
          v-permission="'ExportNatural'"
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
      <table class="el-table__body" id="j-report-natural" width="100%">
        <thead>
        <tr>
          <th class="nm" width="400">省市</th>
          <th class="tt">总计分润</th>
          <th class="pd">产品</th>
          <th class="am">订单数</th>
          <th class="rf">退单数</th>
          <th class="mn">分润金额</th>
        </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
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
        model: {
          provId: "",
          cityId: "",
          id: "",
        },
        province: [],
        citys: [],
        isShowTable: false,
        makeTime: "",
        cols: [
          // { prop: "provName", label: "省市" },
          // { prop: "money", label: "总计分润" },
          {prop: "productName", label: "产品"},
          {prop: "amounts", label: "订单数"},
          {prop: "refunds", label: "退单数"},
          {prop: "money1", label: "分润金额"},
        ],
      };
    },
    methods: {
      async getNoAuthProvince() {
        this.Allprovince = await this.ApiOther.dictProvince();
        this.province = this.getTarget(this.cloneDeep(this.Allprovince));
      },
      async export1() {
        let d = await this.ApiReport.exportNatural(this.model.id);
        document.location.href = d;
      },
      rowClick(row, column, event) {
        this.findIcon(event);
        let len = row.products.length || 1;
        event.target.isShow = !event.target.isShow;
        let allData = this.cloneDeep(this.allData);
        let treeOrgs = this.getTreeList(allData, row.provId, [], "provId");
        let orgSortList = 0;
        treeOrgs.forEach((i) => {
          orgSortList += i.products.length;
        });
        let newList = [];
        let $target = $(event.target).closest(".el-table__row");
        let $tbody = $(event.target).closest("tbody");
        let index = this.data.findIndex((d) => d.provId === row.provId);
        let start = index + len;
        let end = start + orgSortList;
        let $rows = $tbody.find(".el-table__row").slice(start, end);
        let $fold = $rows.filter(".fold");
        if ($fold.length) {
          $rows = $rows.slice(0, $rows.index($fold) + 1);
        }
        if (event.target.isShow) {
          $target.addClass("fold");
          $rows.hide();
        } else {
          $target.removeClass("fold");
          $rows.show();
        }
      },
      searchM() {
        this.getNaturalReport();
      },
      async getNaturalReport() {
        let vm = this;
        let data = await this.ApiReport.getNaturalReport(this.model);
        const $tbody = $("#j-report-natural tbody").empty();

        const provinces = {};
        $.each(data, function (i, prov) {
          if (!(prov.parentId in provinces)) {
            provinces[prov.parentId] = [];
          }
          provinces[prov.parentId].push(prov);
        });
        const provs = [];
        $.each(provinces[0], function (i, prov) {
          provs.push(prov);
          prov.childrens = prov.products.length;

          if (!(prov.provId in provinces)) return;

          $.each(provinces[prov.provId], function (i2, prov2) {
            provs.push(prov2);
            prov2.childrens = prov2.products.length;
            prov.childrens += prov2.childrens;
          });
        });

        $.each(provs, function (i, prov) {
          const n = prov.products.length;
          const $tr = $("<tr/>")
            .attr({
              parentId: prov.parentId,
              provId: prov.provId,
              childrens: prov.childrens,
              n: n,
            })
            .appendTo($tbody);
          const prod = prov.products.shift();
          const $td = $('<td class="nm"/>')
            .attr("rowspan", n)
            .text(prov.provName)
            .appendTo($tr);
          if (prov.parentId) {
            $td.css("paddingLeft", "52px");
          } else {
            $td.prepend('<i class="el-icon-arrow-down iconmenu"></i>');
          }
          $('<td class="tt"/>').attr("rowspan", n).text(prov.money).appendTo($tr);
          $('<td class="pd"/>').text(prod.productName).appendTo($tr);
          $('<td class="am"/>').text(prod.amounts).appendTo($tr);
          $('<td class="rf"/>').text(prod.refunds).appendTo($tr);
          $('<td class="mn"/>').text(prod.money).appendTo($tr);

          $.each(prov.products, function (i2, prod2) {
            const $tr2 = $("<tr/>")
              .attr({parentId: prov.parentId, provId: prov.provId})
              .appendTo($tbody);
            $('<td class="pd"/>').text(prod2.productName).appendTo($tr2);
            $('<td class="am"/>').text(prod2.amounts).appendTo($tr2);
            $('<td class="rf"/>').text(prod2.refunds).appendTo($tr2);
            $('<td class="mn"/>').text(prod2.money).appendTo($tr2);
          });
        });
        $("#j-report-natural")
          .off()
          .on("click", ".iconmenu", function () {
            const $this = $(this);
            const $tr = $this.parent().parent();
            var $trs = $tr.nextAll('[parentId="' + $tr.attr("provId") + '"]');
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
        $("#j-report-natural").find(".iconmenu").trigger("click");
      },
      async getNaturalReportBySelect() {
        let d = await this.ApiReport.getNaturalReportBySelect();
        d.forEach((item) => {
          item.label = item.beginDate + "~" + item.endDate;
        });
        this.reportList = d;
        this.$nextTick(() => {
          this.model.id = d[0].naturalId;
          this.makeTime = d[0].makeTime;
        });
      },
      selectCity() {
        this.model.cityId = "";
        this.citys = this.getTarget(
          this.cloneDeep(this.allProCityList),
          this.model.provId
        );
      },
    },
    async mounted() {
      await this.getNaturalReportBySelect();
      this.getAllProvince();
      this.closeLoading();
      this.getNaturalReport();
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

  #j-report-natural td,
  #j-report-natural th {
    padding-left: 10px;
    padding-right: 10px;
  }

  .myNumber {
    .el-input-number {
      width: 217px !important;
    }
  }
</style>
