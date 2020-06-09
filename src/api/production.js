const url = {
  getProduct: `dict/products`,
  productPrice: `product-price`,
  productPurchase: `product-purchase`,
  productPurchaseType: `dict/purchase-type`,
  productPurchaseStatus: `dict/purchase-status`,
  productRequest: `product-purchase/request`,
  productStock: `product-stock`,
  productStockLog: `product-stock/log`,
  stockLogType: `dict/stock-log-type`,
  productPruStatus: `product-purchase/status`,
  getVipBatch: `vip-batch`,
  getVipBatchPro: `vip-batch/products`,
  getVipBatchStatus: `dict/vip-batch-status`,
  getBathSetting: `dict/settings`,
  vipBatchProd: `vip-batch`,
  vipBatchCards: `vip-batch/cards`,
  paySell: `pay/sell`,
  dictStatus: `dict/sell-status`,
  getProductPay: `product-purchase/pay`,
  orderQueryStatus: `product-purchase/order-query`,
  getPriceType: `dict/price-type`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_URI"];
const {get, post, patch, put, delete: del} = ajax(prefix)();

class Production {
  getPriceType() {
    return get(`${url.getPriceType}`);
  }

  orderQueryStatus(purchaseNO) {
    return get(`${url.orderQueryStatus}`, {purchaseNO});
  }

  getProductPay(id) {
    return get(`${url.getProductPay}`, {id});
  }

  getProductsByUserId(uid) {
    return get(`${url.getProduct}`, {uid});
  }

  //$cardId = null, $beginDate = null, $endDate = null, $pageSize = 10, $curPage = 1
  dictStatus() {
    return get(`${url.dictStatus}`);
  }

  paySell({
            sellId,
            orgId,
            productId,
            uid,
            beginDate,
            endDate,
            type,
            curPage,
            pageSize,
          }) {
    return get(`${url.paySell}`, {
      sellId,
      orgId,
      productId,
      uid,
      beginDate,
      endDate,
      type,
      curPage,
      pageSize,
    });
  }

  vipBatchCards({
                  cardId = "",
                  beginDate = "",
                  endDate = "",
                  pageSize,
                  curPage,
                  id,
                }) {
    return get(`${url.vipBatchCards}`, {
      id,
      cardId,
      beginDate,
      endDate,
      pageSize,
      curPage,
    });
  }

  getVipQrCode(id) {
    return put(`${url.vipBatchProd}/${id}`);
  }

  vipBatchProd({productId, num, remark}) {
    return post(`${url.vipBatchProd}`, {productId, num, remark});
  }

  getBathSetting() {
    return get(`${url.getBathSetting}`);
  }

  getVipBatchStatus() {
    return get(`${url.getVipBatchStatus}`);
  }

  getVipBatchPro() {
    return get(`${url.getVipBatchPro}`);
  }

  getVipBatch({
                productId = "",
                orgId = "",
                uid = "",
                beginDate = "",
                endDate = "",
                pageSize,
                curPage,
              }) {
    return get(`${url.getVipBatch}`, {
      productId,
      orgId,
      uid,
      pageSize,
      curPage,
      beginDate,
      endDate,
    });
  }

  productPruStatus(id, status) {
    return get(`${url.productPruStatus}`, {id, status});
  }

  stockLogType() {
    return get(`${url.stockLogType}`);
  }

  productStockLog({
                    uid = "",
                    productId = "",
                    type = "",
                    curPage = 1,
                    pageSize = 10,
                    isFirst = 1,
                    beginDate = "",
                    endDate = "",
                  }) {
    return get(`${url.productStockLog}`, {
      uid,
      productId,
      type,
      curPage,
      pageSize,
      isFirst,
      beginDate,
      endDate,
    });
  }

  productStock({
                 productId = "",
                 identityId = "",
                 curPage = "",
                 pageSize = 10,
                 orgId = "",
                 uid = "",
                 beginAmount = "",
                 endAmount = "",
               }) {
    return get(`${url.productStock}`, {
      productId,
      identityId,
      orgId,
      curPage,
      pageSize,
      uid,
      beginAmount,
      endAmount,
    });
  }

  productRequest(date = "") {
    return get(`${url.productRequest}`, {date});
  }

  delProductPurchase(purchaseId) {
    return del(`${url.productPurchase}/${purchaseId}`);
  }

  postProductPurchase({
                        uid,
                        nickname,
                        username,
                        orgId,
                        orgName,
                        identityId,
                        identityName,
                        fromUid,
                        fromNick,
                        fromName,
                        productId,
                        productName,
                        amount,
                        priceId,
                        price = 0,
                        money,
                        fromOrgId,
                        fromOrgName,
                        fromIdentityId,
                        fromIdentityName,
                        fromAmount,
                        type,
                        remark,
                      }) {
    return post(`${url.productPurchase}`, {
      uid,
      nickname,
      username,
      orgId,
      orgName,
      identityId,
      identityName,
      fromUid,
      fromNick,
      fromName,
      productId,
      productName,
      amount,
      priceId,
      price,
      money,
      fromOrgId,
      fromOrgName,
      fromIdentityId,
      fromIdentityName,
      fromAmount,
      type,
      remark,
    });
  }

  putProductPurchase({
                       uid,
                       nickname,
                       username,
                       orgId,
                       orgName,
                       identityId,
                       identityName,
                       fromUid,
                       fromNick,
                       fromName,
                       productId,
                       productName,
                       amount,
                       priceId,
                       price = 0,
                       money,
                       fromOrgId,
                       fromOrgName,
                       fromIdentityId,
                       fromIdentityName,
                       fromAmount,
                       purchaseId,
                       type,
                       remark,
                     }) {
    return put(`${url.productPurchase}/${purchaseId}`, {
      uid,
      nickname,
      username,
      orgId,
      orgName,
      identityId,
      identityName,
      fromUid,
      fromNick,
      fromName,
      productId,
      productName,
      amount,
      priceId,
      price,
      money,
      fromOrgId,
      fromOrgName,
      fromIdentityId,
      fromIdentityName,
      fromAmount,
      type,
      remark,
    });
  }

  productPurchaseType() {
    return get(`${url.productPurchaseType}`);
  }

  productPurchaseStatus() {
    return get(`${url.productPurchaseStatus}`);
  }

  productPurchase({
                    curPage,
                    pageSize = 10,
                    purchaseId = "",
                    orgId = "",
                    uid = "",
                    productId = "",
                    status = "",
                    type = "",
                    beginDate = "",
                    endDate = "",
                  }) {
    return get(`${url.productPurchase}`, {
      curPage,
      pageSize,
      purchaseId,
      orgId,
      uid,
      curPage,
      productId,
      status,
      type,
      beginDate,
      endDate,
    });
  }

  getProduct(refresh = 0) {
    return get(`${url.getProduct}`, {refresh});
  }

  productPrice({productId, identityId, curPage, pageSize = 10}) {
    return get(`${url.productPrice}`, {
      productId,
      identityId,
      curPage,
      pageSize,
    });
  }

  postProductPrice({
                     productId,
                     identityId,
                     firstPurchasePrice,
                     secondPurchasePrice,
                     beginDate,
                     endDate,
                     firstProfitPrice, //首次经销分润
                     secondProfitPrice, //二次裂变分润
                     warningAmount,
                     firstWarningAmount,
                     secondWarningAmount,
                     type,
                   }) {
    return post(`${url.productPrice}`, {
      productId,
      identityId,
      firstPurchasePrice,
      secondPurchasePrice,
      beginDate,
      endDate,
      firstProfitPrice, //首次经销分润
      secondProfitPrice, //二次裂变分润
      warningAmount,
      firstWarningAmount,
      secondWarningAmount,
      type,
    });
  }

  delProductPrice(priceId) {
    return del(`${url.productPrice}/${priceId}`);
  }

  putProductPrice({
                    priceId,
                    productId,
                    identityId,
                    firstPurchasePrice,
                    secondPurchasePrice,
                    beginDate,
                    endDate,
                    firstProfitPrice, //首次经销分润
                    secondProfitPrice, //二次裂变分润
                    warningAmount,
                    firstWarningAmount,
                    secondWarningAmount,
                    type,
                  }) {
    return put(`${url.productPrice}/${priceId}`, {
      productId,
      identityId,
      firstPurchasePrice,
      secondPurchasePrice,
      beginDate,
      endDate,
      firstProfitPrice, //首次经销分润
      secondProfitPrice, //二次裂变分润
      warningAmount,
      firstWarningAmount,
      secondWarningAmount,
      type,
    });
  }
}

export default new Production();
