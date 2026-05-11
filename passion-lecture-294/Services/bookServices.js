import apiClient from "./api"

export default {
    getBooks() {
        return apiClient.get('/books')
    }
}