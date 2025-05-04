import API from "../controllers/api";

export default class ProjectsService{
    static getProjects(){
        return API.get('tanroads/getProjects')
    }
    static getMailList(){
        return API.get('tanroads/getMailingList')
    }
    static createProject(data){
        return API.post('tanroads/createProject',data)
    }
    static createMailList(data){
        return API.post("tanroads/addMailList",data)
    }
}