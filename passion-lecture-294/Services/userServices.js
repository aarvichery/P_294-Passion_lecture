import apiClient from "./api"

export default {
    getUsers() {
        return apiClient.get('/users')
    },
    getUser(id) {
        return apiClient.get(`/users/${id}`)    
    }
    

}