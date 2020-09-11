const baseRouter = {
  title: "模板管理",
  path: "/basic",
  name: "Basic",
  router: null,
  component: () => import('@/views/main'),
  meta: {
    icon: 'icon-build'
  },
  children: [
    {
      title: "教材模板",
      path: "/templateResource",
      name: "TemplateResource",
      router: "TemplateResource",
      component: () => import("@/views/basic/resource/Resource"),
      meta: {},
    },
    {
      title: '环节模板',
      path: "/templateSegment",
      name: "TemplateSegment",
      router: "TemplateSegment",
      component: () => import("@/views/basic/segment/Segment"),
      meta: {},
    },
    {
      title: "评分标准",
      path: "/score",
      name: "Score",
      router: "Score",
      component: () => import("@/views/basic/score/Score"),
      meta: {},
    },
  ]
};
export default baseRouter
