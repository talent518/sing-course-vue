import ajax from "./ajax";

const { get, post, patch, put, delete: del } = ajax(process.env.VUE_APP_API)();

class Base {
  getEnum(json) {
    return get("config/enums", json);
  }

  uploadFile() {
    return get("config/enums", json);
  }
}

export default new Base();
