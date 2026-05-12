import apiClient from "./api"

export default {
    getBooks() {
        return apiClient.get('/books')
    },
    getBook(id){
        return apiClient.get(`/books/${id}`)
    },
    deleteBook(id) {
        return apiClient.delete(`/books/${id}`)
    },
    editBook(id, book) {
        return apiClient.put(`/books/${id}`, book)
    }
}