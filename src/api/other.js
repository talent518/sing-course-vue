const url = {
  getProvince: `province`,
  getBank: `dict/bank-type`,
  getOrg: `org`,
  getOrgs: `dict/orgs`,
  qrCode: `user/qr-code`,
  identity: `identity`,
  identityAuth: `identity`,
  viewAuth: `dict/view-auth`,
  editAuth: `dict/edit-auth`,
  dictProvince: `/dict/provinces`,
  apiProvince: `/province`,
  dictRoles: `dict/roles`,
  dataAuth: `dict/data-auth`,
  getDClass: `dd-class`,
  getDdProperty: `/dd-property`,
  getDataTypes: `dd-class/data-types`,
  getDDCLassGenerate: `dd-class/generate`,
  getLog: `log`,
  getLogStatus: `log/stats`,
};
import ajax from "./ajax";
import config from "@/config";

const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Other {
  getLogStatus() {
    return get(`${url.getLogStatus}`);
  }

  getLog({ method, api, ymd, curPage, uid }) {
    return get(`${url.getLog}`, { method, api, ymd, curPage, uid });
  }

  getDDCLassGenerate(id) {
    return get(`${url.getDDCLassGenerate}`, { id });
  }

  getDataTypes() {
    return get(`${url.getDataTypes}`);
  }

  getDdProperty(id) {
    return get(`${url.getDdProperty}`, { id });
  }

  addDdProperty({ id, propValue, propName, t, translate, comment = "" }) {
    return post(`${url.getDdProperty}`, {
      id,
      propValue,
      propName,
      t,
      translate,
      comment,
    });
  }

  putDdProperty({ id, propValue, propName, t, translate, comment = "" }) {
    return put(`${url.getDdProperty}/${id}`, {
      propValue,
      propName,
      t,
      translate,
      comment,
    });
  }

  delDdProperty(id) {
    return del(`${url.getDdProperty}/${id}`);
  }

  getDClass() {
    return get(`${url.getDClass}`);
  }

  postDClass({
    fromId,
    dataType,
    pattern,
    isUnique,
    className,
    classTitle,
    comment,
  }) {
    return post(`${url.getDClass}`, {
      fromId,
      dataType,
      pattern,
      isUnique,
      className,
      classTitle,
      comment,
    });
  }

  delDClass(id) {
    return del(`${url.getDClass}/${id}`);
  }

  putDClass({
    classId,
    dataType,
    pattern,
    isUnique,
    className,
    classTitle,
    comment,
  }) {
    return put(`${url.getDClass}/${classId}`, {
      dataType,
      pattern,
      isUnique,
      className,
      classTitle,
      comment,
    });
  }

  getOrgs() {
    return get(`${url.getOrgs}`, { isView: 1 });
  }

  getOrgsArgus(isView = 0) {
    return get(`${url.getOrgs}`, { isView });
  }

  dataAuth() {
    // {view:true,edit:true}
    return get(`${url.dataAuth}`);
  }

  dictRoles() {
    return get(`${url.dictRoles}`);
  }

  dictProvince() {
    return get(`${url.dictProvince}`);
  }

  getAllProvince({ province = "", city = "" }) {
    return get(`${url.apiProvince}`, { province, city });
  }

  delProvince(provId) {
    return del(`${url.apiProvince}/${provId}`);
  }

  postProvince({ parentId, provName }) {
    return post(`${url.apiProvince}`, { parentId, provName });
  }

  putProvince({ provId, provName }) {
    return put(`${url.apiProvince}/${provId}`);
  }

  viewAuth() {
    return get(`${url.viewAuth}`);
  }

  editAuth() {
    return get(`${url.editAuth}`);
  }

  getIdentityAuth({ id, identitys, viewAuth, editAuth }) {
    return patch(`${url.identityAuth}/${id}/auth`, {
      identitys,
      viewAuth,
      editAuth,
    });
  }

  getIdentity(name = "") {
    return get(`${url.identity}`, { name });
  }

  postIdentity({ enabled, name, remark, roles }) {
    return post(`${url.identity}`, { enabled, name, remark, roles });
  }

  delIdentity(id) {
    return del(`${url.identity}/${id}`);
  }

  putIdentity({ id, enabled, name, remark, roles }) {
    return put(`${url.identity}/${id}`, { enabled, name, remark, roles });
  }

  qrCode() {
    return get(`${url.qrCode}`);
  }

  getOrg({ orgName = "", province = "", city = "" }) {
    if (city == 0) {
      city = "";
    }
    return get(`${url.getOrg}`, { orgName, province, city });
  }

  delOrg(orgId) {
    return del(`${url.getOrg}/${orgId}`);
  }

  postOrg({ orgName, parentId, province, city = "", orgSort, enabled }) {
    if (city == 0) {
      city = "";
    }
    return post(`${url.getOrg}`, {
      orgName,
      parentId,
      province,
      city,
      orgSort,
      enabled,
    });
  }

  putOrg({ orgName, orgId, parentId, province, city = "", orgSort, enabled }) {
    if (city == 0) {
      city = "";
    }
    return put(`${url.getOrg}/${orgId}`, {
      orgName,
      parentId,
      province,
      city,
      orgSort,
      enabled,
    });
  }

  getBank() {
    return get(`${url.getBank}`);
  }

  getProvince() {
    return get(`${url.getProvince}`);
  }

  postProvince({ parentId, provName, provSort }) {
    return post(`${url.getProvince}`, {
      parentId,
      provName,
      provSort,
    });
  }

  putProvince({ provId, provName, provSort }) {
    return put(`${url.getProvince}/${provId}`, {
      provName,
      provSort,
    });
  }

  delMenu(provId) {
    return del(`${url.getProvince}/${provId}`);
  }
}

export default new Other();
