import API from "../controllers/api";

export default class ForumService{
    static getTopics(){
        return API.get('forum/getTopics')
    }
    static createTopic(data){
        return API.post('forum/listTopics',data)
    }
    static getComments(topicId){
        return API.get(`forum/listComments/${topicId}`)
    }
}