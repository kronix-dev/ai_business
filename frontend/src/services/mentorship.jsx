import API from "../controllers/api";

export class MentorshipService {
  static matchMentor(data) {
    return API.post("mentorship/findMentor", data);
  }
  static createProfile(data) {
    return API.post("mentorship/createProfile", data);
  }
  static editMentor(data) {
    return API.post("mentorship/editProfile", data);
  }
  static getProfile() {
    return API.get("mentorship/getProfile");
  }
  static acceptRequest(id, stat) {
    return API.post("mentorship/acceptRequest", { status: stat, match_id: id });
  }
  static getMentors() {
    return API.get("mentorship/myMentors");
  }
  static getMentees() {
    return API.get("mentorship/myMentees");
  }
  static requestMentorship(id) {
    return API.post("mentorship/requestMentorship", { mentor: id });
  }
}
