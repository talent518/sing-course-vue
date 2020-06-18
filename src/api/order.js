const url = {
  getProduct: `order`,
  orderTypes: `dict/order-type`,
  buyType: `dict/buy-type`,
  orderStatus: `dict/order-status`,
  exportOrder: `export/order`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_API"];
const { get, post, patch, put, delete: del } = ajax(prefix)();

class Order {
  exportOrder({
    orgId,
    uid,
    productId,
    type,
    status,
    orderNO,
    beginDate,
    endDate,
    buyType,
  }) {
    return get(`${url.exportOrder}`, {
      orgId,
      uid,
      productId,
      type,
      status,
      orderNO,
      beginDate,
      endDate,
      buyType,
    });
  }

  buyType() {
    return get(`${url.buyType}`);
  }

  getOrders({
    orgId,
    uid,
    productId,
    type,
    status,
    orderNO,
    beginDate,
    endDate,
    curPage,
    pageSize,
    buyType,
  }) {
    return get(`${url.getProduct}`, {
      orgId,
      uid,
      productId,
      type,
      status,
      orderNO,
      beginDate,
      endDate,
      curPage,
      pageSize,
      buyType,
    });
  }

  orderTypes() {
    return get(`${url.orderTypes}`);
  }

  orderStatus() {
    return get(`${url.orderStatus}`);
  }
}

export default new Order();
