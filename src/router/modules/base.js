const baseRouter = {
  title: "基础配置",
  path: "/basic",
  name: "Basic",
  component: () => import('@/views/main'),
  meta: {
    icon: 'icon-build'
  },
  children: [
    {
      title: '环节管理',
      path: "/templateSegment",
      name: "TemplateSegment",
      component: () => import("@/views/basic/segment/Segment"),
      meta: {},
    },
    {
      title: "教材模板",
      path: "/templateResource",
      name: "TemplateResource",
      component: () => import("@/views/basic/resource/Resource"),
      meta: {},
    },
    {
      title: "习题列表",
      path: "/exercises",
      name: "Exercises",
      component: () => import("@/views/basic/exercises/Exercises"),
      meta: {},
    },
    {
      title: "评分标准",
      path: "/score",
      name: "Score",
      component: () => import("@/views/basic/score/Score"),
      meta: {},
    },
  ]
};
export default baseRouter