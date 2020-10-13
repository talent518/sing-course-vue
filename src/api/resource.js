import ajax from "./ajax";
import config from "@/config";

const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Resource {
  getResource(json) {
    return get("course/textbooks", json);
  }

  getQrcodeById(id) {
    return get(`course/textbooks/${id}/qrcode`);
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
  getProduceTool(product_id) {
    return get(`course/products/${product_id}/tool`);
  }
  postProduceTool(product_id, json) {
    return patch(`course/products/${product_id}/tool`, json);
  }
}

export default new Resource();
