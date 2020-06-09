const url = {
  getOrderReport: `order/profit-report`,
  naturalReport: `order/natural-report`,
  exportProfit: `export/profit`,
  exportNatural: `export/natural`,
  payLog: `pay/log`,
  exportProfitLog: `export/profit-log`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_URI"];
const {get, post, patch, put, delete: del} = ajax(prefix)();

class Report {
  exportProfitLog({id, uid, orgId}) {
    return get(`${url.exportProfitLog}`, {id, uid, orgId});
  }

  payLog({id, uid, orgId, pageSize, curPage}) {
    return get(`${url.payLog}`, {id, uid, orgId, pageSize, curPage});
  }

  getOrderReport({id, uid, orgId}) {
    return get(`${url.getOrderReport}`, {id, uid, orgId});
  }

  getOrderReportBySelect() {
    return get(`${url.getOrderReport}`);
  }

  getNaturalReport({id, provId, cityId}) {
    return get(`${url.naturalReport}`, {id, provId, cityId});
  }

  getNaturalReportBySelect() {
    return get(`${url.naturalReport}`);
  }

  exportProfit(id) {
    return get(`${url.exportProfit}`, {id});
  }

  exportNatural(id) {
    return get(`${url.exportNatural}`, {id});
  }
}

export default new Report();
//order/natural-report?id=1&provId=0&cityId=0
