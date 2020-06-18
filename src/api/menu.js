const url = {
  getMenu: `menu`,
  dictMenus: `/dict/menus`,
  menuMove: `menu/move`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_URI"];
const { get, post, patch, put, delete: del } = ajax(prefix)();

class Menu {
  dictMenus() {
    return get(`${url.dictMenus}`);
  }

  getMenu() {
    return get(`${url.getMenu}`);
  }

  postMenuMove({ fromId, toId }) {
    return get(`${url.menuMove}`, { fromId, toId });
  }

  postMenu({ parentId, menuType, menuKey, menuName, menuLink, menuSort }) {
    return post(`${url.getMenu}`, {
      parentId,
      menuType,
      menuKey,
      menuName,
      menuLink,
      menuSort,
    });
  }

  putMenu({ menuType, menuKey, menuName, menuLink, menuId, menuSort }) {
    return put(`${url.getMenu}/${menuId}`, {
      menuType,
      menuKey,
      menuName,
      menuLink,
      menuSort,
    });
  }

  delMenu(menuId) {
    return del(`${url.getMenu}/${menuId}`);
  }
}

export default {};
