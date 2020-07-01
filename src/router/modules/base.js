const baseRouter = {
  title: "基础配置",
  path: "/basic",
  name: "Basic",
  router:null,
  component: () => import('@/views/main'),
  meta: {
    icon: 'icon-build'
  },
  children: [
    {
      title: '环节管理',
      path: "/templateSegment",
      name: "TemplateSegment",
	   router:"TemplateSegment",
      component: () => import("@/views/basic/segment/Segment"),
      meta: {},
    },
    {
      title: "教材模板",
      path: "/templateResource",
      name: "TemplateResource",
	   router:"TemplateResource",
      component: () => import("@/views/basic/resource/Resource"),
      meta: {},
    },
    {
      title: "习题列表",
      path: "/exercises",
      name: "Exercises",
	   router:"Exercises",
      component: () => import("@/views/basic/exercises/Exercises"),
      meta: {},
    },
    {
      title: "评分标准",
      path: "/score",
      name: "Score",
	   router:"Score",
      component: () => import("@/views/basic/score/Score"),
      meta: {},
    },
  ]
};
export default baseRouter