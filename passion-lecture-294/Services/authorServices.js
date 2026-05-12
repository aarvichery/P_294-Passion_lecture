import apiClient from "./api"

export default {
    getAuthors() {
        return apiClient.get('/authors')
    },
    getAuthor(id) {
        return apiClient.get(`/authors/${id}`)
    },
    deleteAuthor(id) {
        return apiClient.delete(`/authors/${id}`)
    },
    editAuthor(id, author) {
        return apiClient.put(`/authors/${id}`, author)
    }
}