import apiClient from "./api"

export default {
    getCategories() {
        return apiClient.get('/categories')
    }
}