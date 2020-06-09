const getters = {
  menu(state) {
    return state.menu;
  },
  auths(state) {
    return state.auths;
  },
  buttons(state) {
    return state.buttons;
  },
  name(state) {
    return state.name;
  },
  operateMenuData(state) {
    return state.operateMenu;
  },
  allMenu(state) {
    return state.allMenu;
  },
  allAuths(state) {
    return state.allAuths;
  },
  allButtons(state) {
    return state.allButtons;
  },
  allButtonKey(state) {
    return state.allButtons.map((item) => item.menuKey);
  },
};
export default getters;
