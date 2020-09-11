const baseRouter = {
  title: "层级管理",
  path: "/resource",
  name: "Teaching",
  router: null,
  component: () => import('@/views/main'),
  meta: {
    icon: 'icon-file-copy'
  },
  children: [
    {
      title: "习题列表",
      path: "/exercises",
      name: "Exercises",
      router: "Exercises",
      component: () => import("@/views/basic/exercises/Exercises"),
      meta: {},
    },
    {
      title: "教材列表",
      path: "/resource",
      name: "Resource",
      router: "Resource",
      component: () => import("@/views/resource/Resource"),
      meta: {},
    },
    {
      title: "主題列表",
      path: "/theme",
      name: "Theme",
      router: "Theme",
      component: () => import("@/views/teach/theme/ThemeManagement"),
      meta: {},
    },
    {
      title: "课程列表",
      path: "/course",
      name: "Course",
      router: "Course",
      component: () => import("@/views/teach/course/CourseManagement"),
      meta: {},
    },
    {
      title: "产品列表",
      path: "/product",
      name: "Product",
      router: "Product",
      component: () => import("@/views/teach/product/ProductManagement"),
      meta: {},
    },
  ]
};
export default baseRouter
