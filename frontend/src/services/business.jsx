import API from "../controllers/api";

export default class BusinessService{
    static createProfile(data){
        return API.post('base/addProfile', data)
    }
    static getProfile(){
        return API.get('base/getProfile')
    }
    static getIndustries(){
        return API.get('base/listIndustries')
    }
    
}