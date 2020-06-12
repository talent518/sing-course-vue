import ajax from "./ajax";

const {get, post, patch, put, delete: del} = ajax(process.env.VUE_APP_API)();

class Basic {
  getSegment(json) {
    return get('course/segment-templates', json);
  }

  postSegmentStatus(json) {
    return post(`course/segment-templates/${json.id}/${json.status}`);
  }

  // 添加
  postSegment(json) {
    return post(`course/segment-templates/${json.id}/${json.status}`);
  }

  // 修改
  putSegment(json) {
    return put(`course/segment-templates/${json.id}`, json);
  }

  getScore(json) {
    return get('config/score-configs', json);
  }

  postScore(json) {
    return post('config/score-configs', json)
  }

  delScore(id) {
    return post(`config/score-configs/${id}/disable`)
  }
}

export default new Basic();
