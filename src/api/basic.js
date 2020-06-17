import ajax from "./ajax";

const {get, post, patch, put, delete: del} = ajax(process.env.VUE_APP_API)();

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

  getResource(json) {
    return get(`course/textbook-templates`, json);
  }

  putResource(json) {
    return put(`course/textbook-templates/${json.id}`, json);
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

  delScore(id) {
    return post(`config/score-configs/${id}/disable`);
  }
}

export default new Basic();
