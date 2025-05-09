import API from "../controllers/api";

export class MentorshipService{

    static matchMentor(data){
        return API.post('mentorship/findMentor', data)
    }
    static createProfile(data){
        return API.post('mentorship/createProfile',data)
    }
    static editMentor(data){
        return API.post('mentorship/editProfile',data)
    }
    static getProfile(){
        return API.get('mentorship/getProfile')
    }
}