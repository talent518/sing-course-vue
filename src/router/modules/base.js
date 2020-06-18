const baseRouter = {
    title: "基础配置",
    path: "/basic",
    name: "Basic",
    component: () => import('@/views/main'),
    meta: {
        skipAuth: true,
    },
    children: [
        {
            title: '环节管理',
            path: "/templateSegment",
            name: "TemplateSegment",
            component: () => import("@/views/basic/segment/Segment"),
            meta: {
                skipAuth: true,
            },
        },
        {
            title: "教材模板",
            path: "/templateResource",
            name: "TemplateResource",
            component: () => import("@/views/basic/resource/Resource"),
            meta: {
                skipAuth: true,
            },
        },
        {
            title: "习题列表",
            path: "/exercises",
            name: "Exercises",
            component: () => import("@/views/basic/exercises/Exercises"),
            meta: {
                skipAuth: true,
            },
        },
        {
            title: "评分标准",
            path: "/score",
            name: "Score",
            component: () => import("@/views/basic/score/Score"),
            meta: {
                skipAuth: true,
            },
        },
    ]
};
export default baseRouter