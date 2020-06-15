import ajax from "./ajax";

const { get, post, patch, put, delete: del } = ajax(process.env.VUE_APP_API)();

class Resource {
  getResource(json) {
    return get("course/textbooks", json);
  }
}

export default new Resource();
