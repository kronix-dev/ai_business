import API from "../controllers/api";

export default class Budgeting{
    static getRevenues(){
        return API.get('budgeting/listRevenues')
    }
    static getBudgets(){
        return API.get('budgeting/listBudgets')
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
    static createExpenditure(data){
        return API.post('budgeting/addExpenditure',data)
    }
    static createBudget(data){
        return API.post('budgeting/addBudget',data)
    }
}