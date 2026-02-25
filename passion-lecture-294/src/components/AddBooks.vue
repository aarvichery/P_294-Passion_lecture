<script setup>
import { atomtest } from 'globals'
import { RouterLink, RouterView } from 'vue-router'

// On génère la liste des années dynamiquement
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 300 }, (v, i) => currentYear - i);
</script>
<template>
    <div class="flex">
        <div class="image">
            <p>Image de couverture:</p>
            <img src="../assets/livres.png" alt="image de livre">      
            <input placeholder="lien"></input>
        </div>
        <div class="champsFlex">
            <div class="champs">
                <p>Titre:</p>
                <input  placeholder="Titre"></input>
            </div>
            <div class="champs">
                <p>Catégorie:</p>
                <select >
                <!-- option avec un v-for qui loup dans toutes les catégories mais qui désactive la catégorie tous car elle ne doit pas etre sélectionner-->
                <option .number="form.categoryId" :hidden="categorie.id === 0" v-for="categorie in categories">{{categorie.name}}</option>
                </select>
            </div>
            <div class="champs">
                <p>Auteur:</p>
                <select >
                <option value="" disabled selected hidden>Choisir un Auteur</option>
                <option  v-for="auth in authors">{{auth.firstName}} {{ auth.lastName }}</option>
                </select>
            </div>
            <div class="champs">
                <p>Editeur:</p>
                <input placeholder="Editor"> </input>
            </div>
            <div class="champs">
                <p>Année d'édition</p>
                <select>
                    <option value="" disabled selected hidden>Année</option>
                    <!--Crée une liste year qui permet de préafficher des dates-->
                <option v-for="year in years" :key="year" :value="year">
                {{ year }}
                </option>
                </select>
            </div>
            <div class="champs">
                <p>Editeur</p>
                <input placeholder="Joffrey Resigner"></input>
            </div>
            <div class="champs">
                <p>Lien vers extrait:</p>
                <input placeholder="Https://monextrait.com"></input>
            </div>
            <div class="champs">
                <p>Lien vers image:</p>
                <input placeholder="c:\inf-toolset"></input>
            </div>
        </div>
          
    </div>
    <div class="champs-desc">
    <p>Résumé:</p> <textarea placeholder="Il était une fois dans chat gpt ou un prompt s'avanturait sans permission..."></textarea>
</div>
<div class="save-container">
    <button class="btn-save">Enregistrer</button>
</div>


</template>

<style scoped>

p {
  color: #4b5fa9;
}
.image img{
    width: 14rem;
    height: 14rem;
    filter: drop-shadow(10px 10px 10px grey);
}
.flex{
    margin-left: 5rem;
    display: flex;
    justify-content: center;
}
.champsFlex{
    margin-left: 5rem;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 0 20px;
}
.champs select option,
.champs select,
.champs input{
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
.champs input[type="number"], .champs select {
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
    width: 70%;           /* Largeur comme sur ton image */
    height: 70px;        /* Hauteur pour voir plusieurs lignes */
    padding: 10px;
    background-color: #4b5fa9;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    border-radius: 18px;  /* Bords très arrondis comme sur le screen */
    border: none;
    outline: none;
    resize: none;         /* Empêche l'utilisateur de redimensionner */
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
        categoryId: 0,
        authorId: 0,
        editeur:"",
        nbPage: 0,
        anneeEdition: 0,
        link: '',
        image: '',
        resume: '',
        userId: 0,
      }
    }
  },
  mounted() {
    this.loadAuthors();
    this.loadCategories();
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
    // Méthode pour soumettre le formulaire
    submitForm() {
      console.log("Données envoyées :", this.form);
      alert("Regarde la console (F12) pour voir les données !");
      
      // Plus tard, tu pourras ajouter ton fetch POST ici :
      /*
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
      */
    }
  },
}
</script>