<template>
  <div v-if="book">
    <h1>{{ book.title }}</h1>
    <p v-for="author in authors" v-show="book.authorId == author.id">
      Auteur : {{ author.firstname }}
    </p>
    <p>Editeur : {{ book.editeur }}</p>
    <p>Catégorie : {{ book.categorieId }}</p>
    <p>Nb pages : {{ book.nbPage }}</p>
    <p>Note :</p>
    <a>Lien pdf : {{ book.link }}</a>
    <p>Résumé : {{ book.resume }}</p>
  </div>
  <div v-else>
    <h1>Error</h1>
  </div>
</template>

<script>
export default {
  props: ['id', 'authorId'], // ← ici tu reçois l'id
  data() {
    return {
      book: null,
      authors: [],
    }
  },
  mounted() {
    ;(this.loadBooks(),
      this.loadCategories(),
      this.loadAuthors(),
      this.getAuthorById(this.authorid))
    fetch(`http://localhost:3000/books/${this.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.book = data
      })
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
    async loadAuthors() {
      const response = await fetch('http://localhost:3000/authors')
      const data = await response.json()
      this.authors = data
    },
    async getAuthorById(authorid) {},
  },
}
</script>

<style scoped></style>
