const url = {
  //课程
  courseList: `course/courses`,
  //主题
  themeList: `course/themes`,
  //产品
  productList: `course/products`,
  //教材
  textbookList: `course/textbooks`,
  //课程管理
  courseDetail: `course/course-details`,
  //主题管理
  themeDetail: `course/theme-details`,
  //产品管理
  productDetail: `course/product-details`,
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
  delCourseApi(id) {
    return del(`${url.courseList}/${id}`);
  }
  //课程关联教材/主题
  postCourseDetailApi(json) {
    return post(`${url.courseDetail}`, json);
  }
  //课程管理中全部移除
  delAllCourseDetailApi(json) {
    return del(`${url.courseDetail}/${json.course_id}`, json);
  }
  //课程管理单个移除
  delCourseDetailApi(id) {
    return del(`${url.courseDetail}/${id}`);
  }
  //获取课程已关联的教材/主题
  getCourseDetailRelationApi(json) {
    return get(`${url.courseDetail}`, json);
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
  delThemeApi(id) {
    return del(`${url.themeList}/${id}`);
  }
  //主题关联教材
  postThemeDetailApi(json) {
    return post(`${url.themeDetail}`, json);
  }
  //主题管理中全部移除
  delAllThemeDetailApi(json) {
    return del(`${url.themeDetail}/${json.theme_id}`, json);
  }
  //主题管理单个移除
  delThemeDetailApi(id) {
    return del(`${url.themeDetail}/${id}`);
  }
  //获取主题已关联的教材
  getThemeDetailRelationApi(json) {
    return get(`${url.themeDetail}`, json);
  }
  //获取产品列表
  getProductListApi(json) {
    return get(`${url.productList}`, json);
  }
  //产品添加
  postProductApi(json) {
    return post(`${url.productList}`, json);
  }
  //产品修改
  putProductAPi(json) {
    return put(`${url.productList}/${json.id}`, json);
  }
  //产品删除
  delProductApi(id) {
    return del(`${url.productList}/${id}`);
  }
  //产品关联教材
  postProductDetailApi(json) {
    return post(`${url.productDetail}`, json);
  }
  //产品管理中全部移除
  delAllProductDetailApi(json) {
    return del(`${url.productDetail}/${json.product_id}`, json);
  }
  //产品管理单个移除
  delProductDetailApi(id) {
    return del(`${url.productDetail}/${id}`);
  }
  //获取产品已关联的课程
  getProductDetailRelationApi(json) {
    return get(`${url.productDetail}`, json);
  }
  //获取教材列表
  getTextbookListApi(json) {
    return get(`${url.textbookList}`,json);
  }
}

export default new Teach();
