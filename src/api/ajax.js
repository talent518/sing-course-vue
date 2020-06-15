import axios from "axios";
import Vue from "vue";
import errcode from "@api/errcode";
import { getStorage } from "@util/storage";

const configUrlNoTip = [
  "user/retoken",
  "user/qr-code",
  "product-purchase/pay",
  "product-purchase/order-query",
  "dd-class/generate",
  `export/profit`,
  `export/natural`,
  `export/profit-log`,
  `export/order`,
];

//特殊的url 特殊处理
function special({ config }) {
  if (config.url.includes("vip-batch") && config.method === "put") {
    return true;
  }
  return false;
}

export default (baseURL) => {
  return () => {
    const service = axios.create({
      baseURL,
      transformRequest: [
        function (data) {
          let ret = "";
          for (let it in data) {
            if (data[it] == null) {
              data[it] = "";
            }
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        },
      ],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const methods = ["get", "post", "put", "delete", "patch"],
      o = {};
    service.interceptors.request.use(
      (config) => {
        config.headers.Authorization = getStorage("token");
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    service.interceptors.response.use(
      (res) => {
        let status = res.status;
        let data = res.data;
        let url = res.config.url;
        if (!String(status).startsWith("5")) {
          if (!errcode[data.code]) {
            if (data.message === "OK" && typeof data.data != "object") {
              if (!configUrlNoTip.includes(url)) {
                if (!special(res)) {
                  Vue.prototype.$message({
                    showClose: true,
                    message: data.data,
                    type: "success",
                  });
                }
              }
            }
            return data.data;
          } else {
            if (data.code === 401) {
              if (!document.location.href.includes("login")) {
                document.location.href = "/login";
              }
              return data;
            } else {
              let errmessage = "";
              if (data.data && typeof data.data === "object") {
                errmessage = Object.values(data.data)[0];
                if (Array.isArray(errmessage)) {
                  errmessage = errmessage[0];
                }
              } else {
                errmessage = data.data || data.message;
              }
              if (errmessage == null || errmessage == "") {
                errmessage = data.message;
              }
              Vue.prototype.$message({
                showClose: true,
                message: errmessage,
                type: "error",
              });
              return data.code;
            }
            if (data.code == 403) {
              return [];
            }
          }
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    //actives
    methods.forEach((item = {}) => {
      o[item] = (url, params = {}) => {
        if (item === "get") {
          return service[item](url, { params: { ...params } });
        } else {
          // debugger;
          return service[item](url, params);
        }
      };
    });
    return o;
  };
};
