import ajax from "./ajax";
import config from "@/config"

const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Resource {
  getResource(json) {
    return get("course/textbooks", json);
  }

  getResourceById(id) {
    return get(`course/textbooks/${id}`);
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

  delResource(id) {
    return del(`course/textbooks/${id}`);
  }
}

export default new Resource();
