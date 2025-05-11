import API from "../../controllers/api";

export default class modalNameAPI {
  static listmodelName() {
    return API.get("apiPrefixmodelName/list").catch((e) => {});
  }
  static createmodelName(data){
    return API.post("apiPrefixmodelName/create",data).catch((e) => {});
  }
  static deletemodelName(data){
    return API.post("apiPrefixmodelName/delete",data).catch((e) => {});
  }
  static updatemodelName(data){
    return API.post("apiPrefixmodelName/delete",data).catch((e) => {});
  }

}
