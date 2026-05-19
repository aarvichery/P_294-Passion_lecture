import apiClient from './api'

export default {
  getAuthors() {
    const authors = apiClient.get('/authors')
    console.log(authors)
    return authors
  },
  getAuthor(id) {
    return apiClient.get(`/authors/${id}`)
  },
  createBook(author) {
    return apiClient.post(`/authors`, author)
  },
  addAuthor(authorData) {
    return apiClient.post(`/authors`, authorData)
  },
  deleteAuthor(id) {
    return apiClient.delete(`/authors/${id}`)
  },
  editAuthor(id, author) {
    return apiClient.put(`/authors/${id}`, author)
  },
}
