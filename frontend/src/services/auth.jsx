import API from "../controllers/api";

export class AuthService {
  static login(usn, pwd) {
    return API.login(usn, pwd);
  }
  static forgotPassword() {}
  static signUp(data) {
    return API.post("auth/signup", data);
  }
  static changePassword(data) {
    return API.post("auth/changePassword", data);
  }
  static updateGroup(data) {
    return API.post("auth/updateRole", data);
  }
  static getUser() {
    console.log("Hey");
    return API.get("auth/user");
  }
  static logOut(){
    
    return null
  }
  static verifyEmail() {}
}
