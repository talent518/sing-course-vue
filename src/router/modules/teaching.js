const baseRouter = {
  title: "教研管理",
  path: "/resource",
  name: "Teaching",
  component: () => import('@/views/main'),
  meta: {
    skipAuth: true,
  },
  children: [
    {
      title: "教材列表",
      path: "/resource",
      name: "Resource",
      component: () => import("@/views/resource/Resource"),
      meta: {
        skipAuth: true,
      },
    },
    {
      title: "课程管理",
      path: "/course",
      name: "Course",
      component: () => import("@/views/teach/course/CourseManagement"),
      meta: {
        skipAuth: true,
      },
    },
    {
      title: "主題管理",
      path: "/theme",
      name: "Theme",
      component: () => import("@/views/teach/theme/ThemeManagement"),
      meta: {
        skipAuth: true,
      },
    },
    {
      title: "产品管理",
      path: "/product",
      name: "Product",
      component: () => import("@/views/teach/product/ProductManagement"),
      meta: {
        skipAuth: true,
      },
    },
  ]
};
export default baseRouter