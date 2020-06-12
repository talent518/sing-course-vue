import menu from "@api/menu";
import user from "@api/user";
import router from "@/router/router";

const menuState = {
  0: "菜单",
  1: "链接",
  2: "按钮",
};

const actions = {
  async getMenu({ commit }) {
    let data = await user.getUserMenu();
    const menuslist = getMenus(data, true);
    const buttons = getButtons(data);
    const menuD = getTreeList([...menuslist]);
    const auths = menuslist.map((item) => item.menuKey);
    router.children = formatList(router.children, auths);
    commit("set_menu", menuD);
    commit("set_auths", auths);
    commit("set_buttons", buttons);
    commit("set_permission", true);
    return [router];
  },
  async getAllMenu({ commit }) {
    let data = await menu.getMenu();
    data = data.map((item) => {
      item.isShow = true;
      return item;
    });
    const menuslist = getMenus(data, true);
    const buttons = getButtons(data);
    const menuD = getTreeList(data);
    const auths = menuslist.map((item) => item.menuKey);
    router.children = formatList(router.children, auths);
    commit("set_all_menu", menuD);
    commit("set_all_auths", auths);
    commit("set_all_buttons", buttons);
    return [router];
  },
  async getAllMenu1({ commit }) {},
};
const formatList = (authRoutes, auths) => {
  let _authRoutes = [];

  authRoutes.forEach((val1) => {
    if (
      val1.meta &&
      val1.meta.skipAuth &&
      val1.children &&
      val1.children.length
    ) {
      val1.children.forEach((val2) => {
        val2.noAuth = true;
        _authRoutes.push(val2);
      });
    } else {
      _authRoutes.push(val1);
    }
  });

  return _authRoutes.filter((route) => {
    if (route.noAuth) {
      return true;
    }
    if (auths.includes(route.name)) {
      if (route.children) {
        route.children = formatList(route.children, auths);
      }
      return true;
    }
  });
};

function getMenus(menus, state = true) {
  return menus.filter((item) => {
    if (item.menuType !== 2) {
      return true;
    }
  });
}

function getButtons(menus) {
  return menus.filter((item) => {
    item.isEdit = false;
    if (item.menuType === 2) {
      return true;
    }
  });
}

const getTreeList = (menuList, parentId = 0, menu = []) => {
  menuList.forEach((item) => {
    if (item.parentId === parentId) {
      item.type = menuState[item.menuType];
      menu.push(item);
      item.children = [];
      return getTreeList(menuList, item.menuId, item.children);
    }
  });

  /*router.children.forEach(val => {
    if (val.meta && val.meta.skipAuth) {
      menu.push(val)
    }
  })*/

  if (!parentId) {
    routerSkipAuth(router.children, menu);
  }

  // console.log('menu', menu);
  return menu;
};

const routerSkipAuth = (list, menu) => {
  list.forEach((val) => {
    if (val.meta && val.meta.skipAuth) {
      if (val.children && val.children.length) {
        routerSkipAuth(val.children);
      } else {
        val.children = [];
      }

      val.menuKey = val.name;
      val.menuName = val.title;

      if (menu) {
        menu.push(val);
      }
    }
  });
};

export default actions;
