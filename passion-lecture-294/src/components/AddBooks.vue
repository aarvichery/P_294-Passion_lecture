<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import bookServices from '../../Services/bookServices'
import authorServices from '../../Services/authorServices'
import categorieServices from '../../Services/categorieServices'

const router = useRouter()

// On génère la liste des années dynamiquement
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 900 }, (v, i) => currentYear - i)

// États réactifs (Refs)
const authors = ref([])
const categories = ref([])

const form = ref({
  title: '',
  categorieId: '',
  authorId: '',
  editeur: '',
  nbPage: null,
  anneeEdition: null,
  image: '',
  link: '',
  resume: '',
  userId: 5,
})

// Chargement des données au montage du composant
const loadData = async () => {
  try {
    const [resAuth, resCats] = await Promise.all([
      authorServices.getAuthors(),
      categorieServices.getCategories()
    ])

    authors.value = resAuth.data
    categories.value = resCats.data
  } catch (error) {
    console.error("Erreur lors du chargement des données", error)
  }
}

const handleCreateBook = async () => {
  const values = Object.values(form.value)

  const isFormIncomplete = values.some((value) => value === '' || value === 0 || value === null)

  if (isFormIncomplete) {
    alert('Faut tous remplir !!')
    return
  }

  try {
    const response = await bookServices.createBook(form.value)

    if (response.status === 200 || response.status === 201) {
      alert('Livre enregistré avec succès !')
      router.push('/')
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error)
    alert("Impossible d'enregistrer le livre via le service.")
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <form @submit.prevent="handleCreateBook">
    
    <div class="flex">
      <div class="image">
        <p>Image de couverture :</p>
        <img src="/livres/livres.png" alt="image de livre" />
      </div>

      <div class="champsFlex">
        <div class="champs">
          <p>Titre :</p>
          <input v-model="form.title" placeholder="Titre" required />
        </div>

        <div class="champs">
          <p>Catégorie :</p>
          <select v-model="form.categorieId" required>
            <option value="" disabled selected hidden>Choisir une catégorie</option>
            <option
              v-for="categorie in categories"
              :key="categorie.id"
              :value="categorie.id"
              :hidden="categorie.id === 0"
            >
              {{ categorie.name }}
            </option>
          </select>
        </div>

        <div class="champs">
          <p>Auteur :</p>
          <select v-model="form.authorId" required>
            <option value="" disabled selected hidden>Choisir un Auteur</option>
            <option v-for="auth in authors" :key="auth.id" :value="auth.id">
              {{ auth.firstname }} {{ auth.name }}
            </option>
          </select>
          <RouterLink to="/addauthor">
            <button type="button">Ajouter</button>
          </RouterLink>
        </div>

        <div class="champs">
          <p>Editeur :</p>
          <input v-model="form.editeur" placeholder="Editeur" required />
        </div>

        <div class="champs">
          <p>Année d'édition</p>
          <select v-model="form.anneeEdition" required>
            <option value="" disabled selected hidden>Année</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>

        <div class="champs">
          <p>Nombre de pages :</p>
          <input type="number" v-model.number="form.nbPage" placeholder="Ex: 320" required />
        </div>

        <div class="champs">
          <p>Lien vers extrait :</p>
          <input v-model="form.link" placeholder="Https://monextrait.com" />
        </div>

        <div class="champs">
          <p>Lien vers image :</p>
          <input v-model="form.image" placeholder="c:\inf-toolset" />
        </div>
      </div>
    </div>

    <div class="champs-desc">
      <p>Résumé :</p>
      <textarea v-model="form.resume" placeholder="Résumé du livre..." required></textarea>
    </div>

    <div class="save-container">
      <button type="submit" class="btn-save">Enregistrer</button>
    </div>

  </form>
</template>

<style scoped>
p {
  color: #4b5fa9;
}
.image img {
  width: 14rem;
  height: 14rem;
  filter: drop-shadow(10px 10px 10px grey);
}
.flex {
  margin-left: 5rem;
  display: flex;
  justify-content: center;
}

.champs button {
  background-color: #4b5fa9;
  color: white;
  border-color: #ffffff;
  padding: 12px 40px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}

.champsFlex {
  margin-left: 5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 20px;
}
.champs select option,
.champs select,
.champs input {
  padding: 12px 25px;
  background-color: #4b5fa9;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 16px;
  border: none;
}
.champs input::placeholder {
  color: rgba(255, 255, 255, 0.8);
  opacity: 1;
}
.champs input[type='number'],
.champs select {
  padding: 12px 25px;
  background-color: #4b5fa9;
  color: #ffffff;
  border-radius: 16px;
  border: none;
  width: 100%;
}
.champs-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.champs-desc p {
  width: 70%;
  text-align: left;
}

.champs-desc textarea {
  width: 70%;
  height: 70px;
  padding: 10px;
  background-color: #4b5fa9;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 18px;
  border: none;
  outline: none;
  resize: none;
  font-family: inherit;
}

.champs-desc textarea::placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.save-container {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.btn-save {
  background-color: #4b5fa9;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}
</style>