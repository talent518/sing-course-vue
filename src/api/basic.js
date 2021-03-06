import ajax from "./ajax";
import config from "@/config";

const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Basic {
  getSegment(json) {
    return get("course/segment-templates", json);
  }

  postSegmentStatus(json) {
    return post(`course/segment-templates/${json.id}/${json.status}`);
  }

  postSegment(json) {
    return post(`course/segment-templates`, json);
  }

  putSegment(json) {
    return put(`course/segment-templates/${json.id}`, json);
  }

  delSegment(id) {
    return del(`course/segment-templates/${id}`);
  }

  getResource(json) {
    return get(`course/textbook-templates`, json);
  }

  getResourceById(id) {
    return get(`course/textbook-templates/${id}`);
  }

  putResource(json) {
    return put(`course/textbook-templates/${json.id}`, json);
  }

  delResource(id) {
    return del(`course/textbook-templates/${id}`);
  }

  postResourceStatus(json) {
    return post(`course/textbook-templates/${json.id}/${json.status}`);
  }

  postResource(json) {
    return post(`course/textbook-templates`, json);
  }

  getScore(json) {
    return get("config/score-configs", json);
  }

  getScoreAll(json) {
    return get("config/score-config/all-list", json);
  }

  postScore(json) {
    return post("config/score-configs", json);
  }

  putScore(json) {
    return put(`config/score-configs/${json.id}`, json);
  }

  delScore(id) {
    return post(`config/score-configs/${id}/disable`);
  }
}

export default new Basic();
