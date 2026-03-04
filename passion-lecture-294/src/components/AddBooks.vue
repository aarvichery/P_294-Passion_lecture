<script setup>
import { atomtest } from 'globals'
import { RouterLink, RouterView } from 'vue-router'

// On génère la liste des années dynamiquement
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 900 }, (v, i) => currentYear - i)
</script>
<template>
  <div class="flex">
    <div class="image">
      <p>Image de couverture:</p>
      <img src="../assets/livres.png" alt="image de livre" />
    </div>

    <div class="champsFlex">
      <div class="champs">
        <p>Titre:</p>
        <input v-model="form.title" placeholder="Titre" />
      </div>

      <div class="champs">
        <p>Catégorie:</p>
        <select v-model="form.categorieId">
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
        <p>Auteur:</p>
        <select v-model="form.authorId">
          <option value="" disabled selected hidden>Choisir un Auteur</option>
          <option v-for="auth in authors" :key="auth.id" :value="auth.id">
            {{ auth.firstName }} {{ auth.lastName }}
          </option>
        </select>
        <RouterLink to="/addauthor">
          <button>Ajouter</button>
        </RouterLink>
      </div>

      <div class="champs">
        <p>Editeur:</p>
        <input v-model="form.editeur" placeholder="Editeur" />
      </div>

      <div class="champs">
        <p>Année d'édition</p>
        <select v-model="form.anneeEdition">
          <option value="" disabled selected hidden>Année</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="champs">
        <p>Nombre de pages:</p>
        <input type="number" v-model.number="form.nbPage" placeholder="Ex: 320" />
      </div>

      <div class="champs">
        <p>Lien vers extrait:</p>
        <input v-model="form.link" placeholder="Https://monextrait.com" />
      </div>

      <div class="champs">
        <p>Lien vers image:</p>
        <input v-model="form.image" placeholder="c:\inf-toolset" />
      </div>
    </div>
  </div>

  <div class="champs-desc">
    <p>Résumé:</p>
    <textarea v-model="form.resume" placeholder="Résumé du livre..."></textarea>
  </div>

  <div class="save-container">
    <button class="btn-save" @click="submitForm">Enregistrer</button>
  </div>
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
  border-color:#ffffff;
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
  cursor: pointer;
  border: none; /* Important pour enlever la bordure grise par défaut */
}
.champs input::placeholder {
  color: rgba(255, 255, 255, 0.8); /* Blanc légèrement transparent pour mieux voir */
  opacity: 1; /* Nécessaire pour Firefox */
}
/* Applique le style à l'input number aussi ! */
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
  align-items: center; /* Centre le bloc résumé horizontalement */
  width: 100%;
  margin-top: 20px;
}

.champs-desc p {
  width: 70%; /* Aligne le titre sur la largeur du textarea */
  text-align: left;
}

.champs-desc textarea {
  width: 70%; /* Largeur comme sur ton image */
  height: 70px; /* Hauteur pour voir plusieurs lignes */
  padding: 10px;
  background-color: #4b5fa9;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 18px; /* Bords très arrondis comme sur le screen */
  border: none;
  outline: none;
  resize: none; /* Empêche l'utilisateur de redimensionner */
  font-family: inherit; /* Pour garder la même police que le reste */
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

<script>
export default {
  data() {
    return {
      authors: [],
      categories: [],
      // Objet pour stocker les données du formulaire
      form: {
        title: '',
        categorieId: 1,
        authorId: 1,
        editeur: '',
        nbPage: 2456,
        anneeEdition: 1879,
        image: '',
        link: '',
        resume: '',
        userId: 1,
      },
    }
  },
  mounted() {
    this.loadAuthors()
    this.loadCategories()
  },
  methods: {
    async loadAuthors() {
      const response = await fetch('http://localhost:3000/authors')
      this.authors = await response.json()
    },
    async loadCategories() {
      const response = await fetch('http://localhost:3000/categories')
      this.categories = await response.json()
    },

    //POST

    async submitForm() {
      //récupèrer toutes les valeurs du formulaire
      const values = Object.values(this.form)

      //check que rien n'est vide
      const isFormIncomplete = values.some((value) => value === '' || value === 0 || value === null)

      if (isFormIncomplete) {
        alert('Faut tous remplir!!')
        return
      }

      // début du post
      try {
        const response = await fetch('http://localhost:3000/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        })

        // Si ok on affiche succes
        if (response.ok) {
          alert('Livre enregistré avec succès !')

          //On remmet le user sur la frontpage
          this.$router.push('/')
        } else {
          alert('Erreur serveur : ' + response.status)
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi :", error)
        alert('Impossible de contacter le serveur.')
      }
    },
  },
}
</script>
