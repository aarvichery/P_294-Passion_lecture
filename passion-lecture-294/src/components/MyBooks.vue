<template>
  <nav>
    <ul>
      <li class="search-item">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher un titre..."
          class="search-input"
        />
      </li>

      <li v-for="categorie in categories" :key="categorie.id">
        <a @click="categorieid = categorie.id" :class="{ active: categorieid == categorie.id }">
          {{ categorie.name }}
        </a>
      </li>
    </ul>
  </nav>

  <h1>Voici tous les livres</h1>

  <div class="livres">
    <div class="livre" v-for="book in filteredBooks" :key="book.id" v-show="book.userId == 1">
      <RouterLink :to="`/book/${book.id}`">
        <img :src="book.image" />
        <div class="infos">
          <a class="book-title">{{ book.title }}</a>

          <a v-for="author in authors" :key="author.id" v-show="book.authorId == author.id">
            {{ author.firstName }} {{ author.lastName }}
          </a>

          <a class="user-tag" v-for="user in users" v-show="user.id == book.userId"
            >@{{ user.pseudo }}</a
          >
        </div>
      </RouterLink>
    </div>

    <p v-if="filteredBooks.length === 0" style="color: #4b5fa9">Aucun livre trouvé.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      categories: [],
      authors: [],
      users: [],
      categorieid: 0,
      searchQuery: '',
    }
  },
  computed: {
    filteredBooks() {
      const query = this.searchQuery.toLowerCase()

      return this.books.filter((book) => {
        const matchSearch = book.title.toLowerCase().includes(query)
        const matchCategory = this.categorieid === 0 || book.categorieId === this.categorieid
        return matchSearch && matchCategory
      })
    },
  },
  mounted() {
    this.loadBooks()
    this.loadCategories()
    this.loadAuthors()
    this.loadUsers()
  },
  methods: {
    async loadBooks() {
      const response = await fetch('http://localhost:3000/books')
      this.books = await response.json()
    },
    async loadCategories() {
      const response = await fetch('http://localhost:3000/categories')
      this.categories = await response.json()
    },
    async loadAuthors() {
      const response = await fetch('http://localhost:3000/authors')
      this.authors = await response.json()
    },
    async loadUsers() {
      const response = await fetch('http://localhost:3000/users')
      this.users = await response.json()
    },
  },
}
</script>

<style scoped>
/* On nettoie la nav pour que tout soit aligné horizontalement */
nav {
  background-color: #4b5fa9;
  padding: 15px;
  border-top: 2px solid white;
}

nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.search-input {
  padding: 8px 15px;
  border-radius: 20px;
  border: none;
  outline: none;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

nav a.active {
  text-decoration: underline;
  color: #000000; /* Une couleur différente pour bien voir la catégorie active */
}

.livres {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
}

.livre {
  width: 200px;
  background-color: #4b5fa9;
  border-radius: 12px;
  text-align: center;
  transition: 0.2s;
}

.livre:hover {
  transform: translateY(-5px);
}

.livre img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.infos {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.infos a {
  color: white;
  font-size: 14px;
  text-decoration: none;
  margin: 2px 0;
}

.user-tag {
  font-size: 11px !important;
  opacity: 0.8;
}

.footer {
  text-align: center;
  margin-top: 50px;
  color: #888;
}
</style>
