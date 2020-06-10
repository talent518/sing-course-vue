import Link1 from "@/views/test/Link1";
import Link2 from "@/views/test/Link2";
import RoleMenu from "@/views/RoleMenu";
import home from "@/views/Home.vue";

const authRouter = {
  path: "/index",
  name: "AppMain",
  component: () => import("@/views/main"),
  children: [
    {
      title: "教材管理",
      path: "/resource",
      name: "Resource",
      meta: {
        skipAuth: true,
      },
      children: [
        {
          title: "教材管理1",
          path: "/resource1",
          name: "Resource1",
          component: () => import("@/views/resource/Resource1"),
          meta: {
            skipAuth: true,
          },
        },
        {
          title: "教材管理2",
          path: "/resource2",
          name: "Resource2",
          component: () => import("@/views/resource/Resource2"),
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
      ],
    },

    {
      path: "/index",
      name: "home1",
      component: home,
      noAuth: true,
    },
    {
      path: "/ProfitReport",
      name: "ProfitReport",
      component: () => import("@/views/ProfitReport"),
    },
    {
      path: "/NaturalReport",
      name: "NaturalReport",
      component: () => import("@/views/NaturalReport"),
    },
    {
      path: "/OrderQuery",
      name: "OrderQuery",
      component: () => import("@/views/OrderQuery"),
    },
    {
      path: "/PaySell",
      name: "PaySell",
      component: () => import("@/views/PaySell"),
    },
    {
      path: "/VipBatch",
      name: "VipBatch",
      component: () => import("@/views/VipBatch"),
    },
    {
      path: "/DataDictManager",
      name: "DataDictManager",
      component: () => import("@/views/DataDictManager"),
    },
    {
      path: "/StockManager",
      name: "StockManager",
      component: () => import("@/views/StockManager"),
    },
    {
      path: "/PurchaseOrder",
      name: "PurchaseOrder",
      component: () => import("@/views/PurchaseOrder"),
    },
    {
      path: "/ProductPrice",
      name: "ProductPrice",
      component: () => import("@/views/ProductPrice"),
    },
    {
      path: "/productManager",
      name: "productManager",
      component: () => import("@/views/productManager"),
    },
    {
      path: "/provinceManager",
      name: "ProvinceManager",
      component: () => import("@/views/City"),
    },
    {
      path: "/identityManag",
      name: "identityManag",
      component: () => import("@/views/IdentityManag"),
    },
    {
      path: "/org",
      name: "orgManager",
      component: () => import("@/views/OrgManager"),
    },
    {
      path: "/sysMenu",
      name: "sysMenu",
      component: () => import("@/views/SysMenu"),
    },
    {
      path: "/menu",
      name: "menu",
      component: () => import("@/views/Menu"),
    },
    {
      path: "/userList",
      name: "userList",
      component: () => import("@/views/User"),
    },
    {
      path: "/Menu1/Link1",
      name: "Link1",
      component: Link1,
    },
    {
      path: "/Menu1/Link2",
      name: "Link2",
      component: RoleMenu,
    },
    {
      path: "/rolelist",
      name: "roleList",
      component: () => import("@/views/RoleList"),
    },
    {
      path: "/LogView",
      name: "LogView",
      component: () => import("@/views/LogView"),
    },
  ],
};
export default authRouter;
