const url = {
  userLogin: `user/login`,
  userRetoken: "user/retoken",
  getUser: "user", //get是查询
  postUser: "user", //post是创建
  getUserMenu: "user/menu",
  getRole: "role",
  getUserAuth: "user/auth",
  getIdentitys: "dict/identitys",
  getsuperiors: "user/superiors",
  getuserView: `user/view`,
  getUserIdentitys: `user/identitys`,
  getSelectUsers: `dict/users`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_URI"];
const {get, post, patch, put, delete: del} = ajax(prefix)();
import {getStorage, setStorage} from "@util/storage";

class User {
  getSelectUsers(name) {
    return get(`${url.getSelectUsers}`, {name});
  }

  getUserIdentitys() {
    return get(`${url.getUserIdentitys}`);
  }

  getsuperiors() {
    return get(`${url.getsuperiors}`);
  }

  getCurrentUser() {
    return get(`${url.getuserView}`);
  }

  getUserById(uid) {
    return del(`${url.getUser}/${uid}`);
  }

  getIdentitys() {
    //没有权限的身份
    return get(`${url.getIdentitys}`);
  }

  getUserAuth(id) {
    return get(`${url.getUserAuth}`, {uid: id});
  }

  getRole(roleName = "") {
    return get(`${url.getRole}`, {roleName});
  }

  // getRoleByName(roleName = "") {
  //   return get(`${url.getRole}`, { roleName });
  // }
  delRole(roleId) {
    return del(`${url.getRole}/${roleId}`);
  }

  postRole({roleName, menuIds, remark}) {
    return post(`${url.getRole}`, {roleName, menuIds, remark});
  }

  putRole({roleId, roleName, menuIds, remark}) {
    return put(`${url.getRole}/${roleId}`, {roleName, menuIds, remark});
  }

  getUserMenu() {
    return get(`${url.getUserMenu}`);
  }

  userLogin({username = "admin", password = "admin8"}) {
    return post(`${url.userLogin}`, {username, password});
  }

  getUser() {
    return get(`${url.getUser}`);
  }

  delUser(uid) {
    return del(`${url.getUser}/${uid}`);
  }

  postUser({
             nickname,
             username,
             password,
             mobile = "",
             orgId,
             isManager,
             bankCard = "",
             bankType = "",
             identityId,
             superior = "",
             bankBranch = "",
             enabled = 1,
             wxAppId = "",
             wxMchId = "",
             wxKey = "",
             wxAppSecret = "",
           }) {
    return post(`${url.getUser}`, {
      nickname,
      username,
      password,
      mobile,
      orgId,
      isManager,
      bankCard,
      bankType,
      identityId,
      superior,
      bankBranch,
      enabled,
      wxAppId,
      wxMchId,
      wxKey,
      wxAppSecret,
    });
  }

  putUser({
            nickname,
            username,
            mobile = "",
            orgId,
            isManager,
            bankCard = "",
            bankType = "",
            identityId,
            superior = "",
            bankBranch = "",
            enabled = 1,
            uid,
            wxAppId = "",
            wxMchId = "",
            wxKey = "",
            wxAppSecret = "",
          }) {
    return put(`${url.getUser}/${uid}`, {
      nickname,
      username,
      mobile,
      orgId,
      isManager,
      bankCard,
      bankType,
      identityId,
      superior,
      bankBranch,
      enabled,
      wxAppId,
      wxMchId,
      wxKey,
      wxAppSecret,
    });
  }

  putPassWord({uid, password}) {
    return put(`${url.getUser}/${uid}`, {password});
  }

  userList({
             nickname = "",
             username = "",
             mobile = "",
             orgId = "",
             curPage,
             pageSize = 10,
           }) {
    return get(`${url.getUser}`, {
      nickname,
      username,
      mobile,
      orgId,
      all: 1,
      curPage,
      pageSize,
    });
  }

  async userRetoken() {
    let token = getStorage("token");
    let data = await get(`${url.userRetoken}`);
    if (data.code !== 401) {
      setStorage("token", data);
      return true;
    }
    return false;
  }
}

export default new User();
