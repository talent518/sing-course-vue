const url = {
  //课程列表
  courseList: `course/courses`,
  //主题列表
  themeList: `course/themes`,
  //产品列表
  productList: `course/products`,
  //教材列表
  textbookList: `course/textbooks`,
  // themeList: `course/themes  `,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_CLASS"];
const { get, post, patch, put, delete: del } = ajax(prefix)();

class Teach {
  getCourseList(json) {
    return get(`${url.courseList}`, json);
  }
  getThemeList(json) {
    return get(`${url.themeList}`, json);
  }
  getProductList(json) {
    return get(`${url.productList}`, json);
  }
  getTextbookList() {
    return get(`${url.textbookList}`);
  }
  // getThemeList() {
  //   return get(`${url.themeList}`);
  // }
}

export default new Teach();
