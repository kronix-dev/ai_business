import API from "../controllers/api";

export default class ForumService {
  static getTopics() {
    return API.get("forum/getTopics");
  }
  static createTopic(data) {
    return API.post("forum/createTopic", data);
  }
  static getComments(topicId) {
    return API.get(`forum/getComments/${topicId}`);
  }
  static getCategories() {
    return API.get("forum/getCategories");
  }
  static postComment(e) {
    return API.post("forum/postComment", e);
  }
}
