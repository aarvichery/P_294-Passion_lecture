<script setup>
import { atomtest } from 'globals'
import { RouterLink, RouterView } from 'vue-router'
</script>
<template></template>

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
  props: ['id'],
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
        nbPage: '',
        anneeEdition: '',
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
    this.loadBookData()
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
    async loadBookData() {
      try {
        const response = await fetch(`http://localhost:3000/users/${this.id}`)
        const bookData = await response.json()

        // Préremplir avec données existante
        this.form = bookData
      } catch (error) {
        console.error('Erreur chargement livre :', error)
      }
    },

    //POST

    async submitForm() {
      const values = Object.values(this.form)

      //check que rien n'est vide
      const isFormIncomplete = values.some((value) => value === '' || value === 0 || value === null)

      if (isFormIncomplete) {
        alert('Faut tous remplir!!')
        return
      }

      try {
        const response = await fetch(`http://localhost:3000/books/${this.id}`, {
          //put pour modif
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        })

        // Si ok on affiche succes
        if (response.ok) {
          this.$router.push('/mybooks')
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
