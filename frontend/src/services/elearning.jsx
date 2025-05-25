import API from "../controllers/api";

export default class ElearningService{
    static createMaterial(mat){
        return API.post('elearning/materials/create',mat)
    }
    static readMaterials(){
        return API.get('elearning/materials/list')
    }
    static getMaterials(){
        return API.get("elearning/materials/listMine")
    }
}