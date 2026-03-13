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
  <section class="presentation">
    <h1>Bienvenue sur Passion Lecture 294</h1>
    <p class="intro">
      Votre nouvel espace numérique dédié à l’univers du livre. Que vous soyez un dévoreur de
      romans, un amateur de bandes dessinées ou à la recherche d'ouvrages académiques, notre
      plateforme vous permet d’explorer notre catalogue en un clic.
    </p>

    <ul class="features">
      <li>
        <strong>Explorez :</strong> Parcourez des milliers de références par genre, auteur ou
        nouveautés.
      </li>
      <li>
        <strong>Gérez :</strong> Suivez vos emprunts en cours et gérez vos réservations en temps
        réel.
      </li>
      <li>
        <strong>Partagez :</strong> Rejoignez une communauté de lecteurs passionnés et découvrez vos
        prochains coups de cœur.
      </li>
    </ul>

    <p class="cta">
      <em>Plongez dans l'aventure dès maintenant.</em>
    </p>
  </section>
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
          <a class="user-tag" v-for="user in users" v-show="user.id == book.userId"
            ><RouterLink :to="`/user/${user.id}`"
              ><a>@{{ user.pseudo }}</a>
            </RouterLink>
            <div v-show="user.role == 'admin'" class="informations">
              <RouterLink :to="`/book/${book.id}/editbook`">
                <img src="../assets/pinceau.png" />
              </RouterLink>
              <img src="../assets/poubelle.png" @click="deleteBook(book.id)" /></div
          ></a>
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
.presentation {
  max-width: 800px;
  margin: 40px auto;
  background-color: #4b5fa9;
  color: white;
  padding: 25px;
  border-radius: 10px;
  text-align: left;
  line-height: 1.6;
}

/* Les icônes moins grosses (Pinceau et Poubelle) */
.infos div img {
  width: 30px; /* Taille encore plus petite pour la discrétion */
  height: 30px;
  cursor: pointer;
  filter: brightness(0) invert(1);
  transition: 0.2s;
}

.infos div img:hover {
  transform: scale(1.2);
  opacity: 0.7;
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

.informations {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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

    async deleteBook(id) {
      //demandé si l'utilisateur est sur
      if (confirm('Es-tu sûr de vouloir supprimer ce livre ?')) {
        try {
          const response = await fetch(`http://localhost:3000/books/${id}`, {
            method: 'DELETE',
          })

          if (response.ok) {
            //Rafraichir books
            this.$router.push('/')
          } else {
            alert('Erreur lors de la suppression sur le serveur.')
          }
        } catch (error) {
          alert('Impossible de contacter le serveur.')
        }
      }
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
