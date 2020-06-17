import ajax from "./ajax";

const {get, post, patch, put, delete: del} = ajax(process.env.VUE_APP_API)();

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
