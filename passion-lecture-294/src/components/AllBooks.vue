<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <nav>
    <ul>
      <li
        v-for="categorie in categories"
        :key="categorie.id"
        style="margin-left: 50px; font-size: 20px"
      >
        <a @click="categorieid = categorie.id" :class="{ active: categorieid == categorie.id }">
          {{ categorie.name }}</a
        >
      </li>
    </ul>
  </nav>
  <h1>Voici tous les livres</h1>

  <div class="livres">
    <div
      class="livre"
      v-for="book in books"
      :key="book.id"
      v-show="categorieid === 0 || categorieid === book.categorieId"
    >
      <RouterLink :to="`/book/${book.id}`">
        <img src="../assets/livres.png" />
        <div class="infos">
          <a>{{ book.title }}</a>
          <a>{{ book.auteur }}</a>
          <a>@user183538</a>
        </div>
      </RouterLink>
    </div>
  </div>
  <p class="footer">Elias Veya pl01psa@eduvaud.ch - Aaron Vichery pa84igb@eduvaud.ch</p>
</template>

<style scoped>
/* ===== NAV CATEGORIES ===== */
nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  background-color: #4b5fa9;
  padding: 12px 0;
  border-top-style: solid;
  border-top-color: #ffffff;
  border-top-width: 2px;
}

nav a {
  color: white;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

nav a:hover {
  opacity: 0.7;
}

nav ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  padding-left: 0;
}

nav ul li a.active {
  color: black;
  text-decoration: underline;
}

/* ===== TITRE ===== */
h1 {
  text-align: center;
  margin: 40px 0 20px 0;
  font-size: xx-large;
  color: #4b5fa9;
}

/* ===== SECTION LIVRES ===== */
.livres {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
}

/* ===== CARTE LIVRE ===== */
.livres .livre {
  width: 200px;
  background-color: #4b5fa9;
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 15px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.livres .livre:hover {
  transform: translateY(-5px);
}

/* Image couverture */
.livres .livre img:first-of-type {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #ddd;
  margin: 0;
}

.livres .livre .infos {
  display: flex;
  flex-direction: column;
}

.livres .livre .infos a {
  cursor: pointer;
}

/* Textes */
.livres a {
  font-size: 14px;
  margin: 8px 0;
  font-weight: 500;
  color: #ffffff;
}

/* Username un peu plus discret */
.livres h2:nth-of-type(3) {
  color: #ffffff;
  font-size: 12px;
}

/* ===== ICONES ACTION ===== */
.livres div img:last-of-type,
.livres div img:nth-last-of-type(2) {
  width: 22px;
  height: 22px;
  margin: 8px 5px 0 5px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

button {
  display: block; /* nécessaire pour que margin-left fonctionne */
  margin-left: auto; /* pousse le bouton à droite */
  margin-right: 20px; /* espace par rapport au bord droit */
  padding: 12px 25px;
  background-color: #4b5fa9;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #ffffff;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  color: #4b5fa9;
  border-style: solid;
  border-color: #4b5fa9;
}
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
      categorieid: 0,
      active: false,
      nbBooksInCat: 0,
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
