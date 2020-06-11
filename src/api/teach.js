const url = {
  //课程
  courseList: `course/courses`,
  //主题
  themeList: `course/themes`,
  //产品
  productList: `course/products`,
  //教材
  textbookList: `course/textbooks`,
  // themeList: `course/themes  `,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_CLASS"];
const { get, post, patch, put, delete: del } = ajax(prefix)();

class Teach {
  //获取课程列表
  getCourseListApi(json) {
    return get(`${url.courseList}`, json);
  }
  //课程添加
  postCourseApi(json) {
    return post(`${url.courseList}`, json);
  }
  //课程修改
  putCourseAPi(json) {
    return put(`${url.courseList}/${json.id}`, json);
  }
  //课程删除
  delCourseApi(json) {
    return del(`${url.courseList}/${json.id}`);
  }
  //获取主题列表
  getThemeListApi(json) {
    return get(`${url.themeList}`, json);
  }
  //主题添加
  postThemeApi(json) {
    return post(`${url.themeList}`, json);
  }
  //主题修改
  putThemeAPi(json) {
    return put(`${url.themeList}/${json.id}`, json);
  }
  //主题删除
  delThemeeApi(json) {
    return del(`${url.themeList}/${json.id}`);
  }
  //获取产品列表
  getProductListApi(json) {
    return get(`${url.productList}`, json);
  }
  //获取教材列表
  getTextbookListApi() {
    return get(`${url.textbookList}`);
  }
  // getThemeList() {
  //   return get(`${url.themeList}`);
  // }
}

export default new Teach();
