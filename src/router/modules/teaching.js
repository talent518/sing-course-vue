const baseRouter = {
  title: "教研管理",
  path: "/resource",
  name: "Teaching",
  router:null,
  component: () => import('@/views/main'),
  meta: {
    icon: 'icon-file-copy'
  },
  children: [
    {
      title: "教材列表",
      path: "/resource",
      name: "Resource",
	  router:"Resource",
      component: () => import("@/views/resource/Resource"),
      meta: {},
    },
    {
      title: "课程管理",
      path: "/course",
      name: "Course",
	  router:"Course",
      component: () => import("@/views/teach/course/CourseManagement"),
      meta: {},
    },
    {
      title: "主題管理",
      path: "/theme",
      name: "Theme",
	  router:"Theme",
      component: () => import("@/views/teach/theme/ThemeManagement"),
      meta: {},
    },
    {
      title: "产品管理",
      path: "/product",
      name: "Product",
	    router:"Product",
      component: () => import("@/views/teach/product/ProductManagement"),
      meta: {},
    },
  ]
};
export default baseRouter