import apiClient from "./api"
export default {
    login(credentials) {
        return apiClient.post('/users/login', credentials)
    },
    register(user) {
        return apiClient.post('/users/register', user)
    },
    logout() {
        return apiClient.post('/users/logout')
    }
}