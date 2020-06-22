import ajax from "./ajax";
import config from "@/config"

const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Base {
  getEnum(json) {
    return get("config/enums", json);
  }

  getQiniu(json) {
    return get("config/qinius", json);
  }
}

export default new Base();
