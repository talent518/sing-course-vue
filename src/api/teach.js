const url = {
  //课程
  courseList: `course/courses`,
  musicCourseList: `course/course-musics`,
  artCourseList: `course/course-arts`,
  //主题
  themeList: `course/themes`,
  //产品
  productList: `course/products`,
  //教材
  textbookList: `course/textbooks`,
  //课程管理
  courseDetail: `course/course-details`,
  musicCourseDetail: `course/course-music-details`,
  artCourseDetail: `course/course-art-details`,
  //主题管理
  themeDetail: `course/theme-details`,
  //产品管理
  productDetail: `course/product-details`,
};
import ajax from "./ajax";
import config from "@/config";

const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Teach {
  //获取课程列表
  getCourseListApi(json) {
    return get(`${url.courseList}`, json);
  }
  getMusicCourseListApi(json) {
    return get(`${url.musicCourseList}`, json);
  }
  getArtCourseListApi(json) {
    return get(`${url.artCourseList}`, json);
  }

  //课程添加
  postCourseApi(json) {
    return post(`${url.courseList}`, json);
  }
  postMusicCourseApi(json) {
    return post(`${url.musicCourseList}`, json);
  }
  postArtCourseApi(json) {
    return post(`${url.artCourseList}`, json);
  }

  //课程修改
  putCourseAPi(json) {
    return put(`${url.courseList}/${json.id}`, json);
  }
  putMusicCourseAPi(json) {
    return put(`${url.musicCourseList}/${json.id}`, json);
  }
  putArtCourseAPi(json) {
    return put(`${url.artCourseList}/${json.id}`, json);
  }

  //课程删除
  delCourseApi(id) {
    return del(`${url.courseList}/${id}`);
  }
  delMusicCourseApi(id) {
    return del(`${url.musicCourseList}/${id}`);
  }
  delArtCourseApi(id) {
    return del(`${url.artCourseList}/${id}`);
  }

  //课程启用、禁用
  postCourseStatusApi(json) {
    return post(`${url.courseList}/${json.id}/${json.status}`, json);
  }
  postMusicCourseStatusApi(json) {
    return post(`${url.musicCourseList}/${json.id}/${json.status}`, json);
  }
  postArtCourseStatusApi(json) {
    return post(`${url.artCourseList}/${json.id}/${json.status}`, json);
  }

  //课程关联教材全部清除
  delAllCourseRelationTextbookApi(id) {
    return post(`${url.courseList}/${id}/textbook`);
  }
  delAllMusicCourseRelationTextbookApi(id) {
    return post(`${url.musicCourseList}/${id}/textbook`);
  }
  delAllArtCourseRelationTextbookApi(id) {
    return post(`${url.artCourseList}/${id}/textbook`);
  }

  //课程关联主题全部清除
  delAllCourseRelationThemeApi(id) {
    return post(`${url.courseList}/${id}/theme`);
  }
  delAllMusicCourseRelationThemeApi(id) {
    return post(`${url.musicCourseList}/${id}/theme`);
  }
  delAllArtCourseRelationThemeApi(id) {
    return post(`${url.artCourseList}/${id}/theme`);
  }

  //课程里的关联列表拖动排序
  patchCourseDetailSortApi(id, json) {
    return patch(`${url.courseList}/${id}/sort`, json);
  }
  patchMusicCourseDetailSortApi(id, json) {
    return patch(`${url.musicCourseList}/${id}/sort`, json);
  }
  patchArtCourseDetailSortApi(id, json) {
    return patch(`${url.artCourseList}/${id}/sort`, json);
  }

  //课程关联教材/主题
  postCourseDetailApi(json) {
    return post(`${url.courseDetail}`, json);
  }
  postMusicCourseDetailApi(json) {
    return post(`${url.musicCourseDetail}`, json);
  }
  postArtCourseDetailApi(json) {
    return post(`${url.artCourseDetail}`, json);
  }

  //课程管理单个移除
  delCourseDetailApi(id) {
    return del(`${url.courseDetail}/${id}`);
  }
  delMusicCourseDetailApi(id) {
    return del(`${url.musicCourseDetail}/${id}`);
  }
  delArtCourseDetailApi(id) {
    return del(`${url.artCourseDetail}/${id}`);
  }

  //获取课程已关联的教材/主题
  getCourseDetailRelationApi(json) {
    return get(`${url.courseDetail}`, json);
  }
  getMusicCourseDetailRelationApi(json) {
    return get(`${url.musicCourseDetail}`, json);
  }
  getArtCourseDetailRelationApi(json) {
    return get(`${url.artCourseDetail}`, json);
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

  //主题启用、禁用
  postThemeStatusApi(json) {
    return post(`${url.themeList}/${json.id}/${json.status}`, json);
  }

  //主题关联教材
  postThemeDetailApi(json) {
    return post(`${url.themeDetail}`, json);
  }

  //课程关联主题全部清除
  delAllThemeRelationTextbookApi(id) {
    return post(`${url.themeList}/${id}/theme`);
  }

  //主题管理单个移除
  delThemeDetailApi(id) {
    return del(`${url.themeDetail}/${id}`);
  }

  //获取主题已关联的教材
  getThemeDetailRelationApi(json) {
    return get(`${url.themeDetail}`, json);
  }

  //主题里的关联列表拖动排序
  patchThemeDetailSortApi(id, json) {
    return patch(`${url.themeList}/${id}/sort`, json);
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

  //产品启用、禁用
  postProductStatusApi(json) {
    return post(`${url.productList}/${json.id}/${json.status}`, json);
  }

  //产品关联教材
  postProductDetailApi(json) {
    return post(`${url.productDetail}`, json);
  }

  //产品关联课程全部清除
  delAllProductRelationCourseApi(id) {
    return post(`${url.productList}/${id}/product`);
  }

  //产品管理单个移除
  delProductDetailApi(id) {
    return del(`${url.productDetail}/${id}`);
  }

  //获取产品已关联的课程
  getProductDetailRelationApi(json) {
    return get(`${url.productDetail}`, json);
  }

  //产品里的关联列表拖动排序
  patchProductDetailSortApi(id, json) {
    return patch(`${url.productList}/${id}/sort`, json);
  }

  //获取教材列表
  getTextbookListApi(json) {
    return get(`${url.textbookList}`, json);
  }
}

export default new Teach();
