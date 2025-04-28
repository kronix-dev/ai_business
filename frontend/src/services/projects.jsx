import API from "../controllers/api";

export default class ProjectsService{
    static getProjects(){
        return API.get('tanroads/getProjects')
    }
    static getBudgets(){
        return API.get('tanroads/getMailingList')
    }
    static getExpenses(){
        return API.get('budgeting/listExpenses')
    }
    static getRevenueCategories(){
        return API.get('budgeting/getRevenueCategories')
    }
    static getExpenseCategories(){
        return API.get('budgeting/getExpenseCategories')
    }
    static getBudgetCategories(){
        return API.get('budgeting/getBudgetCategories')
    }
    static createRevenue(data){
        return API.post('budgeting/addRevenue',data)
    }
    static createProject(data){
        return API.post('tanroads/createProject',data)
    }
    static createMailList(data){
        return API.post("tanroads/addMailList",data)
    }
}