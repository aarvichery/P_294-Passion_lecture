<script setup>
import WelcomeItem from './MyBooks.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend bibendum risus id
    pharetra. Aliquam erat volutpat. In consectetur turpis sit amet tellus commodo, quis sodales
    magna accumsan. Fusce iaculis, elit at malesuada facilisis, ligula metus feugiat turpis, quis
    molestie erat sem in sapien. Suspendisse feugiat id arcu ut consequat. Aliquam arcu orci,
    molestie at pulvinar ac, tempus ac nunc. Nullam sed lorem tincidunt, varius nisi vel, rhoncus
    quam. Sed lectus du.
  </p>
  <div class="livres">
    <div class="livre" v-for="book in lastBooks" :key="book.id">
      <RouterLink :to="`/book/${book.id}`">
        <img :src="book.image" />
        <div class="infos">
          <a class="book-title">{{ book.title }}</a>

          <a v-for="author in authors" :key="author.id" v-show="book.authorId == author.id">
            {{ author.firstName }} {{ author.lastName }}
          </a>
          <!--Ne pas toucher au point d'interogation sinon crash!-->
          <a class="user-tag">@{{ selectUser(book)?.pseudo }}</a>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* ====== STYLE GLOBAL ====== */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #e6e6e6;
}

/* ====== TEXTE INTRO ====== */
p {
  max-width: 800px;
  margin: 40px auto;
  background-color: #4b5fa9;
  color: white;
  padding: 25px;
  border-radius: 10px;
  text-align: left;
  line-height: 1.6;
}

/* ====== SECTION LIVRES ====== */

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
/* Bande bleue titre */
.livres h2 {
  margin: 0;
  padding: 15px 0;
  background-color: #4b5fa9;
  color: white;
  font-size: 18px;
  font-weight: normal;
}

/* ====== FOOTER ====== */
.footer {
  text-align: center;
  font-size: 12px;
  color: #888;
  background: none;
  margin-top: 60px;
}
</style>

<script>
export default {
  data() {
    return {
      books: [],
      categories: [],
      authors: [],
      categorieid: 0,
      searchQuery: '',
      users: [],
      userId: 0,
    }
  },

  mounted() {
    this.loadBooks()
    this.loadCategories()
    this.loadAuthors()
    this.loadUsers()
  },
  computed: {
    lastBooks() {
      return [...this.books].sort((a, b) => b.id - a.id).slice(0, 5)
    },
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

    //Afficher user qui a add livre
    selectUser(book) {
      //Verifie les id de user qui sont les meme que userId dans les livres
      const user = this.users.find((u) => u.id === book.userId)
      return user
    },
  },
}
</script>
