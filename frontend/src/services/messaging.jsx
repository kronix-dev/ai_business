import API from "../controllers/api";

export default class MessagingService {
  static getMessages(user) {
    return API.get("messaging/getMessages/" + user);
  }
  static sendMessage(message) {
    return API.post("messaging/sendMessage", message);
  }
}
