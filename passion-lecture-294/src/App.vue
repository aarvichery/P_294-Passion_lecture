<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

        <div class="links">
          <RouterLink to="/">Accueil</RouterLink>
          <RouterLink to="/allbooks">Tous les livres</RouterLink>
          <RouterLink to="/mybooks">Mes livres</RouterLink>
        </div>

        <img alt="Vue logo" class="logo" src="@/assets/utilisateur.png" width="125" height="125" />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* ===== HEADER ===== */
header {
  background-color: #4b5fa9;
  padding: 10px 40px;
}

/* Conteneur principal */
.wrapper {
  display: flex;
  justify-content: space-between; /* espace entre logo gauche, liens et logo droit */
  align-items: center;
  width: 100%;
}

/* NAV */
nav {
  display: flex;
  align-items: center;
  width: 100%;
}

/* Logo gauche */
.logo:first-of-type {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

/* Liens au centre */
.links {
  display: flex;
  justify-content: center;
  flex-grow: 1; /* prend tout l’espace central */
}

.links a {
  margin: 0 20px;
  text-decoration: none;
  color: white;
  font-size: 30px;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

/* Effet hover */
.links a:hover {
  opacity: 0.7;
}

/* Lien actif */
.links a.router-link-exact-active {
  color: rgb(0, 0, 0);
  text-decoration: underline;
}

/* Icône utilisateur à droite */
.logo:last-of-type {
  width: 45px;
  height: 45px;
  object-fit: contain;
  cursor: pointer;
  margin-left: 20px; /* petit espace depuis les liens */
}
</style>
