import apiClient from "./api"

export default {
    getCategories() {
        return apiClient.get('/categories')
    },
    getCategory(id) {
        return apiClient.get(`/categories/${id}`)
    }
}