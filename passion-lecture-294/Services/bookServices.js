import apiClient from './api'

export default {
  getBooks() {
    return apiClient.get('/books')
  },
  getBook(id) {
    return apiClient.get(`/books/${id}`)
  },
  createBook(book) {
    return apiClient.post(`/books`, book)
  },
  deleteBook(id) {
    return apiClient.delete(`/books/${id}`)
  },
  editBook(id, book) {
    return apiClient.put(`/books/${id}`, book)
  },
  getBooks(user_id) {
    return apiClient.get(`users/${user_id}/books`)
  },
  getBook(user_id, id) {
    return apiClient.get(`users/${user_id}/books/${id}`)
  },
}
