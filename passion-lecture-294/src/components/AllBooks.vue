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

      <li>
        <a @click="categorieid = 0" :class="{ active: categorieid == 0 }">Toutes</a>
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
    <div class="livre" v-for="book in filteredBooks" :key="book.id">
      <RouterLink :to="`/book/${book.id}`">
        <img :src="book.image" />
        <div class="infos">
          <a class="book-title">{{ book.title }}</a>

          <a v-for="author in authors" :key="author.id" v-show="book.authorId == author.id">
            {{ author.firstname }} {{ author.name }}
          </a>

          <a class="user-tag" v-for="user in users" v-show="user.id == book.userId">
            <RouterLink :to="`/user/${user.id}`"
              ><a>@{{ user.username }}</a>
            </RouterLink>
            <div v-show="user.role == 'admin'">
              <RouterLink :to="`/book/${book.id}/editbook`">
                <img src="../assets/pinceau.png" />
              </RouterLink>
              <img src="../assets/poubelle.png" @click.stop.prevent="deleteBook(book.id)" />
            </div>
          </a>
        </div>
      </RouterLink>
    </div>

    <p v-if="filteredBooks.length === 0" style="color: #4b5fa9">Aucun livre trouvé.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import bookServices from '../../Services/bookServices';
import categorieServices from '../../Services/categorieServices';
import authorServices from '../../Services/authorServices';
import userServices from '../../Services/userServices';

const books = ref([])
const categories = ref([])
const authors = ref([])
const users = ref([])
const categorieid = ref(0)
const searchQuery = ref('')

const filteredBooks = computed(() => {
  const query = searchQuery.value.toLowerCase()
  
  return books.value.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(query)
    const matchCategory = categorieid.value === 0 || book.categoryId == categorieid.value
    return matchSearch && matchCategory
  })
})

const loadData = async () => {
  try {
    const [resBooks, resCats, resAuth, resUse ] = await Promise.all([
      bookServices.getBooks(),
      categorieServices.getCategories(),
      authorServices.getAuthors(),
      userServices.getUsers(),
    ]);

    books.value = resBooks.data
    categories.value = resCats.data 
    authors.value = resAuth.data
    users.value = resUse.data
  } catch (error) {
    console.error("Erreur lors du chargement des données", error)
  }
}

const deleteBook = async (id) => {
  if (confirm('Es-tu sûr de vouloir supprimer ce livre ?')) {
    try {
      books.value = books.value.filter(b => b.id !== id)
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
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
  color: #000000; 
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

.infos div {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.infos div img {
  width: 30px;
  height: 30px;
  cursor: pointer;
  filter: brightness(0) invert(1);
  transition: 0.2s;
}

.infos div img:hover {
  transform: scale(1.2);
  opacity: 0.7;
}

.livres > a {
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
}
</style>