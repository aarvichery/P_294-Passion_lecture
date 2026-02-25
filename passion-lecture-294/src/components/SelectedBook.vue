<template></template>
<script>
export default {
  data() {
    return {
      books: [],
      categories: [],
    }
  },
  mounted() {
    ;(this.loadBooks(), this.loadCategories())
  },
  methods: {
    async loadBooks() {
      const response = await fetch('http://localhost:3000/books')
      const data = await response.json()
      this.books = data // Stocke les données dans data()
    },
    async loadCategories() {
      const response = await fetch('http://localhost:3000/categories')
      const data = await response.json()
      this.categories = data
    },
  },
}
</script>
