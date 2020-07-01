import Vue from "vue";
import store from "@/store";

function isAllowed(permission, user, permissions) {
  if (user.admin) {
    return true;
  }
  if (typeof permission === "string") {
    return permissions.includes(permission);
  }
  if (permission instanceof Array) {
    return permission.some((auth) => permissions.indexOf(auth) >= 0);
  }
  return false;
}

Vue.directive("permission", {
  inserted(el, binding, vnode) {
    let buttons = vnode.context.$store.state.permission.permissions;
    let keys = buttons.map((button) => button.menuKey);
    if (!keys.includes(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
  updated() {
  },
});

export default Vue.directive("permission");
