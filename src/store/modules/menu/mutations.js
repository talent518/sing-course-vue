const mutations = {
  set_menu(state, menu) {
    state.menu = menu;
  },
  set_auths(state, auths) {
    state.auths = auths;
  },
  set_buttons(state, buttons) {
    state.buttons = buttons;
  },
  set_menu_name(state, name) {
    state.name = name;
  },
  set_permission(state) {
    state.hasPermission = true;
  },
  set_operateMenu(state, operateMenu) {
    state.operateMenu = operateMenu;
  },
  set_all_menu(state, allMenu) {
    state.allMenu = allMenu;
  },
  set_all_auths(state, allAuths) {
    state.allAuths = allAuths;
  },
  set_all_buttons(state, allButtons) {
    state.allButtons = allButtons;
  },
};
export default mutations;
