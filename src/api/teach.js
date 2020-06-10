const url = {
  courseList: `course/courses`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_CLASS"];
const { get, post, patch, put, delete: del } = ajax(prefix)();

class Teach {
  getCourseList(json) {
    return get(`${url.courseList}`, json);
  }
  getThemeList(json) {
    return get(`${url.courseList}`, json);
  }
  getProductList(json) {
    return get(`${url.courseList}`, json);
  }
}

export default new Teach();
