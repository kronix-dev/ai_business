import API from "../controllers/api";

export default class ForumService{
    static getRevenues(){
        return API.get('forum/listRevenues')
    }
    static getBudgets(){
        return API.get('forum/listBudgets')
    }
    static getExpenses(){
        return API.get('forum/listExpenses')
    }
    static getRevenueCategories(){
        return API.get('forum/getRevenueCategories')
    }
    static getExpenseCategories(){
        return API.get('forum/getExpenseCategories')
    }
    static getBudgetCategories(){
        return API.get('forum/getBudgetCategories')
    }
    static createRevenue(data){
        return API.post('forum/addRevenue',data)
    }
    static createExpenditure(data){
        return API.post('forum/addExpenditure',data)
    }
    static createBudget(data){
        return API.post('forum/addBudget',data)
    }
}