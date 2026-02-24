<script setup lang="ts">
import { atomtest } from 'globals'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <a>Tout</a>
    <a>Documentaire</a>
    <a>SC-FI</a>
    <a>Bande-dessinée</a>
    <a>Roman</a>
    <a>Manga</a>
    <a>Policier</a>
    <a>Autre</a>
  </nav>
  <h1>Voici vos livres</h1>

  <div class="livres">
    <div class="livre">
      <img src="../assets/livres.png" />
      <div class="infos">
        <a>Titre #1</a>
        <a>Auteur</a>
        <a>@user183538</a>
      </div>
      <img src="../assets/pinceau.png" />
      <img src="../assets/poubelle.png" />
    </div>
    <div class="livre">
      <img src="../assets/livres.png" />
      <div class="infos">
        <a>Titre #2</a>
        <a>Auteur</a>
        <a>@user183538</a>
      </div>
      <img src="../assets/pinceau.png" />
      <img src="../assets/poubelle.png" />
    </div>
    <div class="livre">
      <img src="../assets/livres.png" />
      <div class="infos">
        <a>Titre #3</a>
        <a>Auteur</a>
        <a>@user183538</a>
      </div>
      <img src="../assets/pinceau.png" />
      <img src="../assets/poubelle.png" />
    </div>
    <div class="livre">
      <img src="../assets/livres.png" />
      <div class="infos">
        <a>Titre #4</a>
        <a>Auteur</a>
        <a>@user183538</a>
      </div>
      <img src="../assets/pinceau.png" />
      <img src="../assets/poubelle.png" />
    </div>
    <div class="livre">
      <img src="../assets/livres.png" />
      <div class="infos">
        <a>Titre #5</a>
        <a>Auteur</a>
        <a>@user183538</a>
      </div>
      <img src="../assets/pinceau.png" />
      <img src="../assets/poubelle.png" />
    </div>
  </div>
  <button>Ajouter</button>
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

.livres div img:last-of-type:hover,
.livres div img:nth-last-of-type(2):hover {
  transform: scale(1.2);
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
