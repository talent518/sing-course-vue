import ajax from "./ajax";
import config from "@/config"

const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Resource {
  getResource(json) {
    return get("course/textbooks", json);
  }

  postResourceStatus(json) {
    return post(`course/textbooks/${json.id}/${json.status}`);
  }

  postResource(json) {
    return post("course/textbooks", json);
  }

  putResource(json) {
    return put(`course/textbooks/${json.id}`, json);
  }

  delResource(json) {
    return del(`course/textbooks/${json.id}`, json);
  }
}

export default new Resource();
