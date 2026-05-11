import apiClient from "./api"

export default {
    getUsers() {
        return apiClient.get('/users')
    }
}